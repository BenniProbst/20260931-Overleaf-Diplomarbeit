export const meta = {
  name: 'tud-informatik-thesis-format-compliance',
  description: 'Recherche: Ist die Layout-Aenderung (headheight/footskip in zihpub.cls) fuer eine TU-Dresden-Informatik-Diplomarbeit pruefungsamtkonform?',
  phases: [
    { title: 'Recherche', detail: '6 parallele Web-Recherche-Agenten zu Formatvorgaben' },
    { title: 'Synthese', detail: 'Verdikt + Risiko + Empfehlung' },
  ],
}

const CHANGE = `Konkrete Aenderung in der TU-Dresden-ZIH-LaTeX-Klasse zihpub.cls (Diplomarbeit Fakultaet Informatik):
- \\headheight von 17pt (typearea-Default) auf 34pt erhoeht (weil der uppercase-Laufkopf mit langen Anhang-Sektionstiteln 2 Zeilen braucht);
- \\footskip von ~47.6pt auf 30pt reduziert (um die Seitenhoehe auszubalancieren).
NETTO-EFFEKT: Laufkopf (Kopfzeile) jetzt 2-zeilig; der Textblock beginnt ~17pt (~6mm) TIEFER (oberer Textrand ~6mm groesser); die Position der Seitenzahl (Fusszeile) bleibt gleich; Seitenzahl der Arbeit unveraendert (148 S.). UNVERAENDERT: Textbreite (16cm), Texthoehe (24.5cm), Seitenraender links/rechts (oddsidemargin/evensidemargin=0), Schriftart (Times 11pt), Zeilenabstand.
FRAGE: Ist das fuer eine Diplomarbeit/Masterarbeit der Fakultaet Informatik der TU Dresden formal zulaessig (Pruefungsamt/Pruefungsordnung/Formatvorgaben)? Verstoesst es gegen eine Norm?`

const SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['angle', 'found_relevant_rules', 'findings', 'verdict_for_this_angle'],
  properties: {
    angle: { type: 'string' },
    found_relevant_rules: { type: 'boolean', description: 'Wurde eine konkrete Format-/Layout-Regel gefunden, die Kopf-/Fusszeile, oberen Rand oder Template-Pflicht betrifft?' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['claim', 'source_url', 'confidence', 'regulates_what'],
        properties: {
          claim: { type: 'string' },
          source_url: { type: 'string' },
          confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
          regulates_what: { type: 'string', description: 'z.B. Seitenraender / Schrift / Zeilenabstand / Kopf-Fusszeile / Template-Pflicht / nichts' },
        },
      },
    },
    verdict_for_this_angle: { type: 'string', description: 'Spricht aus DIESER Quellen-Perspektive etwas GEGEN die Aenderung? Begruendung.' },
  },
}

const ANGLES = [
  { key: 'fakultaet-hinweise', prompt: `Recherchiere die OFFIZIELLEN Formatvorgaben/Hinweise der Fakultaet Informatik der TU Dresden fuer Abschlussarbeiten (Diplomarbeit/Masterarbeit): "Hinweise zur Anfertigung", Merkblaetter, Pruefungsamt-Seiten, Leitfaeden. Suche gezielt auf tu-dresden.de (deutsch). Welche konkreten FORM-Vorgaben gibt es (Seitenraender, Schriftgroesse, Zeilenabstand, Kopf-/Fusszeile, Seitenzahl-Position)? Wird die Kopf-/Fusszeile oder der obere Rand reguliert?` },
  { key: 'pruefungsordnung', prompt: `Recherchiere die Pruefungs-/Studienordnung Diplom-Informatik (und Master Informatik) der TU Dresden bzgl. der FORM der Abschlussarbeit. Schreibt die Ordnung Layout/Seitenraender/Format vor oder nur Inhalt/Umfang/Fristen? Suche "Pruefungsordnung Diplom Informatik TU Dresden", "Studienordnung", Paragraphen zur Diplomarbeit. Gibt es eine Pflicht zu einem bestimmten Layout?` },
  { key: 'zih-template', prompt: `Recherchiere die LaTeX-Vorlage "diplominf" / "zihpub" der TU Dresden (ZIH / Fakultaet Informatik) fuer Diplomarbeiten. Woher stammt sie (ZIH, GitHub/GitLab, offizielle Seite)? Ist ihre Nutzung VERPFLICHTEND oder nur empfohlen? Definiert sie ein verbindliches Layout, das nicht geaendert werden darf? Wie regelt die Vorlage Kopfzeile (scrlayer-scrpage/fancyhdr), headheight, footskip? Suche "diplominf TU Dresden Vorlage", "zihpub.cls", "ZIH LaTeX Diplomarbeit template".` },
  { key: 'deutsche-norm', prompt: `Recherchiere allgemeine deutsche/akademische Normen fuer das Layout wissenschaftlicher Abschlussarbeiten: Was wird typischerweise REGULIERT (Seitenraender/Bundsteg, Schrift/Schriftgroesse, Zeilenabstand 1.0-1.5) und was ist FREI (Kopf-/Fusszeilen-Abstand, footskip, Position der Seitenzahl)? Ist die Position der Seitenzahl oder der Kopfzeilenabstand jemals genormt? Bezug DIN 5008 / typische Uni-Vorgaben. Bewerte: faellt headheight/footskip unter regulierte Parameter?` },
  { key: 'kopf-fusszeile-seitenzahl', prompt: `Recherchiere konkret: Gibt es bei deutschen Universitaets-Abschlussarbeiten (speziell TU Dresden, sonst allgemein) eine Vorschrift zur POSITION/zum ABSTAND der Seitenzahl (Fusszeile) oder zur Hoehe/Position der Kopfzeile? Ist ein 2-zeiliger Kolumnentitel (Running Header) zulaessig? Aendert ein um ~6mm tieferer Textblock-Beginn (groesserer oberer Rand) die Normkonformitaet, wenn die Seitenraender (links/rechts/Textbreite/Texthoehe) gleich bleiben? Bewerte das konkret.` },
  { key: 'praxis-risiko', prompt: `Recherchiere die PRAXIS und das RISIKO: Passen Studierende die ZIH/diplominf-Vorlage ueblicherweise an (z.B. Kopfzeile, Pakete)? Wird das vom Betreuer/Pruefer akzeptiert? Wer entscheidet ueber die Form einer Diplomarbeit an der TU Dresden Informatik (Pruefungsamt vs. betreuender Professor, hier Prof. Habich/Datenbanken)? Gibt es Berichte/Foren/Hinweise, dass Layout-Anpassungen problematisch waren? Bewerte das Realrisiko der konkreten Aenderung.` },
]

