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

> **STATUS 2026-06-21:** F1–F5 + F7 **erledigt** (Commit `822f1b5`, DE 138 / EN 130, 0 Fehler/0 undef).
> Offen: **F6** (7-Phasen Builder vs. ExperimentDriver gegen `experiment_driver.cpp` vereinheitlichen).

---

## TEIL B — Ausgebautes Kap-4-Gerüst (schreibfertiges Detail-Skelett)

> Vollständige Ziel-Gliederung von Kap. 4 „Konzept und Architektur". Jeder Stichpunkt ≈ ein
> Absatz-Kern; **fett** = Pflicht-Aussage. Reihenfolge an Doc 36 + bestehendem Entwurf orientiert.
> DE-Lead, EN ≡ DE; technische Identifier im Code-Stil, Metapher nur erklärend; Muster-Benennung Pflicht.

### B.1 Überblick & Kernbeitrag *(vorhanden: §axis-framework)*
- **Was:** ein \emph{Achsen-Bibliotheks-Framework}; **Warum (Kernwert):** ein Forscher erforscht
  \emph{eine} Achse und misst sie pro Achse UND ganzheitlich, ohne den Rest neu zu bauen.
- Algorithmus = Komposition orthogonaler Achsen; konkreter Algo = Punkt im kartesischen Produkt;
  SOTA-Entwurf = explizite Konfiguration. Baum-Anatomie als universelle Leinwand; Hash = dieselbe
  Gattung, eingeschränktes Profil.
- Roter Faden (1 Satz je Folgeabschnitt). Quelle: `reference_thesis_core_contribution_axis_library`.

### B.2 Die EINE Architektur *(vorhanden, korrigiert: §sec:three-layer → „Die eine Architektur")*
- **Pflicht-Diagramm** (Verbatim-Baum, schon im Text): `IExecutionEngine` → `IAnatomyBase`/Lebewesen
  → `SearchAlgorithmAnatomy<C>` (Körper, 19 Organe) → `SearchAlgorithmAbiAdapter` (ABI-Sicht); Virus = Geschwister.
- **Lebewesen ≡ SearchAlgorithm** (Metapher = technischer Begriff). Anatomie = \emph{Körper}, kein
  zweites Modell. „SearchEngine" = ABI-Laufzeit-\emph{Sicht} (`CacheEngine→ExecutionEngine→SearchEngine`),
  kein paralleles Konstrukt; gemessen über genau \emph{eine} Beobachter-Schnittstelle (I1).
- **Term-Mapping-Tabelle** (Metapher ↔ Technik) aus Doc 36 §3 einsetzen. Quelle: **Doc 36** (Primär).

### B.3 Gattungen & Lebewesen-Unterklassen — \emph{NEU}
- **3 Gattungen** (Außen-Interface = Prüf-Dock): `SearchAlgorithm` \textbar{} `Container` \textbar{} `Graph`.
- **5 Tier-Unterklassen** (feste Achsen-Sätze) mit Slot-Zahlen (Quelle: `genus_binding_traits.hpp`):

  | Unterklasse | Gattung | Metapher | Achsen-Slots |
  |---|---|---|---|
  | SearchAlgorithm | SearchAlgorithm | Säugetier | **19** |
  | Set | Container | Vogel | 15 |
  | Sequence | Container | Reptil | 11 |
  | Adapter | Container | Wirbelloses | 13 |
  | View | Container | Pflanze | 7 |

- **Diese Arbeit fokussiert die SearchAlgorithm-Unterklasse** (19 Achsen, `std::map`-artig); die übrigen
  sind das Erweiterungs-Versprechen (Kap. 8 Ausblick). Viren (achsenlos, Graph) = Geschwister, kein Lebewesen.
- Quelle: Doc 34 §1 / Doc 30 §8.0; `reference_anatomie_gattungen`; `feedback_no_whole_tier_axes_genus_configurator`.

