# Anhang B (Code-Struktur) + Anhang E (Architekturentscheidungen) — Kartierungs- und Autorier-Plan

**Datum:** 2026-07-17
**Ziel:** Die beiden Abgabe-Blocker-Anhänge B und E aus ihren 4-Zeilen-Stubs
(`dc68189 Initial Overleaf Import`) zu vollständigen, faktentreuen Anhängen ausbauen —
DE + EN inhaltsgleich, lokal PDF-verifiziert, granular lokal committet. **Kein Push**
(Push braucht je-Repo-User-GO).

## 0 — Repo-Mechanik (verifiziert)

- **Thesis-Repo** = Submodul `thesis/diplomarbeit` des Super-Repos; HEAD `8d156a5`,
  Branch `development`, Working Tree sauber.
- **Bilingualität** = Single-Source-XOR: `\thesislang ∈ {de,en}` aus `config/language.tex`
  (Default `de`); `\include{anhang/\thesislang/X}` wählt je Sprache eine eigene Datei.
  Lokaler Override: `\def\thesislang{en}\input{diplomarbeit.tex}` (build.ps1 -Lang / Makefile).
- **Build (kanonisch, CI):** `latexmk -pdf -interaction=nonstopmode -halt-on-error diplomarbeit.tex`.
  §7-Hard-Gate: 0 Fehler, `LaTeX Warning`-Count ≤ 1 (bekannt), `.blg` ohne
  `Repeated entry|Warning--`.
- **Stil-Muster:** `anhang/{de,en}/F_comparison_interfaces.tex` (longtable/booktabs, `\texttt{}`,
  literale UTF-8-Umlaute) + `A_measurements.tex` (Abschnitts-Prosa). Umlaute literal UTF-8.
- **Verfügbare Labels (backward-only-Regel):** `app:measurements` (A), `app:code` (B, eigen),
  `app:glossary` (C), `app:blocks` (D), `app:adr` (E, eigen), `app:interfaces` (F);
  Kapitel-Labels u.a. `sec:axes`, `sec:axis-framework`, `sec:concept-crtp`, `sec:abi`,
  `sec:builder`, `sec:codegen`, `sec:adapters`, `sec:measurement-system`, `sec:prt-art`.
  Bib-Keys u.a. `idreos2018periodic`, `idreos2018datacalculator`, `leis2013art`, `iso_cpp`.

## 1 — Anhang B: Code-Struktur (Quelle = realer Baum, read-only kartiert)

Drei-Repo-Topologie: **super** (`Code/`) = WAS/Anwender-Schicht · **ce**
(`Code/external/comdare-cache-engine`) = WIE/Framework · **prt-art**
(`Code/external/comdare-prt-art`) = Prüfling.

Gliederung:
- **B.1** Drei-Repo-Überblick (Tabelle Rolle je Repo).
- **B.2** Cache-Engine (Framework):
  - Drei-Schicht-Bibliotheken `libs/{cache_engine,execution_engine,search_engine,common,test_infra}`.
  - Achsen-Dach `topics/axis.hpp` (semantik-freies `Axis<Derived>`-Concept, `AxisKind`) + Organ-Achsen `axes/*`.
  - Die 19 Organ-Achsen-Slots T0–T18 = `kCompositionAxisNames` (`builder/experiment_tree/axis_path_serialization.hpp`).
  - System-Achsen-Schicht `include/cache_engine/measurement/*system_axis.hpp` (6 Konfig-System-Achsen, INC-1a-c).
  - Anatomie `anatomy/*` (Gattung/Lebewesen/Organe, Prüf-Dock, Observer-Snapshot-POD).
  - Builder/Codegen `builder/*` (experiment_tree, build_orchestrator, pruef_dock, codegen, measurement).
  - Profil-Fassade `profile_facade/*` (Golden-Naht, SOTA-Katalog).
  - Concepts + ABI + api `include/cache_engine/{concepts,abi,measurement,api}`.
  - `apps/*` + `tools/*`.
