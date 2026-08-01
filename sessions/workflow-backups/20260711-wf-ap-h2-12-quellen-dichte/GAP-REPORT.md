Alle Gegenproben sind abgeschlossen. Ich synthetisiere jetzt den Report.

# Gap-Report: Quellen-Voll-Abgleich Urfassung → Neufassung (AP-H2-12)

**Datum:** 2026-07-11
**Zweck:** AP-H2-12 — Pflicht-Abschluss Quellen-Voll-Abgleich gegen Diff aktuell + Diff vor Habich-Runde 1; dünne Stellen mit Fakten-Dichte erweitern.
**Datenlage:** 134 OK-Keys (unauffällig), 26 Key-Befunde (Sweep A), 39 Sektions-Gaps (Sweep B). Nach Deduplikation und Grep-Verifikation über die 6 eingebundenen Kapitel (`kapitel/de/01_einleitung … 06_fazit.tex`) + `anhang/de/*.tex`: **33 konsolidierte Gap-Gruppen**, 1 Teilbefund als Falsch-Positiv gestrichen (verschoben, nicht verloren), 2 Befunde als BEDINGT markiert (nur bei passendem Code-Stand einarbeiten).

---

## Kap. 1 — §1.1 Motivation (`01_einleitung.tex`)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| NIEDRIG | Aktiver Lückenschluss-Anspruch: „Diese Arbeit schließt diese Lücke mit einem Rahmenwerk …" (01_introduction.tex ~Z.24); neu nur passives „Diese Bausteine lassen sich … auffassen" (Z.38) — Begründungskette der Motivation verliert ihr Schlussglied | idreos2018periodic, idreos2018datacalculator | Absatz-Auftakt aktiv rekonstruieren: „Diese Arbeit schließt diese Lücke mit einem Rahmenwerk, dessen Bausteine sich als austauschbare Entwurfsdimensionen eines großen Entwurfsraums auffassen lassen~\cite{idreos2018periodic, idreos2018datacalculator}." Ein Satz, Rest unverändert. |

---

## §2.1 Überblick Suchstrukturen (`02_suchbaeume_grundlagen.tex`, sec:overview)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| **HOCH** | Balance-Invarianten + B⁺-Mechanik auf Namensliste reduziert: (1) AVL-Höhendifferenz-Invariante „Geschwister-Teilbäume unterscheiden sich in der Höhe um höchstens eins" (02_fundamentals.tex ~Z.190–192); (2) Rot-Schwarz: dieselbe logarithmische Höhe über Knotenfärbung mit lockereren, günstiger zu wartenden Invarianten (~Z.192–194); (3) B⁺: alle Nutzdaten in den Blättern, innere Knoten = Wegweiser (~Z.198–200). Grep-verifiziert: „Wegweiser" 0 Treffer in allen 6 Kapiteln | adelsonvelsky1962avl, bayer1972symmetric, guibas1978redblack, bayer1972btree, comer1979btree | Im Überblicksabsatz (neu Z.43–46) je Struktur einen definierenden Relativsatz restaurieren: AVL-Höhendifferenz, RB-Färbungs-Invariante mit Wartbarkeits-Vergleich, B⁺-Blatt/Wegweiser-Trennung. Genau die „voll durchzitierten"-Fakten, die Kap. 2 laut Mandat tragen muss — drei Halbsätze genügen. |
| MITTEL | Hashing verflacht: Cuckoo = konstante Worst-Case-Lookups; Einordnung neben offener/verketteter Adressierung (~Z.229–231); SwissTable „erzielt dank SIMD-Gruppen-Probing hohe praktische Dichte" (~Z.231). Verifiziert: „Worst-Case-Lookup" 0 Treffer | pagh2004cuckoo, abseil_swisstable, knuth1998taocp3 | Hashing-Satz (neu Z.57–60) erweitern: „Cuckoo-Hashing~\cite{pagh2004cuckoo}, das im Gegensatz zu offener und verketteter Adressierung konstante Worst-Case-Lookups garantiert, und SIMD-beschleunigte Tabellen wie SwissTable, die hohe praktische Dichte erzielen, treten … als nicht-baumartige Vergleichsgröße zur Seite." |
| MITTEL | Selbst-designende Indizes enden 2018: „jüngere Arbeiten (VEGA, SIGMOD 2025; AirIndex) führen dies aktiv-tunend fort" (03_state_of_the_art.tex ~Z.574–575) fehlt; Linie endet neu bei Kraska (Z.83–94). Verifiziert: VEGA/AirIndex 0 Treffer | idreos2007cracking, halim2012stochastic, kraska2018learned | Halbsatz zu VEGA (SIGMOD 2025) und AirIndex wieder anfügen, inkl. nachgezogener bib-Einträge — sonst verletzt das durchzitierte Kap. 2 seinen Aktualitätsanspruch bei der nächstverwandten Forschungslinie. |
| NIEDRIG | Suffix-Array nur noch Namensnennung: platzsparender Volltext-Index; leichtgewichtige, speicher-budgetierte Konstruktion als „Musterbeispiel des Algorithm-Engineerings" (02_fundamentals.tex ~Z.243–245) | manzini2002suffixarray | Relativsatz in Z.65–68: „…das Suffix-Array, das dieses Layout zu einem platzsparenden Volltext-Index verallgemeinert und dessen speicher-budgetierte Konstruktion als Musterbeispiel des Algorithm-Engineerings gilt~\cite{manzini2002suffixarray}". |

