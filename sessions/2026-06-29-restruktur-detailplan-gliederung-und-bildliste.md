# Restruktur-Detailplan v2: Gliederung + Bildprogramm (Habich, 2026-06-29)

> Reine **Planung** (noch kein Umbau). Grundlage = Backup-Tag `backup-2026-06-29-pre-habich-restruktur`.
> **v2 = nach vertieftem Habich-Feedback** (s. Kritik-Doku §9). Prinzip: **allgemein→speziell**, fließende
> thematische Absätze statt Silos, **Kap. 2 konzeptionell/visuell (keine Tabellen)**, **alle Tabellen + die
> Aufgabenstellungs-Belange + das Mess-System in Kap. 3**, **Anatomie-Metapher als visuelle Leitidee**,
> **massive grafische Erweiterung**. Inhalt bleibt, DE führt, EN folgt. Fazit = eigenes Kap. 6.

---

## A. Ist-Inventar (was umzieht)
*8 Kapitel → 6.* Quellen je Zielabschnitt unten in eckigen Klammern. Bestehende echte Diagramme (nur 4):
`fig:m-model`, `fig:one-architecture`, `fig:abi`, `fig:three-stage`. Tabellen (14): in ch3/ch4/ch6 verstreut →
**alle nach Kap. 3** (bzw. Evaluations-Tabellen nach Kap. 5).

---

## B. Revidierte Gliederung (6 Kapitel)

### Kapitel 1 — Einleitung  *(Hinführung für Fachfremde, suchbaum-/problem-first)*
Motivation (Suchbäume überall → Cache-Wand) → Problemstellung (Trennbarkeit, cache-aware) → Forschungsfragen FF1–4 →
Zielsetzung+Beiträge (knapp) → Aufbau. [aus ch1] · Bilder **B1, B2**.

### Kapitel 2 — Suchbäume und Grundlagen  *(REIN KONZEPTIONELL + VISUELL — KEINE Katalog-Tabellen)*
*Abstraktionen, Bilder, erklärende Beschreibungen, die zeigen, wie die Grundlagen zum Problem + zur Lösung führen.*
- **2.1 Überblick (sehr breit):** (a) Landschaft der Suchstrukturen [aus ch2 Klassen, Silos→fließend], (b)
  cache-dominierte Hardware [aus ch2 Cache-Hierarchie]. · Bilder **B3, B4**.
- **2.2 Hardware-Anpassung aus der geforderten Abstraktion:** bestehende cache-bewusste Entwürfe (konzeptionell, ohne
  Katalog) → die **Idee der Achsen-Sezierung** (Suchalgorithmus = Komposition orthogonaler Achsen) → **Anatomie-Brücke**
  (Mensch→Technik) → **Entwurfsraum** → konzeptionelle Forschungslücke. [aus ch3 Cache-Konzepte + Achsen-Sezierungs-IDEE
  + ch4 Framework-Idee + ch3 Forschungslücke] · Bilder **B5, ANAT-1..3**.
- **2.3 Definition aller Bestandteile + Spezialkonstrukte + Begrifflichkeiten + wissenschaftliches Messen:** Achse=Organ /
  Anatomie=Verdrahtung; Gattungen/3-Ebenen/Tier-Metapher; **Hüllen/ABI**; besondere **Designpattern**; **Begrifflichkeiten**;
  **wissenschaftliches Messen** (Gütekriterien, Mess-Muster). [aus ch4 Eine-Architektur/3-Ebenen/ABI + ch2
  Vergleichsinterfaces/C++23-Pattern/Wissenschaftliches-Messen + ch3 Design-Pattern-Beitrag] · Bilder **B6, B7, B8, PATTERN,
  GATT, UML-*, USAGE, AXIS-T0..T18, fig:abi, fig:one-architecture**.

### Kapitel 3 — Mess-System mit PRT-ART als Demonstration  *(cache-aware-Fokus; Mess-System als LÖSUNG; ALLE Tabellen)*
*Die Aufgabenstellung wird hier SELBST-ERKLÄREND gemacht (niemand liest sie) und greift auf ALLE Belange von Kap. 2 zurück.*
- **3.1 Belange der Aufgabenstellung** (cache-aware, selbst-enthalten, im Kontext von Kap. 2). [neu verdichten aus
  Aufgabenstellung + ch1 Zielsetzung]
