export const meta = {
  name: 'ch4-grounding-vs-code-and-thesis',
  description: 'Erdet ALLE ch4-Behauptungen je gegen 3 Codebasen UND Thesis ch1-3/Anhaenge, prueft Redundanz, liefert Bearbeitungsvorschlag.',
  phases: [
    { title: 'Erdung', detail: '7 Subsystem-Agenten (Code+Thesis) + 2 Redundanz-Agenten, parallel' },
    { title: 'Synthese', detail: 'geerdeter Befund + konkreter ch4-Bearbeitungsvorschlag' },
  ],
}

const CODE = String.raw`C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\Code`
const THESIS = String.raw`C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\thesis\diplomarbeit`

const ROLE = `Du bist Erdungs-/Verifikations-Agent fuer Kapitel 4 (\"Konzept und Architektur\") einer TU-Dresden-Diplomarbeit (cache-bewusste Cache-Engine fuer Trie-Indexstrukturen). NUR LESEN (Read/Grep/Glob), NICHT editieren. DE ist Leitsprache.
DREI Codebasen (alle remote in sync, main):
- Diplomarbeit-Code (Orchestrator): ${CODE}  (v.a. 02_messung_driver/)
- cache-engine: ${CODE}\\external\\comdare-cache-engine  (Quell-Dirs: libs, adapters, apps, anatomy, search_engine, engine_choice, measurement, hardware_isa, modules, experiment, docs; NICHT build/ cmake-build-* *.obj scannen)
- PRT-ART: ${CODE}\\external\\comdare-prt-art  (Quell-Dir: prt_art/, docs/)
Thesis: ${THESIS}  (ch4 = kapitel/de/04_concept_architecture.tex; Gegenpruefung ch1-3 = kapitel/de/0{1,2,3}_*.tex; Anhaenge = anhang/de/, v.a. D_building_block_matrix.tex)
WICHTIG: Nutze das Grep-TOOL (ripgrep, schnell), ziele auf Quell-Dirs, meide build-Artefakte. Jede Behauptung MUSS belegt werden mit Datei:Zeile (Code) UND/ODER Thesis-Stelle. NICHT raten: wenn ein Identifier/Fakt im Code NICHT auffindbar ist, sage ehrlich \"not_in_code\" mit kurzer Such-Beschreibung. Eigennamen exakt zitieren.`

const GROUND_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['subsystem', 'claims', 'notes'],
  properties: {
    subsystem: { type: 'string' },
    claims: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      required: ['claim', 'ch4_stelle', 'code_verdikt', 'code_beleg', 'thesis_verdikt', 'thesis_beleg', 'korrektur_noetig', 'korrektur'],
      properties: {
        claim: { type: 'string', description: 'Die ch4-Behauptung (atomar)' },
        ch4_stelle: { type: 'string', description: 'Abschnitt/Label/Zeile in ch4' },
        code_verdikt: { type: 'string', enum: ['bestaetigt', 'widerlegt', 'nicht_im_code', 'teilweise', 'nicht_pruefbar'] },
        code_beleg: { type: 'string', description: 'Datei:Zeile oder Such-Beschreibung' },
        thesis_verdikt: { type: 'string', enum: ['konsistent', 'widerspruch', 'nicht_erwaehnt', 'teilweise'] },
        thesis_beleg: { type: 'string' },
        korrektur_noetig: { type: 'boolean' },
        korrektur: { type: 'string', description: 'Konkreter Fix-Vorschlag, falls noetig; sonst leer' },
      },
    } },
    notes: { type: 'string' },
  },
}

const REDUN_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['scope', 'redundanzen'],
  properties: {
    scope: { type: 'string' },
    redundanzen: { type: 'array', items: {
      type: 'object', additionalProperties: false,
      required: ['ch4_passage', 'dupliziert', 'empfehlung'],
      properties: {
        ch4_passage: { type: 'string' },
        dupliziert: { type: 'string', description: 'Welche ch1-3/Anhang-Stelle dasselbe schon sagt' },
        empfehlung: { type: 'string', description: 'kuerzen-auf-Verweis / behalten / umformulieren' },
      },
    } },
  },
}