phase('Recherche')
const research = await parallel(ANGLES.map(a => () =>
  agent(
    `Du bist Recherche-Agent fuer Pruefungsordnungs-/Formatkonformitaet. Nutze WebSearch und WebFetch (per ToolSearch laden: "select:WebSearch,WebFetch"). Suche bevorzugt auf tu-dresden.de und in DEUTSCH. Beantworte praezise und mit URLs.\n\nZU PRUEFENDE AENDERUNG:\n${CHANGE}\n\nDEIN RECHERCHE-FOKUS (${a.key}):\n${a.prompt}\n\nGib NUR belegte Fakten mit Quellen-URL zurueck. Wenn du nichts Konkretes findest, sage das ehrlich (found_relevant_rules=false). Rate NICHT.`,
    { label: `recherche:${a.key}`, phase: 'Recherche', schema: SCHEMA, effort: 'high' }
  )
)).then(r => r.filter(Boolean))

phase('Synthese')
const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['zulaessig', 'konfidenz', 'begruendung', 'regulierte_parameter_betroffen', 'risiko', 'empfehlung', 'beste_alternative', 'quellen'],
  properties: {
    zulaessig: { type: 'string', enum: ['ja', 'eher_ja', 'unklar', 'eher_nein', 'nein'] },
    konfidenz: { type: 'string', enum: ['hoch', 'mittel', 'niedrig'] },
    begruendung: { type: 'string' },
    regulierte_parameter_betroffen: { type: 'string', description: 'Beruehrt die Aenderung einen regulierten Parameter (Seitenraender/Schrift/Zeilenabstand) oder nur freie (Kopf-/Fusszeilen-Geometrie)?' },
    risiko: { type: 'string', description: 'Realistisches Pruefungs-Risiko, niedrig/mittel/hoch + warum.' },
    empfehlung: { type: 'string', description: 'Behalten / reverten / Alternative? Wer entscheidet (Betreuer)?' },
    beste_alternative: { type: 'string', description: 'Norm-neutralste technische Loesung des urspruenglichen headheight-Problems (z.B. kurze Kopf-Marken via \\section[kurz]{lang} -> Kopf bleibt 1-zeilig, KEINE Geometrieaenderung).' },
    quellen: { type: 'array', items: { type: 'string' } },
  },
}
const synthesis = await agent(
  `Du bist Synthese-/Pruefungs-Compliance-Gutachter. Hier sind die Recherche-Ergebnisse von 6 Agenten zur Frage, ob die folgende LaTeX-Layout-Aenderung fuer eine TU-Dresden-Informatik-Diplomarbeit pruefungsamtkonform ist.\n\nAENDERUNG:\n${CHANGE}\n\nRECHERCHE-ERGEBNISSE (JSON):\n${JSON.stringify(research, null, 2)}\n\nErstelle ein abgewogenes Gutachten. WICHTIG: Unterscheide klar zwischen (1) typischerweise REGULIERTEN Parametern (Seitenraender, Schrift, Schriftgroesse, Zeilenabstand) und (2) typografischen FREIHEITEN (Kopfzeilenhoehe, footskip, exakte Seitenzahl-Position). Bewerte, ob die Aenderung einen regulierten Parameter beruehrt (Hinweis: der obere Textrand wurde ~6mm groesser — pruefe, ob 'oberer Rand' eine harte Vorgabe ist). Nenne die norm-neutralste technische Alternative. Sei ehrlich ueber Konfidenz und fehlende Quellen.`,
  { label: 'synthese:gutachten', phase: 'Synthese', schema: VERDICT_SCHEMA, effort: 'high' }
)

return { research, synthesis }
