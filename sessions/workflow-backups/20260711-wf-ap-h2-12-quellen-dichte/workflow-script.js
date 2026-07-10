export const meta = {
  name: 'ap-h2-12-quellen-dichte-abgleich',
  description: 'AP-H2-12: Quellen-Voll-Abgleich + Informationsdichte Ur-Fassung vs. neue 6er-Struktur',
  phases: [
    { title: 'Laden', detail: 'Key-Liste laden' },
    { title: 'Quellen-Sweep', detail: '20 Agenten, je 8 bib-Keys: Verwertung alt vs. neu' },
    { title: 'Sektions-Dichte', detail: '8 Agenten: Alt-Kapitel vs. Neu-Struktur Faktendichte' },
    { title: 'Synthese', detail: 'Gap-Report je Ziel-Abschnitt der neuen Struktur' },
  ],
}

const OLD = 'C:/Users/benja/AppData/Local/Temp/claude/C--WINDOWS-system32/680a2413-b796-4bfa-894a-145cc51bd941/scratchpad/urfassung'
const NEU = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit'
const KEYSFILE = 'C:/Users/benja/AppData/Local/Temp/claude/C--WINDOWS-system32/680a2413-b796-4bfa-894a-145cc51bd941/scratchpad/cited_keys.json'

const NEW_CHAPTERS = '01_einleitung, 02_suchbaeume_grundlagen, 03_messsystem_prtart, 04_implementierung, 05_evaluation, 06_fazit'
const CONTEXT = `KONTEXT: Deutsche Diplomarbeit (LaTeX). URFASSUNG (8 Kapitel, vor Habich-Runde 1) liegt unter ${OLD}/kapitel/*.tex + ${OLD}/anhang/*.tex. NEUE FASSUNG (6 Kapitel nach Refactor) liegt unter ${NEU}/kapitel/de/{${NEW_CHAPTERS}}.tex + ${NEU}/anhang/de/*.tex — WICHTIG: in ${NEU}/kapitel/de/ liegen AUCH un-eingebundene Alt-Dateien (01_introduction, 02_fundamentals, 03_state_of_the_art, 04_concept_architecture, 05_implementation, 06_evaluation_methodology, 07_results_evaluation, 08_conclusion u.ä.) — diese für die NEUE Fassung IGNORIEREN, nur die 6 genannten zählen. Neue Struktur: Kap.2=nur bekanntes Wissen (voll durchzitiert, Maßstab ist die Urfassung), Kap.3=Konzepte eines cache-aware Mess-Systems (§3.2 SOTA-Kataloge, §3.3 Anatomie-Modell, §3.4 Mess-System, §3.5 PRT-ART, §3.6 Heuristiken), Kap.4=Implementierung, Kap.5=Evaluation, Kap.6=Fazit.`

const THINNED_HINT = 'Vorab bekannt als zahlenmäßig verdünnt (alt->neu Zitierstellen): bender2002scanning 3->2, bender2002treelayout 3->2, drepper2007memory 3->2, graefe2001btree 4->3, hennessy2019architecture 7->4, hoefler2015benchmarking 4->2, idreos2018datacalculator 3->2, idreos2018periodic 2->1, intel_sdm 4->3, iso_cpp 4->3, mahling2025hotpath 4->3, mao2012masstree 9->8, mckenney2001rcu 10->9, mimalloc_bench 3->2, pugh1990skiplist 5->4, schmeisser2022b2tree 6->5, zhang2018surf 12->10, zhang2025hierarchical 6->5.'

const SWEEP_SCHEMA = {
  type: 'object', required: ['ok', 'thinned'], additionalProperties: false,
  properties: {
    ok: { type: 'array', items: { type: 'string' } },
    thinned: { type: 'array', items: {
      type: 'object', required: ['key', 'lost_facts', 'target_section', 'proposal'], additionalProperties: false,
      properties: {
        key: { type: 'string' },
        lost_facts: { type: 'array', items: { type: 'string' } },
        target_section: { type: 'string' },
        proposal: { type: 'string' },
      } } },
  },
}

const GAPS_SCHEMA = {
  type: 'object', required: ['gaps'], additionalProperties: false,
  properties: { gaps: { type: 'array', items: {
    type: 'object', required: ['topic', 'lost_facts', 'target_section', 'priority', 'proposal'], additionalProperties: false,
    properties: {
      topic: { type: 'string' },
      lost_facts: { type: 'array', items: { type: 'string' } },
      target_section: { type: 'string' },
      priority: { enum: ['HOCH', 'MITTEL', 'NIEDRIG'] },
      related_keys: { type: 'array', items: { type: 'string' } },
      proposal: { type: 'string' },
    } } } },
}

