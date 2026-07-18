# ÜBERGABE — Figuren-Korrekturen (Habich-Feedback) + Architektur-Workflow (2026-06-30)

> **Lies ZUERST**, sobald verfügbar: `2026-06-30-architektur-analyse-bild-korrekturen.md` (von einem ultracode-Workflow
> aus dem Code von cache-engine / prt-art / Diplomarbeit erzeugt — die code-geerdete Grundlage für fast alle Korrekturen unten).
> Dann diese Übergabe (die Aufgabenliste) + die Restruktur-Übergaben `2026-06-29-UEBERGABE-restruktur-stand-skelett-bilder.md`
> und das Mapping-Gate `2026-06-30-alt-neu-mapping-stufe3-gate.md`.

---

## 0. Sicherheitsnetz / Git-Stand
- **Backup-Tag** `backup-2026-06-29-pre-habich-restruktur` (Vor-Umbau, 8 Kapitel) auf beiden Remotes.
- **Git-Stand Ende Session:** Thesis-HEAD `2d1957a`, BASE-HEAD `ceebc64`, beide auf GitHub(origin)+GitLab(gitlab).
- **Alt-Inhalt** `kapitel/{de,en}/01_introduction … 08_conclusion` ist un-included (Quelle); Anhänge A–F sind jetzt **wieder included**.
- **Build:** `pwsh -NoProfile -File build.ps1 -Lang de|en`; aktuell **DE 140 S. / EN 128 S.**, durchgängig 0 Fehler / 0 undef-Refs / 0 undef-Zitate / 0 Overfull.

## 1. Was die (riesige) Vorsession geleistet hat
8→6-Kapitel-Habich-Restrukturierung **vollständig**: 4 Konzept-Bilder (SYNTH/USAGE/GATT/PATTERN) → Alt→Neu-Mapping-Gate →
**Inhalts-Umzug ALLER 6 Kapitel** (Stufe 3, jedes einzeln codex-cross-model-verifiziert) → **Anhänge A–F reaktiviert** (Stufe 4,
Refs remappt: `ch:sota`→`sec:sota-instances`, `sec:compare-interfaces`/`sec:stdmap-interface`/`ssec:dynamics-levels`/
`ssec:measurement-patterns`/`ssec:three-levels`→`sec:software-means`) → **3 Massen-Einzelbilder** (B9 `fig:prtart-demo`,
B12 `fig:pipeline`, UML `fig:uml-interfaces`). Jeder Schritt committet + gepusht (beide Remotes + BASE-Pointer).

## 2. Aktueller Gesamt-Stand der Arbeit
- **6 Kapitel** (Einleitung · Suchbäume+Grundlagen · Mess-System+PRT-ART · Implementierung · Evaluation · Fazit) **+ 6 Anhänge** (A–F).
- **16 Abbildungen** platziert, **12 Tabellen** (10 SOTA-/Achsen-Kataloge in Kap. 3 + 2 Eval-Tabellen in Kap. 5), ~90 Zitate.
- Habich-Reframe (allgemein→speziell, Mess-System als Lösung, fließende Absätze, Bildhaftigkeit, Aufgabenstellung selbst-erklärend) ist vollzogen.

---

## 3. FIGUREN-KORREKTUREN (Habich-Feedback dieser Session) — Kern-Aufgaben

> ⚠️ **TASK 0 (zuerst!): Figur→Nummer-Mapping gegen das gebaute PDF verifizieren.** Die User-Nummern unten sind die *gedruckten*
> Nummern aus dem Overleaf-PDF; die meisten passen zur Quell-Reihenfolge (2.6/2.9/2.11/2.13/3.1/3.4/4.1 bestätigt), aber **2.1/2.2
> sind unklar** (Float-Platzierung). Quell-Reihenfolge Kap. 2: 2.1=`fig:search-map` · 2.2=`fig:design-space` · 2.3=`fig:cache-line`
> · 2.4=`fig:anatomy-bridge` · 2.5=`fig:synth` · 2.6=`fig:axis-organ` · 2.7=`fig:usage` · 2.8=`fig:three-levels` · 2.9=`fig:genera`
> · 2.10=`fig:patterns` · 2.11=`fig:one-architecture` · 2.12=`fig:abi` · 2.13=`fig:uml-interfaces`. Kap. 3: 3.1=`fig:m-model` ·
> 3.2=`fig:three-stage` · 3.3=`fig:prtart-demo` · 3.4=`fig:heuristic-loop`. Kap. 4: 4.1=`fig:pipeline`. **Korrekturen unten sind nach
> LABEL beschrieben (eindeutig) — die Nummer nur als Hinweis.**

