# Audit-Bericht: Thesis vs. Code (2026-07-02)

## Kopf

**Zweck:** Vollabgleich der Thesis-Behauptungen (Kapitel 1–6 DE + Anhänge) gegen den realen Code-Stand der drei Repos. Jede divergente Stelle wird einer Korrektur-Richtung zugeordnet: entweder ist der **Thesis-Text** zu korrigieren (Richtung `thesis`) oder der **Code** liegt hinter dem Thesis-Soll (Richtung `code-todo`).

**Methode:** ultracode-Lauf mit **12 Kapitel-Readern** (Claim-Extraktion aus allen DE-Kapiteln/Anhängen) + **6 Code-Auditoren** (Ist-Stand+Delta, TODO-Sweep cache-engine, Mess-Pfad, prt-art, Diplomarbeit-Code, Profile+Zählungen) + **11 adversarialen Verifiern** (jeder Befund gegen Code-Belege gegengeprüft, Verdicts DIVERGENT/OK/UNKLAR). Alle Zeilen-/Datei-Belege stammen aus READ-ONLY-Prüfung der Repos.

**Repos + HEADs (git rev-parse --short HEAD, 2026-07-02):**

| Repo | Pfad | HEAD |
|---|---|---|
| Super-Repo „Diplomarbeit - Datenbanken" (enthält `Code/` + `thesis/`) | `C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken` | `9ee9437` |
| Thesis (Submodul) | `.../thesis/diplomarbeit` | `e45bee7` |
| comdare-cache-engine | `.../Code/external/comdare-cache-engine` | `b8761f0` |
| comdare-prt-art | `.../Code/external/comdare-prt-art` | `f98445e` |

**Vollständigkeits-Hinweis:** Der Verifier-Lauf meldete 50 DIVERGENT-Befunde; in diesem Bericht sind die 30 vollständig übermittelten Einträge verarbeitet (Übergabe-Payload nach dem Eintrag `06_fazit.tex:63` abgeschnitten; dieser Eintrag selbst wurde über Code-Report 3 §7 gegenverifiziert und ist enthalten). Die restlichen ~20 Einträge müssen aus dem Verifier-Rohoutput nachgetragen werden — siehe §4.

> **⚠️ EN-SPIEGELUNG:** Alle §1-Korrekturen benennen die **DE-Stelle** (`kapitel/de/...`). Jede Korrektur MUSS anschließend im englischen Pendant (`kapitel/en/...`, gleiche Abschnitte) gespiegelt werden — DE führt, EN folgt.

---

## §1 KORREKTURSTELLEN THESIS (Richtung `thesis`)

### Priorität 1 — faktisch falsch

**1.1 `kapitel/de/05_evaluation.tex:92` — measurements.csv-Spaltenschema falsch**
- **Claim:** Eine Zeile je Permutation mit Spalten Cycles, L1/L2/L3-Misses, **Branches und Durchsatz**.
- **Code-Beleg:** Kanonisches 16-Spalten-Schema (identisch in `libs/execution_engine/src/result_aggregator.cpp:63-66` und `Code/03_binary_to_csv/binary_to_csv.cpp:58-61`): permutation_id, fingerprint, succeeded, workload_used, op_count, total_cycles, cache_misses_l1/l2/l3, dtlb_misses, coherence_invalidations, energy_micro_joules, bytes_allocated, bytes_in_use_peak, external_frag, internal_frag. **Keine** Branch-, **keine** Durchsatz-Spalte. Legacy-Writer (`02_messung_driver/measurement_writer.hpp:103-112`) hat L1–L3/dTLB zudem hartkodiert 0.
- **Korrektur:** Spaltenliste auf das reale 16-Spalten-Schema umstellen; „Branches" und „Durchsatz" streichen bzw. als abgeleitete Größe (op_count/Zeit) kennzeichnen. → EN spiegeln.

**1.2 `kapitel/de/02_suchbaeume_grundlagen.tex:93` — Profil-Zählung 33/23 stimmt nicht**
- **Claim:** Alle 33 Paper (P01–P33) und alle 23 Allokator-Arbeiten (A01–A23) „jeweils als XML-Profil persistiert".
- **Code-Beleg:** `libs/cache_engine/algorithm_profiles/sota/` = **30** XMLs (P08, P09, P33 fehlen); `algorithm_profiles/allocators/README.md`: „Mitglieder (10)" = **10** XMLs. Die 23 Allokator-Familien existieren nur als Code-Verzeichnisse `a01_hoard..a23_vmem_magazines`.
- **Korrektur:** Präzisieren: 30 der 33 SOTA-Paper (ohne P08/P09/P33) und 10 der 23 Allokator-Arbeiten als XML-Profil; Rest via Anhangs-Matrizen/PAPER_REFERENCES.md dokumentiert. (Alternative: fehlende Profile als Code-TODO nachziehen, s. §2.) → EN spiegeln.

**1.3 `kapitel/de/02_suchbaeume_grundlagen.tex:103` — „SwissTable-Gegenprobe" ist keine SwissTable**
- **Claim:** SwissTable-Hash-Gegenprobe innerhalb der SearchAlgorithm-Gattung realisiert.
- **Code-Beleg:** Kein SwissTable-Code im Repo. Realisiert ist **HashSearchAlgo S14**: Open-Addressing mit Linear Probing + Fibonacci-Hashing nach Knuth TAOCP 3 §6.4 (`axes/lookup/axis_03a_search_algo_hash_search.hpp:7-9`, `is_original=false`). Zusatz: hash = Pool-Familie Weg-B, Storage-/Prefetch-Achsen honest-0 (`abi_adapter.hpp:807/865/1819`).
- **Korrektur:** Gegenprobe als Knuth-Open-Addressing-Hashtabelle (HashSearchAlgo S14) benennen; SwissTable nur als Literatur-Vergleichsgröße bzw. geplante Variante. → EN spiegeln.

**1.4 `kapitel/de/04_implementierung.tex:27` — `execution_engine<Strategy>` existiert nicht mehr; EXPERIMENT_MODE-Gating nicht verdrahtet**
- **Claim:** Konkrete `execution_engine<Strategy>`, Mess-Aggregator nur unter `-DCOMDARE_EXPERIMENT_MODE=ON` mitkompiliert.
- **Code-Beleg:** `abi_adapter.hpp:121-125`: Legacy-Klassen `comdare::search_engine<>`/`execution_engine<>` „waren ein toter Parallel-Baum und wurden ENTFERNT"; konkrete Laufzeit-Sicht = `SearchAlgorithmAbiAdapter<A>` über `SearchAlgorithmAnatomy` (I1). CMake-Option existiert (`CMakeLists.txt:385-389`), aber **kein** `#ifdef` in libs/apps konsumiert das Define — der Aggregator wird nicht durch das Flag gegated.
- **Korrektur:** `SearchAlgorithmAbiAdapter<A>`/`SearchAlgorithmAnatomy` als konkreten Adapter nennen; EXPERIMENT_MODE-Aussage abschwächen (Option existiert, Gating nicht verdrahtet — Overhead-Freiheit läuft real über `COMDARE_MEASUREMENT_ON`, vgl. 1.10). → EN spiegeln.

