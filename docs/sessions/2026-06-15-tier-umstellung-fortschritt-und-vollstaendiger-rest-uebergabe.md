# Session-Übergabe: „Tier"-Auflösung — Fortschritt docs/ + VOLLSTÄNDIGER verbleibender Scope

**Datum:** 2026-06-15 · **Workstream:** Diplomarbeit, Text-/Doku-Agent (Code parallel = Implementierungs-Agent)
**Status:** docs/ (Haupt-Repo, NUR `.md`) zum Großteil umgestellt; **GROSSER Rest offen** — vor allem das
cache-engine-`docs/`-Submodul (648!), die `.drawio`-Diagramme und die Termine. **Diese Session war NICHT
vollständig** (Selbstkorrektur, s. §6).

---

## 1. AUFTRAG (verbindlich)

Das doppeldeutige Wort **„Tier"** (dt. animal-Metapher vs. engl. „tier"=Stufe) durch die **GESAMTE
Dokumentation** der Diplomarbeit auflösen. ICH = Text-Agent (Doku `.md`/`.tex`/`.drawio` + Kommentare +
Mapping-Plan). Implementierungs-Agent = Code-Identifier (parallel) → **cache-engine-Submodul working-tree
NICHT für Code anfassen**. User-Direktiven: **manuell, Dokument für Dokument im Gesamtkontext gelesen,
KEIN Wort-Ersetzen** (ein Agent-Versuch wurde verworfen — er machte Fehler + erkannte nicht alle Ordner).
„Egal wie teuer." REBASE VERBOTEN (manuell fetch+merge). Bei jedem Teilschritt commit+push.

---

## 2. PFLICHT-REFERENZDOKUMENTE — VOLLSTÄNDIG einlesen, BEVOR weitergearbeitet wird

1. **DER MASTERPLAN (autoritativ):** `docs/architektur/TIER-AUFLOESUNG-AUDIT-UND-MAPPING-PLAN.md`
   — enthält: 4 Cluster + Zielbegriffe, oberste Ebene (Bibliothek≠Lebewesen≠Subject≠Host), Aufbau⊥Messung,
   Architektur-Landkarte, **§5/§6 Identifier-Mapping-Plan**, **§7 Fallstricke**, **§8 Reihenfolge**,
   **§9 Arbeits-Checkliste + STAND-Block**. Bei jeder „Tier"-Frage ZUERST hierher.
2. **Konzeptionelle Zugehörigkeit:** `thesis/diplomarbeit/docs/sessions/2026-06-15-konzeptionelle-algorithmus-zugehoerigkeit-massgeblicher-hinweis.md`
3. **Audit-Bedarf-Übergabe:** `thesis/diplomarbeit/docs/sessions/2026-06-15-tier-definitionsluecke-grossaudit-bedarf-uebergabe.md`
4. **Metapher-Hauptquelle (bereits umgestellt, als Vorbild):** `docs/architektur/14_achsen_komposition_organ_metapher.md`
5. **3-Ebenen-Modell (Code-Wahrheit):** `Code/external/comdare-cache-engine/docs/architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md` (§1)
   + `anatomy/anatomy_base.hpp` + `builder/experiment_tree/genus_binding_traits.hpp`
6. **Memory:** `project_tier_definitionsluecke_umstellung_grossaudit.md`, `anatomie-gattungen`,
   `feedback_technical_identifiers_over_metaphor`, `feedback_namens_inkonsistenzen_grundsaetzlich_pruefen`

---

## 3. DIE 4 CLUSTER + MAPPING (Kurzfassung — Details im Masterplan §5/§6)

| # | Cluster | Doku-Zielbegriff (DE) | Code (Implementierungs-Agent) |
|---|---|---|---|
| ① | **LEBEWESEN / Anatomie** (was ein Algo IST) | „Tier"→**„Lebewesen"**; „Tier-Unterklasse"→„Lebewesen-Unterklasse" | bleibt technisch (`SearchAlgorithmAnatomy`); `tier_subclass`→`organism_subclass` |
| ② | **SUBJECT / Mess-Schicht** (⊥ Anatomie) | „Probe"/„Tier-Typ"→**„Subject"** | `IObservableTier`→`IObservableSubject`, `tier_*`→`subject_*` (ABI-Bump!) |
| ③ | **BAND / Cache-Ebene** (L1/L2/L3, Disk/HBM) | **„Ebene"** (Cache-/Speicher-Ebene) | `CacheTier`→`MemoryBand`, `tier_for_*`→`band_for_*` |
| ④ | **RANG / SOTA-Reifegrad** (Tier-1/2/3) | **„Rang"** (DE) / „Rank" (EN) | (kaum Identifier) |

