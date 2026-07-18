# Figuren-Korrekturen Habich-Feedback (F1–F9) — ERLEDIGT

> Datum: 2026-06-30 · Folge-Session zu `20260630-UEBERGABE-figuren-korrekturen-und-arch-workflow.md`
> + `20260630-architektur-analyse-bild-korrekturen.md` (code-geerdete Grundlage).
> Status: **alle 9 Figuren-Aufgaben abgeschlossen, committet, zu beiden Remotes gepusht.**

## Git-Stand Ende Session
- **Thesis-HEAD** `e03d742` (GitHub origin + GitLab); **BASE-HEAD** `6ba9de6` (beide Remotes).
- Commits dieser Session (Thesis-Submodul):
  - `74735b3` → `e121284` F4/F6 (genera L1–L5 + one-architecture/uml Mess-Treiber)
  - `61e4c72` F7/F9 (m-model + pipeline Build+Mess-Fokus)
  - `f130655` F1/F3/F5 (design-space-Legende + Mess-Dreieck + usage-Hub + patterns-Concept-Kette)
  - `e03d742` F8 (heuristic-loop SiL-Zitate)
- **Build:** `pwsh -NoProfile -File build.ps1 -Lang de|en`; **DE 146 S. / EN 134 S.**, durchgängig 0 Fehler / 0 Overfull / 0 undef-Refs / 0 undef-Cites.

## Was erledigt wurde (je Aufgabe, code-geerdet)
- **TASK 0 + F2 (leere Figur):** Per PDF-Sichtprüfung verifiziert — alle Kap.-2-Figuren rendern; die vom Prof. gesehene leere Figur war im älteren PDF und durch Commit `c86ea31` bereits behoben. Figur→Nummer-Mapping (`.lof`) bestätigt.
- **F4 `fig:genera`:** Hierarchie über **5 Ebenen** ausgezogen (Gattung → Tier-Unterklasse → 19 Achsen-Organe → konkrete Composition=ein Tier → kompilierte `.dll`/`.so` Tier-Binary + 3 Build-Achsen). Belege: `anatomy_base.hpp:40–73`, `known_algorithms.hpp:32–48` (6 Re-Impl + 5 Paper-Binding-Tiere), `build_variant_definition.hpp:17–29`.
- **F6 `fig:one-architecture` + `fig:uml-interfaces`:** `IExecutionEngine` = **Treiber der Messung** (warm_up/run/reset/shutdown; Anatomy∪Virus∪Hybrid, `execution_engine_base.hpp:39–43,98–119`); Anatomie=Verdrahtung; L4/L5-Tiefe; `IDriveableTier`/`IObservableTier` in UML.
- **F7 `fig:m-model` + F9 `fig:pipeline`:** `CacheEngineBuilder` in **BUILD** (`BuildOrchestrator`/`ExperimentTree` → Tier-Binaries, resumierbar/RAM-gewahr) und **MEASURE** (`perm_runner` via `IObservableTier`) gesplittet; `messung_driver`=äußere WAS-Schleife. Pipeline: Pfad A (7 Phasen, Compile/Execute/Measure hervorgehoben) + Pfad B ergänzt. Belege: `build_orchestrator.hpp:1–12`, `experiment_tree/perm_runner.hpp`, `apps/perm_runner/`.
- **F1 `fig:design-space` + NEU `fig:measurement-triangle`:** Achsen-Legende node_type(T4)/memory_layout(T5)/allocator(T6) + „3 von 19 Achsen". Neues Trade-off-Dreieck Latenz/Durchsatz/Speicher mit Permutation-Punkt; die node-/data-/index-cache-aware (HW-PMC) Mess-Komponente als **ausstehend** markiert (PMC default-OFF, `pmc_source.hpp`, `measurement_writer.hpp` HW-Spalten=0).
- **F3 `fig:axis-organ` + `fig:usage`:** realer Hub `LayoutAwareChunkedStore<node,layout,alloc>` (T4⊕T5⊕T6, `abi_adapter.hpp:1894–1897`); solide nur alloc/node/layout→store→search; optional gestrichelt store→prefetch/telemetry (kann/muss-Semantik, `requires`-gated); Nebenläufigkeit gepunktet (nicht verdrahtet).
- **F5 `fig:patterns`:** dritter Block „Drei-Stufen-Concept-Kette" je Achse (Topic→Axis→Permutations-Concept→`AxisBase`(CRTP)→`mp_list`-Registry); literaler `std::variant` nur im 11-Achsen-`baustein_variants`-Fallback.
- **F8 `fig:heuristic-loop`:** SiL-Einordnungs-Satz mit 7 Quellen in `literatur.bib`: OpenTuner (PACT'14), FFTW (ICASSP'98), ATLAS/AEOS (Parallel Computing'01), OtterTune (SIGMOD'17), Database Tuning Advisor (**VLDB 2004**), Active Harmony (SC'02), Tibba X-in-the-Loop (ICCAD'16).