const SUBSYS = [
  { key: 'eine-architektur', focus: `§4.4 \"Die eine Architektur\" + Abbildung fig:one-architecture. Pruefe gegen Code: existieren die Interfaces/Klassen IExecutionEngine, IAnatomyBase, IVirusExecutionEngine, eine SearchAlgorithm-Unterklasse, SearchAlgorithmAnatomy<C>, SearchAlgorithmAbiAdapter<A>? Ist es WIRKLICH EINE Hierarchie ohne Parallel-Baeume? Tragen Code-Identifier KEINE Metapher (\"Lebewesen\")? Gibt es genau 3 Gattungen (SearchAlgorithm/Container/Graph) und Container-Unterklassen Set/Sequence/Adapter/View? Ist \"SearchEngine\" nur eine ABI-Sicht (kein zweites Konstrukt)? Suche in cache-engine: anatomy/, search_engine/, engine_choice/, modules/, libs/. Gegenpruefung Thesis: ch2 ssec:own-framework + ch1.` },
  { key: 'achsen-19', focus: `§4.5/§4.6 Bausteine-Achsen. Pruefe gegen Code: gibt es GENAU 19 Hauptachsen mit den genannten Namen (Search-Algorithm, Cache-Traversal, Mapping, Path-Compression, Node-Type, Memory-Layout, Allocator, Prefetch, Concurrency, Serialization, Telemetry, Value-Handle, ISA, Index-Organization, I/O-Dispatch, Migration, Filter, Queuing-q1, Queuing-q2)? Stimmt \"~57 Sub-Achsen\"? Bietet die Allocator-Achse \"rund zwei Dutzend\" Varianten? Existiert ein IsComposition-Concept das die 19 erzwingt? Enumeriert je Achse ein std::variant die Konkretisierungen? Suche in cache-engine: libs/, modules/, anatomy/. Gegenpruefung Thesis: ch3 sec:sota-axes + Anhang D (T0-T18 Bausteine-Zahlen) + ch2.` },
  { key: 'abi-interface', focus: `§4.5 ABI + Abbildung fig:abi. Pruefe gegen Code: existiert eine C-stabile Funktion comdare_create_anatomy() die IAnatomyBase liefert? Gibt es die variadische Hybrid-API-Spezialisierung (1 Param -> vector-API, 2 -> map-API, N>2 -> map<K,tuple>)? Werden komplexe Schluessel per Fingerprint auf 16-Byte-Binaerstrings reduziert? L0aden/Verifizieren von Permutations-Modulen via LoadLibrary/dlopen? Suche in cache-engine: anatomy_module_loader, adapters/, modules/, anatomy/. Gegenpruefung Thesis: ch2 (std-map/vector-Interface, Fingerprint) + Anhang app:interfaces.` },
  { key: 'm-modell-pipeline', focus: `§4.3 M-Modell + Abbildung fig:m-model. Pruefe gegen Code: existieren die 4 Subsysteme messung_driver, CacheEngineBuilder, CacheEngine, Pruefling(PRT-ART) als getrennte Einheiten? Gibt es eine ExperimentDriver-Bibliothek mit einer SIEBEN-Phasen-Pipeline (Enumerate, Codegen, Compile, Load, Execute, Measure, Persist) PLUS 2 opt-in-Phasen (Hot-Compile, ABI-Vertrags-Funktionstest)? Existieren create_instance (Phase Execute) und run_workload? Ist die Cache-Engine<->Pruefling-Beziehung bidirektional? Suche in: ${CODE}\\02_messung_driver, cache-engine apps/, experiment/, measurement/. Gegenpruefung Thesis: ch6 ch:methodology (Pipeline/Phasen) + ch5 sec:repos.` },
  { key: 'prt-art', focus: `§4.7 PRT-ART als Pruefling. Pruefe gegen PRT-ART-Code (${CODE}\\external\\comdare-prt-art\\prt_art): welche Achsen stellt PRT-ART SELBST (laut ch4: Page, Layout, Free-List, Prefetch, Concurrency-Pattern, Measurement)? Existieren 4+2-Pool-Allokator, Distance-Estimator-Prefetch (oder Path-Oriented-Prefetch?), OLC mit reservierten Wert-Bloecken, H1/H2/H3-Metriken? Gibt es resolve_baustein.hpp (Compile-Time-Fallback) und PrtArtSearchEngine<Ts...>? Laeuft die Anbindung ueber Execution-Engine-Adapter (nicht eigene Such-Engine-Schicht)? Gegenpruefung Thesis: ch3 (PRT-ART als Rekonstruktions-Ziel) + Anhang D (PRT-ART-Bausteine).` },
  { key: 'builder-profile', focus: `§4.8 Builder + Drei-Stufen-Pruefung + tab:stage-series + fig:three-stage. Pruefe gegen Code: orchestriert der Builder eine Drei-Stufen-Pruefung (Stufe 1 nur Cache-Engine / Stufe 2 nur Pruefling / Stufe 3 Full Join)? Gibt es 30 SOTA-Profile (8 Rang-1 + 22 Rang-2/3) als XML? Stimmt das Stufe<->Messreihe-Mapping (1+2->A, 3->B, C build-uebergreifend)? Existiert MessreihenMode (Defined/Full)? Suche in: cache-engine apps/, experiment/, modules/, algorithm-profile-XMLs; ${CODE}\\02_messung_driver, experiment_config/, test_data_xml/. Gegenpruefung Thesis: ch1 (FF3, 8 Rang-1-Namen, 30 Profile) + ch6.` },
  { key: 'dialektik-eigenbeitrag', focus: `§4.2 Dialektik-Tabelle tab:dialectic. Pruefe NUR die als EIGENER Synthese-Beitrag markierten Bausteine gegen Code: existieren Path_Oriented_Prefetch (T7), Adaptive_Lsm_Flush/EWMA-Flush (T18), Chain_Ref (T11), NodeChunkedStore/Storage-Delegation (T4), Leaf_Only_Counter (T10)? Stimmen die \"uebernommen\"-Eigennamen je Achse grob mit dem Code/Anhang D ueberein? Suche in cache-engine libs/modules + prt-art prt_art/. Gegenpruefung Thesis: ch3 sec:sota-axes + Anhang D \"Beitragende Quellen\". Markiere jede Tabellen-Zelle die der Code NICHT stuetzt.` },
]

