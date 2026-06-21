# Kapitel-4-Gerüst — „Konzept und Architektur" auf Basis der EINEN Architektur (Doc 36)

> **Zweck:** Skelett + Faktenbasis für die manuelle Ausformulierung von Kap. 4. Grundlage =
> `Code/external/comdare-cache-engine/docs/architecture/36_eine_architektur_lebewesen_ist_searchalgorithm.md`
> (EINE Architektur, `Lebewesen ≡ SearchAlgorithm`, Anatomie = Körper, „SearchEngine" = ABI-Sicht).
> **Kontext gelesen:** Kap. 1–8 (DE) vollständig. Kap. 1–3 sind nach den X1/X6-Korrekturen konsistent;
> Kap. 4 enthält die unten gelisteten Falschaussagen; Kap. 5–8 sind Entwürfe mit Einzel-Abgleichen.

---

## 1. STREICHLISTE — Falsche/überholte Behauptungen in den bestehenden Kapiteln

| # | Ort (DE / EN) | Falsch | Korrekt (Doc 36 / Code) |
|---|---|---|---|
| F1 | Kap. 4 §Drei-Schichten-Hierarchie (`04…:74–93` / `en …:67–82`) | Vererbungsdiagramm `CacheEngine ← ExecutionEngine ← SearchEngine ← PrtArtSearchEngineAdapter` als DIE Architektur | EINE Architektur: `IExecutionEngine` (Wurzel; Lebewesen + Virus = Geschwister) → Lebewesen ≡ SearchAlgorithm → `SearchAlgorithmAnatomy<Composition>` (Körper, 19 Organe) → `SearchAlgorithmAbiAdapter` (ABI-Sicht). „SearchEngine" = nur ABI-Sicht, KEINE eigene Schicht/Hierarchie. |
| F2 | Kap. 4 §PRT-ART (`04…:120` / `en:111`) | „`PrtArtSearchEngineAdapter` implementiert das `SearchEngine`-ABI" | PRT-ART ist ein **Prüfling** (Anatomie/Composition), der einzelne Achsen-Organe selbst stellt und für die übrigen via `resolve_baustein` auf CE-Standards zurückfällt. Runtime-Anbindung = Execution-Engine-Adapter; `prt_art_search_engine_adapter.hpp` ist **deprecated** (Doc 19 §). |
| F3 | Kap. 4 §M-Modell (`04…:62–63` / `en:56`) | „als `IExecutingEngine` registriert … implementiert die **Such-Engine-Schicht** für jede Achse" | Tippfehler `IExecutingEngine` → `IExecutionEngine`. PRT-ART stellt **Achsen-Organe** bei (keine „Such-Engine-Schicht"). |
| F4 | Kap. 4 §Builder (`04…:138–140`) | „wählt der Builder den besten Gesamtalgorithmus aus und **liefert ihn als** eigenständige Binary" (als erledigt) | Als **Ziel/Ausblick** kennzeichnen (C8): die Pipeline liefert die Rangbildung; Auto-Auswahl + Binary-Versand sind Erweiterung (konsistent mit Abstract/Intro, Commit `73554e1`). |
| F5 | Kap. 4 §Achsen (`04…:112`) | „(19) **Flush-Policy**" | Kanonisch ist **T18 = `queuing_q2`** (T17 = `queuing_q1`). „Queuing-Buffer/Flush-Policy" als Sub-Beschreibung ok, aber Achsenname = queuing_q1/q2. |
| F6 | Kap. 6 §ExperimentDriver vs. Kap. 4 §M-Modell | Zwei verschiedene „7-Phasen"-Listen: Kap. 4 `discover/measure/classify/publish/bind/execute/compare` vs. Kap. 6 `enumerate/codegen/compile/load/execute/measure/persist` | Gegen den Code (`builder/experiment_driver/experiment_driver.cpp`) **eine** kanonische Phasenliste festlegen und in beiden Kapiteln identisch verwenden. (Vermutung: Builder-Pipeline vs. ExperimentDriver-Phasen — dann klar als zwei Ebenen benennen.) |
| F7 | Kap. 8 FF1 (`08…:19`) | „die Achsen-Zerlegung **P01–P32** trägt" | Konsistent zu Kap. 3: **P01–P33** (33 Publikationen). |

