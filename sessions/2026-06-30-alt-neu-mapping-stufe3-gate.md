# Alt→Neu-Mapping — Gate vor Stufe 3 (Inhalts-Umzug), 2026-06-30

> **Zweck:** Verbindliche Zuordnung JEDES Alt-Bausteins (Abschnitt / Tabelle / Figur) zu seinem Ziel im
> 6-Kapitel-Neu-Skelett. Dies ist der in der Übergabe §5 geforderte **Gate-Schritt 1** — Stufe 3 (Inhalt bewegen)
> darf erst danach starten, sonst Inhalts-Verlust (v. a. die Brücken aus §4).
>
> **Sicherheitsnetz:** Backup-Tag `backup-2026-06-29-pre-habich-restruktur`. Alt-Dateien
> `kapitel/de|en/01_introduction … 08_conclusion` + `anhang/*/A..F` sind **un-included** (Inhaltsquelle), nicht gelöscht.
> **Prinzip:** allgemein→speziell, fließende Absätze (KEINE Silo-Wiederherstellung), Inhalt bleibt, DE führt/EN folgt.

---

## 0. Inventar (Ist, verifiziert 2026-06-30)

**Alt-Inhaltskapitel (un-included):** 01_introduction (ch:intro) · 02_fundamentals (ch:fundamentals) ·
03_state_of_the_art (ch:sota) · 04_concept_architecture (ch:concept) · 05_implementation (ch:impl) ·
06_evaluation_methodology (ch:methodology) · 07_results_evaluation (ch:results) · 08_conclusion (ch:conclusion).
**Anhänge (un-included):** A_measurements, B_code_structure, C_glossary, D_building_block_matrix,
E_architecture_decisions, F_comparison_interfaces.

**Neu-Skelett (Ziel, gebaut):** 01_einleitung (ch:intro) · 02_suchbaeume_grundlagen (ch:foundations) ·
03_messsystem_prtart (ch:measurement) · 04_implementierung (ch:impl) · 05_evaluation (ch:eval) · 06_fazit (ch:conclusion).

**10 Tabellen:** tab:axes-overview (03:160), tab:hw-sched (03:265), tab:wl-frameworks (03:345), tab:lp-catalog (03:376),
tab:sota-profiles (03:416), tab:allocator-profiles (03:466), tab:dialectic (04:77), tab:stage-series (04:341),
tab:workload-routing (06meth:70), tab:datasets (06meth:89). *(weitere Tabellen in Anhang D/F → Stufe 4.)*

**4 Alt-Figuren (real):** fig:m-model (04:159), fig:one-architecture (04:202), fig:abi (04:271), fig:three-stage (04:326).
*(13 Neu-Figuren in Kap. 1–3 bereits platziert — s. Übergabe §3.)*

---

## 1. Master-Mapping: Neu-Ziel ← Alt-Quellen

### Kap. 1 Einleitung (`01_einleitung`, ch:intro) — suchbaum-/problem-first
| Neu-Abschnitt | ← Alt-Quelle |
|---|---|
| sec:motivation | 01_introduction sec:motivation (suchbaum-first reframen) |
| sec:problem | 01 sec:problem (Trennbarkeits-Problem = roter Faden) |
| sec:rqs | 01 sec:rqs (FF1–FF4) |
| sec:contributions | 01 sec:contributions (knapp; Detail folgt) |
| sec:structure | 01 sec:structure (im Skelett schon neu geschrieben — nur abgleichen) |

