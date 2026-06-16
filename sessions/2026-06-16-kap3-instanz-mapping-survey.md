# Kapitel-3 Instanz-Mapping-Survey (AP-S1-Fundament) — 2026-06-16

> **Zweck:** Vollständiger Instanz-Spiegel — jede Kapitel-2-Definition → ALLE Paper-Instanzen im
> 56-Paper-Korpus (P01–P33 + A01–A23) + Web. Erhoben von 4 read-only Explore-Agenten, gegen
> Cross-Paper-Konzeptmatrix (`bausteine/03`), Bausteine-Matrix (`bausteine/01`), Doc 18/34, Cluster-Docs +
> Web. **Treibt die Ausformulierung von Kapitel 3.** Agenten = Hinweise → vor Persistierung in den Text
> je Aussage selbst verifizieren (Agenten-Unzuverlässigkeits-Lektion).

## §A — Instanzen zu 2.1 (Cache-Hierarchie)
- **2.1.1 Speicher-/Cache-Ebenen + Transfer:** P15 (Survey, Hierarchie-Taxonomie), P14 (Itanium-2, Line-Größe je Ebene 64/128 B), P16/P17 (Mehr-Ebenen-Modell, Block-Transfer B), P20, P27 (L1/L2/L3-Bundle). **Lücke:** critical-word-first/Sub-Kanäle — von KEINEM Paper modelliert (reine HW).
- **2.1.2 Cache-Line-Größen + line-aware Layouts:** P11 (CSS Cache-Line-Node), P12 (CSB+ Sibling-Cluster), P13 (Knotengröße), P14 (Config-Table), P15, P18/P19 (Layout-Invariante), P01 (Node4/16/48/256), P02 (9 Layouts), P05 (Rewiring), P32 (HBM). **Stark belegt** (Kern-Cluster C).
- **2.1.3 TLB/dTLB + Huge-Pages:** P14 (nur Fußnote), P32 (2 MB empirisch), A04/A05/A06/A07 (Huge-Page-Policy). **Große Lücke:** dTLB-Verhalten (Miss-Kosten/Walk) NIRGENDS modelliert.
- **2.1.4 Kohärenz + Write-Back:** P15 (Kohärenz-Latenz), P28 (Cache-Coherence-Ping-Pong-Anti-Pattern → LeafOnly-Counter), P29 (RCU), P30 (Hazard), P03/P08 (kohärenz-meidende Traversierung), Doc 34 (MESI/MOESI-Kostenfunktion). **Lücke:** Write-Back-vs-Write-Through empirisch + MESI-Details nur HW.
- **2.1.5 cache-aware vs cache-oblivious:** P17 (cache-oblivious B-Tree, vEB, Kern), P16 (Erweiterung), P18/P19 (cache-sensitive), P15 (Vergleich, „≤44 % schlechter"), P11/P01–P07 (alle cache-aware Praxis). **Befund:** cache-oblivious nur theoretisch (keine Produktiv-Impl im Korpus).

## §B — Instanzen zu 2.2 (19 Achsen + 6 Klassen) — KERN + Vollständigkeits-Audit
Per-Achse die beitragenden Paper (✓ = explizites Organ); **Lücken-Flags** sind für Kap. 3 + Bias-Bruch wichtig:

| Achse | Beitragende Paper | Abdeckung |
|---|---|---|
| 1 search_algo | P01,P02,P03,P04,P05,P06,P07,P09,P10,P20,P21,P22,P23 | Kern |
| 2 cache_traversal | P01–P03,P06,P07,P09–P22,P25,P26,P27,P32 (~24) | mittel |
| 3 mapping | P01,P02,P03,P06,P07,P09,P10,P11,P12,P14 (~13) | ⚠️ groß |
| 4 path_compression | P01,P02,P04,P05,P06,P07,P09,P10 (~10) | ⚠️ groß |
| 5 node_type/page_type | P01,P02,P03,P04,P05,P06,P07,P09–P14,P20,P21,P22 (~16) | Kern |
| 6 memory_layout | P01–P03,P05–P07,P09–P20,P32 (~17) | mittel |
| 7 allocator | A01–A23 + P20,P29,P30 (~26) | gut (A-Cluster) |
| 8 prefetch | P07,P21,P22,P23,P25,P26,P27 (7) | ⚠️ groß |
| 9 concurrency | P03,P08,P29,P30 (4) | ⚠️ kritisch |
| 10 serialization | P01,P03,P05,P07,P09,P10,P21 (7) | ⚠️ groß |
| 11 telemetry | P01,P02,P16,P20,P26,P28 (6) | ⚠️ groß |
| 12 value_handle | P01,P03,P07,P29 (4) | ⚠️ kritisch |
| 13 isa | P01,P02,P05,P07,P20,P21,P22,P27,P31,P32,P33 (~10) | ⚠️ groß |
| 14 index_organization | P01,P03,P06,P07,P09–P12 (8) | ⚠️ groß |
| 15 io_dispatch | — (alle In-Memory) | 🔴 0 Paper |
| 16 migration_policy | nur P20 implizit | 🔴 0 explizit |
| 17 filter | P10 (SuRF) | 🔴 1 Paper |
| 18 queuing_q1 | P29 (Epoch-Buffer, implizit) | 🔴 ~1 |
| 19 queuing_q2 | P22 (Fractal-Flush, implizit) | 🔴 ~1 |

**Such-Struktur-Klassen (2.2.1):** Klasse-1 Vergleichsbäume P03,P06,P07,P11–P22 (~15); Klasse-2 Digital-Tries
P01,P02,P04,P05,P07,P09,P10 (7); Klasse-3 Hashing nur P07 (Sub-Komponente); **Klasse-4 räumlich = 0 (KRITISCH
fehlt)**; Klasse-5 flach nur implizit (P11–P14 Kind-Arrays); **Klasse-6 Exoten nur P17 (vEB-Layout)**.

→ **Honest-Limits für Kap. 3:** Achsen 15/16 (io/migration), 17/18/19 (filter/queuing) + Klassen 4/6 sind
korpus-arm/leer → in Kap. 3 als „unterbelegt/Forschungslücke" ausweisen, NICHT als instanziiert behaupten;
das ist zugleich Teil der Forschungslücke (3.7) + Bias-Bruch-Begründung (alle Achsen je Lebewesen treiben).

## §C — Instanzen zu 2.3 (Interfaces) + 2.5 (Messen)
- **2.3 Interfaces:** Ordered-Map dominant (P01–P20, P21–P28, P31–P33 ≈ 29/33 SOTA); Sequence/Vector-artig P29/P30 + Allokatoren A01–A11/A20/A22; Hash nur P07 (Wormhole MetaTrieHT). Laufzeit-konfigurierbar: P05,P19,P20,P23,P25,P27,P28,P32,P33 + Allok. A04/A05/A06/A08/A10/A11/A22.
- **2.5 Messen:** PMC/perf bei praktisch ALLEN SOTA (33/33); Profiler P05,P10,P27,P28,P33 (OTF2/VAMPIR aufkommend); HDR-Histogramme/Perzentile P15,P20,P28; Simulator (gem5) nur P25; **TU-Dresden-Habich-Linie P31/P32/P33** (HW-Mess-Methodik) = explizite Instanzen für 2.5; theorie-nur (keine Messung): P09,P16,P17.

## §D — Instanzen zu 2.6 (Design-Space / SE / Pattern)
- **Im Korpus (Design-Space):** Idreos „Periodic Table" + „Data Calculator" (bereits in `literatur.bib`: idreos2018periodic/datacalculator), START (self-tuning P05), CoCo (data-aware P04), B-Trees-Are-Back (adaptive Layouts P20), Wormhole (Hybrid-Komposition P07).
- **NEU im Web (NICHT im Korpus) — Kandidaten zur Aufnahme (Autor-Entscheidung):** Kraska et al. 2018 „The Case for Learned Index Structures" (RMI); VEGA (Active-Tuning Learned Index, SIGMOD 2025); Survey Learned Indexes 2024 (arXiv 2403.06456); Idreos „Database Cracking"/„Stochastic Cracking" (adaptive indexing); „Self-Tuning DB Systems Survey" (ACM CSUR 2023); AirIndex (DSE 2023). Klassisch: Michalewicz „Genetic Algorithms + Data Structures = Evolution Programs".
- **Pattern (am Code verifiziert, Kap. 2.6):** Strategy/Visitor/Adapter/Abstract-Factory/Composite/Iterator/Observer/Decorator/Memento/CRTP/Template-Method; NICHT Singleton/Command/Flyweight/Bridge.

## §E — Lücken-Gesamtbild (für Kap. 3 Ehrlichkeit + Forschungslücke 3.7)
- **🔴 Null-Instanz:** io_dispatch, migration_policy (Achsen 15/16); räumliche Such-Klasse (Klasse 4).
- **🔴 Ein-Paper:** filter (P10), queuing_q1 (P29), queuing_q2 (P22), Exoten-Klasse (P17), Hashing-Klasse (P07).
- **⚠️ Spärlich (≤4):** concurrency (P03/P08/P29/P30), value_handle (P01/P03/P07/P29).
- Diese Lücken sind in Kap. 3 transparent als „im SOTA unterbelegt" zu führen — sie stützen die
  Forschungslücke + den Bias-Bruch (das Framework treibt ALLE Achsen je Lebewesen, auch die, die einzelne
  Paper nie betrachten).

## §F — Methodik-Vorbehalt
Agenten lieferten reichhaltig, aber unzuverlässig (Beispiel: „consteval-SHA256" war NICHT im Code; SOSD@P05
unsicher). **Vor jeder Persistierung in Kap. 3:** die konkrete Paper-Achsen-Zuordnung gegen
`bausteine/03_cross_paper_konzeptmatrix.md` + `bausteine/01_bausteine_matrix.md` + Doc 18 selbst gegenprüfen;
neue Web-Werke nur nach Autor-Freigabe aufnehmen (Provenienz).