---

## §2.2 Hardware-Grundlagen (`02_suchbaeume_grundlagen.tex`, sec:hardware-history)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| MITTEL | Schreib-/Allokations-Politik entkernt: WT schreibt sofort durch, WB markiert dirty + schreibt bei Verdrängung zurück (spart Bus-Verkehr, senkt Latenz); Kopplung Write-Allocate↔WB, No-Write-Allocate↔WT; ARMv8-Attributliste WT/WB/**Non-Cacheable** + Read-/Read-Write-Allocate (02_fundamentals.tex ~Z.61–69). Verifiziert: „Non-Cacheable"/„Read-Write-Allocate" 0 Treffer | hennessy2019architecture, arm_arm, intel_sdm | Im Absatz Z.151–155 Mechanik-Satz (dirty-Line, Rückschreiben bei Verdrängung, Bus-Verkehr/Latenz), die beiden typischen Politik-Kopplungen als Klammern und die ARMv8-Attributaufzählung wieder einfügen — je ein Halbsatz. |
| MITTEL | Inklusion/MESI/RRIP entkernt: Dreiteilung inklusiv (redundant) / exklusiv (Victim-Cache) / nicht-inklusiv; MESI-Zustände Modified, Exclusive, Shared, Invalid; Hersteller-Zuordnung MOESI=AMD, MESIF=Intel; RRIP „scan- und thrash-resistent", dynamisch DRRIP, „baut auf der adaptiven Insertions-Politik auf" mit eigener Qureshi-Zuordnung (02_fundamentals.tex ~Z.72–85). Verifiziert: „thrash"/„Victim" 0 Treffer, DRRIP nur noch Glossar (C_glossary.tex:77) | hennessy2019architecture, jaleel2010rrip, qureshi2007adaptive, intel_optimization, amd_sog | Absatz Z.151–159: Inklusions-Dreiteilung + vier MESI-Zustände + Hersteller-Klammern restaurieren; Zitat-Zusammenlegung auflösen: „…scan- und thrash-resistenten Re-Reference Interval Prediction (dynamisch DRRIP)~\cite{jaleel2010rrip}, die auf der adaptiven Insertions-Politik~\cite{qureshi2007adaptive} aufbaut". Skylake-SP/Zen-Instanz als Gewinn behalten. |
| MITTEL | Transfer-Satz: drittes Gegenbeispiel „nicht-temporale/Write-Combining-Stores umgehen den Write-Allocate-Pfad" (intel_sdm, ~Z.22–24) und DDR5-Breitenangabe „zwei unabhängige **32-Bit**-Sub-Kanäle" (~Z.21–22) entfallen. Verifiziert: „32-Bit" 0 Treffer in Kapiteln (Anhang-Treffer ist Serialisierungs-Kontext, unverwandt) | intel_sdm, micron_ddr5 | An den critical-word-first/DDR5-Satz (Z.120–122) den non-temporal/WC-Halbsatz mit \cite{intel_sdm} anhängen und „32-Bit" ergänzen. EN-Fassung analog nachziehen. |
| MITTEL | Cache-Line-Anker ausgedünnt: Cortex-A76/Neoverse V2 (64 B), Apple Silicon 128 B auf L2 **und** System-Level-Cache, SiFive U74, riscv_hwprobe „eingeschränkt (u. a. CBO-Blockgrößen)" (~Z.33–43). Verifiziert: Neoverse nur in Anhang-D-ISA-Kontexten, U74/CBO 0 Treffer | apple_optimization, arm_arm, intel_sdm, hennessy2019architecture | Die vier Anker als Klammer-Einschübe im Cache-Line-Absatz (Z.112–119) wieder aufnehmen und riscv_hwprobe (Z.117) um „eingeschränkt (u. a. CBO-Blockgrößen)" qualifizieren — prüfbare Instanzen für die Mikroarchitektur-These. |
| MITTEL | Bender-Theorie ohne Quantitäten: O(k/B)-Traversierungs-Schranke (bender2002scanning, ~Z.99–100); Optimierungsziel „minimiert die erwartete Zahl der Blocktransfers" im mehrstufigen Speicher-Modell mit Block-Transfer-Parameter, nahezu optimal **auch bei unbekannter Block-Größe** (bender2002treelayout, 02_fundamentals ~Z.97–99 + 03_state_of_the_art ~Z.87–89). Verifiziert: „k/B"/„Blocktransfer" 0 Treffer | bender2002scanning, bender2002treelayout, bender2005coboblivious, bender2000cobtree | Bender-Absatz (Z.170–177) in einem Satz präzisieren: Traversierung „mit lokalitätserhaltender O(k/B)-Schranke"; Layout „das die erwartete Zahl der Blocktransfers in einem mehrstufigen Speicher-Modell auch bei unbekannter Block-Größe nahezu optimal minimiert". Einziger quantitativer Theorie-Anker des Abschnitts. |
| NIEDRIG | TLB/NUMA verkürzt: Zwei-Stufen-Struktur „(L1-dTLB plus gemeinsamer L2-STLB)"; Begründung der iTLB/dTLB-Trennung „da Instruktionszugriffe deutlich lokaler sind als Datenzugriffe"; NUMA galt für Mehr-Sockel- **und Chiplet**-Systeme (relevant für AMD-Testmaschinen) (02_fundamentals ~Z.27–29, 53–55). Verifiziert: L1-dTLB/STLB/Chiplet 0 Treffer | intel_sdm, drepper2007memory, hennessy2019architecture | TLB-Absatz (Z.138–144): Klammer „(L1-dTLB plus gemeinsamer L2-STLB)" + ausformulierte Lokalitäts-Begründung; NUMA-Satz (~Z.111) um „und Chiplet-Systemen" ergänzen. |
| NIEDRIG | L3-Generationsanker: „frühere Intel-Client-Generationen (etwa Nehalem)" und „Intel-Server ab Skylake-SP/**Xeon Scalable**" (~Z.122–124); neu ohne Nehalem/Xeon-Scalable | intel_optimization, amd_sog | Beide Generationsanker in Z.159–162 wieder einsetzen — macht die Aussage gegen die Vendor-Handbücher prüfbar. |
| NIEDRIG | zhang2025-Anwendungsdomäne: Instruktions-Prefetcher „für Server-Anwendungen" (03_state_of_the_art ~Z.91) fehlt im nach Kap. 2 verschobenen Satz (Z.133–136) | zhang2025hierarchical | Im Zhang-Satz „für Server-Anwendungen" ergänzen — zwei Wörter. |