**1.5 `kapitel/de/04_implementierung.tex:18` — Pool-Formel „4+2" falsch; Komponenten sind Skelette**
- **Claim:** PRT-ART-Bausteine u.a. „4+2-Allokator-Pools".
- **Code-Beleg:** `comdare-prt-art/prt_art/include/prt_art/allocator/pool_set.hpp:2,15`: „alle **7** Allocator-Pools (4 Page-Pools + R + V-static + V-dynamic)", `kPoolCount=7` — also **4+1+2** (Rest-Pool R fehlt in der Thesis-Formel). Pools sind reine Deskriptor-/Statistik-Skelette (nur configure/note_alloc, kein allocate()); Engine-Datenpfad = Fassade über std::vector/std::map (`prt_art_search_engine.hpp:316,344`).
- **Korrektur:** Formel auf „4+1+2 (7 Pools: A–D Größenklassen, Rest-Pool R, zwei reservierte Wert-Pools)" korrigieren; kennzeichnen, dass Pools/Prefetch/Layout derzeit Deskriptor-Skelette ohne echte Speicheranbindung sind. → EN spiegeln. *(Gilt überall, wo „4+2" steht — auch `03_messsystem` C-Merge-Beschreibung prüfen.)*

**1.6 `kapitel/de/04_implementierung.tex:79` — Flag-Familie `COMDARE_HAVE_<X>` beschreibt nicht den Ist-Mechanismus**
- **Claim:** Jeder SOTA-/Allokator-Adapter durch `COMDARE_HAVE_<X>` + `#if defined`-Block geschützt.
- **Code-Beleg:** Nur 3 `COMDARE_HAVE_*`-Vorkommen repo-weit (Legacy/Doku). Operativ: **168** `COMDARE_AXIS_*_USE_/ENABLE_`-Flags — Allokator-Vendors per Vendor-Shim `#if COMDARE_AXIS_06_USE_<X>` + Forward-Stubs (`mimalloc_include.hpp:6-20`, `jemalloc_include.hpp:6-16`); SOTA via constexpr-Enable-Flags + mp_filter (`axis_03a_search_algo_registry.hpp:90-93`). Hoard-Adapter = ungeschützter malloc-Durchleit-Stub (`hoard_adapter.hpp:26`).
- **Korrektur:** Flag-Familie korrekt benennen (per-Vendor-Shim + constexpr-Enable + mp_filter, Fallback StdMalloc/Re-Impl); `COMDARE_HAVE_<X>` nur als historisches Detektions-Define. → EN spiegeln.

**1.7 `kapitel/de/04_implementierung.tex:75` — resolve_baustein: Mechanismus + Geltungsbereich falsch**
- **Claim:** Auflösung via `std::conditional_t` über Tag-Spezialisierungen.
- **Code-Beleg:** `resolve_baustein.hpp:22-23,97-111`: Concept `has_member_baustein` + `if constexpr` in `decltype(choose<Algo>())`; kein `conditional_t` in der Datei. Geltungsbereich laut Datei-Kopf (Z.9): nur die **11** PRT-ART-Fallback-Achsen aus baustein_variants.hpp, nicht alle 19.
- **Korrektur:** „Concept-geprüftes `if constexpr` über Tag-Spezialisierungen"; Geltungsbereich (11 Fallback-Achsen) präzisieren. → EN spiegeln.

**1.8 `kapitel/de/04_implementierung.tex:86` — Permutations-Identifier: Wachstumsziel und 19-Achsen-Identität falsch zugeordnet**
- **Claim:** Wächst von 9 Bänken (~50 Bit) auf mehrbänkigen Identifier mit Sub-Bank-Bitfeldern „für 19 Achsen".
- **Code-Beleg:** `permutation_flags_v32.hpp:7-16,29-41`: V31 = 9 Banks (~50 bit) → V32.2 = **14 Banks (82 bit)** mit Sub-Bank-Bitfeldern. Die 19-Achsen-Identität läuft im aktiven Mess-Pfad separat über den **string-serialisierten Kompositions-Pfad + Fingerprint** (`axis_path_serialization.hpp:27,41`); V32 im Builder nur in einem Test verdrahtet. Constraint-Filter existiert (`permutation_flags.hpp:184`; `permutation_strategy_concept.hpp:130`).
- **Korrektur:** Wachstumsziel als „14 Bänke (82 Bit)" beziffern; klarstellen, dass die 19 Kompositions-Achsen über serialisierten Achsen-Pfad + Fingerprint identifiziert werden. → EN spiegeln.

**1.9 `kapitel/de/01_einleitung.tex:142` — „std::variant-Bausteine" widerspricht der User-Direktive im Code**
- **Claim:** 19-Achsen-Permutationsmatrix „mit std::variant-Bausteinen".
- **Code-Beleg:** `src/permutations/permutation_strategy_concept.hpp:10-11`: „Boost.MP11 … KEINE std::variant (Runtime-Tag verboten — [[no-runtime-switch]])". Der std::variant-Katalog (`baustein_variants.hpp:2`) ist eine Alt-Schicht für nur 11 Achsen. 19 Achsen + Compile-Time-Fallback stimmen (`axis_path_serialization.hpp:27-31`; `resolve_baustein.hpp:2-13`).
- **Korrektur:** „mit Boost.MP11-Compile-Time-Typlisten-Bausteinen (kein Runtime-Tag/std::variant)"; variant-Katalog als historische 11-Achsen-Vorstufe. → EN spiegeln.

**1.10 `kapitel/de/06_fazit.tex:30` — ResultAggregator ist KEIN ExecutionEngine-Member**
- **Claim:** ResultAggregator integraler ExecutionEngine-Member; Modus-Split ohne Overhead.
- **Code-Beleg:** Freistehende Klasse (`libs/execution_engine/include/comdare/experiment/result_aggregator.hpp:39`), host-seitig lokal in `ExperimentDriver::run_pipeline_full` instanziiert (`experiment_driver.cpp:476`); `execution_engine_base.hpp` ohne Aggregator-Member. Overhead-Freiheit real über `COMDARE_MEASUREMENT_ON`-Gating der Observer-Kopplungen (`abi_adapter.hpp:762-830`), nicht über `COMDARE_EXPERIMENT_MODE_ON`.
- **Korrektur:** „ResultAggregator wird host-seitig im ExperimentDriver geführt (Phase 5/7); der Experiment-Modus aktiviert die Mess-Hooks/Observer-Kopplung im ABI-Adapter." → EN spiegeln. *(Konsistent mit 1.4 halten.)*

**1.11 `kapitel/de/06_fazit.tex:50` — Kennung heißt `get_compiler()`, nicht `experiment_compiler()`**
- **Claim:** SHA256-validierte Original-Bodies + „experiment_compiler()-Kennung".
- **Code-Beleg:** Provenienz-Pflicht-API = `get_compiler()` in AxisBase (`topics/axis_base.hpp:64,92`, Default „original", Paper-Mixin-Override z.B. „gcc-9.5"). `experiment_compiler()` existiert genau 1× als lokale Funktion des LOUDS-Sparse-Filter-Organs (`louds_sparse_filter_organ.hpp:150`). SHA256-Teil + Bit-Banken stimmen.
- **Korrektur:** API-Namen auf `get_compiler()` korrigieren (oder Einzelfall des Filter-Organs ausweisen). → EN spiegeln.

**1.12 `kapitel/de/01_einleitung.tex:151` — PRT-ART-Organ-Menge im Achsen-System falsch aufgezählt**
- **Claim:** 6 Schlüsselstellen als eigene Organe: Build-Achse Seitentyp + Layout, Allocator 4+2, Prefetch, Concurrency-OLC, Telemetry.
- **Code-Beleg:** Als eigene Organe existieren: Page-Type-Slot, PathOrientedPrefetch, OlcReservedBlocksConcurrency, Telemetry-Slot, **Value-Handle-Slot** (`axis_14_value_handle_slot.hpp`, ChainRef) und **PrtArtPathCompressionOrgan/Redirect** (`prt_art_merge_reference.hpp:38-44`). **Layout und Allocator fehlen als Organe**: kein MultiLevel in AllLayouts (`axis_05_memory_layout_registry.hpp:35-36`), kein 4+2-Pool in der Free-List-Sub-Achse (kPrtArtPool = nur Flags-Kombination, `allocator_permutation_flags.hpp:198`); PrtArtComposition nutzt CacheLineAligned + Mimalloc (`prt_art_reference.hpp:66-68`).
- **Korrektur:** Organ-Menge korrigieren: Seitentyp (Build), Pfadkompression (Redirect), Prefetch, OLC-Concurrency, Telemetrie, Value-Handle (ChainRef-Slot); MultiLevel-Layout und 4+2-Allokator sind (noch) keine Organe. (Alternative: Layout-/Allocator-Organe als Code-TODO nachziehen und Text belassen — Entscheidung nötig.) → EN spiegeln.

