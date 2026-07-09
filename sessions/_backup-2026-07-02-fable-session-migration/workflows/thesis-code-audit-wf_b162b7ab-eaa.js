export const meta = {
  name: 'thesis-code-audit',
  description: 'Audit: Diplomarbeit-Claims gegen aktuellen Code-Stand + offene Code-TODOs',
  phases: [
    { title: 'Einlesen', detail: '12 Thesis-Reader (Claims je Datei) + 6 Code-Auditoren parallel' },
    { title: 'Abgleich', detail: 'Claims adversarial am Code verifizieren (OK/DIVERGENT)' },
    { title: 'Synthese', detail: 'Audit-Bericht mit Korrekturstellen schreiben' },
  ],
}

const T   = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit'
const CE  = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Code/external/comdare-cache-engine'
const PRT = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Code/external/comdare-prt-art'
const SUP = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Code'
const BASE= 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken'

const CLAIMS = { type:'object', required:['claims'], properties:{ claims:{ type:'array', maxItems:15, items:{ type:'object', required:['file','line','claim','topic'], properties:{
  file:{type:'string'}, line:{type:'integer'}, claim:{type:'string'},
  topic:{type:'string'} } } } } }

const VERDICTS = { type:'object', required:['findings'], properties:{ findings:{ type:'array', items:{ type:'object', required:['file','line','claim','verdict','begruendung','korrektur_richtung'], properties:{
  file:{type:'string'}, line:{type:'integer'}, claim:{type:'string'},
  verdict:{type:'string', enum:['OK','DIVERGENT','UNKLAR']},
  begruendung:{type:'string'},
  code_beleg:{type:'string'},
  korrektur_richtung:{type:'string', enum:['thesis','code-todo','keine']},
  korrektur:{type:'string'} } } } } }

const FILES = [
  'kapitel/de/01_einleitung.tex','kapitel/de/02_suchbaeume_grundlagen.tex','kapitel/de/03_messsystem_prtart.tex',
  'kapitel/de/04_implementierung.tex','kapitel/de/05_evaluation.tex','kapitel/de/06_fazit.tex',
  'anhang/de/A_measurements.tex','anhang/de/B_code_structure.tex','anhang/de/C_glossary.tex',
  'anhang/de/D_building_block_matrix.tex','anhang/de/E_architecture_decisions.tex','anhang/de/F_comparison_interfaces.tex',
]

const readerPrompt = (f) => `Lies die LaTeX-Datei "${T}/${f}" VOLLSTÄNDIG (read-only). Extrahiere die maximal 15 wichtigsten CODE-PRÜFBAREN Behauptungen (Claims) über den Implementierungs-Ist-Stand — also Aussagen, die am realen Code der drei Repos (comdare-cache-engine, comdare-prt-art, Diplomarbeit-Code) wahr oder falsch sein können. Dazu zählen: konkrete Zahlen (z.B. 30 SOTA-Profile, 25 Allokator-Implementierungen, 17 T0-Bausteine, 15 T17-Bausteine, 19 Achsen, 14 Lastprofile, 43 Smoke-Permutationen), benannte Komponenten/Dateien/Funktionen (ExperimentDriver, BuildOrchestrator, perm_runner, IObservableTier, resolve_baustein.hpp, comdare_create_anatomy, Konformitäts-Gatter, CoW-Memento, MeasurementWriter, PlatformProbe), Zustands-/Limitierungs-Aussagen (Modul-Bodies=Stubs, PMC default-aus, HW-Spalten=0, Spiegel-/Apparat-Messung, A/B/C ausstehend, 4-von-19-Achsen-Smoke), Pipeline-Aussagen (7 Phasen + 2 opt-in, Pfad A/B, drei Granularitäten, Messreihen A/B/C-Definitionen), Mess-/Statistik-Aussagen (Mann-Whitney-U+Holm+Cliff's delta, HDR-Histogramme, CSV-Spalten wie L1/L2/L3-Misses). KEINE reinen Literatur-/Konzept-Aussagen ohne Code-Bezug. Gib je Claim: file (="${f}"), line (Zeilennummer der Aussage), claim (1 Satz, präzise, mit der konkreten Zahl/dem Namen), topic (kurzes Schlagwort). Priorisiere Aussagen, die veraltet sein KÖNNTEN (Zustände, Zahlen, "derzeit"/"aktuell"-Formulierungen).`

