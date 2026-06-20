# generate_wide_appendix.ps1 — L8 WIDE-Pipeline-Orchestrator (Phase L, 2026-06-20)
# =============================================================================
# EIN Kommando -> der GANZE cowfix-v1-Mess-Appendix (11 Tabellen) je Sprache
# {de,en}, BYTE-IDENTISCH reproduzierbar zu den committeten kanonischen .tex.
#
# Ersetzt den STALE C1-Orchestrator generate_measurement_appendix.ps1 (16-Spalten,
# Default pipeline_real_organ/measurements.csv), der KEINES der neuen WIDE-Sub-
# kommandos kennt. Dieser Orchestrator verdrahtet die realen cowfix-v1-Aufrufe:
#
#   bias_matrix_table      csv-to-latex <matrix> <out> --schema=wide --caption --label
#   6x lc_surface_<z>      diagram-generator --surface=<z> <matrix> <out>   (Heatmap, full figure)
#   4x ld_exchange_<achse> csv-to-latex --exchange=<matrix> <outdir>        (writer benennt selbst)
#   le_limitierung         csv-to-latex --limitierung <out>                 (statisch, keine CSV)
#
# Quelle = NUR-LESEN die cowfix-v1-Matrix (WIDE, ';'-getrennt, 120.960 Zeilen).
# Die Matrix + Quell-Prosa + zihpub.cls werden NIE veraendert.
#
# Danach optional: build.ps1 -Lang de + -Lang en fuer die bilinguale Abgabe-PDF.
#
#   pwsh -File generate_wide_appendix.ps1
#   pwsh -File generate_wide_appendix.ps1 -Pdf            # baut zusaetzlich beide PDFs
#   pwsh -File generate_wide_appendix.ps1 -Langs de       # nur Deutsch
#
# -----------------------------------------------------------------------------
# m3v2 (SOTA-Reihen / Working-Set-Sweep / seg_coverage): cowfix-v1 hat die Spalten
# NICHT (kein series/working_set_n/sweep_axis/seg_coverage im Header) -> diese
# Sektionen werden PARAMETRISCH UEBERSPRUNGEN (nicht erfunden). Sobald eine
# m3v2-Matrix (#156) vorliegt, genuegt -M3v2 zum Dazuschalten: die exakten
# CLI-Modi sind bereits in main_cli.cpp vorhanden
#   (--sota-series=<csv> <out> | --sweep-axis=<csv> <out> | --seg-coverage=<csv> <out>
#    | diagram-generator --sweep-curve=<z> <csv> <out>).
# -----------------------------------------------------------------------------
param(
  # cowfix-v1-WIDE-Matrix (NUR LESEN). Default = der getrackte Backup-Stand.
  [string]$Csv = "..\..\Messdaten-Backup\tier150_measurements_INDEX320_cowfix-v1_2026-06-18.csv",
  # Build-Verzeichnis mit csv-to-latex.exe + diagram-generator.exe.
  [string]$CodeBuildDir = "..\..\Code\build\msvc-g1",
  # Zu erzeugende Sprachen.
  [ValidateSet('de','en')][string[]]$Langs = @('de','en'),
  # Optional: nach der Generierung beide PDFs via build.ps1 bauen.
  [switch]$Pdf,
  # m3v2-Sektionen dazuschalten (erst mit #156-Matrix; cowfix-v1 = AUS).
  [switch]$M3v2,
  # Optionale separate m3v2-Matrix (series/working_set_n/sweep_axis/seg_coverage).
  [string]$M3v2Csv = ""
)
$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
  $csvPath = (Resolve-Path $Csv).Path
  $csvToLatex = Join-Path $CodeBuildDir "04_csv_to_latex\Release\csv-to-latex.exe"
  $diagramGen = Join-Path $CodeBuildDir "05_diagram_generator\Release\diagram-generator.exe"
  foreach ($exe in @($csvToLatex, $diagramGen)) {
    if (-not (Test-Path $exe)) { throw "CLI-Exe fehlt: $exe (Code-Build erforderlich)" }
  }
  $csvToLatex = (Resolve-Path $csvToLatex).Path
  $diagramGen = (Resolve-Path $diagramGen).Path

  # Bias-Matrix-Caption + Label exakt wie in den committeten .tex.
  # (csv-to-latex escaped die Caption selbst -> ROH uebergeben.)
  $biasCaptions = @{
    de = "Bias-Bruch-Matrix (Median ns/op, Suchverfahren x Lastprofil)";
    en = "Bias-break matrix (median ns/op, search method x load profile)"
  }
  $biasLabel = "tab:bias:search-algo-workload"

  # Die 6 Surface-z_fields -> Dateiname lc_surface_<z>.tex (Heatmap, full figure;
  # KEIN --body-only, die Generator-Funktion schreibt figure+caption selbst).
  $surfaceFields = @(
    'ns_per_op','op_insert_p50_ns','op_lookup_p50_ns',
    'op_erase_p50_ns','op_scan_p50_ns','op_rmw_p50_ns'
  )

  foreach ($lang in $Langs) {
    $outDir = Join-Path $PSScriptRoot "anhang\$lang\tabellen"
    New-Item -ItemType Directory -Force -Path $outDir | Out-Null

    # (1) Bias-Bruch-Matrix (WIDE) ------------------------------------------------
    $biasTex = Join-Path $outDir "bias_matrix_table.tex"
    & $csvToLatex $csvPath $biasTex "--schema=wide" "--caption=$($biasCaptions[$lang])" "--label=$biasLabel" "--lang=$lang"
    if ($LASTEXITCODE -ne 0) { throw "csv-to-latex (bias,$lang) EXIT=$LASTEXITCODE" }

    # (2) 6x lc_surface_<z> (Heatmap je Interface-Funktion) -----------------------
    foreach ($z in $surfaceFields) {
      $surfTex = Join-Path $outDir "lc_surface_$z.tex"
      & $diagramGen "--surface=$z" $csvPath $surfTex "--lang=$lang"
      if ($LASTEXITCODE -ne 0) { throw "diagram-generator (surface=$z,$lang) EXIT=$LASTEXITCODE" }
    }

    # (3) 4x ld_exchange_<achse> (Writer benennt ld_exchange_*.tex selbst) --------
    & $csvToLatex "--exchange=$csvPath" $outDir "--lang=$lang"
    if ($LASTEXITCODE -ne 0) { throw "csv-to-latex (exchange,$lang) EXIT=$LASTEXITCODE" }

    # (4) le_limitierung (statisch, keine CSV) ------------------------------------
    # Stale-Binary-Schutz: write_limitations_longtable emittiert je Build eine FESTE
    # Zeilenzahl. Aelter gebaute csv-to-latex.exe (z.B. msvc-g1) kennen die zuletzt
    # ergaenzten Vorbehalts-Zeilen (14/15: Timer-Overhead, Entwurfs-Etiketten) NICHT
    # → das wuerde die committete kanonische Tabelle still VERKUERZEN. Daher in eine
    # temp-Datei schreiben und NUR uebernehmen, wenn die Erzeugung KEINE Regression
    # (weniger Vorbehalts-Zeilen) gegenueber der vorhandenen Datei ist. Sonst: die
    # kanonische Datei UNANGETASTET lassen + ehrlich warnen (Binary neu bauen).
    $limTex = Join-Path $outDir "le_limitierung.tex"
    $limTmp = Join-Path $outDir "le_limitierung.tex.gen"
    & $csvToLatex "--limitierung" $limTmp "--lang=$lang"
    if ($LASTEXITCODE -ne 0) { throw "csv-to-latex (limitierung,$lang) EXIT=$LASTEXITCODE" }
    $countCaveatRows = {
      param($p)
      if (-not (Test-Path $p)) { return -1 }
      # Vorbehalts-Zeilen = longtable-Datenzeilen "<n> & ... \\" (numerisch beginnend).
      (Select-String -Path $p -Pattern '^\d+\s*&' -AllMatches).Count
    }
    $genRows = & $countCaveatRows $limTmp
    $curRows = & $countCaveatRows $limTex
    if ($curRows -ge 0 -and $genRows -lt $curRows) {
      Remove-Item $limTmp -Force
      Write-Host ("WARN [$lang]: le_limitierung NICHT ueberschrieben — erzeugt $genRows < vorhanden $curRows " +
                  "Vorbehalts-Zeilen (csv-to-latex.exe ist aelter als die Quelle mit Zeilen 14/15; " +
                  "Binary neu bauen, dann erneut laufen). Kanonische Datei bleibt unangetastet.") -ForegroundColor Yellow
    } else {
      Move-Item -Force $limTmp $limTex
    }

    # (5) m3v2-Sektionen: PARAMETRISCH uebersprungen, solange cowfix-v1 die Spalten
    #     nicht hat. Mit -M3v2 + (optional) -M3v2Csv werden sie dazugeschaltet.
    if ($M3v2) {
      $m3csv = if ($M3v2Csv) { (Resolve-Path $M3v2Csv).Path } else { $csvPath }
      $sotaTex = Join-Path $outDir "ma_sota_series.tex"
      $sweepTex = Join-Path $outDir "mc_sweep_axis.tex"
      $segTex  = Join-Path $outDir "md_seg_coverage.tex"
      $sweepCurveTex = Join-Path $outDir "mb_sweep_curve_ns_per_op.tex"
      & $csvToLatex "--sota-series=$m3csv" $sotaTex "--lang=$lang"
      if ($LASTEXITCODE -ne 0) { throw "csv-to-latex (sota-series,$lang) EXIT=$LASTEXITCODE" }
      & $csvToLatex "--sweep-axis=$m3csv" $sweepTex "--lang=$lang"
      if ($LASTEXITCODE -ne 0) { throw "csv-to-latex (sweep-axis,$lang) EXIT=$LASTEXITCODE" }
      & $csvToLatex "--seg-coverage=$m3csv" $segTex "--lang=$lang"
      if ($LASTEXITCODE -ne 0) { throw "csv-to-latex (seg-coverage,$lang) EXIT=$LASTEXITCODE" }
      & $diagramGen "--sweep-curve=ns_per_op" $m3csv $sweepCurveTex "--lang=$lang"
      # sweep-curve liefert status_empty_input (ehrlich leer), wenn working_set_n fehlt -> kein harter Fehler.
      Write-Host "OK [$lang]: m3v2-Sektionen erzeugt (sota/sweep/seg/sweep-curve)" -ForegroundColor Green
    } else {
      Write-Host "SKIP [$lang]: m3v2-Sektionen (cowfix-v1 ohne series/working_set_n/sweep_axis/seg_coverage)" -ForegroundColor Yellow
    }

    Write-Host "OK [$lang]: 11 cowfix-v1-Tabellen -> $outDir" -ForegroundColor Green
  }

  if ($Pdf) {
    foreach ($lang in $Langs) {
      Write-Host "Baue PDF [$lang] ..." -ForegroundColor Cyan
      & (Join-Path $PSScriptRoot "build.ps1") -Lang $lang
    }
  }
  Write-Host "Fertig. EIN-Kommando-Reproduktion: pruefe via 'git diff --stat anhang/' (ZERO = byte-identisch)." -ForegroundColor Cyan
} finally {
  Pop-Location
}
