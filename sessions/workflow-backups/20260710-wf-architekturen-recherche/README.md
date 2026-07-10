# Workflow-Backup: Architekturen-Recherche (2026-07-10)

**Für den Infra-Agenten** — Rohdaten der Text-Agent-Recherche „Welche Architekturen waren
ursprünglich für die Experimente geplant?" (Workflow `wf_da11ac46-295`, 6 Agenten, 0 Fehler,
~376k Subagent-Tokens). Diese Rohdaten ersparen eine erneute Recherche.

## Dateien
- `workflow-script.js` — das Orchestrierungs-Skript (5 parallele Leser + 1 Beleg-Verifikator).
- `journal.jsonl` — je Agent eine `{"type":"result",…}`-Zeile mit dem vollen strukturierten Ergebnis
  (platforms[] mit name/isa/role/evidence/planned_vs_current + notes). **Primäre Lesequelle.**
- `result-full.json` — zusammengeführtes Workflow-Endergebnis (readers + verification).
- `agent-*.jsonl` — vollständige Roh-Transcripte der 6 Subagenten (alle Tool-Calls + gelesene Snippets).

## Leser-Zuordnung (Reihenfolge im journal)
1. Aufgabenstellung + Kap. 1 (FF0–FF4, Beiträge)
2. Kap. 6 Versuchsplattformen + Kap. 7 (Mess-Stand)
3. cache-engine `docs/sessions/20260602-cacheline-konfigurator-design-und-hw-recherche.md` (HW-Recherche, P-MD5/#163)
4. Kap. 2 (Cache-Line/Architekturen) + Anhang D (Build-Achse 12 / IS3-ISA-Zeilen)
5. Termine/Sessions: **Termin 6 „Plattformmatrix" / Quellen_Gesamtkatalog TEIL D (D.1–D.10)** +
   Begriffsglossar BLOCK AO (2 Production-Maschinen, Architekt-Beschluss 2026-05-08) +
   `sessions/2026-06-15-aufgabenbeschreibung-kapitel-1-3-kommentare.md` §10 (AP-G2a-Inventar, Voll-Mess-Fleet-Bestätigung)
6. Verifikator (12 Belege stichprobengeprüft, alle Kernaussagen bestätigt)

## Kern-Ergebnis (Kurzfassung)
Ursprünglich geplantes Mess-Fleet (Termin 6 Plattformmatrix, D.1–D.10; Architekt-Beschluss 2026-05-08):
2 Production-Maschinen **AMD Ryzen 9 9950X3D** (Zen 5, X3D, AVX-512) + **Intel i9-14900KS**
(Raptor-Lake-R, Hybrid P/E); **i7-1270P**-Laptop (Alder Lake, D.1; am 2026-06-15 von Messwerten
ausgeschlossen); **ZIH Barnard** = Xeon Platinum 8470 **Sapphire Rapids** (AVX-512, Full-Sweeps);
**StarFive VisionFive 2** (SiFive U74, RISC-V RV64GC); **Raspberry Pi 5** (Cortex-A76);
**Apple Mac mini M1**; **ODROID-H4 Ultra** (i3-N305, nur E-Cores); **GH200 Grace Hopper**
(Neoverse V2 + SVE2, via Alpha Centauri, User-Absprache-Gate); **ZIH Capella** (EPYC 9334 + A100,
optional). Deltas: + Mac Mini 2019 (Coffee Lake, Autor 2026-06-15); − i7-1270P.
Experiment-OS-Plan (AP-M1): **Dual-OS Talos (immutable) + root-Linux/Ubuntu (perf/MSR)**.
GPU explizit außerhalb des Umfangs (Aufgabenstellung Z.124-125).

## Nebenfund (KORRIGIERT 2026-07-10)
Anhang D widersprach Kap. 5/6 + Terminen: „Barnard (AMD EPYC 7763 Zen 3), Capella (Intel Xeon)" —
korrigiert auf Barnard = **Intel Xeon Platinum 8470 (Sapphire Rapids)** und Capella =
**AMD EPYC 9334** (DE+EN, je 3 Stellen).

## ⚠️ WICHTIG für den Infra-Agenten: i9-14900KS AUSGEFALLEN (User-Info 2026-07-10)
Die Production-Maschine 2 (prod2, **Intel i9-14900KS** — im obigen Mess-Fleet Position 2) ist
**gestorben und im RMA/Austausch; verwendbar erst ~September 2026**. Bis dahin: keine
`pmc:intel`-/P-E-Core-Messungen auf dieser Plattform (`COMDARE_PROD2_AVAILABLE=false`, Runner 17
pausiert — bleibt so). Die Hybrid-CPU-Klasse hat damit vorerst keine freigegebene Messmaschine
(i7-1270P wurde 2026-06-15 von Messwerten ausgeschlossen). Details + Konsequenzen: DA-Ledger
§12, Eintrag 2026-07-10.
