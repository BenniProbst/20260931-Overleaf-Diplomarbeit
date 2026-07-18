# HANDOUT an den Implementierungsagenten — Code-Nachzug nach Thesis-Audit (2026-07-02)

> **Quelle & Autorität:** ultracode-Audit `docs/sessions/2026-07-02-audit-thesis-vs-code.md` (151 Claims: 99 OK / 50 divergent),
> §2 = Code-hinter-Soll, plus **User-Entscheidungsmatrix vom 2026-07-02** (unten). Grundsatz des Users:
> **„Die Diplomarbeit beschreibt den faktischen Sollstand — dieser Diff wird jetzt gemergt."** Wo der Text bereits
> an den Code angeglichen wurde (§1 des Audits, P4–P7), ist NICHTS zu tun; dieses Handout enthält ausschließlich
> die Richtung **Code zieht nach**.
> **HEADs bei Audit:** cache-engine `b8761f0` · prt-art `f98445e` · super `9ee9437` · thesis `df94684`.

## 0. User-Entscheidungsmatrix (bindend)

| # | Thema | Entscheid |
|---|-------|-----------|
| P1 | CSV-Schema | **Beides**: 16-Spalten-Record bleibt Basis UND Cycles/Branches/Durchsatz werden gemessen → Schema-Erweiterung (AP-1). Cycles ist bereits Spalte 6 (`total_cycles`); **fehlend: `branch_misses` + `throughput_ops_per_sec`**. |
| P2 | Profil-XMLs | **Alles soll als XML definierbar sein** → fehlende 3/33 SOTA- + 13/23 Allokator-Profile ergänzen (AP-6). |
| P3 | Hash-Gegenprobe | **Beide als wählbare T0-Achsen-Bausteine** (Präzisierung 2026-07-02): Knuth-Open-Addressing (S14, implementiert) UND SwissTable als eigener Baustein — je Permutation wird genau einer gewählt, **beide werden permutiert** (AP-7). |
| P4–P7 | Mechanismus-Namen/Zählungen (execution_engine<Strategy>, Pools, MP11, ResultAggregator…) | **Code hat recht → Text wurde angepasst.** Kein Code-Handlungsbedarf. |

## 1. Arbeitspakete — Priorität P0 (Gate vor dem M3-Mess-Lauf #156/#162)

### AP-1 (NEU, aus P1): Kanonischen Mess-Record um `branch_misses` + `throughput_ops_per_sec` erweitern
- **Ist:** CSV-Schema = 16 Spalten (`libs/execution_engine/src/result_aggregator.cpp:63–66`); POD `comdare_measurement_record_v1`
  (`include/cache_engine/abi/module_abi_v1.hpp:29–43`) hat weder branch_misses noch throughput; Durchsatz existiert nur im
  Kommando-Pfad (`builder/commands/execution_result.hpp` → `throughput_ops_per_sec`, gefüllt in `execute_engine_command.hpp:119–121`);
  Branch-Misses haben **gar keinen Erhebungspfad** (nur Enum `measurement_category.hpp:16`); `PmcCounters` führt Coherence+Energie,
  aber kein branch/IPC-Feld.
- **Soll:** (a) POD-Erweiterung `branch_misses` + `throughput_ops_per_sec` (ABI/Schema DARF brechen — Messdaten-Direktive: alte
  Messdaten NIE löschen, Konsumenten versioniert lesen); (b) `ResultAggregator::export_csv/json` + `03_binary_to_csv` +
  `04_csv_to_latex` um die Spalten erweitern; (c) Durchsatz aus dem Execute-Pfad in den kanonischen Record durchreichen;
  (d) Branch-Misses in die PMC-Quelle aufnehmen (`linux_perf_pmc_source`: PERF_COUNT_HW_BRANCH_MISSES; Windows-PCM analog),
  hinter `COMDARE_ENABLE_PMC` wie die übrigen Zähler (default OFF bleibt ehrlich).
- **Akzeptanz:** neuer Header enthält beide Spalten; Smoke-Lauf schreibt reale throughput-Werte; branch_misses=0 ohne PMC,
  real unter CI-prod-PMC-Job; Auswertungs-Tools kompilieren + rendern die neuen Spalten.

