# Architektur-Analyse & Bild-Korrekturen (Habich-Feedback, code-geerdet)

> Datum: 2026-06-30 · Treiber: Prof. Habich Abbildungs-Feedback (DE/EN) · Status: Synthese-Vorlage für die nächste Schreib-/Implementierungs-Session
> Quelle Code (Cache-Engine, kanonisch): `C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Code/external/comdare-cache-engine/` — im Folgenden `<CE>`
> Quelle Super/Diplomarbeit-Code: `C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Code/` — im Folgenden `<SUPER>`
> Quelle Manuskript: `…/thesis/diplomarbeit/kapitel/{de,en}/`, `…/anhang/{de,en}/`

---

## 0. Zusammenfassung & Benutzung

Dieses Dokument verbindet **pro beanstandeter Abbildung** das reale Code-Bild mit der konkret nötigen Korrektur. Es ist als Arbeitsvorlage gedacht: jeder Abschnitt §1.x nennt (a) was die Abbildung **heute** zeichnet (mit `tex:Zeile`), (b) was der **Code** wirklich sagt (mit `datei:Zeile`), (c) die **konkrete Änderung**. §2–§4 liefern die ausführlichen Code-Fundamente (Genus/Tier-Hierarchie, Build+Mess-Pipeline, Mess-Kategorien + Lücke), §5 die zitierfähigen SiL-Quellen für `fig:heuristic-loop`, §6 den Architektur-Ist-Stand + offene Implementierungsprojekte + Text↔Code-Divergenzen.

