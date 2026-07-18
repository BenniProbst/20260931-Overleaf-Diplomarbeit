# Session 2026-06-27 — Codex-Review Kap. 1–4 + Metapher-Gesamtglossar

> **Kontext:** Nach Abschluss der ch4-Erdung wurde (a) ein **Codex-Cross-Model-Review** über Kap. 1–4
> gefahren (`gpt-5.5`, reasoning `xhigh`, read-only) und jeder Befund gegen die `.tex`-Dateien geerdet,
> (b) der Metapher-Kanon mit dem User gelockt und (c) beim Erden der Architektur-Figur das **vollständige
> 3-Ebenen-Metaphern-System** im Code (`libs/cache_engine/anatomy/anatomy_base.hpp`) wiedergefunden.
> Dieses Dokument hält das **elaborierte Gesamt-Metaphern-Glossar** fest (User-Auftrag 2026-06-27:
> „Alle Metaphern und deren Bedeutungen elaborat als Tabelle in die letzte Session ergänzen").

---

## 1. Gelockte Kanon-Entscheidungen (User 2026-06-27)

| Frage | Entscheidung | Konsequenz |
|-------|--------------|-----------|
| **Lebewesen-Scope** | **ENG: Lebewesen ≡ SearchAlgorithm** | „Lebewesen-Unterklassen" (ch1:106, ch2:269) → **„Gattungs-/Tier-Unterklassen"**; Container/Graph-Subklassen sind **keine** „Lebewesen" im Thesis-Fokus-Sinn. ch3:588 leicht präzisieren. |
| **Graph & Virus** | **Graph = 3. Gattung, „achsenlos" streichen** | Gleichung „achsenlose Viren = reine Graphen-Algorithmen" (ch1:114, ch4:180/189 + Figur) wird korrigiert. `IVirusExecutionEngine` bleibt nur für **echte** achsenlose Engines. **Code bestätigt:** `AnatomyGattung::Graph` ist bereits Ebene-1-Gattung (`anatomy_base.hpp:43`), **kein** Virus. |
| **Allocator-Sub-Achsen** | **Code-Audit nötig** | „sieben Sub-Familien" (ch4:95) vs „6.1–6.5" (ch3:172) ist **beides** zu prüfen: jede Achse hat **unterschiedlich viele** Sub-Achsen; es gibt **wesentlich mehr** Allokatoren → Sub-Achsen-Audit pro Hauptachse gegen den Code (Q2, offen). |

**Offener Reconciliation-Punkt (zu bestätigen):** Der Code (`anatomy_base.hpp:8,100–103`) führt **alle** Gattungen
als „Animalia"/Lebewesen (Kingdom). Die ENG-Entscheidung betrifft den **Thesis-Fokus-Begriff** „das Lebewesen"
(= der SearchAlgorithm, das „Säugetier"). Auflösung unten in §2: „Lebewesen" = **Kingdom** (breit, biologisch)
UND **fokales Lebewesen** = SearchAlgorithm (Thesis). Die Ebene-2-Klassen heißen **Tier-Unterklassen**, nicht
„Lebewesen-Unterklassen".

---

## 2. Das 3-Ebenen-Taxonomie-Modell (geerdet gegen `anatomy_base.hpp` + Doc 30 §8.1 / Doku 14 §27)

| Ebene | Begriff (Code) | Biologische Metapher | Bedeutung | Instanzen |
|-------|----------------|----------------------|-----------|-----------|
| **Reich** | `IAnatomyBase` / `IExecutionEngine`-Wurzel; `kingdom_name()="Animalia"` | **Reich „Animalia" / „Lebewesen"** | abstrakte Wurzel über allem Anatomie-Tragenden (alles Ausmessbare) | — |
| **Ebene 1 — Gattung** | `AnatomyGattung` (NUR 3) | **Klasse/Stamm** (Säugetiere vs. Reptilien …) | das **Außen-Interface / Prüf-Dock** je Gattung = „(Such-)Algorithmus-Interface-Kategorie" | **SearchAlgorithm · Container · Graph** |
| **Ebene 2 — Tier-Unterklasse** | `AnatomyGenus` (hist. „Genus"; Refactor→`AnatomyTierSubclass` via #90) | **das konkrete Tier** | Unterklasse mit **festem Achsen-Satz** unter einem Gattungs-Interface | s. Tier-Mapping unten |
| **Ebene 3 — Organ** | `axis_<nn>_<name>` / `composition_t` | **Organ** | die **Achse** (orthogonale Teilentscheidung); permutiert; keine optional | 19 Achsen (T0–T18) |

### Tier-Metapher-Mapping (Ebene 2, `anatomy_base.hpp:60–66`)

| Tier-Metapher | `AnatomyGenus` (Tier-Unterklasse) | Gattung (Ebene 1) | `std::`-Beispiele |
|---------------|-----------------------------------|-------------------|-------------------|
| **Säugetier** | `SearchAlgorithm` | **SearchAlgorithm** | `map`, `multimap`, `unordered_map` |
| **Vogel** | `Set` | Container | `set`, `multiset`, `unordered_set` |
| **Reptil** | `Sequence` | Container | `vector`, `list`, `deque`, `array` |
| **Wirbelloses** | `Adapter` | Container | `stack`, `queue`, `priority_queue` |
| **Pflanze** | `View` | Container | `span`, `mdspan`, `string_view` |
| (TBD) | — | **Graph** | Graph-Tier-Unterklassen noch offen |

> **Merke:** SearchAlgorithm ist eine **Gattung MIT genau einer Tier-Unterklasse** (std::map-artig, volle 19-Achsen-Anatomie).
> Set/Sequence/Adapter/View sind **vier Tier-Unterklassen UNTER der Container-Gattung** — **nicht** je eine eigene Gattung.

---

## 3. Anatomie- und Sicht-Begriffe (geerdet gegen ch1–4 + Code)

| Metapher | Technisch / Code | Definition (Quelle) | Synonyme / Cluster |
|----------|------------------|---------------------|--------------------|
| **Lebewesen** (fokal) | `SearchAlgorithm` / `IAnatomyBase` | konkreter (Such-)Algorithmus als Organ-Komposition; im Thesis-Fokus ≡ SearchAlgorithm (ch1:109, ch4:204) | ≡ SearchAlgorithm, ≡ **Feature-Komposition** (ch3:588), ≡ Suchalgorithmus-Instanz |
| **Lebewesen** (Reich) | Kingdom „Animalia" | **alle** Anatomie-tragenden Gattungen sind biologisch Lebewesen (`anatomy_base.hpp:8,100`) | ⊃ SearchAlgorithm, Container, Graph |
| **Lebewesen-Typ** | Permutation / Feature-Set | **Feature-Set statische Definition** (ch3:588) = Compile-Time-Achsenbelegung | ≡ Permutation, ≡ Konfiguration |
| **Anatomie** | `SearchAlgorithmAnatomy<C>` | **Verdrahtung *zwischen* den Organen = Feature-Interaktion** (ch3:590–592): wie ein Achsen-Algorithmus die Interfaces *anderer* Achsen nutzt (z. B. Allokations-Achse stellt gemeinsames Interface bereit) | ≡ **Körper**, ≡ Feature-Interaktion; **≠ einzelnes Organ, ≠ zweites Modell** |
| **Körper** | `SearchAlgorithmAnatomy<C>` | die feste **Komposition** der 19 Achsen-Organe (ch1:111, ch4:208) | ≈ Anatomie (Komposition-Aspekt) |
| **Organ** | `axis_<nn>` / `composition_t` | Metapher für eine **Achse** (ch4:36) | ≡ Achse ≡ **Feature** (ch3:587) |
| **Achse** | Entwurfsbestandteil | orthogonale Teilentscheidung eines Gesamt-Algorithmus (ch2:271) | ≡ Organ ≡ Feature ≡ Baustein/Entwurfsbestandteil |
| **Sub-Achse** | Varianten-Familie (`std::variant`) | Verfeinerung einer Achse (ch3:147–150); **je Achse unterschiedlich viele** | SA1–SA3, 6.1–6.5, NT1–NT3, … |
| **Gattung** | `AnatomyGattung` | **(Such-)Algorithmus-Interface-Kategorie** (ch3:589); das nach außen sichtbare Interface (ch2:267) | ≡ Gattungs-Interface ≡ **Prüf-Dock** (nach außen) |
| **Tier-Unterklasse** | `AnatomyGenus` | Ebene-2-Unterklasse mit festem Achsen-Satz | ≡ „Genus" (hist.); ≡ Gattungs-Unterklasse |
| **SearchEngine** | `SearchAlgorithmAbiAdapter<A>` | die **ABI-/Laufzeit-Sicht** desselben Lebewesens über die Modulgrenze (ch4:201,219) | ≡ ABI-Sicht; ≠ paralleles Konstrukt |
| **ExecutionEngine** | `IExecutionEngine` | gemeinsame messbare **Wurzel** über allem Ausmessbaren (ch4:168); trägt Lebewesen + Viren | Wurzel; Schichtung CacheEngine→ExecutionEngine→SearchEngine |
| **CacheEngine** | `cache-engine/libs` | **Achsen-Bausteine-Bibliothek** (Standard-Bausteine je Achse) (ch4:132,214) | ≡ Werkzeug-Bibliothek |
| **Virus** | `IVirusExecutionEngine` | **achsenloses** Geschwister des Lebewesens unter der Wurzel (Doku 14 §33–§40) | **≠ Graph** (Korrektur 2026-06-27); echte achsenlose Engines |
| **Prüfling** | PRT-ART | abstraktes Lebewesen, stellt einige Achsen selbst, sonst CE-Standardbausteine (ch4:264) | ≡ PRT-ART |
| **Prüf-Dock** | `std::map`-artiges Interface | das Gattungs-Interface, über das das Lebewesen angesprochen + **gemessen** wird (ch4:206) | ≡ Gattungs-Interface (Mess-/Observer-Sicht) |

### Software-Engineering-Synonyme (Feature-orientierte SPL, ch3:587–589)

| Biologische Metapher | SPL-/Pattern-Begriff |
|----------------------|----------------------|
| Achse / Organ | **Feature** |
| Lebewesen | **Feature-Komposition** |
| Lebewesen-Typ | **Feature-Set statische Definition** |
| Gattung | **(Such-)Algorithmus-Interface-Kategorie** |
| Anatomie | **Feature-Interaktion** (Verdrahtung zwischen den Organen) |

> Provenienz (ch3:596–601): Achsen-Konzept übernommen aus Vorarbeit des Autors (Marke Comdare / BEP Venture UG,
> ehem. UltiHash-Kontext); Beitrag = Übertragung auf cache-bewusste Suchstrukturen + design-pattern-getriebene,
> mess-orientierte Realisierung. Bildhaftigkeit motiviert durch Hintergrund in Biomedizinischer Technik.

---

## 4. Codex-Review-Befunde (geerdet) — Status

**Eindeutige Kap.-4-Fixes (umzusetzen):**
- ch4 Z.330 Fußnote „Reihe C ist **stufen**-übergreifend" → **build-/versionsübergreifend** (Tabellenzeile Z.324 sagt bereits „build-übergreifend").
- ch4 Z.269 „Achsen **Page** … **Measurement**" → Page = Build-Achse; Measurement = **Telemetry** (T10).

**Kanon-Edits (gelockt, festgezogene Kapitel — sorgfältig):**
- ch1:106 / ch2:269 „Lebewesen-Unterklassen" → „**Gattungs-Unterklassen**".
- ch1:114 / ch4:180,189 + Figur: Graph aus „achsenlose Viren" lösen → **3. Gattung**.
- ch3:588 leicht präzisieren (Lebewesen = Feature-Komposition der SearchAlgorithm-Gattung).
- ch4-Figur `fig:one-architecture`: Container + Graph als Gattungen sichtbar; „Virus (achsenlos, Graph)" korrigieren.

**Abgelehnt / bereits ok:** ch3 „19+3 = 22"-Lesart (Prosa + Caption explizit); ch4 „Baum-Anatomie/universell"
(Text qualifiziert sich selbst; betrifft nur Suchalgorithmen, Graph ist eigene Gattung); ch4 „registriert als
IExecutionEngine" (Figur disambiguiert); ML-Präsens (Absatz beidseitig als Ausblick geklammert).

---

## 5. Offene Aufgaben (Reihenfolge)

1. **Kanon-Edits** in ch1/ch2/ch3/ch4 + Figur-Neuzeichnung (gelockt) — *current task*.
2. **Sub-Achsen-Audit (Q2)** gegen den Code: pro Hauptachse die echte Sub-Achsen-Zahl/-Liste + Varianten erden und ch3 `tab:axes-overview` + ch4 **anreichern** (Allokatoren: „wesentlich mehr"). Ziel-Achsen-Verzeichnisse: `axis_01_index_organization, axis_01_page_type, axis_02_path_compression, axis_03a_search_algo, axis_03b_cache_traversal, axis_03m_mapping, axis_04_node_type, axis_05_memory_layout, axis_06_allocator, axis_07_prefetch, axis_08_concurrency, axis_09_isa, axis_09b_simd_extension, axis_10_serialization, axis_11_telemetry, axis_12_general_hardware, axis_14_value_handle, axis_filter, axis_growth, axis_io, axis_migration, axis_q1_queuing, axis_q2_queuing`.
3. **Anatomie in die Diplomarbeit nachziehen** (User-Auftrag 2026-06-27): das 3-Ebenen-Modell + Tier-Metapher + „Anatomie = Verdrahtung zwischen den Organen" als Kernbestandteil von Kap. 4 ausbauen.
4. **Codex-Re-Review** aller geänderten Kapitel (User-Direktive: alle Text-Änderungen via Codex gegenlesen).
5. **Build** `diplomarbeit-de` + `-en` verifizieren.

**Neuer Code-Lag-Punkt (Handover):** Falls der Code Graph noch nicht voll als Gattung mit Tier-Unterklassen
ausgebaut hat (`Graph` Tier-Unterklassen „TBD"), bleibt das ein Impl-Agent-Punkt — die Thesis führt den Soll-Zustand.
