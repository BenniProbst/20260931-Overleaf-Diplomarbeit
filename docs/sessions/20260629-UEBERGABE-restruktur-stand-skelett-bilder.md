# ÜBERGABE — Habich-Restrukturierung: Stand nach Skelett + erste Bilder (2026-06-29)

> **Lies ZUERST** die drei Referenz-Dokumente dieser Session:
> 1. `20260629-habich-audit-kritik-und-restruktur-plan.md` — die vollständige Habich-Kritik (+ §9 vertieftes Feedback).
> 2. `20260629-restruktur-detailplan-gliederung-und-bildliste.md` (**v3**) — Soll-Gliederung + ~80-Bilder-Programm.
> 3. Dieses Dokument — Ist-Stand, TODOs, Fallstricke, Direktiven.
>
> **Memory-Direktiven (auto-recalled):** [[project_thesis_habich_restruktur_general_to_special]] (die Struktur-Direktive),
> [[reference_thesis_git_topology_remotes_overleaf]] (commit/push BEIDE Remotes, Overleaf-Merge), [[feedback_codex_mcp_review_before_code_complete]]
> (alle Text-Änderungen codex-reviewen), [[feedback_text_agent_sessions_belong_in_thesis_not_impl_repo]] (Sessions in Thesis-Repo).

---

## 0. Sicherheitsnetz (zuerst verinnerlichen)
- **Backup-Tag `backup-20260629-pre-habich-restruktur`** (Commit `a361622`) = exakter Vor-Umbau-Stand (8 Kapitel), auf **beiden** Remotes.
  Wiederherstellung: `git -C thesis/diplomarbeit checkout backup-20260629-pre-habich-restruktur`.
- **Alt-Inhalt ist NICHT gelöscht:** `kapitel/{de,en}/01_introduction.tex … 08_conclusion.tex` + `anhang/{de,en}/A..F` existieren weiter,
  sind aber **un-included** (nicht in `diplomarbeit.tex`). Sie sind die **Inhalts-Quelle** für Stufe 3.
- **Git-Stand Ende Session:** Thesis-HEAD `023abb8`, BASE-HEAD `c625588`, beide auf GitHub(origin)+GitLab(gitlab).

## 1. Was diese Session geschah (Chronologie)
1. **Habich-Audit (Erstprüfer):** las bis tief in Kap. 4; inhaltlich richtig, aber Struktur/Hinführung mangelhaft, **Abstraktion verkehrt herum** (Spezial-Mess-System zuerst statt allgemein→speziell). → Großer Umbau 8→6 Kapitel.
2. **Planung** (2 Doks, s. o.) + **Backup-Tag** gesetzt + heutiger Overleaf-Stand integriert/gepusht.
3. **Stufe 1 — Kapitel-Skelett** (Commit `277d887`): 6 neue Kapitel DE+EN mit general→special-Übergängen + `\bildPH`/`\inhaltPH`-Platzhaltern. `diplomarbeit.tex` umgestellt; Anhänge auskommentiert; Aufgabenstellung-Refs remappt. Baut DE 34 / EN 32 S., 0 Fehler. Codex-geprüft plan-konform. **Vom User auf Overleaf abgenommen.**
4. **Stufe 2 — Bilder (Teil):** 9 Konzept-TikZ-Diagramme (Commits `32a536f`, `023abb8`) + tikz-Libraries. Baut 0 Fehler.

## 2. Neue 6-Kapitel-Struktur (Ist, gebaut)
| Neu | Datei (de+en) | Abschnitte (Labels) |
|----|----|----|
| 1 Einleitung | `01_einleitung` | sec:motivation · sec:problem · sec:rqs · sec:contributions · sec:structure |
| 2 Suchbäume+Grundlagen | `02_suchbaeume_grundlagen` | **2.1** sec:overview (Konzept+SOTA) · **2.2** sec:hardware-history · **2.3** sec:software-means |
| 3 Mess-System+PRT-ART | `03_messsystem_prtart` | sec:task-concerns · sec:sota-instances · sec:measurement-system · sec:prtart-demo · sec:heuristics |
| 4 Implementierung | `04_implementierung` | sec:repos · sec:prtart-impl · sec:axes-impl |
| 5 Evaluation | `05_evaluation` | sec:eval-method · sec:eval-results |
| 6 Fazit+Ausblick | `06_fazit` | sec:answers · sec:limitations · sec:outlook |

