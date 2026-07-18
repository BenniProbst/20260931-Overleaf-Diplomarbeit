# KONTEXT-ÜBERGABE — Thesis-Workstream (Stand 2026-06-24, sehr ausführlich)

> Für die nächste Session (Text-Agent der Diplomarbeit „Aktive cache-bewusste Hardware-Adaption").
> Self-contained. Ergänzt die frühere Übergabe `2026-06-22-UEBERGABE-kontext-thesis-konsolidierung.md`
> (Architektur-Wahrheit dort weiterhin gültig). Diese Session war SEHR umfangreich (Zitate-Vollständigkeit,
> Anhang-D-Datenkonsolidierung, Lebewesen-Metapher). Lies dies VOLLSTÄNDIG, bevor du an Anhang D / Zitaten weiterarbeitest.

---

## 0. WICHTIGSTER OFFENER PUNKT (sofort als Erstes erledigen)

**Die 10 in dieser Session web-verifizierten Bib-Einträge sind in `literatur.bib` committet (HEAD `9ab2c4e`),
aber NOCH NICHT in den Footern/T15 von Anhang D zitiert.** Das ist der unmittelbare nächste Schritt.
Konkret zu tun (Daten + exakte Cite-Formen siehe §5):

1. **T15-Migration normalisieren** (`anhang/{de,en}/D_building_block_matrix.tex`): die ungültige Bindestrich-Notation
   `P-13` / `P-13b` / `P-11` durch Paper-Namen + `\cite` ersetzen:
   - `P-11` (NVM-DBMS, Tier-Based-Migration) → `\cite{vanrenen2018nvm}`
   - `P-13b` (LeCaR, ML-Replacement) → `\cite{vietri2018lecar}`
   - `P-13` (Anti-Caching) → `\cite{debrabant2013anticaching}`
   - Quelle-Spalte der Migrations-Bausteine (Z. ~662 „P-11 (Managing NVM…)", „P-13b (… LeCaR …)") + Footer (Z. ~667 „P-13, P-13b, P-11") anpassen.
2. **5 problematische Footer fertig zitieren** (DE+EN, byte-gleiche Listen, nur Label „Beitragende Paper:" vs „Contributing papers:" unterschiedlich):
   - **577** (B-Tree-Concurrency): Keys `bayer1972btree,comer1979btree,srinivasan1991btree,garciamolina2009dbsystems`
   - **791** (Buffering/Queue, nach Bw-Tree-Fix): `thompson2011disruptor,leis2013art,levandoski2013bwtree,mckenney2001rcu,lamport_spsc,vyukov_mpmc,michael1996queue,pugh1990skiplist,oneil1996lsm,driscoll1989persistent,mao2012masstree,luo2023smart,williams1964heapsort,desrochers_concurrentqueue`
     (STOC 1986 = dieselbe Driscoll-Arbeit wie JCSS 1989 → `driscoll1989persistent`, NICHT doppelt eintragen.)
   - **792** (NetDB/SOSP): `oneil1996lsm,tu2013silo` (NetDB 2011 unidentifizierbar → unzitiert lassen, im Text als Name belassen)
   - **971** (Allokator-DOIs): nach Ebene-3-Entkollision sind die meisten via A-Nummer-Cites abgedeckt; die 2 fehlenden DOIs = `knowlton1965buddy` (existiert jetzt) + ICPADS-DOI `10.1109/ICPADS47876.2019.00114` (**unidentifizierbar** → unzitiert lassen).
3. **NetDB 2011** und **ICPADS-DOI …00114** ließen sich NICHT eindeutig identifizieren → als benannte, unzitierte Quellen belassen; ggf. den Autor (User) fragen.
4. Nach jeder Footer-Cite: **Build DE+EN + `.log` UND `.blg` prüfen** (s. §3 Fallstrick 1), committen.

**Anwendung am besten per Skript** (wie in dieser Session, Pfade in §6): exakte Footer-Strings matchen, `~\cite{…}`
vor dem Schluss-Punkt einsetzen, `count==1`-Check, DE+EN getrennt (Label-Präfix unterschiedlich).

---

## 1. WAS DIESE SESSION ERLEDIGT WURDE (Commits, chronologisch)

Alle gepusht auf `BenniProbst/20260931-Overleaf-Diplomarbeit`, Branch `main`.

| Commit | Inhalt |
|---|---|
| `2738195` | Kap. 1: SOTA bei Erstnennung ausschreiben (FF3/RQ3); Glossar bleibt formale Definition (AP-E2). |
| `0bc05a6` | Kap. 3: Workload-Tabellen-Legenden als Notiz UNTER jede Tabelle (Float-robust), statt Caption/Block. |
| `0ab622d`, `b338537` | Deutsche Anführungszeichen via `\enquote{}` (csquotes) in ch3 bzw. ch1/2/4 — Fix des babel-aktives-`"`-Bugs. |
| `a7a26ce` | EN-Sync: 6 divergente Abschnitte (von 45 auditierten) an DE-Leitsprache angeglichen. |
| `2df150d`, `1136434` | Kap. 3 §3.5: Mess-Werkzeug- + Statistik-Quellen verlinkt (perf/VTune/HdrHistogram/Mann-Whitney/Holm/Cliff) + neue Bib-Einträge. |
| `87776c1` | `literatur.bib`: BibTeX-Warnungen behoben (alphadin: @book→`edition`, @misc→keine `note`/`{()}`). |
| `835e57d` | **P-Nummern im Fließtext durchgängig mit `\cite`** (125 Einfügungen, ch1/3/5/Glossar, DE+EN). |
| `22bc75e` | Anhang D: 15 saubere Footer mit `\cite` verlinkt (DE+EN). |
| `f8f4cbf` | Anhang D: **Lebewesen-/Organ-Metapher eingezogen** (Kap.-Intro + 19 Achsen-Sektionen) + objektive Tippfehler. |
| `10371db` | Anhang D Ebene 2a: **P04=Bw-Tree-Fehllabel korrigiert** (→ `levandoski2013bwtree`). |
| `391a72e` | Anhang D Ebene 3: **Allokator-P-Schema entkollidiert** (11× `Paper-Pxx`→`A-Nr+\cite`) + 2 neue Allok.-Einträge (Exgen, Knowlton) + **Anatomie-Rahmung** (ch3 design-contribution + EN-Nachzug + D-Intro). |
| `9ab2c4e` | `literatur.bib`: 10 verifizierte Quellen für Footer/T15 (NOCH UNZITIERT — s. §0). |

---

## 2. ARCHITEKTUR-KONSOLIDIERUNGEN (User-Präzisierungen diese Session — VERBINDLICH)

### 2.1 Anatomie = Verdrahtung ZWISCHEN den Organen (NICHT bloß „Komposition")
**User-Korrektur 2026-06-24 (load-bearing!):** Die *Anatomie* eines Lebewesens ist NICHT einfach „die Komposition
der 19 Achsen", sondern **wie der Korpus ZWISCHEN den Organen verdrahtet ist** — d. h. **Achsen-Algorithmen nutzen
die Interfaces ANDERER Achsen**. Beispiel: Die **Allokations-Achse (T6)** stellt ein gemeinsames Allokations-Interface
als Algorithmus für die übrigen Organe bereit. Referenzstelle existiert bereits in ch3 §3.3 („Achsen … liefern anderen
Achsen verteilte Interfaces für ihre Detail-Operationen"). Eingearbeitet in `ssec:sota-design-contribution` (ch3) +
Anhang-D-Intro (Commit `391a72e`). **Beim Weiterschreiben der Metapher: Anatomie immer als Inter-Organ-Verdrahtung
framen, nicht als statische Organ-Liste.**

### 2.2 Korpus = Achsen-Konfiguration eines Lebewesens = Instanz der Achsen-Definitions-XML
„Korpus" meint meistens die konkrete Achsen-Konfiguration eines Lebewesens (eine Instanz der Achsen-Definitions-XML).
Im Feature-Mapping (ch3 design-contribution): Achse↔Feature, Lebewesen↔Feature-Komposition, Lebewesen-Typ↔Feature-Set-
statische-Definition, Gattung↔(Such-)Algorithmus-Interface-Kategorie, **Anatomie↔Feature-Interaktion/Verdrahtung**.
(Hintergrund: Biomedizinische Technik des Autors → Bildhaftigkeit.)

### 2.3 Kanonisches Modell (aus Doc 36 + Code, weiterhin gültig)
`IExecutionEngine` (Wurzel) → Geschwister `IAnatomyBase` (Lebewesen) / `IVirusExecutionEngine` (achsenlose Viren)
→ **3 Gattungen** (`AnatomyGattung`: SearchAlgorithm/Container/Graph = Prüf-Dock/Außen-Interface) → **5 Tier-Unterklassen**
(`AnatomyGenus`: SearchAlgorithm=19 Achsen / Set=15 / Sequence=11 / Adapter=13 / View=7) → **19 Achsen ≡ Organe** (T0–T18).
`Lebewesen ≡ SearchAlgorithm`. Anatomie = Körper (`SearchAlgorithmAnatomy<Composition>`). „SearchEngine" = nur ABI-Sicht
(`SearchAlgorithmAbiAdapter`), KEINE zweite Hierarchie. VERBOTEN: „parallel/orthogonal", „5 Gattungen", Metapher in
Code-Identifiern, P01-P30 als Korpus-Grenze (s. u.).

### 2.4 Achsen-Katalog T0–T18 (Thesis-T-Nr. ↔ Code-Verzeichnis weicht ab!)
T0 search\_algo (`axis_03a`) · T1 cache\_traversal (`axis_03b`) · T2 mapping (`axis_03m`) · T3 path\_compression (`axis_02`)
· T4 node\_type (`axis_04`) · T5 memory\_layout (`axis_05`) · T6 allocator (`axis_06`) · T7 prefetch (`axis_07`)
· T8 concurrency (`axis_08`) · T9 serialization (`axis_10`) · T10 telemetry (`axis_11`) · T11 value\_handle (`axis_14`)
· T12 isa (`axis_09`) · T13 index\_organization (`axis_01`) · T14 io\_dispatch (`axis_io`) · T15 migration\_policy (`axis_migration`)
· T16 filter (`axis_filter`) · T17 queuing\_q1 (`axis_q1`) · T18 queuing\_q2 (`axis_q2`).
**Die `axis_NN`-Verzeichnisnummer ≠ T-Nummer** — Verwechslungsgefahr in Anhang D (z. B. „T9 Serialisierung" Code `axis_10`).

---

## 3. FALLSTRICKE / LEKTIONEN (NICHT wiederholen)

1. **BibTeX-Warnungen stehen in `.blg`, NICHT in `.log`.** Mein erster Build-Check prüfte nur `.log` und meldete fälschlich
   „0 Warnungen" — der User sah die `.blg`-Warnungen im Overleaf. **IMMER beide prüfen.** Regex für echte BLG-Warnungen:
   `^(Warning--|---)` (die Zeile `warning$ -- N` ist nur der Zähler; N=0 = sauber). alphadin-Fallstricke: `@book` braucht
   `edition`; `@misc` verträgt KEINE `note` + KEINE verschachtelten `{()}` im Titel (sonst „literal stack isn't empty").
   Memory: `reference_thesis_build_check_blg_alphadin`.
2. **babel-aktives-`"`-Quote-Bug:** Schließendes ASCII-`"` (statt `"` U+201C) wird unter `babel ngerman` vor Leerzeichen
   verschluckt → Schlusszeichen fehlt. Fix = `\enquote{…}` (csquotes ist geladen). Memory: `feedback_de_fuehrt_en_…` & die
   Tabellen-Legende-Memory. NICHT in Tabellen/Verbatim/`%`-Kommentaren anfassen.
3. **DE führt; bei DE↔EN-Asymmetrie nur-EN-Inhalt ENTFERNEN, nicht ins DE übernehmen** (User-Direktive, Memory vorhanden).
4. **Parallele Audit-Agenten sind asymmetrisch unzuverlässig:** Der EN-ch3-P-Nummern-Agent ließ §3.4/§3.5 aus (EN 48 vs DE 57)
   → DE≡EN-Parität IMMER nach paralleler Bearbeitung selbst nachprüfen. Ein Ground-Truth-Agent behauptete fälschlich
   „Korpus = P01–P30" → **korrekt ist P01–P33** (P31=Ungethüm, P32=Schmidt, P33=VAMPIR). Mehrere „außerhalb-Korpus"-Flags
   waren dadurch Falsch-Positive. **Agenten-Befunde immer selbst gegen Korpus/Code/bib gegenprüfen.**
5. **`format_tex.py` NICHT auf Anhang D** (tabellenlastig, longtables) — Quell-Zeilenlänge ist im Output irrelevant.
   Auf normale Kapitel JA (nach Edits). `diplomarbeit.tex` NIE formatieren.
6. **Skript-Anker `Heading\n\n` schlug fehl** (Newline-Matching) — robust ist der **bloße Heading-String als Anker**
   (eindeutig), Einfügung als `head + nl + nl + satz` (nl aus Datei detektiert). Bewährtes Muster für alle Massen-Edits:
   Python-Skript, `content.count(old)==1`-Check, `newline=''` lesen/schreiben (LF erhalten), bibKey gegen autoritative Karte
   programmatisch verifizieren.
7. **Anhang-D-Footer:** DE/EN-Listen byte-gleich, nur Label „Beitragende Paper:" vs „Contributing papers:" unterschiedlich →
   pro Datei mit Label-Präfix matchen.
8. **`\cite`-Insertion-Konvention:** `~\cite{key}` (non-breaking space) direkt nach der Nennung, vor Satzzeichen/Klammer.
9. **Overleaf-Sync:** Nach jedem Push „Pull GitHub changes into Overleaf" + neu kompilieren (User arbeitet parallel in Overleaf;
   `git pull --no-rebase origin main` VOR jedem Edit-Block).

---

## 4. AUTORITATIVE P→BIBKEY-KARTE (P01–P33) — überall verwenden
P01=leis2013art P02=binna2018hot P03=mao2012masstree P04=boffa2024coco P05=fent2020start P06=schmeisser2022b2tree
P07=wu2019wormhole P08=leis2016olc P09=jacobson1989louds P10=zhang2018surf P11=rao1999css P12=rao2000csb
P13=hankins2003nodesize P14=samuel2005procaware P15=graefe2001btree P16=bender2000cobtree P17=bender2005coboblivious
P18=saikkonen2008multilevel P19=saikkonen2016layout P20=mueller2025btreesback P21=chen2001prefetch P22=chen2002fractal
P23=khan2010adaptive P24=naderan2016adaptivefilter P25=mahling2025hotpath P26=zhang2024pathprefix P27=zhang2025hierarchical
P28=kuehn2023bplustree P29=mckenney2001rcu P30=michael2004hazard P31=ungethuem2017survey P32=schmidt2025hbm P33=berthold2023vampir
> Gruppen-Verifikation (cite-Reihenfolge im Korpus §3.1): P11/P12/P13=CSS/CSB+/Hankins, P16/P17=Bender2000/2005,
> P18/P19=Saikkonen2008/2016, P21/P22=Chen2001/2002, P26/P27=Zhang2024/2025.

### Allokator A→Key (Ebene-3-Entkollision, erledigt `391a72e`)
A01=berger2000hoard A03=michael2004lockfree A04=leijen2019mimalloc A05=evans2006jemalloc A07=lietar2019snmalloc
A11=leite2018lrmalloc A16=pimmalloc2026 A18=li2025exgen(NEU) A19=knowlton1965buddy(NEU) A20=lea1996dlmalloc A23=bonwick2001vmem.
(Allokator-Korpus hatte ein EIGENES `Paper-Pxx`-Schema, das mit dem Such-Korpus kollidierte — jetzt aufgelöst.)

---

## 5. ANHANG D — IST-STAND & VERBLEIBENDE DATEN-TODOs

**Erledigt:** Metapher-Rahmung (Lebewesen/Organ 22×/Sprache) · 15/23 Footer zitiert · P04=Bw-Tree korrigiert ·
Allokator-Entkollision (11 Rows) · objektive Tippfehler (originall→original, serieialisierte→serialisierte, O'Neill→O'Neil,
`„Old is Gold``` → `\enquote{}`). Build DE+EN durchgehend 0/0/0, `.blg` 0 Warnungen.

**Verbleibend (Daten/Provenienz — teils Autor-Entscheidung):**
- **T15 + 5 Footer fertig zitieren** (§0, alle Keys liegen jetzt in bib).
- **`P?`-Platzhalter** (Bausteine-Quelle, „P? (Abadi SIGMOD 2008 verwandt)") — echte Quelle bestimmen/zitieren oder belassen.
- **Allokator-Zahl „25"** vs. deklariert „A01–A23" vs. real A22a/b/c (T6 hat A22a/b/c, A-Korpus nur A22a/b) — Zählung/Spanne
  konsistent machen (Autor-Entscheidung welche Wrapper-Aufteilung gilt).
- **`Std_Malloc` (A22a)** ohne `_Allocator`-Suffix (uneinheitlich) + fehlt im zweiten A-Korpus-Block.
- **Footer-P-Nummern-Plausibilität:** einige Footer (93, 125, 161, 831) listen P-Nummern, die im Sektionstext nicht
  begründet sind — Autor sollte prüfen, welche Paper WIRKLICH zu der Achse beitragen (gegen Doc 18).
- **NetDB 2011 / ICPADS-DOI …00114** = unidentifizierbar → Autor fragen.

---

## 6. ARBEITS-INFRASTRUKTUR / PFADE

- **Repo:** `C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\thesis\diplomarbeit` (HEAD `9ab2c4e`).
- **Build:** `pwsh -File build.ps1 -Lang de|en` (pdflatex×3 + bibtex; jobname `diplomarbeit-<lang>`). Prüfen: `.log`
  (`^!`-Errors / `Reference .* undefined` / `Citation .* undefined` / `Overfull`) UND `.blg` (`^(Warning--|---)`).
- **cache-engine (read-only):** `…\Code\external\comdare-cache-engine`; Architektur-Wahrheit Doc 36.
- **Scratchpad-Skripte dieser Session** (Muster für Massen-Edits, wiederverwendbar):
  `…\scratchpad\apply_pcites.py` (P-Cite-Apply m. Key-Verifikation), `apply_footers.py` (Footer-Cites),
  `apply_organs.py` (Organ-Sätze), `apply_alloc.py` (Allokator-Entkollision + bib-append).
- **Commits OHNE `Co-Authored-By`-Trailer** (TU-Governance). Keine „erledigt"-Claims für Unimplementiertes.

---

## 7. PROVENIENZ-GOVERNANCE (weiterhin bindend)
Nur Autor-Ideen (`%`-Kommentare/Coding-Docs) ODER zitierte Primärquellen in den Text. Modell-Ideen NIE ohne ausdrückliche
Freigabe → erst Chat-Vorschlag, Autor prüft, dann persistieren. Web-Quellen: keine Wikipedia, nur Primärquellen
(verify-don't-guess). DOIs nur eintragen, wenn sicher (lieber kein DOI als ein falscher). Diese Session: Metapher-Wording,
Anatomie-Formulierung, A→Key-Mapping, neue Bib-Einträge — alle vom User vorab freigegeben.

---

## 8. NÄCHSTE-SESSION-CHECKLISTE
1. `git pull --no-rebase origin main`; diese Übergabe + die 2026-06-22-Übergabe + Doc 36 lesen.
2. §0 abarbeiten: T15-Normalisierung + 5 Footer fertig zitieren (Keys in §5; Skript-Muster §6) → Build (.log+.blg) → commit.
3. Verbleibende Anhang-D-Daten-TODOs (§5) dem User vorlegen (P?, Allokator-Zahl 25, Std_Malloc, Footer-Plausibilität, NetDB/ICPADS).
4. Danach: ggf. Anatomie-Metapher in weiteren Kapiteln konsistent prüfen; Kap. 4–8 EN-Äquivalenz fortführen (#82 AP-EN).
