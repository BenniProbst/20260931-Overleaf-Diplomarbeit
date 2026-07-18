# Restruktur-Detailplan v3: Gliederung + Bildprogramm (Habich, 2026-06-29)

> Reine **Planung** (noch kein Umbau). Grundlage = Backup-Tag `backup-20260629-pre-habich-restruktur`.
> **v3 = Kap. 2 als Dreischritt Konzept→Hardware→Software + präzisierte Bild-Platzierung** (s. unten).
> Prinzip: **allgemein→speziell**, fließende Absätze statt Silos, **Kap. 2 konzeptionell/visuell (keine Tabellen)**,
> **alle Tabellen + Aufgabenstellungs-Belange + Mess-System in Kap. 3**, **Anatomie-Metapher als visuelle Leitidee**,
> **massive grafische Erweiterung**. Inhalt bleibt, DE führt, EN folgt. Fazit = eigenes Kap. 6.
> **Vorgehen vom User vorbehaltslos bestätigt:** Skelett (Überschriften+Übergänge) → Bilder → Inhalt kapitelweise umziehen
> (je Build + Codex-Review) → Anhänge zuletzt.

---

## A. Ist-Inventar
*8 Kapitel → 6.* Bestehende echte Diagramme (4): `fig:m-model`, `fig:one-architecture`, `fig:abi`, `fig:three-stage`.
Tabellen (14): **alle nach Kap. 3** (Evaluations-Tabellen nach Kap. 5).

---

## B. Gliederung (6 Kapitel)

### Kapitel 1 — Einleitung *(Hinführung, suchbaum-/problem-first)*
Motivation (Suchbäume überall → Cache-Wand) → Problemstellung (Trennbarkeit, cache-aware) → FF1–4 → Beiträge (knapp) →
Aufbau. [aus ch1] · Bilder **B1, B2**.

### Kapitel 2 — Suchbäume und Grundlagen *(KONZEPTIONELL+VISUELL, KEINE Tabellen; Dreischritt **Konzept→Hardware→Software**)*
*Die **Abstraktions-Verantwortlichkeiten** werden konzeptionell bereits in **2.1** verortet und in **2.3** mithilfe der
statischen Hardware + Compile-Time-Elemente aus **2.2** umgesetzt.*
- **2.1 Konzept + Stand-der-Technik-Überblick:** (a) Landschaft der Suchstrukturen; (b) **Überblick der bekannten Verfahren**
  — **JEDER einzelne Paper-Algorithmus bildhaft im Detail** (die später Achsen bilden). Hier wird die Abstraktion
  *konzeptionell verortet*. [aus ch2 Klassen + ch3 SOTA-Überblick] · Bilder **B3, B5 (Entwurfsraum-Konzept), SOTA-ALGO-1..M**.
- **2.2 Hardware (historisch):** die **historische Einführung von Hardware zur Optimierung der Suchalgorithmus-Performance**
  — Cache-Hierarchie/Cache-Line/TLB/Kohärenz, **statische + compile-time-relevante** Hardware-Eigenschaften. [aus ch2
  Cache-Hierarchie + ch3 Cache-Konzepte] · Bilder **B4**.
- **2.3 Software (Mittel + Synthese):** mit welchen **Software-System-Mitteln** (Compile-Time, statische Hardware-Nutzung aus
  2.2, Metaprogrammierung) die Abstraktion **umgesetzt** wird; die **bildhafte Zusammenführung für unsere Belange**
  (SOTA-Algorithmen → unsere Achsen); Achse=Organ/Anatomie=Verdrahtung, Gattungen/3-Ebenen/Tier-Metapher, **Hüllen/ABI**,
  besondere **Designpattern**, **Begrifflichkeiten**, **wissenschaftliches Messen**; **Anatomie-Brücke** (Mensch→Technik, leitet
  zum Mess-System über). [aus ch4 Eine-Architektur/3-Ebenen/ABI + ch2 Vergleichsinterfaces/C++23-Pattern/Wiss-Messen + ch3
  Design-Pattern-Beitrag] · Bilder **SYNTH, B6, B7, B8, GATT, PATTERN, USAGE, UML-*, ANAT-1..3, fig:abi, fig:one-architecture**.