**Kapitel-Labels:** ch:intro · ch:foundations · ch:measurement · ch:impl · ch:eval · ch:conclusion (DE/EN identisch).
**Konstanten:** DE führt/EN folgt · Kap. 2 rein konzeptionell/visuell (KEINE Katalog-Tabellen) · Inhalt bleibt, nur Struktur/Fluss/Platzierung.

## 3. Bilder-Stand (Stufe 2)
**FERTIG (13, DE+EN, gebaut):** B1 `fig:cache-wall` (1) · B2 `fig:separability` (1) · B3 `fig:search-map` (2.1) · B5 `fig:design-space` (2.1) · B4 `fig:cache-line` (2.2) · ANAT `fig:anatomy-bridge` (2.3, Lebewesen→Achsen→Mess-System-als-Diagnostik) · B6 `fig:axis-organ` (2.3) · B7 `fig:three-levels` (2.3) · B10 `fig:heuristic-loop` (3.5) · **SYNTH `fig:synth`, USAGE `fig:usage`, GATT `fig:genera`, PATTERN `fig:patterns` (alle 2.3, geerdet an 02_fundamentals/04_concept_architecture, codex-GO, Achsen-IDs T9/T11 gegen tab:axes-overview verifiziert)**.
**Konvention:** TikZ **inline pro Sprache** (DE-Figur in `kapitel/de/`, EN-Figur in `kapitel/en/`); Libraries `arrows.meta,positioning,calc,fit,backgrounds` in `diplomarbeit.tex`. Stil: `>=Stealth`, explizite Koordinaten, `\\` nur top-level im Node (NICHT in `{\scriptsize …}`-Gruppe).
**OFFEN:** B9 PRT-ART-Demonstrator (3.4) · B12 7-Phasen-Pipeline (4.3) · **Massen:** SOTA-ALGO ~30 (2.1) · AXIS-T0..T18 19 (4.3) · UML-Landkarten (2.3) · PRTART-1..N (4.2) · **umzuziehen aus Alt-Kap.4:** `fig:m-model`,`fig:three-stage` (→3.3), `fig:one-architecture`,`fig:abi` (→2.3).

## 4. FALLSTRICKE (Codex-Validierung 2026-06-29 — KRITISCH für nächste Session)
- **[HOCH] Tabellen-Politik unentschieden (OFFENE FRAGE, s. §6):** User sagte „ALLE Tabellen → Kap. 3", aber die **Evaluations-Tabellen** `tab:workload-routing`+`tab:datasets` gehören sachlich nach Kap. 5; `tab:stage-series` ist noch nicht verankert. **Vor dem Umzug klären.**
- **[HOCH] Inhalts-Verlust-Risiko — nicht verankerte Brücken-Abschnitte:** Diese Alt-Abschnitte sind in KEINEM neuen `\inhaltPH` explizit referenziert und drohen unterzugehen:
  `sec:gap` (Forschungslücke, alt 03 — **die zentrale Brücke Problem→Mess-System!**) · `sec:workloads-basics` (alt 02) · `sec:sota-measurement`, `ssec:sota-wl-bias`, `sec:sota-design` (alt 03) · `sec:axis-framework`, `sec:axes` (alt 04). → **Stufe 3 NICHT ohne explizites Alt→Neu-Mapping starten.**
