# Quell-Hinweise: Taxonomie & Evolution von Suchstrukturen

> **Status:** ARBEITSMATERIAL — **nicht** Teil des kompilierten Haupttextes.
> Dieses Dokument sammelt **zu untersuchende Quell-Hinweise** zur Einordnung von
> Suchalgorithmen (Grundkategorien/„Gattungen") und zur Evolution baumbasierter
> Strukturen. Es entstand aus (a) einem unwissenschaftlichen KI-Hinweis (Google,
> **ohne Quellenangaben** — daher nur Ausgangspunkt, **kein** zitierfähiger Beleg)
> und (b) eigener Web-Recherche (Juni 2026).
>
> **Regel:** Bevor eine dieser Angaben (Jahr/Erfinder/Originalpaper) im Haupttext
> zitiert wird, ist sie gegen die **Primärquelle** zu verifizieren. Markierungen:
> `[VERIFIZIERT]` = durch eine seriöse Quelle in dieser Recherche bestätigt;
> `[STD]` = Standard-Lehrbuchzuschreibung (sehr wahrscheinlich korrekt), Primärquelle
> zur Zitierung noch zu beschaffen; `[GOOGLE]` = nur KI-Hinweis, unbelegt.
>
> **Quellen-Politik (User 2026-06-14):** Wikipedia ist **keine** zitierfähige Quelle —
> bestenfalls zählen die auf einer Wikipedia-Seite verlinkten **wissenschaftlichen
> Direktquellen**. Seriös sind ACM-/IEEE-/Springer-DOIs und universitäre Repositorien
> (z. B. uni-saarland). Paywall-Artikel über den **SLUB-/TU-Dresden-Zugang** (manuell
> durch den Autor) oder über frei zugängliche Zweitveröffentlichungen beschaffen
> (arXiv, Autoren-Homepage, ResearchGate, institutionelle Repositorien) — bei einer
> Paywall lohnt fast immer die Suche nach einer freien Fassung.

---

## §1 Grundkategorien („Gattungen") von Suchalgorithmen

Suchen (und die sie tragenden Datenstrukturen) gliedern sich klassisch nach dem
**Mechanismus**, mit dem der Schlüssel auf einen Datensatz abgebildet wird. Diese
Einordnung ist Lehrbuch-Standard und in Knuths *TAOCP* Bd. 3 *Sorting and Searching*
(Kap. 6) als zitierfähige Primärquelle belegt:

1. **Vergleichsbasiert / ordnungsbasiert** (*comparison-based*) — der Schlüssel wird
   durch `<,>,=`-Vergleiche lokalisiert; setzt eine totale Ordnung voraus.
   - Linear-/Binärsuche; **balancierte Suchbäume** (BST, AVL, Rot-Schwarz, B/B⁺).
   - **Dies ist die Gattung, auf die sich die Arbeit konzentriert.**
2. **Digital / ziffern- bzw. zeichenbasiert** (*digital/radix*) — verzweigt nach
   den **Ziffern/Bytes** des Schlüssels, nicht nach Vergleich.
   - **Tries**, Radix-/PATRICIA-Bäume, ART. (Strenggenommen ebenfalls *baumartig*
     → liegt im Scope der Arbeit.)
3. **Hashing** — direkte Abbildung Schlüssel→Datensatz über eine Hashfunktion;
   keine inhärente Ordnung (Bereichsabfragen teuer).
   - Hashtabellen (offen/verkettet), Cuckoo-Hashing, perfekte Hashes.
   - **Außerhalb des Baum-Scopes**; relevante Vergleichsgröße (ART vs. Hashtabelle).
4. **Räumlich / mehrdimensional** (*spatial/multidimensional*) — partitioniert einen
   $k$-dimensionalen Raum; für Geo-/Kollisions-/Nachbarschaftssuche.
   - Baumbasiert: k-d-Baum, Quadtree/Octree, R-Baum, Ball-Tree.
   - Hash-basiert: *spatial hashing*.
   - **Außerhalb des Scopes** (eindim. Schlüssel), aber als „weitere Gattung" für
     künftige Erweiterung relevant.

> **Bezug zur Metapher (Lösung, Kap. 4):** Diese Kategorien entsprechen den
> „Gattungen/Lebewesen-Unterklassen" des Frameworks (im Code: SearchAlgorithm, Set,
> Sequence, View, Adapter). Die Arbeit baut die **SearchAlgorithm**-Gattung
> (vergleichs- + digital-basierte **Bäume**) voll aus; die übrigen Gattungen sind
> über dieselbe höherwertige Abstraktion erweiterbar (→ Ausblick).

