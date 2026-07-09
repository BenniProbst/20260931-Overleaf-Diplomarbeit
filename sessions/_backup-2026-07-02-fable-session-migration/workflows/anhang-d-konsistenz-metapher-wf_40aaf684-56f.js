export const meta = {
  name: 'anhang-d-konsistenz-metapher',
  description: 'Read-only: Anhang D gegen Gesamt-Arbeit + cache-engine-Code pruefen (Lebewesen-Metapher-Vollstaendigkeit, Begriffs-Konsistenz, Footer-Cite-Aufloesung)',
  phases: [
    { title: 'GroundTruth', detail: 'kanonische Metapher + Achsen-Katalog aus Doc 36/ch4 + Code' },
    { title: 'Audit', detail: 'D-de + D-en Metapher/Terminologie + Footer-Cite-Aufloesung' },
  ],
}

const THESIS = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit'
const CE = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Code/external/comdare-cache-engine'
const Dde = `${THESIS}/anhang/de/D_building_block_matrix.tex`
const Den = `${THESIS}/anhang/en/D_building_block_matrix.tex`

const PMAP = `P01=leis2013art P02=binna2018hot P03=mao2012masstree P04=boffa2024coco P05=fent2020start P06=schmeisser2022b2tree P07=wu2019wormhole P08=leis2016olc P09=jacobson1989louds P10=zhang2018surf P11=rao1999css P12=rao2000csb P13=hankins2003nodesize P14=samuel2005procaware P15=graefe2001btree P16=bender2000cobtree P17=bender2005coboblivious P18=saikkonen2008multilevel P19=saikkonen2016layout P20=mueller2025btreesback P21=chen2001prefetch P22=chen2002fractal P23=khan2010adaptive P24=naderan2016adaptivefilter P25=mahling2025hotpath P26=zhang2024pathprefix P27=zhang2025hierarchical P28=kuehn2023bplustree P29=mckenney2001rcu P30=michael2004hazard P31=ungethuem2017survey P32=schmidt2025hbm P33=berthold2023vampir`

phase('GroundTruth')
const gt = await agent(
  `Du etablierst die KANONISCHE Begriffs-Ground-Truth fuer eine Diplomarbeit ("Aktive cache-bewusste Hardware-Adaption"). Lies:
- ${CE}/docs/architecture/36_eine_architektur_lebewesen_ist_searchalgorithm.md (MASSGEBLICH: die EINE Architektur)
- ${THESIS}/kapitel/de/04_concept_architecture.tex (Kap. 4 "Die eine Architektur")
- ${THESIS}/kapitel/de/03_state_of_the_art.tex Abschnitt 3.3 (Achsen-Sezierung; nur diesen Abschnitt)
Und greppe/erkunde im Code ${CE} die realen Achsen-Bezeichner (z.B. axis_NN_name, die 19 Achsen T0-T18, Building-Block-/Composition-Klassennamen).

Liefere kompakt die Ground-Truth: (1) das Metapher-Modell (IExecutionEngine -> Lebewesen=IAnatomyBase/Viren -> Gattung -> SearchAlgorithm -> SearchAlgorithmAnatomy=Koerper -> 19 Achsen ≡ Organe; Algorithmus = Punkt-Konfiguration aller 19 Achsen); welche Begriffe sind kanonisch (Lebewesen/Organ/Anatomie/Gattung/Achse) und welche superseded/verboten; (2) die kanonische Achsen-Liste T0-T18 mit Name + realem Code-Identifier (axis_NN_...); (3) wie die Achsen im Fliesstext als ORGANE eines LEBEWESENS gerahmt werden (Beispielformulierungen aus ch3.3/ch4). Deine Rueckgabe IST Referenzdaten fuer nachfolgende Audit-Agenten.`,
  { label: 'ground-truth', phase: 'GroundTruth' }
)

