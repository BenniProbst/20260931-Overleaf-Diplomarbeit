export const meta = {
  name: 'subaxis-audit',
  description: 'Erdet pro Hauptachse die echten Sub-Achsen/Varianten im cache-engine-Code gegen die Thesis-Tabelle tab:axes-overview',
  phases: [{ title: 'Audit', detail: 'ein Explore-Agent je Achsen-Verzeichnis' }],
}

const ROOT = String.raw`C:\Users\benja\OneDrive\Desktop\Diplomarbeit - Datenbanken\Code\external\comdare-cache-engine\libs\cache_engine\topics`

const AXES = [
  { id: 'T0 search_algo',        rel: String.raw`traversal\axis_03a_search_algo`,        claim: 'SA1-SA3' },
  { id: 'T1 cache_traversal',    rel: String.raw`traversal\axis_03b_cache_traversal`,    claim: '3.B' },
  { id: 'T2 mapping',            rel: String.raw`traversal\axis_03m_mapping`,            claim: '3.M' },
  { id: 'T3 path_compression',   rel: String.raw`nodes\axis_02_path_compression`,        claim: '(keine angegeben)' },
  { id: 'T4 node_type',          rel: String.raw`nodes\axis_04_node_type`,               claim: 'NT1-NT3' },
  { id: 'T5 memory_layout',      rel: String.raw`memory_layout\axis_05_memory_layout`,   claim: 'HM1-HM4' },
  { id: 'T6 allocator',          rel: String.raw`allocator\axis_06_allocator`,           claim: '6.1-6.5 (Thesis ch4 sagt anderswo "sieben Sub-Familien" - WIDERSPRUCH pruefen; User: es gibt wesentlich mehr Allokatoren)' },
  { id: 'T7 prefetch',           rel: String.raw`prefetch\axis_07_prefetch`,             claim: 'PF1-PF3' },
  { id: 'T8 concurrency',        rel: String.raw`concurrency\axis_08_concurrency`,       claim: '8.1,8.2' },
  { id: 'T9 serialization',      rel: String.raw`serialization\axis_10_serialization`,   claim: '(keine angegeben)' },
  { id: 'T10 telemetry',         rel: String.raw`telemetry\axis_11_telemetry`,           claim: '11.X1-X4' },
  { id: 'T11 value_handle',      rel: String.raw`value_handle\axis_14_value_handle`,     claim: '(keine angegeben)' },
  { id: 'T12 isa',               rel: String.raw`hardware\axis_09_isa`,                  claim: '(keine angegeben)' },
  { id: 'T13 index_organization',rel: String.raw`search_engine\axis_01_index_organization`, claim: '(keine angegeben)' },
  { id: 'T14 io_dispatch',       rel: String.raw`io\axis_io`,                            claim: 'IO1-IO3' },
  { id: 'T15 migration_policy',  rel: String.raw`migration\axis_migration`,              claim: 'MG1-MG3' },
  { id: 'T16 filter',            rel: String.raw`filter\axis_filter`,                    claim: 'FT1-FT3' },
  { id: 'T17 queuing_q1',        rel: String.raw`queuing\axis_q1_queuing`,               claim: '(keine angegeben)' },
  { id: 'T18 queuing_q2',        rel: String.raw`queuing\axis_q2_queuing`,               claim: '(keine angegeben)' },
  { id: 'Build page_type',       rel: String.raw`nodes\axis_01_page_type`,               claim: 'PG1-PG3' },
  { id: 'Build simd',            rel: String.raw`hardware\axis_09b_simd_extension`,      claim: '(keine angegeben)' },
  { id: 'Build hardware',        rel: String.raw`hardware\axis_12_general_hardware`,     claim: '12.1-12.5' },
]

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['thesis_id', 'real_subaxis_count', 'real_subaxes', 'variant_count', 'matches_thesis', 'discrepancy', 'enrichment_suggestion'],
  properties: {
    thesis_id: { type: 'string' },
    real_subaxis_count: { type: 'integer' },
    real_subaxes: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'name'], properties: { id: { type: 'string' }, name: { type: 'string' } } } },
    variant_count: { type: 'integer', description: 'Anzahl konkreter Varianten-/Strategie-Implementierungen in dieser Achse' },
    variants_sample: { type: 'array', items: { type: 'string' }, description: 'Beispiel-Varianten (z.B. Allokator-Namen)' },
    matches_thesis: { type: 'boolean' },
    discrepancy: { type: 'string', description: 'Worin Code und Thesis-Behauptung abweichen (kurz)' },
    enrichment_suggestion: { type: 'string', description: 'Konkreter Vorschlag fuer die Sub-Achsen-Spalte der Thesis-Tabelle' },
  },
}

phase('Audit')
const results = await parallel(AXES.map((a) => () =>
  agent(
    `Du auditierst EINE Entwurfs-Achse eines C++23 cache-engine gegen die Diplomarbeit.\n\n` +
    `CODE-VERZEICHNIS (read-only analysieren): ${ROOT}\\${a.rel}\n` +
    `THESIS-ACHSE: ${a.id}\n` +
    `THESIS-BEHAUPTUNG (Sub-Achsen-Spalte in tab:axes-overview): ${a.claim}\n\n` +
    `AUFGABE: Lies die Header/Quellen in diesem Verzeichnis (Glob/Grep/Read; auch Unterordner). Ermittle GEERDET (mit Beleg):\n` +
    `1. Die ECHTEN Sub-Achsen dieser Achse: Sub-Namespaces, Varianten-Familien, die Alternativen-Menge eines std::variant, oder klar getrennte Strategie-Gruppen — je mit Identifier + Kurzname.\n` +
    `2. Die Anzahl KONKRETER Varianten-/Strategie-Implementierungen (z.B. bei Allocator: jeden einzelnen Allokator zaehlen; nenne Beispiele in variants_sample).\n` +
    `3. Ob die Thesis-Behauptung (oben) zur Code-Realitaet passt (matches_thesis) und worin sie abweicht (discrepancy).\n` +
    `4. Einen konkreten Ergaenzungs-/Korrekturvorschlag fuer die Sub-Achsen-Spalte der Thesis-Tabelle (enrichment_suggestion) — knapp, im Stil der Tabelle.\n\n` +
    `WICHTIG: Nur ERDEN, nichts erfinden. Wenn das Verzeichnis duenn ist, suche die zugehoerigen Varianten ggf. eine Ebene hoeher im selben Topic-Ordner. Gib reine Daten zurueck.`,
    { label: a.id, phase: 'Audit', schema: SCHEMA, agentType: 'Explore' }
  )
))

return results.filter(Boolean)