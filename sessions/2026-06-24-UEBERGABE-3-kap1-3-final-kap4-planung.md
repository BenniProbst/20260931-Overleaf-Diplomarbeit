# KONTEXT-ÜBERGABE 3 — Thesis-Workstream (2026-06-24): Kap. 1–3 final, Kap. 4 geplant

> Für die nächste Session (Text-Agent der Diplomarbeit „Aktive cache-bewusste Hardware-Adaption").
> Self-contained, ABER lies zwingend auch **Übergabe 1** (`2026-06-22-…konsolidierung`) und **Übergabe 2**
> (`2026-06-24-UEBERGABE-2-anhang-d-footer-zitate-vollstaendig`) — dort steht die Architektur-Wahrheit
> und der vollständige Anhang-D-Zitate-Stand. Diese Übergabe 3 dokumentiert: Layout-Norm-Fix, die
> **Kap.-1–3-Redundanz-Kondensierung (abgeschlossen)** und die **Kap.-4-Planungssession + 5 Autor-Entscheidungen**.
> ZUSÄTZLICH PFLICHT-LESEN: das Planungs-Dokument `sessions/2026-06-24-PLANUNG-kapitel-4-zielstruktur.md`
> (die vollständige ch4-Ziel-Struktur + Impl-Agent-Übergabe + offene Punkte).

---

## 0. STATUS (Stand HEAD `34cdc2b` + uncommitteter Planungs-/Übergabe-Doc)
- **Kapitel 1–3: FINAL + abgeschlossen.** Kapitelübergreifende Redundanzen kondensiert (R1–R6, DE+EN sync,
  volle Ausführung je an der passendsten Stelle, Rest = Kreuzreferenz). Build DE+EN **0/0** (.log/.blg),
  keine undefined refs. Commit `34cdc2b`.
- **Anhang D Zitate/Footer: vollständig** (Übergabe 2, `535c35c`/`40bd59f`/`65ea84f`). `.bib` duplikatfrei.
- **Layout: norm-konform** — `zihpub.cls` ist wieder **1:1 Original** (kein headheight/footskip-Eingriff);
  die `\headheight`-Warnung ist via **Kurz-Kopfmarke** für die Build-SIMD-Sektion gelöst (`afc677c`).
  Recherche-Verdikt: TU-Dresden-Informatik hat KEINE bindende Layout-Norm (Memory `reference_tud_informatik_thesis_format_norm`).
- **Kapitel 4: GEPLANT, NICHT implementiert.** Multi-Agent-Planungssession lieferte die Ziel-Struktur
  (Planungs-Doc). **Alle 5 Autor-Entscheidungen sind beantwortet (s. §4).** Die ch4-.tex sind noch UNVERÄNDERT
  (199 DE / 191 EN Zeilen Skelett). **Code-Bezug/-Verifikation = Implementierungs-Agent (separat, NICHT Text-Agent).**

---

## 1. WAS DIESE SESSION GEMACHT WURDE (nach Übergabe 2)
| Commit | Inhalt |
|---|---|
| `40bd59f` | `.bib`: 9 versehentliche Duplikate entfernt (BibTeX „Repeated entry"; herter/yang = web-verifizierte Kopie behalten, Original war falsch). |
| `65ea84f` | Übergabe 2 Nachtrag (Dedup + `.blg`-Lehre). |
| `d1eec90` | (VERWORFEN) zihpub.cls headheight=34pt + footskip=30pt. |
| `afc677c` | **Layout norm-neutral:** zihpub.cls revertiert + Build-SIMD-Kurzmarke `\section[kurz]{lang}` → `\headheight`-Warnung + Overfull weg, keine Geometrieänderung. |
| `6b92e82` | Overleaf-Merge (kleine ch3-Edits des Autors). |
| `34cdc2b` | **Kap. 1–3 Redundanz-Kondensierung R1–R6** (DE+EN). |
| *(uncommitted)* | `sessions/2026-06-24-PLANUNG-kapitel-4-zielstruktur.md` + diese Übergabe 3. |

### R1–R6 (Kap. 1–3 Redundanzen — volle Version je an der passendsten Stelle behalten)
- **R1** Comdare/BEP-Provenienz: voll in **ch3 §3.6.3** (`ssec:sota-design-contribution`), ch1 → `\ref`.
- **R2** Idreos-Entwurfsraum/kartesisches Produkt: voll in **ch3 §3.6.1** (`ssec:sota-design-space`), ch2 → `\ref`.
- **R3** Bias-Korpusbefund: voll in **ch3 §3.4.3** (`ssec:sota-wl-bias`), ch2 nur Begriff + `\ref`.
- **R4** Schreib-Protokolle/RRIP-Def: voll in **ch2 §2.1.4** (`ssec:coherence`), ch3 nur die NEUE Inklusions-Politik-Instanz je Hersteller + `\ref`.
- **R5** Dialektik-Vorverweis (These–Antithese–Synthese): jetzt **genau 1×** (ch3 `sec:gap`), §3.5.4 + §3.6.3 gekürzt.
- **R6** PRT-ART-Glosse „(Probst-Redirect-Tree-/ART-Hybrid)": Expansion nur in ch1, ch2 gekürzt.
> ⚠️ **ACHTUNG: dieselbe R2-Redundanz (Idreos/kartesisches Produkt) ist auch in ch4 §4.1 (DE Z.39 / EN Z.34) noch drin** —
> beim ch4-Ausbau ENTFERNEN → `\ref{ssec:sota-design-space}` (Teil der ch4-PENDING-Liste §5).

---

## 2. KAPITEL-4-ZIEL-STRUKTUR (Soll) — Kurzfassung (Detail im Planungs-Doc)
4.0 Kapitel-Einstieg (Intro erweitern) · 4.1 Achsen-Bibliotheks-Framework · **4.2 Dialektische Aneignung des SOTA (NEU)**
· 4.3 M-Modell (4 Subsysteme) + Komponentendiagramm · 4.4 Die *eine* Architektur (+ echtes Diagramm) ·
4.5 ABI-Interface (ausbauen + Listing) · 4.6 19-Achsen-Permutationsmatrix + Ebenen der Dynamik (ausbauen, Intro-Versprechen einlösen)
· 4.7 PRT-ART als Prüfling (ausbauen) · 4.8 Builder + Profil-Pipeline + Drei-Stufen-Prüfung (+ Stufe↔Reihe-Mapping)
· 4.8.1 Ausblick Heuristik (KÜRZEN → ch6).
> **Größte Lücke:** ch4 ZEIGT die Architektur nirgends (kein Diagramm/Listing/Tabelle, nur 1 ASCII-Baum). Jede Sektion braucht ≥1 Schau-Darstellung.

---

## 3. DIE 5 AUTOR-ENTSCHEIDUNGEN (alle beantwortet — VERBINDLICH für ch4-Ausbau)
1. **Permutationszahl `10^{11}` vs `10^{14}`:** Ich habe selbst nachgerechnet (Anhang-D-Bausteine-Katalog): die **19
   Kompositions-Achsen (T0–T18) ergeben ein kartesisches Produkt ≈ `10^{14}`** (T0=17, T6=25, T8=9, T17=15, T4=9, Rest 2–5;
   A-Korpus-„25" = identisch mit T6, KEIN eigener Faktor; mit den 3 Build-Achsen ≈ `10^{16}`). → **ch2 `10^{14}` ist korrekt;
   ch4/6/8 `10^{11}` (Untertreibung) auf „rund `10^{14}`" angleichen.** (Exakte Zählung impl-agent-verifiziert, Größenordnung robust.)
2. **4.2 Dialektik:** als eigene frühe Sektion, **Inhalt aus Kapitel 1–3 übernehmen** (These–Antithese–Synthese ist dort etabliert,
   v.a. ch3 `sec:gap`/§3.4.3/§3.6). Tabelle **nach den 6 Herkunfts-Clustern (A–F) gruppiert, dabei ALLE 19 Achsen lückenlos**
   (je Achse eine Zeile innerhalb ihres Clusters: übernommen | ersetzt | Synthese-Kern), KEIN Variantenkatalog (→ Anhang D verweisen).
3. **Stufe↔Reihe-Mapping (§4.8), ENTSCHIEDEN:** **verbose** so ausformulieren — Stufe 1 (SOTA-Standards) + Stufe 2 (Prüfling)
   → **Reihe A** (Prüfling vs SOTA); Stufe 3 (Full Join) → **Reihe B** (systematische Variation); **Reihe C (Merge/Regression
   alt-neu) = build-übergreifend, NICHT stufengebunden**. Gegen ch6 `ch:methodology` + Impl-Agent-Stufen-Identifier verifizieren.
4. **ASCII-Baum §4.4 → echtes Diagramm** (TikZ) **aus dem Kontext der ersten 3 Kapitel** erstellen. STRIKT die „eine Architektur"-Lehre
   wahren: Wurzel IExecutionEngine → Geschwister IAnatomyBase(Lebewesen)/IVirusExecutionEngine; SearchAlgorithm-Unterklasse ≡ Lebewesen;
   darunter SearchAlgorithmAnatomy<C> (Körper, 19 Organe) + SearchAlgorithmAbiAdapter<A> (ABI-Sicht „SearchEngine"). KEINE Parallel-Bäume.
   (TikZ/pgfplots ist geladen; Build-testen!)
5. **Heuristik-Future-Work:** bestätigt — in ch4 §4.8.1 nur **Anriss**, ausführlich in **ch6**.
6. **Schau-Darstellungen (ENTSCHIEDEN: ALLE VIER bauen):** §4.3 M-Modell-Komponentendiagramm · §4.4 Architektur-Diagramm ·
   §4.5 ABI-Signatur-Listing · §4.8 Drei-Stufen-Schema. Layout/Caption = Text-Agent; code-treue Inhalte impl-agent-verifiziert.

---

## 4. KAPITEL-4 PENDING-ARBEIT (nächste Session, Text-Agent, nach Priorität)
**Code-UNABHÄNGIG (sofort schreibbar):**
1. R2-Redundanz §4.1 entfernen (Idreos-Cite + kartesisches-Produkt-Herleitung → `\ref{ssec:sota-design-space}`), DE+EN.
   (DE: Z.39 `~\cite{idreos2018periodic, idreos2018datacalculator}`; EN: Z.34 desgl.)
2. **Quelltext-Hygiene:** spuriöse 2-Leerzeichen-Einrückung **ab `\end{verbatim}`** (DE Z.107 `  \normalsize` … bis EOF;
   EN Z.101 …) auf Spalte 0 zurücksetzen — betrifft `\section`/`\subsection`/Absätze §4.4–4.8. **Edit-`old_string` MUSS die 2 Spaces mitführen.**
3. **4.2 Dialektik-Sektion** (NEU, `\label{sec:dialectic}`) nach §4.1 einfügen: Rahmen + kompakte These/Antithese/Synthese-Tabelle aus ch1–3.
4. **4.4 TikZ-Diagramm** (Decision 4) statt ASCII-verbatim (DE Z.88–101 / EN Z.88–101).
5. **Zahl angleichen** `10^{11}`→`10^{14}` (ch4 §4.5 DE Z.150/EN Z.143; ch6 `sec:explosion`; ch8). „über `10^{14}`"/„rund `10^{14}`".
6. **§4.8 Stufe↔Reihe verbose** (Decision 3) + Mapping-Tabelle; **§4.8.1 kürzen** (Decision 5).
7. **4.0 Intro** erweitern (Trennbarkeits-Problem) + Forward-Refs `ch4→ch7 sec:sensitivity` + `ch4→ch6 ch:methodology` (Labels existieren).
8. Schau-Darstellungen §4.3 (M-Modell-Komponentendiagramm), §4.5 (ABI-Listing), §4.8 (Drei-Stufen-Schema) — Layout/Caption = Text-Agent.

**Code-ABHÄNGIG → Implementierungs-Agent liefert/verifiziert (Übergabe im Planungs-Doc §4):**
exakte 19 Achsen-Namen + ~57 Sub-Achsen-Zahl + ~2 Dutzend Allocator-Varianten · ABI-Signaturen (`comdare_create_anatomy`→IAnatomyBase,
variadische Spezialisierungen, 16-Byte-Fingerprint) · Interface-/Klassenbaum-Treue (IExecutionEngine/IAnatomyBase/IVirusExecutionEngine,
3 Gattungen) · PRT-ART überschriebene-vs-geerbte Achsen + `resolve_baustein`-Fallback · M-Modell-/7-Phasen-Identifier · Profil-Zählung 30=8+22.
**Erst NACH diesen Fakten die §4.4/4.5/4.6/4.7-Tiefe finalisieren.**

---

## 5. FALLSTRICKE / LEKTIONEN (NICHT wiederholen)
1. **`.bib`-Hygiene (aus Übergabe 2, weiterhin kritisch):** vor JEDEM „neuen" Key `grep -c "{key,"`; Build-Check MUSS
   `Repeated entry`/`I'm skipping` mitprüfen (BibTeX-Error crasht NICHT, `.log` bleibt sauber → trügerisch).
2. **Edit-Match scheitert an HARTEN Zeilenumbrüchen:** z.B. „Eine\n\emph{Achse}" (Zeilenende „Eine" + Umbruch) ≠ „Eine \emph{Achse}".
   Bei Fehl-Match das `old_string` an einer Zeileninnen-Position (nicht am Wort vor dem Umbruch) beginnen oder Stelle frisch lesen.
3. **`format_tex.py`-Verbatim-Bug:** nach `\end{verbatim}` rückt es den Rest fälschlich ein (genau das Artefakt in ch4 §4.3+).
   `format_tex.py` läuft auf normale Kapitel (NICHT Anhang D, NICHT `diplomarbeit.tex`) — aber **ch4-Einrückung manuell prüfen**,
   format_tex.py NICHT blind auf ch4 anwenden, bevor der Verbatim→TikZ-Ersatz erfolgt ist.
4. **Overleaf-Parallelarbeit:** `git pull --no-rebase origin main` VOR jedem Edit-Block; der Autor merged Overleaf-Edits laufend.
   Diese Session kamen 2 Overleaf-Commits an ch3 mitten in der Arbeit.
5. **Permutationsrechnung:** A-Korpus-Bausteine (25) = dieselben Allokatoren wie T6 → NICHT doppelt zählen. Build-Achsen separat.
   Skript-Parser: Sektionstitel mit `\allowbreak{}` enthalten `{}` → greedy-Regex `\{(.*)\}` statt `[^}]*`.
6. **DE führt:** jede ch4-Änderung synchron DE+EN; bei DE↔EN-Asymmetrie aus EN entfernen, nicht ins DE übernehmen.
7. **Konsolen-Encoding (Windows cp1252):** Python-Prints mit `≡`/Umlauten → `PYTHONIOENCODING=utf-8` + `sys.stdout.reconfigure`.

---

## 6. ARCHITEKTUR-KONSOLIDIERUNGEN (VERBINDLICH, faithful in ch4 halten)
**EINE Architektur, kein Parallel-Baum:** Wurzel `IExecutionEngine` → Geschwister `IAnatomyBase` („Lebewesen") +
`IVirusExecutionEngine` (achsenlose Viren). **Lebewesen ≡ SearchAlgorithm** (Metapher = technischer Begriff, EIN Gegenstand).
Körper = **Anatomie** = feste Komposition der 19 Achsen-Organe (T0–T18); **Anatomie = Verdrahtung ZWISCHEN den Organen**
(Achsen nutzen Interfaces anderer Achsen, z.B. T6-Allokation). **„SearchEngine" = nur ABI-Laufzeit-SICHT** desselben Lebewesens
(`CacheEngine→ExecutionEngine→SearchEngine`), KEIN zweites Konstrukt. **3 Gattungen** (SearchAlgorithm/Container/Graph).
**M-Modell** = 4 Subsysteme (messung\_driver/CacheEngineBuilder/CacheEngine/Prüfling PRT-ART); ExecutionEngine = Wurzel, KEIN 5. Subsystem.
**VERBOTEN:** „parallel/orthogonal" zwei Modelle · „5 Gattungen" (es sind 3) · Metapher („Lebewesen") in Code-Identifiern.
Memories: `project_eine_architektur_lebewesen_searchalgorithm`, `project_anatomie_inter_organ_verdrahtung`.

---

## 7. KRITISCHE DIREKTIVEN
- **Rollen:** ICH bin der **Text-Agent** (.tex). **Code-Bezug/-Verifikation = Implementierungs-Agent** (separat, vom Autor koordiniert).
  Cache-Engine-Repo NICHT selbst lesen/anfassen; code-abhängige Fakten als Übergabe formulieren (Planungs-Doc §4).
- **Planung VOR Umsetzung** bei Komplexität (Multi-Agent-Workflow); nie raten, gegen Thesis-Material/Doku erden.
- **Provenienz-Governance:** nur Autor-Ideen oder zitierte Primärquellen; Modell-Ideen nur als Chat-Vorschlag → Autor prüft → dann einbauen.
- **Commits OHNE `Co-Authored-By`** (TU-Governance). Keine „erledigt"-Claims für Ungebautes. `git pull` vor Edit. `.log`+`.blg`(+Repeated-entry)-Check je Build.
- **Bei ultracode-Reminder:** Workflow nutzen; sonst Opt-in abwarten.

---

## 8. NÄCHSTE-SESSION-CHECKLISTE
1. `git pull --no-rebase origin main`; Übergabe 1+2+3 + Planungs-Doc + Doc-36-Architektur lesen.
2. ch4-PENDING §4 abarbeiten — **zuerst code-unabhängig** (R2, Einrückung, 4.2-Sektion, TikZ-Diagramm, Zahl-Angleich, Forward-Refs, §4.8-verbose, §4.8.1-Kürzung).
3. Code-abhängige Tiefe (§4.4/4.5/4.6/4.7) ERST nach Impl-Agent-Faktenlieferung; bis dahin Struktur + Verweise + Schau-Darstellungs-Gerüste.
4. Jede ch4-Änderung DE+EN synchron; Build 0/0 (.log+.blg+Repeated-entry); committen+pushen.
5. Faktenchecks: Zahl `10^{14}` konsistent über ch2/4/6/8; Profil-Zählung 30=8+22; 8 Rang-1-Namen (ART/HOT/Masstree/CoCo/START/B²/Wormhole/SuRF).
