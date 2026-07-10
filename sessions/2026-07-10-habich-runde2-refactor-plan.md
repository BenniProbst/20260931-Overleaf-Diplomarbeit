# Habich-Runde 2 — Refactor-Plan (v1, 2026-07-10) + Erfassungs-Befunde

> Quelle: Erfassungs-Workflow `wf_b1d24420` (6 Agenten; Rohdaten:
> `sessions/workflow-backups/20260710-wf-habich-runde2-erfassung/`). Backup-Tag vor Start:
> `backup-2026-07-10-pre-h2`. TODO-Tracking: Tasks #97–#108 (AP-H2-0..11).
> **Reihenfolge bindend: A→B→C→D→E→F→G** (F3 nach A; C vor D). Build-Gate nach JEDER Phase
> (DE+EN 0 Fehler); EN zieht pro Phase nach (nie >1 Phase Rückstand); granulare Commits.

## Habich-Direktiven (Auftrag)
Kap. 2 STRIKT nur Bekanntes (Begriffe, bekannte Konzepte, Paper) — eigene Begriffswelt + Zeichnungen
(korrekt, aber falsch platziert) → Kap. 3. Kap. 3 = allgemeines Konzept + Begriffs-Neuschöpfung
(Prüfling nicht führend; §3.1 neu framen) → Architektur strikt an Kap. 4 (spezielle Umsetzung).
Messsystem: Idee Kap. 3 / Umsetzung Kap. 4. E4→E0 + Prüf-Stufen + Heuristik-Gegenbeweis einarbeiten.

## IST (verifiziert)
6er-Satz ist live und VOLL ausformuliert (kein Skelett mehr; einziger TODO = 05:108–112
Ergebnis-Einspeisung nach erstem Messlauf). Restruktur-Stufen 1–4 + F1–F9 ERLEDIGT
(sessions/2026-06-29-habich-audit…md + 2026-06-30-alt-neu-mapping-stufe3-gate.md).