- **B.3** PRT-ART (Prüfling): `prt_art/*` (algorithm_profiles, codegen, permutations_codegen, registry_gen, legacy_reimpl, src, include, tests).
- **B.4** Anwender-Schicht super `Code/`: die neun nummerierten Pipeline-Stufen 01–09,
  `02_messung_driver` (Treiber), `experiment_config/*.xml` (3 Messreihen A/B/C), `tests/`, `cmake/`, `tools/`.

Verifizierte Kern-Fakten (ohne Erfindung): 19 Organ-Achsen (T0–T18, autoritativ aus
`kCompositionAxisNames`); Allokator-Achse axis_06 mit zentraler `AllVendors`-mp_list
(rund zwei Dutzend Vendor-Wrapper, `EnabledVendors` compile-time gefiltert); 6 CEB-System-Achsen-Dateien;
Ebene-1-Gattungen im Anatomie-Modell (SearchAlgorithm/Container/Graph + Set-Genus).

## 2 — Anhang E: Architekturentscheidungen (Quelle = Ledger §18/§19/§20 + §0-GOAL-V6)

Nur **dokumentierte User-Entscheide** als ADR (Kontext / Entscheidung / Konsequenzen, je mit Datum).
~12 ADRs:

1. Rekursive Dock-Architektur (Experiment-Dock eindimensional / Prüf-Dock bidirektional) — §18.1.1/§19.C.
2. Compile-time-only CRTP + Concept-Guard im Hot-Path (keine vtable, kein Runtime-Switch) — V6.4/§18.2.1.
3. Allokatoren = Algorithmen der Allokator-Achse (axis_06), compile-time-Vendor-Filter — §18.1.4.
4. Vier Ebene-1-Gattungen (map/container/set/graph), je Kopf-Framework; Set eigenes Genus+ABI; View read-only — §18.1.5/§19.C.
5. DLL-Load Option B (Vendor-Archiv-Self-Link je Permutations-DLL) — §18.2.3/§20.C.
6. System-Achsen ⊃ Tier-Binary-Achsen (Soll-Schichtung), 6 CEB-System-Achsen — §18.1.2/§20.B.
7. Der EINE koordinierte 4→5-ABI-Bump am Experiment-Planer-Dock — §18.2.4.
8. golden-320 messdaten-erhaltender Umbau (alt einfrieren, erweitern statt ersetzen) — §18.2.4/§16.2.
9. Serialisierung (Systemachsen-Ordner flach + tiefer Tier-Baum + dynamik-only-CSV + Sidecar) — §18.1.6/§16.2-Q.
10. Fehler-Sichtbarkeit ("failed"-Zelle statt null + Log neben CSV) — §18.1.7-M4.
11. Mess-Verfahren Debug=parallel / Mess=1-Thread; Messung nie als Nullen — §18.1.7-M1.
12. Q2 Option C: Erweiterungshardware-System-Achse (SIMD), CEB permutiert simd_extension zur Laufzeit
    (Flags an CompileFn, Provenienz im H-10-Sidecar, nie binary_id) + Compiler gcc|clang als 5. System-Achse — §20.B.

Abgrenzung: Der ältere ADR-Satz F1–F15 (`docs/bausteine/04_...md`, Termin 7, 2026-05) ist
historisch und teils superseded; maßgeblich sind die konsolidierten Ledger-Entscheide (neuere Fakten schlagen ältere).

## 3 — Verifikation + Commit

- latexmk DE **und** EN, Exit 0; `.blg` ohne Repeated/Warning; `LaTeX Warning`-Count nicht über Baseline;
  Mojibake-Grep `Ã|â€` == 0 auf den neuen .tex.
- Zwei granulare lokale Commits (Anhang B; Anhang E), Repo-Message-Stil, Co-Authored-By.
- **KEIN Push** — Push-GO steht beim User aus.