### AP-2: PRT-ART-Echtpfad (TODO E6) — Audit 2.1 + 2.12
- **Ist:** `prt_art_pruefling_factory.hpp:38` „TODO(E6): echten PrtArtExecutionEngineAdapter einhaengen"; Adapter-Backend =
  unordered_map-Surrogat (`prt_art_execution_engine_adapter.hpp:36–37,73–74`); `prtart_body.hpp.template:52/:68` simuliert 90 ns/op;
  Notify-Hooks nur als Kommentar.
- **Soll:** echten Adapter in die Prüfling-Factory; `PrtArtSearchEngine` statt Surrogat binden; 90-ns-Stub ersetzen;
  `notify_workload_change`-Hook-API implementieren. **Vorbedingung für Messreihe A/C-Aussagekraft und AP-12.**
- **Akzeptanz:** PrtArtPruefling::run() treibt die echte Engine; Konformitäts-Gatter grün; Messwerte ≠ synthetische 90 ns.

### AP-3: IPlatformProbe implementieren + verdrahten (#650) — Audit 2.2
- **Ist:** `i_platform_probe.hpp:27–33` = pures Interface; Hardware-Konstanten hartkodiert (`axis_12_general_hardware_x86_64.hpp:12–14,33`);
  `hardware_filter.hpp:12` „Echte IPlatformProbe-Verdrahtung folgt V34+"; Phase 1 nutzt keinen Probe.
- **Soll:** CPUID/sysfs-Discovery (+ Mikrobenchmark-Vermessung: Line-Größe, Hierarchie-Tiefe, Topologie) und Verdrahtung in
  HardwareFilter/Phase-1-Enumeration/Codegen. Thesis nennt die Probe als Beitrag (01:161, 05:63) — Soll bleibt Text.
- **Akzeptanz:** Probe liefert reale Werte auf ≥2 Plattformen; Phase 1 filtert Achsen-Kompatibilität aus Probe-Daten.

### AP-4: Stufe-3-Full-Join + Messreihe B — Audit 2.3
- **Ist:** Stufe 3 = Skelett-API (`permutation_engine.hpp:236–242`); `experiment_config/messreihen.xml:42–50`: Reihe B „identisch zu
  A_full"; altes 1:1-Mapping in `prt_art_merge_reference.hpp:5–9` widerspricht der Thesis-Zuordnung (St1∪St2→A, St3→B, C build-übergreifend).
- **Soll:** generische Stufe-3-Enumeration (F.6.3) im Builder; messreihen.xml + Driver für Reihe B auf Full-Join umstellen;
  Mapping-Kommentar angleichen.
- **Akzeptanz:** Reihe-B-Lauf enumeriert nachweislich Standard×Prüfling-Kombinationen (nicht A_full-Kopie); tab:stage-series-Zuordnung code-gedeckt.

### AP-5: Full-Sampled-Modus — Audit 2.4
- **Ist:** `MessreihenMode` kennt nur {Defined, Full} (`experiment_driver.hpp:54`); „full_sampled" nur Validator-String
  (`messreihe_v32_validator.hpp:69–70`).
- **Soll:** FullSampled-Enum + deterministisches 1:1000-Sampling in `phase1_enumerate` (seed-stabil), Probe-Kompatibilität als Filter (nach AP-3).
- **Akzeptanz:** Full-Sampled-Lauf erzeugt ~1‰ der Permutationsliste, reproduzierbar bei gleichem Seed.

### AP-6 (NEU, aus P2): Profil-XML-Vollabdeckung
- **Ist:** 30/33 SOTA-Profile (`algorithm_profiles/sota/`), 10/23 Allokator-Profile „lauffähig". Fehlend SOTA: die 3 ohne Profil
  (per Audit P08 ARTSync, P09 LOUDS, P33 VAMPIR — als Organ-/Mess-Quellen geführt).
- **Soll:** JEDE analysierte Veröffentlichung mit mindestens einem XML-Profil (P08/P09 als Organ-Profile bzw. Kompositions-Profile
  mit entsprechendem Achsen-Slot; P33 als Mess-/Telemetrie-Profil) + die 13 fehlenden Allokator-Profile (A-Korpus) als XML —
  extern-gated Vendor-Allokatoren als Profil mit `COMDARE_AXIS_*_ENABLE`-Gate, nicht weglassen.