const codeAuditors = [
  { label: 'code:ist-stand+delta', effort: 'high', prompt: `READ-ONLY Code-Audit. Repo: ${CE}. Aufgabe: der AKTUELLE Architektur-Ist-Stand + was sich JÜNGST geändert hat. 1) Führe "git -C \\"${CE}\\" log --oneline -25" und "git -C \\"${CE}\\" log --oneline be8aadc..HEAD" aus (Bash) — liste die Commits seit be8aadc (Ende Juni) mit 1-Satz-Bedeutung. 2) Lies die NEUESTEN 2 Handoff-/Dossier-Dokumente unter ${CE}/docs/sessions/ (per Glob nach Datum, z.B. *SE-17*, *SESSION-ENDE*, *KONTEXT-DOSSIER*) und ${BASE}/docs/sessions/ — extrahiere: Stand #188 (4a/4b/4c: ist der container_-Flip gelandet? messen die Achsen jetzt echte Organe statt SortedBinary-Spiegel? welche Familien?), Stand #215 (320-DLL-Neubau), #221 (RC-Felder verdrahtet?), #156/#162 (A/B/C-Lauf), Konformitäts-Gate #223, PMC-Stand. 3) Prüfe im Code stichprobenartig: ${CE}/libs/cache_engine/anatomy/abi_adapter.hpp — existiert search_organ_/container_-Doppelstruktur noch? Was sagt der Kommentar zum Flip? LIEFERE: kompakter Bericht (max 60 Zeilen): (a) Commit-Delta-Liste, (b) Ist-Stand der Kern-Tasks mit Datei:Zeile/Doku-Beleg, (c) explizit: welche THESIS-LIMITIERUNGEN (Spiegel-Messung, Stubs, PMC-aus, A/B/C ausstehend) sind noch wahr, welche überholt.` },
  { label: 'code:todo-sweep-ce', effort: 'medium', prompt: `READ-ONLY. Repo: ${CE}/libs + ${CE}/apps. Grep-Sweep nach offenen Markern: "TODO", "FIXME", "HACK", "XXX", "Phase 6+", "#1[0-9][0-9]", "#2[0-9][0-9]" in .hpp/.cpp (NICHT build/, NICHT docs/). Kategorisiere die ~25 wichtigsten Treffer: (A) berührt eine Thesis-Aussage (Messung/Pipeline/Achsen/ABI — z.B. "PerfCounter statt approximieren", Stub-Hinweise, unverdrahtete Hooks), (B) intern/unkritisch. LIEFERE: Liste (max 50 Zeilen) mit Datei:Zeile + Marker-Text (gekürzt) + Kategorie + welcher Thesis-Behauptung er widersprechen könnte.` },
  { label: 'code:mess-pfad', effort: 'high', prompt: `READ-ONLY Code-Audit Mess-Pfad. Repo: ${CE}. Prüfe den AKTUELLEN Stand dieser thesis-relevanten Punkte mit Datei:Zeile-Beleg: 1) PMC: ${CE}/libs/cache_engine/measurement/pmc_source*.hpp + Factory — default an/aus? COMDARE_ENABLE_PMC? 2) ExperimentDriver: ${CE}/libs/cache_engine/builder/experiment_driver/experiment_driver.cpp — Phasen real (Enumerate/Codegen/Compile/Load/Execute/Measure/Persist, 2 opt-in)? run_pipeline_full? 3) BuildOrchestrator ${CE}/libs/cache_engine/builder/build_orchestrator/build_orchestrator.hpp + perm_runner ${CE}/apps/perm_runner/main.cpp — "alle DLLs zuerst, resumierbar, RAM-Admission", 1 DLL/Prozess via IObservableTier? 4) Konformitäts-Gate (std::map-Orakel/#223) — wo, aktiv? 5) CoW-Memento + reset()=Statistik-Reset. 6) MeasurementWriter im Super-Repo ${SUP}/02_messung_driver/measurement_writer.hpp — HW-Spalten noch hartkodiert 0? Magic 0xC0FFEE02? 7) modul-Codegen: sind generierte Modul-Bodies noch Stubs/Skelette oder echte Suchalgorithmen (generate_module_from_profile / comdare_perm_*.cpp-Template ansehen)? LIEFERE max 60 Zeilen, je Punkt: IST + Beleg + stimmt/widerspricht der Thesis-Darstellung.` },
  { label: 'code:prt-art', effort: 'medium', prompt: `READ-ONLY Code-Audit. Repo: ${PRT}. Prüfe mit Datei:Zeile-Beleg: 1) PrtArtSearchEngine<Ts...> variadische Hybrid-API (vector/map/tuple) — existiert, wo? 2) 4+2-Pool-Allokator (vier Größenklassen + zwei reserviert) — real? 3) OLC mit reservierten Wert-Blöcken; Concurrency-Manager (OLC/HTM/STM/lock-free/RCU/Hazard)? 4) MultiLevel-Layout, pfadorientiertes Bundle-Prefetch, DensityTracker, Hypothesen-Metriken H1/H2/H3 — als Code vorhanden oder Skelett? 5) Telemetrie-Strategien leaf-only/sampling/offline-recompute? 6) Acht "Bausteinschichten" inkl. Inline/External/ChainRef-ValueHandles + Signaling-Bit-Serialisierung — was davon existiert im prt-art-Repo wirklich? 7) Offene TODO/FIXME-Marker (max 10 wichtigste). LIEFERE max 50 Zeilen: je Punkt IST (real/Skelett/fehlt) + Beleg.` },
  { label: 'code:diplomarbeit-code', effort: 'medium', prompt: `READ-ONLY Code-Audit. Repo: ${SUP} (Diplomarbeit-Code). Prüfe mit Datei:Zeile-Beleg: 1) ${SUP}/experiment_config/ — welche XML-Configs existieren (config_a/b/c, messreihen.xml)? Wie heißen die Reihen dort (A=PRT-ART vs SOTA, B=?, C=merge?)? Stimmen A_defined/A_full-Modi? 2) ${SUP}/02_messung_driver/main.cpp — Ablauf: Pre-Flight/Manifest, Mikro-Benchmark-Schleife (N=1000×10?), Statistik (Welch? Mann-Whitney?), Delegation an ExperimentDriver? 3) CSV-Ausgabe-Spalten (measurements.csv): enthalten sie wirklich Cycles, L1/L2/L3-Misses, Branches, Durchsatz — oder andere? Pfad Code/_runs/<date>/<spec_id>/? 4) Auswertungs-Tools 03_binary_to_csv/04_csv_to_latex/05_diagram_generator/06_latex_to_pdf — vorhanden + Funktionsumfang wie behauptet (booktabs-Steckbriefe, A4-TikZ)? 5) sample_data_generator: deterministische Testdaten? 6) Offene TODOs (max 10). LIEFERE max 55 Zeilen.` },
  { label: 'code:profile+zaehlungen', effort: 'medium', prompt: `READ-ONLY Zähl-Audit. Zähle EXAKT (per Glob/Grep, nenne die Zählmethode): 1) SOTA-Profile: Dateien unter ${CE}/algorithm_profiles/sota/ (Thesis: 30). 2) Allokator-Implementierungen (Thesis: 25) + Allokator-Profile "lauffähig" (Thesis: 10) — z.B. unter ${CE}/algorithm_profiles/allocators oder axes/allocator-Registry. 3) T0-search_algo-Strategien in ${CE}/libs/cache_engine/axes/lookup/axis_03a_search_algo_registry.hpp mp_list (Thesis: 17). 4) T17-queuing-q1-Bausteine unter ${CE}/libs/cache_engine/topics/queuing/axis_q1_queuing/ (Thesis: 15; Thesis-Galerie sagt No_Buffer...Original_MoodyCamel). 5) Lastprofile LP01-LP14 (Thesis: 14) — wo definiert, wie viele real? 6) kCompositionAxisNames Länge = 19? 7) Smoke-Messreihe: ${T}/anhang/de/tabellen/cartesian_smoke43_table.tex Zeilenzahl ↔ 43 Permutationen; wie viele Achsen variiert (Thesis: 4 von 19)? LIEFERE Tabelle Claim-Zahl vs. Ist-Zahl + Beleg (max 40 Zeilen).` },
]