### Kapitel 3 — Mess-System mit PRT-ART als Demonstration *(cache-aware-Fokus; Mess-System als LÖSUNG; ALLE Tabellen)*
*Die Aufgabenstellung wird hier SELBST-ERKLÄREND gemacht (niemand liest sie), greift auf ALLE Belange von Kap. 2 zurück.*
- **3.1 Belange der Aufgabenstellung** (cache-aware, selbst-enthalten, im Kontext von Kap. 2). [neu verdichten]
- **3.2 Stand der Technik als Achsen-Instanzen (systematisch, Tabellen):** `tab:axes-overview`, `tab:dialectic`,
  `tab:hw-sched`, `tab:wl-frameworks`, `tab:lp-catalog`, `tab:sota-profiles`, `tab:allocator-profiles`. [aus ch3 + ch4 Dialektik]
- **3.3 Das Mess-System:** M-Modell [`fig:m-model`] → Drei-Stufen/Messreihen A/B/C [`fig:three-stage`, `tab:stage-series`] →
  Permutations-Explosion+Reduktion. [aus ch4 M-Modell/Builder + ch6]
- **3.4 PRT-ART als Demonstrator.** [aus ch4 PRT-ART] · Bild **B9**.
- **3.5 Schärfung durch Heuristiken.** [aus ch4 Heuristik + ch6] · Bild **B10**.

### Kapitel 4 — Implementierung und konkrete Algorithmusbestandteile *(Detail)*
- **4.1 3-Repository-Architektur** + Engine-Terminologie. [aus ch5]
- **4.2 Bekannter Stand der Technik (kurz) → je PRT-ART-Algorithmus ein Bild + Beschreibung:** 4+2-Pool-Allokator,
  Path-Oriented-Prefetch, OLC, Wert-Hüllen, Knoten-Typen, kohärenz-schonende Telemetrie. [aus ch5 + PRT-ART-Detail] · Bilder
  **PRTART-1..N**.
- **4.3 Achsen-Implementierung + alle Mess-System-Ebenen:** **je Achse das Gesamtkonzept-Bild (AXIS-T0..T18)** + Achsen-Interface
  (Concept/CRTP); Adapter (SOTA+Allokatoren), Permutations-Codegen+Flags, **7-Phasen-ExperimentDriver-Pipeline**. [aus ch5 + ch6
  ExperimentDriver-Phasen] · Bilder **AXIS-T0..T18, B12**.

### Kapitel 5 — Evaluation *(Methodik → Analyse; Evaluations-Tabellen)*
- **5.1 Methodik:** Hypothesen, Workloads+Datensätze [`tab:workload-routing`, `tab:datasets`], Plattformen, Fairness. [aus ch6]
- **5.2 Ergebnisse+Analyse:** Auswertungs-Pipeline, Reihe A/B/C, Achsen-Sensitivität, Diskussion. [aus ch7]

### Kapitel 6 — Fazit und Ausblick
Forschungsfragen-Antworten · Limitierungen · Ausblick. [aus ch8] *(Anhänge A–F: anpassen, sobald Gesamtbild klar.)*

---

## C. Bildprogramm *(Habich „sehr bildhaft"; Bilder zählen NICHT zum 60–80-S.-Text; Stil TikZ; ⭐ = Kern-Wünsche)*

**Bild-Platzierung (v3-Präzisierung):**
- **Detail-Verbildlichung JEDES Paper-Algorithmus → Kap. 2.1** (SOTA-Überblick).
- **Bildhafte Zusammenführung für unsere Belange (Synthese) → Kap. 2.3.**
- **Achsen-Gesamtkonzept-Bilder (T0–T18) → Kap. 4** (mit der Implementierung).
- **Je PRT-ART-Algorithmus ein Bild → Kap. 4.**

