# Bilingual full build: produces BOTH PDFs in one command.
#   pwsh -File build_all.ps1     -> diplomarbeit-de.pdf  AND  diplomarbeit-en.pdf
# Delegates to build.ps1 (mandatory 3-pass pdflatex + BibTeX per language).
$ErrorActionPreference = 'Continue'
Push-Location $PSScriptRoot
try {
  foreach ($lang in @('de','en')) {
    Write-Host "=== Building [$lang] ===" -ForegroundColor Cyan
    & pwsh -File (Join-Path $PSScriptRoot 'build.ps1') -Lang $lang
  }
  Write-Host "=== build_all.ps1 done ===" -ForegroundColor Cyan
  foreach ($lang in @('de','en')) {
    $pdf = Join-Path $PSScriptRoot "diplomarbeit-$lang.pdf"
    if (Test-Path $pdf) {
      Write-Host ("OK  [{0}]: {1} ({2} KB)" -f $lang, (Split-Path $pdf -Leaf), [math]::Round((Get-Item $pdf).Length/1KB,1)) -ForegroundColor Green
    } else {
      Write-Host ("FEHLER [{0}]: diplomarbeit-{0}.pdf nicht erzeugt" -f $lang) -ForegroundColor Red
    }
  }
} finally {
  Pop-Location
}
