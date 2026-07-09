export const meta = {
  name: 'p-number-cite-audit',
  description: 'Read-only Audit: findet Fließtext-Einzel-P-Nummern ohne \\cite und liefert exakte Ersetzungsvorschläge (P->bibkey)',
  phases: [{ title: 'Audit', detail: 'ein Agent pro Datei sucht Prosa-P-Nummern ohne benachbartes \\cite' }],
}

const BASE = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit'

const MAP = `P01=leis2013art P02=binna2018hot P03=mao2012masstree P04=boffa2024coco P05=fent2020start P06=schmeisser2022b2tree P07=wu2019wormhole P08=leis2016olc P09=jacobson1989louds P10=zhang2018surf P11=rao1999css P12=rao2000csb P13=hankins2003nodesize P14=samuel2005procaware P15=graefe2001btree P16=bender2000cobtree P17=bender2005coboblivious P18=saikkonen2008multilevel P19=saikkonen2016layout P20=mueller2025btreesback P21=chen2001prefetch P22=chen2002fractal P23=khan2010adaptive P24=naderan2016adaptivefilter P25=mahling2025hotpath P26=zhang2024pathprefix P27=zhang2025hierarchical P28=kuehn2023bplustree P29=mckenney2001rcu P30=michael2004hazard P31=ungethuem2017survey P32=schmidt2025hbm P33=berthold2023vampir`

const files = [
  'kapitel/de/01_introduction.tex', 'kapitel/en/01_introduction.tex',
  'kapitel/de/03_state_of_the_art.tex', 'kapitel/en/03_state_of_the_art.tex',
  'kapitel/de/05_implementation.tex', 'kapitel/en/05_implementation.tex',
  'kapitel/de/08_conclusion.tex', 'kapitel/en/08_conclusion.tex',
  'anhang/de/C_glossary.tex', 'anhang/en/C_glossary.tex',
  'anhang/de/D_building_block_matrix.tex', 'anhang/en/D_building_block_matrix.tex',
]

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file: { type: 'string' },
    insertions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          pNumber: { type: 'string' },
          bibKey: { type: 'string' },
          oldText: { type: 'string', description: 'EXAKTER, im File EINDEUTIGER Teilstring inkl. P-Nummer (genug Kontext fuer Eindeutigkeit)' },
          newText: { type: 'string', description: 'oldText mit ~\\cite{bibKey} unmittelbar nach der P-Nummern-Nennung eingefuegt' },
          note: { type: 'string' },
        },
        required: ['pNumber', 'bibKey', 'oldText', 'newText'],
      },
    },
    skippedSummary: { type: 'string', description: 'Was wurde uebersprungen (Tabellenzellen, Bereiche, bereits zitierte, Ueberschriften, Kommentare)' },
  },
  required: ['file', 'insertions', 'skippedSummary'],
}

phase('Audit')

const results = await parallel(files.map(f => () => {
  const path = `${BASE}/${f}`
  const prompt = `Du bist read-only Audit-Agent fuer eine LaTeX-Diplomarbeit. Aufgabe: Im File ${path} jede Stelle finden, an der eine P-Nummer (P01..P33) im FLIESSTEXT ein konkretes Paper benennt, aber KEIN \\cite traegt, und einen exakten Ersetzungsvorschlag liefern.

P-Nummer -> Bib-Key (AUTORITATIV, nutze GENAU diese Keys):
${MAP}

Lies das gesamte File. Melde eine Einfuegung NUR wenn ALLE Bedingungen gelten:
1. Die P-Nummer steht in laufendem FLIESSTEXT (NICHT innerhalb \\begin{tabular}...\\end{tabular} oder sonstigen Tabellen-Zellen; NICHT in \\section/\\subsection-Ueberschriften; NICHT in Kommentarzeilen, die mit % beginnen).
2. Sie referenziert EIN EINZELNES, konkretes Paper (NICHT ein Bereich wie \"P01--P28\" oder \"P11--P13\"; NICHT eine reine Aufzaehlungs-Liste von 3+ P-Nummern als Aggregat).
3. Es steht NICHT bereits ein \\cite{...} unmittelbar daneben (im selben Klammerausdruck/Satzglied).

Fuer jede solche Stelle gib zurueck:
- pNumber (z.B. \"P15\"), bibKey (aus der Karte; MUSS exakt passen),
- oldText: ein EXAKTER, im File EINDEUTIGER Teilstring, der die P-Nummern-Nennung enthaelt (nimm genug Kontext, damit er nur EINMAL im File vorkommt; KEINE Zeilenumbrueche erfinden -- kopiere woertlich inkl. evtl. vorhandener Umbrueche),
- newText: identisch zu oldText, aber mit \`~\\cite{bibKey}\` unmittelbar nach der P-Nummern-Nennung eingefuegt (Konvention wie im Korpus: nach der schliessenden Klammer einer Nennung \"(P15, 2001)\" -> \"(P15, 2001)~\\cite{graefe2001btree}\"; bei blanker Nennung \"P25 Mahling\" -> \"P25 Mahling~\\cite{mahling2025hotpath}\"). Fuege NUR das ~\\cite ein, aendere sonst NICHTS am oldText.

Wenn das File nur Tabellen-/Bereichs-/bereits-zitierte P-Nummern enthaelt: leere insertions-Liste. Du EDITIERST NICHTS (read-only). Erklaere in skippedSummary kurz, was du uebersprungen hast.`
  return agent(prompt, { label: f.replace(/.*\//, '').replace('.tex', ''), phase: 'Audit', schema: SCHEMA }).then(r => r || { file: f, insertions: [], skippedSummary: 'AGENT_FAILED' })
}))

const ok = results.filter(Boolean)
const total = ok.reduce((n, r) => n + (r.insertions ? r.insertions.length : 0), 0)
log(`Audit fertig: ${ok.length}/${files.length} Dateien | ${total} vorgeschlagene Einfuegungen`)

return { byFile: ok }