### Kap. 2 Suchbäume + Grundlagen (`02_suchbaeume_grundlagen`, ch:foundations) — KONZEPTIONELL+VISUELL, KEINE Tabellen
**2.1 sec:overview (Konzept + SOTA-Überblick):**
- 02_fundamentals sec:search-classes + ssec:{comparison-trees, digital, hashing, spatial, flat-exotic, container-taxonomy, own-framework} → Landschaft der Suchstrukturen
- 03_state_of_the_art sec:sota-overview + ssec:sota-corpus → SOTA-Überblick + Korpus
- 03 sec:sota-axes (NUR der **konzeptionelle/bildhafte** Teil: „jeder Algorithmus = Punkt im Entwurfsraum", je-Paper-Detailbild) → die **systematische Achsen-Tabelle** geht NACH Kap. 3.2
- 03 ssec:sota-design-space (Entwurfsraum-Konzept, speist `fig:design-space`)
- Bilder: `fig:search-map`✓, `fig:design-space`✓, **SOTA-ALGO-1..M** (~30, zeichnen)

**2.2 sec:hardware-history (Hardware historisch):**
- 02_fundamentals sec:cache-basics + ssec:{cache-levels, cache-line-sizes, tlb, coherence, aware-oblivious} → Cache-Hierarchie/Line/TLB/Kohärenz (statisch + compile-time-relevant)
- 03 sec:sota-cache + ssec:{sota-levels, sota-cacheline, sota-tlb, sota-update, sota-aware} → Cache-Konzepte als Instanzen
- Bild: `fig:cache-line`✓

**2.3 sec:software-means (Software-Mittel + Synthese):** *(Begrifflichkeiten + wissenschaftliches Messen gehören laut Habich HIER)*
- 02 sec:compare-interfaces + sec:stdmap-interface + ssec:{stdvector-interface, dynamics-levels} → einheitliche Vergleichsinterfaces
- 02 sec:measurement-basics + ssec:{measurement-criteria, measurement-patterns} → **wissenschaftliches Messen (Grundlagen)**
- 02 sec:cpp23 + ssec:{classic-patterns, metaprog-facilities, new-patterns} → Design-Pattern (speist `fig:patterns`✓)
- 02 ssec:own-framework → begriffliche Einordnung
- 04_concept_architecture sec:axis-framework → Achsen-Bibliotheks-Konzept (**reframen**: Abstraktions-Realisierung, NICHT „unser System zuerst")
- 04 sec:three-layer + ssec:three-levels → die eine Architektur + 3 Ebenen/Verdrahtung (`fig:one-architecture`→hier, `fig:three-levels`✓)
- 04 sec:abi → ABI-stabiles Modul-Interface (`fig:abi`→hier, füllt B8-Platzhalter Hüllen/ABI)
- 04 sec:axes → Achsen-**Konzept** (Katalog/Tabelle geht NACH 3.2)
- 03 **sec:sota-design (Lead, 553–558)** → SE-/Architektur-Design-Framing des Frameworks (instanziiert die Design-Pattern aus sec:cpp23) *(Codex-Catch 2026-06-30: war Waise)*
- 03 ssec:sota-design-contribution → Design-Pattern-getriebener Beitrag + Feature-SPL-Metapher-Mapping
- Bilder: `fig:anatomy-bridge`✓ `fig:synth`✓ `fig:axis-organ`✓ `fig:usage`✓ `fig:three-levels`✓ `fig:genera`✓ `fig:patterns`✓ + `fig:one-architecture`/`fig:abi` (umziehen) + **UML-Landkarten** (zeichnen)

### Kap. 3 Mess-System mit PRT-ART (`03_messsystem_prtart`, ch:measurement) — cache-aware-Fokus, ALLE Kataloge/Tabellen, Aufgabenstellung selbst-erklärend
**3.1 sec:task-concerns (Belange der Aufgabenstellung):**
- **03 sec:gap (Forschungslücke) → HIERHIN** — die zentrale Brücke Problem→Mess-System (Mess-System als LÖSUNG)
- aufgabenstellung/ + 01 sec:contributions → cache-aware-Belange selbst-enthalten, greift auf ALLE Belange von Kap. 2 zurück

**3.2 sec:sota-instances (Stand der Technik als Achsen-Instanzen, systematisch — Tabellen):**
- 03 sec:sota-axes (systematischer Teil) + ssec:{sota-ax-nav, sota-ax-mem, sota-ax-hw, sota-ax-conc, sota-ax-idx} → **tab:axes-overview**, **tab:hw-sched**, **tab:allocator-profiles**
- 04 sec:dialectic → dialektische Aneignung → **tab:dialectic**
- 03 sec:sota-workloads + ssec:{sota-wl-frameworks, sota-wl-profiles, sota-wl-bias} → **tab:wl-frameworks**, **tab:lp-catalog**, **tab:sota-profiles**
- 03 sec:sota-measurement + ssec:{sota-meas-tech, sota-meas-stats, sota-meas-tud, sota-meas-bridge} → Mess-Technologien als Instanzen (Brücke zu 3.3)
- 02 sec:workloads-basics + ssec:load-terms + sec:ycsb → Last-/Workload-Begriffe (Konzept-Teil ggf. nach 2.3 ziehen; Instanzen hier)
- 03 ssec:sota-design-selftuning → selbst-designende/gelernte Indizes

**3.3 sec:measurement-system (Das Mess-System):**
- 04 sec:m-model → M-Modell, 4 Subsysteme (`fig:m-model`→hier)
- 04 sec:builder → CacheEngineBuilder + Drei-Stufen-Prüfung (`fig:three-stage`→hier, **tab:stage-series**→hier)
- 06_evaluation_methodology sec:series → drei Messreihen A/B/C; sec:explosion → Permutations-Explosion + Reduktion

**3.4 sec:prtart-demo (PRT-ART als Demonstrator):**
- 04 sec:prt-art (PRT-ART als Prüfling) → Bild **B9** (zeichnen)

**3.5 sec:heuristics (Schärfung durch Heuristiken):**
- 04 sec:heuristic-profile-selection + 06meth sec:measurements-to-heuristics + 02 ssec:heuristics → `fig:heuristic-loop`✓

### Kap. 4 Implementierung (`04_implementierung`, ch:impl) — Detail
**4.1 sec:repos:** 05_implementation sec:repos + sec:terminologie-engines
**4.2 sec:prtart-impl (je PRT-ART-Algorithmus ein Bild):** 05 sec:adapters + sec:concurrency + sec:telemetry → Bilder **PRTART-1..N**
**4.3 sec:axes-impl (Achsen + alle Mess-System-Ebenen):** 05 sec:codegen + sec:concept-crtp + sec:pipeline + 06meth sec:experimentdriver (7-Phasen) → Bilder **AXIS-T0..T18** (19), **B12** (7-Phasen-Pipeline)

### Kap. 5 Evaluation (`05_evaluation`, ch:eval) — Methodik → Analyse
**5.1 sec:eval-method:** 06_evaluation_methodology sec:hypotheses + sec:workloads (+ **tab:workload-routing**, **tab:datasets**) + sec:platforms + sec:fairness
**5.2 sec:eval-results:** 07_results_evaluation sec:eval-pipeline + sec:result-a + sec:result-b + sec:result-c + sec:sensitivity + sec:discussion

### Kap. 6 Fazit (`06_fazit`, ch:conclusion)
sec:answers ← 08 sec:answers · sec:limitations ← 08 sec:limitations · sec:outlook ← 08 sec:outlook

---

## 2. Tabellen-Platzierung (Übergabe §6, ENTSCHIEDEN)
| Tabelle | Quelle | Ziel |
|---|---|---|
| tab:axes-overview, tab:hw-sched, tab:allocator-profiles | 03 | **Kap. 3.2** |
| tab:wl-frameworks, tab:lp-catalog, tab:sota-profiles | 03 | **Kap. 3.2** |
| tab:dialectic | 04 | **Kap. 3.2** |
| tab:stage-series | 04 | **Kap. 3.3** |
| tab:workload-routing, tab:datasets | 06meth | **Kap. 5.1** (Evaluations-Tabellen) |

## 3. Figuren-Platzierung
| Figur | Status | Ziel |
|---|---|---|
| fig:cache-wall, fig:separability | platziert | Kap. 1 |
| fig:search-map, fig:design-space | platziert | Kap. 2.1 |
| fig:cache-line | platziert | Kap. 2.2 |
| fig:anatomy-bridge, fig:synth, fig:axis-organ, fig:usage, fig:three-levels, fig:genera, fig:patterns | platziert | Kap. 2.3 |
| fig:heuristic-loop | platziert | Kap. 3.5 |
| **fig:one-architecture, fig:abi** | **umziehen aus 04** | Kap. 2.3 |
| **fig:m-model, fig:three-stage** | **umziehen aus 04** | Kap. 3.3 |
| SOTA-ALGO-1..M (~30) | zeichnen | Kap. 2.1 |
| UML-Landkarten | zeichnen | Kap. 2.3 |
| B9 PRT-ART-Demonstrator | zeichnen | Kap. 3.4 |
| PRTART-1..N | zeichnen | Kap. 4.2 |
| AXIS-T0..T18 (19), B12 7-Phasen | zeichnen | Kap. 4.3 |

## 4. Kritische Brücken (§4) — explizit verankert
- **sec:gap (Forschungslücke, 03:605) → Kap. 3.1 sec:task-concerns.** Eingehende `\ref{sec:gap}` an **5 Stellen** (03:115, 03:319, 03:505, 03:551, 04:54) → beim Umzug auf `sec:task-concerns` remappen.
- sec:workloads-basics (02) → Konzept-Teil ggf. 2.3, Instanzen → 3.2 (NICHT untergehen lassen).
- sec:sota-measurement, ssec:sota-wl-bias, sec:sota-design (03) → Kap. 3.2 / 2.3 (s. Master-Mapping; alle drei sind verankert).
- sec:axis-framework, sec:axes (04) → Kap. 2.3 (Konzept) bzw. Katalog → 3.2.

## 5. Label-/Ref-Remap + Anhang-Refs
- **Auflösende Kapitel-Labels:** ch:fundamentals, ch:sota, ch:concept, ch:methodology, ch:results verschwinden. Vor/while Umzug je Kapitel `\ref{ch:…}` und `\ref{sec:…}` der Quellsektion auf das Neu-Ziel mappen. **NIEMALS** ein Alt-File wieder includen, solange Neu-Files dieselben Labels tragen (Doppel-Label-Crash).
- **Schlüssel-Remaps:** sec:gap→sec:task-concerns · sec:m-model→(bleibt, jetzt in 3.3) · sec:three-layer/ssec:three-levels→(in 2.3) · sec:builder→(in 3.3) · sec:prt-art→sec:prtart-demo.
- **Anhang-Refs** (app:blocks, app:interfaces, …): in umzuziehendem Inhalt referenziert; Anhänge sind auskommentiert. Bis Stufe 4 entweder Anhang mitziehen oder Ref auf Platzhalter setzen — sonst undefined refs. Vor jedem Commit `grep -n "Reference.*undefined" *.log`.

## 6. Stufe-3-Ausführungsreihenfolge (je Kapitel: bewegen → fließend zusammenführen → Build → Codex → commit+push beide Remotes + BASE)
1. **Kap. 1** (klein, geringes Risiko) — Motivation/Problem/FF/Beiträge aus 01 einziehen, suchbaum-first.
2. **Kap. 2** (groß) — 2.1→2.2→2.3 in dieser Reihenfolge; Achsen-/SOTA-Inhalt **konzeptionell** halten, Tabellen NICHT mitnehmen (die gehen nach Kap. 3). Brücken aus §4 mitführen.
3. **Kap. 3** (groß, Tabellen-schwer) — **zuerst sec:gap→3.1** + Ref-Remap; dann 3.2 (alle Kataloge), 3.3 (M-Modell/Builder + fig:m-model/three-stage + tab:stage-series umziehen), 3.4, 3.5.
4. **Kap. 4** — 05_implementation + 06meth-Phasen einziehen (Detail-Fokus).
5. **Kap. 5** — 06meth (Methodik) + 07_results (Analyse) zusammenlegen, Eval-Tabellen.
6. **Kap. 6** — 08_conclusion 1:1 (Struktur stimmt schon).
7. **Massen-Bilder** je Kapitel parallel; **Stufe 4 Anhänge** zuletzt reaktivieren + Refs schließen.

> **Nach Abschluss je Kapitel:** Build DE+EN (0 Fehler / 0 undefined / 0 overfull), Codex-Review der Änderungen, commit+push (GitHub+GitLab) + BASE-Pointer. Übergabe-Doc fortschreiben.