phase('Einlesen')
log('Starte 12 Thesis-Reader + 6 Code-Auditoren parallel')
const einlesenThunks = [
  ...FILES.map(f => () => agent(readerPrompt(f), { label: `claims:${f.split('/').pop()}`, phase: 'Einlesen', schema: CLAIMS, effort: 'medium' })),
  ...codeAuditors.map(a => () => agent(a.prompt, { label: a.label, phase: 'Einlesen', effort: a.effort })),
]
const einlesen = await parallel(einlesenThunks)
const claimSets = einlesen.slice(0, FILES.length).filter(Boolean)
const codeReports = einlesen.slice(FILES.length).filter(Boolean)
const allClaims = claimSets.flatMap(s => s.claims || [])
log(`${allClaims.length} Claims extrahiert, ${codeReports.length}/6 Code-Reports vorhanden`)

const digest = codeReports.map((r, i) => `=== CODE-REPORT ${i+1} (${codeAuditors[i] ? codeAuditors[i].label : 'n/a'}) ===\n${String(r).slice(0, 4500)}`).join('\n\n')

phase('Abgleich')
const CHUNK = 15
const chunks = []
for (let i = 0; i < allClaims.length; i += CHUNK) chunks.push(allClaims.slice(i, i + CHUNK))
log(`Verifiziere in ${chunks.length} Bündeln à ≤${CHUNK} Claims`)

