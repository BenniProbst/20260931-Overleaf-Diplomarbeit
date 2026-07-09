export const meta = {
  name: 'ch4-zielstruktur-planung',
  description: 'Text-Agent-Planungssession: code-unabhaengige Ziel-Struktur fuer Kapitel 4 (Konzept und Architektur), geerdet an Thesis-Materialien.',
  phases: [
    { title: 'Analyse', detail: '4 parallele read-only Agenten erden an ch4/ch1-3/AnhangD/ch5-8 + Architektur-Modell' },
    { title: 'Synthese', detail: 'Ziel-Struktur + Impl-Agent-Abhaengigkeiten + Redundanz-/Hygiene-Karte' },
  ],
}

const BASE = String.raw`C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\thesis\diplomarbeit`
const ROLE = `Du bist Analyse-Agent fuer den TEXT-Agenten einer TU-Dresden-Diplomarbeit (\"Aktive cache-bewusste Hardware-Adaption: Cache-Engine fuer Trie-basierte Indexstrukturen\"). NUR lesen (Read/Grep), NICHT editieren, KEIN Code lesen (Code-Bezug macht ein separater Implementierungs-Agent). DE ist Leitsprache. Ziel der Session: die code-UNABHAENGIGE Ziel-Struktur von Kapitel 4 (\"Konzept und Architektur\", Datei kapitel/de/04_concept_architecture.tex) planen. Liefere praezise, belegte Befunde mit Datei/Zeilen-Bezug.`

const CANON = `Etabliertes Architektur-Modell (kanonisch, aus ch4 §4.3 + ch1 §1.4): EINE Hierarchie, kein Parallel-Baum. Wurzel IExecutionEngine (alles Ausmessbare) -> Geschwister IAnatomyBase (\"Lebewesen\") und IVirusExecutionEngine (achsenlose Viren). Lebewesen ≡ SearchAlgorithm (Metapher = technischer Begriff, EIN Gegenstand). Koerper = Anatomie = feste Komposition der 19 Achsen-Organe (T0-T18); Anatomie = Verdrahtung ZWISCHEN den Organen (Achsen nutzen Interfaces anderer Achsen, z.B. T6 Allokation). \"SearchEngine\" = nur ABI-Laufzeit-SICHT desselben Lebewesens (CacheEngine->ExecutionEngine->SearchEngine), KEIN zweites Konstrukt. M-Modell = 4 Subsysteme (messung_driver, CacheEngineBuilder, CacheEngine, Pruefling PRT-ART). VERBOTEN in der Struktur: \"parallel/orthogonal\" zwei Modelle, \"5 Gattungen\", Metapher in Code-Identifiern.`

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['focus', 'findings', 'punkte_fuer_ch4_struktur'],
  properties: {
    focus: { type: 'string' },
    findings: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      required: ['befund', 'beleg', 'relevanz'],
      properties: {
        befund: { type: 'string' },
        beleg: { type: 'string', description: 'Datei + Zeile/Abschnitt' },
        relevanz: { type: 'string', description: 'Was folgt daraus fuer die ch4-Ziel-Struktur?' },
      },
    } },
    punkte_fuer_ch4_struktur: { type: 'array', items: { type: 'string' }, description: 'Konkrete Struktur-Implikationen (welche Sektion, was rein, was als Verweis, was an Impl-Agent delegieren).' },
  },
}