| ID | Konzept | Kap. | Skizze |
|----|---------|------|--------|
| B1 | Cache-Wand | 1 | Latenz-Pyramide, wachsende Lücke |
| B2 | Trennbarkeits-Problem | 1 | Monolith vs. zerlegbare Achsen |
| B3 | Such-Struktur-Landkarte | 2.1 | Taxonomie: Vergleich/Digital/Hash/Räumlich/Flach |
| B5 ⭐ | **Entwurfsraum (Konzept)** | 2.1 | Achsen-Würfel; SOTA = ein Punkt |
| SOTA-ALGO-1..M ⭐ | **Je Paper-Algorithmus ein Detailbild** | 2.1 | ART, HOT, START, SuRF, Wormhole, B²-Baum … (~30) |
| B4 | Cache-Hierarchie + Cache-Line | 2.2 | Pyramide + Cache-Line (belegt/leer, CLU) |
| SYNTH ⭐ | **Synthese SOTA→unsere Achsen** | 2.3 | Paper-Bausteine fließen in die Achsen-Matrix |
| ANAT-1..3 ⭐ | **Anatomie-Brücke (Mensch→Technik)** | 2.3 | Organe+Verdrahtung ↔ Achsen; Mess-System=Diagnostik |
| B6 | Achse=Organ, Anatomie=Verdrahtung | 2.3 | Organe + generalisierte Interfaces dazwischen |
| B7 | 3-Ebenen / Tier-Metapher | 2.3 | Wurzel→Gattungen→Tier-Unterklassen→Organe (erw. `fig:one-architecture`) |
| B8 | Hüllen / ABI-Adapter | 2.3 | Lebewesen in ABI-Hülle, Modulgrenze (+`fig:abi`) |
| GATT | **Alle Gattungen** | 2.3 | SearchAlgorithm / Container (Set/Seq/Adapter/View) / Graph |
| PATTERN | **Entwurfsmuster** | 2.3 | klassische + 2 neue Metaprog-Pattern |
| USAGE ⭐ | **Welche Achse nutzt welche** | 2.3 | gerichteter Inter-Organ-Nutzungs-Graph |
| UML-* ⭐ | **UML-Landkarten aller Code-Interfaces** | 2.3 | Klassendiagramme aller Interface-Strukturen (mehrere) |
| — | M-Modell | 3.3 | **vorhanden** `fig:m-model` |
| — | Drei-Stufen-Prüfung | 3.3 | **vorhanden** `fig:three-stage` |
| B9 | PRT-ART-Demonstrator | 3.4 | PRT-ART im M-Modell, überschreibt Organe |
| B10 ⭐ | **Heuristik-Schleife** | 3.5 | Messung→XML-Profil→Konfiguration→Filter |
| PRTART-1..N ⭐ | **Je PRT-ART-Algorithmus ein Bild** | 4.2 | 4+2-Pool, Path-Prefetch, OLC, Wert-Hüllen, Knoten-Typen, Telemetrie |
| AXIS-T0..T18 ⭐ | **Je Achse das Gesamtkonzept-Bild** (19) | 4.3 | Achse als generalisiertes Interface/Organ + beitragende Algorithmen |
| B12 | 7-Phasen-Mess-Pipeline | 4.3 | Enumerate→…→Persist |

**Umfang grob:** ~5 Hinführung + ~30 SOTA-Algo + 1 Synthese + 3 Anatomie + ~6 Landkarten + mehrere UML + 2 Mess + ~6–10
PRT-ART + 19 Achsen + 4 wiederverwendete ≈ **~80 Abbildungen**. Der grafische Teil ist der Hauptaufwand.

---

## D. Status / Nächste Schritte
- **Persistiert:** Kritik-Doku (mit §9) + dieser Detailplan v3 + Projekt-Memory. Backup-Tag gesetzt; beide Remotes.
- **Vorgehen (bestätigt, vorbehaltslos):** (1) **Kapitel-Skelett** mit Überschriften + Übergangs-Absätzen (general→special-Bogen)
  → (2) **Bilder** abgestimmt zeichnen → (3) **Inhalt kapitelweise umziehen** (je Build + Codex-Review) → (4) **Anhänge** zuletzt.
- **Noch offen vor Start:** keine blockierenden Punkte mehr; beim Skelett klären wir den Feinschnitt 2.1↔2.2↔2.3 und die genaue
  UML-Diagramm-Liste am konkreten Text.