**Quellen (zu prüfen/zitieren):**
- D. E. Knuth, *The Art of Computer Programming, Vol. 3: Sorting and Searching*,
  2. Aufl., Addison-Wesley 1998 (Kap. 6.2 vergleichsbasiert, 6.3 digital, 6.4 Hashing). `[STD]`
- *(Wikipedia „Search algorithm" als Quelle **verworfen** — keine zitierfähige Sekundärquelle. Die Mechanismus-Klassifikation linear/binär/digital/Hashing ist über Knuth Kap. 6 primär belegt; Wikipedia diente nur als Einstieg in die Recherche.)*
- S. Idreos et al., *The Periodic Table of Data Structures* (Data Eng. Bull. 2018) +
  *The Data Calculator* (SIGMOD 2018) — bereits in `literatur.bib` (design-space-Taxonomie). `[VERIFIZIERT]`

---

## §2 Evolution baumbasierter Suchstrukturen (vier Zweige)

Gerüst aus dem `[GOOGLE]`-Hinweis, mit Verifikationsstand und Original-Paper-Hinweisen.
Treibende Motive: Worst-Case $O(n)$ → $O(\log n)$ (Balancierung) und Überwindung
technischer Grenzen (Externspeicher-I/O, Zeichenketten, Raumdaten).

### Zweig A — Balancierung im Hauptspeicher (vergleichsbasiert)
| Struktur | Zuschreibung | Status | Original-Paper (zu beschaffen) |
|---|---|---|---|
| Binary Search Tree (BST) | ~1960, Mehrfach-Erfindung | `[GOOGLE]` | (Lehrbuch; Knuth 6.2.2) |
| AVL-Baum | Adelson-Velsky & Landis, **1962** | `[VERIFIZIERT]` | „An algorithm for the organization of information", *Doklady Akad. Nauk SSSR* |
| Rot-Schwarz-Baum | Bayer **1972** („symmetric binary B-tree"); Name „red-black" Guibas & **Sedgewick 1978** | `[VERIFIZIERT]` | Bayer 1972 *Acta Inf.*; Guibas/Sedgewick 1978 *FOCS* — **Korrektur zu Google** (nicht „Sedgewick allein 1978") |

### Zweig B — Externspeicher / hoher Fanout (vergleichsbasiert, blockorientiert)
| Struktur | Zuschreibung | Status | Original-Paper |
|---|---|---|---|
| B-Baum | Bayer & McCreight, **1970/1972** | `[VERIFIZIERT]` | „Organization and maintenance of large ordered indexes", *Acta Informatica* 1972 (Bericht 1970) |
| B⁺-Baum | Weiterentwicklung (Daten nur in verketteten Blättern → Range-Scans) | `[STD]` | (Comer, „The Ubiquitous B-Tree", *ACM Comp. Surv.* 1979 als Übersicht) |
| T-Baum | Lehman & Carey, **1986** (für **In-Memory**-DBs — direkt einschlägig!) | `[STD]` | „A Study of Index Structures for Main Memory DBMS", *VLDB* 1986 |

### Zweig C — Zeichenketten / Präfixe (digital/radix)
| Struktur | Zuschreibung | Status | Original-Paper |
|---|---|---|---|
| Trie (Konzept) | de la Briandais, **1959** | `[STD]` | „File searching using variable length keys", *Western Joint Comp. Conf.* |
| Trie (Begriff) | Fredkin, **1960** | `[STD]` | „Trie memory", *CACM* 3(9) |
| Radix-/PATRICIA-Baum | Morrison, **1968** | `[VERIFIZIERT]` (Jahr) | „PATRICIA — Practical Algorithm To Retrieve Information Coded in Alphanumeric", *JACM* |
| ART (Adaptive Radix Tree) | Leis, Kemper & Neumann, **2013** | `[VERIFIZIERT]` | bereits in `literatur.bib` (`leis2013art`) |

### Zweig D — Mehrdimensional / räumlich (außerhalb des Scopes)
| Struktur | Zuschreibung | Status | Original-Paper |
|---|---|---|---|
| k-d-Baum | Bentley, **1975** | `[STD]` | „Multidimensional binary search trees used for associative searching", *CACM* |
| Quadtree | Finkel & Bentley, **1974** | `[STD]` | „Quad trees: A data structure for retrieval on composite keys", *Acta Informatica* |
| Octree (3D) | Meagher, ~**1980** | `[GOOGLE]` | (zu beschaffen) |
| R-Baum | Guttman, **1984** | `[STD]` | „R-trees: A dynamic index structure for spatial searching", *SIGMOD* |

---

## §3 Einordnung für die Arbeit

- **Scope:** Aus Umfangsgründen beschränkt sich die Arbeit auf **baumartige
  Suchstrukturen** der vergleichs- und digital-basierten Gattungen (Zweige A–C).
  ART/Tries sind die durchgehende Referenz; B/B⁺-Bäume und eigenentwickelte
  Konstrukte gehören ebenfalls dazu.
- **Universelle Erweiterbarkeit (zentraler Punkt):** Die universelle Baum-Anatomie
  (Kap. 4) und die Gattungs-Abstraktion machen das Mess-Prinzip **über Bäume hinaus
  erweiterbar** — weitere Gattungen (Hashing, räumliche Strukturen, mengen-/
  sequenzorientierte Container) lassen sich über dieselbe höherwertige Abstraktion
  einbinden, ohne das Framework neu zu bauen. Das ist der Hebel für künftigen
  **experimentellen Fortschritt** (→ Ausblick, Kap. 8).
- **Sinnvolle Vergleichsachse:** Algorithmen aus **verschiedenen Zweigen**
  gegeneinander messen (z. B. ART vs. Hashtabelle; B⁺-Baum-Range-Scan vs. Trie) ist
  wissenschaftlich aussagekräftig für das In-Memory-Cache-Verhalten.

---

## §4 Offene Beschaffungs-TODOs (vor Zitierung im Haupttext)
1. Primärquellen der `[STD]`-Einträge beschaffen (de la Briandais 1959, Fredkin 1960,
   Bentley 1975, Finkel/Bentley 1974, Guttman 1984, Lehman/Carey 1986, Comer 1979).
2. Octree-Zuschreibung (Meagher) verifizieren — derzeit nur `[GOOGLE]`.
3. Entscheiden, welche dieser Strukturen als **SOTA-Vergleichsprofile** in die
   Messung aufgenommen werden (vgl. SOTA-Liste Kap. 3) und welche nur als
   Hintergrund-Einordnung im Grundlagenkapitel dienen.
4. ~~Knuth *TAOCP* Bd. 3 als Klassifikations-Beleg in `literatur.bib` aufnehmen~~ —
   **erledigt** (`knuth1998taocp3`, im Grundlagen-§2.2 „Klassen von Suchstrukturen" zitiert).

---

## §5 Seriöse Sekundärquellen (Web-Recherche Juni 2026)

Nur wissenschaftliche/universitäre Quellen; Wikipedia ausgeschlossen. Paywalls mit
freier Zweitfassung vermerkt.

- **Tree Data Structures and Efficient Indexing Techniques for Big Data Management:
  A Comprehensive Study** — 26th Pan-Hellenic Conference on Informatics (PCI) 2022,
  DOI `10.1145/3575879.3575977` (ACM, **Paywall** → via SLUB/TU-Dresden beziehbar).
  **Freie Fassung:** ResearchGate, Publication `369621229`. Survey-Überblick über
  B⁺-Baum, k-d-Baum, Quadtree, R-Baum (Belegkandidat für §2 Zweige B/D).
- **A Comparison of Adaptive Radix Trees and Hash Tables** (V. Álvarez, S. Richter,
  X. Chen, J. Dittrich) — ICDE 2015, Universität des Saarlandes (seriös, frei):
  `https://bigdata.uni-saarland.de/publications/ARCD15.pdf`. Beleg für die
  Vergleichsachse „ART vs. Hashtabelle" (§1 Hashing, §3).
- Die Original-Paper der einzelnen Baum-Strukturen (§2-Tabellen) tragen jeweils
  Venue/DOI im Titel; Volltexte über SLUB/TU-Dresden oder freie Zweitfassungen.
