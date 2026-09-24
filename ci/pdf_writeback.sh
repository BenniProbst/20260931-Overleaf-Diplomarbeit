#!/bin/sh
# ci/pdf_writeback.sh -- schreibt die gegateten PDF-Fassungen der Pipeline als Folge-Commit in die Hauptebene
# dieses Repos zurueck (Owner-Order 389, 22.09.2026; Order 288: uebersteuerbar per Variable aus ce/super).
#
# Vertrag:
#   - laeuft NUR nach gruenem thesis:pdf (alle Matrix-Instanzen, needs: mit artifacts) = die vier Fassungen
#     diplomarbeit-<de|en>-<lang|kurz>.pdf liegen gegatet im Arbeitsverzeichnis (Job-Artefakte);
#   - jede erwartete Fassung MUSS vorhanden, nicht leer und ein PDF sein (Header %PDF-), sonst Exit 1 (keine
#     stille Null: eine fehlende Fassung ist ein Defekt, kein Teilerfolg);
#   - Ziel = COMDARE_THESIS_PDF_DIR (Default '.', die Hauptebene); Dateinamen bleiben stabil, alte Stande werden
#     ueberschrieben (Historie = git); unveraenderte PDFs erzeugen KEINEN Commit;
#   - Commit mit '[skip ci]' + Push mit -o ci.skip = keine Folge-Pipeline (Schleifenschutz);
#   - Push auf denselben Branch (HEAD:$CI_COMMIT_BRANCH) mit dem Project-Access-Token (write_repository);
#     ist der Branch inzwischen weitergelaufen: einmal fetch + merge (NIE rebase), dann erneut push;
#   - Uebersteuerung: COMDARE_THESIS_PDF_WRITEBACK=false schaltet ab (INERT, Exit 0);
#     COMDARE_THESIS_PDF_FASSUNGEN (Liste, Default 'de-lang en-lang de-kurz en-kurz') und
#     COMDARE_THESIS_PDF_DIR koennen per Pipeline-/Trigger-Variable (z. B. aus der ce ueber den super) gesetzt werden;
#     COMDARE_THESIS_PDF_REMOTE ersetzt die Push-URL (Testhaken fuer lokale Proben gegen ein Bare-Repo).
set -eu
SW="${COMDARE_THESIS_PDF_WRITEBACK:-true}"
if [ "$SW" != "true" ]; then echo "INERT: COMDARE_THESIS_PDF_WRITEBACK=$SW -> kein Rueckschreiben"; exit 0; fi
DIR="${COMDARE_THESIS_PDF_DIR:-.}"
FASSUNGEN="${COMDARE_THESIS_PDF_FASSUNGEN:-de-lang en-lang de-kurz en-kurz}"
BRANCH="${CI_COMMIT_BRANCH:?pdf_writeback: nur in Branch-Pipelines (CI_COMMIT_BRANCH fehlt)}"
if [ -z "${COMDARE_THESIS_PDF_REMOTE:-}" ]; then
  : "${COMDARE_THESIS_WRITEBACK_USER:?pdf_writeback: COMDARE_THESIS_WRITEBACK_USER fehlt (CI-Variable 289)}"
  : "${COMDARE_THESIS_WRITEBACK_TOKEN:?pdf_writeback: COMDARE_THESIS_WRITEBACK_TOKEN fehlt (CI-Variable 289)}"
  REMOTE="https://${COMDARE_THESIS_WRITEBACK_USER}:${COMDARE_THESIS_WRITEBACK_TOKEN}@${CI_SERVER_HOST}"
  REMOTE="${REMOTE}/${CI_PROJECT_PATH}.git"
else
  REMOTE="$COMDARE_THESIS_PDF_REMOTE"
fi
mkdir -p "$DIR"
n=0
for f in $FASSUNGEN; do
  src="diplomarbeit-$f.pdf"; dst="$DIR/$src"
  [ -s "$src" ] || { echo "FEHLER: Fassung $src fehlt oder ist leer (Artefakt des thesis:pdf-Jobs)"; exit 1; }
  head -c 5 "$src" | grep -q '^%PDF-' || { echo "FEHLER: $src ist kein PDF (Header)"; exit 1; }
  if [ "$DIR" != "." ]; then cp -f "$src" "$dst"; fi
  git add -f -- "$dst"
  n=$((n+1)); echo "Fassung $src: $(wc -c < "$src") B -> $dst"
done
[ "$n" -gt 0 ] || { echo "FEHLER: keine Fassung in COMDARE_THESIS_PDF_FASSUNGEN"; exit 1; }
if git diff --cached --quiet -- "$DIR"; then
  echo "UNVERAENDERT: $n Fassungen byte-gleich zum Bestand, kein Commit"; exit 0
fi
git -c user.name="thesis-pdf-bot" -c user.email="thesis-pdf-bot@ci.comdare.local" commit -q \
  -m "thesis(pdf): $n Fassungen aus Pipeline ${CI_PIPELINE_ID:-NA}" \
  -m "Quelle ${CI_COMMIT_SHORT_SHA:-NA}, Order 389 (22.09.2026) [skip ci]"
echo "Commit $(git rev-parse --short HEAD) auf $BRANCH"
export GIT_TERMINAL_PROMPT=0
if git push -q -o ci.skip "$REMOTE" "HEAD:$BRANCH" 2>/dev/null; then echo "PUSH OK (ci.skip) -> $BRANCH"; exit 0; fi
echo "Push abgelehnt (Branch weitergelaufen?) -> fetch + merge (nie rebase), zweiter Versuch"
git fetch -q "$REMOTE" "$BRANCH"
git -c user.name="thesis-pdf-bot" -c user.email="thesis-pdf-bot@ci.comdare.local" merge -q --no-edit FETCH_HEAD \
  || { git merge --abort 2>/dev/null || true; echo "FEHLER: Merge kollidiert -> naechste Pipeline des Branches holt nach"; exit 1; }
git push -q -o ci.skip "$REMOTE" "HEAD:$BRANCH" && echo "PUSH OK nach Merge (ci.skip) -> $BRANCH" \
  || { echo "FEHLER: Push erneut abgelehnt"; exit 1; }
