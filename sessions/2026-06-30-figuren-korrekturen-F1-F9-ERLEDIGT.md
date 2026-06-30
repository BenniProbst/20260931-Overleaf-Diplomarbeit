# Figuren-Korrekturen Habich-Feedback (F1–F9) — ERLEDIGT

> Datum: 2026-06-30 · Folge-Session zu `2026-06-30-UEBERGABE-figuren-korrekturen-und-arch-workflow.md`
> + `2026-06-30-architektur-analyse-bild-korrekturen.md` (code-geerdete Grundlage).
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

## Verbleibend offen (NICHT Teil des Habich-Figuren-Feedbacks — separate Massen-Serien)
Die repetitiven Massen-Bildserien (als `% TODO` im Text verankert), je eine Serie pro Session:
- **SOTA-ALGO ~30** (je Paper-Algorithmus ein Detailbild, Kap. 2.1, `02:135`).
- **AXIS-T0..T18 = 19** (je Achse das Gesamtkonzept-Bild, Kap. 4.3, `04_implementierung:90`) — sollte die code-geerdete Achsen-Sezierung aus `2026-06-30-architektur-analyse-bild-korrekturen.md` §1.5 nutzen.
- **PRTART-1..N** (je PRT-ART-Algorithmus, Kap. 4.2, `04_implementierung:51`).
- Mess-Experiment (reale A/B/C-Läufe) bleibt mehrtägig → Kap. 5 methodisch mit `\input`-Platzhaltern (nicht aktiv pollen).
