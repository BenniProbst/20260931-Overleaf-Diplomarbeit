export const meta = {
  name: 'thesis-context-onboarding',
  description: 'Frische Übernahme des Thesis-Workstreams: parallele Leser über Sessions, Referenzdocs, Impl-Handouts und Diplomarbeit-Kapitel → konsolidierte Wissens-Übergabe',
  phases: [
    { title: 'Lesen', detail: 'parallele Leser: Sessions, Architektur-Docs, Impl-Handouts, Kapitel 1-4, Kapitel 5-8, Master/Build' },
    { title: 'Synthese', detail: 'ein Agent konsolidiert alle Befunde zu einer Onboarding-Übergabe' },
  ],
}

const BASE = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken'
const THESIS = BASE + '/thesis/diplomarbeit'
const CE = BASE + '/Code/external/comdare-cache-engine'

const NOTE = 'Falls ein Pfad mit Vorwärtsslashes nicht auflöst, glob das Verzeichnis und lies die Datei über den zurückgegebenen Pfad. Lies die genannten Dateien VOLLSTÄNDIG. Gib eine dichte, strukturierte Markdown-Zusammenfassung zurück (deine Rückgabe IST Daten, kein an Menschen gerichteter Text). Auf Deutsch.'

const readers = [
  {
    label: 'sessions',
    prompt: `Du bist Onboarding-Leser für eine Diplomarbeit-Session, die durch einen Server-Outage verloren ging. Lies diese letzten Session-/Übergabe-Dokumente VOLLSTÄNDIG und in Reihenfolge (neueste zuerst):
- ${THESIS}/sessions/2026-06-22-fancyhdr-scrlayer-migration-handover.md
- ${THESIS}/sessions/2026-06-22-UEBERGABE-kontext-thesis-konsolidierung.md
- ${THESIS}/sessions/2026-06-21-konsolidierung-user-ergaenzungen.md
- ${THESIS}/sessions/2026-06-21-kap4-geruest-eine-architektur.md
- ${THESIS}/sessions/2026-06-16-UEBERGABE-3-abschluss-kap1-3-protrusionen-todo.md
- ${THESIS}/sessions/2026-06-16-UEBERGABE-2-einleitung-ff-und-querschnitt.md
- ${THESIS}/sessions/2026-06-15-aufgabenbeschreibung-kapitel-1-3-kommentare.md

Extrahiere: (1) chronologischer Verlauf der Entscheidungen; (2) aktueller Bearbeitungsstand pro Kapitel; (3) verbindliche User-Entscheidungen; (4) offene/nächste Schritte mit Task-Nummern; (5) Build-Stand (Seiten DE/EN, Fehler, HEADs/Commits); (6) Fallen/Lektionen die nicht wiederholt werden dürfen. ${NOTE}`,
  },
  {
    label: 'architektur-docs',
    prompt: `Du bist Onboarding-Leser. Die ZENTRALE Wahrheit dieser Diplomarbeit ist "DIE EINE Architektur (Lebewesen ≡ SearchAlgorithm)". Lies diese Architektur-Referenzdocs VOLLSTÄNDIG:
- ${CE}/docs/architecture/36_eine_architektur_lebewesen_ist_searchalgorithm.md  (MAßGEBLICH)
- ${CE}/docs/architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md
- ${CE}/docs/architecture/31_observer_interface_konsolidierung_i1.md
- ${CE}/docs/architecture/32_lastprofil_katalog_und_paper_bias.md
- ${CE}/docs/architecture/30_audit_achsen_delegation_pflichtachsen.md

Extrahiere präzise: (1) die EINE Hierarchie von IExecutionEngine bis zu den 19 Achsen/Organen, mit den exakten Klassennamen und ihren Rollen; (2) was "SearchEngine" vs "search_engine<>" vs "SearchAlgorithmAbiAdapter" bedeutet (dormant/ABI-Sicht/Defekt); (3) die Modulgrenze (EINE C-ABI comdare_create_anatomy) vs in-process 3-Schicht-Abstraktion; (4) der I1-Observer-Konsolidierungsstand; (5) Lastprofil-Katalog & Paper-Bias-Konzept; (6) Achsen-Delegation/Pflichtachsen-Regeln; (7) jeder bekannte Code-Ist-DEFEKT vs. gewolltes Design. ${NOTE}`,
  },
  {
    label: 'impl-handouts',
    prompt: `Du bist Onboarding-Leser. Der Impl-Agent (getrennter Strang) bekommt Aufgaben über Handouts. Lies VOLLSTÄNDIG:
- ${CE}/docs/sessions/20260619-HANDOUT-impl-agent-profile-pruefling-ziele-tabellenbreite.md  (TODO-1..6)
- ${CE}/docs/sessions/20260620-UEBERGABE-impl-agent-EINE-ARCHITEKTUR-vereinheitlichung.md
- ${CE}/docs/sessions/20260620-HANDOUT-impl-an-text-agent-170-sota-vollabdeckung-P33.md
- ${CE}/docs/sessions/20260620-G5-CODE-ABSCHLUSS-und-gate-frei-leer.md
- ${CE}/docs/sessions/20260620-ABSCHLUSS-AUTONOME-STRECKE-§8-PILOT-G1G3.md

Extrahiere: (1) jede TODO-1..6 mit Status (offen/erledigt/revidiert); (2) was der Impl-Agent bereits abgeschlossen hat (G5, §8-Pilot, P33, SOTA-Vollabdeckung); (3) die Trennung Text-Agent (ICH) vs Impl-Agent — was darf der Text-Agent NICHT anfassen (z.B. profile_run_entry.hpp WIP); (4) die SOTA-Zahl 30 und ihre Herleitung (8 eigenständige Rang-1 + 22); (5) Prüfling-Konzept (abstract/full) und Profile P01-P33. ${NOTE}`,
  },
  {
    label: 'kapitel-1-4',
    prompt: `Du bist Onboarding-Leser. Lies die DEUTSCHEN Kapitel (DE = Leitsprache) VOLLSTÄNDIG:
- ${THESIS}/kapitel/de/01_introduction.tex
- ${THESIS}/kapitel/de/02_fundamentals.tex
- ${THESIS}/kapitel/de/03_state_of_the_art.tex
- ${THESIS}/kapitel/de/04_concept_architecture.tex

Extrahiere pro Kapitel: (1) Gliederung (Sektionen/Unterabschnitte); (2) inhaltlicher Reifegrad (ausgearbeitet / Gerüst / Stub / Platzhalter); (3) ob die "EINE Architektur"-Korrektur konsistent angewandt ist (kein "parallel/orthogonal"-Framing mehr); (4) wo ML-Klassifikation/Heuristik-Auswahl als AUSBLICK/Future-Work markiert ist; (5) die SOTA-Zahl 30 und wo sie steht; (6) sichtbare TODOs/Lücken/Phantom-Inhalte. Notiere für Kap. 4, ob es schon vom User aus dem Gerüst geschrieben wurde oder noch Skelett ist. ${NOTE}`,
  },
  {
    label: 'kapitel-5-8',
    prompt: `Du bist Onboarding-Leser. Lies die DEUTSCHEN Kapitel (DE = Leitsprache) VOLLSTÄNDIG:
- ${THESIS}/kapitel/de/05_implementation.tex
- ${THESIS}/kapitel/de/06_evaluation_methodology.tex
- ${THESIS}/kapitel/de/07_results_evaluation.tex
- ${THESIS}/kapitel/de/08_conclusion.tex

Extrahiere pro Kapitel: (1) Gliederung; (2) Reifegrad (ausgearbeitet / Gerüst / Stub — Kap. 7 wartet vermutlich auf echte Messläufe); (3) kanonische ExperimentDriver-Phasen (Enumerate/Codegen/Compile/Load/Execute/Measure/Persist) — korrekt in Kap. 4 & 6?; (4) Roadmap/Ausblick in Kap. 8 inkl. ML-Heuristik-Future-Work; (5) Platzhalter/Stubs/TODOs; (6) ob Messergebnisse echt oder als Demo/Phantom markiert sind. ${NOTE}`,
  },
  {
    label: 'master-build',
    prompt: `Du bist Onboarding-Leser für den Build- und Strukturstand der Diplomarbeit. Lies VOLLSTÄNDIG:
- ${THESIS}/diplomarbeit.tex  (Master, Abstract, Front-Matter, Einbindungsreihenfolge)
- ${THESIS}/sessions/2026-06-22-fancyhdr-scrlayer-migration-handover.md
- ${THESIS}/tools/format_tex.py (lies Kopf/Logik, fasse Funktion zusammen)
Globe außerdem ${THESIS} flach und liste build.ps1, *.cls/*.sty und vorhandene Anhänge (${THESIS}/anhang/de, ${THESIS}/anhang/en).

Extrahiere: (1) Build-Kommando & Pipeline (build.ps1 -Lang de|en, pdflatex/bibtex), Seitenzahlen, Fehlerstand; (2) Abstract-Inhalt & ob "EINE Architektur"/Zahl 30 dort konsistent; (3) Front-Matter/Titelei-Aufbau, fancyhdr→scrlayer-Migration Status & offene Punkte; (4) format_tex.py Regeln (was es einrückt/umbricht, was ausgespart wird, dass diplomarbeit.tex NICHT formatiert wird); (5) Überfull-Boxen-Reststatus & deren Quelle. ${NOTE}`,
  },
]

