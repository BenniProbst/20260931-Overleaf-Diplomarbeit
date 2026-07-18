# Session-Übergabe 3 — Diplomarbeit: Kap. 1–3 fertig, Satz protrusion-frei, offene Arbeit + Beschaffungsliste

> **Nächste Session: HIER STARTEN.** Selbsttragend. Reihenfolge: §0 Identität → §1 Ist-Stand → **§2 WAS DU
> (USER) MANUELL BESCHAFFEN MUSST** (Paper/Datensätze) → §3 verbleibende Arbeit („Haufen") → §4 Standing
> Constraints → §5 Bau/Commit/Overleaf. Repo sauber, HEAD = `09be68d`, alles gepusht. Vorgänger-Übergaben:
> `2026-06-16-UEBERGABE-kapitel-3-start.md`, `2026-06-16-UEBERGABE-2-einleitung-ff-und-querschnitt.md`.

## §0 — Wer/Was
Thesis-Text-Workstream (TU-Dresden-Diplomarbeit „Aktive cache-bewusste Hardware-Adaption: Eine Cache-Engine
für Trie-basierte Indexstrukturen"). Repo: `…\Diplomarbeit - Datenbanken\thesis\diplomarbeit` (Git-Remote
GitHub `BenniProbst/20260931-Overleaf-Diplomarbeit`, Branch `main`; Overleaf synct über GitHub-Integration).
Code-Repos (read-only fürs Gegenprüfen): `…\Code\external\comdare-cache-engine` + `…\comdare-prt-art`.
Bilingual: `build.ps1 -Lang de|en` (pdflatex×3 + bibtex). GETRENNT vom Cluster-/Infra-Agenten und vom
cache-engine-Impl-Agenten.

## §1 — Ist-Stand (alles committet + gepusht, HEAD `09be68d`)
**Fertig + verifiziert (DE+EN):**
- **Kap. 1 Einleitung** — Motivation, Problem, **Forschungsfragen**, Zielsetzung/Beiträge, Aufbau.
- **Kap. 2 Grundlagen** — Cache-Hierarchie + 2.1.4 Cache-Update/ISA, Suchstruktur-Klassen, Vergleichsinterfaces
  (`std::map`/`std::vector`), Lasten/Workloads, wiss. Messen, C++23-Metaprog/Design-Pattern.
- **Kap. 3 Stand der Technik** — voller Instanz-Spiegel (Korpus-Cluster, Cache-Konzepte, Achsen-Sezierung mit
  6 Tabellen, Workload-Frameworks LP01–LP14, Mess-Technologien, Architektur-Design/SE, Forschungslücke).
- **Anhang C Glossar** + **Anhang F Vergleichsinterfaces** (volle `std::map`/`std::vector`-C++23-Tabellen).
- **EN-Spiegel** von Kap. 1/2/3/8 + Glossar (EN nutzt **RQ0–RQ4** statt FF0–FF4).

**Forschungsfragen-Struktur (WICHTIG, falls Overleaf alt aussah → neu kompilieren):** 5 Haupt-FF **lückenlos
FF0–FF4** + 3 eingebettete *Teilfragen*. FF0 = mit Habich eingefrorene Hauptfrage; FF1 Komposition (+Teilfrage
ISA/Cache-Update); FF2 Mess-Methodik (+Teilfrage bias-freie Knotengröße); FF3 Prüfling (+Teilfrage adaptive
Seitendarstellung); FF4 Compile-Time-vs-Laufzeit. Fazit (Kap. 8) spiegelt FF0–FF4.

**Satzqualität (frisch gebaut, beide Sprachen):** `0 Errors · 0 undefined · 0 Overfull · 0 Underfull`.
Verbleibendes Log-Rauschen NUR: 6 benigne BibTeX „empty edition" (Hersteller-Manuals, alphadin-DIN-Eigenart,
rendern korrekt) + 2 Vorlagen-Klassenhinweise (`fancyhdr`/`xcolor` in `zihpub.cls`). **Keine** davon ist ein
Fehler oder eine Protrusion. (Optionen, falls gewünscht: 6 Manuals auf `@techreport` umstellen → kennt kein
`edition`. `\hbadness/\vbadness=10000` in `diplomarbeit.tex` beruhigt kosmetische Underfull-Reports.)

**`literatur.bib`** = 96 Einträge (alle in Kap. 1–3 + Anhang zitierten Keys vorhanden, web-verifiziert).

