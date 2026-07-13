# Prüf-Skripte des Text-Agenten (Review-Gates)

Drei Python-Skripte (Python 3.13, keine Abhängigkeiten), die als Standard-Gates nach jeder
größeren Edit-Runde laufen. Ergebnis-Erwartungen der Abgabe-Doktrin in Klammern.

| Skript | Zweck | Aufruf | Soll |
|---|---|---|---|
| `seq_ref_scan.py` | Sequenzielle Verweis-Regel: listet Vorwärts-`\ref` über Kapitelgrenzen (erlaubt NUR Grundlage→Vertiefung) + kapitelinterne Vorwärtsverweise + unbekannte Ziele | `python seq_ref_scan.py de` bzw. `en` | DE- und EN-Totale identisch; unknown=0 |
| `cite_de_en_check.py` | DE≡EN-Äquivalenz: vergleicht die `\cite`-Key-Multimengen je Dateipaar (6 Kapitel + 6 Anhänge) | `python cite_de_en_check.py` | `GESAMT: DE==EN` |
| `cite_usage_diff.py` | Key-weiser Verwertungs-Vergleich gegen die Ur-Fassung (Tag `backup-2026-06-29-pre-habich-restruktur`): LOST/THINNED/GAINED je bib-Key | `python cite_usage_diff.py` | LOST=0; THINNED nur bewusste Konsolidierungen (Bewertung: DA-Ledger §12, 2026-07-11) |

**Hinweise:**
- `cite_usage_diff.py` erwartet die extrahierte Ur-Fassung unter einem Scratchpad-Pfad
  (Konstante `SCRATCH` im Skript). Vor Gebrauch anpassen oder die Ur-Fassung neu extrahieren:
  `git show backup-2026-06-29-pre-habich-restruktur:kapitel/de/<datei>.tex` je Alt-Datei
  (01_introduction … 08_conclusion) nach `<scratch>/urfassung/kapitel/`.
- Die `BASE`-Pfad-Konstanten in allen drei Skripten zeigen auf das lokale Thesis-Repo —
  bei anderem Checkout-Pfad anpassen.
- Ausgaben sind ASCII; unter Windows-cp1252-Konsole bei Bedarf in Datei umleiten.
- Weitere Standard-Gates ohne Skript: Builds `pwsh -File build.ps1 -Lang de|en`
  (Soll: 0 Errors / 0 Overfull / 0 LaTeX Warnings; nie beide Builds in einem Aufruf <600 s)
  und Render-Sichtprüfung geänderter Seiten via `pdftoppm -png -r 100 -f <phys> -l <phys>`
  (physische Seite = logische + 10 bei DE, + 8 bei EN).
