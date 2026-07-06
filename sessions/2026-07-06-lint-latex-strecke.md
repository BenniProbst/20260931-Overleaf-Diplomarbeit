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
