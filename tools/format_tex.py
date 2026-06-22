#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Satz-neutraler LaTeX-Quelltext-Formatierer:
(1) Einrueckung geschachtelter \\begin..\\end-Umgebungen (2 Leerzeichen je Ebene),
(2) Hart-Umbruch von Prosa-Absaetzen auf einheitliche Breite WIDTH.
Satz-neutral, weil TeX fuehrende Leerzeichen ignoriert UND ein Quell-Zeilenumbruch in Prosa
= ein Wort-Zwischenraum ist; umgebrochen wird NUR an Leerzeichen auf Klammertiefe 0.
Ausgespart (nur eingerueckt, nie umgebrochen): verbatim/listings (inhaltlich unangetastet),
Tabellen-/Mathe-/tikz-Umgebungen, Zeilen mit & oder \\\\ , Kommentarzeilen, Strukturbefehle.
Aufruf: python format_tex.py datei1.tex [datei2.tex ...]   (in-place, LF)."""
import sys, re

VERB_ENVS = {"verbatim", "Verbatim", "lstlisting", "lstlisting*", "minted", "comment", "alltt"}
NOREFLOW_ENVS = {"tabular", "tabular*", "tabularx", "longtable", "supertabular", "array",
                 "align", "align*", "alignat", "alignat*", "gather", "gather*", "multline",
                 "equation", "equation*", "split", "cases", "matrix", "bmatrix", "pmatrix",
                 "tikzpicture", "axis", "semilogyaxis", "semilogxaxis", "loglogaxis", "pspicture"}
UNIT = "  "
WIDTH = 100

def has_comment(s):
    i = 0
    while i < len(s):
        if s[i] == "\\":
            i += 2; continue
        if s[i] == "%":
            return True
        i += 1
    return False

CMD_BOUNDARY = re.compile(r"\\(begin|end|section|subsection|subsubsection|paragraph|subparagraph|"
    r"chapter|part|caption|captionof|label|input|include|bibliography|bibliographystyle|printbibliography|"
    r"newcommand|renewcommand|providecommand|def|setlength|addtolength|hline|toprule|midrule|bottomrule|"
    r"cmidrule|rowcolor|vspace|hspace|bigskip|medskip|smallskip|noindent|centering|raggedright|"
    r"raggedleft|clearpage|newpage|pagebreak|maketitle|tableofcontents|listoffigures|listoftables|"
    r"minisec|item\b)")
LONE_CMD = re.compile(r"\\[a-zA-Z@]+\*?$")
DISPLAY_MATH = re.compile(r"^(\\\[|\\\]|\$\$)")

def is_boundary(stripped):
    if "&" in stripped: return True
    if "\\\\" in stripped: return True
    if has_comment(stripped): return True
    if LONE_CMD.match(stripped): return True
    if DISPLAY_MATH.match(stripped): return True
    if CMD_BOUNDARY.match(stripped) and not stripped.startswith("\\item"): return True
    return False

def reflow(text, indent):
    chunks, buf, depth, i = [], [], 0, 0
    while i < len(text):
        c = text[i]
        if c == "\\" and i + 1 < len(text):
            buf.append(text[i:i+2]); i += 2; continue
        if c == "{":
            depth += 1; buf.append(c); i += 1; continue
        if c == "}":
            depth = max(0, depth - 1); buf.append(c); i += 1; continue
        if c == " " and depth == 0:
            if buf:
                chunks.append("".join(buf)); buf = []
            i += 1
            while i < len(text) and text[i] == " ":
                i += 1
            continue
        buf.append(c); i += 1
    if buf:
        chunks.append("".join(buf))
    lines, cur = [], indent
    for ch in chunks:
        cand = (cur + ch) if cur == indent else (cur + " " + ch)
        if len(cand) > WIDTH and cur != indent:
            lines.append(cur); cur = indent + ch
        else:
            cur = cand
    if cur != indent or not lines:
        lines.append(cur)
    return lines

def format_text(text):
    lines = [ln.rstrip() for ln in text.replace("\r", "").split("\n")]
    out, depth, verb = [], 0, None
    para, para_indent, noreflow = [], 0, []

    def flush():
        nonlocal para
        if para:
            joined = " ".join(s.strip() for s in para)
            out.extend(reflow(joined, UNIT * para_indent))
            para = []

    for line in lines:
        if verb is not None:
            out.append(line)
            if re.search(r"\\end\{" + re.escape(verb) + r"\}", line):
                verb = None
            continue
        stripped = line.strip()
        if stripped == "":
            flush(); out.append(""); continue
        begins = re.findall(r"\\begin\{([^}]*)\}", stripped)
        ends = re.findall(r"\\end\{([^}]*)\}", stripped)
        rd = max(depth - 1, 0) if stripped.startswith("\\end") else depth
        in_noreflow = len(noreflow) > 0

        if in_noreflow or is_boundary(stripped):
            flush(); out.append(UNIT * rd + stripped)
        elif stripped.startswith("\\item"):
            flush(); para = [stripped]; para_indent = depth
        else:
            if not para:
                para_indent = depth
            para.append(stripped)

        depth = max(depth + len(begins) - len(ends), 0)
        for e in begins:
            if e in VERB_ENVS and begins.count(e) > ends.count(e):
                verb = e
            elif e in NOREFLOW_ENVS:
                noreflow.append(e)
        for e in ends:
            if e in NOREFLOW_ENVS and e in noreflow:
                noreflow.remove(e)
    flush()
    return "\n".join(out)

def main():
    for path in sys.argv[1:]:
        with open(path, "r", encoding="utf-8") as fh:
            src = fh.read()
        new = format_text(src)
        if not new.endswith("\n"):
            new += "\n"
        with open(path, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(new)
        over = sum(1 for ln in new.split("\n") if len(ln) > WIDTH)
        print(f"  format {path}  (>WIDTH Zeilen: {over})")

if __name__ == "__main__":
    main()