> Hinweis: Die „parallel"-Treffer in Kap. 1/3 sind unkritisch („paralleler Allokator-Korpus",
> „In parallel"). Kap. 5 nennt die prt-art-eigene API-Klasse `PrtArtSearchEngine<Ts…>` — das ist der
> Name im prt-art-Repo (nicht die CE-`search_engine`-Klasse); bei der Code-Vereinheitlichung (Handout
> TODO-6) ggf. mit-konsolidieren, im Text aber zulässig.

---

## 2. EMPFOHLENE ABSCHNITTSSTRUKTUR Kap. 4 (mit doku-geerdetem Skelett)

### 4.1 Überblick & Kernbeitrag — Das Achsen-Bibliotheks-Framework
*(weitgehend vorhanden, §axis-framework — beibehalten)*
- Algorithmus = **Komposition orthogonaler Achsen**, nicht Monolith; konkreter Algo = Punkt im
  kartesischen Produkt; SOTA-Entwurf = explizite Konfiguration.
- Kernwert = **modulare Austauschbarkeit** (eine Achse isoliert erforschen + pro Achse UND ganzheitlich
  messen). Quelle: Memory `reference_thesis_core_contribution_axis_library`.
- Baum-Anatomie als universelle Leinwand; Nicht-Baumartige (Hash) = dieselbe Gattung, eingeschränktes
  Profil (Durchreich-Achsen). Quelle: Doc 34 §1.

### 4.2 Die EINE Architektur *(ERSETZT die alte „Drei-Schichten-Hierarchie" F1)*
Kerninhalt = Doc 36. Diagramm (statt des Vererbungs-Verbatims):
```
IExecutionEngine                         Wurzel: alles Ausmessbare
  ├─ IAnatomyBase : IExecutionEngine     Lebewesen                         ┐ Geschwister
  │    └─ SearchAlgorithm-Unterklasse    ≡ „Lebewesen" (Säugetier)         │ unter EINER
  │         └─ SearchAlgorithmAnatomy<Composition>   = sein KÖRPER         │ Wurzel
  │              └─ 19 Achsen ≡ Organe                                     │
  │         └─ SearchAlgorithmAbiAdapter<A>  = ABI-Laufzeit-SICHT          │
  │              („SearchEngine"-Rolle, über die .dll-Grenze)             │
  └─ IVirusExecutionEngine : IExecutionEngine   Virus (achsenlos, Graph)  ┘
```
Schreib-Punkte:
- `Lebewesen ≡ SearchAlgorithm` (Metapher = technischer Begriff; `anatomy_base.hpp:62`).
- Anatomie = **Körper** des Lebewesens (ein Ding MIT ihm), kein zweites Modell; trägt die 19 Organe +
  `observe_all()` (`search_algorithm_anatomy.hpp:32/46/62`).
- „SearchEngine" = **ABI-Sicht** desselben Lebewesens (`SearchAlgorithmAbiAdapter`, `abi_adapter.hpp:119`,
  `static_assert genus()==SearchAlgorithm`), **keine** Parallel-Hierarchie. Der alte Klassenname
  `search_engine<>` ist nur der historische Identifier (→ Code-Vereinheitlichung TODO-6).
- Wurzel `IExecutionEngine` trägt Lebewesen + Viren als Geschwister (`execution_engine_base.hpp:98`).
- **Term-Mapping-Tabelle** (Metapher ↔ Technik) aus Doc 36 §3 übernehmen.

### 4.3 Vier-Subsystem-Trennung (M-Modell) — orthogonal zur Anatomie
*(vorhanden, §m-model — Tippfehler F3 fixen)*
- `messung_driver` (Auswertungs-Orchestrator), `CacheEngineBuilder`, `CacheEngine` (Werkzeug-Bibliothek),
  `Prüfling` (PRT-ART). Klar sagen: das M-Modell ist eine **andere Achse der Betrachtung** als die
  Anatomie (Subsysteme/Verantwortlichkeiten, nicht Vererbung). Quelle: `reference_m_schichten_modell`.
- Bidirektionale CE↔Prüfling-Beziehung (bind / execute). Multi-Prüfling für Messreihe A.

### 4.4 Die 19 Achsen ≡ Organe (kanonische Liste T0–T18)
*(vorhanden, §axes — F5 fixen)*
- Kanonisch: T0 search_algo, T1 cache_traversal, T2 mapping, T3 path_compression, T4 node_type,
  T5 memory_layout, T6 allocator, T7 prefetch, T8 concurrency, T9 serialization, T10 telemetry,
  T11 value_handle, T12 isa, T13 index_organization, T14 io_dispatch, T15 migration_policy, T16 filter,
  **T17 queuing_q1, T18 queuing_q2** (Quelle: Doc 35; `composition_concept.hpp:20–58`;
  `static_assert sizeof...(Vs)==19`).