- **Akzeptanz:** Zählung 33/33 + 23/23 XMLs; `--validate`-Pre-Flight grün; Auto-Pickup des ExperimentDriver findet alle.

### AP-7 (NEU, aus P3, präzisiert): SwissTable als EIGENER wählbarer T0-Baustein neben S14
- **User-Entscheid (bindend):** SwissTable und Knuth-Open-Addressing sind **zwei getrennte, wählbare
  Achsen-Messstrategien auf T0** — je Permutation wird genau eine gewählt, und **beide werden permutiert**
  (beide Teil des Kartesisch-Produkts / der Registry-`mp_list`). KEINE Modellierung als is_original-Bindung
  „derselben" Gegenprobe.
- **Ist:** Hash-Gegenprobe = Knuth-Open-Addressing `HashSearchAlgo` (S14); SwissTable (abseil) nicht angebunden.
- **Soll:** neuer T0-Baustein S22 `SwissTableSearchAlgo` (abseil `flat_hash_map`, Klasse-A-is_original-Linking,
  `COMDARE_AXIS_*_ENABLE`-gated mit sicherem Fallback, damit der Build eigenständig lauffähig bleibt) — eingetragen
  in die T0-Registry-`mp_list` NEBEN S14, mit eigenem `flag_suffix`/Sub-Achsen-Tag; Konstraint-Filter prüfen
  (Hash-Bausteine belegen das Punktanfrage-Subset, trie-spezifische Achsen entfallen — wie S14); je ein
  Profil-XML pro Baustein.
- **Akzeptanz:** Permutations-Enumeration listet S14 und S22 als getrennte T0-Werte; ein Smoke-Lauf enthält
  Permutationen mit beiden; Baustein kompiliert mit/ohne abseil; Text-Aussage „zwei wählbare Hash-Bausteine,
  beide permutiert" ist damit code-gedeckt. (T0-Zählung steigt auf 22 — Text-Agent passt die 21er-Nennungen
  nach Landung an.)

## 2. Arbeitspakete — Priorität P1 (vor Abgabe / vor Ergebnis-Interpretation)

### AP-8: HDR-Histogramm real — Audit 2.5 + 2.16
`hdr_histogram_wrapper/` = leere INTERFACE-CMakeLists; `axis_11_telemetry_latency_histogram.hpp:17–31` = reiner Deskriptor ohne
record/percentile. **Soll:** HdrHistogram_c unter `ext/` vendoren (CC0; Offline-Vendoring-Konvention), LatencyHistogram-Observer
mit p50/p95/p99 implementieren, zentralen Pfad wahlweise darauf umstellen (heute Nearest-Rank, `perm_runner.hpp:83–88`).

### AP-9: Provenance-Logging — Audit 2.6
Compiler/Flags/ISA-Pfad/Allokator/Commit-Hash je Fremdbibliothek in den Mess-Export (heute nur eigene CompilerFamily,
`hardware_filter.hpp:43–44`). Passt zu AP-1 (Schema-Erweiterung in einem Zug planen).

### AP-10: Datensatz-Akten — Audit 2.7
3/8 Akten vorhanden (`Code/test_data_xml/`); url/protein/xml/tpcds-id/trec-terms fehlen; Schema um checksum/line_count/preprocessing
erweitern; echte String-Loader registrieren (heute nur uint64-Beispiel-Loader, `dataset_loader.hpp:44`).

### AP-11: Lastprofil-Katalog LP01–LP14 — Audit 2.8
21 XMLs, nur 8 `lp_*`, keine LP-Nummern-IDs; LP02/03/05/06/07/13 ohne Artefakt. **Soll:** 6 fehlende lp_-XMLs + LP-ID-Attribut
und Zuordnung LP01–LP14→XML.

### AP-12: Fairness-Harness Common-Denominator vs. Native — Audit 2.9 (setzt AP-2 voraus)
Expliziter Modus-Schalter (externe ValueHandles erzwingen, PRT-ART-Spezialpfade deaktivierbar) im Vergleichs-Harness.