phase('Laden')
const keysResult = await agent(
  `Lies die Datei ${KEYSFILE} (JSON-Array von BibTeX-Keys) und gib EXAKT dieses Array als Feld 'keys' der strukturierten Ausgabe zurück (nichts hinzufügen/weglassen).`,
  { label: 'keys-laden', schema: { type: 'object', required: ['keys'], additionalProperties: false, properties: { keys: { type: 'array', items: { type: 'string' } } } } }
)
const keys = keysResult ? keysResult.keys : null
if (!keys || !keys.length) throw new Error('Key-Liste leer')
log(`${keys.length} Keys geladen`)

const chunks = []
for (let i = 0; i < keys.length; i += 8) chunks.push(keys.slice(i, i + 8))

const PAIRINGS = [
  ['01_introduction.tex', 'kapitel/de/01_einleitung.tex', 'Einleitung: Motivation, FF, Beiträge, Aufbau'],
  ['02_fundamentals.tex', 'kapitel/de/02_suchbaeume_grundlagen.tex (Nur-Bekanntes) + kapitel/de/03_messsystem_prtart.tex §3.3 (wohin eigene Konzepte zogen)', 'Grundlagen: Suchbäume, Hardware, Software-Mittel'],
  ['03_state_of_the_art.tex', 'kapitel/de/03_messsystem_prtart.tex §3.2 + anhang/de/D_building_block_matrix.tex', 'Stand der Technik: Kataloge, Achsen-Sezierung, Profile'],
  ['04_concept_architecture.tex', 'kapitel/de/03_messsystem_prtart.tex §3.3-3.6 + kapitel/de/04_implementierung.tex', 'Konzept/Architektur: Anatomie, Ebenen, ABI'],
  ['05_implementation.tex', 'kapitel/de/04_implementierung.tex', 'Implementierung: Repos, Achsen im Code, Pipeline'],
  ['06_evaluation_methodology.tex', 'kapitel/de/05_evaluation.tex', 'Evaluations-Methodik: Hypothesen, Workload-Routing, Plattformen'],
  ['07_results_evaluation.tex', 'kapitel/de/05_evaluation.tex', 'Ergebnisse/Auswertung'],
  ['08_conclusion.tex', 'kapitel/de/06_fazit.tex', 'Fazit: FF-Antworten, Limitationen, Ausblick'],
]

const sweepThunks = chunks.map((chunk, i) => () => agent(
  `${CONTEXT}

AUFGABE (Quellen-Verwertungs-Vergleich für ${chunk.length} bib-Keys): ${chunk.join(', ')}.
${THINNED_HINT}

Je Key: (1) Finde ALLE \\cite-Stellen des Keys in der URFASSUNG (grep in ${OLD}) und lies je Stelle den umgebenden Absatz. (2) Finde alle \\cite-Stellen in der NEUEN Fassung (nur die 6 neuen Kapitel + anhang/de) und lies die Absätze. (3) Vergleiche die INHALTLICHE VERWERTUNG der Quelle: Welche Fakten/Zahlen/Nuancen aus der Quelle nutzte die Urfassung, die in der neuen Fassung FEHLEN oder nur noch als bloße Namens-Nennung ohne Faktentiefe vorkommen? Bloßes Umformulieren oder Verschieben ist KEIN Verlust; ein Verlust liegt nur vor, wenn konkrete wissenschaftliche Information (Zahl, Mechanismus, Einordnung, Begründung) verschwunden oder substanziell verflacht ist.
Verdikt je Key: OK (in 'ok'-Array eintragen) oder THINNED (in 'thinned' mit: lost_facts = konkrete verlorene Fakten als Kurzsätze mit Urfassungs-Fundstelle Datei:~Zeile; target_section = Abschnitt der NEUEN Struktur, wo sie hingehören, z. B. "2.2" oder "3.4"; proposal = 1-2 Satz-Vorschlag der Wiedereinarbeitung). Sei streng gegen falsch-positive: lieber OK als erfundene Verluste. Deine finale Ausgabe ist NUR das strukturierte Objekt.`,
  { label: `sweep:${i + 1}/${chunks.length}`, phase: 'Quellen-Sweep', schema: SWEEP_SCHEMA }
))

