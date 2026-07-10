export const meta = {
  name: 'thesis-architekturen-recherche',
  description: 'Diplomarbeit gruendlich lesen: urspruenglich geplante Experiment-Architekturen/Plattformen',
  phases: [
    { title: 'Lesen', detail: 'parallele Leser: Aufgabenstellung, Kap.1/2/6/7, Anhang, Termine/Sessions' },
    { title: 'Verifikation', detail: 'Widersprueche/Luecken gegenpruefen' },
  ],
}

const FINDINGS = {
  type: 'object',
  properties: {
    platforms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Maschine/CPU/Architektur wie im Dokument genannt' },
          isa: { type: 'string', description: 'ISA/Familie (x86-64 AMD/Intel, ARM/AArch64, RISC-V, Apple Silicon, ...)' },
          role: { type: 'string', description: 'Rolle im Experiment (Messplattform, Build, Simulator, geplant/verworfen)' },
          evidence: { type: 'string', description: 'Datei:Zeile + woertliches Kurzzitat' },
          planned_vs_current: { type: 'string', description: 'urspruenglich geplant / aktueller Stand / verworfen — wie das Dokument es framet' },
        },
        required: ['name', 'evidence'],
      },
    },
    notes: { type: 'string', description: 'Kontext: was das Dokument ueber die PLANUNG der Experimente sagt (Messreihen, Hybrid-CPUs, Sapphire Rapids, Experiment-OS, ...)' },
  },
  required: ['platforms', 'notes'],
}

phase('Lesen')
const T = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit'
const CE = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Code/external/comdare-cache-engine'
const READERS = [
  { key: 'aufgabenstellung+kap1', prompt: `READ-ONLY Recherche in der Diplomarbeit (LaTeX, deutsch). Lies VOLLSTAENDIG: ${T}/aufgabenstellung/de.tex und ${T}/kapitel/de/01_introduction.tex. Frage: Welche Hardware-Architekturen/CPU-Plattformen sind fuer die EXPERIMENTE geplant bzw. in der Aufgabenstellung/den Forschungsfragen vorgegeben? Achte auf FF0 (CPU-Plattformen, Hybrid-CPUs, Sapphire Rapids), ISA-Nennungen (SSE2/AVX2/AVX-512, NEON/SVE2, RVV), Beitraege. Gib je Fund Datei:Zeile + Kurzzitat.` },
  { key: 'kap6-methodik', prompt: `READ-ONLY Recherche. Lies VOLLSTAENDIG: ${T}/kapitel/de/06_evaluation_methodology.tex (besonders \\section{Versuchsplattformen}) und ueberfliege ${T}/kapitel/de/07_results_evaluation.tex. Frage: Welche konkreten Versuchsplattformen/Maschinen/Architekturen sind fuer die Messreihen (A-C) geplant? Namen, CPUs, Cache-Line-Groessen, OS, Rolle (prod/dev/HPC). Auch: Experiment-OS-Plan fuer Produktionsmaschinen. Gib je Fund Datei:Zeile + Kurzzitat.` },
  { key: 'kap2+anhang', prompt: `READ-ONLY Recherche. Lies in ${T}/kapitel/de/02_fundamentals.tex die Abschnitte zu Cache-Line-Groessen/Architekturen (ssec:cache-line-sizes) und Plattform-/Maschinen-Nennungen; dann in ${T}/anhang/de/D_building_block_matrix.tex die Build-Achse hardware (12.1-12.5) bzw. Hardware-Profile. Frage: Welche Architekturen (x86-64 AMD/Intel, ARM-Kerne, Apple Silicon, RISC-V wie SiFive U74, Pi) werden als Ziel-/Testplattformen der Arbeit genannt? Gib je Fund Datei:Zeile + Kurzzitat.` },
  { key: 'termine-sessions-thesis', prompt: `READ-ONLY Recherche. Durchsuche ${T}/sessions/ (grep nach: Testmaschinen, Inventar, Plattform, Architektur, Sapphire, Hybrid, RISC-V, Apple, Pi, Termine, AP-G2a, AP-G2b, AP-M1) und lies die 2-3 relevantesten Dokumente. Frage: Welches Testmaschinen-Inventar wurde URSPRUENGLICH aus den Terminen (Betreuer-Absprachen) fuer die Experimente geplant (AP-G2a/G2b), und was war der Experiment-OS-Plan (AP-M1)? Gib je Fund Datei + Kurzzitat. Falls sessions/ die Termine nicht enthaelt, suche auch in "C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/docs" und "C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/Forschungsarbeiten" (nur Verzeichnis-Listing + gezielte Treffer, nichts Grosses komplett lesen).` },
  { key: 'cache-engine-hwdocs', prompt: `READ-ONLY Recherche. Lies in ${CE}/docs/sessions/20260602-cacheline-konfigurator-design-und-hw-recherche.md (falls vorhanden) und grep in ${CE}/docs nach Hardware-Profilen/Testmaschinen (Begriffe: Testmaschine, hardware profile, 12.1, Sapphire, Raptor, Zen, Apple M, SiFive, Pi 5, AArch64, RISC-V). Frage: Welche konkreten Maschinen/Architekturen wurden code-/design-seitig als Experiment-Plattformen geplant (Hardware-Recherche-Dokument)? Gib je Fund Datei + Kurzzitat.` },
]

const results = await parallel(READERS.map(r => () =>
  agent(r.prompt + '\n\nAntworte NUR mit dem strukturierten Ergebnis. Erfinde NICHTS; wenn ein Dokument fehlt, sage das in notes.', { label: 'lese:' + r.key, phase: 'Lesen', schema: FINDINGS })
))

phase('Verifikation')
const found = results.filter(Boolean)
const merged = JSON.stringify(found, null, 1).slice(0, 14000)
const check = await agent(
  `Du bist ein skeptischer Verifikator (READ-ONLY). Hier gesammelte Funde zu "urspruenglich geplante Experiment-Architekturen der Diplomarbeit":\n${merged}\n\nPruefe stichprobenartig 4-6 der wichtigsten Datei:Zeile-Belege durch eigenes Nachlesen in ${T} (kapitel/de, aufgabenstellung, sessions). Melde: (a) bestaetigte Kernaussagen, (b) Fehler/nicht auffindbare Belege, (c) offensichtliche Luecken (Plattform, die in FF0/Kap.6 steht, aber in den Funden fehlt).`,
  { label: 'verify:belege', phase: 'Verifikation' }
)

return { readers: found, verification: check }