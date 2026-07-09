# Session-Backup 2026-07-02 — Migration auf neuen Claude-Account/Maschine

> Zweck: Vollständige Sicherung aller Memories, Pläne, Workflow-Skripte und Rohdaten der
> Text-Agent-Sessions (Figuren-Korrekturen F1–F9 → Massen-Galerien → Voll-Review → ultracode-Audit
> Thesis↔Code → Audit-Nachzug P1–P7 → Restpunkte), damit ein anderer Claude-Account auf einer anderen
> Maschine nahtlos weiterarbeiten kann.
> **Stand bei Backup:** thesis `35aefc2`+ / BASE `8f74942` (nach Impl-Agent-Merges `75da5b8`);
> cache-engine `b8761f0`+ (Audit-Referenz), prt-art `f98445e`. DE 152 / EN 144 Seiten, Builds sauber.

## 1. Maßgebliche Dokumente (bereits im Repo, hier nur verlinkt)
- **Audit (autoritativ):** `sessions/2026-07-02-audit-thesis-vs-code.md` — 151 Claims, §1=28 Thesis-Korrekturen (alle umgesetzt), §2=16 Code-TODOs.
- **Impl-Handout (offener Arbeitsvorrat!):** `sessions/2026-07-02-handout-implementierungsagent-audit-code-todos.md` — User-Matrix P1–P7 + AP-1…AP-15 (P0=M3-Gate). **Alle AP offen.**
- **Session-Verlauf/Restpunkte:** `sessions/2026-06-30-figuren-korrekturen-F1-F9-ERLEDIGT.md` (inkl. Voll-Review-, Galerie-, Audit-Nachzug- und Restpunkte-Abschnitte).
- Architektur-Grundlage der Figuren: `sessions/2026-06-30-architektur-analyse-bild-korrekturen.md`.

## 2. Dieser Backup-Ordner
- `memory/` — 34 diplomarbeit-/cache-engine-/codex-relevante Memory-Dateien des bisherigen Accounts
  (Format: frontmatter name/description/type + Fakt). **Auf der neuen Maschine:** in
  `~/.claude/projects/<projekt>/memory/` übernehmen und `MEMORY.md`-Index-Zeilen daraus neu anlegen.
  Wichtigste: `reference_thesis_axis_t_ids_vs_dir_numbers` (T-IDs≠axis_NN!), `reference_thesis_git_topology_remotes_overleaf`
  (BASE+2 Submodule, je 2 Remotes, beide pushen, NUR MERGE), `feedback_text_agent_sessions_belong_in_thesis_not_impl_repo`,
  `project_handout_ap1_15_code_nachzug_audit_20260702`, `project_thesis_habich_restruktur_general_to_special`,
  `feedback_messdaten_nie_loeschen_abi_darf_brechen`, Codex-Arbeitsweise (`feedback_codex_*`, `reference_codex_*`).
- `workflows/` — 11 ultracode-Workflow-Skripte aller Thesis-Sessions (Format-Compliance, DE↔EN-Audits,
  P-Nummern-Audit, Subaxis-Audit, Kap.-4-Grounding, Architektur-Figuren-Analyse, **thesis-code-audit** u.a.).
  Wiederverwendbar via Workflow-Tool (`scriptPath`); Pfade im Kopf der Skripte ggf. an neue Maschine anpassen.
- `rohdaten/` — **strikt additiv, nie löschen:**
  - `audit-workflow-journal.jsonl` — vollständige Agent-Rückgaben des Audit-Workflows wf_b162b7ab (30 Agenten, 151 Findings).
  - `audit-divergent-all-50.json` — alle 50 DIVERGENT-Befunde (Quelle des Audit-Berichts §1/§2).

## 3. Offene Arbeit für die Weiterführung
1. **Code-Seite (Impl-Agent):** AP-1…AP-15 aus dem Handout; Reihenfolge AP-1→AP-7 = Gate vor M3-Lauf (#156/#162).
2. **Text-Seite (wartet auf Code-Landungen):** (a) T0-Zählung 21→22 nach AP-7 (SwissTable S22);
   (b) PRT-ART-Ebenen-Darstellung nach E6/AP-2 erneut drehen (dann sind Pool/Layout echte Slots);
   (c) Kap.-5/6-„Erhebungspfad folgt"-Stellen nach AP-1 auf „erhoben" heben.
3. **Mess-Experiment:** A/B/C-Läufe mehrtägig, nicht pollen; Kap. 5 füllt sich über `\input`-Platzhalter.

## 4. Konventionen (unverändert gültig)
DE führt, EN spiegelt · Build `pwsh -NoProfile -File build.ps1 -Lang de|en`, Logs auf `^!`/undefined/Overfull prüfen ·
beide Remotes (origin=GitHub, gitlab) pushen, Submodul zuerst, dann BASE-Pointer · NUR MERGE, nie Rebase/Force ·
`\enquote{}` statt ASCII-Quotes · Codex-Cross-Model-Review vor „fertig" (nur Code-Repos) · Messdaten nie löschen
(Schema darf brechen) · Session-Docs des Text-Agenten nach `thesis/diplomarbeit/sessions/`.