### AP-13: P/E-Core-Pinning + 3-ISA-Build-Matrix — Audit 2.10
Konkrete IPinningPolicy + Affinity-Aufrufe im Mess-Pfad; Build-Preset-Matrix (Scalar/AVX2/AVX-512) je Plattform vor den Zielplattform-Läufen.

### AP-14: Achsen-Sensitivität Makro/Gesamt — Audit 2.11 (nach #215/#156)
Varianz-Dekomposition über Achsen-Subtrees + Makro-/Gesamt-Ranking mit Empfehlungs-Export (heute nur Micro-Welch + p50-Ranking).

### AP-15: std::map-Vertrags-Vollausbau — Audit 2.13/2.14/2.15
(a) Konformitäts-Gatter von 5 Kern-Ops auf die 17 Dagger-Operationen (`conformance_gate.hpp:10–11,48–115`; Drive-Voll-API);
(b) `get_allocator()` in beiden `PrtArtSearchEngine`-Spezialisierungen (triviale Delegation; `clear()`-status_t-Abweichung dokumentieren);
(c) generische Kompositions-Schicht: at/operator[]/count/contains/equal_range/try_emplace/insert_or_assign fest über das
Organ-Primitiv ableiten (Anhang F:197 beschreibt dieses Soll).

## 3. Beim Formulieren/Weiterbauen beachten (Kategorie-A-Sweep, kein eigenes AP)
- `abi_adapter.hpp:1810` [#226]: **Scan** misst bei Pool-Familien noch den container_-Spiegel (Rest-Echtheit mit #188-Folgeschritten).
- `abi_adapter.hpp:807/865/1819`: Storage-/Prefetch-Achsen der 9 Pool-Familien = **honest-0** (DEG-2, by design bis 4b-c/D).
- `ceb_generator.hpp:9,64`: CEB-`perm_run`-Stub misst 0.0 (Default-Pfad ohne Anatomie-Binding).
- PMC: `COMDARE_ENABLE_PMC` default OFF; echte PMC nur CI-prod (`.gitlab-ci.yml:71`); pmc:intel hängt an prod2-Rebuild #207.
- Deferred/Skelette: Masstree ohne Pool-Wrapper (#234), CoCo-trie (kein CRUD-API), HOT-Concurrency=OLC-Approx statt RCU-light,
  SuRF roher PaperBinding-Wrapper, Eytzinger-BFS (#188-4a) offen, a01_hoard=malloc-Stub, `search_organ_`-Doppelhaltung (Q2 S.4), Blob-Footer CRC=0.
- Legacy-`measurement_writer.hpp` (02_messung_driver): 3-GHz-Cycles-Approximation, L1–L3/dTLB=0 — abgelöster Alt-Pfad; NICHT erweitern, AP-1 zielt auf den kanonischen Record.

## 4. Direktiven (gelten unverändert)
- **Messdaten NIE löschen** — ABI/Schema darf brechen (AP-1); alte Läufe versioniert lesbar halten.
- **Kein Runtime-Switch** der Achsen (MP11-Typlisten; Auswahl übersetzungszeitlich) — AP-7/AP-6 entsprechend compile-gated.
- **Codex-MCP-Review vor „done"** je AP (Code-Repos only); CI-Hard-Gates grün; keine Quick-Fixes, sauberster Weg.
- Runner-/CI-Konventionen unverändert (halbe Kerne, concurrent=2, CMAKE_BUILD_PARALLEL_LEVEL).
- prod-CI-Messläufe sind mehrtägig — nicht aktiv pollen; Infra-Erfolg = build+Cache+Toolchain.
- Empfohlene Reihenfolge: **AP-1 → AP-2 → AP-3 → AP-4 → AP-5 → AP-6/AP-7** (M3-Gate), dann AP-8…AP-15; AP-14 nach #215/#156.

## 5. Rückmeldung
Je AP nach Abschluss: 1-Zeilen-Status + Beleg (Datei:Zeile / Pipeline-ID) in den Single-Source-Ledger-Abschnitt bzw. als
Session-Handoff; Text-Agent übernimmt danach etwaige Thesis-Feinanpassungen (z.B. „Erhebungspfad folgt" → „erhoben").
