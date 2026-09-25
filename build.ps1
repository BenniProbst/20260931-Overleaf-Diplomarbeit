# Bilingual build of the diploma thesis with MiKTeX (Windows).
#   pwsh -File build.ps1            # English (default)  -> diplomarbeit-en.pdf
#   pwsh -File build.ps1 -Lang de   # German             -> diplomarbeit-de-lang.pdf
#   pwsh -File build.ps1 -Lang de -Umfang kurz   # Kurzfassung (Abgabe) -> diplomarbeit-de-kurz.pdf
# Runs the mandatory 3-pass build with BibTeX (zihpub.cls).
param([ValidateSet('en','de')][string]$Lang = 'en', [ValidateSet('lang','kurz')][string]$Umfang = 'lang')
$ErrorActionPreference = 'Continue'
$job = "diplomarbeit-$Lang-$Umfang"
$arg = "\def\thesislang{$Lang}\def\thesisumfang{$Umfang}\input{diplomarbeit.tex}"
Push-Location $PSScriptRoot
try {
  & pdflatex -interaction=nonstopmode "-jobname=$job" $arg
  & bibtex   $job
  & pdflatex -interaction=nonstopmode "-jobname=$job" $arg
  & pdflatex -interaction=nonstopmode "-jobname=$job" $arg
  if (Test-Path "$job.pdf") {
    Write-Host "OK [$Lang-$Umfang]: $job.pdf ($([math]::Round((Get-Item "$job.pdf").Length/1KB,1)) KB)" -ForegroundColor Green
  } else {
    Write-Host "FEHLER [$Lang-$Umfang]: $job.pdf nicht erzeugt -- siehe $job.log" -ForegroundColor Red
  }
} finally {
  Pop-Location
}