## Phase A — Kap. 2 entkernen (AP-H2-2) [~3–4 Sessionen]
- A1: 02:34–46 fig:design-space (T4/T5/T6, „3 von 19 Achsen") → 03 sec:task-concerns; in 02 neutraler 1-Satz-Ausblick ohne Achsen-IDs.
- A2: 02:76–159 (Anatomie-Vorgriff, Korpus P01–P33/A01–A23, Sezierung, Herkunfts-Cluster, fig:sota-gallery) → 03 sec:sota-instances (vor tab:sota-profiles); Cluster-Absatz zur Tabellen-Einleitung verdichten.
- A3: 02:260–492 (Achsen-Komposition, Lebewesen/Organe, fig:anatomy-bridge/synth/axis-organ/usage, Drei-Ebenen, Gattungen/fig:genera, Übersetzungszeit-Muster/fig:patterns) → 03 NEU §3.3 „Lösungskonzept: Anatomie-Modell". GRÖSSTER MOVE (~230 Z.); alle \ref vor/nach greppen.
- A4: 02:493–558 (CacheEngine→ExecutionEngine→SearchEngine, fig:one-architecture, ABI/fig:abi) → 04 sec:axes-impl (vor fig:pipeline).
- A5: 02:559–622 (Prüf-Dock, Dynamik-Taxonomie, Mess-Muster, fig:measurement-triangle) → 03 sec:measurement-system (Triangle als Einstieg).
- A6: 02:624–647 fig:uml-interfaces → 04.
- A7: 02:209–214 + 244–252 („dritter Weg") → 03-Überleitungen; 02 endet mit neutraler Problem-Zuspitzung.

## Phase B — Kap. 2 neu füllen: NUR Bekanntes [~2–3 Sessionen]
Vorbilder (Deep-Research, Analyst 1): Damme 2020 (TUD Lehner/Habich: Disambiguation→Overview→
State-of-the-Art, Related Work lokal je Kapitel), Bingmann 2018 (KIT: Messen als bekanntes Handwerk
§1.2; Survey-Kap. mit Notation zuerst), Kallis 2018 (ART-Background-Minimalmuster). Regel: jedes
§-Ende 1–2 Relevanz-Sätze.
- B1 Ziel-Gliederung 02: §2.1 Speicher-/Cache-Hierarchie+Kostenmodelle · §2.2 Suchbäume/Tries/Hashing · §2.3 SOTA cache-bewusste Indizes (4-W-Gruppierung, OHNE eigene Achsen-IDs) · §2.4 Workloads/Benchmarks · §2.5 Experimentmethodik · §2.6 C++/GoF-Mittel. Ziel ~450 Z.
- B2 Verlust #1: Heuristik-Grundlagen (alt 02_fundamentals:120–156, h:M→K, statisch/dynamisch) → 02 §2.5-Ende.
- B3 Verlust #2: Cracking/learned indexes/VEGA/AirIndex + Cites idreos2007cracking/halim2012stochastic/kraska2018learned (alt 03_sota:569–577) → 02 §2.3-Schluss.
- B4 Verlust #4: YCSB A–F-Definitionen (alt 02:354–358) → 02 §2.4.

## Phase C — Kap. 3 neu rahmen + Code-Konzepte 07/2026 [~3 Sessionen]
- C1: §3.1 sec:task-concerns umschreiben (allgemein→speziell, Prüfling nicht führend). **User-Review nach Entwurf.**
- C2: E4→E0-Schichtenmodell + Verträge (Doc 19:11–23,51,64; Ledger) als KONZEPT → 03 §3.3-Unterabschnitt + Schichten-Stack-TikZ; explizit gegen Drei-Ebenen-Modell abgrenzen.
- C3: Organ- vs. System-Achsen („Blut", Doc 18:15–30) + MeasurementRegime/16 Kategorien → 03 sec:measurement-system (Anker 03:382–386).
- C4: Vier Betriebsmodi inkl. Hybrid-Modus = heuristischer Gegenbeweis (Doc 19:62–75) → 03 sec:heuristics (+ Memory #251 Command-Pattern).
- C5: Messkurven-Typsystem + Kardinalitäten + Filterkette/CoR (Doc 20:17–45) → 03 sec:heuristics; SOLL/IST sauber (Futur wo Code fehlt).

## Phase D — Kap. 4 ausbauen (195→~450 Z.) [~2 Sessionen]
- D1: A4+A6-Zuflüsse → §4.3 „Architektur". D2: Contract-Tests je Schicht gegen Fake-Nachbar (Doc 19:7,27–34) → §4.4 „Qualitätssicherung". D3: SystemAxis-CRTP/honest-0/CLU + IMeasurementSource/MeasuredDelta/Registry + curve_fit (Code-Anker auf Commit pinnen) → §4.4/4.5. D4: IsComposition (alt 04:280–281) → §4.3.

## Phase E — Verlustliste MITTEL restaurieren [~1 Session]
#5 YCSB-Affinitäten+YCSB_F → 03 nach tab:sota-profiles · #6 Datensatz-Lader → 03 ~Z.244 · #7 Mess-Kategorien-Brücke (Fill-Buffer, p50–p999, Statistik-Triade) → 03 §3.2-Schluss · #8 Merge-Punkte-Beispiele → 03 §3.3 · #9 Permutationsraum-Historie (5,5 Mrd→10^14) + MessreihenMode::Defined → 03/04 · #11 Kuehn-Provenienz → 03:199 · #12 Scheduling-Prosa (SIMD-Worker-Limit 2/N, P/E-Dispatch) → vor tab:hw-sched · #14 Dialektik-Vorbemerkung → 03:45 · #15 „Formaler Bediener" → 01 §1.4.

## Phase F — Evaluation + Figuren [~1–2 Sessionen]
- F1: Hybrid-Gegenbeweis als Eval-Dimension + 3-Varianten-Observer-Messfehlerquantifizierung + 4. Schritt Paper-Wall-Clock (Doc 20:47–57) → 05 sec:eval-method (Methodik-Futur; #156-Gate).
- F2: Verlust #13 cpu_core/cpu_atom + PMC-Protokollpflicht (alt 06:112–126) → 05 §5.1.
- F3: Figuren-Regel „resizebox nie vergrößern": ✅ fig:m-model ERLEDIGT 2026-07-10 (DE+EN, visuell verifiziert); NOCH OFFEN (erst NACH Phase A, Figuren wandern): fig:usage (02:354, ×1.55), fig:genera (02:413, ×1.3), fig:prtart-demo (03:531, ×1.3), fig:pipeline (04:124, ×1.19), fig:uml-interfaces (02:625, ×1.11); optional adjustbox max-width als Standard; Überbreiten sota-/axes-gallery ggf. 4 Spalten.
- F4: Neue Toolchain-TikZ (sample_data_generator→messung_driver→binary_to_csv→csv_to_latex→diagram_generator; Prosa 04:114–118) → 04.

## Phase G — Abschluss [~1 Session]
01 sec:structure + 06 an neue Gliederung angleichen; Glossar/Anhang-Refs; EN-Spiegel; Ledger+Tasks; Commits+Pipeline grün.

## Verlustliste NIEDRIG (optional, Analyst 3 #16–#23)
GoF-Negativliste, Mikroarchitektur-Namen (Cortex-A76/Neoverse V2/SiFive U74), Metapher-Provenienz
Biomedizin, Feature-Mapping-Vollliste, upgradeable-Sperrmodus, Magazines/Vmem, „alle 10
Allokator-Profile getaggt" — bei Gelegenheit in Phasen B/C/E mitnehmen.