- **[HOCH] Label-/Ref-Remapping kontrolliert:** Alte Kapitel un-included → ihre Labels existieren nicht im Build. Beim Inhalts-Umzug die alten `\ref`/`\label` auf die neuen mappen. **NIEMALS** ein Alt-File wieder includen, solange das Neu-File dieselben Labels trägt (Doppel-Label-Crash).
- **[MITTEL] Anhang-Refs gebrochen:** `app:blocks`, `app:interfaces` etc. werden in (noch nicht umgezogenem) Inhalt referenziert; Anhänge sind auskommentiert. Beim Inhalts-Umzug entweder Anhänge (Stufe 4) mitziehen oder Refs zwischenzeitlich auf Platzhalter setzen, sonst undefined refs.
- **[MITTEL] Silo-Gefahr:** Die `\inhaltPH`-Platzhalter dürfen NICHT zum Wiederaufbau der alten 8-Kapitel-Silos missbraucht werden — Habich will **fließende thematische Absätze**. Beim Umzug zusammenführen, nicht 1:1 Abschnitte stapeln.
- **[MITTEL] Bild-Platzhalter zu grob:** GATT/PATTERN/USAGE/UML + die Massen stehen z. T. nur als Sammel-Freitext im `\inhaltPH`. Risiko: das ~80-Bilder-Ziel wird später ausgedünnt. → Beim Mapping je Bild einen **eigenen** Platzhalter setzen.
- **[NIEDRIG, bekannt] Overleaf-Divergenz:** Overleaf pusht auf GitHub-origin → vor jedem Push `fetch`+`merge` (kein Rebase/Force), dann BEIDE Remotes; lokale Build-PDF `20260931_…pdf` vor Merge `git checkout --` (Overleaf maßgeblich), NICHT mit-committen.
- **[NIEDRIG, bekannt] `\\`-in-Gruppe-Gotcha** (TikZ) · LF→CRLF-Warnungen sind harmlos · `\showhyphens`-Warnung ist benign (microtype/Kernel).

## 5. EMPFOHLENE Reihenfolge nächste Session (Stufe 3 vorbereiten!)
> **User-Entscheid 2026-06-29:** ZUERST Schritt 3 (restliche Konzept-Bilder SYNTH/GATT/PATTERN/USAGE → Kap. 2 visuell komplett), DANN Schritt 1–2 (Alt→Neu-Mapping) und Schritt 4 (Inhalts-Umzug).
1. **ZUERST: explizites Alt→Neu-Mapping** als Tabelle anlegen (jeder Alt-Abschnitt + jede Tabelle + jede Figur → Ziel-Abschnitt im Neu-Skelett), inkl. der nicht-verankerten Brücken (§4). Erst danach Inhalt bewegen — sonst Verlust.
2. **Tabellen-Politik final** (s. §6) + `tab:stage-series` zuordnen.
3. **Restliche Konzept-Bilder** (SYNTH/GATT/PATTERN/USAGE) — sofort machbar, datenunabhängig.
4. **Stufe 3 — Inhalt kapitelweise umziehen** (je Kapitel: Build + Codex-Review; Labels remappen; fließend zusammenführen, keine Silos). Reihenfolge sinnvoll Kap.1→6.
5. **Bilder-Massen** parallel zum jeweiligen Kapitel (SOTA-Algo mit 2.1, Achsen mit 4.3, PRT-ART mit 4.2).
6. **Stufe 4 — Anhänge** reaktivieren + anpassen (zuletzt).
7. Jede Charge: **commit+push BEIDE Remotes** + BASE-Pointer bumpen + **Codex-Review** vor „fertig".

## 6. ENTSCHIEDEN (User 2026-06-29)
1. **Tabellen-Politik:** Die **Evaluations-Tabellen** `tab:workload-routing` + `tab:datasets` bleiben in **Kap. 5** (Methodik). Die **SOTA-/Achsen-Kataloge** (`tab:axes-overview`, `tab:dialectic`, `tab:hw-sched`, `tab:wl-frameworks`, `tab:lp-catalog`, `tab:sota-profiles`, `tab:allocator-profiles`) **und** `tab:stage-series` → **Kap. 3**.
2. **Nächster Schritt:** **zuerst die restlichen Konzept-Bilder** (SYNTH/GATT/PATTERN/USAGE → Kap. 2 visuell komplett), **danach** Alt→Neu-Mapping + Stufe-3-Inhalts-Umzug.

