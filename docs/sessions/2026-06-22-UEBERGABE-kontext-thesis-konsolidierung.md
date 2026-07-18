# KONTEXT-ÜBERGABE — Thesis-Workstream (Stand 2026-06-22)

> Für die nächste Session (Text-Agent der Diplomarbeit „Aktive cache-bewusste Hardware-Adaption").
> Diese Datei ist self-contained: Architektur-Wahrheit + erledigt + offen + Arbeitskonventionen.

---

## 0. Repos & Build (Ist-Stand, alles gepusht)
- **Thesis** (LaTeX): `C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\thesis\diplomarbeit`
  Remote `BenniProbst/20260931-Overleaf-Diplomarbeit`, Branch `main`, **HEAD `66ed7aa`**.
- **cache-engine** (Code, READ-ONLY für Text-Agent): `…\Code\external\comdare-cache-engine`,
  Remote `BenniProbst/comdare-cache-engine`, **HEAD `7bf3dba`** (meine Docs/Handouts gepusht).
- **Build:** `pwsh -File build.ps1 -Lang de|en` (3× pdflatex + bibtex). Aktuell **DE 144 / EN 134 Seiten,
  0 Fehler, 0 undefined refs**. pdfinfo: `…\MiKTeX\…\x64\pdfinfo.exe`.
- **Rest-Overfull (~3–4 Boxen):** ausschließlich aus auto-generierten Demo-Tabellen in `anhang/{de,en}/tabellen/`
  → Generator-Fix an Impl-Agent übergeben (Handout TODO-4), nicht thesis-seitig patchen.

## 1. DIE EINE ARCHITEKTUR (zentrale, hart erarbeitete Wahrheit)
Maßgeblich: **Doc 36** `cache-engine/docs/architecture/36_eine_architektur_lebewesen_ist_searchalgorithm.md`
(+ Memory `project_eine_architektur_lebewesen_searchalgorithm`).

- Es gibt **GENAU EINE** Architektur, keine Parallel-Hierarchien.
- **`Lebewesen ≡ SearchAlgorithm`** — Metapher und technischer Begriff bezeichnen **dasselbe**.
- Kette: `IExecutionEngine` (Wurzel, alles Ausmessbare) → darunter **Geschwister** `IAnatomyBase`
  (Lebewesen) und `IVirusExecutionEngine` (achsenlose Viren, z.B. Graphen) → Gattung/Prüf-Dock
  (SearchAlgorithm/Container/Graph) → **Lebewesen = SearchAlgorithm-Unterklasse** →
  `SearchAlgorithmAnatomy<Composition>` (= der **Körper**) → **19 Achsen ≡ Organe** (T0–T18).
- **„SearchEngine" ist KEINE zweite Hierarchie**, sondern die ABI-Laufzeit-**Sicht** desselben
  Lebewesens = `SearchAlgorithmAbiAdapter : IAnatomyBase`. Die Klasse `search_engine<>` ist **dormant**.
- **Modul-(.dll)-Grenze = EINE C-ABI**: `comdare_create_anatomy() → IAnatomyBase*` (+ destroy), NICHT
  dreischichtig. Die 3 Schichten `CacheEngine→ExecutionEngine→SearchEngine` sind eine **in-process-
  Abstraktionskette** (dahinter), nicht die Modulgrenze. (Erst 2026-06-22 korrigiert, Commit `66ed7aa`.)
- **ExecutionEngine-Rolle (User-Entscheidung):** `IExecutionEngine` = abstrakte messbare Wurzel;
  `execution_engine<Strategy>` = OS-Primitiven + (Experiment-Modus) Mess-Aggregator. **CacheEngine =
  Achsen-Bausteine-Bibliothek; ExecutionEngine = Ausführungs-/Mess-Werkzeuge.**
- **Code-Ist-DEFEKT:** `search_engine<>` und `SearchAlgorithmAnatomy`/`AbiAdapter` sind heute zwei
  unverbundene Template-Bäume (I1-Verletzung) → Vereinheitlichung = Impl-Agent **TODO-6**.

## 2. VERBINDLICHE ENTSCHEIDUNGEN (User, diese Session)
1. Architektur-Framing = **EINE Architektur** (nicht „parallel/orthogonal" — das war mein Fehler).
2. „SearchEngine" als ABI-Framing **behalten** (Option 1), aber als *Sicht* desselben Lebewesens.
3. **Heuristik-Auswahl-Mechanismus = ML-Klassifikation**, IMMER als **Zielsetzung/Ausblick/Future-Work**
   (NICHT als erledigt — Code leistet es noch nicht).
4. **SOTA-Zahl = 30** (8 *eigenständige* Rang-1 + 22 Rang-2/3). Footnote: 10 Rang-1-Kern-Arbeiten
   (= 8 eigenständige + ARTSync/LOUDS als Organe).
5. Auto-„beste Binary" + Laufzeit-Dynamik + XML-Heuristik-Export = **Ausblick** (an Impl-Agent).
6. **Code = Primärquelle** (gewinnt gegen Thesis-Text). **GEWOLLTE Architektur = Doku/Doc 36**, nicht
   der defekte Code-Ist.

## 3. ERLEDIGT diese Session (Kap. 1–3 + Front-Matter belastbar)
- Cross-Check Abstract/Front-Matter ↔ Körper ↔ Code (C1–C8); Korrekturen: Zahl 30, Ziel/Ausblick-Framing.
- **Architektur-Korrektur** „parallel" → EINE Architektur (Abstract+Intro+Kap.4, DE+EN).
- **F6**: Kap. 4 Phantom-Phasen → kanonische ExperimentDriver-Phasen **Enumerate/Codegen/Compile/Load/
  Execute/Measure/Persist** (+2 opt-in); Kap. 6 war schon korrekt.
- **Konsolidierung** aller Overleaf-Ergänzungen (alle Phasen): EN-Äquivalenz (Observer-Modi,
  ExecutionEngine-Werkzeuge, Trennbarkeit, Metapher); neue Heuristik-Abschnitte **Kap. 2 §Heuristiken
  und ihre Automatisierung**, **Kap. 4 §Heuristik-Profil-Auswertung und Binary-Auswahl**, **Kap. 6 §Von
  Messergebnissen zu Heuristiken**, **Kap. 8 Roadmap**, Glossar — alle ML-Ausblick.
- **§Zielsetzung-Fehler A–F** behoben (UltiHash-Klausel, „als Forscher", Meta-Analogie-Satz,
  Anatomie≠Binary, „messen und auswerten", „8 eigenständige Rang-1").
- **Modul-Schnittstelle** präzisiert (eine C-ABI + dahinter 3-Schicht-Abstraktion).
- **Quelltext-Format**: Einrückung + einheitliche Zeilenlänge (≤100), satz-neutral, via
  **`tools/format_tex.py`** (jetzt im Repo gesichert).
- **Doc 36** + **Impl-Agent-Übergaben** geschrieben (siehe §5).

## 4. ARBEITSKONVENTIONEN (unbedingt einhalten)
- **VOR jedem Editieren `git pull --no-rebase origin main`** — der User editiert parallel in Overleaf
  (Commits „Merge overleaf-…", „… Korrektur"). Tritt regelmäßig auf.
- **DE = Leitsprache, EN strikt äquivalent** (DE≡EN für jede inhaltliche Aussage).
- Nach Edits an authored .tex: **`python tools/format_tex.py <dateien>`** (rückt ein + bricht ≤100 um,
  satz-neutral; spart verbatim/Tabellen/Kommentare aus) → dann **build de+en** → **0 Fehler/0 undef
  verifizieren** → committen → pushen. **diplomarbeit.tex (Master/Abstract) NICHT formatieren** (handgewrappt).
- **Commits OHNE `Co-Authored-By`-Trailer** (TU-Governance). Kein „erledigt"-Claim für Unimplementiertes.
- Umlaute korrekt (ä/ö/ü/ß), nie ASCII-Ersatz.
- Architektur-/Code-Aussagen: gegen Doc 36 / Code verifizieren, **nicht raten**.

## 5. ARTEFAKTE (Pfade)
- **Doc 36** (Architektur-Referenz): `cache-engine/docs/architecture/36_eine_architektur_lebewesen_ist_searchalgorithm.md`
- **Impl-Agent-Handout** (TODO-1..6): `cache-engine/docs/docs/sessions/20260619-HANDOUT-impl-agent-profile-pruefling-ziele-tabellenbreite.md`
  - TODO-1 Profile-Ausbau P01–P33; TODO-2 abstract/full-Prüflinge + Originalkonfiguration; TODO-3
    Ziel-Versprechen implementieren; TODO-4 Tabellen-/Diagramm-Breite; TODO-5 (revidiert); **TODO-6
    search_engine↔Anatomie vereinheitlichen (I1)**.
- **Übergabe EINE Architektur** (Impl-Agent): `cache-engine/docs/docs/sessions/20260620-UEBERGABE-impl-agent-EINE-ARCHITEKTUR-vereinheitlichung.md`
- **Kap-4-Gerüst** (für den User zum Schreiben): `thesis/.../docs/sessions/2026-06-21-kap4-geruest-eine-architektur.md` (TEIL A Streichliste + TEIL B Detail-Skelett B.1–B.11)
- **Konsolidierungs-Liste**: `thesis/.../docs/sessions/2026-06-21-konsolidierung-user-ergaenzungen.md`
- **Formatierer**: `thesis/diplomarbeit/tools/format_tex.py`
- Messdaten-Auswertung (frühere Session): `…\Messdaten-Backup\analyze_ff.py` + `AUSWERTUNG_…md`

## 6. OFFEN / NÄCHSTE SCHRITTE
- **User schreibt Kapitel 4** manuell aus dem Gerüst (`2026-06-21-kap4-geruest…`); Text-Agent
  unterstützt mit Fakten/Struktur, schreibt die Synthese NICHT selbst.
- Kap. 4–6 ausbauen, Kap. 7 wartet auf echte Messläufe (Stubs).
- **Tasks:** #87 AP-B3 (I/O-Achse, Impl-Agent, zurückgestellt); #89 AP-B4 (Anhang B Code-Struktur)
  und #90 AP-B5 (Anhang E ADR) — **blockiert bis Kap. 4–6** stehen.
- **Impl-Agent** (getrennter Strang): Doc 36 + Handout TODO-1..6 abarbeiten; cache-engine hat fremde
  WIP-Dateien (`profile_run_entry.hpp` etc.) — **NICHT** vom Text-Agent anfassen.
- Beim Weiterlesen des Users: er prüft Abschnitt für Abschnitt → auf Fehler-Hinweise reagieren
  (Muster: lesen, gegen Doc 36/Code verstehen, A–F-artige Fehlerliste, fixen DE+EN, bauen, pushen).

## 7. WICHTIGE LEKTIONEN (nicht wiederholen)
- „orthogonal"/„parallel" für die Architektur war **falsch** → EINE Architektur (Code-Ist-Defekt ≠ Design).
- Code-Defekt nicht als gewolltes Design in die Thesis schreiben.
- `search_engine` ist ZWEIERLEI: dormante ABI-**Klasse** vs. lebendiger **Namespace** der Achsen-Topics.
- Modulgrenze = eine C-ABI, „dreischichtig" nur die Abstraktion dahinter.
- format_tex.py-Edits: Fortsetzungszeilen in `itemize` haben 2-Leerzeichen-Einrückung (old_string-Matching!).
