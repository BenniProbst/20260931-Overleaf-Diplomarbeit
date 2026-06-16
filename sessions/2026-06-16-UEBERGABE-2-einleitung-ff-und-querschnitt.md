# Session-Übergabe 2 — Diplomarbeit Kap. 1–3 (Einleitung/FF-Stand + Querschnitt) — 2026-06-16

> **Für die nächste Session: HIER STARTEN.** Selbsttragend. Zuerst §2 (nächste Aufgabe = Forschungsfragen
> ausformulieren, Struktur + Texte stehen unten), dann §5 (verbleibende APs). Repo ist sauber committet
> (HEAD = `228f822`); es gibt KEINE uncommitteten Änderungen. Vorgänger-Übergabe: `2026-06-16-UEBERGABE-kapitel-3-start.md`.

## §0 — Wer/Was
Thesis-Text-Workstream (TU-Dresden-Diplomarbeit „Aktive cache-bewusste Hardware-Adaption: Eine Cache-Engine
für Trie-basierte Indexstrukturen"). GETRENNT vom Infra-/Cluster-Workstream und vom cache-engine-Impl-Agenten.
Reihenfolge Kap. 2 → 3 → 1. **Kap. 2 + 3 sind vollständig + verifiziert; Kap. 1 fast fertig — es fehlt nur
noch die Ausformulierung der Forschungsfragen (AP-E3).**

## §1 — Aktueller Stand (Commits, alle gepusht; Repo `…\thesis\diplomarbeit`, branch main, kein Rebase)
- **Kap. 2 Grundlagen:** vollständig (`b68771a` u. a.).
- **Kap. 3 Stand der Technik:** vollständiger Instanz-Spiegel (3.1 Überblick+Korpus-Cluster · 3.2 Cache · 3.3
  Achsen-Sezierung 19+3 Achsen · 3.4 Workloads LP01–LP14 · 3.5 Messen · 3.6 Architektur-Design/SE · 3.7
  Forschungslücke-Capstone). Commits `f301508` (3.3), `45fd0b0` (3.5), `1a3b45b` (3.6), `f078b6e`
  (Querschnitt-Korrekturen + 3.7).
- **Kap. 1 Einleitung = FERTIG:** AP-E4 (Zielsetzung/Schichten) + AP-E5 (Aufbau) = `b504ad9`; AP-E2 (Glossar
  Anhang C + Ränge-Fußnote) = `228f822`; **AP-E3 (Forschungsfragen) ✅ ERLEDIGT 2026-06-16** (5 Haupt-FF +
  3 Teilfragen, Einleitung + Fazit synchron — s. §2).
- **Querschnitt-Verifikation** (16-Agenten-Workflow) durchgeführt + bestätigte Abweichungen korrigiert
  (`f078b6e`), dauerhaft dokumentiert in `sessions/2026-06-16-kap3-instanz-mapping-survey.md` §I.
- Alle DE-Builds sauber: 76 S., **0 undefined, 0 multiply-defined, 0 Overfull > 50 pt** (`build.ps1 -Lang de`,
  MiKTeX). microtype + `\emergencystretch=3em` in `diplomarbeit.tex`.

## §2 — ✅ ERLEDIGT (2026-06-16): AP-E3 Forschungsfragen ausformuliert
> Umgesetzt: `sec:rqs` in `kapitel/de/01_introduction.tex` = 5 Haupt-FF **lückenlos FF0--FF4** (FF4 =
> Compile-Time/Laufzeit, vormals Kandidat „FF5" — auf User-Wunsch kontiguierend umnummeriert). Die 3
> ergänzenden Kandidaten sind als unnummerierte \emph{Teilfragen} eingebettet: FF4-ISA→unter FF1, FF6-Knotengröße
> →unter FF2, FF7-Seitendarstellung→unter FF3. Ränge-Fußnote übernommen; C01-1/2/3 entfernt. Fazit
> `kapitel/de/08_conclusion.tex` strukturgleich nachgezogen (FF0 + FF4 ergänzt + Teilfrage-Klauseln). DE-Build
> sauber (76 S., 0 undefined/multiply, 0 Overfull > 50 pt). **Kapitel 1 ist damit fertig.** Original-Plan unten belassen.

### (Original-Plan) AP-E3 Forschungsfragen ausformulieren (Struktur REVIDIERT, Texte fertig)
**User-Entscheidung (2026-06-16):** Die gekürzten **5 Haupt-FF verwenden** (FF0 + FF1/2/3 + FF5); die
zusätzlichen Kandidaten **FF4/FF6/FF7 als Teilpunkte** den bestehenden FF zuordnen (NICHT als eigenständige FF
— Web-Norm 3–5, Habich warnt vor „zu breit"). Quelle aller Texte = Recherche-Workflow `wd6rmji01` (Termine +
Paper + Web), provenienz-belegt; **die kanonische Hauptfrage FF0 ist mit Habich beim Scope-Freeze
eingefroren (Termin 5, T5-NA §7) → MUSS rein.**

**Ort:** `kapitel/de/01_introduction.tex`, `\section{Forschungsfragen}\label{sec:rqs}` (aktuell: 3 alte
`%`-Kommentare C01-1/2/3 + `\begin{description}` mit den alten FF1/FF2/FF3; FF3 trägt bereits die Ränge-Fußnote
aus AP-E2). **Beim Ausformulieren:** die alten FF1–3 + die 3 Kommentare ersetzen durch die untenstehende
Struktur; die **Ränge-Fußnote in den neuen FF3 übernehmen**; C01-1/2/3 entfernen (E2 + E3 dann erledigt).

**Struktur (5 Haupt-FF; je mit eingerückten Teilpunkten):**

- **FF0 (Hauptfrage, eingefroren T5):** Wie stark verbessern \emph{aktive, messgetriebene} cache-bewusste
  Entscheidungen --- Seitentyp, Speicher-Layout, Value-Ablage und Prefetching --- die Leistung trie-basierter
  Suchstrukturen gegenüber \emph{passiven, statisch ausgelegten} Varianten auf unterschiedlichen CPU-Plattformen
  (Hybrid-CPUs, Sapphire Rapids)?
- **FF1 (Komposition):** Wie lässt sich ein Suchalgorithmus-Entwurf kanonisch in orthogonale Achsen zerlegen,
  sodass SOTA-Verfahren bias-frei aus ihrem Originalcode als Achsen-Profile rekonstruierbar + permutierbar
  werden, und welche Achsen-Kopplungen (Knotentyp × SIMD × Pfadkompression) begrenzen die Einzelachsen-Isolation?
  - *Teilpunkt (aus FF4):* Wie verhält sich dieselbe achsen-konstante Struktur im Cache-Update-/Cache-Line-Füll-
    verhalten, wenn allein die ISA-/SIMD-Achse (SSE2/AVX2/AVX-512, NEON/SVE2, RVV) variiert wird --- welche
    publizierten HW-Optimierungen sind ISA-portabel statt x86-spezifisch?
- **FF2 (Mess-Methodik):** Wie muss eine reproduzierbare Mess-Pipeline mit Hardware-Zähler-Erhebung gestaltet
  sein, damit jede Achsen-Permutation fair (ceteris paribus, gleiche Compiler-/Flag-Basis) in drei Messreihen
  (A--C) × drei Granularitäten (Micro-/Makro-/Gesamt-Benchmarking) gemessen wird, und wann gilt eine Plattform
  als erfolgreich verifiziert?
  - *Teilpunkt (aus FF6):* Wie lassen sich widersprüchliche Literaturbefunde zur optimalen Knoten-/Cache-Line-
    Größe (1 Cache-Line CSS/CSB⁺ vs. bis 16 bei Hankins/Patel) durch achsen-isolierte ceteris-paribus-Messung
    bias-frei nachmessen statt aus inkompatiblen Original-Setups übernehmen?
- **FF3 (Prüfling-Vergleich):** Gewinnt PRT-ART gegenüber den (acht Rang-1 + Rang-2/3) SOTA-Profilen
  \footnote{**Ränge-Fußnote hierher übernehmen** — aus aktuellem FF3.} nicht durch asymptotische Neuheit,
  sondern durch bessere Mikroarchitektur-Eigenschaften (höhere CLU, weniger LLC-/dTLB-Misses, geringere
  Branch-Kosten, kleinere heiße Suchpfade) bei Exact-/Prefix-Lookup und Prefix-Enumeration unter A--C?
  - *Teilpunkt (aus FF7):* Welche lokale Seitendarstellung (8-/16-Bit-Punkt- vs. -Kompaktseite) ist je
    Verzweigungspunkt am günstigsten, und nach welchen plattform-kalibrierten Umschaltregeln (Reihenfolge
    Array₂₅₆ → Array₆₅₅₃₅ → Vector⟨u8,u8⟩ → Vector⟨u16,u16⟩ je Füllstand/Suchtyp) wird adaptiv gewechselt?
- **FF5 (Compile-Time vs. Laufzeit):** Welche Achsen-Eigenschaften müssen zur Übersetzungszeit fixiert werden
  (provenienz-nachweisbare, plattform-optimierte Binary je Permutation), und welche können/müssen zur Laufzeit
  gewählt werden (bit-codierter Permutations-Identifier, adaptive Layout-Selection), ohne die Vergleichbarkeit
  (gleiche Compiler-/Flag-Basis) zu verletzen?

**Mapping auf Aufgabenstellung-Teilaufgaben:** FF1↔T1/T2, FF2↔T4/T5, FF3↔T3/T6, FF5↔T2/T4, FF0 = Dachfrage.
**Belege je FF/Teilpunkt** (Termin-/Paper-Quellen) stehen im Workflow-Output (s. §6); beim Ausformulieren als
Fließtext-Forschungsfragen ohne interne Quell-IDs, Belege via späterer Zitate (AP-Z2). Danach DE-Build prüfen.

## §3 — STANDING CONSTRAINTS (unverändert, bindend)
1. **Provenienz:** nur Autor-Ideen (`%`-Kommentare/Coding-Docs) oder zitierte Primärquellen in den Text; keine
   modell-eigene Substanz ohne Freigabe. Workflow: Stichpunkte/Vorschlag → Abnahme → ausformulieren.
2. **Kein `Co-Authored-By`-Trailer** in Thesis-Commits.
3. **DE führt, EN folgt** (AP-EN). Deutsche Orthografie/Umlaute korrekt. Commit+Push pro Schritt, kein Rebase.
4. **Aktuelles Doc-34-Vokabular** (Gattung-Interface > 5 Lebewesen-Unterklassen > 19 Achsen; M-Modell
   messung_driver → CacheEngineBuilder → CacheEngine ↔ Prüfling); NIE superseded (F1–F29/4-Ebenen/3-Säulen).
   Schichten-Vokabular-Entscheidung: **Doc-34 primär, „ExecutionEngine→SearchEngine→SearchEngineType" nur als
   einmaliges Mapping** (in Zielsetzung bereits so gesetzt).
5. **Aufgabenstellung** (`aufgabenstellung/de.tex`) hält Motivation/Problem bewusst NEUTRAL (Entwurfsraum-
   Vokabular, KEINE Achsen/Lebewesen) — Lösungsvokabular erst ab Zielsetzung. Messreihen: A = Prüfling vs. SOTA,
   **B = systematische Variation der Entwurfsentscheidungen**, C = Merge/Regression; Granularitäten =
   Micro/Makro/Gesamt-Benchmarking. (FF3 + Beiträge sind bereits darauf korrigiert.)
6. **#include-Prinzip:** nur tatsächlich genutztes Wissen, am realen Code/Doc-34 belegt. Agenten = Hinweise →
   selbst gegen Code/Doc/Web verifizieren.
7. **Comdare/BEP-Venture-UG-Provenienz** des Achsen-Konzepts (urspr. UltiHash-Deduplikation) ist in 3.6.3 +
   Zielsetzung verankert — bei Bedarf konsistent halten.

## §4 — Querschnitt-Verifikation: erledigt + Residuen
**Erledigt** (16-Agenten-Workflow `wasu9ns5q`, §I im Survey-Doc): Code-Fakten, Zahlen, Vokabular, Sach-Claims,
fast alle Bib-Einträge bestätigt; korrigiert: P20 = „B-Trees Are Back" (nicht LeanStore), Kuehn-P28-Counter =
persönliche Kommunikation, 4 Bib-Fehler (CoCo/START/B²-Baum/Qureshi), 33-vs-30-Klarstellung.
**Residuen (NICHT Thesis-DE-Scope):** (a) **EN-`hw-sched`-Tabelle „P20 LeanStore"** → bei **AP-EN** fixen (EN
wird ohnehin aus finalem DE neu gezogen). (b) **cache-engine-Repo (Impl-Agent):** `docs/bausteine/
03_cross_paper_konzeptmatrix.md` Z.152 „P20 LeanStore" + `permutation_axes.xml` „11 Achsen REV7.6" = SUPERSEDED.

## §5 — Verbleibende Arbeitspakete (nach AP-E3)
- **#71 AP-E3** (FF) ← NÄCHSTES, Struktur in §2.
- **#81 AP-Z2** Bib-Fill: literatur.bib ist schon weit (alle in Kap. 1–3 zitierten Keys vorhanden + verifiziert);
  Rest = noch nicht zitierte Korpus-Paper bei Bedarf. **#80 AP-Z1** SLUB-Beschaffung historischer/Exoten-PDFs.
- **#74 AP-C1** Code-Gegenprüfung: durch die Querschnitt-Verifikation weitgehend erledigt (Text↔Code stimmt).
- **#82 AP-EN** EN-Kapitel aus finalem DE nachziehen (inkl. EN-P20-Fix aus §4a).
- **#78 AP-M1** Experiment-OS (Talos + root-Ubuntu) + Kap. 6 Plattformen; **#79 AP-G5-Anhang** Voll-Interface-
  Tabellen; **#83 AP-CE1**/**#84 AP-CE2** = Impl-Agent (cache-engine).
- Erledigt: #59–#69 (AP-E1, G1–G8, S1, S2), #70 (E2), #72 (E4), #73 (E5), #75–#77.

## §6 — Schlüssel-Dokumente + Workflow-Outputs
| Doc | Pfad | Zweck |
|---|---|---|
| Instanz-Survey + Verifikation | `sessions/2026-06-16-kap3-instanz-mapping-survey.md` (§A–§I) | Instanz-Map + #include-Korrektur + Querschnitt-Befund |
| Aufgabenbeschreibung | `sessions/2026-06-15-aufgabenbeschreibung-kapitel-1-3-kommentare.md` | AP-Liste, Maschinen, Workloads |
| Vorgänger-Übergabe | `sessions/2026-06-16-UEBERGABE-kapitel-3-start.md` | Kap.-3-Start-Stand |
| Aufgabenstellung | `aufgabenstellung/de.tex` | offizieller Auftrag (neutral, Teilaufgaben 1–6) |
| FF-Recherche-Output | Temp `…\tasks\wd6rmji01.output` (vergänglich!) — **FF-Texte sind in §2 oben dauerhaft gesichert** | 8 FF-Kandidaten + Synthese (Empfehlung 5) |
| Querschnitt-Output | Temp `…\tasks\wasu9ns5q.output` (vergänglich) — **Kern in Survey §I gesichert** | Verifikations-Befunde |

## §7 — Lektionen / Entscheidungen dieser Session
- Agenten-Surveys sind doc-/web-stark, aber unzuverlässig → **immer selbst gegen Code/Primärquelle gegenprüfen**
  (Querschnitt deckte reale Fehler auf: P20-LeanStore, Kuehn-Counter, 3 Bib-Venues).
- Glob ohne `path` wurzelt in `system32` → Grep/PowerShell mit absolutem Pfad.
- `build.ps1` ist cache-frei (pdflatex×3+bibtex); Overfull-Restfälle via `\emergencystretch` (microtype war schon da).
- FF: Web-Norm Master/Diplom = 3–5 FF; Habich (Termin-7-Sprechpunkt 3) warnt vor „zu breit, zu wenig tief" →
  daher 5 Haupt-FF + Teilpunkte statt 8 eigenständige.

---
**HEAD bei Übergabe: `228f822`.** Nächster konkreter Schritt: AP-E3 / `sec:rqs` in `kapitel/de/01_introduction.tex`
nach der Struktur in §2 ausformulieren (5 Haupt-FF + FF4/6/7 als Teilpunkte, Ränge-Fußnote übernehmen,
C01-1/2/3 entfernen), dann DE-Build prüfen + committen. Danach Kap. 1 fertig → verbleibende APs (§5).