## Codex-Cross-Model-Reviews (durchgeführt, Befunde korrigiert)
- F4/F6: code-treu bestätigt; nur Quote-Konsistenz (Kap.2, behoben) + Build-Achsen-Begriffe (bewusst lesbar belassen).
- F7/F9: **thread×prefetch-Sweep aus pipeline entfernt** (nicht im perm_runner belegt); `ExecutionEngine`→`IObservableTier` (code-genau).
- F1/F3/F5/F8: **agrawal2005autoadmin auf VLDB 2004 korrigiert**; **axis-organ Knotentyp-Eingang ergänzt** (Caption-Konsistenz); „vierte Achse"→„vierte Mess-Komponente".

## Massen-Bildserien — ERLEDIGT (als kompakte, code-geerdete Galerien gelöst, Commit `0aae63f`)
Statt vieler redundanter Einzelbilder je eine systematische Galerie (übersichtlicher, code-treu):
- **fig:sota-gallery (2.1):** 12 rekonstruierte Suchstrukturen (ART/HOT/Masstree/CoCo/START/B²/Wormhole/LOUDS/SuRF/CSS/CSB⁺/SwissTable), je Klasse + Kern-Idee + charakteristische Achsen (an `tab:axes-overview` angeglichen).
- **fig:axes-gallery (4.3):** alle 19 Composition-Achsen T0–T18 als Strategie-Concept-Kacheln (Sub-Achsen-Familie + Bausteine + abgeleiteter Standard); code-geerdet via Explore-Agent gegen Anhang D + Registries.
- **fig:prtart-gallery (4.2):** 6 PRT-ART-Beiträge (4+2-Pool T6, OLC T8, Bundle-Prefetch T7, MultiLevel-Layout T5, kohärenz-bewusste Telemetrie T10, DensityTracker+H1/H2/H3).
- Codex-cross-model-verifiziert (SOTA-Achsen an Tabelle angeglichen; T13-Subachsen io1–io3 Anhang-D-konform + Tabellen-Fix; DensityTracker-T10-Label).
- **Git Ende:** Submodul `0aae63f` / BASE `01cabd1`, beide Remotes; DE 146 / EN 136 S., 0 Overfull/undef.