const ANGLES = [
  { key: 'ch4-ist-inventar', prompt: `Lies kapitel/de/04_concept_architecture.tex VOLLSTAENDIG. Inventarisiere die aktuellen Sektionen (4.1-4.7 + 4.7.1) und bewerte je Sektion: was steht drin, was ist zu duenn/lueckenhaft, was ist Redundanz zu ch1-3 (z.B. Idreos-Entwurfsraum/kartesisches Produkt in §4.1 ~Z.39 dupliziert ch3 §3.6.1 und das gerade in ch2 entschaerfte Material), und welche Code-Tiefe fehlt (was \"die Architektur zeigen\" erfordert). Notiere auch die Quelltext-Hygiene: Fehl-Einrueckung ab §4.3 (verbatim-Artefakt).` },
  { key: 'vorwaerts-verweise', prompt: `Durchsuche kapitel/de/01_introduction.tex, 02_fundamentals.tex, 03_state_of_the_art.tex nach allen Verweisen/Versprechen, die in Kapitel 4 (\\ref{ch:concept}, \\ref{sec:...} mit ch4-Labels wie sec:axis-framework/sec:m-model/sec:three-layer/sec:abi/sec:axes/sec:prt-art/sec:builder, sowie Formulierungen \"entwickelt Kapitel 4\", \"Kapitel~\\ref{ch:concept} ... dialektisch / ausfuehrlich\") ZEIGEN. Extrahiere die VERTRAGLICHE Liste: was MUSS ch4 laut diesen Vorwaerts-Verweisen liefern (z.B. dialektische These-Antithese-Synthese der SOTA-Instanzen, die geschichtete Architektur, ABI-Schnittstelle, 19-Achsen-Permutationsmatrix, thematische Achsen-Repositorien + Sub-Achsen)? ${CANON}` },
  { key: 'anhangD-abgrenzung', prompt: `Lies die Struktur von anhang/de/D_building_block_matrix.tex (Sektions-Ueberschriften T0-T18 + Build-Achsen + A-Korpus) und kapitel/de/03_state_of_the_art.tex §3.3 (Achsen-Sezierung, tab:axes-overview). Bestimme die ARBEITSTEILUNG: Was dokumentiert Anhang D bereits (per-Achse Bausteine-Katalog) und was ch3 (SOTA-Sezierung je Achse)? Daraus: Welche Achsen-/Bausteine-Details darf ch4 NUR REFERENZIEREN (nicht erneut katalogisieren), und was ist ch4s EIGENER, nicht anderswo abgedeckter Beitrag (die Engine-Architektur, das M-Modell, die EINE Hierarchie, ABI, der Permutations-/Builder-Mechanismus, PRT-ART als Pruefling)?` },
  { key: 'rueckwaerts-bedarf', prompt: `Durchsuche kapitel/de/05_implementation.tex, 06_evaluation_methodology.tex, 07_results_evaluation.tex, 08_conclusion.tex nach Rueckverweisen auf Kapitel 4 (\\ref{ch:concept} + ch4-Labels) und nach Begriffen, die ch4 definieren MUSS, damit die spaeteren Kapitel darauf aufbauen koennen (z.B. die drei Stufen/Messreihen A-C, die 19 Achsen, M-Modell-Subsysteme, ABI-Module, Heuristik-Auswahl). Extrahiere: welche Konzepte erwartet der Rest der Arbeit als in ch4 etabliert? Was davon ist code-abhaengig (-> Anforderung an Impl-Agent) und was rein konzeptionell (-> Text-Agent kann es jetzt strukturieren)?` },
]

phase('Analyse')
const analysen = (await parallel(ANGLES.map(a => () =>
  agent(`${ROLE}\n\nDEIN FOKUS (${a.key}):\n${a.prompt}\n\nBasis-Pfad der Dateien: ${BASE}`,
    { label: `analyse:${a.key}`, phase: 'Analyse', schema: SCHEMA, effort: 'high' })
))).filter(Boolean)

phase('Synthese')
const SYN_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['ziel_struktur', 'redundanzen_entfernen', 'hygiene', 'impl_agent_abhaengigkeiten', 'offene_fragen_an_autor'],
  properties: {
    ziel_struktur: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      required: ['nummer', 'titel', 'zweck', 'inhalt', 'verweist_statt_dupliziert', 'code_abhaengig'],
      properties: {
        nummer: { type: 'string' },
        titel: { type: 'string' },
        zweck: { type: 'string' },
        inhalt: { type: 'string', description: 'Was die Sektion entwickelt (Text-Seite).' },
        verweist_statt_dupliziert: { type: 'string', description: 'Welche ch1-3/AnhangD-Inhalte nur referenziert werden.' },
        code_abhaengig: { type: 'string', description: 'Welche Tiefe der Impl-Agent (Code-Bereinigung/Verifikation) liefern muss, bevor die Sektion gefuellt werden kann.' },
      },
    } },
    redundanzen_entfernen: { type: 'array', items: { type: 'string' } },
    hygiene: { type: 'array', items: { type: 'string' } },
    impl_agent_abhaengigkeiten: { type: 'array', items: { type: 'string' }, description: 'Konsolidierte Liste der code-seitigen Voraussetzungen (Uebergabe an Impl-Agent).' },
    offene_fragen_an_autor: { type: 'array', items: { type: 'string' } },
  },
}
const synthese = await agent(
  `Du bist Synthese-/Struktur-Architekt fuer den Text-Agenten. Aus den 4 Analyse-Ergebnissen erstelle die code-UNABHAENGIGE ZIEL-STRUKTUR von Kapitel 4 (Konzept und Architektur). Regeln: (1) EINE Architektur (kein Parallel-Modell), faithful zum kanonischen Modell. (2) Kein Re-Katalogisieren von Anhang-D-Achsen/ch3-Sezierung -> nur Verweise. (3) Keine ch1-3-Redundanz (Idreos/kartesisches Produkt, Bias, Provenienz gehoeren NICHT erneut voll in ch4). (4) Jede Sektion: Zweck + Text-Inhalt + was nur referenziert wird + was code-abhaengig ist (Impl-Agent-Anforderung). (5) Decke ALLE vertraglichen Vorwaerts-Versprechen aus ch1-3 und den Rueckwaerts-Bedarf aus ch5-8 ab. Sei konkret und nummeriert.\n\nKANONISCHES MODELL:\n${CANON}\n\nANALYSE-ERGEBNISSE (JSON):\n${JSON.stringify(analysen, null, 2)}`,
  { label: 'synthese:ziel-struktur', phase: 'Synthese', schema: SYN_SCHEMA, effort: 'high' }
)

return { analysen, synthese }
