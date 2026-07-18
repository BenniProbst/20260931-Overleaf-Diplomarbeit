# Zwischenstand 2026-06-15 — Test-Fleet, Cache/OS-Spektrum, Dual-OS-Experiment, B+-Baum, 2.1

> Snapshot der neuen Erkenntnisse dieser Session (Kap.-1–3-Arbeit; AP-G2/G2a/G2b/M1). Single-Source
> der Aufgabenplanung bleibt `20260615-aufgabenbeschreibung-kapitel-1-3-kommentare.md`; dies ist die
> elaborate Konsolidierung der Hardware-/OS-Befunde + der neuen Dual-OS-Entscheidung.

## 1. Test-Fleet (Autor-bestätigt 2026-06-15) + OS

| Maschine | ISA / CPU | OS | L3? | Cache-Line | Laufzeit-Konfig |
|---|---|---|---|---|---|
| Ryzen 9 9950X3D | x86-64 Zen 5 | **Talos OS + root-Ubuntu** (dual) | ja, asym. 96+32 MiB | 64 B | Talos: boot-statisch · Ubuntu: voll (MSR) |
| Intel i9-14900KS | x86-64 Raptor Lake (8P+16E) | **Talos OS + root-Ubuntu** (dual) | ja, 36 MiB | 64 B | Talos: boot-statisch · Ubuntu: voll (MSR 0x1A4) |
| Odroid H4 Ultra | x86-64 Alder-Lake-N (i3-N305, 8×E) | Debian/Ubuntu | ja, 6 MiB | 64 B | runtime-MSR möglich |
| VisionFive 2 | RISC-V JH7110 / SiFive U74 | Hersteller-Debian (GNOME) | **NEIN** | 64 B | fixed (riscv_hwprobe read-only) |
| Raspberry Pi 5 | ARM Cortex-A76 (BCM2712) | Ubuntu Server | ja, 2 MiB | 64 B | fixed (CTR_EL0 read-only) |
| Mac Mini 2019 | x86-64 Coffee Lake (i5-8500B/i7-8700B) | macOS | ja, 9–12 MiB | 64 B | none (SIP) · x86-Specs öffentlich |
| Mac Mini M1 | ARM Apple M1 | macOS | SLC 16 MiB (gemessen) | L1 64 B / L2+SLC 128 B | none / **Blackbox** |
| ZIH Grace Hopper | ARM Neoverse V2 (GH200) | Linux HPC | ja, 114 MiB/Socket | 64 B | fixed (CTR_EL0); SVE2 4×128-bit |
| ZIH Barnard/Capella | x86 / GPU A100 | Linux HPC | ja | 64 B | runtime (HPC, geteilt); AVX-512 (Barnard) |
| (i7-1270P Laptop) | x86-64 Alder Lake | Windows 11 | ja | 64 B | **NICHT für Messwerte** (Jitter) |

Span: **x86 + ARM + RISC-V**. Macs = experimentelle Blackbox (Apple geheim).

## 2. NEU — Dual-OS-Experiment auf den Produktionsmaschinen (Autor-Entscheidung 2026-06-15)

Die beiden großen x86-Produktionsmaschinen werden je in **ZWEI** OS-Konfigurationen vermessen:
- **Talos OS** (immutable, produktiv): Cache-/Prefetcher-Konfiguration nur **boot-statisch** (kein Laufzeit-MSR).
- **root-Ubuntu (bare-metal)**: **volle Laufzeit-Kontrolle** (Intel MSR 0x1A4 / AMD-Zen-Prefetcher-MSR `0xC001102x`,
  `cpupower`, `intel-cmt-cat` (RDT CAT/MBA), `perf`, `hwloc`).
- Sequentiell (je eine Maschine abstellen + umstellen, danach zurück auf Talos).

**Zweck:** (a) die volle Einstell-Bandbreite ausschöpfen UND (b) den **OS-induzierten Performance-/Konfig-
Unterschied selbst als Messdimension** ausweisen. → Macht das statisch-vs-Laufzeit-Spektrum (2.1.5) auf
**identischer Hardware** empirisch sichtbar. Gehört methodisch in **Kap. 6** (Versuchsplattformen).

## 3. Cache-/Config-Spektrum (AP-G2b, quellenbelegt)