**Rollen ① (NICHT verwechseln):** Prüfling = **PRT-ART** (= engl. „probe"!); Baseline = SOTA.
**Gemessenes Lebewesen = „Permutations-Lebewesen/Rekombination"**, NIE „Probe".

**IMMER BELASSEN (überall):** verbatim „Tierwelt"-Zitate · Audit-Regexe (`…|Pflanze|Tier)\b`) ·
Code-Identifier (`TierBasedMigration`, `tier_observe_trace_abi`, `EachPermutationIsDistinctTier`,
`AllSixTiere…`, `tier_fill_level`, `CacheTier`) · Code-Pfade (`thesis_tiere/`) · Bio-Beinamen
(Säugetier/Vogel/Reptil/Wirbelloses/Pflanze) · `TIER3` (ZIH-HPC, Großschreibung) · Metapher-Code-Listen.
**KRITISCH ③≠④:** Disk-/Cache-/HBM-/Multi-Tier = Speicherhierarchie → „Ebene", **NIE** „Rang"!

---

## 4. VOLLSTÄNDIGE BESTANDSAUFNAHME (Grep 2026-06-15, ALLE Datei-Typen)

| Bereich | Vorkommen | Status |
|---|---|---|
| **A. Haupt-Repo `docs/`** | 291 / 36 Dateien | **teilw.** — `.md` A1/A2/A3 + Doc 14 done; **OFFEN: A4 Termine + .drawio + .txt** |
| **B. cache-engine `docs/`** (Submodul) | **648 / 50+ Dateien** | **❌ KOMPLETT OFFEN** — größter Bereich |
| **C. prt-art `docs/`** (Submodul) | 1 / 1 | ❌ offen (`20260512-2300-…rev6.md`) |
| **D. `thesis/_archiv_entwurf1/`** | 13 / 6 (.tex/.bib) | ❌ offen (alter Manuskript-Entwurf; Archiv) |
| **E. `thesis/diplomarbeit/` aktuell** | konz.Doku+Übergaben+Manuskript | Manuskript ④Rang done; **konz.Doku/Übergaben „Tier-Unterklasse" noch prüfen** |

### ⚠️ MEIN FEHLER DIESER SESSION (Selbstkorrektur):
- Mein erster Grep war **`glob:"*.md"`** → hat **`.drawio`** (Diagramm-XML: `phase5_uml_detail_REV5/REV6/REV7.drawio`
  je **25** Vorkommen, REV3/REV3_NACHARBEITUNG/REV4 je 4-6) und **`.txt`** (`Allokator_Matrix.txt`) **übersehen**.
- Die **§9-Checkliste im Masterplan zählt nur die `.md`** → ist für A4 UNVOLLSTÄNDIG. **Nächster Schritt:
  §9 um .drawio/.txt + Bereiche B/C/D/E ergänzen.**
- **B (cache-engine-docs, 648) war nie angefasst** — nur im Stand-Block als „offen" vermerkt.

---

## 5. ERLEDIGT + COMMITTET (Haupt-Repo `docs/`, nur `.md`)

Commits (Haupt-Repo `probst-Diplomarbeit-cache-engine`, main, gepusht): `0b43854`/`7c84c48`/`f6c6f86`/
`6e634d3` (Masterplan v2→v3b) · `478b3fd` (§9-Checkliste) · `9ce5c97` (A2) · `42b7d8d` (A1) · `f5f2b55`
(Doc 14) · `c99e940` (Stand) · `374c18c` (A3 Sessions Teil1) · `db26e50` (A3 20260524/25) · `8c4d2bf`
(A3 anatomie) · `b6accff` (A3 Reste).
- **A1** (7 konzept. `.md`) · **A2** (10 Rang/Ebene) · **Doc 14** (Metapher-Hauptquelle, 67/72) ·
  **A3 Sessions KOMPLETT** (~22 `.md`-Sessions + goal-v6.txt + CROSS_REFS).
- Im Master-Dok selbst bleiben „Tier-1/2/3" als **Quelltext** (beschreibt die Umstellung) — NICHT ändern.

---

## 6. OFFEN — die eigentliche Hauptarbeit (Reihenfolge-Vorschlag)

1. **§9-Checkliste vervollständigen** (Masterplan): `.drawio` + `.txt` + B/C/D/E ergänzen.
2. **A4 Termine** (`docs/termine/` + `termine_konsolidiert/`): `.md` (11/12_*taxonomie je 17, _paper/_rev5_extractions
   15-19, HABICH_*, Termin-8-Dateien) **UND `.drawio`** (REV5/6/7 je 25 — Diagramm-Labels, XML, heikel!)
   **UND `.txt`** (`Allokator_Matrix.txt`). Cluster gemischt ①/③/④.
3. **B. cache-engine `docs/` (648, größter Block):** Doc 24 (104!), Doc 30 (41), Doc 27 (39),
   `abhaengigkeitskette_…` (39), Doc 33 (32), `messarchitektur_v5_design` (33), Doc 34 (31),
   `messarchitektur_design_observer…` (30), Doc 31 (15), `messarchitektur_klarstellungen` (19),
   `messarchitektur_v5_entscheidungen` (16), Doc 29 (17), Doc 26 (12), `20260529-SESSION-HANDOFF-organ-metapher`
   (22), `roadmap40-tier-wrapper-umstufung` (8), viele sessions. **Submodul `comdare-cache-engine` —
   working-tree wird PARALLEL vom Implementierungs-Agenten bearbeitet → KOORDINIEREN; nur `docs/`-`.md`
   anfassen, NIE Code; eigener Commit im Submodul + Pointer-Bump im Haupt-Repo.** Hier ist viel ② Subject
   (`tier_observe`/`IObservableTier`/`ComdareTierObserverSnapshot` = Code-Identifier → BELASSEN, der
   Implementierungs-Agent macht sie) — **sehr sorgfältig ① Doku-Metapher vs. ② Code-Identifier trennen.**
4. **C. prt-art `docs/`** (1): `20260512-2300-prt-art-vollausbau-rev6.md`.
5. **D. `thesis/_archiv_entwurf1/`** (13, `.tex`/`.bib`): alter Entwurf — niedrige Prio, aber Vollständigkeit.
6. **E. `thesis/diplomarbeit/`:** konz.Doku + beide Übergaben („Tier-Unterklasse"→„Lebewesen-Unterklasse")
   + Manuskript-Metapher (Kap. 4, falls „Tier" als Metapher) — danach `build.ps1 -Lang de|en` grün halten.

---

## 7. ARBEITSWEISE (zwingend, User-Direktiven)
- **Manuell, Dokument für Dokument, im Gesamtkontext gelesen** (Grep `-C` für Kontext, dann gezielte Edits;
  bei eindeutigem Einzelbegriff je Datei nach Kontextprüfung `replace_all` erlaubt). **Kein blindes
  globales Wort-Ersetzen über Dateien hinweg** (zerstört ③≠④ + Code-Spans + Satzbau).
- Pro Datei ALLE Cluster zusammen; **jede `.drawio` einzeln im XML prüfen** (Labels in `value="…"`).
- Verifikation je Bereich per Grep; Commit+Push je sinnvoller Gruppe; Submodule separat + Pointer-Bump.
- **`\bTier`-Wortgrenzen** (sonst „Säugetier"/deutsche Substrings sor**tier**t/exis**tier**t beschädigt).

---

## 8. GESICHERTER STAND
- Haupt-Repo `probst-Diplomarbeit-cache-engine` main @ `b6accff` (gepusht). cache-engine-Submodul-Pointer
  unverändert (working-tree des Implementierungs-Agenten). LaTeX-Repo `20260931-Overleaf` @ `31b0d2e`.
- Master-Dok §9 STAND-Block = Live-Fortschritt. Diese Übergabe + die zwei `2026-06-15-*`-Docs = Kontext.

**NÄCHSTER SCHRITT:** §9 um .drawio/.txt + B/C/D/E ergänzen, dann A4 (inkl. .drawio) manuell, dann B
(cache-engine-docs, koordiniert).
