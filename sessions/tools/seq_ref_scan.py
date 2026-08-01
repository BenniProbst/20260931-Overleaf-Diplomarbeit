"""Sequential reference scan: forward \\ref across the 6 thesis chapters."""
import glob
import os
import re
import sys

BASE = r"C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit"
LANG = sys.argv[1] if len(sys.argv) > 1 else "de"
CHAPTERS = [
    "01_einleitung",
    "02_suchbaeume_grundlagen",
    "03_messsystem_prtart",
    "04_implementierung",
    "05_evaluation",
    "06_fazit",
]

LABEL_RE = re.compile(r"\\label\{([^}]+)\}")
REF_RE = re.compile(r"\\(?:ref|autoref|vref|pageref)\{([^}]+)\}")


def chapter_path(chapter: str) -> str:
    return os.path.join(BASE, "kapitel", LANG, chapter + ".tex")


def collect_labels() -> tuple[dict[str, tuple[int, int]], set[str]]:
    positions: dict[str, tuple[int, int]] = {}
    extra_labels: set[str] = set()
    for ci, chapter in enumerate(CHAPTERS):
        with open(chapter_path(chapter), encoding="utf-8") as fh:
            for ln, line in enumerate(fh, 1):
                for m in LABEL_RE.finditer(line):
                    positions[m.group(1)] = (ci, ln)
    extra_files = (
        glob.glob(os.path.join(BASE, "anhang", LANG, "*.tex"))
        + glob.glob(os.path.join(BASE, "tikz", "**", "*.tex"), recursive=True)
        + [os.path.join(BASE, "diplomarbeit.tex")]
    )
    for path in extra_files:
        try:
            with open(path, encoding="utf-8") as fh:
                for line in fh:
                    for m in LABEL_RE.finditer(line):
                        if m.group(1) not in positions:
                            extra_labels.add(m.group(1))
        except OSError:
            continue
    return positions, extra_labels


def scan() -> None:
    positions, extra_labels = collect_labels()
    fwd_chap: list[str] = []
    fwd_in: list[str] = []
    unknown: list[str] = []
    for ci, chapter in enumerate(CHAPTERS):
        with open(chapter_path(chapter), encoding="utf-8") as fh:
            for ln, line in enumerate(fh, 1):
                if line.lstrip().startswith("%"):
                    continue
                for m in REF_RE.finditer(line):
                    target = m.group(1)
                    if target in positions:
                        tci, tln = positions[target]
                        if tci > ci:
                            fwd_chap.append(
                                f"{chapter}:{ln} -> {target} (def {CHAPTERS[tci]}:{tln})"
                            )
                        elif tci == ci and tln > ln + 40:
                            fwd_in.append(
                                f"{chapter}:{ln} -> {target} (def line {tln})"
                            )
                    elif target not in extra_labels:
                        unknown.append(f"{chapter}:{ln} -> {target}")
    out: list[str] = []
    out.append(f"=== {LANG}: forward refs across chapters ===")
    out.append("\n".join(fwd_chap) if fwd_chap else "(none)")
    out.append(f"=== {LANG}: forward refs within chapter (>40 lines ahead) ===")
    out.append("\n".join(fwd_in) if fwd_in else "(none)")
    out.append(f"=== {LANG}: unknown targets ===")
    out.append("\n".join(unknown) if unknown else "(none)")
    out.append(
        f"TOTALS {LANG}: fwd-chap={len(fwd_chap)}, "
        f"fwd-in-chap={len(fwd_in)}, unknown={len(unknown)}"
    )
    sys.stdout.write("\n".join(out) + "\n")


if __name__ == "__main__":
    scan()