1. Cache-Line fast überall **64 B fix**; **Apple M1 = 128 B** (L2/SLC, gemessen, Blackbox).
2. **Kein L3:** VisionFive 2 (RISC-V U74). L3 vorhanden: Odroid 6 MiB, Pi 5 2 MiB, Zen 5 asym. 96+32, Grace 114/Socket.
3. Cache-Line-**Größe** ist **nirgends** zur Laufzeit änderbar → **Compile-Zeit je Plattform**. Laufzeit-permutierbar
   sind die **Software-Knobs** (`prefetch_distance`/`batch_size`/`inline_threshold`/`pool_budget`) + HW-Prefetcher
   (nur wo OS+Rechte erlauben).
4. **Spektrum:** root-Linux/Intel-N = runtime-MSR · **Talos = boot-statisch** · ARM+RISC-V = fixed/read-only · macOS = none.

## 4. OS für volle HW-Kontrolle (AP-M1)

bare-metal **Linux mit root** ist nötig (Talos kann nicht, Windows zu jitter-behaftet + eingeschränkt, macOS gar nicht):
- **Intel:** `MSR 0x1A4` (`MSR_MISC_FEATURE_CONTROL`) Bits 0–3 = 4 HW-Prefetcher; via `msr-tools`.
- **AMD Zen:** Prefetcher-MSRs `0xC001102x` (+ `amd_hsmp`).
- **Darüber hinaus:** `cpupower` (Governor/Turbo→Jitter), `intel-cmt-cat` (RDT CAT/MBA — L3-Partitionierung, relevant
  für asym. V-Cache), `perf`, `hwloc`, BIOS (NPS/SNC/V-Cache-Modus).
- Cache-Line-**Größe** bleibt silizium-fix (auf keinem OS umschaltbar). Empfehlung: minimal, jitter-getunt
  (`isolcpus`/`nohz_full`/Performance-Governor/C-States aus auf Bench-Cores).

## 5. B+-Experiment-Baum — am Code verifiziert

`libs/cache_engine/builder/experiment_tree/experiment_tree.hpp` + `runtime_variable_loop.hpp`:
- `enum NodeKind{Static,Dynamic}` + `AxisLevel{…, bool is_static, …}` → jede Achse = Baum-Ebene, static **oder**
  dynamic, gleichrangig. `StaticAxisNode` (compile-time → Tier-Binary je Pfad) vs. `DynamicVariableNode`
  (`is_runtime_loop()=true`, virtuelle for-Schleife).
- `RuntimeVariableLoop` (KF-7): dyn. Dimensionen auf **EINER geladenen Binary** (kein Neu-Bau) via
  `ComdareResourceControlV1` (`thread_count`/`prefetch_distance`/`pool_budget_bytes`/`batch_size`/`inline_threshold_bytes`).
- Architektonische Laufzeit-Ausnahmen (`hw_prefetcher` via MSR 0x1A4) = SLURM/MSR-Launcher (Cluster-gated).
- ⇒ Experiment permutiert **statische Lebewesen-Binary × Laufzeit-Konfiguration**.

## 6. Provenienz / Governance

- **KEIN `Co-Authored-By: Claude`-Trailer** mehr in Thesis-Commits (Autor 2026-06-15; akademische Autorschaft).
- Nur **User-Ideen / zitierte Primärquellen** persistieren; eigene Vorschläge nur im Chat → Abnahme → dann Text.

## 7. Kapitel-1–3-Fortschritt

- Kap. 2-Gliederung freigegeben + als Skelett eingebaut (DE); EN folgt nachgelagert (Autor arbeitet nur DE).
- **2.1.1 + 2.1.2 ausformuliert** (DE): „feste Einheiten" korrigiert; Cache-Line-Größen/L3-Varianz maschinen-gegroundet.
- `literatur.bib` ergänzt: `frigo1999cache`, `hennessy2019architecture`, `intel_sdm`, `arm_arm`, `drepper2007memory`.
- Offene Beleg-Lücke (nur 11 bib-Einträge vs. ~54 genannte Paper) → AP-G4/S1 (Quelle: `forschungslandkarte/01_quellen_gesamtkatalog.md`).

## 8. Offene Punkte / nächste Schritte

1. **2.1.3–2.1.5 fertig ausformulieren** (TLB/dTLB · Write-Back/MESI · cache-aware/oblivious + Neuheit) + committen (ohne Trailer).
2. Kap. 6 Versuchsplattformen um Voll-Fleet + **Dual-OS-Experiment** erweitern (eigenes AP, #78).
3. Danach in Reihenfolge: **AP-G3 (Sektion 2.2)** als belegte Stichpunkte zur Abnahme.