---

## §2.3 Benchmark-Frameworks (`02_suchbaeume_grundlagen.tex`, ~Z.196–201)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| MITTEL | SuRF als Bloom-Filter-Ersatz in RocksDB (Real-System-Integration als eigene Benchmark-Kategorie, 02_fundamentals ~Z.363); neu nur nackte Tabellenzeile „RocksDB-Integration \| Real-System \| P10" (03:312), Kategorie fehlt in der Kap.-2-Framework-Aufzählung. Verifiziert: „Bloom-Filter-Ersatz" nirgends, Bloom-Treffer nur T16-Filter-Achse | zhang2018surf | Framework-Familien-Aufzählung um „die Integration in reale Systeme (etwa SuRF~\cite{zhang2018surf} als Bloom-Filter-Ersatz in RocksDB)" ergänzen — gibt der Tabellenzeile in Kap. 3 ihren Anker zurück. |

---

## §3.1 Aufgabenstellung/Dritter Weg (`03_messsystem_prtart.tex`, sec:task-concerns)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| NIEDRIG | Hardware-Prefetcher als konfigurierbarer Achsen-Parameter („wo Architektur und OS es erlauben", Alt ~Z.109–112) und Abstufung „**boot-** bzw. übersetzungsstatisch" bei immutable OS (~Z.113–115) entfallen | intel_sdm | In der Parameter-Klammer (Z.42–50) „sowie, wo Architektur und OS es erlauben, der Hardware-Prefetcher" ergänzen; „übersetzungsstatisch" → „boot- bzw. übersetzungsstatisch". Passt zum bereits erwähnten MSR-Zugriff. |

---