- **3.2 Stand der Technik als Achsen-Instanzen (systematisch, mit Tabellen):** `tab:axes-overview`, `tab:dialectic`,
  `tab:hw-sched`, `tab:wl-frameworks`, `tab:lp-catalog`, `tab:sota-profiles`, `tab:allocator-profiles`. [aus ch3
  Achsen-Sezierung/Workload-/Mess-Instanzen + ch4 Dialektik]
- **3.3 Das Mess-System:** M-Modell [`fig:m-model`] → Drei-Stufen/Messreihen A/B/C [`fig:three-stage`, `tab:stage-series`]
  → Permutations-Explosion+Reduktion. [aus ch4 M-Modell/Builder + ch6 Messreihen/Explosion]
- **3.4 PRT-ART als Demonstrator** (steckt ins System, überschreibt einige Organe). [aus ch4 PRT-ART] · Bild **B9**.
- **3.5 Schärfung durch Heuristiken** (Mess→Profil→Konfiguration-Schleife). [aus ch4 Heuristik + ch6
  Von-Messung-zu-Heuristiken] · Bild **B10**.

### Kapitel 4 — Implementierung und konkrete Algorithmusbestandteile  *(Detail; Bild je PRT-ART-Algorithmus)*
- **4.1 3-Repository-Architektur** + Engine-Terminologie. [aus ch5]
- **4.2 PRT-ART-Schlüsselstellen — je Algorithmus ein Bild + Beschreibung** (nach kurzem bekanntem SOTA): 4+2-Pool-Allokator,
  Path-Oriented-Prefetch, OLC-Nebenläufigkeit, Wert-Hüllen, Knoten-Typen, kohärenz-schonende Telemetrie. [aus ch5
  Concurrency/Telemetrie + PRT-ART-Detail] · Bilder **PRTART-1..N**.
- **4.3 Alle Ebenen des Mess-Systems (Detail):** Adapter (SOTA+Allokatoren), Permutations-Codegen+Flags, Concept/CRTP-Achsen,
  **7-Phasen-ExperimentDriver-Pipeline**. [aus ch5 + ch6 ExperimentDriver-Phasen] · Bild **B12**.

### Kapitel 5 — Evaluation  *(Methodik → Analyse, zusammengelegt; Evaluations-Tabellen)*
- **5.1 Methodik:** Hypothesen, Workloads+Datensätze [`tab:workload-routing`, `tab:datasets`], Plattformen, Fairness. [aus ch6]
- **5.2 Ergebnisse+Analyse:** Auswertungs-Pipeline, Reihe A/B/C, Achsen-Sensitivität, Diskussion. [aus ch7]

### Kapitel 6 — Fazit und Ausblick
Forschungsfragen-Antworten · Limitierungen · Ausblick. [aus ch8]

*(Anhänge A–F: anpassen, sobald Gesamtbild klar — zurückgestellt.)*

---

## C. Bildprogramm (Habich: „bildhafter Mensch" — Bilder zählen NICHT zum 60–80-S.-Text)
*ALLE zeichnen (Stil: TikZ wie bisher). ⭐ = Habichs Kern-Wünsche.*

**I. Hinführung/Konzept (Kap. 1–2.2)**
| ID | Konzept | Kap. | Skizze |
|----|---------|------|--------|
| B1 | Cache-Wand | 1 | Latenz-Pyramide Reg→L1→L2→L3→RAM, wachsende Lücke |
| B2 | Trennbarkeits-Problem | 1 | Monolith-Blackbox vs. zerlegbare Achsen |
| B3 | Such-Struktur-Landkarte | 2.1 | Taxonomie: Vergleich/Digital/Hash/Räumlich/Flach |
| B4 | Cache-Hierarchie + Cache-Line | 2.1 | Pyramide + Cache-Line mit belegten/leeren Bytes (CLU) |
| B5 ⭐ | **Entwurfsraum (kartesisches Produkt)** | 2.2 | Achsen-Würfel/Gitter; SOTA = ein Punkt |