**Wie zu benutzen:**
1. Erst §6 lesen (Ist-Stand + welche Docs autoritativ sind), damit keine veralteten Modelle einfließen.
2. Pro Abbildung §1.x abarbeiten; die `datei:Zeile`-Anker direkt im Code gegenprüfen (sie sind aus den Untersuchungen übernommen und teils stichprobenartig verifiziert).
3. Genus/Tier (§2), Pipeline (§3), Mess-Lücke (§4) sind die drei „großen" inhaltlichen Korrekturen — sie betreffen mehrere Abbildungen gleichzeitig.
4. **Single-Source-Regeln:** Bei Widerspruch gilt: Manuskript = Sollzustand (Code reparieren); Architektur-Ist = `<CE>/docs/architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md` + `36_eine_architektur_lebewesen_ist_searchalgorithm.md` + Live-Dossier `…/docs/sessions/20260628-KONTEXT-DOSSIER-…A2welle.md`. Kanonische Anatomie-Quelle = `<CE>/libs/cache_engine/anatomy/anatomy_base.hpp` (NICHT die veraltete `modules/comdare-cache-engine-core/…/anatomy_base.hpp`-Kopie mit „5 Gattungen/17 Achsen").

**Abbildungs-Nummerierung (verifiziert gegen `kapitel/de/`):**
Kapitel 1: `fig:cache-wall` (1.1, `de/01_einleitung.tex:11`), `fig:separability` (1.2, `:51`).
Kapitel 2 (`de/02_suchbaeume_grundlagen.tex`): `fig:search-map` (2.1, tikz 16–31 / caption :32), `fig:design-space` (2.2, tikz 35–43 / :44), `fig:cache-line` (2.3, tikz 142–146 / :147), `fig:synth` (2.4, :296), `fig:axis-organ` (2.5, tikz 309–319 / :320), `fig:usage` (2.6, tikz 326–343 / :344), `fig:three-levels` (2.7, tikz 356–366 / :367), `fig:genera` (2.8, tikz 377–395 / :396), `fig:patterns` (2.9, tikz 412–422 / :423), `fig:one-architecture` (2.10, tikz 458–474 / :475), `fig:abi` (2.11, :488–501), `fig:uml-interfaces` (2.12, tikz 538–556 / :557).
Kapitel 3 (`de/03_messsystem_prtart.tex`): `fig:m-model` (caption :419), `fig:heuristic-loop` (:550).
Kapitel 4 (`de/04_concept_architecture.tex`): `fig:m-model` (Duplikat, :159), `fig:one-architecture` (Duplikat, :202).
Kapitel 4 Impl (`de/04_implementierung.tex`): `fig:pipeline` (:109).

> Hinweis: Prof. Habichs gedruckte Nummern sind ausdrücklich „approximate". Sein „design-space ≈ 2.1" entspricht real **2.2**; seine späteren Nummern (axis-organ ≈ 2.6, genera ≈ 2.9, patterns ≈ 2.10, one-architecture ≈ 2.11, uml ≈ 2.13) liegen ~+1 über der aktuellen Zählung — d.h. der vom Prof. begutachtete PDF-Stand hatte im Bereich 2.2–2.5 vermutlich ein bis zwei Abbildungen mehr/anders. **Immer gegen den konkret annotierten PDF verifizieren.**

---

## 1. Pro-Abbildung-Korrekturanleitung (code-geerdet)

### 1.1 `fig:design-space` (2.2) — Legende + NEUE Mess-Dreieck-Abbildung

**Heute (`de/02:35–43`, `en/02:35–43`):** drei generische Achsen `Achse i / Achse j / Achse k`, 3×3×3-Punktgitter, ART als roter Punkt. Keine Legende mit realen Achsennamen.

**Code-Realität:** Die 19 realen Achsennamen sind single-sourced in
`<CE>/libs/cache_engine/builder/experiment_tree/axis_path_serialization.hpp:27–31` (`kCompositionAxisNames`) und gebunden in `<CE>/libs/cache_engine/anatomy/composition_factory.hpp:24–74` (`AdHocComposition<T0…T18>`). Reihenfolge T0..T18:

```
T0 search_algo   T1 cache_traversal  T2 mapping        T3 path_compression  T4 node_type
T5 memory_layout T6 allocator        T7 prefetch       T8 concurrency       T9 serialization
T10 telemetry    T11 value_handle    T12 isa           T13 index_organization T14 io_dispatch
T15 migration_policy  T16 filter     T17 queuing_q1    T18 queuing_q2
```

**Korrektur A (Legende):** Beibehaltung von 3 Achsen zur Illustration (wie vom Prof. gewünscht), aber `i/j/k` durch drei **echte** Achsennamen ersetzen und eine Legende „… von 19 Achsen (T0–T18), vollständige Liste s. Anhang/Kap. 3" ergänzen. Empfehlung: als illustrative 3 z.B. `node_type (T4)`, `memory_layout (T5)`, `allocator (T6)` wählen — das ist genau das reale 3-Achsen-Speicherorgan (s. §1.3/§2c), dann ist ART als Punkt im Raum dieser drei korrekt motiviert. Caption-Zusatz: „der volle Entwurfsraum hat 19 Dimensionen; hier 3 zur Darstellung".

**Korrektur B (NEUE Abbildung — Latenz/Durchsatz/Speicher-Dreieck):** Neues `fig:measurement-triangle` einführen. Inhalt: ein Dreieck mit den drei Mess-Komponenten **Latenz / Durchsatz / Speicher** an den Ecken; die gesamte **Achsen-Permutation** (der kartesische Produktraum aus §1.1) wird gegen diese drei Trade-off-Komponenten aufgespannt — das ist der eigentliche Such-Baum-Trade-off (eine Permutation = ein Punkt im Inneren des Dreiecks, je nach Latenz/Durchsatz/Speicher-Profil). Code-Verankerung der drei Ecken (alle drei existieren, s. §4):
- Latenz: real p50/p99 in `<CE>/libs/cache_engine/builder/commands/execution_result.hpp:28–29`; im Binär-Pfad als Zyklen approximiert (`<SUPER>/02_messung_driver/measurement_writer.hpp:105–106`).
- Durchsatz: `throughput_ops_per_sec` `execution_result.hpp` (gefüllt `execute_engine_command.hpp:119–121`).
- Speicher: `bytes_allocated/bytes_in_use_peak/…` `<CE>/libs/cache_engine/include/cache_engine/abi/module_abi_v1.hpp:39–42`.

**Korrektur C (Kennzeichnung der FEHLENDEN Komponente):** Caption/Begleittext muss ehrlich vermerken, dass die **node-/data-/index-Ebene mit cache-bewusstem Verhalten** als eigene Mess-Komponente in der Implementierung **fehlt** (s. §4): die Hardware-PMC-Zähler sind hinter `COMDARE_ENABLE_PMC` aus (default `NullPmcSource`, `<CE>/…/measurement/pmc_source.hpp:41–47`), der eigene Binär-Pfad hardcodet die HW-Spalten auf 0 (`measurement_writer.hpp:107–111`), und das compile-time `Measure<>/at_node_visit`-CLU-Gerüst (`<CE>/…/measurement/measure.hpp:23–55`) ist nirgends in die Traversierung verdrahtet. → Im Dreieck die „cache-aware node/data/index"-Vertiefung als **gestrichelte/ausstehende** Mess-Achse markieren, nicht als erbracht.

---

### 1.2 Leere-Abbildung-Prüfung (Kandidaten `fig:search-map` / `fig:cache-line`)

**Befund:** Im **aktuellen** Quelltext (HEAD `c86ea31` „Figuren-Korrekturen (Habich-Feedback)") haben **beide** Kandidaten gültige, nicht-leere TikZ-Körper:
- `fig:search-map` (2.1, `de/02:16–31`): `\node`-Baum „Suchstrukturen" → 5 Klassen + graue Beispiel-Labels. Nicht leer.
- `fig:cache-line` (2.3, `de/02:142–146`): `\foreach \i in {0,...,7}` 8 Rechtecke + 3 grün gefüllte + Beschriftung. Nicht leer.

**Wahrscheinlichste Zuordnung:** Die leere Abbildung des Profs liegt **zwischen/um** `design-space`. Da er `design-space` als „≈2.1" sah (real 2.2) und „die nächste ≈2.2" leer war, ist das real die **darauffolgende** Abbildung = **`fig:cache-line` (real 2.3)**. Zusätzliches Indiz: `fig:cache-line` ist die rechnerisch anfälligere (arithmetische `\foreach`-Koordinaten `(\i*0.55,…)`), und sie ist thematisch genau die „cache-aware"-Abbildung, die der Prof. mit „die cache-bewusste Mess-Komponente fehlt" assoziiert. **Sekundär-Kandidat:** `fig:search-map` (real 2.1, die Abbildung direkt davor).

**Aktion (verifizieren, nicht raten):** Beide Sprach-PDFs neu bauen (`build.ps1 -Lang de` / `-Lang en`), die vom Prof. annotierte Stelle visuell prüfen. Falls weiterhin leer: `.log` auf TikZ/pgf-`\foreach`-Fehler und Float-Platzierung prüfen (Body auf Folgeseite von Caption getrennt?). Sehr wahrscheinlich war die Leere im **älteren** begutachteten PDF und ist durch den „Figuren-Korrekturen"-Commit bereits behoben — dann nur noch im Korrektur-Anschreiben als „erledigt" vermerken. Beide Sprachfassungen gleich behandeln (`en/02:31` search-map, `en/02:142` cache-line).

---

### 1.3 `fig:axis-organ` (2.5) + `fig:usage` (2.6) — realer OPTIONALER Inter-Achsen-Nutzungsgraph

**Heute:**
- `fig:axis-organ` (`de/02:309–319`): Allokationsorgan → {Layout, Wert, Serial.} als **drei durchgezogene blaue** Kanten.
- `fig:usage` (`de/02:326–343`): **durchgezogen** `Allokator(T6) → Layout(T5)`, `→ Wert-Hülle(T11)`, `→ Serialisierung(T9)`; **gestrichelt (repräsentativ)** `Prefetch(T7) → Layout(T5)`, `Nebenläufigkeit(T8) → Knotentyp(T4)`, `Knotentyp(T4) → Layout(T5)`.

**Code-Realität (Untersuchung `inter_axis_usage`).** Es gibt **genau einen** echten Hub: das 3-Achsen-Speicherorgan `LayoutAwareChunkedStore<N,L,A>` / `NodeChunkedStore<N,L,A>` (node T4 ⊕ layout T5 ⊕ allocator T6), verdrahtet in `<CE>/libs/cache_engine/anatomy/abi_adapter.hpp:1890–1897` (`container_t = ObservableComposedSearch<traversal(03a), LayoutAwareChunkedStore<node(04), layout(05), alloc(06)>>`). Reale Kanten (Exposer→Konsument):

| Klasse | Kante (Code) | Beleg |
|---|---|---|
| **CANONICAL** (immer-an, durchgezogen) | `06 alloc → 04 node-store` | `axis_04_node_type_layout_aware_store.hpp:53–55,185,480,489` (`alloc_.allocate/deallocate`, `requires AllocatorStrategy<A>`); **einzige** Allokator-Konsumenten in `axes/` sind die 3 node-store-Dateien |
| **CANONICAL** | `05 layout → 04 node-store` | `axis_04_node_type_layout_aware_store.hpp:58–59,100,345–375` (Dispatch auf `L::representation_kind()/cache_line_size()`) |
| **CANONICAL** | `04/05/06 store → 03a search` | `storage_organ_concept.hpp:29–47`; `composable_search.hpp:59–64,184–186`; Weg-A/B `abi_adapter.hpp:830–838`, `container_traversal_t` `:1890–1893` |
| **OPTIONAL** (`requires`-gated, gestrichelt) | `04/05 store → 07 prefetch` (Prefetch **konsumiert** den Store) | `axis_07_prefetch_real_descent.hpp:90–154` (`store.slot_address(i)` → echtes `_mm_prefetch`), Adapter `abi_adapter.hpp:508–514,804,859,1381–1387` |
| **OPTIONAL** | `04 store → {05,09,10,14,01,io,migration,filter}` (9 observe_*-Hooks) | `axis_04_node_type_layout_aware_store.hpp:220–302`; `observable_composed_search.hpp:135–204` (`store_observe_*`, alle `requires`-gated) |
| **DOC-ONLY** (nicht im Code, gepunktet/„offen") | `08 concurrency → 04 node-type` | NICHT realisiert: Nebenläufigkeit ist eigenständige Critical-Section-Primitive, `cc_organ_.observe_critical_section()` `abi_adapter.hpp:798,853`; composable Organe streifen Concurrency ab (`masstree_layer_traversal_organ.hpp:6`, `wormhole_jump_traversal_organ.hpp:19`) |

**Konkrete Korrekturen:**
1. **Hub einführen:** zentraler Knoten `LayoutAwareChunkedStore<N,L,A>` (Organ 04⊕05⊕06). Aktuell fehlt der Hub komplett.
2. **Solide Kanten korrigieren:** Die heutigen durchgezogenen `alloc → {layout, value, serial}` sind **falsch als direkte kanonische Template-Kanten** — im Code gibt es **keine** direkte `value_handle→allocator`- oder `serialization→allocator`-Kante; sie ist über den Store **vermittelt**. Solide bleiben nur: `alloc(T6) → store`, `layout(T5) → store`, `store → search(T0)`.
3. **Layout/Wert/Serialisierung als OPTIONAL umzeichnen:** Diese lesen den allocator+layout-gestützten Speicher **durch** den Store via optionaler `observe_*`-Hooks → **gestrichelt**, nicht durchgezogen.
4. **Prefetch-Richtung+Ziel fixen:** Heute `Prefetch→Layout`; real `store(04/05) → Prefetch(07)` (Prefetch konsumiert den Store über `slot_address`) → gestrichelt, Pfeil vom Store zum Prefetch.
5. **Knotentyp→Layout fixen:** Heute `Knoten→Layout` gestrichelt; real `layout(05) → store(04)` durchgezogen (Store konsumiert Layout).
6. **Concurrency→Node als DOC-ONLY markieren:** gepunktet + Label „im Code (noch) nicht verdrahtet" — oder entfernen. Aussage des Profs „Achsen KÖNNEN (optional) fremde Interfaces nutzen, MÜSSEN aber nicht": exakt diese Klassifikation (1 kanonischer Speicher-Backbone + viele optionale `requires`-gated Hooks) muss die Abbildung tragen.

Design-Prinzip-Belege für Caption/Text: `<CE>/docs/architecture/30_audit_achsen_delegation_pflichtachsen.md:35–88`, Funktionspfade `…/35_function_handle_hops.md`. **Wichtige Abgrenzung:** Die vielen `requires`-gated Adapter-Treiber (`pc_organ_.compress`, `ct_organ_.register_entry`, `map_organ_.register_slot`, `queuing_*`, `telemetry_organ_…`, `abi_adapter.hpp:765–822`) sind **NICHT** Achse-nutzt-Achse, sondern der Adapter/Observer treibt jede Achse mit Roh-Key/Value — diese gehören NICHT als Achse→Achse-Kanten in `fig:usage`.

---

### 1.4 `fig:genera` (2.8) — reale, TIEFERE Genus→Tier→konkrete-Binary-Hierarchie

**Heute (`de/02:377–395`):** Reich „Animalia" → 3 Gattungen (SearchAlgorithm/Container/Graph) → Tier-Unterklassen: SearchAlgorithm→Säugetier (map/unordered_map, 19 Achsen); Container→{Vogel=Set, Reptil=Sequence, Wirbelloses=Adapter, Pflanze=View}; Graph→eigener Organsatz. **Stoppt auf Ebene 2 (Tier-Unterklasse).**

**Prof.-Kritik:** „INCORRECT. Jede Tier-Binary eines Suchalgorithmus ist ihr **eigenes** Tier; die Hierarchie geht viel **tiefer**. Container beherbergen z.B. nur ‚Reptilien'; SearchAlgorithms nur ‚Säugetiere' unter einer std::map-Hülle."

**Code-Realität (Untersuchung `anatomy_tier`, kanonisch `<CE>/libs/cache_engine/anatomy/anatomy_base.hpp`).** Zwei Punkte:

(a) **Container ≠ nur Reptilien — Präzisierung nötig.** Die Gattung Container beherbergt **vier** Tier-Unterklassen, nicht nur Reptilien: Set=**Vogel**, Sequence=**Reptil**, Adapter=**Wirbelloses**, View=**Pflanze** (`anatomy_base.hpp:64–72`). „Reptil" ist spezifisch die *Sequence*-Unterklasse (`sequence_anatomy.hpp:38`). Korrekte Formulierung: **Container beherbergt jede NICHT-Säugetier-Unterklasse.** Die heutige Abbildung zeigt das schon richtig — also hier nur Caption schärfen.

(b) **SearchAlgorithm = nur Säugetier unter std::map-Hülle — korrekt, aber die Tiefe fehlt.** Die Hülle ist real und tragend: `anatomy_base.hpp:41` („K→V, std::map-artig"), R3-Pilot hält `std::map<uint64_t,uint64_t>` (`search_algorithm_anatomy.hpp:28`), Host treibt jede Binary durch `IDriveableTier` + „std::map-Konformitäts-Gate" (`idriveable_tier.hpp:10,27`); variadische Hülle `search_algorithm_type_collection<Ts...>` (`<CE>/libs/cache_engine/include/cache_engine/abi/search_algorithm_type_collection.hpp:15`), Arity-Dispatch 1⇒vector / 2⇒map / N⇒map<K,tuple> (`abi_adapter.hpp:122`).

**Die wahre Tiefe (L1–L5) — das ist die Korrektur:**

```
IExecutionEngine                         (messbare Wurzel; execution_engine_base.hpp:98)
└─ IAnatomyBase                          (Animalia / lebendig; anatomy_base.hpp:133)
   └─ L1 Gattung (genau 3)               SearchAlgorithm | Container | Graph   (Außen-Interface/Prüf-Dock; anatomy_base.hpp:40–44)
      └─ L2 Tier-Unterklasse             SearchAlgorithm(Säugetier) ; Set/Sequence/Adapter/View ; (Graph offen)
         │                                (AnatomyGenus, anatomy_base.hpp:67–73; Mapping gattung_of() :89–98; #90→AnatomyTierSubclass)
         └─ L3 Achsen/Organe             19 (Säugetier) … 15 Set / 11 Sequence / 13 Adapter / 7 View   (permutieren)
            └─ L4 konkrete Composition   eine Belegung ALLER Achsen = eine konkrete Art/„Tier"
               │                          (known_algorithms.hpp:29 „6 CE-Re-Impl Tiere", :32–48 = 11 konkrete Tiere)
               └─ L5 kompilierte .so/.dll Tier-Binary  (+ 3 eingebackene Build-Achsen) = das Individuum
                                          (abi_adapter.hpp:11–12 „ein Binary = ein Adapter"; build_variant_definition.hpp:17–39)
```

**Konkrete Änderung:** Die Abbildung um **L4** (konkrete Composition = konkretes Tier; 11 benannte konkrete Tiere aus `known_algorithms.hpp`) und **L5** (per-Permutation kompilierte `.so/.dll` Tier-Binary, identitätsfeiner durch 3 eingebackene Build-Achsen `page_type/simd_extension/general_hardware`, `build_variant_definition.hpp:17–39`) vertiefen. Mindestens ein Säugetier-Ast bis L5 ausziehen (z.B. „ART → konkrete 19-Achsen-Belegung → `comdare_perm_<fp>.dll`"). Belege Binary-pro-Permutation: `composition_factory.hpp:51` (`AdHocComposition<T0..T18>` „pro Cartesian-Produkt-Punkt"), `search_algorithm_permutation_engine.hpp:51–52` (`for_each_abi_adapter`). Die heutige `fig:three-levels` (2.7) bleibt als verdichtetes 3-Ebenen-Modell korrekt; `fig:genera` ist die Stelle, an der die Tiefe L4/L5 ergänzt wird.

> Vorsicht: „5 genera" / „5 Gattungen" / „17 Achsen" ist das ALTE falsche Modell (stale `modules/comdare-cache-engine-core/.../anatomy_base.hpp`). Die korrigierte Quelle vermerkt explizit `korr. 2026-06-03 — vorher fälschlich „5 Gattungen"` (`anatomy_base.hpp:31`). Real: **3 Gattungen (L1) + 5 Tier-Unterklassen (L2, davon 1 Säugetier unter SearchAlgorithm, 4 unter Container)** — die „5" der alten Abbildung sind 1 Gattung + 4 Unterklassen auf eine Ebene kollabiert (genau die Ebenen-Verwechslung, die zu beheben ist).

---

### 1.5 `fig:patterns` (2.9) — feinkörnige Code-Erdung der 19-Achsen-Sezierung

**Heute (`de/02:412–422`):** oben GoF-Muster (Strategy(19 Achsen) · Abstract Factory/Composite/Iterator(Permutations-Baum) · Adapter · Observer/Decorator · Memento(CoW) · CRTP/Template Method), unten 2 neue Übersetzungszeit-Muster (lazy-spärliche kartesische Materialisierung; typgetriebenes Quelltext-Emittieren). Prof.: „korrekt, aber feinkörnig gegen den Code prüfen; die 19 Achsen wurden aus dem Code seziert → mehrstufigen konzeptionellen Aufschluss auf Code-Ebene nachzeichnen."

**Code-geerdeter mehrstufiger Aufschluss (Untersuchung `axes_dissection`).** Die fig:patterns-Trias „Concept + CRTP + variant" ist pro Achse real (Exemplar = `search_algo`, `axes/lookup`):

1. **Topic-Concept (Marker, M2):** `<CE>/libs/cache_engine/topics/traversal/concepts/topic_traversal_concept.hpp:28–37` (`TraversalTopicTag`, `TraversalComponent<T>`).
2. **Axis-Concept (Standard-API):** `axes/lookup/concepts/axis_03a_search_algo_concept.hpp:35–49` (`SearchAlgoVariant<S>` = TraversalComponent + key/value/size + insert/lookup/erase/…).
3. **Axis-CacheEngine-Permutations-Concept (Pflicht-Properties):** `axes/lookup/concepts/axis_03a_search_algo_cache_engine_permutation_concept.hpp:57–91` (verlangt `axis_tag` = Sub-Achsen-Familie, `family_id`, name/family_name/flag_suffix, Sonderfall-Props supports_simd/range_scan/is_dense/has_cache_line_alignment, unter `COMDARE_CE_ENABLE_STATISTICS` die statistics/reset/observer-Mess-API).
4. **CRTP-Basis (Henne-Ei-Guard):** `axes/lookup/axis_03a_search_algo_base.hpp:25–39` (`SearchAlgoBase<Derived,CacheLineConfig> : topics::AxisBase, cacheline::CacheLineAware<Cfg>`, concept-`static_assert` im ctor).
5. **Registry → „variant" (geschlossene Strategie-Menge):** `axes/lookup/axis_03a_search_algo_registry.hpp:45–77` (`AllStrategies = mp_list<…17 wrappers…>`, `EnabledStrategies = mp_filter<is_enabled, …>` aus generierten `axis_03a_search_algo_flags.hpp`). Diese mp_list ist die produktive „variant" pro Achse; die PermutationEngine nimmt das Cartesian-Produkt über die `EnabledStrategies`.

**Der literale `std::variant`** (das wörtliche fig:patterns-„variant") lebt im separaten, fundamentalen **11-Achsen-Baustein-Modell** (REV7.6, PRT-ART↔CacheEngine-Fallback): `<CE>/libs/cache_engine/include/cache_engine/abi/baustein_variants.hpp` (`PageAxis:83`, `NodeAxis:131`, `TraversalAxis:163`, `ValueHandleAxis:185`, `ConcurrencyAxis:221`, `AllocatorAxis:309` (16 Familien A01–A20), `PrefetchAxis:348`, `TelemetryAxis:380`, `IsaAxis:417`, `LayoutAxis:453`, `ReclamationAxis:485`; `DefaultElevenAxes:491–493`; Kardinalität 5.485.363.200 :495–498) + Auflösung `…/abi/resolve_baustein.hpp:97–114` (`resolve_baustein<Algo,Tag>`: bevorzugt `Algo::baustein_t<Tag>` (PRT-ART), sonst `cache_engine::baustein_t<Tag>::type`, sonst `void`).

**Konkrete Korrektur:** `fig:patterns` ist inhaltlich korrekt — ergänzen um (a) die **Drei-Stufen-Concept-Kette** (Topic-Concept → Axis-Concept → CacheEngine-Permutations-Concept) als Verfeinerung von „Strategy + CRTP/Template Method", und (b) die **Zwei-Welten-Klarstellung**: produktiv = Concept-CRTP-Strategien in `mp_list` (`registry`); der literale `std::variant` = das 11-Achsen-`baustein_variants`-Modell (Fallback/PRT-ART). Beleg-Anker für „19 Achsen aus Code seziert": authoritative 22-Achsen-Tabelle `<CE>/docs/architecture/28_vollstaendigkeits-kartographie.md:47–77` (19 Composition + 3 Build = 22 Achsen / 15 Topics), per-Achsen-Timer `abi_adapter.hpp:431–456` + Session `<CE>/docs/sessions/20260604-mess-architektur-19-achsen-timer.md`.

> Für etwaige AXIS-T0..T18-Detailbilder: jede Achse trägt eine Sub-Achsen-Tag-Familie (z.B. search_algo SA1–SA4, allocator AA1–AA7, queuing_q1 QS1–QS6, general_hardware HW1–HW4). Vollständige Familien-Tabelle s. Untersuchung `axes_dissection` §3 (Dateien `axes/*/…_subaxes_*.hpp` + Topic-Spiegel).

---

### 1.6 `fig:one-architecture` (2.10) + `fig:uml-interfaces` (2.12) — feinere Abstraktionsklassen, Anatomie=Beziehungen, IExecutionEngine=Mess-Treiber

**Heute:**
- `fig:one-architecture` (`de/02:458–474`, Duplikat `de/04_concept_architecture.tex:202`): `IExecutionEngine` → {`IAnatomyBase`, `IVirusExecutionEngine`}; `IAnatomyBase` → {SearchAlgorithm, Container, Graph}-Gattung; SearchAlgorithm → {`SearchAlgorithmAnatomy<C>` (Körper, 19 Organe), `SearchAlgorithmAbiAdapter<A>` (ABI-Sicht)}.
- `fig:uml-interfaces` (`de/02:538–556`): links Engine-/Anatomie-Hierarchie (`IExecutionEngine`→`IAnatomyBase`→`SearchAlgorithmAnatomy<C>`→`SearchAlgorithmAbiAdapter<A>`, `IVirusExecutionEngine` als Geschwister), rechts je-Achse-Muster (`TopicConcept∧AxisConcept`→`AxisBase<Derived>(CRTP)`→`std::variant<Baustein_{1..k}>`→`resolve_baustein<Tag>`), gestrichelte Kante „komponiert 19 Achsen".

**Code-Realität (Untersuchung `anatomy_tier` §d).** Die beiden Abbildungen sind grundsätzlich richtig; verfeinern:

1. **`IExecutionEngine` = der MESS-TREIBER über ALLEM Messbaren.** Header `execution_engine_base.hpp:1–19`: „ExecutionEngine ist die Wurzel ueber AnatomyBase (Mess-Schicht)" + Virus-Metapher „Anatomie : ExecutionEngine wie Lebewesen : Viren — Viren nicht lebendig (keine Topics/Achsen), aber ausmessbar". Konkret trägt `IExecutionEngine` (`:98–119`) den **Mess-Lebenszyklus**: `warm_up()/run()/reset()/shutdown()` (`:112–118`), `lifecycle_state()/engine_name()/engine_kind()` (`:103–109`), compile-time-Zwilling `ExecutionEngineConcept` verlangt `measurement_snapshot_t` (`:78–83`). `ExecutionEngineKind` (`:39–43`) spannt **Anatomy** (lebendig, Organe/Achsen), **Virus** (nicht-lebendig — Graph-Algos/Pipelines/reine Mathe, achsenlos aber messbar), **Hybrid**. `IAnatomyBase` pinnt nur `engine_kind()==Anatomy` (`anatomy_base.hpp:138–140`). → In `fig:one-architecture` die Wurzel-Box `IExecutionEngine` explizit als **„Treiber der Messung / universeller messbarer Vertrag (Anatomy ∪ Virus ∪ Hybrid)"** labeln; Engine-self-drive via `IMeasurableWorkload::run_workload` (`abi_adapter.hpp:254`).

2. **Anatomie = Beziehungen ZWISCHEN allen Komponenten (nicht Monolith).** Per alter Thesis-Text: die Anatomie beschreibt die **Verdrahtung** (Feature-Interaktion), s. `de/02:299–307` und §1.3. → In beiden Abbildungen klarmachen, dass `SearchAlgorithmAnatomy<C>` der **Körper = feste Komposition + Verdrahtung der 19 Organe** ist (nicht nur eine Liste); die Inter-Organ-Kanten aus §1.3 sind genau diese Anatomie.

3. **Feinere Abstraktionsklassen-Aufschlüsselung (Prof.-Wunsch):** Zwischen Gattung und Adapter die volle Kette zeigen:
`IExecutionEngine` → `IAnatomyBase` → `SearchAlgorithmAnatomy<Composition>` → `SearchAlgorithmAbiAdapter` (ABI-Laufzeit-„SearchEngine"-Sicht) → **19 Achsen ≡ Organe** → (L4) konkrete Composition → (L5) Tier-Binary. Zusätzliche reale Klassen, die genannt werden können: `IDriveableTier`/`IObservableTier` (Treib-/Beobachter-Schnittstelle, `idriveable_tier.hpp`, `observable_tier.hpp:127–144`), `IsComposition` (19 Pflicht-Organe, `composition_concept.hpp:20–58`).

**Konkrete Korrektur:** `fig:one-architecture` um die L4/L5-Tiefe (s. §1.4) und das `IExecutionEngine`-als-Mess-Treiber-Label ergänzen; `fig:uml-interfaces` linke Spalte um `IDriveableTier`/`IObservableTier` (Mess-/Treib-Verträge) und den Hinweis ergänzen, dass `IExecutionEngine` der Mess-Treiber ist, der durch **alle** Engines (Anatomy+Virus) misst. Beide Duplikate (Kap.2 + Kap.4) synchron halten.

---

### 1.7 `fig:m-model` (3.1 / Kap.4) + `fig:pipeline` (4.1) — BUILD+MEASURE-Betonung, CacheEngineBuilder baut Tier-Binaries nach Konfiguration und misst

**Heute:**
- `fig:m-model` (`de/03_messsystem_prtart.tex:405–419`, Duplikat `de/04_concept_architecture.tex:145–159`): 4 Subsysteme (messung_driver → CacheEngineBuilder → CacheEngine ↔ Prüfling) mit `ExecutionEngine` als geteilter messbarer Wurzel. Prof.: „7 Phasen korrekt — aber die INTERESSANTEN Phasen sind die BUILD+MEASURE-Phasen des Diplomarbeit-Codes und der CacheEngineBuilder, der TIER-BINARIES nach Konfiguration baut und misst."
- `fig:pipeline` (`de/04_implementierung.tex:80–109`, `en/04:…105`): 7-Phasen `ExperimentDriver` Enumerate→Codegen→Compile→Load→Execute→Measure→Persist + 2 opt-in-Phasen.

**Code-Realität (Untersuchung `build_measure`).** Kern-Invariante (WIE vs WAS): Cache-Engine entscheidet **WIE** gemessen wird; Diplomarbeit-Code entscheidet **WAS** (`<CE>/apps/cache_engine_builder/main.cpp:8–12`; `<SUPER>/02_messung_driver/main.cpp:9–11` + `README.md:15–21`; `<CE>/libs/cache_engine/builder/build_orchestrator/build_orchestrator.hpp:5–7`).

**Es gibt ZWEI Build+Mess-Subsysteme; die Abbildungen zeigen nur das ältere (Pfad A):**

**Pfad A — `ExperimentDriver` 7-Phasen (= was `fig:pipeline` heute zeichnet).** `<CE>/libs/cache_engine/builder/experiment_driver/experiment_driver.cpp`, App `apps/cache_engine_builder/main.cpp:110–111` (`driver.run_pipeline_full`), getrieben von `<SUPER>/02_messung_driver/main.cpp:526–529` (ein `ExperimentDriver` pro Messreihe A/B/C):
- P1 ENUMERATE `:32` (XML-Parse + `PermutationLoop::enumerate :45–46`) — **substanziell** (definiert den Permutations-/Konfig-Raum) + SOTA-Auto-Pickup `:80–122`.
- P2 CODEGEN `:59` (ein `comdare_perm_<fp>.cpp` pro Permutation `:72–76`, `generate_aggregate_cmake :124`) — mechanisch.
- P3 COMPILE (**der BUILD**) `:175` (cmake configure `:188–189`, `cmake --build … --target comdare_all_permutations :195–196`, ein Aggregat-Projekt) — **substanziell**.
- P4 LOAD `:266` (`ModuleLoader::load_all`, LoadLibrary/dlopen `:276`) — mechanisch.
- P5+6 EXECUTE+MEASURE (**der MEASURE**) `:295` (P5/P6 in **eine** Methode gefaltet `:291–292`; `create_instance:379`, Profil-Routing `:310–373`, `run_workload:398`, `aggregator.add:413`) — **substanziell**.
- P7 PERSIST `:424` (`export_csv/export_json :428–429`) — mechanisch.
- Opt-in (gestrichelt): `phase3_hot_compile_missing :248`, `phase4b_functional_tests` (ABI-Check) `:211`. Orchestrierung `run_pipeline_full :445` (ruft 1→2→3→4→5→7; **keine** separate Phase-6-Methode).

**Pfad B — `BuildOrchestrator` + `ExperimentTree` + `perm_runner` (die literalen „Tier-Binaries"; der EMPFOHLENE/verifizierte MANUAL_RUN-Weg). NICHT in den Abbildungen.** Das ist die Entsprechung von „tier-binary build+measure":
- **BAUT Tier-Binaries nach Konfiguration:** `<CE>/libs/cache_engine/builder/build_orchestrator/build_orchestrator.hpp` (`BuildOrchestrator :171`, `provision_all :180/:187`, Build-Kern `:200`; „Tier-Binaries" wörtlich `:2,:74,:83`). C++23-multithreaded, RAM-admission-gated, inkrementell/resumierbar (1 DLL = 1 TU): Versions-Sidecar-Skip `dll_is_current :155`, RAM-Admission `:279–296`, realer Compile `make_system_compile_fn` (`cl /LD` je `perm_<id>.cpp`→`perm_<id>.dll`) `:353–364`. Prinzip „Host zuerst → ALLE DLLs → danach messen" `:5`.
- **Konfig-Enumeration:** `<CE>/libs/cache_engine/builder/experiment_tree/experiment_tree.hpp` (`AxisLevel :189`, `BinarySpec :223` mit `binary_id` = serialisierter statischer Achsenpfad = „die Tier-Binary" `:214,:225`, `StaticBinaryView` lazy-∏ `:235`).
- **MISST sie:** `<CE>/apps/perm_runner/main.cpp` (lädt EINE perm-DLL via `AnatomyModuleLoader :33`, treibt über `IObservableTier :39`, `run_observable_perm`→genau eine `result_ingest`-Zeile `:47–48`; Cluster: 1 SLURM-Task = 1 perm_runner = 1 DLL `:3–5`).
- **End-to-End-Schlussstein:** `<CE>/libs/cache_engine/builder/experiment_tree/e2e_pipeline.hpp:2–10` („Source generieren → DLL kompilieren (**BuildOrchestrator**) → laden (**AnatomyModuleLoader**) → treiben (**perm_runner**) → result-Zeile" `:7–9`; `run_e2e_pipeline :35`).
- **Profil-Brücke (WAS für Pfad B):** `<CE>/tests/unit/thesis_tiere/profile_runner.hpp:5–17` (`comdare_thesis_profile → parse_thesis_profile → build_axis_levels → tree.build → run_lazy_static_then_dynamic`; `make_union_source_gen` base-320 ∪ SOTA `:62`).
- **Host-Treiber + Skript:** `<CE>/tests/unit/thesis_tiere/run_lazy_150.cpp` (`:71` BuildOrchestrator) + `…/build_and_measure_150_tiere.ps1` (Host-Exe einmal `:150`, dann je perm-DLL build+load+measure; ≥150/320 SA-Composition-Tier-DLLs statisch, dann **per-DLL dynamische Variation** thread_count×prefetch_distance `:1–4`). `MANUAL_RUN.md:11–26` = empfohlener Weg A; `:39–49` = Pfad A „nach offenen Fixes".

**Diplomarbeit-Mess-Phase (`<SUPER>/02_messung_driver/main.cpp`, die substanzielle WAS):** (1) Pre-Flight/Manifest `assert_permutations_available_or_die :216`; (2) **eigene Mikro-Benchmark-Schleife** (V38.C/V41.B1) `:235–411` (`load_all_perm_plugins :249`, N=1000 ops × 10 reps `:269–302`, Binär-Records via `MeasurementWriter` magic `0xC0FFEE02` `measurement_writer.hpp:29`, `compute_stats` + per-Achsen-CSV + subtree-Welch-t-Tests `:283,:367–407`); (3) Delegation an Pfad A `:506–538`. Plus **V32Orchestrator** (`<SUPER>/02_messung_driver/v32_orchestrator.hpp:101–189`: EE-A(CacheEngine) vs EE-B(PrtArt) via `std::async :167–176`, `CompareEngineCommand` Welch `:181–187`) — einzige Stelle, an der der Prüfling head-to-head aktiv gemessen wird.

**Konkrete Korrekturen:**
- **`fig:m-model`:** die `CacheEngineBuilder`-Box in **Build-Hälfte** (`BuildOrchestrator`/`ExperimentTree` → Tier-Binaries) und **Mess-Hälfte** (`perm_runner`/`ExecutionEngine`) splitten; `messung_driver` als äußere WAS-Schleife zeigen, die Konfigs (`thesis_profile`/`messreihen.xml`) einspeist. Beide Duplikate (Kap.3 + Kap.4) synchron. Hinweis: Spec `<CE>/docs/architektur/10_schichten_modell_M.md §5:208–222` nennt **konzeptionelle** Phasennamen (DISCOVER/MEASURE/CLASSIFY/PUBLISH/BIND/EXECUTE/COMPARE) — die **abweichen** von den Code-Namen (Enumerate/Codegen/Compile/Load/Execute/Measure/Persist); §5 stellt fest, Phase 6 EXECUTE ist die einzige Phase mit aktivem Prüfling (`:219,:222`). In der Abbildung die Code-Namen führen, konzeptionelle als Klammer.
- **`fig:pipeline`:** Pfad A (7 Phasen) behalten, aber **Pfad B ergänzen** (BuildOrchestrator „alle-Tier-Binaries-zuerst, resumierbar/RAM-aware" + `perm_runner` per-Binary-Messung mit dem dynamischen thread×prefetch-Sweep), da das der real **empfohlene** Fluss ist. BUILD- und MEASURE-Knoten visuell hervorheben (substanziell), CODEGEN/LOAD/PERSIST als einfache Plumbing-Boxen.

---

### 1.8 `fig:heuristic-loop` (3.4) — „perfekt", externe SiL-Quellen ergänzen

Prof.: Abbildung perfekt; recherchieren, ob bekannte „Software-in-the-Loop"-Systeme diesen measure→profile→config→filter-Zyklus nutzen → externe Quellen zitieren. **Vollständige Zitatkandidaten in §5.** Caption-Anker `de/03_messsystem_prtart.tex:550`: „aus den Messreihen wird je Lastprofil die beste Achsen-Komposition gelernt, als XML-Lastprofil abgelegt und über den Workload-Filter in die nächste Messung zurückgeführt." → das ist die klassische **empirische/messgetriebene Autotuning-Rückkopplung**; in 2–3 Sätzen mit den Tier-1/2-Quellen aus §5 einordnen (OpenTuner als Rahmen, FFTW+ATLAS als messen-im-Kreis-Linie, OtterTune+AutoAdmin für die Lastprofil/Workload-Filter-Aspekte, Tibba et al. nur für die SiL/X-in-the-loop-Namensherkunft).

---

## 2. Die REALE Genus/Tier-Hierarchie (konkret, datei:Zeile)

Kanonisch: `<CE>/libs/cache_engine/anatomy/anatomy_base.hpp` (Korrektur-Note `:31` „vorher fälschlich 5 Gattungen"). **Stale, NICHT verwenden:** `modules/comdare-cache-engine-core/include/comdare-cache-engine-core/anatomy/anatomy_base.hpp` (altes „5 Gattungen/17 Achsen").

**Wurzel-/Mess-Schicht (über Ebene 1):**
- `IExecutionEngine` — `<CE>/libs/cache_engine/execution_engine/execution_engine_base.hpp:98` = WURZEL über allem Messbaren.
- `IAnatomyBase : public IExecutionEngine` — `anatomy_base.hpp:133` (Anatomien = Spezialfall von ExecutionEngine).

**L1 — `AnatomyGattung` (Außen-Interface/Prüf-Dock, GENAU 3)** — `anatomy_base.hpp:40–44`:
`enum class AnatomyGattung : uint8_t { SearchAlgorithm=0, Container=1, Graph=2 };`
SearchAlgorithm = K→V (std::map-artig); Container = Container-Interface; Graph = Graph-Interface (Unterklassen offen).

**L2 — `AnatomyGenus` = Tier-Unterklasse (fester Achsensatz)** — `anatomy_base.hpp:67–73`:
`enum class AnatomyGenus : uint8_t { SearchAlgorithm=0, Set=1, Sequence=2, Adapter=3, View=4 };` (Refactor zu `AnatomyTierSubclass` via #90, `:56–57`).

**L1→L2-Mapping** (`gattung_of()`, `anatomy_base.hpp:89–98`):

| Tier-Metapher | AnatomyGenus (L2) | Gattung (L1) | genus()-Definition |
|---|---|---|---|
| Säugetier | SearchAlgorithm | **SearchAlgorithm** | `search_algorithm_anatomy.hpp:46` |
| Vogel | Set | **Container** | `set_anatomy.hpp:39` |
| Reptil | Sequence | **Container** | `sequence_anatomy.hpp:38` |
| Wirbelloses | Adapter | **Container** | `adapter_anatomy.hpp:170–171` |
| Pflanze | View | **Container** | `view_anatomy.hpp:35` |

→ SearchAlgorithm-Gattung = genau **1** Unterklasse (Säugetier); Container-Gattung = **4** (Vogel/Reptil/Wirbelloses/Pflanze); Graph = noch keine.

**L3 — Achsen/Organe** (`anatomy_base.hpp:34`): Säugetier 19 (17 Such-Achsen + queuing q1/q2, `composition_factory.hpp:52–70`, Pflicht via `IsComposition` `composition_concept.hpp:20–58`); Set 15 / Sequence 11 / Adapter 13 / View 7 (je `organ_count()`).

**L4 — konkrete Composition = konkretes Tier:** `known_algorithms.hpp:29` „6 CE-Re-Impl Tiere", `:32–48` = 11 konkrete Tiere (`using Art = SearchAlgorithmAnatomy<ArtComposition>;` …) — gleiches Skelett, andere Organ-Ausprägung (`README.md:18–26`).

**L5 — kompilierte .so/.dll Tier-Binary (+ 3 Build-Achsen):** `abi_adapter.hpp:11–12` (ein Permutations-Binary exportiert via `extern "C"` genau EINEN Adapter; Factory `:131–137`), `composition_factory.hpp:51` (pro Cartesian-Punkt), `search_algorithm_permutation_engine.hpp:51–52` (`for_each_abi_adapter`). Build-Achsen `build_variant_definition.hpp:17–39` (`BuildVariantDefinitionV1`: page_type/simd_extension/general_hardware als static constexpr Build-Konstanten).

**std::map-Hülle (tragend für Säugetier):** `anatomy_base.hpp:41`, R3-Pilot `search_algorithm_anatomy.hpp:28`, Konformitäts-Gate `idriveable_tier.hpp:10,27`, variadische Hülle `…/abi/search_algorithm_type_collection.hpp:15`, Arity-Dispatch 1⇒vector/2⇒map/N⇒map<K,tuple> `abi_adapter.hpp:122`. genus-static_assert `abi_adapter.hpp:161`.

---

## 3. Die REALE Build+Mess-Pipeline (konkret)

(Ausführlich in §1.7.) Kurzfassung der Verantwortungen:

- **BAUT Tier-Binaries nach Konfiguration: die Cache-Engine (CacheEngineBuilder = WIE), nie der Diplomarbeit-Code.**
  - Pfad A: `ExperimentDriver::phase3_compile` (`experiment_driver.cpp:175`, Aggregat-cmake).
  - Pfad B (die realen „Tier-Binaries"): `BuildOrchestrator::provision_all` (`build_orchestrator.hpp:180`, per-`binary_id`, resumierbar, RAM-aware), gespeist aus `StaticBinaryView` (`experiment_tree.hpp:235`).
- **MISST sie: ebenfalls die Cache-Engine, aber von der Diplomarbeit getriggert/parametrisiert.**
  - Pfad A: `ExperimentDriver::phase5_run_workload` (`experiment_driver.cpp:295`, in-process).
  - Pfad B: `apps/perm_runner/main.cpp:47` (out-of-process, 1 DLL/Prozess, `IObservableTier`).
  - Diplomarbeit `02_messung_driver` besitzt die **äußere** Mess-Schleife + eigene Mikro-Bench/Welch-Statistik + EE-A-vs-EE-B-Vergleich.
- **Configs (WAS):** `<SUPER>/experiment_config/{config_a_prt_art_vs_sota, config_b_cache_engine_perms, config_c_merge_alt_neu, messreihen}.xml`.
- **Build-Modell (ehrlich):** `1 DLL = 1 TU = eine volle 19-Achsen-Composition`; kein inkrementeller Build; einzige Inkrementalität = Resume (Skip identisch-versionierter DLLs). (`<CE>/docs/ERWEITERUNGS-LEITFADEN.md`, `…/architecture/BUILD-MODELL-1DLL-1TU-KLARSTELLUNG.md`)

---

## 4. Mess-Kategorien + die Lücke (für `fig:design-space`-Dreieck §1.1)

**Zwei parallele Mess-Pipelines, je eigene Record-POD + `ResultAggregator`, plus ein „autoritativer" vereinheitlichender POD:**
- Pipeline A (Binär-Record, Stage 02→03, speist die LaTeX-Diagramme): POD `comdare_measurement_record_v1` `<CE>/…/abi/module_abi_v1.hpp:29–43`; `ResultAggregator` `<CE>/libs/execution_engine/include/comdare/experiment/result_aggregator.hpp:39–62` + `…/src/result_aggregator.cpp:21–99`; Writer `<SUPER>/02_messung_driver/measurement_writer.hpp:52–118`; Stats `…/stats_aggregator.hpp:30–181`; Binär→CSV `<SUPER>/03_binary_to_csv/binary_to_csv.hpp:19–49`.
- Pipeline B (CEB-Command, V32/V33): POD `ExecutionResult` `<CE>/libs/cache_engine/builder/commands/execution_result.hpp:22–46`; zweiter `ResultAggregator` `…/commands/result_aggregator.hpp:91–124`; reale per-op-Messung `…/commands/execute_engine_command.hpp:82–134`.
- Autoritativer 16+6-POD: `<CE>/libs/cache_engine/builder/measurement_snapshot.hpp:34–63`.
- Intendiertes Voll-Metrik-Set (großteils **aspirational**): `<CE>/libs/cache_engine/include/cache_engine/measurement/measurement_category.hpp:9–26` (`CLU, CACHE_MISS_L1/L2/L3, DTLB_MISS, MEMORY_FOOTPRINT, BRANCH_MISS, IPC_CPI, LATENCY_MEAN/P50/P95/P99/P999, THROUGHPUT, ENERGY_J, FILL_BUFFER_OCCUPANCY`).

**Die drei Dreieck-Ecken — heute gemessen?**
- **LATENZ** — real (Pfad B): per-op-Wall-Clock + p50/p99 `execute_engine_command.hpp:96–126` → `execution_result.hpp:28–29`; autoritativ p50 ns als `total_cycles` `measurement_snapshot.hpp:96`. Binär-Pfad nur **approximiert** aus µs/op (`measurement_writer.hpp:105–106`, `total_us*3000.0`, „Phase 6+: PerfCounter statt approximieren"); p95/p999 nur Enum.
- **DURCHSATZ** — real ops/sec (Pfad B) `execute_engine_command.hpp:119–121`; Pipeline A hat **kein** Throughput-Feld, abgeleitet als Ratio `base_cycles/cand_cycles` `result_aggregator.cpp:37–39`.
- **SPEICHER** — real aus Allocator-Observer (autoritativ `measurement_snapshot.hpp:99–100` „ECHT aus Observer"); Felder `module_abi_v1.hpp:39–42`; im Binär-Pfad **geschätzt** `measurement_writer.hpp:113–116` (`bytes_allocated=n_ops*64`, frag=0); Pfad B `memory_footprint_bytes` `execution_result.hpp:31`/`execute_engine_command.hpp:128`.

→ Alle drei Ecken existieren und sind zumindest teilweise gemessen.

**Die FEHLENDE Komponente (bestätigt): node-/data-/index-Ebene, cache-bewusst (Hardware):**
1. **Cache-aware HW-Zähler werden default NICHT erhoben.** `make_pmc_source()` → `NullPmcSource` außer `COMDARE_ENABLE_PMC` + passendes OS (`pmc_source_factory.hpp:29–37`); `NullPmcSource.available()=false`, alle-Null (`pmc_source.hpp:41–47`). Reale Quellen hinter default-OFF-Makro (`linux_perf_pmc_source.hpp:33,361`; `windows_pcm_pmc_source.hpp`). Eigener Binär-Pfad ruft die Factory nie — **hardcodet die 6 HW-Spalten auf 0** (`measurement_writer.hpp:107–111`). Selbst die Linux-Quelle lässt L2 + `coherence_invalidations` auf 0 (`linux_perf_pmc_source.hpp:208,295`).
2. **`BRANCH_MISS` + `IPC_CPI` haben gar keinen Erhebungspfad** — nur Enum (`measurement_category.hpp:16–17`), in **keinem** Record/POD (nur tote Felder `measure.hpp:17`, `concepts/platform_snapshot.hpp:18`). Keine CSV-Spalte, kein Produzent.
3. **Das node-/data-/index-CLU-Gerüst ist unverdrahtetes compile-time-Scaffold.** Entwurf da: `Measure<MeasurementCategory, AlgoDetail>` mit `at_node_visit(used_bytes, ctx)` (cache-line-Utilization je Knotentyp) `<CE>/…/measurement/measure.hpp:23–55`, keyed per-node `AlgoDetail` (ART_NODE4/16/48/256, HOT, Masstree, CSS/CSB, PRT-ART, `measurement_category.hpp:28–52`). Aber **nicht integriert**: Primär-Template-Hooks leer (`measure.hpp:25–28`), genau **eine** reale Spezialisierung `Measure<CLU, ART_NODE256>` (`:32–41`), `LATENCY_MEAN`-Spec gibt 0 „nur als Pflichtsignatur" (`:46–48`), `extract()` gibt 1.0/0.0-Präsenzflag statt Ratio (`:40`). Ganz-Codebase-Suche: `Measure<`/`at_node_visit`/`::CLU`/`cache_lines_used` nur in `measure.hpp` + Unit-Test `<CE>/tests/unit/test_measurement_buffer.cpp` (+ 1 Doc) — in keiner Traversierung/messung_driver/ExperimentDriver/CEB. Test bestätigt: default-Hook lässt `cache_lines_used==0` (`test_measurement_buffer.cpp:124–125`). `H1_clu_improvement` hartkodiert `1.0` (`execute_engine_command.hpp:133`).
4. **Nächstliegende existierende node/data/index-Komponente = funktionaler Observer, NICHT HW/cache-aware:** `observable_tier.hpp:127–144` (`ComdareTierObserverSnapshot.axis_stats[19][8]` über 19 Achsen inkl. node_type T4, memory_layout T5 mit *logischem* `cache_lines`, allocator T6, cache_traversal T1, index_org T13; `:66–101`). Erfasst funktionale Zählungen (lookups/inserts/bytes/logische cache-lines aus Layout-Scan); nur Allocator-Bytes erreichen den kanonischen Record. **Keine** Hardware-Cache-Verhaltens-Messung.

**Fazit für das Dreieck:** Latenz/Durchsatz/Speicher = vorhanden (real in Pfad B, approximiert/geschätzt im Binär-Pfad). Die vom Prof. geforderte **node-/data-/index-, cache-bewusste (Hardware-)Mess-Komponente fehlt** — sie existiert nur als (a) Enum/POD-Platzhalter, (b) ehrliche `NullPmcSource` (reale PMC default-OFF, im eigenen Pfad nie aufgerufen, Spalten=0), (c) compile-time `Measure<>/at_node_visit`-CLU-Gerüst (nur im Unit-Test exerziert). → In `fig:measurement-triangle` als ausstehend kennzeichnen.

---

## 5. SiL-Zitatkandidaten (Autor/Jahr/Venue) für `fig:heuristic-loop`

Der Zyklus measure → load-profile → beste Achsen-Konfig → workload-filter → re-measure ist ein **empirischer/messgetriebener Autotuning-Feedback-Loop**. Stärkste Analoga zuerst.

**Tier 1 — direkte Analoga (empirisch messen-im-Kreis → beste Konfiguration wählen):**
- **FFTW** — Matteo Frigo, Steven G. Johnson, „FFTW: An Adaptive Software Architecture for the FFT", **ICASSP 1998 (IEEE)**. Kanonischer „Planner", der Kandidaten-Pläne zur Laufzeit empirisch timet und den schnellsten zurückgibt. Begleit: Frigo & Johnson, „The Design and Implementation of FFTW3", **Proc. IEEE 93(2), 2005**.
- **ATLAS / AEOS** — R. Clint Whaley, Antoine Petitet, Jack J. Dongarra, „Automated Empirical Optimization of Software and the ATLAS Project", **Parallel Computing 27(1–2), 2001 (Elsevier)**. Definiert AEOS: Codegenerator + erschöpfende empirische Timing-Suche wählt Blocking/Unrolling.
- **OpenTuner** — Jason Ansel, Shoaib Kamil, Kalyan Veeramachaneni, Jonathan Ragan-Kelley, Jeffrey Bosboom, Una-May O'Reilly, Saman Amarasinghe, „OpenTuner: An Extensible Framework for Program Autotuning", **PACT 2014 (ACM/IEEE), S. 303–316**. Referenz-Autotuning-Framework: mehrdimensionaler Suchraum („Achsen"), Ensemble-Suche, gemessene Ergebnisse als Feedback. **Beste Einzel-Zitation für „etablierte Autotuning-Technologie".**
- **Active Harmony** — Cristian Țăpuş, I-Hsin Chung, Jeffrey K. Hollingsworth, „Active Harmony: Towards Automated Performance Tuning", **SC 2002 (Supercomputing, IEEE/ACM)**. Online-Laufzeit-Auto-Tuner, Konfig-Raum-Suche per Live-Messung.

**Tier 2 — Workload-/profilgetriebene Konfig-Wahl (das „load-profile" + „workload filter"):**
- **OtterTune** — Dana Van Aken, Andrew Pavlo, Geoffrey J. Gordon, Bohan Zhang, „Automatic Database Management System Tuning Through Large-Scale Machine Learning", **SIGMOD 2017 (ACM)**. ML mappt gemessenes Workload-/Metrik-Profil auf empfohlene Knob-Konfigs, dann re-measure — direkte DB-Instanz von measure→profile→best-config→re-measure.
- **AutoAdmin / Database Tuning Advisor** — Sanjay Agrawal, Surajit Chaudhuri, Lubor Kollar, Arun Marathe, Vivek Narasayya, Manoj Syamala, „Database Tuning Advisor for Microsoft SQL Server 2005", **SIGMOD 2005 (ACM)**. Workload-getriebene Physical-Design-Wahl mit explizitem **workload compression** — nächstes publiziertes Analogon zur „workload filter"-Stufe. Vorläufer: Agrawal, Chaudhuri, Narasayya, „Automated Selection of Materialized Views and Indexes in SQL Databases", **VLDB 2000**. Retrospektive: Chaudhuri & Narasayya, „Self-Tuning Database Systems: A Decade of Progress", **VLDB 2007**.

**Tier 3 — Compiler-Autotuner (feedback-directed / iterative compilation):**
- **MILEPOST GCC** — Grigori Fursin, Yuriy Kashnikov, Abdul Wahid Memon et al., „Milepost GCC: Machine Learning Enabled Self-tuning Compiler", **Int. J. Parallel Programming 39(3), 2011 (Springer)**.
- **PetaBricks** — Jason Ansel, Cy Chan, Yee Lok Wong, Marek Olszewski, Qin Zhao, Alan Edelman, Saman Amarasinghe, „PetaBricks: A Language and Compiler for Algorithmic Choice", **PLDI 2009 (ACM)**. Relevant, falls „Achsen" Algorithmus-/Strategie-Wahl umfassen.

**Tier 4 — X-in-the-loop / SiL-Terminologie (direkter Namens-Match „Software-in-the-Loop"):**
- **Tibba et al.** — Ghizlane Tibba, Christoph Malz, Christoph Stoermer, Natarajan Nagarajan, Licong Zhang, Samarjit Chakraborty, „Testing Automotive Embedded Systems under X-in-the-Loop Setups", **ICCAD 2016 (ACM/IEEE)**. Etabliert die MiL/SiL/HiL-Taxonomie + measure-and-iterate-Validierungsschleife. **Nur für die SiL/X-in-the-loop-Namensherkunft zitieren** — klassisches SiL/HiL ist iterative *Verifikation/Validierung*, nicht Konfig-*Optimierung*.

**Framing-Empfehlung:** Eine Hauptzitation für den Loop = **OpenTuner (Ansel et al., PACT 2014)** (Rahmen) + **FFTW (Frigo & Johnson, 1998)** + **ATLAS/AEOS (Whaley et al., 2001)** (messen-im-Kreis-Linie). **OtterTune (Van Aken et al., SIGMOD 2017)** + **AutoAdmin DTA (Agrawal et al., SIGMOD 2005)** für Workload-Profil→Konfig + „workload filter". **Tibba et al., ICCAD 2016** nur für SiL-Naming. (BibTeX-Schlüssel müssen in `…/literatur/` ergänzt werden — vor dem Bauen `.blg` auf undefined refs prüfen.)

---

## 6. Architektur-Ist-Stand + offene Implementierungsprojekte + Text↔Code-Divergenzen

### 6.1 Repo-Topologie & autoritative Docs
Drei Git-Repos unter einem „super" (Diplomarbeit): **comdare-cache-engine** (Mess-Werkzeug/Bibliothek, GitLab 286, HEAD `be8aadc` `main` clean, Jun 29 `feat(#188-4a-C5)`), **comdare-prt-art** (Prüfling, 287, CI-Arbeit REV14 `f98445e`), **thesis/diplomarbeit** (Manuskript, 289, HEAD `c86ea31` „Figuren-Korrekturen (Habich-Feedback)"), Super (288).
Source-of-truth: **Manuskript überschreibt bei Widerspruch Code/Doc**; Architektur-IST = `<CE>/docs/architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md` + `36_eine_architektur_lebewesen_ist_searchalgorithm.md` + Live-Dossier `…/docs/sessions/20260628-KONTEXT-DOSSIER-…A2welle.md`.
⚠️ **Stale Übersichts-Docs ignorieren:** `docs/INDEX.md` (2026-05-15), `<CE>/docs/INDEX.md` (2026-05-08), `PROJECT_LAYER_MAP.md`, `FINDINGS_REV7_6_*`, `STRUCTURAL_CORRECTION_*` (REV-7.6-Modell, überholt).

### 6.2 „EINE Architektur"-Modell (für §1.4/§1.6)
- Einzige Hierarchie, keine Parallelbäume: `IExecutionEngine` → `IAnatomyBase` → `SearchAlgorithmAnatomy<Composition>` → `SearchAlgorithmAbiAdapter` → 19 Achsen ≡ Organe; Geschwister `IVirusExecutionEngine` (achsenlose Graphen). (Doc 36 §0/§2)
- Drei orthogonale Ebenen (Doc 34 §1): Gattung (3, je STL-Hülle: SearchAlgorithm⟹`std::map`, Container⟹`std::vector`); Tier-Unterklasse (`AnatomyGenus`: SearchAlgorithm 19 / Set 15 / Sequence 11 / Adapter 13 / View 7); Achsen=Organe (T0–T18, keine optional — „kein-Buffer" = `NoBuffer`-Algorithmus, nie weggelassene Achse).
- B+-Experiment-Baum = Kern des Achsen-Tauschs (Achsen=Ebenen, Wurzel→Blatt-Pfad = `binary_id`; Voll-Produkt `137.594.142.720.000` Binaries, **nie** voll materialisiert; 4 Brücken BR-1..4 DONE). (Doc 34 §3)
- Messung = hybrid, zwei Pfade über dieselbe DLL (Pfad A in-DLL isolierte Achsen; Pfad B ganzes Tier via ABI-Observer), 3 Dimensionen, 2-Phasen-op-Loop, Konformitäts-Gate vs `std::map`-Orakel. (Doc 34 §5)
- Observer I1 DONE: ein POD `ComdareTierObserverSnapshot` (`axis_stats[19][8]` + `seg_ns[19]`, sizeof≈1416). (Doc 34 §6)
- Build-Modell: `1 DLL = 1 TU = eine 19-Achsen-Composition`; Inkrementalität nur Resume.

### 6.3 Implementiert vs Stub vs In-Arbeit
**Verifiziert-erledigt (Doc 34 §10 §e):** V5-Messung I1–I10; 17/17 physische Achsen; `IObservableTier`+POD; Prüf-Dock; Prüfling-3-Stufen; BR-1..4; CoW-Memento Rev.2 + Mess-Resume; Konformitäts-Gate (#223, beide Mess-Pfade + CI-Job `contract:conformance`). **Nur SearchAlgorithm-Genus voll gebaut+verifiziert** (19 Slots). Profil-Betrieb funktioniert (ein `comdare_thesis_profile` XML + `build_and_measure_150_tiere.ps1`, `--validate` Pre-Flight). **E4-Evaluation FERTIG + byte-reproduzierbar:** `csv-to-latex.exe` + `diagram-generator.exe` (`<SUPER>/Code/04_*`, `05_*`) → `generate_wide_appendix.ps1` → 11 Anhang-Tabellen → `build.ps1 -Lang {de,en}` → bilingualer PDF. **Manuskript:** 8 Kapitel DE+EN + Anhänge A–F.

**Stub/extern-gated:** Set/Sequence/Adapter/View nur `GenusBindingTraits` (`test_genus_binding` 5/5), nicht produktiv gebaut; **Graph offen**. SOTA (11) + Allocator (10) Adapter = Skelette (`adapters/P*`; `is_original` Klasse A real linkend vs B–E re-impl `is_original=false`). 14 LEGACY_REIMPL Header-Skelette. Vendor-Allokatoren (jemalloc/tcmalloc/hoard/scalloc) nicht lokal baubar (extern-gated); PMC HW-Zähler gated (kein prod2). **Die 4 algorithmus-internen RC-POD-Felder** (prefetch_distance/pool_budget/batch_size/inline_threshold) sind **write-only in null-object `applied_rc_`** — keine Achse konsumiert sie zur Laufzeit (`abi_adapter.hpp:1729`, 0 Reader) → #221.

**In Arbeit (Ende Juni 2026), zwei Workstreams:**
- **(a) Mess-Echtheit / #188 (E2-Wurzel):** `SearchAlgorithmAbiAdapter` hält zwei Stores — `search_organ_` (echtes Baumorgan) + `container_` (`SortedBinary`-Spiegel). Für die **SOTA-Bäume (genau das Forschungsobjekt) messen Achsen T1–T18 den `container_`-SPIEGEL = Parallel-Apparat**, nicht die echten Organe (verletzt „Meta-Lehre #3"). Nur die triviale Array-Familie ist vereinheitlicht (Weg-A). Commit `be8aadc` (Jun 29) aktivierte #188-4a-C5: k-ary jetzt store-traversable (`axis_03a_store_traversable=true`) → `container_` läuft k-ary über echten `LayoutAwareChunkedStore` statt Spiegel (committed `[skip ci]`; greift erst beim #215 320-DLL-Neubau). Sequenz: 4a (k-ary/Eytzinger) → 4b (Pool-Familie Tree/Trie/Hash, der harte Teil) → 4c (`search_organ_`-Entfernung; #211/#216 fallen weg) → #215 (320-DLL-Neubau = Wirksamkeits-Schleuse) → #156/#162 (A/B/C-Mess-Lauf). k-ary arity: Runtime-`IIterableAspectTier` gebaut, dann auf compile-time StaticAxisNode zurückgerollt (User 2026-06-29).
- **(b) CI/CD + Infra (#186):** 4-Modul-CI (286/287/288/289 + ci-templates 269), Hard-Gates grün auf prod1/AMD; lint:format/lint:static gehärtet (#179, LLVM-SHA-Pin gesetzt, 22.1.5↔22.1.8-Drift offen); #210 Runner „silent-poll-stall" (Watchdog-Mitigation); prod2/Intel blockiert (i9-14900KS HW-instabil, SSH tot, IPMI).

### 6.4 Offene Implementierungsprojekte (nach E-Ebene; `…/20260628-SESSION-ENDE-11-…188PLAN.md §15`)
- **E4 (XML-Def + Evaluation):** **#156** (voller M3-Mess-Lauf / schnellste-Tier-Binary-Writeback), **#162** (PRT-ART + SOTA A/B/C in den Lauf), #184 (non-YCSB-Loader), #152/#187 (cache-misses/PMC-Adaption, HW-gated), #25 (Thesis-Text — User). **Tooling fertig, die Daten (A/B/C-Matrix) sind die Lücke.**
- **E3 (B+-Baum/Genus):** #223 Konformitäts-Gate **DONE**; #188-E3-Facet done.
- **E2 (Tier-Binaries/Achsen, der reale Arbeitsblock):** **#188** (Wurzel, in Arbeit) + #211/#216 (fallen weg bei 4c), **#215** (320-DLL-Neubau-Schleuse), #19 (Allokatoren real linken), #163 (SIMD/ISA + Allocator-Achsen), #217 (Array-Genus — User-Entscheidung nötig), #213/#214 (done), #185 (TPIE/EM-BFS io-dispatch), #125 (lazy DLL content-hash), #224 (GoF-Label-Hygiene).
- **E1 (RC/DynamicVariableNode):** **#221** — per-Achsen-Runtime-RC-Setter in `tier_apply_resource_control` verdrahten (un-stubt die 4 RC-Felder; **Hard-Gate vor #156-Final-Lauf**, sonst Phantom-Zeilen). #225 (Second-Execution — User-Diskussion).
- **E0 (querschnittlich, zuletzt):** **#179** (Wartbarkeits-Sweep über ALLE C++-Dateien, GROSS), #186 (CI-Epic), #189 (Runner-Matrix), **#193** (manuelle Benutzbarkeit — User TOP-PRIO), #210 (Runner-EOF), #199–#208 (restliche Pipeline-Stufen sanitize/integration/chaos/manifest/deploy/canary, nur ~1/3 gebaut), #230 (CI-Harness-Compile-Gate für Windows-`cl`-Lücke).

### 6.5 Text↔Code-Divergenzen (mit Zitaten)
1. **GELÖST: „Zwei-Bäume"-Fehlbeschreibung.** Thesis Kap.1/4 kanonisierte fälschlich die zwei Template-Bäume als intendiert; korrigiert (Thesis `73554e1`), bestätigt `de/04_concept_architecture.tex:172,198,214` („die *eine* Architektur … kein paralleles Konstrukt"); Code 2026-06-25 vereinheitlicht (toter `search_engine`/`execution_engine`-Baum entfernt; prt-art-Orphan-Adapter entfernt, `53a87df`). (Doc 36 §4/§6)
2. **AKTIV (die große): per-Achsen-Messung der SOTA-Bäume.** Thesis (Aufgabenstellung + Kap.6) behauptet systematische, faire per-Stelle-Achsenmessung der SOTA-Bäume; im Code messen diese Achsen den `container_`-**Spiegel**, nicht die echten Organe. **Ehrlich in-code geflaggt** via `tier_search_routes_through_store()==false`, Anhang trägt es als Limitierung — aber die Achsen-Tausch-Evidenz für SOTA-Bäume ist bis #188(4b/4c)+#215 teils Apparat-Artefakt. (KONTEXT-DOSSIER §5, code-verifiziert `fill_observer_v3:929`, `:781–838`; Doc 34 §9)
3. **Daten noch nicht produziert ⇒ partieller Datensatz.** Kap.6 definiert 3 Reihen A/B/C × 3 Granularitäten; ausgelieferte `cowfix-v1`-Anhangdaten tragen `series`/`working_set`/`sweep`/`seg_coverage` **nicht** — A/B/C **parametrisch übersprungen (ehrlich, nicht erfunden)** bis #156/#162/#215. Limitierungs-Tabelle `…/anhang/de/A_measurements.tex:75–80` (`sec:measurements:limitations`, #226). (SESSION-ENDE-11 §14 B4-2)
4. **Phantom-Runtime-Dynamic-Zeilen.** Da #221 unverdrahtet (`applied_rc_` write-only), wäre jede Runtime-Dynamic-Dimension in #156 „label-level/phantom" — Hard-Gate vor Final-Lauf. (SESSION-ENDE-11 §18)
5. **#178 Stage→Series-Mapping:** Code an Thesis (ch4 §4.8 `tab:stage-series`) repariert: jetzt St1∪St2→A, St3→B, C build-spannend. (SESSION-ENDE-11 §16)
6. **Regel A8:** Thesis neuer als Code → **Code reparieren** (Thesis = Soll); sonst an Text-Agent. (`20260626-KONSOLIDIERT-…SELF-HANDOFFS.md §5`)
7. **Ganz-Dokument SUPERSEDED (ignorieren):** prt-art `FINDINGS_REV7_6_*` + `STRUCTURAL_CORRECTION_*` (Banner `⚠️ SUPERSEDED (2026-05-31)`), beschreiben REV-7.6-Submodul/Hybrid-Engine; IST = reines Plugin (`comdare_pruefling.cmake` + `COMDARE_CE_PRUEFLINGE` + `IPrueflingFactory`). cache-engine „Thesis-Basis 00–14"-Vokabular (F1–F29/S1–S30/alt-11-Achsen/3-Säulen) durch Achsen/Organ-Modell ersetzt. (Doc 34 §11)

### 6.6 Zuerst lesen (Folge-Sessions)
- IST-Architektur: `<CE>/docs/architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md`, `36_eine_architektur_lebewesen_ist_searchalgorithm.md`
- Live-Kontext: `<CE>/docs/sessions/20260628-KONTEXT-DOSSIER-…A2welle.md` (§1,§5,§13–§19)
- Handoffs: `<CE>/docs/sessions/…SESSION-ENDE-13…`, `…/Diplomarbeit - Datenbanken/docs/sessions/20260628-SESSION-ENDE-11-…188PLAN.md`, `20260626-KONSOLIDIERT-OFFENE-TASKS-SELF-HANDOFFS.md`
- How-to-extend: `<CE>/docs/ERWEITERUNGS-LEITFADEN.md`
- Manuskript: `…/thesis/diplomarbeit/kapitel/{de,en}/`, `anhang/{de,en}/`

---

### Anhang: Schnell-Index der Abbildungs-Anker (kapitel/de/)
| Label | Datei:Zeile (tikz / caption) | Korrektur §|
|---|---|---|
| fig:design-space | `02_suchbaeume_grundlagen.tex:35–43 / :44` | §1.1 (Legende + neues Dreieck) |
| fig:search-map | `02:16–31 / :32` | §1.2 (Leere-Prüfung, sekundär) |
| fig:cache-line | `02:142–146 / :147` | §1.2 (Leere-Prüfung, primär) |
| fig:axis-organ | `02:309–319 / :320` | §1.3 (Inter-Achsen-Graph) |
| fig:usage | `02:326–343 / :344` | §1.3 (Inter-Achsen-Graph) |
| fig:three-levels | `02:356–366 / :367` | §1.4 (bleibt, verdichtet) |
| fig:genera | `02:377–395 / :396` | §1.4 (Tiefe L4/L5) |
| fig:patterns | `02:412–422 / :423` | §1.5 (Concept-Kette) |
| fig:one-architecture | `02:458–474 / :475`; `04_concept_architecture.tex:202` | §1.6 |
| fig:uml-interfaces | `02:538–556 / :557` | §1.6 |
| fig:m-model | `03_messsystem_prtart.tex:405–419`; `04_concept_architecture.tex:145–159` | §1.7 (Build/Mess-Split) |
| fig:heuristic-loop | `03_messsystem_prtart.tex:…550` | §1.8 + §5 (SiL-Zitate) |
| fig:pipeline | `04_implementierung.tex:80–108 / :109` | §1.7 (Pfad B ergänzen) |