phase('Audit')
const [auditDe, auditEn, footers] = await parallel([
  () => agent(
    `Du auditierst read-only den deutschen Anhang D (Bausteine-Matrix) ${Dde} gegen die kanonische Ground-Truth. EDITIERE NICHTS.

GROUND-TRUTH:
${gt}

Lies ${Dde} VOLLSTAENDIG. Der User hat festgestellt, dass die LEBEWESEN-METAPHER in Anhang D UNVOLLSTAENDIG ist (Achsen werden nicht konsistent als Organe des Lebewesens gerahmt). Finde und melde mit exakten Zeilen-/Textbezuegen:
(A) METAPHER-LUECKEN: Wo rahmt D die Achsen NICHT als Organe / fehlt der Lebewesen-/Anatomie-Bezug (v.a. Kapitel-Intro Z.3-8 und die Sektions-Intro-Absaetze je Achse)? Liefere je Stelle einen konkreten, knappen Formulierungs-VORSCHLAG (deutsch), der die Metapher vervollstaendigt, OHNE neue inhaltliche Behauptungen zu erfinden (nur Rahmung an die etablierte Architektur angleichen).
(B) BEGRIFFS-INKONSISTENZEN: Achsen-Namen/Identifier, die NICHT zum kanonischen Achsen-Katalog oder zu den Code-Identifiern passen; superseded/uneinheitliche Begriffe.
(C) DATEN-/QUELLEN-FEHLER in Tabellen/Footern: P-Nummern, die nicht zum Korpus passen (z.B. 'P04 (Bw-Tree)' obwohl P04=CoCo-Trie laut Korpus), 'P-13b'-Notation etc.
Sei praezise, mit Zeilenbezug und Zitat.`,
    { label: 'audit-D-de', phase: 'Audit' }
  ),
  () => agent(
    `Du auditierst read-only den englischen Anhang D ${Den} gegen die kanonische Ground-Truth (EDITIERE NICHTS).

GROUND-TRUTH:
${gt}

Lies ${Den} VOLLSTAENDIG. Aufgabe analog: (A) wo ist die living-being/organ-Metapher unvollstaendig (Kapitel-Intro + Sektions-Intros) -> konkrete englische Formulierungs-Vorschlaege, die die Rahmung an die etablierte Architektur angleichen ohne neue Behauptungen; (B) Begriffs-/Terminologie-Inkonsistenzen vs Ground-Truth/Code; (C) Daten-/Quellen-Fehler (falsche P-Nummern-Zuordnungen, Nicht-Standard-Notation). Zusaetzlich: melde DE<->EN-STRUKTUR-Abweichungen, die dir auffallen (gleiche Achsen-Reihenfolge? gleiche Footer?). Praezise mit Zeilenbezug + Zitat.`,
    { label: 'audit-D-en', phase: 'Audit' }
  ),
  () => agent(
    `Du loest read-only die 'Beitragende Paper:'/'Contributing papers:'-Footer in BEIDEN Anhang-D-Dateien zu Bib-Cite-Keys auf (EDITIERE NICHTS). Dateien: ${Dde} und ${Den}. Bib-Datei: ${THESIS}/literatur.bib.

P-Nummer -> Bib-Key (autoritativ):
${PMAP}

Fuer JEDEN Footer (grep 'Beitragende Paper'/'Contributing papers'): liste die genannten Quellen und ordne jede einem Bib-Key zu:
- reine P-Nummern -> via Karte;
- Namens-Nennungen (z.B. 'Bayer \\& McCreight 1972', 'Comer 1979', 'Bloom 1970', 'Stonebraker-1981') -> passenden Bib-Key in literatur.bib suchen (per Autor/Jahr); wenn KEIN Eintrag existiert, als 'FEHLT-IN-BIB' markieren;
- DOIs -> passenden Eintrag per doi-Feld in literatur.bib suchen; sonst 'FEHLT-IN-BIB';
- 'PRT-ART' und reine Baselines -> 'KEIN-PAPER' (nicht zitierbar);
- leere Footer ('---'/'—') -> 'LEER'.
Melde je Footer (mit Zeilennummer + Datei): die Original-Liste, die aufgeloesten Keys (in Reihenfolge, dedupliziert), und etwaige Inkonsistenzen (z.B. 'P04 (Bw-Tree)' => P04=CoCo-Trie laut Karte, aber Text sagt Bw-Tree => KONFLIKT, Key unklar). Schlage je Footer die kompakte Cite-Form vor: '<Originalliste>~\\cite{key1,key2,...}'. Markiere klar, welche Footer NICHT sauber aufloesbar sind (Namen/DOIs ohne Bib-Eintrag, Konflikte).`,
    { label: 'footer-cites', phase: 'Audit' }
  ),
])

return { groundTruth: gt, auditDe, auditEn, footers }