phase('Erdung')
const groundThunks = SUBSYS.map(s => () =>
  agent(`${ROLE}\n\nDEIN SUBSYSTEM (${s.key}):\n${s.focus}\n\nLies zuerst die ch4-Stelle in ${THESIS}\\kapitel\\de\\04_concept_architecture.tex, extrahiere die atomaren Behauptungen, dann erde JEDE gegen Code UND Thesis. Liefere pro Behauptung ein Verdikt + Beleg + (falls noetig) Korrektur.`,
    { label: `ground:${s.key}`, phase: 'Erdung', schema: GROUND_SCHEMA, effort: 'high' }))

const redunThunks = [
  { key: 'ch4-vs-ch1-3', focus: `Lies ch4 (04_concept_architecture.tex) und ch1-3 (01_introduction, 02_fundamentals, 03_state_of_the_art) und finde Stellen, an denen ch4 einen Sachverhalt ERNEUT voll ausfuehrt, der in ch1-3 bereits (besser platziert) steht (analog R1-R6: Achse=Organ, kartesisches Produkt, Idreos-Entwurfsraum, Lebewesen-Metapher, Bias, Provenienz, dialektische These-Antithese-Synthese-Definition). ch4 darf verweisen, nicht nacherzaehlen.` },
  { key: 'ch4-vs-anhang-intern', focus: `Lies ch4 und Anhang D (anhang/de/D_building_block_matrix.tex) sowie ch4-interne Doppelungen. Finde: (a) ch4 katalogisiert Achsen-/Bausteine-Details, die Anhang D bereits fuehrt (sollte nur verweisen); (b) ch4-INTERNE Redundanz (z.B. die 19-Achsen-Liste, das Stufe<->Reihe-Mapping, die Heuristik-Future-Work mehrfach).` },
].map(r => () =>
  agent(`${ROLE}\n\nREDUNDANZ-FOKUS (${r.key}):\n${r.focus}\n\nNUR Thesis lesen (kein Code noetig). Liefere konkrete Redundanz-Funde mit Empfehlung.`,
    { label: `redun:${r.key}`, phase: 'Erdung', schema: REDUN_SCHEMA, effort: 'high' }))

const results = (await parallel([...groundThunks, ...redunThunks])).filter(Boolean)

phase('Synthese')
const SYN_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['erdungs_uebersicht', 'fehlerhafte_oder_ungestuetzte_behauptungen', 'redundanzen', 'bearbeitungsvorschlag', 'offene_fragen_an_autor'],
  properties: {
    erdungs_uebersicht: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['subsystem', 'bestaetigt', 'probleme'], properties: { subsystem: { type: 'string' }, bestaetigt: { type: 'integer' }, probleme: { type: 'integer' } } } },
    fehlerhafte_oder_ungestuetzte_behauptungen: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['behauptung', 'problem', 'beleg', 'fix'], properties: { behauptung: { type: 'string' }, problem: { type: 'string', description: 'widerlegt / nicht_im_code / widerspruch zu ch1-3' }, beleg: { type: 'string' }, fix: { type: 'string' } } } },
    redundanzen: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['passage', 'dupliziert', 'fix'], properties: { passage: { type: 'string' }, dupliziert: { type: 'string' }, fix: { type: 'string' } } } },
    bearbeitungsvorschlag: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['sektion', 'aenderung', 'begruendung', 'code_geerdet'], properties: { sektion: { type: 'string' }, aenderung: { type: 'string' }, begruendung: { type: 'string' }, code_geerdet: { type: 'boolean' } } } },
    offene_fragen_an_autor: { type: 'array', items: { type: 'string' } },
  },
}
const synthese = await agent(
  `Du bist Synthese-Agent fuer den Text-Agenten. Aus den Erdungs- und Redundanz-Ergebnissen erstelle: (1) eine Uebersicht (je Subsystem bestaetigt/Probleme), (2) die Liste FEHLERHAFTER oder UNGESTUETZTER ch4-Behauptungen (widerlegt durch Code, nicht im Code auffindbar, oder Widerspruch zu ch1-3) mit konkretem Fix, (3) die Redundanzen mit Fix, (4) einen konkreten, priorisierten BEARBEITUNGSVORSCHLAG fuer ch4 (je Aenderung: Sektion, was aendern, Begruendung, ob code-geerdet), (5) offene Fragen an den Autor. Sei praezise und ehrlich: lieber \"nicht im Code auffindbar\" als geraten. Markiere klar, welche Fixes code-geerdet sind und welche Autor-Entscheidung brauchen.\n\nERGEBNISSE (JSON):\n${JSON.stringify(results, null, 2)}`,
  { label: 'synthese:ch4-grounding', phase: 'Synthese', schema: SYN_SCHEMA, effort: 'high' }
)

return { ground: results, synthese }