### Priorität 2 — veraltet / zu pessimistisch

**1.13 `kapitel/de/04_implementierung.tex:151` — T0 hat inzwischen 21 Bausteine, nicht 17**
- **Code-Beleg:** `axis_03a_search_algo_registry.hpp:52-88`: 21 Einträge S01–S21 = 17 Basis + 4 per-K-k-ary-Wrapper K2/K4/K8/K16 (#188, Commit `7c1f444`, 2026-07-01, eigene Enable-Flags, Default OFF).
- **Korrektur:** „21 (17 Basis-Bausteine + 4 opt-in per-K-k-ary-Wrapper K2/K4/K8/K16)" oder Stichtag der 17er-Zählung explizit machen. → EN spiegeln.

**1.14 `kapitel/de/01_einleitung.tex:168` — Binary-Auswahl/Versand nicht mehr komplett offen**
- **Code-Beleg:** `builder/best_binary_selector/best_binary_selector.hpp:2-26` + `.cpp:90,195` (#172): rank_binaries() (Median nearest-rank je Metrik), Auflösung binary_id→perm.dll, Versand-Artefakt (DLL + .version-Sidecar + Manifest); eigenes Executable (`tools/best_binary_selector/CMakeLists.txt:7`).
- **Korrektur:** „Ein erstes Inkrement der automatischen Auswahl und des Binary-Versands ist als eigenständiges Werkzeug (best_binary_selector, #172) implementiert; die heuristik-gesteuerte Vollautomatisierung bleibt Ausblick." → EN spiegeln.

**1.15 `kapitel/de/06_fazit.tex:63` — „Modul-Bodies sind Stubs" gilt für den aktiven Mess-Pfad nicht mehr**
- **Code-Beleg (via Code-Report 3 §7 gegenverifiziert):** Der aktive Mess-Pfad emittiert über `codegen/adhoc_emitter.hpp:2-8` pro Permutation `COMDARE_DEFINE_ANATOMY_MODULE_ADHOC` mit den 17 FQ-Achsen-Typen + Umbrella-Include → Bodies = **reale Achsen-Library-Algorithmen**. Nur der Legacy-Profil-Pfad (`codegen.cpp:95-190`, `*_body.hpp.template`) ist Skelett/Stub.
- **Korrektur:** Differenzieren: adhoc-Codegen des Mess-Pfads erzeugt reale Bodies; Stub-Aussage nur noch für den Legacy-Profil-Codegen und die verbleibenden Lücken (PRT-ART-Prüfling-Stub, DEG-2 honest-0-Achsen, s. §2/§5). → EN spiegeln. *(Verifier-Begründung in der Übergabe abgeschnitten — Endfassung gegen Rohoutput prüfen.)*

### Priorität 3 — kosmetisch

**1.16 `kapitel/de/05_evaluation.tex:94` — „Steckbriefe je Profil" → „je Permutation(-ID)"**
- **Code-Beleg:** `Code/04_csv_to_latex/csv_to_latex.hpp:213` („Steckbrief pro Permutation-ID"), README.md:8 („je Tupel"). Alle drei Tools existieren (binary_to_csv, csv_to_latex, diagram_generator inkl. Heatmaps/Scatter/Bar, \textwidth-Fit; Overfull-Bug #173 offen).
- **Korrektur:** „Steckbriefe je Permutation(-ID)" (in Reihe A_defined entspricht das je einem SOTA-Profil). → EN spiegeln.

### Nachtrag 2026-07-02 (aus dem Workflow-Journal) — Priorität 1 — faktisch falsch

**1.17 `anhang/de/A_measurements.tex:12` — „gemessene" Cache-Misses sind hartkodiert 0**
- **Claim:** Je Permutation werden Operationen, Taktzyklen und Cache-Misses L1–L3 gemessen und tabelliert.
- **Code-Beleg:** Tabelliert ja, gemessen nein: der Legacy-Writer setzt cache_misses_l1/l2/l3 hartkodiert 0 („Phase 6+: PMU-Counter") und approximiert total_cycles aus µs/op mit 3-GHz-Annahme (`Code/02_messung_driver/measurement_writer.hpp:103-110`); alle L1/L2/L3-Zellen der generierten Tabellen sind 0 (`anhang/de/tabellen/cartesian_smoke43_table.tex:9-51`); die eigene Limitierungs-Tabelle sagt „= 0 / nicht erhoben" (`le_limitierung.tex:20`). „Gemessenen" widerspricht dem eigenen Limitierungs-Anhang.
- **Korrektur:** Umformulieren zu „tabellierte Kennzahlen (Operationen; Taktzyklen approximiert; Cache-Misses L1–L3 derzeit 0/nicht erhoben, vgl. Limitierung 1)" bzw. auf die Limitierungs-Tabelle verweisen. → EN spiegeln.

**1.18 `anhang/de/A_measurements.tex:21` + `kapitel/de/06_fazit.tex:76` — Smoke-43-Achsen-Zählung falsch (weder „kartesisch 3 Achsen" noch „4 von 19 variiert")** *(zusammengefasst: gleiche Aussage in zwei Kapiteln)*
- **Claim:** A:21: die 43 Permutations-DLLs seien kartesische SIMD×Layout×Allokator-Kombinationen (3 Achsen); Fazit:76: die realen Smoke-Messungen variierten „nur vier der neunzehn Achsen bei fünfzehn gepinnten".
- **Code-Beleg:** Rechnerisch unmöglich (3×3×3=27≠43) und durch die generierte Tabelle widerlegt (`anhang/de/tabellen/cartesian_smoke43_table.tex`): Block A (Z.9–35, 27 Zeilen) = SIMD(scalar/sse4/avx2)×Layout(aos/soa/hybrid)×Allokator(std/jemalloc/mimalloc); Block B (Z.36–51, 16 Zeilen, pa_compact/wide × lazy/none × binary/linear × leaf_only/sampling) variiert 4 ANDERE Achsen (Node-Breite, Path-Compression, interne Suche, Telemetrie) — insgesamt 7 variierte Achsen (über die Gesamtreihe 12 gepinnte; je Teilblock 16 bzw. 15). „4 von 19 bei 15 gepinnten" beschreibt nur Block B isoliert; der Wall-Clock-Proxy-Teil bleibt korrekt.
- **Korrektur:** Beide Stellen umstellen auf „27 SIMD×Layout×Allokator-Kombinationen plus 16 weitere Kombinationen über Node-Breite/Path-Compression/interne Suche/Telemetrie (2^4) — in Summe sieben variierte der neunzehn Achsen in zwei Teilblöcken" (bzw. die 4-Achsen-Aussage explizit auf den pa_-Teilblock beschränken). → EN spiegeln.

**1.19 `anhang/de/A_measurements.tex:34` — L-f-Tabellen entstehen aus dem WIDE-Schema, nicht aus dem 16-Spalten-Schema**
- **Claim:** Die L-f-Auswertungs-Tabellen würden aus dem 16-Spalten-Schema (Pfad A / run_workload) erzeugt (die de/en-Symmetrie der Tabellen-Verzeichnisse stimmt).
- **Code-Beleg:** Bias-Matrix aus parse_wide_csv (WideMeasurementRow mit ns_per_op + two_phase_valid, `Code/04_csv_to_latex/csv_to_latex.hpp:55-66`; Generator-Kommentar „tier×workload WIDE-Schema", `csv_to_latex.cpp:242`); Surfaces/Exchange aus parse_wide_csv_full („volle 19-Achsen-Tupel + op_<art>_p50-Spalten", hpp:89-91); le_limitierung ist statisch ganz OHNE CSV (hpp:165-167). Das 16-Spalten-Schema (`Code/03_binary_to_csv/binary_to_csv.cpp:57-61`) enthält weder ns_per_op noch two_phase_valid noch p50-Spalten — daraus sind diese Tabellen gar nicht erzeugbar.
- **Korrektur:** Kommentarblock korrigieren: L-f-Tabellen entstehen aus dem WIDE-Schema (19-Achsen-Tupel + op_*_p50 + two_phase_valid), nicht aus dem 16-Spalten-Schema; le_limitierung ist statisch ohne CSV. → EN spiegeln.

**1.20 `anhang/de/C_glossary.tex:14` — „zur Laufzeit wählbare Achsen" gibt es nicht ([[no-runtime-switch]])**
- **Claim:** Achsen seien teils compile-time-fixiert, teils zur Laufzeit über den Permutations-Identifier dynamisch wählbar.
- **Code-Beleg:** Durchgängige [[no-runtime-switch]]-Doktrin („COMPILE-TIME Mess-Dimensionen (je Binary gebacken, kein Runtime-Switch)", `cacheline_study.profile.xml:52`; `pruef_dock.hpp:10-11`; Organ-Tags u.a. `art_trie_traversal_organ.hpp:16`). Der Permutations-Identifier ist die String-Identität eines FERTIG kompilierten Moduls (`measurement_snapshot.hpp:11,32`) — zur Laufzeit wird ein Modul GELADEN, keine Achse umgeschaltet. Daneben existieren genau 5 laufzeit-STEUERBARE Achsen (Resource-Controls/Caps: concurrency/prefetch/allocator/traversal/value_handle, `abi_adapter.hpp:32,191`), keine Strategie-Wahl.
- **Korrektur:** Glossar-Definition „Dynamisch" umformulieren: alle 19 Achsen sind je Binary compile-time-gebacken; „dynamisch" meint die Laufzeit-Auswahl des fertig kompilierten Permutations-Moduls über den Identifier (Modul-Ladung), ergänzt um fünf laufzeit-steuerbare Resource-Control-Achsen — keine Laufzeit-Wahl einzelner Achsen-Strategien. → EN spiegeln.

**1.21 `anhang/de/D_building_block_matrix.tex:756` — T17 wird NICHT „zur Laufzeit durch eine W2-Registry" selektiert**
- **Claim:** Die 15 Queuing-Bausteine (Q01–Q15) würden zur Laufzeit durch eine W2-Registry selektiert.
- **Code-Beleg:** Zählung 15 stimmt (`axis_q1_queuing_registry.hpp:38-50`; der Doc-Kommentar „14 W2-Strategien" Z.37 ist selbst stale). Die Registry ist eine reine Compile-Time-mp_list; Selektion erfolgt übersetzungszeitlich via Enable-Flags (mp_filter über S::enabled, Z.55) pro Permutations-Binary — Designprinzip „kein Runtime-Switch" (CRTP+Concept). „W2" bezeichnet die Recherche-Welle 2 (`topic_queuing_concept.hpp:7`), keine Laufzeit-Registry (Grep „W2-Registry" = 0 Treffer).
- **Korrektur:** Formulieren: „… die übersetzungszeitlich über die Achsen-Registry (mp_list der W2-Recherche, Enable-Flag-gefiltert) pro Permutations-Binary selektiert werden (kein Runtime-Switch)". → EN spiegeln.

**1.22 `anhang/de/F_comparison_interfaces.tex:213-214` — tab:if-decomp: operator[]/at beschreiben den ISO-Vertrag, nicht die eigene Mess-Hülle** *(zusammengefasst: zwei Zeilen, gleiche Klarstellung)*
- **Claim:** In der Cache-Engine sei map::operator[] als lower_bound + Default-Einfügen komponiert (mutiert bei Fehlen, wirft nie) und map::at als find + Wurf von std::out_of_range (einziger werfender Zugriff, mutiert nie).
- **Code-Beleg:** Die eigene Hülle weicht bewusst ab: operator[] ist CONST-Lesen mit std::optional und fügt bei Fehlen NICHT ein („Schreib-API bewusst nicht als reference — Concurrency-Korrektheit (use set() / insert_or_assign)", `prt_art_search_engine.hpp:492-497`); at wirft NICHT (optional-Rückgabe, :381-383; std::out_of_range existiert im map-Pfad nicht, nur status_out_of_range errno-style im vector-Pfad), und der Mess-ABI-Vertrag VERBIETET werfende Hüllen („eine werfende Huelle verletzt den ABI-noexcept-Vertrag → gilt als nicht-konform", `conformance_gate.hpp:33`, catch(...)→check(false) :113).
- **Korrektur:** In Anhang F klarstellen, dass tab:if-decomp den ISO-Standardvertrag beschreibt; die eigene Mess-Hülle bildet operator[] bewusst als nicht-mutierendes optional-Lesen (Schreibpfad set()/insert_or_assign) und at ohne Wurf (optional-/Status-Rückgabe) ab, weil der ABI-Konformitätsvertrag noexcept verlangt. → EN spiegeln.

**1.23 `kapitel/de/06_fazit.tex:72` — PMC-Zähler-Liste: Branch-Misses und IPC werden nirgends erfasst**
- **Claim:** PMC-Erfassung (L1/L2/L3-, dTLB-, Branch-Misses, IPC) default-abgeschaltet; HW-Spalten der Smoke-Reihe = 0.
- **Code-Beleg:** Kern stimmt (option COMDARE_ENABLE_PMC OFF, `CMakeLists.txt:44`; NullPmcSource ehrlich available()=false, `pmc_source.hpp:41-47`; Smoke-L1/L2/L3 = 0). Aber PmcCounters umfasst cache_misses_l1/l2/l3, dtlb_misses, coherence_invalidations, energy_micro_joules (`pmc_source.hpp:19-27`) — Branch-Misses und IPC werden NIRGENDS erfasst (kein Treffer in linux_perf_/windows_pcm_pmc_source; measurements.csv ohne Branch-/IPC-Spalte, `binary_to_csv.cpp:58-61`).
- **Korrektur:** Zähler-Liste an PmcCounters angleichen (L1/L2/L3-, dTLB-Misses, Coherence-Invalidations, Energie/RAPL) — Branch/IPC streichen oder explizit als nicht erfasste Größen kennzeichnen. → EN spiegeln.

### Nachtrag 2026-07-02 (aus dem Workflow-Journal) — Priorität 2 — veraltet / zu pessimistisch

**1.24 `anhang/de/D_building_block_matrix.tex:742` — BloomFilter-Limitierung „Pseudo-Bitmap-Probe" überholt (echte m-Bit-Bitmap seit P5/#124)**
- **Code-Beleg:** `axis_filter_bloom.hpp:35-42`: „Eine ECHTE persistente m-bit-Bitmap (kein Pseudo-Puffer mehr)" (kBitmapBytes=8192, m=65536 Bit, k=4 double-hashing), Member bitmap_ :116, insert_key/probe_key :52-66; Pfad B misst die reale Struktur über die echt gespeicherten Keys (`axis_filter_observable.hpp:127-142`; `abi_adapter.hpp:1237-1251` „REALER In-Memory-Filter"). Nur der Pfad-A-Segment-Scan nutzt weiterhin die Pseudo-Bitmap-Probe filter_probe_scan (`axis_filter_bloom.hpp:89-112`; `abi_adapter.hpp:676-678`); k=4 und early-exit stimmen weiterhin.
- **Korrektur:** D:742 aktualisieren: BloomFilter besitzt seit P5 (#124, 2026-06-04) eine reale persistente 8-KiB-m-Bit-Bitmap (m=65536, k=4 double-hashing), die im Pfad B über die echt eingefügten Keys geprobt wird; „Pseudo-Bitmap-Probe" gilt nur noch für den Pfad-A-Segment-Timing-Scan. → EN spiegeln.

**1.25 `anhang/de/C_glossary.tex:17` — „Auswahl-Mechanismus noch nicht implementiert" zu pessimistisch** *(deckungsgleich mit 1.14, zusätzliche Fundstelle)*
- **Code-Beleg:** best_binary_selector (#172) benennt sich selbst „(Thesis-Ausblick → Implementierung)": liest Mess-CSV, rankt je Interface-Funktion/Metrik die beste Permutation (Median über two_phase_valid-Zeilen, Strategy-Pattern RankingCriterion) und liefert die reale perm.dll als ABI-stabiles Artefakt aus (`builder/best_binary_selector/best_binary_selector.hpp:2-14,17-22` + best_binary_selector_main.cpp).
- **Korrektur:** Wie 1.14, hier für den Glossar-Eintrag: „der zugehörige Auswahl-Mechanismus ist in einem ersten Inkrement implementiert (best_binary_selector: Ranking + Auslieferung der besten Permutation je Metrik aus den Mess-CSVs); die vollautomatische, lastprofilübergreifende Auswahl bleibt Ausblick." → EN spiegeln.

**1.26 `anhang/de/C_glossary.tex:29` — autonome Heuristik-Profil-Auswertung: zwei von drei Bausteinen sind gelandet**
- **Code-Beleg:** (1) Automatische Ableitung der besten Konfiguration aus Messreihen = best_binary_selector (#172, `best_binary_selector.hpp:2-14`); (2) Ablage als wiederverwendbares XML-Lastprofil-Ergebnis „um Heuristiken automatisch zu erzeugen" = load_profile_writer + Extraktor (#175 / Goal §8.3 Versprechen 3, `builder/workload_driver/load_profile_writer.hpp:4-6`). Nur die ML-Klassifikation selbst ist weiterhin nicht implementiert (kein Klassifikator im Repo auffindbar); pauschales „noch nicht implementiert" ist zu pessimistisch.
- **Korrektur:** Präzisieren: „Erste Bausteine sind implementiert (automatische Best-Binary-Auswahl aus Messreihen; Extraktion/Ablage als XML-Lastprofil-Ergebnis); die ML-Klassifikation von Lastprofil-/Achsen-Features auf Konfigurationen ist weiterhin Ausblick." → EN spiegeln.

**1.27 `anhang/de/C_glossary.tex:82` — XML-Parser für das Lastprofil-Ergebnis existiert bereits (Import UND Export)**
- **Code-Beleg:** `load_profile_writer.hpp:2-20` (#175): „Die IMPORT-Seite (parse_load_profile, discover_load_profiles) existiert voll — hier kommt die EXPORT-Seite (Schreiben) + der Extraktor dazu"; Parser per include load_profile_parser.hpp eingebunden (Z.20), Writer schema-treu mit Round-Trip-Garantie zum Schema comdare_load_profile (Z.8-12). Die Limitierungs-Aussage „noch zu implementieren" ist überholt.
- **Korrektur:** Glossar-Eintrag aktualisieren: Import-Parser und Export-Writer+Extraktor sind implementiert (round-trip-fähiges Schema comdare_load_profile); als Ausblick verbleibt nur die darauf aufsetzende autonome Heuristik-Auswertung (ML-Klassifikation). → EN spiegeln.

**1.28 `anhang/de/D_building_block_matrix.tex:15` — T0-Zählung „17 (S01–S17)" veraltet** *(deckungsgleich mit 1.13, zusätzliche Fundstelle)*
- **Code-Beleg:** `axis_03a_search_algo_registry.hpp:52-84`: AllStrategies endet mit KArySearchAlgoK2…K16 (S18–S21) — 21 Einträge = 17 Basis + 4 per-K-k-ary-Wrapper (#188 per-K Increment 2, Commit `7c1f444`, 2026-07-01, je eigenes Enable-Flag, Default OFF).
- **Korrektur:** Wie 1.13, hier für Anhang D: Zahl auf „21 (S01–S21)" aktualisieren bzw. „17 Basis-Bausteine plus 4 opt-in per-K-k-ary-Wrapper (S18–S21, Default OFF, #188)". → EN spiegeln.

---

## §2 CODE-TODOS (Richtung `code-todo`) — Code liegt hinter dem Thesis-Soll

Dedupliziert; jede Position nennt alle Thesis-Fundstellen.

**2.1 PRT-ART echter Datenpfad + Adapter-Anbindung (TODO E6) + Notify-Hooks**
- Fundstellen: `03_messsystem_prtart.tex:516`, `06_fazit.tex:45` (und implizit 1.5/1.12).
- Ist: `prt_art_pruefling_factory.hpp:38` „TODO(E6): echten PrtArtExecutionEngineAdapter einhaengen" (Platzhalter-unordered_map-Workload); Adapter-Backend = unordered_map-Stand-in („im realen V35+ … PrtArtSearchEngine direkt", `prt_art_execution_engine_adapter.hpp:36-37,73-74`); `prtart_body.hpp.template:52/:68` simuliert 90 ns/op; Notify-Hooks (`notify_workload_change`) existieren nur als Kommentar-Verweise, keine API.
- TODO: E6 umsetzen (echten Adapter in die Factory), PrtArtSearchEngine statt Surrogat binden, prtart_body-Stub ersetzen, Notify-Hook-API implementieren. Voraussetzung für 2.9 (Fairness-Modi) und die Messreihe A/C-Aussagekraft.

**2.2 IPlatformProbe konkret implementieren (Task #650)**
- Fundstellen: `01_einleitung.tex:161`, `05_evaluation.tex:63`, anteilig `03_messsystem_prtart.tex:505`.
- Ist: `i_platform_probe.hpp:27-33` = pures Interface ohne Implementor; Werte hartkodiert constexpr (kHwCacheLineBytes=64, `axis_12_general_hardware_x86_64.hpp:12-14,33`); „Echte IPlatformProbe-Verdrahtung folgt V34+" (`hardware_filter.hpp:12`); Phase 1/auto_permutator referenziert keinen Probe.
- TODO: CPUID/sysfs-Discovery + Mikrobenchmark-Vermessung implementieren und in HardwareFilter/Phase-1-Enumeration/Codegen verdrahten. (Fallback: Thesis-Stellen auf „per Hardware-Profil-Achse fixierte Konstanten, Probe als Interface vorbereitet" abschwächen.)

**2.3 Stufe-3-Full-Join im Builder + Messreihe B angleichen**
- Fundstellen: `03_messsystem_prtart.tex:437`, `03_messsystem_prtart.tex:493`.
- Ist: Stufe 3 = „vorbereitete Skelett-API" (`permutation_engine.hpp:236-242`), keine FullJoin-Orchestrierung im builder/; Reihe B in `experiment_config/messreihen.xml:42-50` = „ohne PRT-ART … identisch zu A_full" statt Stufe-3-Full-Join; altes 1:1-Stufen-Mapping in `prt_art_merge_reference.hpp:5-9` widerspricht der Thesis-Zuordnung (Stufe1+2→A, Stufe3→B, C build-übergreifend).
- TODO: generische Stufe-3-Enumeration (F.6.3) im Builder verdrahten; messreihen.xml/Driver für Reihe B ausbauen; Mapping-Kommentar angleichen.

**2.4 Full-Sampled-Modus implementieren**
- Fundstelle: `03_messsystem_prtart.tex:505`.
- Ist: `MessreihenMode`-Enum kennt nur {Defined, Full} (`experiment_driver.hpp:54`); „full_sampled" nur als validierter Mode-String (`messreihe_v32_validator.hpp:69-70`); keine Jede-1000ste-Permutations-Sampling-Logik. expected_workload-Filter + Defined/Full existieren.
- TODO: FullSampled-Enum + deterministisches 1:1000-Permutations-Sampling in phase1_enumerate; PlatformProbe-Kompatibilität als Filter einhängen (nach 2.2).

**2.5 HDR-Histogramm-Perzentile im zentralen Mess-Pfad**
- Fundstellen: `02_suchbaeume_grundlagen.tex:586`, `05_evaluation.tex:82` (HDR-Teil).
- Ist: `hdr_histogram_wrapper/CMakeLists.txt` = explizites Skelett „keine Implementation"; zentraler Pfad rechnet Nearest-Rank-Perzentile (`perm_runner.hpp:83-88`; `tier_observe_trace_abi.hpp:68`); HDR nur als opt-in-T10-Telemetrie-Strategie. Übrige 4/5 Elemente des Mess-Musters (Zwei-Phasen-Warmup, IDriveable/IObservable, Konformitäts-Gatter, CoW-Memento) sind real.
- TODO: HDR-Wrapper ausbauen und in den Mess-Pfad einhängen — ODER (einfacher, vor Abgabe empfohlen) beide Thesis-Stellen auf „Nearest-Rank-Perzentile (HDR als T10-Strategie verfügbar)" umformulieren.

**2.6 Provenance-Logging für Fremdbibliotheken**
- Fundstelle: `05_evaluation.tex:82`.
- Ist: kein commit_hash/compiler_flags/isa_path-Logging im Mess-Output (nur CompilerFamily des eigenen Binaries, `hardware_filter.hpp:43-44`); Mehrfach-Läufe kReps=10 stimmen.
- TODO: Compiler/Flags/ISA/Allokator/Commit-Hash je Fremdbibliothek in den Mess-Export aufnehmen.

**2.7 String-Datensatz-Akten vervollständigen**
- Fundstelle: `05_evaluation.tex:51`.
- Ist: nur 3 Akten (`Code/test_data_xml/`: english_words, pizzachili_dna, sosd_books_200M); url/protein/xml/tpcds-id/trec-terms fehlen komplett; Akten-Schema ohne Prüfsumme/Zeilenzahl/Vorverarbeitung; nur Seed-Regel verankert (`dataset_loader.hpp:44`); nur ein uint64-Beispiel-Loader.
- TODO: 5 fehlende Akten anlegen, Schema um checksum/line_count/preprocessing erweitern, echte String-Loader registrieren — oder Thesis-Tabelle auf die realen Korpora umstellen.

**2.8 Lastprofil-Katalog LP01–LP14 code-materialisieren**
- Fundstelle: `03_messsystem_prtart.tex:272` (Katalog-Tabelle :279-300).
- Ist: `algorithm_profiles/load_profiles/` = 21 XMLs, davon nur 8 `lp_*` ohne LP-Nummern-IDs; LP02/03/05/06/07/13 ohne dediziertes Artefakt (Neg-Sweep nur approximativ via coco_p04_neg*). uint64-Op-Modell selbst ist real.
- TODO: 6 fehlende lp_-XMLs anlegen bzw. LP-ID-Attribut/Zuordnung LP01–LP14→XML nachziehen.

**2.9 Fairness-Harness: Common-Denominator- vs. Native-Modus**
- Fundstelle: `05_evaluation.tex:76`.
- Ist: kein Modus-Schalter auffindbar (Grep leer); deterministische Schlüssel/Ops nur teilweise über WorkloadGenerator seed=42; echter Native-Modus setzt 2.1 voraus.
- TODO: expliziter Schalter (externe ValueHandles erzwingen, PRT-ART-Spezialpfade deaktivierbar) im Vergleichs-Harness.

**2.10 P/E-Core-Pinning + 3-ISA-Build-Matrix**
- Fundstelle: `05_evaluation.tex:65`.
- Ist: ISA-Detection + avx2/avx512-Buildvarianten existieren (`cmake/isa_features.cmake`), aber keine 3-Build-Presets je Plattform; IPinningPolicy nur abstrakt, keinerlei Affinity-Aufrufe im eigenen Mess-Pfad; Barnard-Läufe stehen aus (#156/#162).
- TODO: konkrete IPinningPolicy + Affinity im Mess-Pfad; Build-Preset-Matrix vor den Zielplattform-Läufen.

**2.11 Achsen-Sensitivität: Varianzbeitrag + Makro-/Gesamt-Granularität**
- Fundstelle: `05_evaluation.tex:115`.
- Ist: nur Micro-Ebene ansatzweise (subtree-restringierte Welch-t-Tests + per-Achsen-CSV, `main.cpp:345-407`); keine Varianz-Dekomposition/ANOVA; kein Makro-/Gesamt-Ranking zu Workload-Klassen-Empfehlungen (f15_compare = simples p50-Ranking).
- TODO: Varianz-Dekomposition über Achsen-Subtrees + Makro/Gesamt-Auswertung mit Empfehlungs-Export (nach #215/#156).

*Nachtrag 2026-07-02 (aus dem Workflow-Journal nachgetragene Befunde):*

**2.12 PRT-ART-Prüfling real gegen die CE-Kernbestandteile kompilieren** *(weitere Fundstelle zu 2.1 / TODO E6)*
- Fundstelle: `anhang/de/C_glossary.tex:65`.
- Ist: Mechanismus existiert nur als Hülle: prt-art implementiert die CE-Plugin-Schnittstelle (IPruefling/IPrueflingFactory, Laden per COMDARE_CE_PRUEFLINGE), hängt aber „bewusst NUR an cache-engine/api + std" und NICHT an den Kernbestandteilen; run() nutzt einen self-contained unordered_map-Platzhalter-Workload („TODO(E6): echten PrtArtExecutionEngineAdapter einhaengen", `prt_art_pruefling_factory.hpp:9-12,38-59`); Codegen-Pfad-Stub simuliert 90 ns/op (`prtart_body.hpp.template:52,68`).
- TODO: deckungsgleich mit 2.1 — nach E6 den echten PrtArtExecutionEngineAdapter in PrtArtPruefling::run() einhängen und den Prüfling real gegen die CE-Achsen kompilieren/messen (Platzhalter-Workload + 90-ns-Stub ersetzen).

**2.13 Konformitäts-Gatter auf die 17 Dagger-Operationen ausbauen (heute nur 5 Kern-Ops)**
- Fundstellen: `anhang/de/F_comparison_interfaces.tex:29`, `anhang/de/F_comparison_interfaces.tex:36` (zusammengefasst, gleiche Aussage).
- Ist: Gate läuft verpflichtend VOR jeder Messung (`perm_runner.hpp:28,133-135`, Fail ⇒ genullte Zeile), prüft aber laut Selbstauskunft „Heute auf den 5 Kern-Ops (insert/lookup/erase/clear/size)" gegen das std::map-Oracle (`conformance_gate.hpp:10-11,48-115`, RF1–RF7); 13 der 17 Dagger-Ops (at, operator[], begin/end, empty, insert_or_assign, emplace, try_emplace, count, contains, lower_bound, upper_bound, equal_range, key_comp) werden nicht geprüft, IDriveableTier exponiert sie nicht einmal; size (geprüft) trägt in tab:if-map keinen Dagger. Die tabellen-interne 17er-Zählung (F:59-98) stimmt.
- TODO: Drive-Voll-API + Gate-Randfälle auf die 17 Dagger-Operationen ausbauen (im Code als „V5-I-Drive-Vollausbau" bereits angekündigt, conformance_gate.hpp:11) — übergangsweise in Anhang F kennzeichnen, dass aktuell nur die 5 Kern-Ops gegen das Oracle getrieben werden.

**2.14 get_allocator() in beiden PrtArtSearchEngine-Spezialisierungen ergänzen**
- Fundstelle: `anhang/de/F_comparison_interfaces.tex:18`.
- Ist: Iteration, size/empty, clear und swap sind in Vector- und Map-Hülle semantikgleich vorhanden (`prt_art_search_engine.hpp:117-120,183-186,282-287,386-389,450-453,509 ff.`), get_allocator existiert aber in KEINER der beiden Spezialisierungen (0 Treffer in 621 Zeilen) — die Hülle nutzt intern std::vector/std::map mit Default-Allocator, exponiert ihn aber nicht; clear() liefert zudem status_t statt void (hüllen-konsistent, standard-abweichend).
- TODO: get_allocator() in beiden Spezialisierungen ergänzen (triviale Delegation an data_/storage_), damit die in Anhang F genannte geteilte Funktionsmenge vollständig im Code existiert.

**2.15 Generische Kompositions-Schicht über dem Organ-Primitiv (Anhang F:197 beschreibt ein Soll)**
- Fundstelle: `anhang/de/F_comparison_interfaces.tex:197`.
- Ist: Das einheitliche Organ-Pflicht-Interface ist insert/lookup/erase/clear/occupied_count (`observable_composed_container.hpp:6-10`) — insert/erase sind eigenständige Organ-Pflichten je Familie, nicht aus einem lower_bound-Primitiv komponiert; die übrigen Map-Zugriffe (at, operator[], count, contains, lower_bound, upper_bound, equal_range, try_emplace, insert_or_assign) existieren im Mess-Pfad nicht (Gate = 5 Kern-Ops) und delegieren in der prt-art-Hülle direkt an std::map storage_ (`prt_art_search_engine.hpp:355-401`), nicht an ein austauschbares Achsen-Such-Primitiv. Als std::map-Theorie korrekt, als Cache-Engine-IST nicht implementiert.
- TODO: Im Zuge des Drive-Voll-API-Ausbaus (2.13) eine generische Kompositions-Schicht implementieren, die at/operator[]/count/contains/equal_range/try_emplace/insert_or_assign fest über das Organ-Primitiv (Ordnungs-Suche + Verkettung) ableitet — bis dahin beschreibt F:197 ein Soll.

**2.16 LatencyHistogram (T10): HdrHistogram_c vendoren und real implementieren** *(verschärft 2.5)*
- Fundstelle: `anhang/de/D_building_block_matrix.tex:494`.
- Ist: „Einziger is_original-Kandidat" ist wörtlich code-gedeckt (`axes/telemetry_axis/PAPER_REFERENCES.md:20`, HdrHistogram_c/CC0-1.0), aber der Baustein ist ein reiner Strategie-Deskriptor ohne jede Histogramm-Implementierung (`axis_11_telemetry_latency_histogram.hpp:17-31`: nur name/family_name/flags, keine record/percentile-Methoden); `hdr_histogram_wrapper/` besteht nur aus einer leeren INTERFACE-CMakeLists, HdrHistogram_c ist nicht unter ext/ vendored (PAPER_REFERENCES.md:7 nur „is_original-Linking-POTENZIAL") — es werden derzeit keine p50/p95/p99-Quantile geliefert.
- TODO: HdrHistogram_c unter ext/ vendoren und die p50/p95/p99-Aufzeichnung im LatencyHistogram-Observer real implementieren (bzw. bis dahin in der Thesis als „is_original-Kandidat, Bindung geplant" präzisieren). Achtung für 2.5: die dortige Fallback-Formulierung „HDR als T10-Strategie verfügbar" entsprechend auf „HDR als T10-Strategie-Deskriptor vorgesehen" abschwächen.

**Weitere Code-Lücken aus dem TODO-Sweep (Kategorie A, thesis-relevant — bei Kapitel-Formulierungen berücksichtigen):**
- `abi_adapter.hpp:1810` [LIMIT #226]: **Scan** misst bei den Pool-Familien weiterhin den container_-Spiegel, nicht das native Organ (volle Scan-Echtheit erst mit #188-Folgeschritten).
- `abi_adapter.hpp:807/865/1819`: Storage-/Prefetch-Achsen der 9 Pool-Familien = **honest-0** (DEG-2, by design bis 4b-c/D) — T4/T5/T6 dieser Familien nicht als „gemessen" ausweisen.
- `ceb_generator.hpp:9,64`: CEB-`perm_run`-Stub misst 0.0 (Default-Pfad ohne Anatomie-Binding).
- PMC: `COMDARE_ENABLE_PMC` Default OFF, NullPmcSource ehrlich `available()=false`; echte PMC nur CI-prod (`.gitlab-ci.yml:71`); pmc:intel-Job hängt an prod2-Rebuild #207.
- Masstree ohne Pool-Wrapper (deferred #234); CoCo-trie deferred (kein CRUD-API); HOT-Concurrency = OLC-Approximation statt RCU-light (`hot_reference.hpp:38`); SuRF einzige PaperBinding mit rohem Wrapper als search_algo; Eytzinger-BFS-Layout (#188-4a) offen; a01_hoard = malloc-Stub; `search_organ_`-Doppelhaltung (Q2 Schritt 4) offen; Blob-Footer CRC=0 (Placeholder).
- Legacy-`measurement_writer.hpp` (02_messung_driver): total_cycles approximiert (3-GHz-Annahme), L1–L3/dTLB=0 — in der Thesis nur als abgelöster Alt-Pfad führen.

---

## §3 BESTÄTIGT-OK (Themenliste, kompakt)

Architektur/Modell: 19 Kompositions-Achsen T0–T18 (+3 Build-Achsen) · ~10^14-Produktraum, lazy-spärliche Materialisierung · Drei Gattungen (SearchAlgorithm/Container/Allocator), Container-Unterklassen Set/Sequence/Adapter/… · Drei-Ebenen-Modell, Anatomie = feste Organ-Komposition, Lebewesen = SearchAlgorithm-Instanz · genau ein kanonischer Hub (Layout-Organ) im Inter-Organ-Graph · Provenienz-Map ~110 Organ-Algorithmen · std::variant nur im 11-achsigen Fallback-Modell (korrekt verortet).

ABI/Module: C-stabile Modulgrenze `comdare_create_anatomy()` → IAnatomyBase, genau ein Lebewesen je Permutation · Tier-Binary `comdare_perm_<fp>.dll/.so` je Permutation · Dreischichtige Kette CacheEngine→ExecutionEngine→SearchEngine · variadische Hybrid-API 1/2/N → vector/map/map<K,tuple> · Fingerprint 16-Byte-Binärstrings · ISA-Achse T12 isoliert permutierbar.

Mess-System: ExperimentDriver 7-Phasen-Pipeline (real, 2 opt-in) + SOTA-Auto-Pickup · BuildOrchestrator „alle DLLs zuerst", resumierbar, RAM-Admission · perm_runner: 1 SLURM-Task = 1 DLL · Konformitäts-Gatter (std::map-Orakel) verpflichtend vor jeder Messung · CoW-Memento + Zwei-Phasen-Warmup + reset()=Statistik-Reset · PMC opt-in mit ehrlicher NullPmcSource · Defined/Full-Modi + profilbewusstes Workload-Routing (RANGE→YCSB-E etc.) · drei Messreihen A/B/C definiert, A_defined=8 Tier-1/A_full=30 korrekt · Bias-Bruch-Matrix nur two_phase_valid-Läufe · deterministischer sample_data_generator (seed 42).

Zählungen (Zähl-Audit bestätigt): 30 SOTA-Profil-XMLs · 25 Allokator-Vendors in AllVendors · 10 lauffähige Allokator-Profile · T17 = 15 Bausteine · kCompositionAxisNames = 19 · smoke43-Tabelle = 43 Datenzeilen (echte DLL-Messungen).

Auswertung/Toolchain: Werkzeugkette sample_data_generator→messung_driver→binary_to_csv→csv_to_latex→diagram_generator→latex_to_pdf vorhanden · generate_measurement_appendix.ps1 mit -SpecId · generierte Anhang-Artefakte (v5_pipeline_demo, cartesian_smoke43, bias_matrix, 6 Heatmaps) vorhanden · Limitierungs-Tabelle le_limitierung.tex führt Vorbehalte · CI GitLab + GitHub-Spiegel über alle drei Repos · p27_bundle_finder als C++23-Port · Original-Flags korrekt differenziert (ART 4/4, Wormhole 3/4, HOT 2/4, SuRF 1/4).

---

## §4 UNKLAR / NICHT PRÜFBAR

**4.1 `kapitel/de/01_einleitung.tex:163` — Zwei-OS-Vermessung (Talos + root-Linux) auf beiden Prod-Maschinen.** Im Code nicht prüfbar (Infra-/Mess-Plan). Ist laut Ledger/Handover: root-Linux-Messungen auf prod1 laufen (CI mit COMDARE_ENABLE_PMC=ON), prod2 im Rebuild (#134/#207), M3-Gesamtmessung (#156/#162) aussteht. Als Zielsetzung („werden … vermessen") vertretbar, als Ist-Behauptung nicht belegbar. Empfehlung: Futur/Zielformulierung sicherstellen.

**4.2 `kapitel/de/06_fazit.tex:24` — Permutations-Einschränkung der Trias Knotentyp×SIMD×Pfadkompression.** Belegt ist der Mechanismus für ISA×SIMD×Plattform (`topic_hardware_config_set.hpp:41-133`, mp_remove_if) und die dokumentarische Markierung der Kopplung (`tier_to_organ_mapping.hpp:52-54,60`); ein dedizierter Filter für genau diese Trias im 19-Achsen-Raum wurde nicht gefunden. Empfehlung: Formulierung auf den belegten ISA×SIMD×Plattform-Filter stützen oder Trias-Filter als Code-TODO einplanen.

**4.3 Nachtrag 2026-07-02:** die bei der Erst-Synthese abgeschnittenen Befunde wurden vollständig aus dem Workflow-Journal nachgetragen (20 Einträge, davon 14 →§1, 6 →§2). Inhaltsgleiche Mehrfach-Fundstellen wurden beim Nachtragen zusammengefasst bzw. bei deckungsgleichen Aussagen auf bestehende Einträge querverwiesen: §1 = 12 neue Einträge 1.17–1.28 (1.18 und 1.22 bündeln je zwei Fundstellen; 1.25/1.28 = Zusatz-Fundstellen zu 1.14/1.13), §2 = 5 neue Einträge 2.12–2.16 (2.13 bündelt zwei Fundstellen; 2.12 = Zusatz-Fundstelle zu 2.1).

---

## §5 DELTA-KONTEXT (Code-Änderungen seit Ende Juni, aus Code-Report 1) + ABARBEITUNGS-REIHENFOLGE

### Delta seit `be8aadc` (13 Commits, bis HEAD `b8761f0`)

1. **#188-per-K (d321fe9/7c1f444/19d4f05):** compile-time-K k-ary Wrapper K2/K4/K8/K16 registriert (T0: 17→21, s. 1.13) + per-K-Emissions-Katalog. Greift in Messdaten erst beim #215-Neubau.
2. **#188-4b container_-Flip (e564b66→cd25b9b, CI-belegt d8c2599, Pipelines 7372/7377 grün):** Die 9 Pool-Familien (ART, HOT, START, Wormhole, SuRF, SkipList, Hash, BST, BTree) messen T0 jetzt über ihr **natives u64-Organ** statt des SortedBinary-Spiegels; u16-Truncation des Wrapper-Pfads behoben. → Thesis-Limitierung „Pool-Familien messen einen Spiegel" ist **überholt** (für insert/lookup/erase; Scan bleibt Spiegel, #226).
3. **DEG-1-Fix (46e6ce6):** for_each_record-Key-Ernte — Segment-Timer-Degeneration ({0}-Keys) behoben. → ebenfalls überholte Limitierung.
4. **is_original/SHA256 (14eed39/e50dc19/e064c49):** CRLF/LF-Neutralität, 13 sha256_locked.txt regeneriert (Habich-Compliance auf Linux).
5. **#230 (b8761f0, HEAD):** contract:harness Compile+Smoke-Gate — Host-Treiber-Stack erstmals CI-gegated; = W1-Kopf des Wochenplans Richtung #215.

**Weiterhin wahr (nicht durch das Delta erledigt):** DEG-2 honest-0-Storage-Achsen der Pools (bis 4b-c/D) · PMC aus (NullPmcSource; pmc:intel blockiert durch prod2/#207) · #215-320-DLL-Neubau ausstehend (W5) · M3-Gesamtmessung #156/#162 ausstehend (W6, mit Quell-/Umgebungs-Freeze) · Masstree deferred #234 · Eytzinger offen · #221 (RC-Felder) ohne Beleg für Verdrahtung, vermutlich offen.

### Empfohlene Abarbeitungs-Reihenfolge

1. **Sofort, code-unabhängig:** §1-Priorität-1-Stellen (1.1–1.12) im DE-Text fixen, unmittelbar danach EN spiegeln. Das sind reine Faktenkorrekturen ohne Abhängigkeit vom Code-Fortschritt.
2. **Direkt danach:** §1-Priorität-2 (1.13–1.15) — der zugrunde liegende Code-Stand (per-K, best_binary_selector, adhoc-Codegen, container_-Flip) ist gelandet und CI-belegt, also stabil beschreibbar; plus 1.16 (kosmetisch) im selben Durchgang.
3. **Entscheidung je §2-Punkt VOR dem M3-Lauf:** Für 2.5 (HDR), 2.6 (Provenance), 2.7 (Datensätze), 2.8 (LP-Katalog) entscheiden, ob Code nachgezogen oder Text abgeschwächt wird — diese vier bestimmen, was die Mess-Artefakte des M3-Laufs später dem Text widersprechen könnten. Empfehlung: 2.5 per Text-Anpassung lösen (Nearest-Rank ist implementiert und getestet), 2.6–2.8 als Code nachziehen (klein, ohne Architektur-Risiko).
4. **Entlang des bestehenden W-Plans:** W1 (#230, erledigt) → W2–W4 Node-Shape-Achsen (löst DEG-2/2.x-honest-0) → **W5 = #215-320-DLL-Neubau** (aktiviert per-K in den Daten) → **W6 = #156/#162 M3-Gesamtmessung** (setzt prod2/#207 für pmc:intel voraus). 2.1 (E6/PRT-ART-Datenpfad) und 2.3/2.4 (Stufe 3, FullSampled) davor bzw. parallel priorisieren, da sie Messreihen A/B/C inhaltlich tragen; 2.2/2.9/2.10/2.11 dahinter.
5. **Nachtrag:** fehlende ~20 DIVERGENT-Einträge aus dem Verifier-Rohoutput in diesen Bericht mergen (§4.3), dann §1/§2 final priorisieren.

*Erstellt 2026-07-02 · Methode ultracode (12 Reader / 6 Code-Auditoren / 11 Verifier) · HEADs: super 9ee9437 · thesis e45bee7 · cache-engine b8761f0 · prt-art f98445e*
