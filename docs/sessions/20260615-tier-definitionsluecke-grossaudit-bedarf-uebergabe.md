# Session-Übergabe — „Tier"-Definitionslücke: Umstellungs-Auftrag + Groß-Audit-Bedarf

**Datum:** 2026-06-15
**Workstream:** Diplomarbeit (Text-/Doku-Agent) — parallel zum Implementierungs-Agenten (Code)
**Anker-Doku:** [`20260615-konzeptionelle-algorithmus-zugehoerigkeit-massgeblicher-hinweis.md`](20260615-konzeptionelle-algorithmus-zugehoerigkeit-massgeblicher-hinweis.md) (maßgeblicher Hinweis: 3-Ebenen-Modell, Gattungen/Lebewesen-Unterklassen, Achsen-Sätze, Hash-Lehrbeispiel)
**Status:** Auftrag begonnen, **bewusst vor der codebasis-weiten Umstellung pausiert** — es fehlt der vollständige Code-Kontext (siehe §4 Groß-Audit-Bedarf).

---

## 1. Auftrag (User, verbatim sinngemäß)

> „Jetzt haben wir das Problem, dass sich diese Definitionslücke durch die gesamte Diplomarbeit und deren Code zieht. Bitte korrigiere dieses Problem entsprechend aller docs und Dokumentation, damit der Implementierungsagent es nachher richtig macht. Du bist der Text-Bearbeitungs-Agent. Die Implementierung läuft parallel. Ich meine damit wirklich die GESAMTE Dokumentation bezüglich der Konzeption, auch wenn es die ganze Nacht dauert."

**Rollen-Split:**
- **Ich (Text-Agent):** gesamte konzeptionelle **Dokumentation** (`.md`, Manuskript `.tex`) + **Code-Kommentare** + **Identifier-Mapping-Plan** (Vorgabe-Tabelle alt→neu).
- **Implementierungs-Agent (parallel):** **Code-Identifier/Enums/Logik** — setzt den Mapping-Plan um.
- **Git-Konsequenz:** der **cache-engine-Submodule wird parallel bearbeitet** (working-tree-dirty) → ich fasse ihn NICHT an; nur eigene Doku-Commits, niemals `git add` auf cache-engine-Code.

---

## 2. Die „Tier"-Definitionslücke — Kern des Problems

Das Wort **„Tier"** ist **mehrdeutig** und kollidiert gefährlich:
- **dt. „Tier"** = animal (die etablierte Anatomie-/Organ-Metapher: ein Algorithmus = ein Lebewesen, dessen Organe die Achsen sind)
- **engl. „tier"** = Stufe/Ebene/Rang

Die Bestandsaufnahme (Explore-Agent, diese Session) hat **mindestens DREI** distinkte Bedeutungen aufgedeckt:

| # | Bedeutung | Wo (Beispiele) | Auflösung |
|---|---|---|---|
| (1) | **Metapher** = das messbare Lebewesen / der Algorithmus | Doc 14/34, Code: `IObservableTier`, `tier_observe`, `IRollbackableTier`, `tier_save_all`, `drive_tier_observe_trace` | DE-Doku **„Lebewesen"**; EN-Code **`Organism`** |
| (2) | **SOTA-Reifegrad** = Tier-1/2/3 (Rang der Stand-der-Technik-Verfahren/Allokatoren/Plattformen) | docs, Manuskript, `bausteine/03_cross_paper_konzeptmatrix.md`, „Habich-Tier-3" | **„Rang"** (DE) / **„Rank"** (EN) |
| (3) | **weitere Bedeutung(en) im Code** (z. B. scheinbar Cache-Hierarchie L1/L2/L3: `CacheTier`, `tier_for_offset`, `TierBudget` in prt-art) | prt-art `memory_layout/multi_level_layout.hpp` | ⚠️ **NOCH NICHT SICHER EINGEORDNET — siehe §4** |

---

## 3. Entscheidungen (User, diese Session — verbindlich)

1. **Beide auflösen:** sowohl die Level-Klassifikation ALS AUCH die animal-Metapher — „Tier" soll als doppeldeutiges Wort verschwinden.
2. **Metapher-Oberbegriff „Tier" → „Lebewesen"** (DE-Doku). Korrekter als „Tier", da **Pflanze/View kein Tier** ist; passt zu bestehendem `IAnatomyBase` = „Lebewesen".
   - „Tier-Unterklasse" → **„Lebewesen-Unterklasse"**; „ein Tier" → „ein Lebewesen"; „Tier-Metapher" → „Lebewesen-Metapher".
