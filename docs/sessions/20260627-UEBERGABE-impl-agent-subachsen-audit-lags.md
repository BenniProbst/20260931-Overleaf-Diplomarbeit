# ÜBERGABE an Implementierungs-Agent (2026-06-27): Sub-Achsen-Audit — Code-Lags

> **Anlass:** Ein 22-Achsen-Audit (Code vs. Thesis `tab:axes-overview`) hat die Sub-Achsen-Spalte der
> Diplomarbeit auf den echten Code-Stand gebracht (DE+EN, ch3 + ch4). Die Thesis ist jetzt korrekt; die
> folgenden Punkte sind **Code-seitige Restdefekte** (Thesis = Soll, Code zieht nach). Vor jedem Edit
> Zeilen/Tags gegen den aktuellen Submodul-Stand re-greppen.

## Bestätigt korrekt (kein Handlungsbedarf)
- **T6 Allocator:** Code hat **AA1–AA7** (7 Sub-Achsen) + **25 Allokatoren** — Thesis war „6.1–6.5"/„A01–A23",
  jetzt auf AA1–AA7 / A01–A25 korrigiert. ch4 „sieben Sub-Familien" ist damit **bestätigt korrekt**.
- T4 (NT1–NT3), T7 (PF1–PF3), T8 (CC1–CC2), T15 (MG1–MG3), T16 (FT1–FT3), Build page\_type (PG1–PG3): Code = Thesis.

## Code-Lags (Code an festgezogene Thesis nachziehen)
1. **T0 `axis_03a_search_algo`:** Header-Kommentar sagt „Subaxis-Tags SA1–SA3", die Namespace-Definition führt aber
   **SA4 `direct_multibyte_access`** (implementiert via `Array65535SearchAlgo`). → Kommentar auf SA1–SA4 angleichen.
2. **T5 `axis_05_memory_layout`:** **HM4 `stride_pattern_tag`** ist definiert, aber von keinem Layout als `axis_tag`
   belegt (nur HM1–HM3 aktiv). → HM4 implementieren oder als „reserviert" markieren.
3. **T2 `axis_03m_mapping`:** Nur **MP1/MP2** implementiert; MP03 PermutationIndexed / MP04 HashedOffset sind nur
   Roadmap-Kommentare. → bei Bedarf implementieren (Thesis zeigt jetzt nur MP1–MP2).
4. **T14 `axis_io`:** **IO3 `write_durability_tag`** ist als Tag definiert, aber in keiner der 4 Strategien
   (InMemoryOnly/DirectIo/BufferedIo/MmapIo) als `axis_tag` integriert. → integrieren oder als reserviert führen.
5. **T13/T14 IO-ID-Kollision:** `axis_01_index_organization` nutzt im Code **ebenfalls** `io1_to_io3`
   (`..._subaxes_io1_to_io3.hpp`) — identisch zu `axis_io` (io\_dispatch). Beide Achsen tragen also dieselben
   Sub-Achsen-IDs IO1–IO3 mit unterschiedlicher Semantik. → **eine** Achse umbenennen (Vorschlag: index\_organization →
   `IX1–IX3` / storage\_order/index\_count/data\_embedding), damit die IDs eindeutig werden.
6. **Build hardware `axis_12_general_hardware`:** Code hat **HW1–HW4** (12.1–12.4); Thesis behauptete „12.1–12.5"
   (nicht existent) → Thesis auf HW1–HW4 korrigiert; nur HW1 (`cpu_family`) hat aktuell Wrapper, HW2–HW4 sind
   Klassifikations-Tags ohne eigene Wrapper. → bei Bedarf Wrapper ergänzen.

## Geerdete Sub-Achsen-Referenz (Code-Ist, für Tabellen/Tests)
T0 SA1–SA4 (17 Var) · T1 CT1–CT2 (3) · T2 MP1–MP2 (2) · T3 PC1–PC3 (3) · T4 NT1–NT3 (4) · T5 HM1–HM4 (5) ·
T6 AA1–AA7 (**25**) · T7 PF1–PF3 (4) · T8 CC1–CC2 (9) · T9 SR1–SR3 (4) · T10 TM1–TM3 (4) · T11 VH1–VH3 (5) ·
T12 IS1–IS3 (4) · T13 IO1–IO3 (4) · T14 IO1–IO3 (4; IO3 def./nicht integr.) · T15 MG1–MG3 (4) · T16 FT1–FT3 (4) ·
T17 QS1–QS6 (15) · T18 FS1–FS4 (5) · Build PG1–PG3 (6) · Build SIMD SE1–SE3 (8) · Build HW1–HW4 (3).
