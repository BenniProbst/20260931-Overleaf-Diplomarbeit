# Konsolidierungs-Liste — Hinweise aus den Overleaf-Ergänzungen des Autors (2026-06-21)

> **Anlass:** Auftrag „finde meine Ergänzungen als Hinweise auf weitere Änderungen, die noch durch das
> Gesamtdokument konsolidiert werden müssen." **Quelle der Ergänzungen:** Overleaf-Commits
> `904f07a` (Motivation), `2056a8b` (Aufgabenstellung), `8c728c2` (Zielsetzung/Intro), `b09219b` (Abstract).
> **Methode:** Multi-Agent-Workflow `wgnkgi1a6` (6 Konzept-Agenten + Synthese), 6 Konzepte C1–C6.
>
> **Kern-Befund:** Der dominierende Mangel ist **EN-Äquivalenz** — die DE-Ergänzungen (C2 Build-Modi/Observer,
> C3 ExecutionEngine-Werkzeuge, C5 Trennbarkeit, C4 Metapher) fehlen in EN **inhaltlich** (nicht nur
> übersetzungsseitig). C1 (autonome Heuristik-Erstellung) ist durchgängig korrekt als **Zielsetzung/Ausblick**
> markiert — kein Status-Widerspruch, nur Ausarbeitungs-Lücken. C6 ist im Kern konsistent.
>
> **Klassen:** `[TEXT]` = reine Text-Konsolidierung (Text-Agent allein). `[DOC]` = gegen Architektur-Doc
> (Doc 36) prüfen. `[IMPL]` = Inhalt gegen Code/Pipeline (`experiment_driver.cpp`) verifizieren.

---

<!-- WORKFLOW-SYNTHESE (wgnkgi1a6) -->

# Konsolidierungs-Liste — Synthese C1–C6 (Bilingual-Audit Thesis)

> **Legende:** `[TEXT]` = reine Text-Konsolidierung, vom Text-Agent allein machbar (kein Code-Bezug). `[IMPL]` = Aussage beschreibt Code/Pipeline-Verhalten — Formulierung ist Text-Arbeit, aber Inhalt muss gegen Code/Architektur-Doc (z.B. Doc 36, `experiment_driver.cpp`) verifiziert werden, bevor geschrieben wird. `[DOC]` = Abgleich gegen externe Architektur-Doku nötig (nicht im Thesis-Quellbaum). Belegt sind die zentralen Stellen direkt an der Quelle (diplomarbeit.tex, kapitel/de+en/01, kapitel/de/04).

## Priorität HOCH

