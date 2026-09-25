# Bilingual full build: produces BOTH PDFs in one command.
#   pwsh -File build_all.ps1     -> diplomarbeit-{de,en}-{lang,kurz}.pdf (4 Fassungen, Order 346)
# Delegates to build.ps1 (mandatory 3-pass pdflatex + BibTeX per language).
$ErrorActionPreference = 'Continue'
Push-Location $PSScriptRoot
try {
  foreach ($lang in @('de','en')) {
    foreach ($umfang in @('lang','kurz')) {
      Write-Host "=== Building [$lang-$umfang] ===" -ForegroundColor Cyan
      & pwsh -File (Join-Path $PSScriptRoot 'build.ps1') -Lang $lang -Umfang $umfang
    }
  }
  Write-Host "=== build_all.ps1 done ===" -ForegroundColor Cyan
  foreach ($lang in @('de','en')) {
    foreach ($umfang in @('lang','kurz')) {
      $pdf = Join-Path $PSScriptRoot "diplomarbeit-$lang-$umfang.pdf"
      if (Test-Path $pdf) {
        Write-Host ("OK  [{0}-{1}]: {2} ({3} KB)" -f $lang, $umfang, (Split-Path $pdf -Leaf), [math]::Round((Get-Item $pdf).Length/1KB,1)) -ForegroundColor Green
      } else {
        Write-Host ("FEHLER [{0}-{1}]: diplomarbeit-{0}-{1}.pdf nicht erzeugt" -f $lang, $umfang) -ForegroundColor Red
      }
    }
  }
} finally {
  Pop-Location
}