### B.4 Die 19 Achsen ≡ Organe *(vorhanden, F5 erledigt)*
- Tabelle T0–T18: Achsenname + Teilaufgabe + Beispiel-Varianten (`std::variant`). Kanonisch s. §2/4.4.
- **Jede Achse Pflicht** (nicht-puffernd = Algo `NoBuffer`, NICHT „keine Achse"); ~57 Sub-Achsen;
  kartesisches Produkt > 10^11. Quelle: `composition_concept.hpp:20–58`; Doc 35; `reference_axis_gold_standard_checklist`.

### B.5 ABI-stabiles C++23-Modul-Interface *(vorhanden: §abi)*
- Variadisch: 1 ⇒ `std::vector`-API, 2 ⇒ `std::map`-API, N>2 ⇒ `std::map<K,tuple<…>>`.
- 16-Byte-Fingerprint (`binary_key_t`); binär-stabile Modulgrenze; `comdare_create_anatomy → IAnatomyBase*`;
  Loader verifiziert ABI je Modul (`LoadLibrary`/`dlopen`).

### B.6 Permutationsmatrix & kombinatorische Explosion — \emph{ausbauen}
- Kartesisches Produkt aller Achsen-Varianten; bit-codierter **Permutations-Identifier** (mehrbänkig,
  Sub-Bank-Bitfelder); **Constraint-Filter** schließt ungültige Kombinationen vor Codegen aus.
- Reduktion (Verweis Kap. 6 §explosion): `expected_workload`-Routing, `Defined`-Modus, `Full-Sampled`.

### B.7 Entwurfsmuster & Zero-Cost-Metaprogrammierung — \emph{NEU/ausbauen}
- **CRTP-Basisklasse je Achse** (zweischichtiges Concept: Topic-Concept + Achsen-Concept, `requires`-Klausel).
- **`resolve_baustein`** (`std::conditional_t` über Tag-Spezialisierungen) = Compile-Time-Auswahl
  Prüfling↔Standard → **kein `virtual` im Hot-Path** (zero-cost abstraction, Verweis Kap. 2 §C++23).
- **Abstract Factory** für Knoten static/dynamic (Permutations-B+-Baum; `project_permutations_bplus_tree…`).
- **Visitor/Extension-Pattern** der Achsen-Erweiterung (`reference_master_architektur_skizze`).
- \emph{Pflicht:} jede Struktur = benanntes GoF-/erweitertes Muster (`feedback_lehrbuch_design_patterns_only…`);
  Muster-Namen je Achse \textbf{web-/code-verifizieren}, nicht raten.

### B.8 PRT-ART als Prüfling *(vorhanden, F2 erledigt)*
- Prüfling = **abstraktes Lebewesen**: eigene Organe (Page, Layout, Free-List, Prefetch,
  Concurrency-Pattern, Measurement: 4+2-Pool, Distance-Estimator-Prefetch, OLC mit reservierten Blöcken,
  H1/H2/H3) + **ce-Fallback** (`resolve_baustein`) für die übrigen Achsen.
- **abstract- vs. full-Prüfling** + „Originalkonfiguration" (mind. einmal NUR eigene Achsen self-contained
  gemessen, im Profil `abstract`/`full`-gekennzeichnet). Quelle: Übergabe TODO-2; `project_tier_definitionsluecke…`.
- 8 Bausteinschichten (Bezug Abstract/Intro). Laufzeit-Anbindung = Execution-Engine-Adapter (kein SearchEngine-ABI).

### B.9 Builder & Drei-Stufen-Prüfung *(vorhanden, F4 erledigt)*
- **3 kompositionale Joins** = Stufe 1 (ce-only) / Stufe 2 (Prüfling-Replace + Fallback) / Stufe 3
  (Full-Join, nicht-redundant) → bilden direkt Messreihen A/B/C. Quelle: `reference_3_kompositionale_joins_anatomie`.
- **7-Phasen (F6 offen):** gegen `builder/experiment_driver/experiment_driver.cpp` EINE Liste festlegen;
  ggf. zwei Ebenen sauber benennen (Builder-Pipeline vs. ExperimentDriver). 
- best-binary = **Ziel/Ausblick** (nicht erledigt).

### B.10 Mess-Schnittstelle (Observer, I1) — \emph{NEU}
- **Genau EINE `IObservableTier` + EIN POD** (`observe_all → ObserverAggregate`; `axis_stats[19][8]` +
  `seg_ns[19]`); ABI-Major versioniert. Quelle: `feedback_one_consistent_observer_interface_pruefdock`; Doc 31.
- **Hybrid-Messmodell:** Pfad A = isolierte Achsen-Algos auf der DLL (`run_workload`); Pfad B = composite
  Tier zentral host-seitig (CEB) via ABI-stabilen `observe_all`. Quelle: `feedback_zwei_dimensionen_messmodell`.

### B.11 Schreib-Hinweise
- DE zuerst, EN strikt äquivalent; Metapher nur in Prosa/Kommentar, Code-Identifier technisch
  (`feedback_technical_identifiers_over_metaphor`). Outbound-Quellen als Vollangaben. Querverweise auf
  Kap. 2 (Grundlagen-Definitionsklassen) und Kap. 6 (Messmethodik) setzen.

---

## 4. Quellen
- **Doc 36** `…/docs/architecture/36_eine_architektur_lebewesen_ist_searchalgorithm.md` (Primär).
- Doc 14 `docs/architektur/14_achsen_komposition_organ_metapher.md`; Doc 34 `34_KONSOLIDIERTER…`;
  Doc 35 (function-handle-hops, T0–T18); Doc 30 §8.0/§8.1; Doc 31 (I1).
- Übergabe `…/docs/docs/sessions/20260620-UEBERGABE-impl-agent-EINE-ARCHITEKTUR-vereinheitlichung.md`.
- Memories: `reference_anatomie_gattungen`, `reference_3_kompositionale_joins_anatomie`,
  `reference_m_schichten_modell`, `feedback_technical_identifiers_over_metaphor`,
  `project_eine_architektur_lebewesen_searchalgorithm`.