## 7. Architektur-Konsolidierungen (gelten weiter — NICHT verwässern)
- Metapher-Kanon: **Lebewesen ≡ SearchAlgorithm** (eng) · **Anatomie = Verdrahtung zwischen Organen** · **3 Ebenen** (Gattung→Tier-Unterklasse→Organe) · **Graph = 3. Gattung** (nicht achsenloser Virus) · 19 Achsen / AA1–AA7-Allocator / Sub-Achsen-Audit (Detail im Glossar `anhang/*/C_glossary` + Sessions 06-27/06-29).
- **Mess-System = Lösung des Suchbaum-Problems** (general→special), demonstriert an PRT-ART; **Aufgabenstellung selbst-erklärend in Kap. 3**.
- **Anatomie-Metapher (Mensch→Technik)** ist Habichs visuelle Leitidee — bei allen weiteren Bildern mitdenken.

## 8. Fortschritt 2026-06-29 (Fortsetzung) — Konzept-Bilder Kap. 2.3 FERTIG
- **Erledigt:** Die vier restlichen Konzept-Bilder in §2.3 (`sec:software-means`) gezeichnet, DE+EN inline:
  `fig:synth` (Synthese SOTA→Achsen, Umkehrung `fig:design-space`) · `fig:usage` (Inter-Organ-Nutzungs-Graph,
  Allokator-Hub **T6** durchgezogen + repräsentative Kopplungen gestrichelt) · `fig:genera` (alle 3 Gattungen +
  Tier-Unterklassen, Graph = 3. Gattung; Wurzel = Reich „Animalia"/Lebewesen, NICHT mit `IExecutionEngine`
  gleichgesetzt) · `fig:patterns` (klassische GoF inkl. Abstract Factory/Template Method + die **zwei neuen
  Übersetzungszeit-Muster**: lazy-spärliche kartesische Materialisierung, typgetriebenes Quelltext-Emittieren).
- **Erdung (kein Raten):** PATTERN aus `02_fundamentals.tex` §`sec:cpp23` (ssec:classic-patterns/new-patterns);
  USAGE aus `04_concept_architecture.tex` `ssec:three-levels` (Allokator→{Layout, Wert-Ablage, Serialisierung});
  GATT aus derselben Datei (Gattung/Tier-Mapping). **Achsen-IDs gegen die echte Tabelle `tab:axes-overview`
  (04, T0–T18 fortlaufend) verifiziert** → Korrektur: Serialisierung **T9** (nicht T10=Telemetry),
  Wert-Hülle **T11** (nicht T14=I/O-Dispatch). Lehre: NIE die `axis_NN`-Verzeichnisnummern mit den T0–T18-IDs
  gleichsetzen (verschiedene Schemata).
- **Review:** Codex-Cross-Model (gpt-5.5/xhigh, read-only) — erst NO-GO (T-IDs, fehlende AbstractFactory/TemplateMethod,
  Wurzel-Label, LoF-Overfull), nach Fixes **GO**.
- **Build:** DE **36 S.** / EN **34 S.**, 0 Fehler, 0 undefinierte Refs, **0 Overfull** (LoF-Overfull via Kurz-`\caption[...]`).
- **Git:** Thesis-HEAD **`634bdfe`**, BASE-HEAD **`7399f54`**, beide auf GitHub(origin)+GitLab(gitlab). Overleaf 0/0 (kein Merge nötig).
- **NÄCHSTER SCHRITT (gemäß §5/§6):** Konzept-Bilder sind durch → jetzt **Schritt 1: explizites Alt→Neu-Mapping**
  (jeder Alt-Abschnitt/jede Tabelle/jede Figur → Ziel im Neu-Skelett, inkl. der nicht-verankerten Brücken aus §4,
  v. a. `sec:gap`), Tabellen-Politik (§6) anwenden, **dann** Stufe 3 (Inhalt kapitelweise, je Build+Codex-Review).
  Massen-Bilder (SOTA-ALGO 2.1, AXIS-T0..T18 4.3, PRTART 4.2) jeweils mit ihrem Kapitel.