**II. Anatomie-Brücke (Habichs visuelle Leitidee — Mensch → Technik)** ⭐
| ID | Konzept | Kap. | Skizze |
|----|---------|------|--------|
| ANAT-1 | Menschliche Anatomie (Organe + Verdrahtung) | 2.2 | Körper mit Organen; Organe wirken zusammen |
| ANAT-2 | Übertragung Mensch→Technik | 2.2 | Organ↔Achse, Anatomie↔Verdrahtung, Körper↔Such-Algorithmus |
| ANAT-3 | Mess-System als „Diagnostik" | 2.2/3 | medizinische Messung je Organ ↔ Mess-System je Achse |

**III. Architektur-/Interface-Landkarten (Kap. 2.3)** ⭐
| ID | Konzept | Skizze |
|----|---------|--------|
| B6 | Achse=Organ, Anatomie=Verdrahtung | Organe + generalisierte Interfaces dazwischen |
| B7 | 3-Ebenen / Tier-Metapher | Wurzel→Gattungen→Tier-Unterklassen→Organe (erw. `fig:one-architecture`) |
| B8 | Hüllen / ABI-Adapter | Lebewesen in ABI-Hülle, Modulgrenze, SearchEngine-Sicht (+`fig:abi`) |
| GATT | **Alle Gattungen** | SearchAlgorithm / Container (Set/Sequence/Adapter/View) / Graph |
| PATTERN | **Entwurfsmuster** | klassische + 2 neue Metaprog-Pattern, bildhaft |
| USAGE ⭐ | **Welche Achse nutzt welche** | gerichteter Graph der Inter-Organ-Nutzung (z. B. Allokations-Interface) |
| UML-* | **UML-Landkarten aller Code-Interfaces** | Klassendiagramme: IExecutionEngine, IAnatomyBase, SearchAlgorithmAnatomy<C>, AbiAdapter, IVirus, Concept-Schicht … (mehrere Diagramme) |
| AXIS-T0..T18 ⭐ | **Pro Achse ein Bild** (19) | je Achse: beitragende Algorithmen + Code-Beschreibung des **Achsen-Interfaces** |

**IV. Mess-System (Kap. 3)**
| ID | Konzept | Skizze |
|----|---------|--------|
| — | M-Modell | **vorhanden** `fig:m-model` (umplatzieren) |
| — | Drei-Stufen-Prüfung | **vorhanden** `fig:three-stage` (umplatzieren) |
| B9 | PRT-ART-Demonstrator | PRT-ART im M-Modell, überschreibt einige Organe |
| B10 ⭐ | **Heuristik-Schleife** | Messung→XML-Profil→Konfiguration→zurück in Filter |

**V. Implementierungs-Detail (Kap. 4)**
| ID | Konzept | Skizze |
|----|---------|--------|
| B12 | 7-Phasen-Mess-Pipeline | Enumerate→Codegen→Compile→Load→Execute→Measure→Persist |
| PRTART-1..N ⭐ | **Je PRT-ART-Algorithmus ein Bild** | 4+2-Pool-Allokator, Path-Prefetch, OLC, Wert-Hüllen, Knoten-Typen, Telemetrie … (jeweils Bild + Beschreibung) |

**Umfang grob:** ~12 Konzept- + 3 Anatomie- + ~6 Landkarten- + **19 Achsen-** + mehrere UML- + ~6–10 PRT-ART- + 4
wiederverwendete = **~50 Abbildungen**. Das ist der grafische Kern des Umbaus.

---

## D. Status / Nächste Schritte
- **Persistiert** (dieser Stand): Kritik-Doku (mit §9) + dieser Detailplan v2. Backup-Tag gesetzt, Stand auf beiden Remotes.
- **Noch offen vor Umsetzung:** Feinschnitt 2.2↔2.3; genaue UML-Diagramm-Liste; Reihenfolge der Bild-Erstellung;
  ob Achsen-Bilder (AXIS-T0..T18) in 2.3 ODER teils in Kap. 4 (Detail).
- **Vorgehen (bestätigt):** erst Planung/Bildliste abstimmen → dann (a) Kapitel-Skelett mit Übergängen, (b) Bilder, (c)
  Inhalt kapitelweise umziehen (je Build + Codex-Review). Anhänge zuletzt.
