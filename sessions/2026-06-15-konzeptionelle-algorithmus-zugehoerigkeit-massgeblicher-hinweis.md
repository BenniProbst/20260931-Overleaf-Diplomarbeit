# Maßgeblicher Hinweis: Konzeptionelle Zugehörigkeit von Algorithmen im COMDARE-System

> **Status:** ARBEITSMATERIAL / maßgebliche Referenz — **nicht** Teil des kompilierten
> Haupttextes. Zweck: damit Formulierungen im Manuskript, die einen Algorithmus „einordnen"
> (Gattung, Typ, Achse, Baseline), später konsistent und korrekt optimiert werden können.
>
> **Anlass:** Session 2026-06-15 (Hash-Einordnung als Baseline). Beim Aufnehmen der
> Hash-Tabelle stellte sich die Grundsatzfrage, *wo* ein Algorithmus konzeptionell hingehört.
> Dieses Dokument hält die geklärte, code-verifizierte Antwort fest.
>
> **Autoritative Quellen (bei Widerspruch in dieser Reihenfolge):**
> `Code/external/comdare-cache-engine/docs/architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md`
> (§1–§3, AUTORITATIV) · `docs/architektur/14_achsen_komposition_organ_metapher.md` (§25–§32) ·
> Code `libs/cache_engine/anatomy/anatomy_base.hpp` (Enums) +
> `builder/experiment_tree/genus_binding_traits.hpp` (Achsen-Sätze). Alle Aussagen unten sind
> gegen diese gegengeprüft (Stand 2026-06-15).

---

## §1 Das 3-Ebenen-Modell (die einzige gültige Hierarchie)

Algorithmen werden in **drei strikt getrennten Ebenen** eingeordnet. Diese Trennung ist die
Grundlage jeder korrekten Formulierung — sie zu vermischen ist der häufigste Fehler.

| Ebene | Begriff | Was es ist | Code-Anker |
|---|---|---|---|
| **1** | **GATTUNG** | das **Außen-Interface** = **Prüf-Dock**: was die Außenwelt sieht und wie gemessen wird | `enum AnatomyGattung` |
| **2** | **TIER-UNTERKLASSE** | der **feste Achsen-Satz** unter dem Interface (= ABI-Identität, feste Slot-Zahl) | `enum AnatomyGenus` (historischer Name; meint die Tier-Unterklasse) |
| **3** | **ACHSE = Organ** | eine permutierbare **Teilentscheidung** des Algorithmus; **keine Achse ist optional** | `axis_*` Topics |

**Wichtige Invarianten:**
- Eine **nicht zutreffende Achse wird nie weggelassen**, sondern mit einem konkreten
  **Durchreich-Algorithmus** belegt (`None` / `NoBuffer` / `NoFlush` / `NonePrefetch` …). Jedes
  Tier-Binary treibt *alle* Achsen seiner Tier-Unterklasse uniform.
- Ein **konkreter Algorithmus** (ART, HOT, eine Hash-Map, PRT-ART …) ist **ein Punkt im
  kartesischen Produkt** der Achsen seiner Tier-Unterklasse = **ein „Tier"** (Permutations-
  Konfiguration). Ein Algorithmus ist also **weder eine Gattung noch eine Achse**.

---

## §2 Die 3 Gattungen, 5 Tier-Unterklassen und ihre Achsen-Sätze

**3 GATTUNGEN** (Außen-Interface): **SearchAlgorithm · Container · Graph**.
**5 TIER-UNTERKLASSEN** (fester Achsen-Satz):

| Tier-Unterklasse | Gattung | Achsen | charakteristische Achsen / Besonderheit |
|---|---|---|---|
| **SearchAlgorithm** | SearchAlgorithm | **19** | 17 Such-Achsen + queuing_q1 + queuing_q2; K→V; **einzige voll gebaut (BR-1..4)** |
| **Set** | Container | **15** | wie SearchAlgorithm, aber **kein mapping/value_handle** (K = V) |
| **Sequence** | Container | **11** | V-indexed; + `growth_policy`; **kein** search_algo/traversal/node_type/filter |
| **Adapter** | Container | **13** | meiste Achsen delegiert; + `inner_container`; **keine** „ordering"-Achse |
| **View** | Container | **7** | non-owning; + extent/layout/accessor-policy |

> `gattung_of()`: **SearchAlgorithm → eigene Gattung**; **Set/Sequence/Adapter/View → alle unter
> Container**. SearchAlgorithm ist damit *zugleich* eine Gattung **und** eine Tier-Unterklasse
> (eine Gattung mit genau einer Tier-Unterklasse).

**Warum die Achsen-Sätze nicht mischbar sind:** Permutiert (rekombiniert) wird **nur innerhalb
derselben Tier-Unterklasse** (gleicher fester Achsen-Satz). Ein Cross-Genus-Join
(`mp_product` über zwei verschiedene Achsen-Sätze) ist **type-system-mathematisch unmöglich**
(Doku 14 §32). Jede Tier-Unterklasse hat **eigene Anatomie, Composition, Observer und
PermutationEngine** (5 Stück). Einzelne Achsen-*Namen* überlappen (z.B. `allocator`, `isa`
kommen mehrfach vor) — der **Satz als Ganzes** ist der unteilbare Identitätsträger.

