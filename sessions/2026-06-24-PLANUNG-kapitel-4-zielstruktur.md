# PLANUNG — Kapitel 4 „Konzept und Architektur": Ziel-Struktur (2026-06-24)

> Ergebnis der Multi-Agent-Planungssession (Text-Agent, code-unabhängig, geerdet an ch1–3 + Anhang D
> + Vorwärts-/Rückwärts-Verweisen ch5–8 + kanonischem Architektur-Modell). **Rollen:** Text-Agent
> (diese Datei, .tex-Prosa/Struktur) plant + schreibt; **Code-Bezug/-Verifikation = Implementierungs-Agent**
> (separat, vom Autor koordiniert). Stand ch4: 199-Zeilen-Skelett (7 §§ + 1 §§§). Build der Arbeit: 0/0.

## 0. Kanonisches Architektur-Modell (VERBINDLICH, faithful halten)
EINE Hierarchie, **kein Parallel-Baum**: Wurzel `IExecutionEngine` (alles Ausmessbare) → Geschwister
`IAnatomyBase` („Lebewesen") und `IVirusExecutionEngine` (achsenlose Viren/Graphen). **Lebewesen ≡
SearchAlgorithm** (Metapher = technischer Begriff, EIN Gegenstand). Körper = **Anatomie** = feste
Komposition der 19 Achsen-Organe (T0–T18); **Anatomie = Verdrahtung ZWISCHEN den Organen** (Achsen
nutzen Interfaces anderer Achsen, z. B. T6-Allokation stellt gemeinsames Interface bereit).
**„SearchEngine" = nur ABI-Laufzeit-SICHT** desselben Lebewesens (`CacheEngine→ExecutionEngine→SearchEngine`),
KEIN zweites Konstrukt. **3 Gattungen** (SearchAlgorithm/Container/Graph). VERBOTEN: „parallel/orthogonal"
zwei Modelle · „5 Gattungen" · Metapher in Code-Identifiern.

## 1. Ziel-Gliederung (Soll)
| § | Titel (Label) | Zweck / Text-Inhalt | Δ vs. Ist |
|---|---|---|---|
| 4.0 | Kapitel-Einstieg (Intro) | Trennbarkeits-Problem → modulare Austauschbarkeit; *eine* Architektur als Kernbeitrag; Lesekarte; Forward-Links ch7 `sec:sensitivity` (Trennbarkeit eingelöst) + ch6 `ch:methodology` | Intro vorhanden, **erweitern** |
| 4.1 | Achsen-Bibliotheks-Framework (`sec:axis-framework`) | Achse=Organ, Austauschbarkeit löst Trennbarkeit; **Anatomie = Inter-Organ-Verdrahtung** (T6-Beispiel); Feature↔Achse-Anknüpfung | **Idreos/kartesisch raus** → `\ref{ssec:sota-design-space}` |
| **4.2** | Dialektische Aneignung des SOTA (`sec:dialectic`) | These–Antithese–Synthese je Achse als **kompakte Tabelle** (Achse \| übernommen \| ersetzt \| Synthese-Kern) | **NEU** — erfüllt Wortlaut-Vertrag ch3 `sec:gap` |
| 4.3 | Das M-Modell, 4 Subsysteme (`sec:m-model`) | messung\_driver/Builder/Engine/Prüfling; bidirektional Engine↔Prüfling; ExecutionEngine=Wurzel; 4-Subsystem ⟂ 3-Repo | + **Komponentendiagramm** (größte visuelle Lücke) |
| 4.4 | Die *eine* Architektur (`sec:three-layer`) | §0-Modell ausformulieren; ASCII-Baum → echtes Diagramm **erwägen** (Lehre strikt wahren) | inhaltlich **behalten** (Memory-Pflicht) |
| 4.5 | ABI-Modul-Interface (`sec:abi`) | `comdare_create_anatomy`→IAnatomyBase; variadische API 1/2/N; 16-Byte-Fingerprint; binärstabile Modulgrenze | **ausbauen** (zu dünn) + Signatur-Listing |
| 4.6 | 19-Achsen-Permutationsmatrix + Ebenen der Dynamik (`sec:axes`) | 19 Achsen als Tabelle (Single-Source); thematische Repos + ~57 Sub-Achsen `\ref{app:blocks}`; std::variant + Fallback; **5 Dynamik-Ebenen (FF4)**; lazy-spärliche Materialisierung (Konzept) | **ausbauen**, löst Intro-Versprechen 01:169 |
| 4.7 | PRT-ART als Prüfling (`sec:prt-art`) | abstraktes Lebewesen/Prüfling (≠ Mess-Schicht); welche Achsen selbst vs. geerbt (`resolve_baustein`-Fallback); H1/H2/H3 nur als Namen | ch4-**exklusiv**, ausbauen |
| 4.8 | Builder + Profil-Pipeline + Drei-Stufen-Prüfung (`sec:builder`) | 30 SOTA-Profile (8 Rang-1 + 22); typgetriebenes Quelltext-Emittieren (Konzept); Plattform-Probe (Build-Achse); **Stufe↔Reihe-Mapping-Tabelle** | + Drei-Stufen-Schema; Mapping-Lücke schließen |
| 4.8.1 | Ausblick: Heuristik-Auswahl (`sec:heuristic-profile-selection`) | nur **Anriss** (Future Work); Ausführung → ch6 | aktuell überdimensioniert → **kürzen** |

## 2. Drei wichtigste Struktur-Befunde
1. **„Architektur nur behauptet, nie GEZEIGT":** kein Diagramm/Listing/Tabelle (nur 1 ASCII-Baum). Pro §
   ≥1 Schau-Darstellung (M-Modell-Diagramm, ABI-Listing, Drei-Stufen-Schema, Achsen-Tabelle).
2. **Fehlende Sektion 4.2 (Dialektik):** ch3 `sec:gap`/`ssec:sota-meas-bridge` versprechen wortwörtlich, dass
   ch4 „dialektisch (These–Antithese–Synthese)" übernimmt/ersetzt — aktuell uneingelöst.
3. **Gewichts-Schieflage:** §4.7.1 (reines Future Work) ist der längste Block; realisierter Kern
   (ABI §4.5, Achsen §4.6) zu dünn.

## 3. Code-unabhängig SOFORT (Text-Agent) — Teil dieser Session erledigt
- [x] R2-Redundanz §4.1: Idreos-Cites + kartesisches-Produkt-Herleitung → `\ref{ssec:sota-design-space}`.
- [x] Quelltext-Hygiene: spuriöse 2-Leerzeichen-Einrückung ab `\end{verbatim}` (§4.3+) auf Spalte 0.
- [x] 4.2-Dialektik-**Skelett** (Heading + Label + Rahmen-Prosa + TODO-Tabelle), DE+EN.
- [x] Forward-Refs ergänzt (ch7 `sec:sensitivity`, ch6 `ch:methodology`).
- [ ] (offen, Text-Seite) 4.0-Intro-Ausbau · 4.2-Tabelle füllen (aus ch3) · §4.8 Stufe↔Reihe-Tabelle ·
  §4.8.1 kürzen · Schau-Darstellungen (Layout/Caption) — z. T. abhängig von Autor-Entscheidungen (§5).

## 4. Übergabe an Implementierungs-Agenten (code-abhängig, NICHT Text-Agent)
Vor dem Tiefen-Füllen code-treu zu verifizieren/liefern:
- 19 Hauptachsen-Namen (T0–T18) + ~57 Sub-Achsen-Zahl + ~2 Dutzend Allocator-Varianten; `IsComposition`-Concept + std::variant-Enumeration (§4.6).
- ABI-Signaturen: `comdare_create_anatomy()`→`IAnatomyBase`, variadische Spezialisierungen 1/2/N>2, `IExecutionEngine`-Methoden, 16-Byte-Fingerprint-Struktur (§4.5).
- Interface-/Klassenbaum: `IExecutionEngine`/`IAnatomyBase`/`IVirusExecutionEngine`, 3 Gattungen, Unterklassen Set/Sequence/Adapter/View; Code-Identifier tragen KEINE Metapher (§4.4).
- PRT-ART überschriebene vs. geerbte Achsen + `resolve_baustein`-Fallback + ValueHandle-Typen (§4.7).
- M-Modell-Identifier + 7-Phasen-Pipeline-Namen (Enumerate…Persist) + Defined/Full-Modus (§4.3).
- Builder: Profil-Zählung 30 = 8 + 22 gegen Code, `ExperimentDriver`-Phasen + 2 opt-in, HardwareProfile/Build-Achse-12, Stufen-Identifier (§4.8).
- **Zahl-Widerspruch `10^{11}` (ch4/6/8) vs `10^{14}` (ch2):** brutto vs. netto klären.

## 5. Autor-Entscheidungen — ALLE BEANTWORTET (2026-06-24, VERBINDLICH)
1. **Permutationen = rund `10^{14}`** (selbst nachgerechnet aus Anhang-D-Bausteine-Katalog, 19 Achsen T0–T18;
   A-Korpus-„25" = T6, kein eigener Faktor; mit 3 Build-Achsen ≈ `10^{16}`). ch2 `10^{14}` bleibt; **ch4 §4.5 / ch6 `sec:explosion` / ch8 `10^{11}` → „rund `10^{14}`" angleichen.**
2. **4.2 Dialektik = eigene frühe Sektion** (nach §4.1), Inhalt aus **ch1–3** übernehmen.
3. **Stufe↔Reihe (verbose):** Stufe 1 (SOTA-Standards) + Stufe 2 (Prüfling) → **Reihe A** (Prüfling vs SOTA);
   Stufe 3 (Full Join) → **Reihe B** (systematische Variation); **Reihe C (Merge/Regression alt-neu) = build-übergreifend, NICHT stufengebunden.**
   So ausformulieren statt „bilden direkt ab"; gegen ch6 `ch:methodology`-Reihen-Def + Impl-Agent-Stufen-Identifier verifizieren.
4. **ASCII §4.4 → echtes TikZ-Diagramm** aus ch1–3-Kontext (Lehre strikt wahren).
5. **Heuristik:** ch4 §4.8.1 nur Anriss, ausführlich ch6 — bestätigt.
6. **Schau-Darstellungen: ALLE VIER bauen** — §4.3 M-Modell-Komponentendiagramm · §4.4 Architektur-Diagramm ·
   §4.5 ABI-Signatur-Listing · §4.8 Drei-Stufen-Schema (code-treue Inhalte impl-agent-verifiziert; Layout/Caption = Text-Agent).
7. **4.2 Dialektik-Tabelle: nach den 6 Herkunfts-Clustern (A–F) gruppiert, dabei ALLE 19 Achsen lückenlos abdecken**
   (Cluster-Gruppierung als Tabellen-Struktur, je Achse eine Zeile innerhalb ihres Clusters).

## 6. Pfade
- ch4: `kapitel/{de,en}/04_concept_architecture.tex`. Forward-Ziele: ch6 `ch:methodology`/`sec:explosion`,
  ch7 `sec:sensitivity`. Verweis-Heimaten: ch3 `ssec:sota-design-space`/`sec:sota-axes`/`tab:axes-overview`/`sec:gap`,
  Anhang `app:blocks`/`app:interfaces`. Memory: `project_eine_architektur_lebewesen_searchalgorithm`,
  `project_anatomie_inter_organ_verdrahtung`. Build/Check wie gehabt (.log + .blg + `Repeated entry`).