## §2 — WAS DU (USER) MANUELL BESCHAFFEN MUSST  ← deine Frage
### (A) Paper-Volltexte via SLUB / TU-Dresden-Lizenz (AP-Z1; ich kann die PDFs nicht ziehen)
Vollständige Liste mit Begründung: **`sessions/2026-06-16-AP-Z1-beschaffungsliste.md`**. Kurz, paywalled-aber-publiziert (8):
| `\cite`-Key | P-ID | Quelle |
|---|---|---|
| `bender2005coboblivious` | P17 | SIAM J. Computing (SICOMP) |
| `saikkonen2008multilevel` | P18 | Springer LNCS (WADS 2008) |
| `saikkonen2016layout` | P19 | Springer LNCS (WADS 2016) |
| `khan2010adaptive` | P23 | IEEE Trans. Multimedia (**Eignung prüfen** — Multimedia-Kontext) |
| `naderan2016adaptivefilter` | P24 | IEEE Trans. Computers |
| `michael2004hazard` | P30 | IEEE TPDS |
| `herter2011cama` | A12 | IEEE ECRTS 2011 |
| `zhang2024pathprefix` | P26 | Elsevier FGCS (+ Volume/Issue/DOI nachtragen) |

### (B) Unpubliziert / „to appear" → Metadaten finalisieren, sobald veröffentlicht (5)
`mueller2025btreesback` (P20, SIGMOD 2025), `mahling2025hotpath` (P25, SIGMOD 2025), `zhang2025hierarchical`
(P27, ASPLOS 2025), `schmidt2025hbm` (P32, TU-Dresden-Preprint), `berthold2023vampir` (P33, DaMoN-Poster →
ggf. durch offizielle VAMPIR/OTF2-Tool-Referenz ersetzen). In der Bib stehen sie sauber mit `note={To appear}`.

### (C) Datensätze für die Experimente (Kap. 6/7, später)
Reale String-Korpora gemäß Aufgabenstellung: **url, dna, protein, xml, tpcds-id, trec-terms** (+ SOSD-Suite).
Quellen/Zugang besorgen + je eine Reproduzierbarkeits-Akte (Quelle, Prüfsumme, Zeilenzahl, Vorverarbeitung,
Seed-Regel) anlegen — die Methodik dafür ist in Kap. 6.4 schon beschrieben.

### (D) Sonst
Der übrige Korpus (33 SOTA P01–P33 + 23 Allokatoren A01–A23) ist in `literatur.bib` **bereits abgedeckt**;
für die noch ungeschriebenen Kapitel (s. §3) entsteht Bib-Bedarf erst beim Schreiben — dann nenne ich dir die
konkret fehlenden Keys. **Keine Wikipedia** (nur ACM/IEEE/DOI/Uni; Paywall via SLUB/arXiv).

## §3 — Verbleibende Arbeit (der „Haufen") — nach Status
**Größter Brocken = die noch nicht ausgeschriebenen Kapitel** (aktuell Platzhalter/Entwurf, bauen aber sauber):
- **Kap. 4 Konzept & Architektur** — Entwurf (3-Schichten-Hierarchie, Achsen-Bibliotheks-Framework). Ausbauen.
- **Kap. 5 Implementierung** — Entwurf (3 Repos, Adapter, Codegen/Flag-System). Ausbauen.
- **Kap. 6 Evaluationsmethodik** — schon substanziell (3 Messreihen A–C, ExperimentDriver-Phasen, Hypothesen
  H1–H3, Workloads/Datensätze, **Dual-OS-Experiment-Methodik §6.6 = AP-M1 erledigt**, Fairness, Explosion).
  Feinschliff + an reale Datensätze/Plattformen koppeln.
- **Kap. 7 Ergebnisse** — Platzhalter; **wartet auf echte Messläufe** (Hardware/Infra; Kap. 7 = AP-M1-Mess-Teil).
- **Kap. 8 Fazit** — FF-Antworten FF0–FF4 vorhanden (vorwärtsgerichtet); finalisieren, wenn Ergebnisse da.
- **Anhang A** (Messreihen) = Demo-Daten; **Anhang B** (Code-Struktur) + **Anhang D** (Bausteine-Matrix,
  `app:blocks`) + **Anhang E** (ADR) = Stubs/teilbefüllt → füllen.

**Offene Arbeitspakete (Tasks):**
- **#80 AP-Z1** = USER-Aktion (SLUB, §2A/B). Liste fertig.
- **#82 AP-EN** = erneut nachziehen, sobald DE-Kap. 4–8 ausgeschrieben sind (Methode: DE voll lesen → getreue
  EN-Entsprechung, Äquivalenz Pflicht, **RQ statt FF**, `\label`/`\cite` erhalten → `build.ps1 -Lang en`).
