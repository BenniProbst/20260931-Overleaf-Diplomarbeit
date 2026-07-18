# Session-Übergabe — Diplomarbeit Kapitel 1–3 (Thesis-Text-Workstream) — 2026-06-16

> **Für die nächste Session: HIER STARTEN.** Diese Übergabe ist selbsttragend. Zuerst die 3 Schlüssel-Docs
> (§4) lesen, dann bei §3 (nächste Aufgabe = Kapitel 3 ausformulieren) weitermachen. Die inhaltliche
> Vorarbeit (Instanz-Spiegel) ist FERTIG + gesichert — es geht direkt ans Schreiben von Kapitel 3.

---

## §0 — Wer/Was (Identität dieses Workstreams)
- **Thesis-Text-Workstream** (TU-Dresden-Diplomarbeit, comdare cache-engine). **GETRENNT** vom
  Infrastruktur-/Cluster-Workstream UND vom cache-engine-Implementierungs-Agenten (Code-Renames etc. macht
  der Impl-Agent, nicht dieser Workstream).
- **Mission (`/compact`-Auftrag):** Aus den Dutzenden `%`-Verbesserungs-Kommentaren des Autors in Kap. 1–3
  referenzierte Arbeitspakete machen + abarbeiten. Kernideen kommen IMMER vom Autor (belegt durch seine
  Kommentare/Coding-Docs); ich puzzle nur nach seinen Wünschen zusammen. Fokus: **Einleitung (Kap. 1),
  Grundlagen (Kap. 2), Stand der Technik (Kap. 3)**. Reihenfolge: **Kap. 2 → 3 → 1.**

## §1 — Aktueller Stand (Commits, Repo)
- **Repo:** `C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\thesis\diplomarbeit`
  Remote: `github.com/BenniProbst/20260931-Overleaf-Diplomarbeit` (branch `main`). **kein Rebase** (fetch+merge).
- **✅ Kapitel 2 (Grundlagen) VOLLSTÄNDIG ausformuliert** (DE): `kapitel/de/02_fundamentals.tex` — Commit
  **`b68771a`**. Struktur: 2.1 Cache-Hierarchie/Bewusstheit (2.1.1–2.1.5), 2.2 Klassen von Suchstrukturen
  (2.2.1 etablierte Untergliederung m. 5 \subsubsection, 2.2.2 Container, 2.2.3 Framework-Einordnung),
  2.3 Einheitliche Vergleichsinterfaces (std::map/std::vector + Dynamik-Ebenen), 2.4 Lasten/Workloads
  (Frameworks plural), 2.5 Wissenschaftliches Messen, 2.6 C++23-Metaprog + Design-Pattern.
  Alle `%`-Kommentare des Autors BELASSEN (Chapter-End-Kommentar C02-8 noch drin — erst nach Kap. 3 räumen).
- **✅ Instanz-Mapping-Survey FERTIG + gesichert** — Commit **`af0941e`**: `sessions/2026-06-16-kap3-instanz-mapping-survey.md`.
  Das ist der **vollständige Instanz-Spiegel** (jede Kap.-2-Definition → ALLE Paper-Instanzen P01–P33 + A01–A23
  + Web), erhoben von 4 read-only Agenten. **Treibt Kap. 3.**
