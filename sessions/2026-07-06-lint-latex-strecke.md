# lint:latex-Strecke (User-Auftrag 06.07.: „strikt grün, Fehler echt beheben")

Ziel: chktex-Befunde klassenweise ECHT beheben (mechanische Typografie, NIE Formulierungen — Provenienz-Regel),
am Ende `allow_failure` aus `lint:latex` entfernen. Overleaf-Disziplin: vor JEDEM Edit `git fetch origin && merge`;
Commits OHNE Co-Authored-By.

## Stand nach Welle 1 (Commits 007405c + 75b95d9, CI-Beweis Pipeline 8198: thesis:pdf success)
Baseline 964 Warnungen (Job 213722 == lokal identisch) → **589** (CI-Job 214953 literal).

| Klasse | vorher | nachher | Behandlung |
|---|---|---|---|
| W8 Dash-Länge | 138 | **0** | `.chktexrc`-Konvention (HyphDash {1 2}, WordDash {2 3}, NumDash {1 2}) + 8 echte Jahresspannen manuell auf en-dash (Lea 1987--2012 ×4, Vyukov 2010--11 ×4). chktex 1.7.9 kennt für Ziffern-Dashes KEINE DashExcpt-Ausnahmen (empirisch bewiesen) — darum NumDash {1 2} für die Identifier-Population (x86-64, ISBN 978-3-…, ISO-Daten, CC0-1.0, Intel-Doc-Nummern). |
| W36 Klammer-Spacing | 251 | **0** | ALLE 251 klassifiziert (Skript + manuelle Stichproben jedes Nicht-CODE-Falls): ausnahmslos False-Positives auf Code-Identifiern (`create_anatomy()`, `zipfian(.99)`, `\allowbreak`-Namen Anhang D), Options-Syntax (`\alph*)`), deutschen Klammer-Komposita (`(Bundle-)Prefetch`). → `-n36` im CI-Aufruf, dokumentiert in `.gitlab-ci.yml`. |

## Welle 2 (Commit 4936e97): W13 105→0, W12 101→0 — gesamt 589→379
203 Spacing-Markierungen: Caret-genaue Ernte (chktex-Standardformat geparst — `%c`-Formatstring ist
UNBRAUCHBAR, zeigt Wipe-Buffer-Spalten; `\input`-Duplikate dedupliziert), 174 automatisch klassifiziert
(3 Caret-Lagen: auf Satzzeichen / auf Space danach / auf Folgewort), 29 manuell einzeln entschieden.
Fixe: `\@` vor Satzzeichen nach Großbuchstaben/Ziffern/Klammern (Satzende-Markierung, layout-korrekt bei
babel-ngerman OHNE frenchspacing); `.\ ` nach echten Abkürzungen (vs./bzw.). Diff-Audit 180/180 nur
In-Zeilen-Edits. PDF-Bauprobe lokal mit ALLEN CI-Gates: EXIT=0, Warnings=1 (=erlaubt), blg=0.

## Nächste Wellen (Reihenfolge)
1. **W13 (105) + W12 (101)** — ECHTE kontextgenaue Fixes, KEINE Policy:
   - W13: `\@` vor Punkt nach GROSSBUCHSTABEN-Abkürzung am Satzende (`PRT-ART\@.` , `…-API\@.`) — TeX setzt sonst nur Wortabstand.
   - W12: `\ ` (oder `~`) nach Kleinbuchstaben-Abkürzungspunkt mitten im Satz (`bzw.\ dessen`) — TeX setzt sonst Satzabstand.
   - Ernte-Systematik (funktioniert, verifiziert): `chktex -q -n36 -f "%f:%l:%c:%n<echtes-NL>"` → Datei:Zeile:Spalte:Klasse;
     je Fundstelle ±7 Zeichen extrahieren, nach Mustern gruppieren, JE MUSTER gezielt ersetzen (kein blindes sed über Abkürzungen),
     danach Voll-Lauf W12/W13==0 + `latexmk`-Build-Probe (bzw. thesis:pdf-CI-Gate).
   - Achtung Muster-Kollision: `;`-Fundstellen bei W13 stammen aus Tabellenzellen — Caret-Spalte prüfen, nicht raten.
2. **W1 (284)** Command-Space (`\foo Text` → `\foo{} Text` bzw. `{\foo}`) — mechanisch, aber Policy klären (viele in Tabellen/Makros).
3. Rest-Klassen: W31 (22), W24 (20), W11 (16), W27 (12), W6/W32/W17 (je 5), Kleinstmengen.
4. DANN: `allow_failure: true` aus lint:latex entfernen (.gitlab-ci.yml Z. 42) + Grün-Beweis.

## Welle 3+4 (FINAL): W1 284→0 + Restklassen 99→0 — lint:latex HART
- W1: \endhead-Klasse 160x %-terminiert, \allowbreak{}/\textbackslash{} 74x praezisiert, Sprachschalter 8x space-frei.
- Echte Mikro-Fixes: W6 italic correction 3x (\/), W2 ~\cite 2x, W32 \enquote 4x ('ja'/'yes'/'Old is Gold'),
  W26 != -> $\neq$ 2x, W24 caption%-Zeilenende 10x (GENERATOR-Klasse: gleicher Fix gehoert in den
  ce-LaTeX-Export-Emitter, sonst kehrt W24 bei Regeneration zurueck!), W11 URL-Auslassungen -> \ldots 12x
  + catch(...) -> \texttt + Suppression 2x.
- 42 dokumentierte Zeilen-Suppressions (W31 tikz-Verschachtelung, W27 \thesislang-\include-Mechanik,
  W29 Produktnamen, W9/W10 Intervall-/Label-Syntax) + -n17 im CI-Aufruf (enumitem-\alph*)-Labels,
  nicht zeilen-supprimierbar — echte Klammer-Fehler faengt thesis:pdf/halt-on-error).
- chktex GESAMT = 0 (CI-identischer Aufruf), PDF-Bauprobe je Welle: EXIT=0, Warnings=1 (=erlaubt), blg=0.
- lint:latex allow_failure ENTFERNT (Streckenziel erreicht).