phase('Lesen')
const findings = await parallel(readers.map(r => () =>
  agent(r.prompt, { label: r.label, phase: 'Lesen' }).then(text => ({ area: r.label, text }))
))

const ok = findings.filter(Boolean)
log(`${ok.length}/${readers.length} Leser fertig`)

phase('Synthese')
const bundle = ok.map(f => `\n===== BEREICH: ${f.area} =====\n${f.text}`).join('\n')

const synthesis = await agent(
  `Du bist der übernehmende Text-Agent der Diplomarbeit „Aktive cache-bewusste Hardware-Adaption". Eine vorige Session ging durch Server-Outage verloren; du steigst frisch in fremden Kontext ein. Unten sind die strukturierten Befunde von 6 parallelen Lesern (Sessions, Architektur-Docs, Impl-Handouts, Kapitel 1-4, Kapitel 5-8, Master/Build).

Konsolidiere sie zu EINER kohärenten Onboarding-Übergabe auf Deutsch, die mich (den übernehmenden Agenten) sofort arbeitsfähig macht. Auflösen von Widersprüchen zwischen Bereichen explizit benennen. Struktur:

## 1. DIE EINE Architektur (in max. 8 Sätzen, mit exakten Klassennamen)
## 2. Verbindliche User-Entscheidungen (nummeriert)
## 3. Stand pro Kapitel 1-8 (Reifegrad-Tabelle: Kapitel | Reifegrad | offene Lücken)
## 4. Was ist ERLEDIGT (Text-Agent & Impl-Agent getrennt)
## 5. OFFEN / nächste Schritte (priorisiert, mit Task-Nummern; klare Trennung Text-Agent vs Impl-Agent)
## 6. Arbeitskonventionen (kritische, nicht verhandelbar — git pull vor Edit, DE≡EN, format_tex.py, keine Co-Authored-By, keine erledigt-Claims für Unimplementiertes, Umlaute)
## 7. Fallen & Lektionen (nicht wiederholen)
## 8. Build-Stand (Seiten, Fehler, HEADs, Kommando)
## 9. Offene Widersprüche / Unklarheiten, die ich mit dem User klären sollte

Sei präzise und dicht. Keine Floskeln. Wenn ein Befund unsicher ist, kennzeichne ihn.

BEFUNDE:
${bundle}`,
  { label: 'synthese', phase: 'Synthese' }
)

return { synthesis, leserBefunde: ok.map(f => ({ area: f.area, text: f.text })) }