- **✅ Korpus erweitert (Design-Space-Linie)** — Commit **`16cb5fa`**: `literatur.bib` +`kraska2018learned`,
  `idreos2007cracking`, `halim2012stochastic` (Autor-Entscheidung 2026-06-16: „voll aufnehmen").
- **⏳ Kapitel 3 (Stand der Technik): NOCH NICHT umgeschrieben.** Liegt aktuell **cluster-zentrisch** vor
  (`kapitel/de/03_state_of_the_art.tex`: Intro + 3.1 Cluster A … 3.9 Forschungslücke). **Ziel = Instanz-Spiegel**
  (siehe §3). Englische Kapitel (`kapitel/en/`) sind STALE — werden erst NACH finalem DE nachgezogen (AP-EN).

## §2 — STANDING CONSTRAINTS (immer einhalten — kritisch)
1. **Provenienz-Governance** ([[feedback_thesis_nur_user_ideen_persistieren]]): In den .tex NUR Ideen, die
   (a) vom Autor (seine `%`-Kommentare / cache-engine-Coding-Docs) oder (b) zitierte Primärquellen sind.
   Modell-eigene Ideen NIE ohne ausdrückliche Freigabe — nur als „Vorschlag" im Chat, Autor prüft + weist an.
2. **Workflow je AP:** belegte Stichpunkte/Gliederung → **Autor-Abnahme** → erst dann ausformulieren (DE).
3. **KEIN `Co-Authored-By: Claude`-Trailer** in Thesis-Commits (akademische Autorschaft).
4. **`#include`-Prinzip:** Grundlagen/SoTA führen NUR tatsächlich genutztes Wissen ein, am realen Code +
   Entstehungs-Docs belegt (read-only Agenten erlaubt; Agenten = Hinweise → selbst verifizieren).
5. **Quellen:** keine Wikipedia (ACM/IEEE/Uni/Vendor; Paywall via SLUB/arXiv) ([[feedback_quellen_keine_wikipedia_nur_direktquellen]]).
6. **READ-ONLY** in `Z:\Dokumente\Uni Dresden\…\Großer Beleg - Latency-aware RDMSim` (nicht schreiben/extrahieren).
   Der Große Beleg liegt als PDF unter `…\Diplomarbeit - Datenbanken\thesis\20250917_Großer_Beleg.pdf` (eigener,
   LRDMSim/Snowflake, design-pattern-lastig).
7. **Aktuelles Vokabular (Doc 34), NIE superseded:** GATTUNG (3 Interfaces: SearchAlgorithm/Container/Graph) >
   5 Lebewesen-Unterklassen > 19 Achsen (Organe). VERBOTEN im Text: F1–F29 ICacheStrategy, 4-Ebenen-Strategie
   (A/B/C/D), 3-Säulen, alte-11-Achsen.
8. **DE führt, EN folgt** (AP-EN). Deutsche Orthografie/Umlaute korrekt. Commit+Push pro Schritt.
9. **`.%`-Falle:** Inline-`%`-Kommentar direkt nach Satzpunkt frisst den Satzabstand → Beleg-TODO-Kommentare
   auf eigene Zeile setzen.

## §3 — NÄCHSTE AUFGABE: AP-S1 — Kapitel 3 als Instanz-Spiegel ausformulieren
Die Vorbedingung des Autors (verbatim: *„das zweite Kapitel muss unter allen Aspekten per Webrecherche und
gegen alle Paper je Absatz geprüft werden, um gezielt alle Instanzen der Kapitel 2 Definitionen zu finden"*)
ist **ERFÜLLT** → Ergebnis im Survey-Doc (`af0941e`). Jetzt Kap. 3 schreiben.

**Vom Autor abgenommene Gliederung (Instanz-Spiegel zu Kap. 2):**
- **3.1 Überblick + Sezierungs-Prinzip** — wie fremde Algorithmen in Organe (Achsen) zerlegt werden.
- **3.2 Cache-Konzepte (↔ 2.1)** — Instanzen aus Survey §A (P11/P12/P14/P15/P16/P17/P18/P19/P01/P02/P05/P27/P28/P32 …).
- **3.3 Achsen-Sezierung (↔ 2.2) — KERN** — je Achse die beitragenden Paper-Organe (Survey §B-Tabelle).
  *Granularität (kleine offene Entscheidung):* entlang der 19 Achsen, gruppiert nach der 2.2-Struktur —
  beim Schreiben kurz mit Autor rückkoppeln, falls unklar.
- **3.4 Workload-Frameworks (↔ 2.4)** — Frameworks plural (YCSB + SOSD + TPC + RocksDB + SPEC + … ); Survey §13
  der Aufgabenbeschreibung + die Framework-Umfrage.
- **3.5 Wissenschaftliches Messen (↔ 2.5)** — PMC/Profiler/Histogramme/Simulator + **TU-Dresden-Habich-Linie
  P31/P32/P33** (Survey §C).
- **3.6 Architektur-Design / SE von Suchalgorithmen (↔ 2.6) = AP-S2** — **jetzt mit Design-Space-Linie:**
  Idreos Periodic Table + Data Calculator (schon zitiert) + NEU `kraska2018learned` / `idreos2007cracking` /
  `halim2012stochastic`; VEGA/AirIndex/Survey via AP-Z1 nachziehen. Pattern am Code belegt (Survey §D).
- **3.7 Forschungslücke** — **ehrlich** die Lücken aus Survey §E ausweisen: io_dispatch/migration/räumliche
  Klasse = 0 Instanzen; filter/queuing/Exoten/Hashing = je 1; concurrency/value_handle spärlich. Das stützt
  zugleich den **Bias-Bruch** (das Framework treibt ALLE Achsen je Lebewesen, auch die von Einzelpapern nie betrachteten).

**Vorgehen (wie bei Kap. 2 bewährt):** pro Abschnitt belegte Stichpunkte aus dem Survey-Doc ziehen → die
konkrete Paper-Achsen-Zuordnung gegen `bausteine/03` + `bausteine/01` + Doc 18 **selbst gegenprüfen**
(Survey §F) → Autor-Abnahme → ausformulieren. **NICHT** geforderte Detailtiefe zu Kurzabsätzen kollabieren
(Lektion AP-G4). Bestehende Substanz von Kap. 3 (Paper, Tabellen, Forschungslücke) in die neue Struktur
übernehmen, nicht verlieren.

## §4 — Schlüssel-Dokumente (zuerst lesen)
| Doc | Pfad | Zweck |
|---|---|---|
| **Instanz-Survey** | `sessions/2026-06-16-kap3-instanz-mapping-survey.md` | Instanz-Spiegel §A–§F → treibt Kap. 3 |
| **Aufgabenbeschreibung** | `sessions/2026-06-15-aufgabenbeschreibung-kapitel-1-3-kommentare.md` | §0–§13: Compliance, AP-Liste, Maschinen, Workloads |
| **Zwischenstand Maschinen/Dual-OS** | `sessions/2026-06-15-zwischenstand-maschinen-cache-os-dualos-2.1.md` | Flotte, Dual-OS (Talos+root-Ubuntu), B+-Baum |
| Governance-Memory | `…\.claude\…\memory\feedback_thesis_nur_user_ideen_persistieren.md` | Provenienz + kein Trailer + #include |
| Kap. 2 (fertig, Referenz) | `kapitel/de/02_fundamentals.tex` | Definitions-Klassen, die Kap. 3 spiegelt |
| Korpus-Quellen | superproject `docs/forschungslandkarte/01_quellen_gesamtkatalog.md` (56 Paper) + `docs/bausteine/03_cross_paper_konzeptmatrix.md` + `bausteine/01_bausteine_matrix.md` + cache-engine `docs/architecture/34_…md` + `18_achsen_algorithmus_paper_code_map.md` | Paper-Achsen-Zuordnung zum Gegenprüfen |

## §5 — Offene Arbeitspakete (Task-IDs)
- **#68 AP-S1 (in_progress):** Kap. 3 Instanz-Spiegel ausformulieren ← **NÄCHSTER SCHRITT (§3).**
- #69 AP-S2: 3.6 Architektur-Design/SE (Design-Space-Linie). #70 AP-E2: Glossar SOTA + Ränge. #71 AP-E3:
  Forschungsfragen erweitern. #72 AP-E4: Zielsetzung/Beiträge schärfen. #73 AP-E5: Aufbau + Umfang 60–80 S.
- #74 AP-C1: Code-Gegenprüfung. #78 AP-M1: Experiment-OS Produktionsmaschinen (Talos + root-Ubuntu) + Kap. 6.
- #79 AP-G5-Anhang: Voll-Funktions-Tabelle std::map/std::vector. #80 AP-Z1: Zitat-Beschaffung SLUB
  (+ VEGA/AirIndex/Survey verifizieren). #81 AP-Z2: Bib-Fill ~54 Paper. #82 AP-EN: EN nachziehen.
  #83 AP-CE1: cache-engine-Doc „function-handle-hops". #84 AP-CE2: Nicht-YCSB-Frameworks im Code (Impl-Agent).

## §6 — Wichtige Lektionen (nicht wiederholen)
- **AP-G4-Lektion:** geforderte Detailtiefe NICHT zu Kurzabsätzen kollabieren / Autor-Korrekturkommentare
  nicht löschen (sonst „Aufgabe nicht erledigt").
- **Agenten unzuverlässig:** Beispiele falscher Agenten-Claims real aufgetreten (consteval-SHA256, SOSD@P05) →
  je Aussage selbst gegen Docs/Code verifizieren, bevor in den Text.
- **Glob ohne `path` wurzelt in `system32`** → Grep/PowerShell mit absolutem Pfad nutzen.
- **`.%`-Spacing-Falle** (siehe §2.9).

---
**Letzter Commit dieser Session: `16cb5fa`.** Nächster konkreter Schritt: AP-S1 / Kap. 3.1 Stichpunkte aus
Survey ziehen, selbst gegenprüfen, dem Autor zur Abnahme vorlegen.