| # | Label | User-Nr. | Aufgabe |
|---|-------|----------|---------|
| F1 | `fig:design-space` | „2.1" | **(a)** Diagramm-Achsen korrekt in einer **Legende** benennen statt generisch „Achse i/j/k" (echte Achsen-Namen; konzeptionell mehr Dimensionen möglich, aber zur Veranschaulichung bei 3 bleiben). **(b)** **NEUES Bild** ergänzen: ein **Trade-off-Dreieck Latenz / Durchsatz / Speicherverbrauch**, das die gesamte Achsen-Permutation gegen diese 3 Mess-Komponenten aufspannt (im Sinne von Suchbäumen genau dieses Dreieck). **Implementierungs-Lücke notieren:** diese Mess-Komponente (Knoten/Daten/Index + cache-aware Verhalten) **fehlt** im Code noch (s. Workflow-Befund `measurement_gap`). |
| F2 | **leere Figur** | „2.2" | Eine Abbildung rendert **leer** (nur Caption). Im PDF identifizieren (Kandidaten `fig:search-map` oder `fig:cache-line`) und reparieren. |
| F3 | `fig:axis-organ` + `fig:usage` | „2.6" | Achsen nutzen die Interfaces anderer Achsen **KÖNNEN, aber MÜSSEN NICHT**. Aktuelle Darstellung ist **unvollständig** → **gründliche Code-Analyse** für den echten (teils optionalen) Inter-Achsen-Nutzungs-Graphen (Workflow-Befund `inter_axis_usage`). „dashed = repräsentativ" als „optional/kann" präzisieren. |
| F4 | `fig:genera` | „2.9" | **Nicht korrekt abgeleitet.** Jedes **Tier-Binary** eines Suchalgorithmus ist ein **eigenes Tier**; die Hierarchie geht **viel tiefer**. Container beherbergen z. B. nur „Reptilien", Suchalgorithmen nur „Säugetiere" **unter einer `std::map`-Hülle**. → Echte Hierarchie Gattung→Tier-Unterklasse→**konkretes Tier-Binary** neu zeichnen (Workflow-Befund `anatomy_tier`). |
| F5 | `fig:patterns` | „2.10" | Korrekt, aber **feingliedrig gegen den Gesamtkontext** prüfen: die 19 Achsen wurden **im Code seziert** → die konzeptionelle Aufgliederung **mehrstufig am Code** nachvollziehen (Workflow-Befund `axes_dissection`). |
| F6 | `fig:one-architecture` + `fig:uml-interfaces` | „2.11" / „2.13" | **Sichtprüfung** + **feinere Aufgliederung der Abstraktions-Klassen.** Laut altem Text beschreibt eine **Anatomie die Zusammenhänge zwischen ALLEN Bestandteilen**, und **`IExecutionEngine` ist der Treiber der Messung**. → Alten Text (`04_concept_architecture` sec:three-layer/ssec:three-levels) **selbst nachlesen** + Workflow-Befund `anatomy_tier`. |
| F7 | `fig:m-model` | „3.1" | Korrekt, dass die Pipeline 7 Phasen hat, aber die **wirklich interessanten Phasen** sind die **Mess- und Build-Phasen des Diplomarbeit-Codes und des `CacheEngineBuilder`**, der die **Tier-Binaries nach Konfiguration baut und durchmisst**. → Bild auf diese Phasen fokussieren/erweitern (Workflow-Befund `build_measure`). |
| F8 | `fig:heuristic-loop` | „3.4" | **Perfekt.** Aufgabe: **recherchieren**, ob es bereits bekannte **„Software-in-the-Loop"-Systeme** gibt, die genau diesen Mess→Profil→Konfig→Filter-Kreislauf verwenden → externe Software-Technologie-**Quellen zitieren** (Workflow-Befund `sil_research`: OpenTuner/ATLAS/Active-Harmony/… prüfen). |
| F9 | `fig:pipeline` | „4.1" | Fällt mit den F7-Pipeline-Änderungen zusammen und muss **ebenfalls erweitert** werden (Build+Mess-Fokus, CacheEngineBuilder baut Tier-Binaries je Konfiguration + misst). Guter Ansatz, aber ausbauen. |

**Unverändert gut (kein Handlungsbedarf laut User):** `fig:prtart-demo` (3.3) und alle Konzept-Bilder außer den oben genannten.

## 4. Laufender ultracode-Workflow (Architektur-Analyse)
- **Gestartet** Ende dieser Session: `thesis-arch-figure-analysis` (7 parallele Code-Explorer + 1 Synthese-Agent).
- **Untersucht** (read-only) in `Code/external/comdare-cache-engine`, `Code/external/comdare-prt-art`, `Code/02_messung_driver`+`Code/`:
  Anatomie/Gattung/Tier-Hierarchie · die 19 Achsen + Sub-Achsen + Concept/CRTP/variant · Inter-Achsen-Interface-Nutzung (kann/muss) ·
  Build+Mess-Pipeline (CacheEngineBuilder baut Tier-Binaries je Config + misst; messung_driver) · Mess-Kategorien + Lücke
  (Latenz/Durchsatz/Speicher + Knoten/Daten/Index/cache-aware) · Architektur-Stand + offene Impl-Projekte · Web-Recherche SiL-Systeme.