const verdictSets = await parallel(chunks.map((c, idx) => () => agent(
`Du bist adversarialer Auditor: prüfe jede der folgenden THESIS-BEHAUPTUNGEN gegen den AKTUELLEN Code (read-only; Repos: cache-engine=${CE}, prt-art=${PRT}, Diplomarbeit-Code=${SUP}, Thesis=${T}). Nutze die beigelegten Code-Reports als Wegweiser, aber BELEGE jedes DIVERGENT-Urteil selbst mit Datei:Zeile aus dem Code (oder autoritativem Doc). Urteile: OK (Code deckt die Aussage), DIVERGENT (Code sagt anderes/Aussage veraltet — z.B. durch juengst gelandete Aenderungen wie den #188-4b-b-container_-Flip), UNKLAR (nicht pruefbar). korrektur_richtung: 'thesis' wenn der Text an den Code anzupassen ist (Zahl/Zustand veraltet), 'code-todo' wenn die Thesis das SOLL beschreibt und der Code nachziehen muss (Manuskript=Sollzustand-Regel), 'keine' bei OK/UNKLAR. korrektur: 1 Satz konkrete Korrektur. Sei streng: ehrliche Limitierungs-Aussagen der Thesis, die inzwischen NICHT mehr stimmen (zu pessimistisch), sind auch DIVERGENT (Richtung 'thesis').

CLAIMS (Bündel ${idx+1}/${chunks.length}):
${JSON.stringify(c, null, 1)}

CODE-REPORTS (Wegweiser):
${digest}`,
  { label: `verify:${idx+1}`, phase: 'Abgleich', schema: VERDICTS, effort: 'high' }
)))
const findings = verdictSets.filter(Boolean).flatMap(v => v.findings || [])
const divergent = findings.filter(f => f.verdict === 'DIVERGENT')
const unklar = findings.filter(f => f.verdict === 'UNKLAR')
log(`${findings.length} geprüft: ${divergent.length} DIVERGENT, ${unklar.length} UNKLAR`)

phase('Synthese')
const synth = await agent(
`Schreibe den Audit-Bericht "${T}/sessions/2026-07-02-audit-thesis-vs-code.md" (Write-Tool, UTF-8, Markdown, Datum 2026-07-02). Struktur: 1) Kopf (Zweck, Methode: ultracode 12 Reader + 6 Code-Auditoren + ${chunks.length} adversariale Verifier, Repos+HEADs — hole die HEADs per git -C je Repo rev-parse --short HEAD). 2) §1 KORREKTURSTELLEN THESIS (Richtung 'thesis'): je Befund Thesis-Datei:Zeile, Claim, Code-Beleg, konkrete Korrektur — nach Priorität (faktisch falsch > veraltet-pessimistisch > kosmetisch); DE-Stelle nennen und daran erinnern, dass EN gespiegelt werden muss. 3) §2 CODE-TODOS (Richtung 'code-todo'): wo der Code hinter dem Thesis-Soll liegt. 4) §3 BESTÄTIGT-OK (nur Themenliste, kompakt). 5) §4 UNKLAR/nicht prüfbar. 6) §5 Delta-Kontext (was sich seit Ende Juni im Code geändert hat, aus Report 1) + Empfehlung der Abarbeitungs-Reihenfolge. Dedupliziere inhaltsgleiche Befunde (gleiche Aussage in mehreren Kapiteln/Anhängen → EIN Eintrag mit allen Fundstellen). Sei präzise, keine Erfindungen — nur die übergebenen Daten + eigene Nachprüfung wo nötig.

DIVERGENT (${divergent.length}):
${JSON.stringify(divergent, null, 1).slice(0, 45000)}

UNKLAR (${unklar.length}):
${JSON.stringify(unklar.map(u => ({file:u.file,line:u.line,claim:u.claim,begruendung:u.begruendung})), null, 1).slice(0, 12000)}

OK-THEMEN (kompakt):
${JSON.stringify(findings.filter(f => f.verdict==='OK').map(f => f.claim.slice(0,90)), null, 0).slice(0, 8000)}

CODE-REPORTS:
${digest}

Gib als Abschlusstext zurück: (a) Pfad des geschriebenen Berichts, (b) Top-10-Korrekturstellen Thesis (je 1 Zeile Datei:Zeile→Korrektur), (c) Top-5-Code-TODOs, (d) 3-Satz-Gesamturteil.`,
  { label: 'synthese:audit-doc', phase: 'Synthese', agentType: 'general-purpose', effort: 'high' }
)
return { divergentCount: divergent.length, unklarCount: unklar.length, okCount: findings.filter(f=>f.verdict==='OK').length, synthese: synth }