| ID | Konzept | Ort (Datei / Abschnitt) | Konkrete Aktion | Klasse | Sprachen |
|----|---------|--------------------------|-----------------|--------|----------|
| H1 | C2 Build-Modi + Observer on/off | `diplomarbeit.tex` EN-Abstract (`\abstracten`, Z.86–105) | Drei-Modi-/Observer-Gedanken ergänzen, parallel zur DE-Verankerung. EN sagt nur „deliver the best recombination as a standalone binary" (Z.105) — Zusatz z.B. „…as a standalone, ABI-stable binary, optionally with or without measurement observer for debug, measurement, or release." | `[TEXT]` | EN |
| H2 | C2 Build-Modi + Observer on/off | `kapitel/en/01_introduction.tex` (Objectives, nach Z.96 „…the body of this living being") | Observer-on/off-Satz einfügen analog DE Z.110 („wahlweise mit oder ohne Mess-Observer für Debug, Messung oder Release"). **Verifiziert: fehlt in EN.** | `[TEXT]` | EN |
| H3 | C3 ExecutionEngine liefert Werkzeuge je Gattung | `kapitel/en/01_introduction.tex` (zwischen Z.99 „…not a parallel construct" und Z.99 „The concept of the axis architecture…") | Fehlenden Satz spiegeln: DE Z.114–115 „Die ExecutionEngine liefert für alle Gattungen, die Mess-Heuristik-Optimierung unterstützen sollen, die notwendigen Werkzeuge." **Verifiziert: fehlt in EN komplett.** ABER zuerst H7 klären (welche Werkzeuge). | `[TEXT]`→nach H7 | EN |
| H4 | C5 Trennbarkeit der Bestandteil-Gewichtungen | `aufgabenstellung/en.tex` (~Z.19, Problemteil) | Gewichtungs-Trennbarkeitsproblem ergänzen (in DE vorhanden: „Gewichtungen über Verbesserungen einzelner Algorithmus-Bestandteile derzeit nicht trennbar"). EN nennt nur „incompatible setups". Satz z.B. „…the weights of improvements from individual algorithm components remain inseparable." | `[TEXT]` | EN |
| H5 | C5 Trennbarkeit der Bestandteil-Gewichtungen | `kapitel/en/01_introduction.tex` (Problem Statement, Z.29–36) | Trennbarkeits-Aussage spiegeln (DE-Problemstellung formuliert dasselbe). EN fokussiert auf „incompatible measurement environments" statt auf nicht-trennbare Einzelbeiträge. | `[TEXT]` | EN |
| H6 | C5 Trennbarkeit der Bestandteil-Gewichtungen | `kapitel/de/06_evaluation_methodology.tex` (Micro-Benchmarking) **+** `kapitel/de/07_results_evaluation.tex` (Intro Achsen-Sensitivität) | Expliziten Bogen Problem→Lösung schließen: ein Satz, der die drei-granulare Methodik als direkte Antwort auf das Trennbarkeits-Problem der Aufgabenstellung benennt. Danach EN angleichen. | `[TEXT]` | DE+EN |
| H7 | C3 ExecutionEngine — Rollen-Widerspruch | `kapitel/de/04_concept_architecture.tex` Z.79 vs. Z.109–111 vs. `kapitel/de/01_introduction.tex` Z.114 | Drei divergierende Charakterisierungen derselben Entität hierarchisieren: ExecutionEngine = (1) Wurzel/abstraktes Interface „über allem Messbaren" (Z.79), (2) OS-Primitiven-Provider (Z.110: cache-line-aligned Allok., NUMA-Read-Pin, coherence-aware Write), (3) Werkzeug-Träger für Mess-Heuristik (Z.114). **Verifiziert: alle drei Stellen real.** Eine konsistente Rollendefinition festlegen, dann H3 darauf stützen. | `[DOC]` (Abgleich Doc 36) | DE+EN |
| H8 | C4 Baum-Wurzel-Fächer-Metapher | `kapitel/de/01_introduction.tex` Z.30 vs. `kapitel/en/01_introduction.tex` (Motivation) | Metapher „als wären sie der einzige Fächer einer Baum-Wurzel" fehlt in EN (EN sagt nur „occupy a restricted subset of the dimensions"). EN um äquivalente Metapher erweitern (z.B. „as if they were the sole fan of a tree root") **oder** DE-Metapher angleichen. Empfehlung: EN erweitern (Metapher bewahren). | `[TEXT]` | EN |
| H9 | C6 ABI-Schicht vs. Anatomie-Ebenen | `diplomarbeit.tex` EN-Abstract Z.92–98 | „three-layer ABI (CacheEngine→ExecutionEngine→SearchEngine)" und die drei Anatomie-Ebenen (Gattung/Lebewesen/Organe) sind orthogonal, werden im Abstract aber verschmolzen. Klar trennen: „three-layer module view" (ABI) vs. „three-layer anatomical model". **Verifiziert: Abstract Z.92–93 nennt nur ABI-Sicht.** | `[TEXT]` | DE+EN |
| H10 | C1 Autonome Heuristik-Auswertung | `kapitel/de/06_evaluation_methodology.tex` (Ende, nach „Permutations-Explosion und Reduktion") | Neue Schluss-Sektion „Von Messergebnissen zu Heuristiken": (1) Mess-CSV→Heuristik-Regeln, (2) XML-Lastprofil als Austauschformat, (3) Wiederverwendung durch andere Nutzer (Aufgabenstellung: „wiederverwendbar, um automatisch Heuristiken zu erstellen"). Eng mit C1/Kap.4 abstimmen. | `[IMPL]` | DE+EN |
| H11 | C1 Autonome Heuristik-Auswertung | `kapitel/de/04_concept_architecture.tex` (neuer Unterabschnitt) | Unterabschnitt „Heuristik-Profil-Auswertung und Binary-Selection-Logik": (1) Rangbildung aus Reihen A/B/C → Heuristik-Entscheidung (Regel-Engine / Weighted-Scoring); (2) welche Achsen-Eigenschaften einfließen; (3) XML-Lastprofil-Struktur skizzieren. Nur konzeptionell (Ausblick), da Impl. „als Erweiterung vorgesehen". | `[IMPL]` | DE+EN |

## Priorität MITTEL

| ID | Konzept | Ort (Datei / Abschnitt) | Konkrete Aktion | Klasse | Sprachen |
|----|---------|--------------------------|-----------------|--------|----------|
| M1 | C4 Wort-Doppelung | `kapitel/de/01_introduction.tex` Z.102 | „Auf die Analogie des architektonischen Aufbaus **als Analogie** zur menschlichen Anatomie" → erste „als Analogie" streichen: „…des architektonischen Aufbaus zur menschlichen Anatomie". **Verifiziert: Doppelung real, EN hat sie nicht.** | `[TEXT]` | DE |
| M2 | C5 expliziter Problem→Lösung-Bogen | `kapitel/de/01_introduction.tex` (1.2 Problemstellung, Z.34–41) | Satz ergänzen, der „Gewichtungen einzelner Bestandteile sind nicht trennbar" explizit nennt (derzeit nur „Achsen"/„Entwurfsentscheidungen"). | `[TEXT]` | DE+EN |
| M3 | C5 expliziter Problem→Lösung-Bogen | `kapitel/de/04_concept_architecture.tex` (Ende Abschn. „Achsen-Bibliotheks-Framework") | Satz: modulare Austauschbarkeit löst das Trennbarkeits-Problem der Aufgabenstellung (Bogen aktuell implizit). | `[TEXT]` | DE+EN |
| M4 | C3 ExecutionEngine im M-Modell | `kapitel/de/04_concept_architecture.tex` (M-Modell, Z.62–63 DE / Z.56 EN) | M-Modell nennt 4 Subsysteme (Mess-Treiber, CacheEngineBuilder, CacheEngine, Prüfling) — ExecutionEngine fehlt dort, ist aber Wurzel. Textuell klären: 5. Ebene über M / Teil von CacheEngine / Interface aller vier. | `[DOC]` | DE+EN |
| M5 | C3 Terminologie „Werkzeug" | `kapitel/de/05_implementation.tex` Z.14 vs. `kapitel/de/01_introduction.tex` Z.114 | „Werkzeug-Bibliothek" (= CacheEngine, Kap.5) vs. „Werkzeuge für Mess-Heuristik" (= ExecutionEngine, Kap.1) schärfen, damit kein Begriffs-Kurzschluss. Hängt an H7. | `[TEXT]` | DE+EN |
| M6 | C1 Implementation-Roadmap | `kapitel/de/08_conclusion.tex` (Ausblick) | Absatz „Heuristik-Automation und Binary-Delivery": noch zu implementierende Komponenten (Heuristics-Engine, XML-Parser, Binary-Packager), Abhängigkeit (erst nach End-to-End-Messreihen), offene Entscheidung (Regel-Engine vs. ML). | `[IMPL]` | DE+EN |
| M7 | C1 Heuristik-Grundlagen | `kapitel/de/02_fundamentals.tex` (neuer Unterabschnitt nach Cache-Bewusstheit) | „Heuristiken und ihre Automatisierung": Definition Heuristik im Cache-Kontext, statisch (Compile-Time) vs. dynamisch (Laufzeit), Heuristik-Funktion als Mapping Messergebnis→Konfiguration. | `[TEXT]` | DE+EN |
| M8 | C1 Glossar-Synchronisation | `anhang` Glossar (Anhang C) | Einträge: „Autonome Heuristik-Profil-Auswertung" (Abgrenzung adaptive/dynamic/measurement-driven), „XML-Lastprofil-Ergebnis", EN-Äquivalent „autonomous profile-driven heuristic evaluation" (nicht nur „automatic selection"). | `[TEXT]` | DE+EN |
| M9 | C1 Heuristik-Extraktion in Methodik | `kapitel/de/06_evaluation_methodology.tex` (ExperimentDriver-Phasen) | Phase „Heuristics Extraction" (XML-Generierung, Regel-Synthese, Profil-Speicherung) + Auswahl-Logik (Kriterien je Workload/Datensatz) + Schnittstelle XML-Profil→Compile-Time-Konfiguration. | `[IMPL]` | DE+EN |
| M10 | C6 „dynamische Zusammensetzung" | `diplomarbeit.tex` Abstract (DE+EN) + `kapitel/de/01_introduction.tex` Z.93–96 | „dynamisch permutierbar / dynamic composition through permutation" explizit machen (Aufgabenstellung Z.42 „dynamische Zusammensetzung der verteilten Algorithmus Konzepte" = Permutation, nicht Laufzeit-Adaption). | `[TEXT]` | DE+EN |
| M11 | C6 „verteilte … Konzepte" | `diplomarbeit.tex` EN/DE-Abstract | „verteilt" = über viele strukturelle Stellen des Algorithmus (Aufgabenstellung Z.30–31). Im Abstract präzisieren: „distributed/scattered design decisions" statt nur „design space dimensions". | `[TEXT]` | DE+EN |
| M12 | C6 Multi-Framework-Begriff | `diplomarbeit.tex` EN-Abstract Z.92 | Klarstellen: EIN Framework, das mehrere **Workload**-Frameworks integriert (YCSB + weitere) — nicht mehrere konkurrierende Engines. Begriff „multi-framework" ist mehrdeutig; im Text vermeiden. | `[TEXT]` | DE+EN |
| M13 | C3 EN-Konsistenz 2. Pass | `kapitel/en/*` (alle), `diplomarbeit.tex` EN-Abstract | Nach H7-Klärung: alle EN-Kapitel nach ExecutionEngine-Erwähnungen durchsuchen, Abstract ggf. nachziehen, Konsistenz-Check. | `[TEXT]` | EN |

## Priorität NIEDRIG

| ID | Konzept | Ort (Datei / Abschnitt) | Konkrete Aktion | Klasse | Sprachen |
|----|---------|--------------------------|-----------------|--------|----------|
| N1 | C6 YCSB-Granularitäten | `diplomarbeit.tex` EN-Abstract Z.99–101 | „…whole algorithms under YCSB load profiles" umformulieren, damit nicht der Eindruck entsteht, nur die 3. Granularität nutze YCSB: „…three granularities … evaluated under YCSB load profiles". | `[TEXT]` | EN (DE prüfen) |
| N2 | C6 Point-in-design-space | `diplomarbeit.tex` EN-Abstract Z.99–100 | „reconstructed as explicit configurations (points in the design space)" ergänzen (geometrische Präzision aus DE/Aufgabenstellung). | `[TEXT]` | EN |
| N3 | C5 Forward-Referenz | `aufgabenstellung/de.tex` (Ende) | Kurzer Vorwärtsverweis: Trennbarkeit wird durch Achsen-Framework (Kap.4) + drei-granulare Methodik (Kap.6) realisiert. | `[TEXT]` | DE+EN |
| N4 | C4 Metapher-Vorbereitung | `kapitel/de/02_fundamentals.tex` (2.2 Klassen von Suchstrukturen) | Optionaler Nebensatz, der die gemeinsame „Anatomie" aller Suchalgorithmen andeutet → sanftere Transition zu Kap.4. | `[TEXT]` | DE+EN |
| N5 | C4 Metapher-Konsistenz Achsen | `kapitel/en/04_concept_architecture.tex` (Building-Block Axes) | „each organ in a different expression" statt nur „each in a different expression" — Organ-Metapher konsistenter halten. | `[TEXT]` | EN |
| N6 | C2 Aufgabenstellung Build-Modi | `aufgabenstellung/de.tex` + `en.tex` (Zielsetzung) | Optional: Build-Modi/Observer-Idee als Architektur-Entscheidung ergänzen, falls seit Aufgabenvergabe hinzugekommen. | `[TEXT]` | DE+EN |
| N7 | C3 ExecutionEngine in Phasenliste | `kapitel/de/04` + `kapitel/de/06` (ExperimentDriver-Phasen) | Bekannte Lücke F6: zwei 7-Phasen-Listen vereinheitlichen (gegen `experiment_driver.cpp`); ExecutionEngine in Phase Load/Execute verorten. | `[IMPL]` | DE+EN |

## Querschnitts-Befunde (gelten für mehrere Einträge)

- **EN-Äquivalenz ist der dominierende Mangel.** C2, C3, C5 sind in DE konsistent verankert, aber in EN **konzeptionell unvollständig** (nicht nur Übersetzungs-, sondern Inhalts-Lücken). Verifiziert an der Quelle: EN-Intro endet an Z.96/99 vor den DE-Sätzen Z.110 (Observer) und Z.114 (Werkzeuge); EN-Abstract Z.105 nennt nur „standalone binary" ohne Modi.
- **C1 ist durchgängig korrekt als „Zielsetzung/Ausblick" markiert** (diplomarbeit.tex Z.105/127; Intro Z.140–144; Kap.4 „als Erweiterung vorgesehen"). **Kein Konsistenz-Konflikt** — die Lücken (H10/H11/M6–M9) sind reine *Ausarbeitungs*-Ergänzungen, kein Status-Widerspruch. NICHT als „erledigt" darstellen.
- **C6 ist im Kern konsistent** (finden/zerlegen/messen, EINE Architektur, 30 Profile, 3 Granularitäten, Ziel-Framing). Befunde sind Präzisierungen, keine Widersprüche.
- **Verifikations-Pflicht vor `[DOC]`/`[IMPL]`-Einträgen:** H7, M4, N7 berühren Architektur-Aussagen, die gegen externe Doku (Doc 36) bzw. `experiment_driver.cpp` zu prüfen sind — **keine Textänderung ohne diesen Abgleich** (Befund C3 mahnt das ausdrücklich an).


## Empfohlene Reihenfolge

EMPFOHLENE REIHENFOLGE (Begründung: erst blockierende Klärungen, dann reine Text-Spiegelung EN, dann Ausarbeitung, zuletzt Feinschliff)

PHASE 0 — Blockierende Architektur-Klärung (muss VOR abhängigen Text-Edits):
1. H7 (ExecutionEngine-Rollen hierarchisieren, Abgleich Doc 36) — entsperrt H3, M5, M13.
2. M4 + N7 (ExecutionEngine im M-Modell / in Phasenliste, Abgleich Code) — gleiche Klärungsrunde wie H7, da dieselbe Entität.
   → Diese 3 sind [DOC]/[IMPL]: NICHT raten, gegen Doc 36 + experiment_driver.cpp verifizieren. Wenn unklar: Rückfrage statt Erfindung.

PHASE 1 — Reine EN-Spiegelung bestehender DE-Inhalte (schnell, risikoarm, Text-Agent allein, [TEXT]):
3. H1, H2 (C2 Observer/Modi in EN-Abstract + EN-Intro)
4. H3 (C3 Werkzeug-Satz in EN — JETZT, da H7 die Formulierung geklärt hat)
5. H4, H5 (C5 Trennbarkeit in aufgabenstellung/en + EN-Intro)
6. H8 (C4 Fächer-Metapher in EN)
7. H9 (C6 ABI- vs. Anatomie-Ebenen im Abstract trennen)

PHASE 2 — DE-interne Schärfung + Bilingual-Bögen ([TEXT]):
8. M1 (Wort-Doppelung Z.102 — trivialer Fix)
9. H6, M2, M3 (C5 Problem→Lösung-Bogen in DE Kap.1/4/6/7, dann EN angleichen)
10. M5 (Werkzeug-Terminologie, hängt an H7)
11. M10, M11, M12 (C6 dynamisch/verteilt/multi-framework präzisieren)

PHASE 3 — Inhaltliche Ausarbeitung C1 (umfangreicher, [IMPL]: Inhalt gegen Pipeline-Realität prüfen):
12. H11 (Kap.4 Heuristik-Selection-Logik — konzeptioneller Anker)
13. H10 (Kap.6 „Von Messergebnissen zu Heuristiken")
14. M9 (Kap.6 Heuristics-Extraction-Phase)
15. M7 (Kap.2 Heuristik-Grundlagen)
16. M6 (Kap.8 Implementation-Roadmap)
17. M8 (Glossar-Einträge + EN-Äquivalente) — nach 12–16, da Begriffe dann stabil

PHASE 4 — Feinschliff & Konsistenz-Endlauf ([TEXT]):
18. N1, N2 (Abstract-Präzisierungen)
19. N3, N4, N5, N6 (Forward-Ref, Metapher-Vorbereitung/-Konsistenz, optionale Aufgabenstellung)
20. M13 (EN-Gesamt-Konsistenz-Pass für ExecutionEngine + Abstract-Nachzug) — ABSCHLUSS, nach allen Inhalts-Änderungen

WICHTIG: PHASE 0 zuerst, weil 6 spätere Einträge (H3, M5, M13, N7-Folge) inhaltlich von der ExecutionEngine-Rollenklärung abhängen. PHASE-1-Spiegelungen schließen die gravierendsten Bilingual-Lücken (C2/C3/C5 fehlen in EN konzeptionell) mit minimalem Risiko. PHASE 3 ist der einzige größere Schreibblock und sollte nicht vor PHASE 1 begonnen werden, damit die Ziel/Ausblick-Konsistenz (C1) nicht versehentlich als „erledigt" umgedeutet wird.