- **Schreibt** die Analyse nach **`thesis/diplomarbeit/docs/sessions/2026-06-30-architektur-analyse-bild-korrekturen.md`** (Run-ID `wf_1422bec5-451`).
- **Nächste Session:** dieses Analyse-Dokument zuerst lesen — es liefert die code-geerdete Grundlage für F1, F3–F7, F9 (Hierarchien, Pipeline, Mess-Lücke) und die SiL-Zitate für F8. Falls der Workflow nicht fertig wurde: erneut starten via `Workflow({scriptPath: ".../workflows/scripts/thesis-arch-figure-analysis-wf_1422bec5-451.js", resumeFromRunId: "wf_1422bec5-451"})` (gecachte Agenten kommen sofort zurück).

## 5. Weiterhin offen: die repetitiven Massen-Bildserien (als `% TODO` im Text verankert)
- **SOTA-ALGO ~30** (je Paper-Algorithmus ein Detailbild, Kap. 2.1) · **AXIS-T0..T18 = 19** (je Achse das Gesamtkonzept-Bild, Kap. 4.3,
  TODO im 04_implementierung) · **PRTART-1..N** (je PRT-ART-Algorithmus, Kap. 4.2). ~50 gleichförmige TikZ — reiner Zeichen-Fleiß, je eine Serie pro Session.
- Die AXIS-T0..T18-Serie sollte die code-geerdete Achsen-Sezierung aus dem Workflow nutzen (F5-Grundlage).

## 6. Empfohlene Reihenfolge nächste Session
1. **Workflow-Analyse-Doc lesen** (+ ggf. Workflow resumen).
2. **TASK 0** Figur→Nummer-Mapping am PDF verifizieren; **F2** (leere Figur) identifizieren+fixen — schnell, blockiert Sichtprüfung.
3. **F4** `fig:genera` + **F6** `fig:one-architecture`/`fig:uml-interfaces` (gemeinsam, da Anatomie/Tier-Hierarchie code-geerdet) — hohe Priorität (inhaltlich falsch/zu grob).
4. **F7** `fig:m-model` + **F9** `fig:pipeline` (gemeinsam, Build+Mess-Fokus).
5. **F1** `fig:design-space` Legende + NEUES Trade-off-Dreieck (+ Mess-Lücke im Text notieren).
6. **F3** `fig:axis-organ`/`fig:usage` (Inter-Achsen-Nutzung, kann/muss).
7. **F5** `fig:patterns` Code-Abgleich. **F8** SiL-Zitate einbauen (`literatur.bib` + fig:heuristic-loop-Caption).
8. Danach: Massen-Bildserien (AXIS-T0..T18, SOTA-ALGO, PRTART).

## 7. Direktiven & Fallstricke (gelten weiter)
- **DE führt, EN folgt**; jede Figur in beiden Sprachen, Tabellen-/Figur-Daten DE↔EN identisch (nur Captions/Wörter übersetzt).
- **Codex-Review** jeder Text-/Bild-Änderung vor „fertig" (Cross-Model `mcp__codex__codex`, gpt-5.5, read-only; NUR Code-Repos, NIE Cluster/keys).
- **Commit+Push** beide Remotes (GitHub origin + GitLab) + **BASE-Pointer bumpen**, Submodul zuerst; Overleaf-Divergenz via `fetch`+`merge` (kein Rebase/Force).
- **Build sauber halten:** lange `\texttt{}`-Namen in Captions mit `\-` (Trennstellen) gegen Overfull; breite Diagramme in `\resizebox{...}{!}{}`;
  `\\` nur top-level im TikZ-Node (nicht in `{\scriptsize …}`); deutsche schließende Quotes als `\enquote{…}` (ASCII `"` ist in babel-ngerman aktiv → Crash).
- **Metapher-Kanon (ggf. durch F4/F6 zu verfeinern):** Lebewesen ≡ SearchAlgorithm · Anatomie = Verdrahtung zwischen Organen · Graph = 3. Gattung
  (nicht achsenlos) · 3 Ebenen Gattung→Tier-Unterklasse→Organ — **ABER** User-Präzisierung F4: jedes Tier-**Binary** = eigenes Tier, Hierarchie tiefer,
  Container=nur „Reptilien", SearchAlgorithm=nur „Säugetier" unter `std::map`-Hülle; IExecutionEngine = **Mess-Treiber**.
- **Achsen-IDs** = fortlaufend T0–T18 (tab:axes-overview), NICHT die `axis_NN`-Verzeichnisnummern (T9=Serialization, T11=Value-Handle, T10=Telemetry, T14=I/O).
- **Mess-Experiment** (reale Läufe) ist mehrtägig → NICHT aktiv pollen; Kap. 5 bleibt methodisch mit `\input`-Platzhaltern.