## Voll-Review Struktur+Inhalt (max-effort, Commit `d484cab`) — ERLEDIGT
4 parallele Review-Slices (je Explore-Agent + Codex-Gegenprüfer mit identischer Aufgabe): S1 roter Faden/FF-Antworten,
S2 Kanon/T-IDs/Zahlen Kap.2+3, S3 Kap.4–6+Anhänge, S4 DE↔EN-Parität/Bib/Hygiene. **Sauber bestätigt:** 0 tote Refs,
0 doppelte Bib-Keys, DE↔EN-Parität vollständig (Sections/Labels/Zahlen), T-ID-/P-ID-Kanon wasserdicht, Habich-Kriterien erfüllt.
**25 verifizierte Befunde behoben** (DE+EN): Reihe-B/C-Full-Join-Widerspruch (Kap.5↔tab:stage-series); prtart-demo/-gallery-Zählung
(Page-Type=Build-Achse → „übrige vierzehn"); m-model Welch→Signifikanz-Statistik; tab:axes-overview-Build-Zeilen
(simd_extension/general_hardware, PRT-ART (2026)); 25-vs-23-Allokatoren; „über 10^14"; CacheEngine=Bausteine-Bibliothek;
FF0+Seitentyp/FF1(b)/FF2-Kriterium/FF4-OS-Teil ehrlich beantwortet; Kap.6-Limitierungen +PMC-aus +Smoke-4/19+Beschattung
+\ref{sec:measurements:limitations}; Anhang-A-Smoke↔Kap.5/6 versöhnt; acht-Schichten↔6-Schlüsselstellen-Mapping (§1.4);
§1.5+Anhänge; Kapitel-Brücken 2→3→4→5→6 + Kap.6-Intro; H1–H3-Disambiguation; Barnard=Sapphire Rapids; app:blocks/app:measurements
navigierbar; 9 Quote-Reste→\enquote; 2 stale TODOs. **DE 148 / EN 138 S., beide 0 Fehler/Overfull/undef.**

## Verbleibend offen
- Mess-Experiment (reale A/B/C-Läufe) bleibt mehrtägig → Kap. 5 methodisch mit `\input`-Platzhaltern (nicht aktiv pollen).
- Optional: aus den kompakten Galerien später bei Bedarf einzelne Detailbilder für besonders zentrale Verfahren/Achsen ausgliedern.
- Nicht übernommene weiche Review-Hinweise (bewusst): Kap.3 §3.2 „übergreifende Strategie-Achsen" (HW/Scheduling) ist gewollt
  außerhalb T0–T18; Anhang-D-Köpfe mit internen axis_NN-Kürzeln dokumentieren bewusst das T-ID↔axis_NN-Mapping.

## Audit-Nachzug (2026-07-02, User-Matrix P1–P7) — ERLEDIGT
Alle 28 §1-Audit-Korrekturen umgesetzt (1.2 bewusst Soll belassen; 1.3 = zwei wählbare T0-Bausteine S14+SwissTable, beide
permutiert) + Folge-Konsistenz (fig:uml-interfaces `std::variant`→`mp_list`; Kap.-6-Ausblick: XML-Parser als implementiert,
Modul-Body-Lücken präzisiert). Handout an Impl-Agent: `20260702-handout-implementierungsagent-audit-code-todos.md`
(AP-1…AP-15; P0=M3-Gate). DE 152 / EN 144 S., beide 0 Fehler/Overfull/undef.
**Restpunkte nächste Text-Session:** (a) PRT-ART-Organ-Menge in fig:prtart-demo (3.3), fig:prtart-gallery (4.1) und
Fließtext 03:~519 + 04-§4.2 an Audit 1.12 angleichen (Layout/Allocator sind prt-art-Bausteine, aber [noch] keine im Apparat
überschriebenen CE-Organe; Pfadkompression-Redirect + ChainRef-Value-Handle fehlen als orange Kacheln) — Ebenen-Unterscheidung
Repo-Baustein vs. Apparat-Slot sauber einziehen; nach E6/AP-2-Landung erneut prüfen. (b) 02:~485 `std::conditional_t`-Nennung
an 1.7-Mechanik (concept-geprüftes if constexpr) angleichen. (c) FF3 „Adapter mit allen std::map-Operationen + Notify-Hooks"
bleibt bewusst Soll (Code-TODO 2.13/AP-15 + 2.1/AP-2). (d) Nach AP-7-Landung T0-Zählungen 21→22 nachziehen.

**Restpunkte-Abarbeitung (2026-07-02, Folge-Session): (a)+(b)+(c) ERLEDIGT.** (a) Ebenen-Trennung Slot↔Repo-Baustein in
fig:prtart-demo/-gallery + 03/04-Fließtext eingezogen (Wert-Handle/ChainRef + Pfadkompression = überschriebene Slots;
Layout/Allokator = Repo-Bausteine via CE-Standard, E6), §1.4 war bereits konsistent; (b) concept-geprüftes if constexpr;
(c) FF3 präzisiert: std::map-Kernvertrag (Konformitäts-Teilmenge, Anhang F), Vollausbau 17 Ops + Notify-Hooks als
Folgeschritt; dazu 04-Steckbriefe „je Permutations-ID" (1.16-Angleichung). Codex-reviewed (EN-resizebox-Parität,
T10-Doppelkachel). **Verbleibend NUR code-wartend:** (d) T0 21→22 nach AP-7; Ebenen-Darstellung nach E6/AP-2-Landung
erneut prüfen; Kap.-5-„Erhebungspfad folgt"-Stellen nach AP-1-Landung auf „erhoben" heben.
