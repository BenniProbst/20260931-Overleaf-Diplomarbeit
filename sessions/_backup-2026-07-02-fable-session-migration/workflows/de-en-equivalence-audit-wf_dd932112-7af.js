export const meta = {
  name: 'de-en-equivalence-audit',
  description: 'Read-only DE<->EN Aequivalenz-Audit pro Kapitel-Abschnitt der Diplomarbeit; meldet Divergenzen + EN-Korrekturentwurf (DE = Leitsprache)',
  phases: [{ title: 'Audit', detail: 'ein Agent pro Abschnitt vergleicht DE- und EN-Fassung' }],
}

const BASE = 'C:/Users/benja/OneDrive/Desktop/Diplomarbeit - Datenbanken/thesis/diplomarbeit/kapitel'
const sections = args.sections

const VERDICT = {
  type: 'object',
  additionalProperties: false,
  properties: {
    label: { type: 'string' },
    title: { type: 'string' },
    status: { type: 'string', enum: ['equivalent', 'divergent', 'en-stub-or-missing'] },
    severity: { type: 'string', enum: ['none', 'minor', 'major'] },
    issues: { type: 'array', items: { type: 'string' }, description: 'Konkrete Abweichungen DE->EN, satzgenau; leer wenn equivalent' },
    proposedEnglishLatex: { type: ['string', 'null'], description: 'Vollstaendiger korrigierter EN-LaTeX-Text NUR dieses Abschnitts (Heading bis vor naechstem gleich-/hoeherrangigem Heading), aequivalent zur aktuellen DE-Fassung; null wenn equivalent' },
  },
  required: ['label', 'title', 'status', 'severity', 'issues', 'proposedEnglishLatex'],
}

phase('Audit')

const results = await parallel(sections.map(s => () => {
  const de = `${BASE}/de/${s.f}.tex`
  const en = `${BASE}/en/${s.f}.tex`
  const prompt = `Du bist read-only DE<->EN-Aequivalenz-Auditor fuer eine Diplomarbeit (TU Dresden). DE ist die Leitsprache, EN muss strikt aequivalent sein. EN wurde teils vernachlaessigt.

AUFGABE: Vergleiche GENAU den Abschnitt mit \\label{${s.l}} (Titel DE: "${s.t}") zwischen der deutschen und der englischen Datei.
- Deutsche Datei: ${de}
- Englische Datei: ${en}

Lies BEIDE Dateien. Finde in beiden den Abschnitt ab dem Heading mit \\label{${s.l}} bis zum naechsten gleich- oder hoeherrangigen \\section/\\subsection. Schliesse die zugehoerigen Unterabschnitte (\\subsection unter einer \\section) mit ein, falls vorhanden.

Vergleiche SEMANTISCH Satz fuer Satz: Deckt die EN-Fassung jede inhaltliche Aussage der aktuellen DE-Fassung ab? Achte auf:
- fehlende/zusaetzliche Saetze oder Absaetze, abweichende Zahlen/Fakten, fehlende oder andere \\cite/\\ref/\\label,
- veraltete EN-Begriffe (DE nutzt FF0-FF4, EN nutzt RQ0-RQ4 -- das ist KORREKT, keine Abweichung),
- technische Identifier muessen identisch sein (Klassennamen, Achsen, Codebezeichner),
- Mathematik/Tabellen/Werte muessen uebereinstimmen.

WICHTIG: Du EDITIERST NICHTS (read-only). Liefere nur das strukturierte Urteil.
- status='equivalent' wenn EN die DE-Fassung vollstaendig und korrekt abbildet (issues=[], proposedEnglishLatex=null).
- status='divergent' wenn EN existiert, aber inhaltlich abweicht/veraltet ist.
- status='en-stub-or-missing' wenn der EN-Abschnitt fehlt oder nur ein Platzhalter/Stub ist, obwohl DE Inhalt hat.
Bei divergent/en-stub: liste die konkreten Abweichungen in 'issues' (satzgenau, mit kurzem DE-Zitat) UND liefere in 'proposedEnglishLatex' den VOLLSTAENDIGEN korrigierten EN-LaTeX-Text NUR dieses Abschnitts, der die aktuelle DE-Fassung praezise wiedergibt (gleiche \\cite/\\ref/\\label, gleiche Struktur, idiomatisches Englisch, ASCII `` ''-Quotes oder \\enquote, KEINE deutschen Umlaute im EN). Wenn DE und EN BEIDE nur Stubs/Platzhalter sind und sich entsprechen, ist das 'equivalent'.`
  return agent(prompt, { label: s.l, phase: 'Audit', schema: VERDICT }).then(v => v || { label: s.l, title: s.t, status: 'AGENT_FAILED', severity: 'major', issues: ['Agent lieferte kein Ergebnis'], proposedEnglishLatex: null })
}))

const ok = results.filter(Boolean)
const equivalent = ok.filter(r => r.status === 'equivalent')
const divergent = ok.filter(r => r.status === 'divergent')
const stub = ok.filter(r => r.status === 'en-stub-or-missing')
const failed = ok.filter(r => r.status === 'AGENT_FAILED')

log(`Audit fertig: ${ok.length}/${sections.length} | equivalent=${equivalent.length} divergent=${divergent.length} en-stub/missing=${stub.length} failed=${failed.length}`)

return {
  summary: {
    total: sections.length,
    equivalent: equivalent.map(r => r.label),
    divergent: divergent.map(r => ({ label: r.label, severity: r.severity, issueCount: r.issues.length })),
    stubOrMissing: stub.map(r => ({ label: r.label, severity: r.severity })),
    failed: failed.map(r => r.label),
  },
  verdicts: ok,
}