---

## §3 Einordnungs-Entscheidung: „Wo gehört dieser Algorithmus hin?"

Drei Fragen, in dieser Reihenfolge:

1. **Welches Außen-Interface bedient er?** → bestimmt die **Gattung**.
   - K→V-Lookup-Interface (`std::map`-artig) → **SearchAlgorithm**.
   - Container-Interface (Mengen/Sequenzen/Adapter/Views) → **Container**.
   - Knoten-/Kanten-Interface (Graphen, FFT, Crypto) → **Graph** bzw. „Virus" (ohne Anatomie,
     nicht permutierbar; `IVirusExecutionEngine`).
2. **Welche Container-Form?** (nur falls Container) → bestimmt die **Tier-Unterklasse**:
   K-only → Set; V-indexiert → Sequence; delegierend → Adapter; non-owning → View.
3. **Wie sind seine Achsen belegt?** → bestimmt den **konkreten Punkt** (das „Tier") im
   Permutationsraum der gewählten Tier-Unterklasse.

---

## §4 Die Schlüssel-Unterscheidung (für Formulierungen entscheidend)

> **Gleiche Gattung, anderer *Typ*** ⇔ **gleicher Achsen-Satz, anderes (erlaubtes) *Subset*.**
> **Andere Gattung** ⇔ **grundlegend anderer Basis-Achsen-Satz** — also Achsen, die für die
> Typen der ersten Gattung schlicht *keinen Sinn* ergäben.

Konkret:
- Bleibt das **Außen-Interface gleich** und werden **dieselben Achsen** verwendet (nur ein
  Teil davon als Durchreich-`None`), dann ist es **derselbe Gattungs-/Tier-Unterklassen-Ort**,
  nur ein anderer **Typ** (anderer Punkt im Permutationsraum). → sprachlich: „ein anderer Typ
  *innerhalb derselben Gattung*", „mit eingeschränktem/limitiertem Achsen-Profil".
- Bräuchte der Algorithmus **Achsen, die kein anderer Typ der Gattung je nutzen würde**, dann
  unterscheidet sich der **Basis-Achsen-Satz deutlich** → eigene **Gattung/Tier-Unterklasse**.
  → sprachlich: „eine eigene Gattung mit anderem Basis-Achsen-Satz".

Das **konzeptionelle Profil** (z.B. „assoziative K→V-Suche") kann dabei *dasselbe* bleiben,
obwohl die strukturelle Umsetzung verschieden ist — entscheidend für die Einordnung ist der
**Achsen-Satz**, nicht das Profil.

---

## §5 Lehrbeispiel: die Hash-Tabelle (`flat_hash_map` / SwissTable)

**Frage:** Ist eine Hash-Map ein Baum? Braucht sie eine eigene Gattung?
**Antwort (code-verifiziert):**
- Sie ist **kein Baum**, aber **ein Suchalgorithmus** (gleiches K→V-`std::map`-Interface) →
  **SearchAlgorithm-Gattung**.
- Sie ist **keine eigene Gattung**: im Code als `search_algo`-Achsen-Ausprägung umgesetzt
  (`HashSearchAlgo`, registriert **S14**, seziert in `HashBucketPoolStore` +
  `HashProbeTraversalOrgan`).
- **Limitiertes Achsen-Subset:** `path_compression = None`, `mapping = Direct`, `filter = None`,
  `node_type` flach (statt Node4/16/48/256), `supports_range_scan = false`. **Geteilt** bleiben
  `allocator`, `prefetch`, `concurrency`, `memory_layout`, **`isa`** (gerade die
  SwissTable-SIMD-Gruppen-Suche!), `telemetry`.
- **Hash-MAP** (K→V) = SearchAlgorithm; **Hash-SET** (K-only) wäre dagegen **Set-Tier-Unterklasse**
  (Container-Gattung).

**Warum *keine* eigene Gattung:** Eine eigene Gattung müsste Achsen tragen, die für ART, HOT,
B⁺ usw. sinnlos wären — das ist hier nicht der Fall (Hash nutzt eine Teilmenge derselben 19
Achsen). Sie als Gattung zu erheben wäre derselbe **Kategorienfehler** wie früher bei
„queuing" (eine Achse, die fälschlich zur Gattung erhoben wurde) — vom User aufgedeckt und
verworfen.

---

## §6 Universelle Baum-Anatomie — Reichweite

Die „universelle Baum-Anatomie" (selbst eine sortierte K-V-Liste = ein Blatt eines Baumes mit
Pointer-Werten auf Daten-Blätter; Baum = Leinwand für die Achsen) gilt **nur für die
SearchAlgorithm-Gattung** — und auch dort als *Leinwand*, nicht als Zwang: **nicht-baumartige
Typen** (Hash) fügen sich über das **Achsen-Subset** ein (baum-spezifische Achsen als
Durchreich-`None`). Set/Sequence/Adapter/View haben je **eigene** Anatomien. Formulierungen,
die „universell über *alle* Suchalgorithmen" sagen, meinen die SearchAlgorithm-Gattung, nicht
alle drei Gattungen.

---

## §7 Tier-Metapher (Verwendungsregel)

Säugetier = SearchAlgorithm · Vogel = Set · Reptil = Sequence · Wirbelloses = Adapter ·
Pflanze = View. „Viren" (Graph/FFT/Crypto) stehen außerhalb der Anatomie. **Regel:** die
Tier-Metapher (Tier, Organ, Lebewesen, genetisches Experiment) gehört **nur in Kommentare und
in die Lösungs-Kapitel (Kap. 4)** — **nie** in Code-Identifier (dort technische Namen wie
`SearchAlgorithmAbiAdapter`) und **nie** in die Aufgabenstellung (linearer Aufbau: Lösung wird
dort nicht vorweggenommen).

---

## §8 Häufige Kategorienfehler (zu vermeiden)

1. **„5 Gattungen"** — falsch. Korrekt: **3 Gattungen + 5 Tier-Unterklassen**. (Alte
   Doku/Memory trug „5 Gattungen"; 2026-06-14 korrigiert.)
2. **Eine Achse zur Gattung erheben** — z.B. „queuing-Gattung" oder „Hash-Gattung". Beides
   falsch: queuing ist eine Achse, Hash ein Typ innerhalb SearchAlgorithm.
3. **Achse vs. Algorithmus verwechseln** — eine Achse ist ein *Organ* (Teilentscheidung); ein
   Algorithmus ist die *Permutation aller* Achsen. Ein ganzes „Tier" gehört nie in eine Achse.
4. **Achsen-Sätze mischen** — Cross-Genus-Permutation ist type-unmöglich; nie so formulieren,
   als ließe sich z.B. eine Set-Achse mit einer Sequence-Achse kreuzen.

---

## §9 Wo die Zugehörigkeit im Manuskript steht (Formulierungs-Landkarte)

| Stelle | Aussage |
|---|---|
| **Kap. 2 §2.2** „Klassen von Suchstrukturen" | vergleichsbasiert / digital / Hashing / räumlich; Scope = baumartige (vergleichs+digital); Hashing als Vergleichsgröße |
| **Kap. 4 §4.1** Achsen-Framework | universelle Baum-Anatomie + Tier/Organ-Metapher; **nicht-baumartige Typen via Achsen-Subset; andere Gattung = anderer Basis-Achsen-Satz** |
| **Kap. 4 §4.5** Bausteine-Achsen | die 19 SearchAlgorithm-Achsen + ~57 Sub-Achsen; `IsComposition` erzwingt 19 Organe |
| **Kap. 3** SOTA | Hash-Baseline als nicht-baumartige Gegenprobe (limitiertes Achsen-Subset, gleiche Gattung) |
| **Kap. 6 §6.6** Fairness | fehlende Fähigkeiten = N/A (Beispiel: Hash-Bereichs-Scan) |
| **Aufgabenstellung** | bewusst **ohne** Gattungs-/Achsen-Vokabular (linear); Hash nur als Baseline-Gegenprobe genannt |

---

## §10 Formulierungs-Richtlinien (für die spätere Optimierung)

- **Gattung** nur für die 3 Außen-Interfaces verwenden; **Tier-Unterklasse** für den festen
  Achsen-Satz; **Achse/Organ** für die Teilentscheidung; **Typ / Punkt im Permutationsraum /
  „Tier"** für den konkreten Algorithmus.
- Einen Algorithmus, der dasselbe Interface über ein Achsen-Subset realisiert, als **„Typ
  innerhalb der Gattung X mit limitiertem Achsen-Profil"** beschreiben — **nicht** als „andere
  Gattung".
- „Andere Gattung" nur, wenn sich der **Basis-Achsen-Satz grundlegend unterscheidet** (Achsen,
  die für die übrigen Typen sinnlos wären).
- Niemals „5 Gattungen"; immer „3 Gattungen / 5 Tier-Unterklassen", wo die Hierarchie genannt
  wird (im Manuskript wird die Gattungs-Hierarchie aktuell *nicht* explizit benannt — falls
  später nötig, korrekt einführen).
- Aufgabenstellung bleibt **frei von Achsen-/Gattungs-Begriffen** (Lösung nicht vorwegnehmen);
  konzeptionelle Einordnung erst ab Kap. 4.

---

## §11 Offener Vorbehalt (Mess-Ebene, nicht Architektur)

Architektonisch ist die Hash-Sezierung sauber (Organe + Concept + Komposition,
äquivalenz-belegt gegen `std::map`). **Aber:** im finalen ABI-Mess-Pfad treibt der
`search_organ_`-Monolith die Such-Zähler noch nicht uniform durch alle Organe (Doc 34 §9,
Befund 2 / Q2-Schritt-4, E-Welle-A2 OFFEN). Das betrifft die **Mess-Echtheit** der späteren
Belege, **nicht** die hier festgehaltene **konzeptionelle Zugehörigkeit**.