const sectionThunks = PAIRINGS.map(([oldFile, newLoc, topic]) => () => agent(
  `${CONTEXT}

AUFGABE (Sektions-Dichte-Vergleich, Thema: ${topic}): Lies das ALT-Kapitel ${OLD}/kapitel/${oldFile} VOLLSTÄNDIG und vergleiche es abschnittsweise mit der neuen Heimat des Stoffs: ${NEU}/${newLoc}. Finde FAKTENDICHTE-REGRESSIONEN unabhängig von Zitat-Zählern: Absätze der Urfassung mit konkreten wissenschaftlichen Fakten (Zahlen, Mechanismen, Vergleichswerte, Begründungsketten, Beispiele), deren Substanz in der neuen Fassung fehlt, verflacht oder auf eine Aufzählung reduziert wurde. Verschobener, aber substanzgleicher Stoff ist KEINE Regression. Eigene Begriffswelt (Organe/Gattungen/Lebewesen/Achsen) gehört NICHT in Kap. 2 — ihr Fehlen dort ist Absicht, kein Verlust; prüfe stattdessen, ob sie in Kap. 3/4 substanzgleich angekommen ist. Je Gap: topic, lost_facts (Kurzsätze mit Alt-Fundstelle ~Zeile), target_section (neuer Abschnitt), priority (HOCH = echter wissenschaftlicher Substanzverlust; MITTEL = Nuance/Beispiel fehlt; NIEDRIG = stilistisch), related_keys (betroffene bib-Keys), proposal (1-3 Sätze). Maximal die 12 wichtigsten Gaps, streng gegen falsch-positive. Finale Ausgabe NUR das strukturierte Objekt.`,
  { label: `dichte:${oldFile.replace('.tex', '')}`, phase: 'Sektions-Dichte', schema: GAPS_SCHEMA }
))

const all = await parallel([...sweepThunks, ...sectionThunks])
const sweepResults = all.slice(0, sweepThunks.length).filter(Boolean)
const sectionResults = all.slice(sweepThunks.length).filter(Boolean)

const thinnedFindings = sweepResults.flatMap(r => r.thinned || [])
const okCount = sweepResults.reduce((n, r) => n + (r.ok ? r.ok.length : 0), 0)
const gaps = sectionResults.flatMap(r => r.gaps || [])
log(`Sweep: ${okCount} OK, ${thinnedFindings.length} THINNED; Sektions-Gaps: ${gaps.length}`)

phase('Synthese')
const report = await agent(
  `${CONTEXT}

AUFGABE (Synthese zu einem Gap-Report): Du bekommst (A) key-weise Verwertungs-Befunde und (B) sektionsweise Dichte-Gaps. Führe sie zusammen: dedupliziere überlappende Befunde (gleicher Stoff aus beiden Sweeps = EIN Eintrag), gruppiere nach ZIEL-ABSCHNITT der neuen Struktur (2.1, 2.2, ..., 3.2, 3.4, ..., Anhang D), priorisiere je Gruppe (HOCH zuerst). Prüfe Plausibilität: Befunde, die derselbe Stoff an anderer neuer Stelle widerlegt (verschoben statt verloren), streiche mit Vermerk. Format: Markdown-Report mit: Kopf (Datum 2026-07-11, Zweck AP-H2-12, Datenlage: ${okCount} OK-Keys, ${thinnedFindings.length} Key-Befunde, ${gaps.length} Sektions-Gaps), dann je Ziel-Abschnitt eine Tabelle bzw. Liste: Priorität | verlorene Fakten (mit Alt-Fundstelle) | betroffene Keys | konkreter Einarbeitungs-Vorschlag (1-3 Sätze deutsch). Am Ende: Abschnitt "GESTRICHENE FALSCH-POSITIVE" mit Begründung + Abschnitt "EMPFOHLENE REIHENFOLGE" (welche Gruppen zuerst). Gib NUR den Markdown-Report zurück.

(A) KEY-BEFUNDE (JSON):
${JSON.stringify(thinnedFindings)}

(B) SEKTIONS-GAPS (JSON):
${JSON.stringify(gaps)}`,
  { label: 'synthese', phase: 'Synthese' }
)

return { okCount, thinnedCount: thinnedFindings.length, gapCount: gaps.length, report, thinnedFindings, gaps }