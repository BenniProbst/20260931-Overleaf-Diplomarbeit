# KONTEXT-ÜBERGABE 2 — Thesis-Workstream (Stand 2026-06-24, Anhang-D-Footer/Zitate VOLLSTÄNDIG)

> Für die nächste Session (Text-Agent der Diplomarbeit „Aktive cache-bewusste Hardware-Adaption").
> Self-contained. Direkte Fortsetzung von `2026-06-24-UEBERGABE-anhang-d-konsolidierung-zitate-metapher.md`
> (= „Übergabe 1", HEAD damals `61e0666`). Diese Session hat die dort begonnene Anhang-D-Zitate-Arbeit
> **vollständig abgeschlossen**. Lies Übergabe 1 für die Vorgeschichte (Lebewesen-Metapher, Architektur-Wahrheit);
> diese Übergabe 2 dokumentiert die Footer-/Allokator-/SIMD-Zitate-Vollendung.

---

## 0. STATUS: ANHANG-D-FOOTER/ZITATE = ABGESCHLOSSEN

**Es ist NICHTS mehr offen an der Anhang-D-Zitate-Bereinigung.** Verifiziert:
- `P?`-Platzhalter: **0** · `& Paper (…)`-Platzhalter: **0** · Phantom-Quelle „Solodkyy/Bunkov": **0**.
- 22 Achsen-Footer durchgängig im 2-Kategorien-Format. Build DE+EN je **0 `.log`-Errors + 0 `.blg`-Warnungen**.
- HEAD `af81e0d`, alles auf `BenniProbst/20260931-Overleaf-Diplomarbeit` `main` gepusht.

**Was als Nächstes ansteht (NICHT mehr Anhang D):** Es gibt keinen erzwungenen nächsten Schritt aus dieser Arbeit.
Sinnvolle Kandidaten je nach User-Wunsch: (a) Kap. 4–8 EN-Äquivalenz fortführen (#82 AP-EN, aus Übergabe 1 §8),
(b) die Lebewesen-/Anatomie-Metapher in weiteren Kapiteln konsistent prüfen, (c) ein anderer Thesis-Workstream.
**Vor neuem Arbeitsblock: `git pull --no-rebase origin main`** (User editiert parallel in Overleaf).

---

## 1. COMMITS DIESER SESSION (chronologisch, alle gepusht)

| Commit | Inhalt |
|---|---|
| `3d40f14` | §0 aus Übergabe 1: T15-Migration + 5 Footer fertig zitieren; Kafka/D-Streams/HMalloc-Korrekturen; 3 `.blg`-Fixes (kreps `address`→raus, `note` aus vyukov_mpmc + desrochers_concurrentqueue). |
| `de92575` | Decision-1+2: Oracle8i-IOT korrekt (`srinivasan2000oracle8iiot`) in Row 599 + Footer 605; `srinivasan1991btree` separat erhalten + DOI `10.1145/119995.115860`. |
| `e076fcf` | Footer-Batch 1: T1/T2/T3/T10/T11/T17 ins 2-Kategorien-Format; **doc-weite Label-Umbenennung** „Beitragende Paper:"→„Beitragende Quellen:" / „Contributing papers:"→„Contributing sources:"; neuer Key `knuth1998taocp3`. |
| `e98dc55` | Footer-Batch 2a: T5–T9; neue Keys `abadi2008columnrow`, `dijkstra1965concurrent`, `courtois1971readers`, `herlihy1991waitfree`, `ziv1977lz77` (+ `michael1996queue` existierte). |
| `3b4bfdd` | Footer-Batch 2b: Allokator-A-Korpus-Einzelnachweise; neue Keys `bonwick1994slab`, `hunter2021temeraire`, `yang2023numalloc`, `herter2011cama` (**CAMA-DOI `.10`→`.11`!**), `reitz2024starmalloc` (+ `aigner2015scalloc` existierte); DOI-Listen-Footer → Verweis; Build-SIMD/HW leere Footer → „Quellen:". |
| `aecfddd` | Footer-Batch 2c: T0-Suchmethoden (Bausteine S10–S17 + Footer); neue Keys `schlegel2009kary`, `perl1978interpolation`, `khuong2017arraylayouts`. |
| `3f78b7c` | Footer-Batch 2d: Build-PG ins 2-Kategorien-Format (Provenienz P01–P04+Morrison+PRT-ART; Kontext P05/P06/P10/P11/P12/P13/P20). |
| `af81e0d` | Batch 2e: A14-Entwirrung (TEMERAIRE + Zhou) + A17-Phantom-Korrektur (Crystalline = Reclamation, Nikolaev/Ravindran, umbenannt) + SIMD-Spec-Paper (SVE/RVV/Tesla); neue Keys `zhou2024tcmallocwarehouse`, `nikolaev2021crystalline`, `nikolaev2024crystalline`, `stephens2017sve`, `minervini2023vitruvius`, `riscv_vector_spec_1_0`, `lindholm2008tesla`; Achsen-Titel → „Vektor-/Accelerator-Erweiterungs-Achse". |

> Vorheriger Session-Endpunkt war `61e0666` (Übergabe 1). Diese Session = `3d40f14`…`af81e0d` = **8 Commits, 25 neue Bib-Keys.**

---

## 2. DIE 25 NEUEN, WEB-VERIFIZIERTEN BIB-KEYS

Alle DOIs/Autoren/Venues per WebSearch geprüft (kein Raten). Gruppiert:

- **Flush/Queue (T18/T17):** `kreps2011kafka` (NetDB 2011), `zaharia2013dstreams` (D-Streams SOSP 2013, DOI 2522737), `li2019hmalloc` (ICPADS 2019, DOI **.00064**).
- **Index-Org (T13):** `srinivasan2000oracle8iiot` (Oracle8i-IOT VLDB 2000, S. 285–296).
- **T0/T1-Klassiker:** `knuth1998taocp3` (TAoCP Vol. 3), `schlegel2009kary` (DaMoN 2009, DOI 1565694.1565705), `perl1978interpolation` (CACM 1978, DOI 359545.359557), `khuong2017arraylayouts` (JEA 2017, DOI 3053370).
- **Memory-Layout/Serial. (T5/T9):** `abadi2008columnrow` (SIGMOD 2008, DOI 1376616.1376712), `ziv1977lz77` (IEEE-IT 1977, DOI 10.1109/TIT.1977.1055714).
- **Concurrency (T8):** `dijkstra1965concurrent` (CACM 1965, DOI 365559.365617), `courtois1971readers` (CACM 1971, DOI 362759.362813), `herlihy1991waitfree` (TOPLAS 1991, DOI 114005.102808).
- **Allokatoren (A-Korpus):** `bonwick1994slab` (USENIX 1994, S. 87–98), `hunter2021temeraire` (TEMERAIRE OSDI 2021), `yang2023numalloc` (ISMM 2023, DOI 3591195.3595276), `herter2011cama` (ECRTS 2011, DOI **10.1109/ECRTS.2011.11**), `reitz2024starmalloc` (OOPSLA 2024, DOI 3689773), `zhou2024tcmallocwarehouse` (ASPLOS 2024, DOI 3620666.3651350), `nikolaev2021crystalline` (DISC 2021 LIPIcs, DOI 10.4230/LIPIcs.DISC.2021.60), `nikolaev2024crystalline` (PACMPL/PLDI 2024, DOI 3658851).
- **SIMD-Specs (Build-SIMD):** `stephens2017sve` (IEEE Micro 2017, DOI 10.1109/MM.2017.35), `minervini2023vitruvius` (TACO 2023, DOI 3575861 — Implementierungs-Beispiel, NICHT die RVV-Spec!), `riscv_vector_spec_1_0` (@misc, RVV v1.0), `lindholm2008tesla` (IEEE Micro 2008, DOI 10.1109/MM.2008.31).

> Existierende, in dieser Session NEU zitierte (kein neuer Key): `michael1996queue`, `aigner2015scalloc`, `morrison1968patricia`, `wu2019wormhole`, `luo2023smart`, `tene_hdrhistogram`, `pugh1990skiplist`, `bayer1972btree`, `driscoll1989persistent`, `arm_arm`.

---

## 3. FOOTER-FORMAT-KONVENTION (VERBINDLICH für künftige Anhang-D-Arbeit)

User-Regelwerk (Decision 4), jetzt durchgängig umgesetzt:
- **`\emph{Beitragende Quellen:}`** — nur Quellen, die in **mindestens einer Baustein-Zeile** konkret als Ursprung,
  Re-Implementierungsquelle oder direkte technische Vorlage genannt sind (Baustein-Provenienz).
- **`\emph{Verwandte Literatur:}`** (EN `Related literature:`) — zweite Zeile (durch Leerzeile getrennt) für Quellen,
  die die Achse motivieren/kontextualisieren, aber keinen konkreten Baustein liefern (typisch: die übrigen P-Nummern
  aus der Kapitel-Übersichtstabelle Z. 171–192 in `kapitel/de/03_state_of_the_art.tex`).
- **`\emph{Quellen:}`** (EN `Sources:`) — für reine Hardware-/Spec-Achsen (Build-SIMD/HW), die keine Paper im engeren
  Sinn haben, sondern Standards/Whitepaper.
- **Reine Baseline-Achsen** (z. B. T2): `\emph{Beitragende Quellen:} --- (CE-Baseline, eigene Wrapper).` + Verwandte-Zeile.
- **Wichtig:** Anhang-D-Footer sind **kuratierte Teilmengen** der Kapitel-Übersicht (Baustein-Provenienz ⊆ Achsen-Zuordnung).
  Footer ≠ Kapitel-P-Liste ist GEWOLLT. Nie blind die Kapitel-Liste in den Footer kopieren — immer gegen die Bausteine prüfen.

---

## 4. FALLSTRICKE / LEKTIONEN (NICHT wiederholen)

1. **VERIFIZIEREN, NIE RATEN — diese Session fing 8 Sach-/Attributionsfehler** (s. §5). Jeder neue Bib-Eintrag + jede
   „passt-schon"-Annahme wurde per WebSearch/Bausteine-Lesung belegt. Beispiel-Kette der falsch geratenen Vorannahmen,
   die erst beim Lesen auffielen: „Srinivasan = B-Tree-Concurrency" (falsch, = Oracle8i-IOT), „SOSP 2013 = Silo" (falsch,
   = D-Streams), „CAMA-DOI .10" (falsch, .11), „A17 = Solodkyy/Bunkov Allokator" (Phantom, = Nikolaev-Reclamation).
2. **`.blg` IMMER prüfen, nicht nur `.log`** (Übergabe-1-Fallstrick gilt weiter). Neue Warnungen tauchen erst auf, wenn ein
   Eintrag ZITIERT wird (BibTeX verarbeitet nur `\cite`d Einträge) — deshalb war „letzte Session sauber" trügerisch.
   alphadin-Regeln: `@book` braucht `edition`; `@misc` verträgt KEINE `note` + keine verschachtelten `{()}`; `@inproceedings`
   mit `address` aber ohne `publisher` → Warnung (→ `address` weglassen). `number = {OOPSLA2}`/`{PLDI}` (nicht-numerisch) ist OK.
   `@misc`-Spec sauber = `howpublished = {\url{…}}`, kein separates `url`-Feld, kein `note`.
3. **ZWEI Allokator-Blöcke!** T6-Achsen-Block (kompakt, Quellspalte „P—") UND A-Korpus-Block (detailliert, Quellspalte
   `Axx~\cite{…}`). Korrekturen (A14/A17, Zählung 25, A22a/b/c) müssen in BEIDE. Der A-Korpus-Block trägt die echten Cites.
4. **Skript-Muster bewährt:** Python, `content.count(old)==exp`-Assertion, `newline=''` (LF erhalten), DE+EN getrennt wo
   Prosa abweicht / BOTH wo Quellspalten sprachneutral sind. **Fallstrick: erwartete Count ≠ 1** kam mehrfach vor —
   „JCSS 1989, STOC 1986" stand in Footer UND Baustein 781 (count 2 → `replace_all`); „Lamport 1983" 2× in Row 784;
   `\texttt{CrystallineAllocator} (A17)` 2× (beide Blöcke). Immer erst Count prüfen, dann Skript anpassen.
5. **Disambiguierung gleicher Footer-Strings:** „`\emph{Beitragende Quellen:} ---`" stand mehrfach (T12, Build-SIMD).
   Anker = Footer-Zeile + die **eindeutige Folge-`\section{…}`** im Match (DE/EN-Section-Titel ggf. unterschiedlich).
6. **EN-Quellspalten teils übersetzt:** z. B. T5 „P? (Abadi … verwandt)" (DE) vs „… related" (EN). Vor BOTH-Scope-Ersetzung
   prüfen, ob die Spalte wirklich byte-gleich ist; sonst file-spezifisch.
7. **`format_tex.py` NICHT auf Anhang D** (longtables) und NIE auf `diplomarbeit.tex` (Übergabe-1-Regel gilt weiter).
8. **Code-Identifier-Renames mit Vorsicht:** A17 `\texttt{CrystallineAllocator}`→`\texttt{CrystallineReclamation}` wurde
   auf **ausdrückliche User-Anweisung** gemacht (Name war sachlich falsch — Crystalline ist ein Reclamation-Schema). Analog
   blieb `Std\allowbreak{}Malloc` (A22a) bewusst UNverändert (kein `_Allocator`-Suffix), weil der C++-Klassenname nicht im
   Repo verifizierbar ist. Faustregel: Identifier nur umbenennen, wenn der alte Name objektiv falsch ist UND der User es deckt;
   sonst belassen. **Offen:** Falls die Engine-Klasse wirklich `CrystallineAllocator` heißt, ist im Code ein Rename fällig (Impl-Agent).
9. **Overleaf-Sync:** Nach jedem Push „Pull GitHub changes into Overleaf" + neu kompilieren; `git pull --no-rebase` vor jedem Edit-Block.
   Die `LF will be replaced by CRLF`-Git-Warnung ist harmlos (autocrlf), kein Handlungsbedarf.

---

## 5. DURCH VERIFIKATION GEFANGENE FEHLER (Beleg, dass „prüfen" zwingend ist)

| Stelle | War falsch | Korrekt (web/Bausteine-belegt) |
|---|---|---|
| HMalloc-DOI (A15, Row+Footer) | `10.1109/ICPADS47876.2019.00114` (= BERT-Textklassifikations-Paper!) | `…00064`, pp. 406–409 (`li2019hmalloc`) |
| CAMA-DOI (A12) | `10.1109/ECRTS.2011.10` | `…ECRTS.2011.11`, pp. 23–32 (`herter2011cama`) |
| Footer 830 „SOSP 2013" (T18) | Silo (`tu2013silo`) | D-Streams Zaharia (`zaharia2013dstreams`) |
| Footer 605 „Srinivasan, Carey & Livny 2000" (T13) | `srinivasan1991btree` (B-Tree-Concurrency) | Oracle8i-IOT VLDB 2000 (`srinivasan2000oracle8iiot`) |
| A14-Beschreibung | „Hunter (Google ASPLOS 2024)" | Hunter TEMERAIRE OSDI 2021 + Zhou et al. ASPLOS 2024 |
| A17 (`CrystallineAllocator`) | „Solodkyy/Bunkov PLDI 2021, Dafny, Allokator" (Phantom) | Crystalline = wait-free **Reclamation** (Nikolaev/Ravindran, DISC 2021 + PLDI 2024) |
| RVV-Quelle (Build-SIMD) | TACO `3575861` als „RVV-Spec" | TACO = Vitruvius+ (Beispiel); RVV-v1.0-Spec separat |
| Footer 791 „Lamport 1983" (T17) | 1983 | 1977 („Concurrent Reading and Writing", `lamport_spsc`) |
| Footer 791 „P04 (Bw-Tree …)" | P04 = CoCo-Trie | Bw-Tree = `levandoski2013bwtree` |

---

## 6. BEWUSST OFFEN / BELASSEN (User-Entscheidungen)

- **`srinivasan1991btree` + `tu2013silo`** bleiben in der `.bib` (verifiziert korrekt, aktuell unzitiert; im Verzeichnis nur
  Zitiertes → erscheinen nicht; harmlos). Nicht löschen.
- **T4/T14/T16/T18** unverändert (User: „weitgehend stabil"). T4 = nur P01 (Provenienz, minimal — bewusst keine Verwandte-Zeile).
- **A22a/`Std\allowbreak{}Malloc`-Benennung:** bewusst belassen, kein `_Allocator`-Suffix (s. §4 Pkt. 8). Zählung autoritativ = **25**
  (A01–A21 + A22a/b/c + A23), in beiden Blöcken konsistent + im Fließtext Z. ~952 ausgeschrieben.
- **A17-Code-Klassen-Rename** (CrystallineAllocator→CrystallineReclamation im Engine-Code): an Impl-Agent, falls Klasse so heißt.

---

## 7. ARBEITS-INFRASTRUKTUR / PFADE

- **Repo:** `C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\thesis\diplomarbeit` (HEAD `af81e0d`).
- **Build:** `pwsh -NoProfile -File build.ps1 -Lang de|en` (pdflatex×3 + bibtex; jobname `diplomarbeit-<lang>`).
  Prüfen: `.log` (`^!` / `Reference|Citation .* undefined`) UND `.blg` (`^(Warning--|---)`; Zähler `warning$ -- N`, N=0 sauber).
- **Anhang-D-Datei:** `anhang/{de,en}/D_building_block_matrix.tex` (~1020 Zeilen). Achsen-Sektionen via `\section{TN …}`-Anker
  finden (Zeilennummern verschieben sich durch 2-Zeilen-Footer — nie hart auf Zeilennummern verlassen).
- **Kapitel-Achsen→P-Übersicht (autoritativ für Kontext-P-Nummern):** `kapitel/de/03_state_of_the_art.tex` Z. ~171–192.
- **Scratchpad-Skripte dieser Session** (Massen-Edit-Muster, wiederverwendbar): `apply_d_cites.py`, `apply_d_cites2.py`,
  `apply_oracle8i.py`, `apply_footers_batch1.py`, `apply_footers_batch2a.py`…`2e.py` (im Session-Scratchpad).
- **Commits OHNE `Co-Authored-By`-Trailer** (TU-Governance). Keine „erledigt"-Claims für Ungebautes.

---

## 8. PROVENIENZ-GOVERNANCE (weiterhin bindend)
Nur Autor-Ideen (`%`-Kommentare/Coding-Docs) ODER zitierte Primärquellen in den Text. Modell-Ideen NIE ohne ausdrückliche
Freigabe. Web-Quellen: keine Wikipedia, nur Primärquellen; DOIs nur wenn sicher (lieber kein DOI als ein falscher —
deshalb wurden Seitenzahlen mehrfach weggelassen statt geraten). Diese Session: alle 25 Keys + alle Footer-Umstrukturierungen
+ A14/A17-Korrekturen + SIMD-Cites waren vom User vorab freigegeben (Decision-1–4 + Batch-2e-Antwort mit BibTeX-Vorlagen).

---

## 9. NÄCHSTE-SESSION-CHECKLISTE
1. `git pull --no-rebase origin main`; diese Übergabe 2 + Übergabe 1 + ggf. Doc 36 (Architektur-Wahrheit) lesen.
2. Anhang-D-Zitate sind FERTIG — dort nur noch arbeiten, wenn der User explizit etwas Neues anstößt.
3. Falls der User Anhang D weiterführt: Footer-Format-Konvention §3 + Fallstricke §4 strikt befolgen; immer Bausteine lesen,
   nie Kapitel-P-Liste blind kopieren; `.blg` prüfen; beide Allokator-Blöcke bedenken.
4. Wahrscheinlicher echter nächster Workstream (User-Wahl): Kap. 4–8 EN-Äquivalenz (#82) oder Metapher-Konsistenz weitere Kapitel.