- **#83 AP-CE1** (cache-engine-Entwickler-Doku „function-handle-hops") + **#84 AP-CE2** (Nicht-YCSB-Dataset-
  Loader im Code) = **Impl-Agenten-Revier** (cache-engine-Repo, außerhalb Thesis-Text-Scope).
- **#78 AP-M1** Text fertig; Mess-LÄUFE offen (Hardware/Infra → Kap. 7).
- **Erledigt** diese + Vorsessions: #59–#79, #81, #82(Stand Kap. 1–3), AP-C1, Protrusions-/BibTeX-Bereinigung.

## §4 — Standing Constraints (bindend)
1. **Provenienz:** nur User-Ideen (`%`-Kommentare/Coding-Docs) oder zitierte Primärquellen in den Text; keine
   modell-eigene Substanz ohne Freigabe (Vorschlag → Abnahme → ausformulieren).
2. **Kein `Co-Authored-By`/Claude-Trailer** in Thesis-Commits. Commit+Push pro Schritt, **kein Rebase** (fetch+merge).
3. **DE führt, EN folgt.** Deutsche Orthografie/Umlaute korrekt.
4. **Aktuelles Doc-34-Vokabular** (Gattung-Interface > 5 Lebewesen-Unterklassen/Genus > 19 Achsen T0–T18 + 3
   Build-Achsen; M-Modell: messung_driver → CacheEngineBuilder → CacheEngine ↔ Prüfling). Nie superseded Vokabular.
5. **Aufgabenstellung neutral** (Motivation ohne Achsen/Lebewesen); Lösungsvokabular erst ab Zielsetzung.
   Messreihen A (Prüfling vs SOTA) / B (systematische Variation) / C (Merge/Regression); Granularitäten
   Micro/Makro/Gesamt-Benchmarking.
6. **#include-Prinzip:** nur tatsächlich genutztes Wissen, am realen Code/Doc-34 belegt; Agenten-Funde selbst
   gegen Code/Primärquelle gegenprüfen (AP-C1-Lektion: Agent meldete variadisches Interface fälschlich „fehlt").
7. **Keine Wikipedia** (ACM/IEEE/Uni/Vendor; SLUB/arXiv). **cache-engine/prt-art-Repos nur lesen** (Edits =
   Impl-Agent). **AP-C1-Befund:** Fundament code-belegt korrekt (19 Achsen, MeasurementCategory 16, Statistik-
   Triade/f15_compare, IObservableTier, 3 Gattungen+5 Genus, 30 SOTA+10 Allokator-Profile, PRT-ART 8 Schichten,
   variadisches 1/2/N-Interface real in `abi/type_collection_traits.hpp`). Permutations-Zahl: voller
   22-Achsen-Produktraum exakt 137.594.142.720.000 (≈1,4·10^14, Kap. 2.6) vs. lauffähige Teilmenge ~4,3·10^11
   (320 Lebewesen, Kap. 4/6/8) — beide korrekt, in der Thesis als zwei Größen sauber unterschieden.

## §5 — Bau, Commit, Overleaf
- Bauen: `& "…\thesis\diplomarbeit\build.ps1" -Lang de` bzw. `-Lang en` (cache-frei; pdflatex×3+bibtex).
- Prüfen: `diplomarbeit-de.log`/`.en.log` auf `^! `, `undefined`, `Overfull \hbox`, `Underfull` — Soll: alle 0.
  BibTeX: `diplomarbeit-de.blg` (nur 6 benigne „empty edition" erlaubt).
- **Overleaf:** Änderungen landen über GitHub. Nach jedem Push in Overleaf **„Pull GitHub changes into
  Overleaf" + neu kompilieren** — sonst zeigt Overleaf den alten Stand (war 2× die Verwirrungsquelle).
- Letzte Commits: `09be68d` (Protrusionen→0), `4a2abe2`/`bc39e0c` (BibTeX+Underfull-Bereinigung),
  `4eee1d0` (Anhang-F-Tabellen-Stil), `6b6f3e2` (AP-Z2 Bib-Fill), `688d1e3` (AP-C1), `21e4e3c` (AP-M1),
  `af7a83d` (AP-E3 FF), `6646a94`/`2ec4973`/`0373a3d`/`6fe710d` (AP-EN).

---
**Empfohlener nächster Schritt (nächste Session):** mit dem User abstimmen, welches der ungeschriebenen
Kapitel (4 Konzept / 5 Implementierung / 6 Feinschliff) als nächstes ausgearbeitet wird — eine substanzielle
Aufgabe pro 1M-Session, jeweils stichpunkt-Abnahme → ausformulieren → DE-Build → EN-Nachzug → Commit/Push.
Parallel kann der User die §2-Paper/Datensätze beschaffen.