3. **Bio-Klassennamen BLEIBEN** als anschauliche Beinamen: Säugetier=SearchAlgorithm, Vogel=Set, Reptil=Sequence, Wirbelloses=Adapter, Pflanze=View. („Säugetier" enthält zwar „tier", ist aber ein eindeutiges Einzelwort — kein Konflikt.)
4. **SOTA-Reifegrad „Tier-1/2/3" → „Rang-1/2/3" (DE) / „Rank-1/2/3" (EN).** Im **Manuskript bereits erledigt** (Kapitel 1/3/6/8 + Kurzfassung, Commit `007995a`/`fffd168`).
5. **Metapher im EN-Code → `Organism`**: `IObservableTier`→`IObservableOrganism`, `tier_observe`→`organism_observe`, `IRollbackableTier`→`IRollbackableOrganism`, `tier_save_all`→`organism_save_all`, `drive_tier_observe_trace`→`drive_organism_observe_trace` usw.
6. **Scope:** Doku + Kommentare durch mich; Code-Identifier via Mapping-Plan durch den Implementierungs-Agenten.

---

## 4. ⚠️ KRITISCH — Groß-Audit als Voraussetzung (User-Direktive)

**User-Korrektur (wörtlich sinngemäß):**
> „Du scheinst bezüglich dieser Bezeichnung und Einordnung noch überhaupt nicht im Bilde zu sein. Es gibt in der Umsetzung des Codes **Achsen und Sub-Achsen, die im Wesentlichen Organe und Organ-Bestandteile der Lebewesen bezeichnen**. Die Frage ist falsch gestellt und das **System/Framework existiert in einer viel exzessiveren Größenordnung**, als deine Frage vermuten lässt. … Vermerke, dass ein **groß angelegtes Audit den Kontext liefern kann, den wir brauchen, um die letzten Aufgaben zu erledigen**."

**Was das heißt:**
- Meine `CacheTier`→`CacheLevel`-Frage (Bedeutung (3)) war **falsch gestellt**. Die „Tier"-Vorkommen im Code sitzen NICHT in einer isolierten Cache-Hierarchie, sondern eingebettet in eine **viel größere Organ-/Organ-Bestandteil-Struktur** (Achsen = Organe, **Sub-Achsen = Organ-Bestandteile** der Lebewesen).
- Die **Code-seitige Einordnung jeder einzelnen „Tier"-Verwendung** (Metapher vs. Rang vs. etwas anderes innerhalb der Achsen/Sub-Achsen-Anatomie) ist **ohne vollständiges Framework-Audit nicht sicher** — eine naive Find-&-Replace-Umstellung würde Bedeutungen verwechseln und die Anatomie beschädigen.