- 17 Such-Achsen + 2 Queuing = 19; jede Achse Pflicht (keine optional); `std::variant` je Achse;
  ~57 Sub-Achsen; kartesisches Produkt > 10^11.

### 4.5 ABI-stabiles C++23-Modul-Interface
*(vorhanden, §abi — beibehalten)*
- Variadisch: 1 Param ⇒ `std::vector`-API, 2 ⇒ `std::map`-API, N>2 ⇒ `std::map<K, tuple<…>>`.
- 16-Byte-Fingerprint für komplexe Schlüssel (`binary_key_t`). Binär-stabile Modulgrenze
  (`comdare_create_anatomy → IAnatomyBase*`), Loader verifiziert ABI je Modul.

### 4.6 PRT-ART als Prüfling *(F2 fixen)*
- PRT-ART = **abstraktes Lebewesen** (eigene Organe in einigen Achsen + CE-Katalog für den Rest via
  `resolve_baustein`). Eigene Organe: Page/Layout/Free-List/Prefetch/Concurrency-Pattern/Measurement
  (4+2-Pool-Allokator, Distance-Estimator-Prefetch, OLC mit reservierten Blöcken, H1/H2/H3).
- **Abstract- vs. Full-Prüfling** (Handout TODO-2): „Originalkonfiguration" = mind. einmal NUR mit den
  eigenen Achsen self-contained gemessen, im Profil als `abstract`/`full` gekennzeichnet.
- Kein „SearchEngine-ABI" — PRT-ART füllt Achsen-Slots der Composition; Runtime via Execution-Engine-Adapter.

### 4.7 Builder & Drei-Stufen-Prüfung *(F4 fixen)*
*(vorhanden, §builder)*
- Stufe 1 (ce-only) / Stufe 2 (Prüfling-Replace + ce-Fallback) / Stufe 3 (Full-Join, nicht-redundant) =
  die 3 kompositionalen Joins (Memory `reference_3_kompositionale_joins_anatomie`) → bilden direkt die
  3 Pflicht-Messreihen A/B/C.
- **Auto-Auswahl + Versand der besten Binary = Ziel/Ausblick** (nicht als erledigt formulieren).

### 4.8 (optional) Entwurfsmuster & Zero-Cost-Metaprogrammierung
- Benannte GoF-/erweiterte Muster je Struktur (Memory `feedback_lehrbuch_design_patterns_only…`);
  CRTP + `resolve_baustein` (`std::conditional_t`) = zero-cost (kein virtual im Hot-Path). Verweis Kap. 2.

---

## 3. CROSS-KAPITEL-ABGLEICH (vor/bei Kap. 4–6)
- **7-Phasen (F6):** Builder-Pipeline (Kap. 4) vs. ExperimentDriver (Kap. 6) gegen
  `experiment_driver.cpp` vereinheitlichen; als zwei Ebenen benennen, falls real zwei.
- **C8 (F4):** auch in Kap. 4 §Builder auf Ziel/Ausblick ziehen (wie Abstract/Intro).
- **Achsennamen (F5):** T17/T18 = queuing_q1/q2 überall identisch.
- **P-Zahl (F7):** P01–P33 in Kap. 8 FF1.

## 4. Quellen
- **Doc 36** `…/docs/architecture/36_eine_architektur_lebewesen_ist_searchalgorithm.md` (Primär).
- Doc 14 `docs/architektur/14_achsen_komposition_organ_metapher.md`; Doc 34 `34_KONSOLIDIERTER…`;
  Doc 35 (function-handle-hops, T0–T18); Doc 30 §8.0/§8.1; Doc 31 (I1).
- Übergabe `…/docs/sessions/20260620-UEBERGABE-impl-agent-EINE-ARCHITEKTUR-vereinheitlichung.md`.
- Memories: `reference_anatomie_gattungen`, `reference_3_kompositionale_joins_anatomie`,
  `reference_m_schichten_modell`, `feedback_technical_identifiers_over_metaphor`,
  `project_eine_architektur_lebewesen_searchalgorithm`.