## §3.2 SOTA-Kataloge (`03_messsystem_prtart.tex`, sec:sota-instances)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| **HOCH** | Bias-Analyse der Lastprofile entkernt (Alt 03_state_of_the_art Z.492–501): (1) read-only-Rahmung namentlich (HOT, CoCo, B²-Baum, SuRF, CSS); (2) Wirkmechanismus „komprimierte Verfahren brechen bei Misses früh ab" → Negativ-Anteil als Primärachse; (3) zipfian-Arbeiten namentlich (B-Trees Are Back, Mahling, Kuehn); (4) schreib-/nebenläufigkeitslastige namentlich (ART, Masstree, Wormhole, OLC-ART, RCU); (5) **fünfte Bias-Kategorie komplett weg**: prefetch-/hardware-nahe Arbeiten (CSB⁺, Chen, Schmidt) vermessen Cache/TLB statt Algorithmus-Logik; (6) 14 profillose = Survey-/Theorie-/Hardware-Arbeiten; (7) „gegen alle Lebewesen-Binaries (und die Container-Hüllen)" | binna2018hot, boffa2024coco, schmeisser2022b2tree, zhang2018surf, rao1999css, mueller2025btreesback, mahling2025hotpath, kuehn2023bplustree, leis2013art, mao2012masstree, wu2019wormhole, leis2016olc, mckenney2001rcu, rao2000csb, chen2001prefetch, schmidt2025hbm | Bias-Absatz nach tab:lp-catalog (Z.484–492) vollständig restaurieren: Paper-Instanzen je Kategorie, Früh-Abbruch-Mechanismus, fünfte Kategorie, Qualifizierung der 14 profillosen Arbeiten, Container-Hüllen als Mess-Gegenstand. Das ist der empirische Kern-Befund, der die Forschungslücke trägt — ohne Instanzen nicht nachprüfbar. |
| MITTEL | T4-Knotentyp-Instanzen verschwunden: Internal/Border (P03 Masstree), Decision/Span (P06 B²-Baum), LOUDS-Dense/Sparse (P10 SuRF) (Alt Z.213–217); neue T4-Prosa (Z.194–196) springt von HOT-Compound zu CSS/CSB⁺/Hankins; auch Anhang D ohne diese Bausteine. Verifiziert: „Internal/Border"/„Decision/Span"/„LOUDS-Dense" 0 Treffer (LOUDS-Treffer betreffen nur die T16-Filter-Achse, anderes Organ) | mao2012masstree, schmeisser2022b2tree, zhang2018surf | T4-Aufzählung wieder vollständig führen: „…über HOT-Compound, Internal/Border~\cite{mao2012masstree}, Decision/Span~\cite{schmeisser2022b2tree}, LOUDS-Dense/Sparse~\cite{zhang2018surf} und die CSS-/CSB⁺-/Hankins-Knoten bis zur PRT-ART-Familie" — und/oder als Bausteine in Anhang D T4/Build-PG nachtragen. Sonst sind P03/P06/P10 in der Achsen-Tabelle als T4-Quellen gelistet, ohne dass ihr Organ benannt wird. |
| MITTEL | Mess-Technologien-Attributionen: (1) „die Mehrzahl der Arbeiten P01–P28 berichtet solche Zähler" (PMC-Verbreitungsbeleg, Alt Z.512–514); (2) gem5 konkret von P25 Mahling + P27 Zhang genutzt (Z.516–518); (3) Schmidt vermisst HBM „mit dTLB- und L2/L3-Zählern" (Z.534–535) — genau die anschließend übernommenen Mess-Kategorien | demelo2010perf, binkert2011gem5, mahling2025hotpath, zhang2025hierarchical, schmidt2025hbm | Drei Einschübe im Mess-Technologien-Absatz (Z.494–508): PMC-Verbreitung, „(so P25 Mahling~\cite{mahling2025hotpath}, P27 Zhang~\cite{zhang2025hierarchical})" hinter dem gem5-Satz, „mit dTLB- und L2/L3-Zählern" beim Schmidt-Satz. Belegt, dass die Kategorien-Auswahl aus dem Korpus abgeleitet ist. |
| MITTEL | Idreos-Einordnung: „Periodic Table of Data Structures" nirgends mehr benannt (nur stiller cite in Kap. 1); Kostensynthese-Mechanismus des Data Calculator („Strukturen aus wenigen Entwurfs-Primitiven, deren Kosten sich synthetisieren lassen") auf „statische Entwurfsraum-Aufzählung" reduziert (Z.852); Folgerung „klassische Familien = bloße Lese-Gruppierungen orthogonaler Achsen-Belegungen" abgeschwächt (Alt Z.560–567). Verifiziert: „Periodic Table" 0 Treffer | idreos2018periodic, idreos2018datacalculator | Einen Satz in §3.2 (Entwurfsraum-Linie) oder §3.3.3 restaurieren, der beide Arbeiten benennt, den Kostensynthese-Kern wiedergibt und die Deckung mit der eigenen Achsen-Sezierung festhält. Wichtigste externe Verwandtschafts-Verankerung des Entwurfsraum-Konzepts (koordinieren mit dem Kap.-1-Fix oben). |
| MITTEL | T10-Baustein „Probability-Hints (P16/P17 Bender)" (Alt Z.257) fehlt in T10-Prosa (Z.247–252), Dialektik-Tabelle und Anhang D, obwohl P16 in tab:axes-overview weiter als T10-Quelle gelistet ist. Verifiziert: einziger „Probability"-Treffer = Skip-List-Münzwurf, unverwandt | bender2000cobtree, bender2005coboblivious | Probability-Hints in der T10-Aufzählung und als Anhang-D-Baustein restaurieren — sonst ist die P16-Quellenangabe der Achsen-Tabelle unbelegt. |
| MITTEL | T8-Sperr-Modi: „read-only, read-write, upgradeable und optimistische Validierung" (Alt Z.291–292) nirgends mehr ausgeführt; neue Fassung nennt „Sperr-Modus" (Z.276) nur als Wort, während Dialektik-Tabelle/Anhang D die zweite Sub-Achse als Reclamation (CC2) führen | leis2016olc, dijkstra1965concurrent, courtois1971readers | Entweder die vier Modi wieder ausformulieren oder die T8-Prosa an die Anhang-D-Systematik (Pattern ⊥ Reclamation) angleichen — aktuell verspricht der Text eine Unterscheidung, die nirgends ausgeführt wird. |
| NIEDRIG | Hash-Gegenprobe: Begründung „Ordnungs-Operationen entfallen, weil Hash-Tabelle ungeordnet" (Alt Z.33–35) und Zuordnung ISA-SIMD ↔ „SwissTable-Gruppen-Lookup" (Z.37–38) fehlen (nur verkürzt „SIMD-Control-Bytes" in Galerie-Grafik). Verifiziert: „Gruppen-Lookup" 0 Treffer | abseil_swisstable, knuth1998taocp3 | Zwei Halbsätze in Z.366–373: Ordnungs-Operationen entfallen prinzipbedingt; die geteilte ISA-SIMD-Achse trägt konkret das Gruppen-Lookup. **Zusammen mit dem Durchreich-Konsistenz-Fix aus §3.3 (unten) in EINEM Edit erledigen.** |
| NIEDRIG | Holm-Korrektur ohne Zweck: „Kontrolle der **Familienfehlerrate**" (Alt Z.525–526) fehlt (Z.502). Verifiziert: „Familienfehler" 0 Treffer | holm1979sequential | „(mit Holm-Korrektur der Familienfehlerrate~\cite{holm1979sequential})" — zwei Wörter. |
| NIEDRIG | Profil-XML: Aufzählung der elf Achsen-Felder (page, node, traversal, value_handle, concurrency, allocator, prefetch, telemetry, isa, layout, reclamation) und Name der überschriebenen ExperimentDriver-Heuristik entfallen (Alt Z.403–407; neu Z.426–433 nur pauschal) | — | Feldliste als Klammer-Einschub in Kap. 3 oder präzisierend beim ExperimentDriver in Kap. 4 — dokumentiert nachprüfbar, welche Achsen ein SOTA-Profil erfasst. |

---

## §3.3 Anatomie-Modell (`03_messsystem_prtart.tex`, sec:anatomy-metaphor)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| **HOCH** | Beobachtung 1 der Achsen-Zerlegung fehlt + **sachlicher Widerspruch**: (1) universelle Baum-Anatomie als „Leinwand" (Alt ~Z.27–32) inkl. Beispiel „sortierte KV-Liste = einzelnes Blatt mit Verweisen auf Daten-Blätter" (~Z.29–31); (2) Durchreich-Doktrin: Hash-Tabellen **belegen** baum-spezifische Achsen als Durchreich-Varianten (~Z.33–36) — die neue Gegenprobe sagt stattdessen „die trie-spezifischen Achsen entfallen" (Z.366–373), was der Durchreich-Doktrin (Session-Doc 2026-06-15) UND dem IsComposition-Concept in Kap. 4 (Z.109–112: keine Composition mit offener Achse) widerspricht; (3) positives Abgrenzungskriterium „eigene Gattung erst bei grundlegend anderem Basis-Achsen-Satz" (~Z.36–37) | — | In §3.3.1 die Zwei-Beobachtungen-Begründung wiederherstellen (Leinwand + KV-Listen-Beispiel; Lebewesen-Metapher ist schon da). In §3.2 die Gegenprobe von „entfallen" auf „werden als Durchreich-Varianten (None) belegt" korrigieren und das Gattungs-Kriterium wieder aufnehmen — sonst kollidiert der Text mit Kap. 4. |

---

## §3.4 Mess-System (`03_messsystem_prtart.tex`, sec:measurement-system)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| **HOCH** | Gütekriterien verflacht + **sachlich verfälscht**: Konstruktvalidität = „die Metrik misst tatsächlich das gemeinte Konzept", externe Validität = „Übertragbarkeit auf andere Plattformen und Lasten" (Alt 02_fundamentals ~Z.378–387); die neue Kompression „Konstrukt- und externe Übertragbarkeit" (Z.859) verschmilzt Konstruktvalidität fälschlich mit Übertragbarkeit; zudem Reproduzierbarkeits-Zielbestimmung („methodisch wiederholbar und statistisch vergleichbar") und explizite Signifikanz-Prüfung verkürzt. Verifiziert: „Konstruktvalid" 0 Treffer | hoefler2015benchmarking | Validität dreigliedrig glossieren (Z.856–861): „(intern: kausal isolierte Effekte; Konstrukt: die Metrik misst tatsächlich das gemeinte Konzept; extern: Übertragbarkeit auf andere Plattformen und Lasten)". Ein Halbsatz, behebt eine sachliche Verzerrung im methodischen Kern. |
| MITTEL | Reihe-A-Modus-Semantik: A_defined = „schnelle Verifikation" (8 Rang-1-Profile); A_full = „der Standard, gemäß der Direktive, so vollständig wie möglich zu messen" (Alt 06_evaluation_methodology Z.14–16; neu Z.1040–1041 nur Profilzahlen) | — | Modus-Klammern anreichern: „A_defined (schnelle Verifikation gegen die 8 Rang-1-Profile) und A_full (alle 30 SOTA-Profile; Standard gemäß der Vollständigkeits-Direktive)". Stellt die methodische Entscheidung samt Begründung wieder her. |
| MITTEL | Makro-Benchmarking-Definition: Operationsliste „Einfügen, Punkt- und Bereichssuche, Aktualisieren, Löschen" + „gegen Beispiel-Lasten" (Abgrenzung zur YCSB-Ebene) (Alt Z.28–30; neu Z.1047 nur „misst die einzelnen std::map-Operationen"). Verifiziert: „Beispiel-Lasten" 0 Treffer | — | Granularitäten-Satz konkretisieren: „misst die einzelnen std::map-Interface-Operationen (Einfügen, Punkt- und Bereichssuche, Aktualisieren, Löschen) gegen Beispiel-Lasten" — halbe Zeile, stellt die Micro/Makro/Gesamt-Abgrenzung wieder her. |
| MITTEL | Registrierungs-Mechanismus: Prüfling = „bei der Cache-Engine als IExecutionEngine **registrierte** Implementierung"; Builder enumeriert Permutationsraum „je registrierter Engine"; unter der Wurzel registrieren sich Prüfling + jede Engine (Alt Z.123–133, 166–167); neu (Z.942–949) nur „verbunden" — das Wie fehlt | — | Im M-Modell-Absatz einen Halbsatz ergänzen: Registrierung als IExecutionEngine an der gemeinsamen Wurzel + Enumeration je registrierter Engine — damit ist die Multi-Prüfling-Fähigkeit mechanisch begründet statt nur behauptet. |
| NIEDRIG | Novelty-Claim der Dynamik-Taxonomie: Web-Recherche fand für die Staffelung compile-/laufzeitvariabler Achsen-Ebenen keine etablierte Benennung (Alt Z.330–331); Claim existiert neu nur noch für die Übersetzungszeit-Muster | idreos2018datacalculator, alexandrescu2001modern | An den Data-Calculator/Policy-based-Design-Vergleich (Z.851–854) den Recherche-Halbsatz anfügen — stützt den Beitrags-Anspruch der Taxonomie. |

---

## §3.6 Heuristiken (`03_messsystem_prtart.tex`, sec:heuristics-loop)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| NIEDRIG | ML-Klassifikator-Pipeline ausgedünnt (2 Befunde zusammengeführt): (1) Merkmalsliste verliert Schreib-/Lese-Anteil und Schlüssel-/Wert-Datentyp (Alt Z.369–371); (2) Datenquelle „aus der Mess-CSV" und Zielgrößen-Beispiele „etwa Durchsatz oder Tail-Latenz" fehlen (Alt Z.161–164). Verifiziert: „Tail-Latenz" 0 Treffer | vanaken2017ottertune, ansel2014opentuner | In Z.1133–1138 die Merkmalsliste als Vereinigung von alter+neuer Liste führen (inkl. Schreib-/Lese-Anteil, Wert-Datentyp — beide diskriminieren die Workload-Klassen A/B/C/E/F direkt) und „aus der Mess-CSV" + „(etwa Durchsatz oder Tail-Latenz)" einschieben. |

---

## Kap. 4 — Implementierung (`04_implementierung.tex`)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| MITTEL | §4.1: die vier ABI-Header namentlich (search_engine, execution_engine, baustein_variants, resolve_baustein) (Alt ~Z.18–19; neu Z.16 nur „die ABI-Header"); search_engine/execution_engine kommen nirgends mehr vor, resolve_baustein erst in §4.3 ohne Anker | — | Im cache-engine-Bullet die vier Header wieder aufzählen — konkretes ABI-Inventar + Anker für die spätere resolve_baustein-Nennung. |
| NIEDRIG | Drei Binary-Auslieferungsvarianten „Debug, Messung oder Release" (Alt 01_introduction ~Z.112–114); neu nur COMDARE_MEASUREMENT_ON-Gating (Z.36–37) ohne Zuordnung zu Build-Zwecken | — | Beim Gating einen Halbsatz: daraus entstehen drei Auslieferungsvarianten derselben Permutation (Debug mit Observer, Messung mit Aggregator, Release ohne Mess-Kopplungen). Alternativ beim ABI-Punkt der Beitragsliste in Kap. 1. |
| NIEDRIG | Orthogonalität 4 Subsysteme ⊥ 3 Repos: Builder (apps/, Executable) und Engine (libs/, Bibliothek) im selben Repo (Alt ~Z.113–115, 121, 126); neu ordnet §4.1 den Builder nicht explizit apps/ zu | — | Ein Satz in §4.1: die vier Subsysteme liegen orthogonal zu den drei Repos; Builder (apps/) und CacheEngine (libs/) teilen sich comdare-cache-engine — erklärt, warum vier Subsysteme in drei Repos passen. |
| NIEDRIG | Pitchfork-Zweck: apps/ = ausführbare Dateien, libs/ = Bibliotheken, libs/common = querschnittlicher Code (Alt ~Z.21–22; neu nur nackte Namen) | — | Drei Kurz-Erklärungen in der Klammer (Z.17–18) — halbe Zeile, macht das Layout ohne Pitchfork-Vorwissen selbsterklärend. |
| NIEDRIG | Codegen-Phase: zweiter Zweig generate_module_from_profile für SOTA-Profile nicht mehr an Phase 2 gebunden (Alt Z.42–44); verifiziert: der Name steht neu NUR in der Repo-Aufzählung (04:15), nicht in der Pipeline-Beschreibung (Z.243–245) | — | Codegen-Klammer erweitern: „(ein comdare_perm_<fp>.cpp je Permutation, plus generate_module_from_profile für die SOTA-Profile)" — verbindet die Repo-Komponente wieder mit ihrer Pipeline-Phase. |
| NIEDRIG (BEDINGT) | §4.1: „prüflingseitige Re-Implementierungen" als Bestandteil von comdare-prt-art (Alt ~Z.26); neu nur generisch als Adapter-Fallback in §4.3 | — | **Nur falls im Code-Stand weiterhin zutreffend** im prt-art-Bullet wieder anfügen; liegen die Re-Implementierungen inzwischen in der cache-engine, dort verorten. Vor dem Edit Code-Stand prüfen. |
| NIEDRIG (BEDINGT) | §4.3: typisierte Ausnahme als zweiter Adapter-Fallback-Mechanismus (kontrolliertes Fehlschlagen statt Ersatzverhalten) (Alt ~Z.59–60; neu Z.97 nur „std::malloc oder einer Re-Implementierung") | — | **Nur falls der Ausnahme-Fallback im aktuellen Flag-System (COMDARE_AXIS_*_USE_/ENABLE_) existiert** ergänzen; andernfalls bewusst weglassen — neue Formulierung bildet dann den aktualisierten Code-Stand ab. |

---

## Kap. 5 — Evaluation (`05_evaluation.tex`)

| Prio | Verlorene Fakten (Alt-Fundstelle) | Keys | Einarbeitungs-Vorschlag |
|---|---|---|---|
| MITTEL | §5.1 Fairness-Regel asymmetrisch: Definition des PRT-ART-Native-Modus „(Inline-Umschaltung, Cache-Engine, Seitentyp-Scheduler)" fehlt (Alt Z.131–132), während der Common-Denominator-Modus definiert bleibt (Z.79–81); „Seitentyp-Scheduler" verschwindet komplett aus dem Korpus (verifiziert: 0 Treffer) | — | Die Klammer nach „PRT-ART-Native-Modus" wiederherstellen — beide Vergleichsmodi symmetrisch definiert; der Leser weiß, welche Spezialpfade der Native-Modus freischaltet. |
| MITTEL | §5.2 Pipeline: binary_to_csv reichert um **Profil-ID, Paper-Ref und Achsen** an (Alt ~Z.13–15); neu nur pauschal „reichert … an" (Z.138–150) — die drei Metadaten-Felder, die die Messwerte an SOTA-Katalog und Achsen-Framework koppeln, sind weg. (booktabs-Teilbefund gestrichen, s. u.) | — | Halbsatz präzisieren: „reichert sie über binary_to_csv um Profil-ID, Paper-Referenz und Achsen-Belegung an" — macht die Kopplung Records ↔ SOTA-Katalog/Achsen-Framework nachvollziehbar. |

---

## Anhang D (Baustein-Matrix)

Kein eigenständiger Gap — die zwei Anhang-D-Lücken sind Bestandteil der §3.2-Gruppen und dort mitzuerledigen:
- **T4/Build-PG:** Internal/Border-, Decision/Span-, LOUDS-Dense/Sparse-Bausteine nachtragen (siehe §3.2, T4-Gruppe).
- **T10:** Probability-Hints-Baustein (Bender P16/P17) nachtragen (siehe §3.2, T10-Gruppe).

---

## GESTRICHENE FALSCH-POSITIVE

| Befund | Begründung der Streichung |
|---|---|
| Sweep B, „Anreicherungsfelder des binary_to_csv" — **Teilbefund** „csv_to_latex erzeugt booktabs-Tabellen (Format-Detail entfällt)" | **VERSCHOBEN, nicht verloren.** Grep-verifiziert: booktabs ist in der Neufassung an zwei Stellen vorhanden — `04_implementierung.tex:253` („csv_to_latex (booktabs-Tabellen mit Algorithmus-Steckbriefen je Permutations-ID)") und `04_implementierung.tex:316` („rendert die booktabs-Steckbriefe"). Der Fakt wanderte von Kap. 6 (alt) nach Kap. 4 (neu). Der Hauptbefund (Profil-ID/Paper-Ref/Achsen) bleibt bestehen und steht in der Kap.-5-Tabelle. |

**Geprüft und NICHT gestrichen (Negativ-Verifikation):** Alle übrigen Verlust-Behauptungen wurden per Grep über die 6 eingebundenen Kapitel + Anhang bestätigt (0 Treffer bzw. nur unverwandte Kontexte): Periodic Table, L1-dTLB/STLB, Familienfehlerrate, Blocktransfer/O(k/B), Wegweiser/Nutzdaten-in-Blättern, Non-Cacheable, Read-Write-Allocate, scan-/thrash-resistent, Victim, Konstruktvalidität, Internal/Border, Decision/Span, LOUDS-Dense/Sparse, Gruppen-Lookup, Worst-Case-Lookups, Probability-Hints (Anhang-Treffer = Skip-List-Münzwurf, unverwandt), VEGA/AirIndex, Musterbeispiel, Chiplet, Server-Anwendungen, Nehalem/Xeon Scalable, CBO, SiFive U74, Neoverse (Anhang-Treffer = ISA-/ZIH-Kontexte, nicht der Cache-Line-Anker), Beispiel-Lasten, Seitentyp-Scheduler, Tail-Latenz, 32-Bit (Anhang-Treffer = Serialisierungs-Kontext). Teilpräsenzen sind in den Gruppen vermerkt (DRRIP nur Glossar; SIMD-Control-Bytes nur Galerie-Grafik; generate_module_from_profile nur Repo-Aufzählung 04:15). Zwei Kap.-4-Befunde sind als BEDINGT markiert (Code-Stand-abhängig), nicht gestrichen.

---

## EMPFOHLENE REIHENFOLGE

1. **HOCH — sachliche Verzerrungen zuerst (kleine Edits, große Wirkung):**
   1. §3.4 Konstruktvalidität (verfälschte Definition im methodischen Kern — ein Halbsatz).
   2. §3.3.1 + §3.2 Durchreich-Doktrin (aktiver Widerspruch zum IsComposition-Concept in Kap. 4 — Konsistenz-Fix in beiden Stellen in einem Zug, dabei gleich die NIEDRIG-Gegenprobe-Ergänzungen aus §3.2 mitnehmen).
2. **HOCH — tragende Substanz:**
   3. §3.2 Bias-Analyse der Lastprofile (empirischer Kern-Befund der Forschungslücke; größter Einzel-Edit).
   4. §2.1 Balance-Invarianten + B⁺-Mechanik (Kap.-2-Mandat „voll durchzitiert").
3. **MITTEL — gebündelt pro Datei (ein Durchgang je Datei minimiert Kontext-Wechsel):**
   5. §2.2 komplett (5 MITTEL-Gruppen liegen in drei benachbarten Absätzen: Transfer/Cache-Line ~Z.112–122, Schreib/Inklusion/MESI ~Z.151–162, Bender ~Z.170–177) + dabei die §2.2-NIEDRIG-Punkte (TLB, Nehalem, Server-Anwendungen) gleich mit.
   6. §3.2-Rest (T4-Instanzen, T10 Probability-Hints, T8 Sperr-Modi, Mess-Technologien-Attributionen, Idreos-Einordnung — Idreos mit dem Kap.-1-NIEDRIG-Fix koordinieren) + Anhang-D-Nachträge (T4, T10) im selben Zug.
   7. §3.4-Rest (Reihe-A-Semantik, Makro-Definition, IExecutionEngine-Registrierung).
   8. §2.1/§2.3 (Hashing, VEGA/AirIndex, SuRF/RocksDB) — VEGA/AirIndex erfordert bib-Nachzug, daher eigener Schritt.
   9. Kap. 4 §4.1 ABI-Header + Kap. 5 (Fairness-Klammer, binary_to_csv-Felder).
4. **NIEDRIG — opportunistisch beim jeweiligen Datei-Durchgang** (Suffix-Array, Holm, Profil-XML-Felder, Novelty-Claim, §3.1 Prefetcher, §3.6 ML-Liste, Kap.-4-Kleinigkeiten, Kap.-1-Lückenschluss).
5. **Zuletzt — BEDINGTE Befunde:** die beiden Kap.-4-Punkte (Re-Implementierungen, typisierte Ausnahme) erst nach Prüfung des aktuellen Code-Stands einarbeiten oder bewusst verwerfen.

**Hinweis:** Bei allen §2.2-Hardware-Fixes die EN-Fassung analog nachziehen (explizit vermerkt beim DDR5/32-Bit-Fix, gilt sinngemäß für den ganzen Abschnitt).