**→ NÄCHSTE SESSION ZUERST:** Ein **groß angelegtes Audit** des gesamten Frameworks durchführen (Achsen + Sub-Achsen + deren Organ-Semantik + ALLE „Tier"-Verwendungen im Code, je mit korrekter Bedeutung). Dieses Audit liefert den Kontext, der für (a) den korrekten Identifier-Mapping-Plan und (b) die codebasis-weite Umstellung nötig ist. **Erst Audit, dann Umstellung.**

---

## 5. Bestandsaufnahme (diese Session, grobe Größenordnung)

| Bereich | Metapher-„Tier" (→Lebewesen) | Level-„Tier" (→Rang/Rank) | Bio-Klassen (bleiben) | Code-Identifier |
|---|---|---|---|---|
| Haupt-`docs/` (`.md`) | ~180 | ~50 | ~5 | 0 (reine Doku) |
| cache-engine `docs/` | ~200 | ~15 | — | (Referenzen) |
| cache-engine `libs/`+`tests/` | ~30 (Kommentare) | — | — | `IObservableTier`, `IRollbackableTier`, `observable_tier*`, `test_genus_*` |
| prt-art Code | ~5 (Kommentare) | — | — | `CacheTier`, `tier_for_offset/_key`, `TierBudget` |
| Manuskript `thesis/` | ~50 (noch offen) | ~15 (**erledigt**) | ~1 | 0 |

**Top-Dateien (Metapher-dicht):** `docs/architektur/14_achsen_komposition_organ_metapher.md` (~150!), `20260615-konzeptionelle-...md` (~120, nutzt selbst „Tier-Unterklasse"), cache-engine `docs/architecture/30_audit_...md` (~80), `34_KONSOLIDIERTER_MASTER_IST_STAND.md` (~60), `anleitung_messwerte_erzeugen.md` (~40).

**Hinweis Identifier (Zweitprio, nur Kommentar-Check, Code bleibt technisch korrekt):** `AnatomyGenus`, `genus_binding_traits.hpp`, `*Anatomy`, `test_genus_*.cpp` — enthalten NICHT „Tier", sind aber metapher-bezogen. NICHT umbenennen, nur Kommentare prüfen.

---

## 6. Offene TODOs (priorisiert)

1. **[VORAUSSETZUNG] Groß-Audit** des Frameworks (Achsen/Sub-Achsen = Organe/Organ-Bestandteile; jede „Tier"-Code-Verwendung korrekt einordnen). — §4
2. **Identifier-Mapping-Plan** (Vorgabe-Dok für Implementierungs-Agent), erst NACH Audit final: Metapher→`Organism`, Level→`Rank`, (3) erst nach Audit.
3. **DE-Doku Metapher → „Lebewesen"** (Haupt-`docs/` ~180 + cache-engine-`docs/` ~200): Doc 14 zuerst (dichteste Datei). Level→„Rang" mitnehmen (~65).
4. **Manuskript Metapher → „Lebewesen"** (DE+EN, ~50; Level bereits erledigt). `kapitel/{de,en}/04_concept_architecture.tex` zuerst. Danach `build.ps1 -Lang de|en`, beide grün (52 S., 0 Fehler) halten.
5. **Code-Kommentare** umstellen (Metapher→Lebewesen) — koordiniert, ohne cache-engine-Code-Dateien des Implementierungs-Agenten zu überschreiben.
6. **cache-engine + prt-art `docs/`** umstellen — Submodule, separate Commits, Koordination mit Implementierungs-Agent.

---

## 7. Gesicherter Stand (committet + gepusht)

- **Haupt-Repo** `probst-Diplomarbeit-cache-engine`: **`4ca3713`** („Stand-Sicherung vor Tier→Lebewesen/Rang-Doku-Umstellung") — prt-art-Submodule-Pointer auf `5c8095f` aktualisiert (PRT-ART = „Probst Redirect Tree"), untracked Doku nachgezogen (`docs/sessions/20260602 goal-v6…`, `docs/termine/Termin 10`). **cache-engine-Submodule bewusst unberührt** (gehört dem parallelen Implementierungs-Agenten).
- **LaTeX-Repo** (`20260931-Overleaf-Diplomarbeit`): **`2852f66`** — Manuskript: SOTA-Level→Rang/Rank vollständig, Kurzfassung de-jargoned + Kasus-Korrektur. Beide Sprachen bauen grün.
- **prt-art-Submodule**: `5c8095f` — README/CMakeLists auf „Probst Redirect Tree / ART hybrid" angeglichen.

---

## 8. Arbeitsregeln (für die nächste Session zu beachten)

- **REBASE VERBOTEN** — immer manuell `fetch` + Divergenz-Check + `merge`, dann `push`. Overleaf pusht autonom ins LaTeX-Repo.
- **Bei jedem Teilschritt commit + push** merken (reversibel; destruktive Autonomie nur in den 3 Repos Diplomarbeit/cache-engine/prt-art mit Tag+Commit+Push).
- **Deutsche Orthografie** (Umlaute nie ersetzen). Antwortsprache Deutsch.
- **engl. „tier" NIE im deutschen Text.** Wikipedia nicht zitierfähig (nur wissenschaftliche Direktquellen).
- **cache-engine-Code nicht anfassen** (Implementierungs-Agent) — nur Doku/Kommentare, und dort koordiniert.
- **Erst Audit, dann Umstellung** (§4).

---

## 9. Verweise

- Anker: `docs/sessions/20260615-konzeptionelle-algorithmus-zugehoerigkeit-massgeblicher-hinweis.md` (§7 enthält die „Tier"-Doppeldeutigkeits-Regel, §9 Formulierungs-Landkarte, §10 Richtlinien — **selbst noch mit „Tier-Unterklasse" durchsetzt, muss in der Umstellung mit**).
- Architektur autoritativ: `docs/architektur/14_achsen_komposition_organ_metapher.md`; cache-engine `docs/architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md` (3-Ebenen-Modell §1) + `14_*` + `30_*`.
- Memory: `reference_anatomie_gattungen.md` (3 Gattungen + 5 Lebewesen-Unterklassen, Achsen-Sätze 19/15/11/13/7, Tier-Doppeldeutigkeits-Note).
