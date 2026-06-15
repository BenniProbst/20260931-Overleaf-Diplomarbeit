# Aufgabenbeschreibung: Verbesserungs-Kommentare Kapitel 1–3 (Einleitung, Grundlagen, Stand der Technik)

**Datum:** 2026-06-15
**Scope:** `thesis/diplomarbeit/` (Overleaf-Repo, NUR der Thesis-Teil)
**Fokus:** Kapitel 1 (Einleitung), 2 (Grundlagen), 3 (Stand der Technik)
**Provenienz:** Alle Kernideen stammen vom Autor und liegen als `%`-Kommentare im Quelltext
sowie in den Coding-Docs der Diplomarbeit. Claude setzt diese Anfragen *referenziert* um —
die Ideen werden nicht generiert, sondern aus den Kommentaren + Doku zusammengeführt.

---

## 0. Auftrag (wörtlich)

> Neues Thema: Bitte pulle nur den thesis Teil der Diplomarbeit von remote und erstelle eine
> elaborate Aufgabenbeschreibung aus den dutzenden Verbesserungs-Kommentaren meinerseits, die
> du bitte abarbeitest. Die Kerninformationen sind ja meine Idee und dokumentiert und wir
> übernehmen diese wohl referenziert aus den docs der Diplomarbeit vom coding. Bitte recherchiere
> zuerst die guidelines zu Masterarbeiten und KI-Nutzung, damit wir möglichst kleinschrittig
> arbeiten und nicht gegen unsichtbare Nutzungsbeschränkungen der TU Dresden verstoßen und ich
> nachher trotz toller Arbeit durchfalle, wir haben viel zusammen programmiert, der Code muss
> wohl auch gegengeprüft werden. Bezüglich der Diplomarbeit liegt der Fokus gerade auf den
> ersten 3 Kapiteln der Einleitung, Grundlagen und Stand der Technik. Alle Anweisungen zu
> Recherchen und benötigten Informationen sind absichtlich in den Kommentaren, um zu belegen,
> dass ich dir nur Anfragen schicke, die du übernimmst, aber die Kernideen immer von mir kommen,
> du also meine Anfrage nur nach meinen Wünschen zusammenpuzzlest.

**Präzisierung (Autor, 2026-06-15):**

> Der Stand der Technik ist zwar korrekt aber noch so chaotisch, dass ich mich erstmal nur mit
> den Kommentaren bis Kapitel 2 getraut habe, weil aus Kapitel 2 automatisch Instanzen in
> Kapitel 3 folgen müssen, sobald du alle Kommentare und den Kontext vollständig verstehst.

---

## 1. Governance: TU-Dresden-Compliance (KI-Nutzung + gute wiss. Praxis)

Recherche-Stand 2026-06-15 (offizielle TU-Dresden-Quellen, keine Wikipedia). Diese Regeln sind
für die gesamte Bearbeitung **bindend**, damit „trotz toller Arbeit" kein Durchfallen droht.

| Regel | Pflicht | Konsequenz für unsere Arbeitsweise |
|---|---|---|
| **Zulässigkeitsentscheid** | Prüfer:in (Habich) entscheidet, ob/inwieweit KI-Werkzeuge erlaubt sind. | **Vor großen Edits** Umfang der KI-Nutzung mit Betreuer abklären/dokumentieren. |
| **Kennzeichnungspflicht** | „Direkt und indirekt verwendete Quellen sind (auch bei der Nutzung von KI-generierten Texten) nachzuweisen." | KI-Nutzung in Anhang + Eigenständigkeitserklärung offenlegen; KI als Quelle zitieren (System, Datum, Prompt). |
| **Täuschungsverbot** | Ungekennzeichnete/unerlaubte KI-Nutzung = prüfungsrechtliche **Täuschung**. | Lückenlose Provenienz: Kernideen = Autor (Kommentare); Claude = Umsetzung. Genau das belegt die Kommentar-Methodik. |
| **Eigenleistung/Originalität** | Keine direkte Übernahme KI-generierten Textes; intellektuelle Eigenleistung bleibt zentral. | Claude liefert Struktur, Recherche-Synthese, Formulierungs-Vorschläge; inhaltliche Substanz + Entscheidungen bleiben beim Autor. |
| **Dokumentationspflicht** | KI-Ergebnisse sind nicht reproduzierbar → nachträgliche Einordnung geboten; ggf. zwei Fassungen (mit/ohne KI) + Screenshots (Prompt/Datum/Hilfsmittel). | Git-Historie + diese Session-Docs = natürlicher Zwei-Fassungen-Nachweis; Prompts/Anweisungen liegen als Kommentare bei. |
| **Datenschutz** | Keine personenbezogenen Daten in externe KI; bevorzugt TU-„Chat AI" (Academic Cloud). | Keine personenbezogenen Daten in Prompts. |
| **Gute wiss. Praxis** | DFG-Leitlinien für generative Modelle; jede Definition wissenschaftlich belegt. | Jede sachliche Aussage in Kap. 1–3 mit Primärquelle (ACM/IEEE/Uni/Hersteller) belegen — **keine Wikipedia**. |

**Informatik-Formalia (Fakultät Informatik, Diplom):** Großer Beleg/Diplomarbeit werden gedruckt
+ gestempelt beim Prüfungsamt abgegeben (2 Hardcover + PDF oder nur PDF seit 2020); Großer Beleg
= 200 h, max. 6 Monate, kann inhaltliche Grundlage der Diplomarbeit sein.

**Offene Compliance-Punkte (vor Endabgabe):** (a) KI-Nutzungsumfang mit Habich abstimmen;
(b) Wortlaut der Eigenständigkeitserklärung inkl. KI-Passus + `\declarationlang` final setzen
(rechtsverbindlich ggf. deutsch); (c) KI-Werkzeug als Quelle im Literaturverzeichnis ergänzen;
(d) Entscheidung „zwei Fassungen + Screenshots im Anhang" ja/nein.

---

## 2. Arbeitsweise (kleinschrittig)

1. **Ein Arbeitspaket (AP) pro Schritt**, je mit eigener Recherche → Edit → Commit/Push (kein
   Rebase, fetch+merge), damit jeder Schritt einzeln prüf- und rückrollbar ist.
2. **Provenienz zuerst:** Jedes AP zitiert den auslösenden Autor-Kommentar wörtlich; der
   Kommentar bleibt im Quelltext erhalten, bis das AP vollständig umgesetzt + abgenommen ist.
3. **Referenziert, nicht erfunden:** Inhalte stammen aus den Coding-Docs (`Code/external/
   comdare-cache-engine/docs/`, `docs/` im Superprojekt) + belegter Web-Recherche. Pro Aussage
   eine zitierfähige Primärquelle.
4. **EN ≡ DE:** Jede DE-Änderung erhält die englische Entsprechung (`kapitel/en/`); Build via
   `build.ps1 -Lang de|en`.
5. **Keine editierenden Agenten** (Autor-Veto); nur-lesende Recherche/Audit-Agenten erlaubt.

---

## 3. Leitprinzip: Grundlagen = Definitions-Klassen, Stand der Technik = Instanzen

Aus Kommentar `02_fundamentals.tex` Z89 + Präzisierung 2026-06-15:

- **Kapitel 2 (Grundlagen)** beschreibt, was **konzeptionell** existiert — die „Bibliothek" an
  Definitions-Klassen (Cache-Konzepte, Suchstruktur-Klassen, Achsen/Organe, Interfaces,
  Workloads, Design-Pattern, wissenschaftliches Messen).
- **Kapitel 3 (Stand der Technik)** liefert die **wissenschaftlich nachweisbaren Instanzen**
  dieser Definitions-Klassen (konkrete Paper/Algorithmen/Allokatoren/Mess-Technologien).
- **Konsequenz:** Beide Kapitel müssen *strukturell ineinandergreifen* — zu jeder
  Grundlagen-Definitionsklasse gehört mindestens eine SOTA-Instanz. Deshalb stoppen die
  Autor-Kommentare bei Kapitel 2: **Kapitel 3 wird aus der finalen Kapitel-2-Struktur abgeleitet**
  (jede neue/geschärfte Grundlagen-Sektion erzeugt die spiegelnde SOTA-Sektion).

Daraus folgt die Bearbeitungsreihenfolge: **erst Kap. 2 schärfen/gliedern → dann Kap. 3 als
Instanz-Spiegel reorganisieren → Kap. 1 (Einleitung) zuletzt feinschleifen**, da die Einleitung
die endgültige Struktur referenziert.

---

## 4. Eingangsquellen (referenziert)

| Thema | Coding-Doc / Quelle |
|---|---|
| Lebewesen/Organ-Metapher, Achsen-Sezierung | `Code/external/comdare-cache-engine/docs/architektur/14_achsen_komposition_organ_metapher.md` |
| Schichtenmodell (CacheEngine→ExecutionEngine→SearchEngine), ABI, Prüfdock | `.../architektur/10_schichten_modell_M.md`, `.../architecture/abhaengigkeitskette_lebewesen_pruefdock_abi_konvergenz.md`, `.../architecture/34_KONSOLIDIERTER_MASTER_IST_STAND.md` |
| Achsen-/Bausteine-Matrix + Sub-Achsen | `docs/bausteine/07_bausteine_matrix_N_erweitert.md` |
| Suchstruktur-Taxonomien | `.../architektur/09_taxonomien.md` |
| Achsen vs. Strategien, Extension/Visitor-Pattern | `.../architektur/11_axes_vs_strategies_disambiguation.md`, `.../architektur/11_konzept_achsen_extension_visitor_pattern.md` |
| Meta-Programmier-Pattern (Concept-Hardening) | Memory `reference_meta_driven_concept_hardening_pattern` |
| Paper→Code-Map (110 Algos, web-verifiziert) | `.../architecture/18_achsen_algorithmus_paper_code_map.md` |
| ISA-Schichten/AVX-512-Sub-Flags, IMC-Runtime-Heuristik | `.../architecture/15_isa_layered_extension_+_paper_backlog.md`, `.../architecture/16_axis_05_imc_runtime_heuristik.md` |
| Mess-Modell (2 Dimensionen), Mess-Architektur | `.../architecture/24_messmodell_korrektur_zwei_dimensionen.md`, `.../architecture/messarchitektur_v5_design.md`, `.../architecture/22_f15_messpipeline_und_such_bibliothek.md` |
| Lastprofil-Katalog + Paper-Bias (Workloads) | `.../architecture/32_lastprofil_katalog_und_paper_bias.md` |
| Begriffe/Ränge/Abkürzungen | `docs/glossar/`, `docs/architektur/TIER-AUFLOESUNG-AUDIT-UND-MAPPING-PLAN.md` |
| Weitere Forschungsfragen | `docs/termine/`, `docs/termine_konsolidiert/`, `docs/MASTERPLAN_KONSOLIDIERUNG_TERMINE.md` |
| Großer Beleg (Struktur-Anregungen) | `thesis/20250811_Großer_Beleg_Beispiel.zip` |
| Code-Gegenprüfung | Submodule `Code/external/comdare-cache-engine/`, `comdare-prt-art/` |

---

## 5. Arbeitspakete

Notation je AP: **Auslöser** (Datei:Zeile, wörtliches Zitat) · **Aufgabe** · **Referenz** ·
**Recherche/Zitate** · **Akzeptanzkriterium**.

### Kapitel 2 — Grundlagen (zuerst, da Definitions-Klassen für Kap. 3)

#### AP-G1 — Grundlagen-Teilkapitel ergänzen (Struktur)
- **Auslöser** `02:2`: „Mir ist aufgefallen, dass hier Grundlagen als Teilkapitel fehlen".
- **Aufgabe:** Fehlende Grundlagen-Sektionen identifizieren + als saubere Section/Subsection/
  Subsubsection-Hierarchie ergänzen; Kapitel-Einleitungstext an die erweiterte Gliederung anpassen.
- **Referenz:** Gliederungs-Vorbild = Großer Beleg (AP-E1); inhaltlich `14_…organ_metapher`, `09_taxonomien`.
- **Akzeptanz:** Vollständige, mehrstufige Grundlagen-Gliederung, die alle nachfolgenden APs aufnimmt.

#### AP-G2 — Cache-Hierarchie korrigieren + dynamische Cache-Lines + Novelty
- **Auslöser** `02:11` (gekürzt): „Es stimmt generell nicht, dass Speicher in festen Einheiten
  zwischen den Cache-Ebenen übertragen wird … cache-line Größen auf CPUs dynamisch anpassbar …
  Unterscheidung der Cache write-back Methodik je ISA … Unterschied zwischen TLB und dTLB …
  Fokus auf cache-line aware … Ermittlung dynamischer cache-line Grenzen je Architektur +
  Betriebssystem … Neuheit: zuerst Ermittlung der statischen cache-line Eigenschaften zur
  systemoptimierten binary-Kompilation als Automatisierung der Optimierung."
- **Aufgabe:** (a) Falschaussage „feste Einheiten" korrigieren; (b) reale Transfer-/Kohärenz-
  Mechanik darstellen; (c) dynamische/variable Cache-Line-Größen (32/64/128 B) je Architektur;
  (d) Write-Back/Write-Through je ISA; (e) TLB vs. dTLB sauber abgrenzen; (f) die **Neuheit**
  scharf formulieren (statische Cache-Line-Ermittlung → systemoptimierte Binary; cache-oblivious
  + gemessenes Lokalitätswissen → bewusste Runtime-Wahl).
- **Referenz:** `15_isa_layered_extension…`, `16_axis_05_imc_runtime_heuristik`, Memory
  `reference_isa_layered_extensions_and_avx512_subflags`.
- **Recherche:** Hersteller-Doku (Intel SDM / AMD / ARM ARM) + wiss. Primärquellen zu Cache-Kohärenz
  und cache-oblivious (Frigo et al.). **Pflicht-Zitate**, keine Wikipedia.
- **Akzeptanz:** Jede Aussage belegt; Neuheit explizit von „nur statischer Abstimmung" abgegrenzt.

#### AP-G3 — Klassen von Suchstrukturen vollständig als Achsen-Unterkapitel
- **Auslöser** `02:30` (gekürzt): „… dieses Kapitel muss alle Bestandteile eines Suchalgorithmus
  … im Bezug auf die im Code gefundenen Achsen vollständig als Unterkapitel aufgliedern. Unsere
  Arbeit besteht im Kern aus deren ‚Sezierung'. … Wir listen alle Algorithmen als Ganzes für die
  Typen der ‚Lebewesen' und zerlegen erst im Stand der Technik … ordnen die ‚Organe'-Algorithmen
  einer Achse zu … nicht nur baumartige Strukturen, sondern auch Container (std::vector-Hülle),
  flache Suchalgorithmen und ‚Exoten'."
- **Aufgabe:** Grundlagen = **ganze** Lebewesen-Typen allgemein vorstellen (Aufgabenteilung mit
  Kap. 3, das in Achsen seziert); Container (std::vector-Hülle), flache Suchverfahren und „Exoten"
  ergänzen; Bezug zu den im Code real existierenden Achsen herstellen; Mess-/Observer-Apparat
  bleibt unangetastet (korrekt anerkannt).
- **Referenz:** `14_…organ_metapher`, `09_taxonomien`, `07_bausteine_matrix_N_erweitert`,
  `34_KONSOLIDIERTER_MASTER_IST_STAND`, Memory `reference_anatomie_gattungen`.
- **Recherche:** wiss. Quellen für flache/„exotische" Suchverfahren.
- **Akzeptanz:** Klare Definitions-Klassen-Liste (Lebewesen-Typen), auf die Kap. 3 als Instanzen verweist.

#### AP-G4 — Trie-Grundlagen vertiefen + Kategorien
- **Auslöser** `02:47`: „Das ist korrekt aber zu grob. … unter den baumförmigen alle Kategorien
  auszuführen, weitere Kategorien hinzuzufügen … sections, subsections und subsubsections.
  Wissenschaftliche Belege und Zitate … immer Pflicht."
- **Aufgabe:** Trie-Abschnitt feingliedrig ausführen (alle baumförmigen Kategorien + weitere),
  mit durchgehenden wissenschaftlichen Belegen.
- **Referenz:** `09_taxonomien`, `18_achsen_algorithmus_paper_code_map`.
- **Akzeptanz:** Mehrstufige, belegte Trie-/Baum-Taxonomie.

#### AP-G5 — Einheitliche Vergleichsinterfaces (std::map + std::vector) vollständig
- **Auslöser** `02:59` (gekürzt): „… muss auch für std::vector separat als subsection parallel
  zu std::map gelistet werden … Aufgliederung ALLER im Standard verfügbaren Interface-Funktionen
  samt Tests … offizielle erwartete Funktionalität gegen den Suchalgorithmus dokumentieren …
  zentrales Dokument … exakte cache-engine function-handle-hops … Ebenen der Dynamik: compile-time
  vs. run-time; Lebewesen-Typen mit Achsen-Subset; Achsenalgorithmen (compile-time in Binary);
  dynamische Sub-Achsen (runtime); statische Sub-Achsen (compile-time-Auswahl)."
- **Aufgabe:** (a) `std::vector`-Interface als Parallel-Subsection zu `std::map`; (b) **alle**
  Standard-Interface-Funktionen auflisten + erwartete Semantik dokumentieren; (c) Taxonomie der
  Dynamik-Ebenen (compile-time/run-time × Lebewesen-Typ/Achse/Sub-Achse) sauber definieren;
  (d) zentrales „function-handle-hops"-Referenzdokument in der cache-engine verlinken/anlegen.
- **Referenz:** `10_schichten_modell_M`, `11_axes_vs_strategies_disambiguation`, Memory
  `std_map_unified_interface`.
- **Recherche:** offizielle C++-Referenz (cppreference / ISO) für die Interface-Semantik.
- **Akzeptanz:** Vollständige, getestet-belegte Interface-Tabellen + benannte Dynamik-Taxonomie.

#### AP-G6 — Workloads/„Last" konzeptionell + Framework-Trennung
- **Auslöser** `02:71` (gekürzt): „Was ist eine Last? Was ist ein Workload? Was ist das Ziel der
  Variation? Welche Workloads über ALLE Paper? … Lastprofil-playbooks mit multiplen Interface-
  Anfragen vs. isolierte unrealistische Einzelzugriffe? … zuerst ein verallgemeinertes
  Hauptkapitel und dann die Frameworks … ALL DIESE gegen alle Lebewesen-Binaries laufen lassen."
- **Aufgabe:** (a) „Last"/„Workload"/„Ziel der Variation" definieren; (b) generalisiertes
  Workload-Kapitel **vor** den bereitstellenden Frameworks (YCSB etc.); (c) Workloads aus **allen**
  gelisteten Papern erheben + woraus die Messdaten bestehen; (d) Lastprofil-Playbooks (multiple
  Interface-Anfragen) vs. Einzelzugriffe; (e) Begründung „alle Workloads × alle Lebewesen-Binaries".
- **Referenz:** `32_lastprofil_katalog_und_paper_bias`, `22_f15_messpipeline_und_such_bibliothek`.
- **Recherche:** YCSB-Primärquelle (Cooper et al. 2010) + Workload-Quellen der gelisteten Paper.
- **Akzeptanz:** Konzeptuelles Workload-Fundament, auf das Kap. 3 (Mess-/Workload-Instanzen) spiegelt.

#### AP-G7 — Design-Pattern + neue Metaprogrammier-Pattern benennen
- **Auslöser** `02:80` (gekürzt): „klassische Software-Design-Pattern … kurz als Grundlage …
  durch Metaprogrammierung in C++ entstehen neue/unbenannte Designpattern, denen wir Namen und
  Bedeutung geben sollten … Webrecherche, ob jemand diese schon definiert hat … PRT-ART als
  Prüfling gegen ein bestehendes Konstrukt in Matrix-Schichten zu kompilieren ist neuartig."
- **Aufgabe:** (a) verwendete klassische GoF-Pattern kurz als Grundlage; (b) neue/unbenannte
  Metaprogrammier-Pattern benennen + definieren; (c) Web-Recherche, ob bereits in der Literatur
  benannt; (d) das „Prüfling-gegen-Konstrukt-in-Matrix-Schichten"-Pattern als Beitrag herausstellen.
- **Referenz:** `11_konzept_achsen_extension_visitor_pattern`, Memory
  `reference_meta_driven_concept_hardening_pattern`, `feedback_lehrbuch_design_patterns_only_zero_cost_metaprog`.
- **Recherche:** Pattern-Literatur (GoF; Alexandrescu; C++-Template-Metaprogramming) — Primärquellen.
- **Akzeptanz:** Jedes Pattern benannt, definiert, belegt oder explizit als neu markiert.

#### AP-G8 — Wissenschaftliches Messen als Grundlage + Grundlagen↔SoTA-Verzahnung
- **Auslöser** `02:89` (gekürzt): „Das Thema Messungen fehlt komplett … wissenschaftliche
  Quellen, welche wissenschaftliches Messen definieren … das WARUM kommt erst in ‚Konzept und
  Architektur'. Grundlagen = was KONZEPTIONELL als ‚Bibliothek' existiert; Stand der Technik =
  was WISSENSCHAFTLICH nachweisbar schon gibt … beide Kapitel müssen strukturell ineinandergreifen
  … Stand der Technik ist immer mindestens eine Instanz der konzeptionellen Grundlagen als
  Definitions-Klasse."
- **Aufgabe:** (a) Grundlagen-Sektion „Wissenschaftliches Messen" (Definition, Gütekriterien:
  Reproduzierbarkeit, Validität, Fairness; verwendete Muster/Konzepte — *ohne* das WARUM, das
  nach Kap. 4 gehört); (b) die Definitions-Klasse↔Instanz-Verzahnung als durchgängiges Strukturprinzip
  implementieren.
- **Referenz:** `24_messmodell_korrektur_zwei_dimensionen`, `messarchitektur_v5_design`,
  `22_f15_messpipeline_und_such_bibliothek`, Memory `feedback_zwei_dimensionen_messmodell`.
- **Recherche:** Primärquellen zu Benchmarking-/Mess-Methodik + Reproduzierbarkeit (z. B. ACM
  Artifact Review, SIGPLAN/SIGMOD Reproducibility).
- **Akzeptanz:** Mess-Grundlagen vorhanden; jede Grundlagen-Definitionsklasse hat ein SOTA-Gegenstück.

### Kapitel 3 — Stand der Technik (abgeleitet aus Kap. 2)

#### AP-S1 — Stand der Technik als Instanz-Spiegel reorganisieren
- **Auslöser:** Präzisierung 2026-06-15 + `01:91` + `02:89` (Definitions-Klasse → Instanz).
- **Aufgabe:** Kap. 3 so umstrukturieren, dass jede Grundlagen-Definitionsklasse aus Kap. 2 ihre
  SOTA-Instanzen erhält (Cache-Konzepte→cache-bewusste Designs; Suchstruktur-Klassen→Paper;
  Achsen/Organe→Achsen-Sezierung der Paper; Interfaces→Mess-Instanzen; Workloads→Workload-
  Technologien; Mess-Grundlagen→Mess-Technologien). „Chaos" auflösen: klare 1:1-Spiegelung.
- **Referenz:** `18_achsen_algorithmus_paper_code_map`, `32_lastprofil_katalog_und_paper_bias`.
- **Akzeptanz:** Sichtbare strukturelle Verzahnung Kap. 2 ↔ Kap. 3.

#### AP-S2 — Unterkapitel „nicht-technisches Architektur-Design von Suchalgorithmen"
- **Auslöser** `01:91` (gekürzt): „… fehlt im Stand der Technik ein eigenes Unterkapitel zum
  nicht-technischen Bereich des Suchalgorithmus-Architektur-Designs, weil unser Framework eine
  Architektur-Design-Erfindung mit fortgeschrittenen Design-Pattern ist … wir konstruieren erst
  eine Schaufel → lösen das Problem indirekt … Stand der Technik muss durch Konzeption und
  Voraussetzungen von Suchalgorithmen beginnen … parallel zum Software-Engineering an der TU Dresden."
- **Aufgabe:** (a) SOTA-Unterkapitel „Architektur-Design / Software-Engineering von
  Suchalgorithmen" (Design-Space, Design-Pattern-getriebene Lösung — die „Schaufel"-Metapher);
  (b) Kap. 3 mit Konzeption + Voraussetzungen beginnen; (c) Einordnung relativ zum
  SE-Forschungsfeld der TU Dresden.
- **Referenz:** AP-G7; `idreos2018periodic`/`idreos2018datacalculator` (Design-Space, bereits zitiert).
- **Recherche:** SE-Forschung TU Dresden (Webrecherche) + Design-Space-Primärquellen.
- **Akzeptanz:** Eigenes belegtes SOTA-Unterkapitel; Brücke Datenbanken ↔ SE.

### Kapitel 1 — Einleitung (zuletzt, da strukturreferenzierend)

#### AP-E1 — Großen Beleg lesen → strukturelle Anregungen
- **Auslöser** `01:102`: „Der Große Beleg liegt in der Diplomarbeit und liefert möglicherweise
  Anregungen zur strukturellen Erweiterung … bitte lies ihn … nicht nur über die Sektionen,
  sondern auch alle Strukturierungseigenschaften der subsections und subsubsections."
- **Aufgabe:** `thesis/20250811_Großer_Beleg_Beispiel.zip` extrahieren + vollständige
  Gliederung (inkl. Sub-/Subsubsections) erfassen → Struktur-Anregungen in AP-G1/AP-S1 einspeisen.
- **Akzeptanz:** Strukturabgleich dokumentiert; übernommene Gliederungselemente markiert.

#### AP-E2 — Glossar: SOTA + Abkürzungen + Ränge
- **Auslöser** `01:45`: „Begriffsdefinition von SOTA und anderen Abkürzungen gehören in ein
  Glossar, sowie die Erklärung der Ränge in den Text".
- **Aufgabe:** (a) Glossar-Einträge (SOTA + weitere Abkürzungen); (b) Erklärung der **Ränge**
  (Rang-1/2/3 = ④-Auflösung) in den Fließtext.
- **Referenz:** `docs/glossar/`, `TIER-AUFLOESUNG-AUDIT-UND-MAPPING-PLAN`.
- **Akzeptanz:** Konsistentes Glossar + Rang-Erklärung im Text.

#### AP-E3 — Forschungsfragen erweitern (Termine + Paper + Web)
- **Auslöser** `01:46`+`01:47`: „weitere Fragen in den Dokumenten der vorangegangenen Termine …
  übernehmen"; „In allen gesammelten Papern … Aspekte der cache-line Optimierung, die wir
  vergessen haben … 3 Forschungsfragen sind zu wenig … im Web nach Diplomarbeiten aus der
  Informatik suchen, um den Umfang besser abzuschätzen."
- **Aufgabe:** (a) FF aus `docs/termine*` + `MASTERPLAN_KONSOLIDIERUNG_TERMINE` übernehmen;
  (b) cache-line-Aspekte aus den Papern als FF ergänzen; (c) Web-Recherche Informatik-
  Diplomarbeiten zur Umfangseinschätzung; (d) FF-Set über die bisherigen 3 hinaus erweitern.
- **Referenz:** `docs/termine/`, `docs/termine_konsolidiert/`, `18_achsen_algorithmus_paper_code_map`.
- **Recherche:** Web (Informatik-Diplomarbeiten, Umfang/FF-Anzahl).
- **Akzeptanz:** Erweitertes, belegtes FF-Set; Umfang plausibilisiert.

#### AP-E4 — Zielsetzung/Beiträge schärfen + Schichten-Narrativ
- **Auslöser** `01:66` (gekürzt): „… der Code der Diplomarbeit ist der formale Bediener der
  cache-engine, lädt PRT-ART als Prüfling herunter, kompiliert ihn per Metaprogrammierung gegen
  die Kernbestandteile der cache-engine, liefert ABI-stabile Lebewesen aus und jagt sie über das
  Prüfdock zur Messung. Die Zielsetzung ist korrekt, aber unscharf … wir können die Zielstellung
  scharf zeichnen."
- **Aufgabe:** Zielsetzung/Beiträge präzisieren entlang des korrekten Schichten-Narrativs
  (Diplomarbeit-Code = formaler Bediener; PRT-ART = heruntergeladener Prüfling; Metaprogramm-
  Kompilation gegen cache-engine-Kern; ABI-stabile Lebewesen; Prüfdock-Messung).
- **Referenz:** `10_schichten_modell_M`, `abhaengigkeitskette_lebewesen_pruefdock_abi_konvergenz`,
  `34_KONSOLIDIERTER_MASTER_IST_STAND`, Memory `reference_m_schichten_modell`.
- **Akzeptanz:** Scharfe, mit Schichtenmodell konsistente Zielsetzung.

#### AP-E5 — Aufbau/Struktur + Achsen-Repos/Sub-Achsen + Umfang 60–80 S.
- **Auslöser** `01:91` (Teil): „Es sind nicht nur Such- und Allokator-Cluster. Es gibt mehrere
  Achsen-Repositories, die thematisch mehrere Achsen abbilden, und die Sub-Achsen … 60 bis 80
  Seiten eigenem Volltext."
- **Aufgabe:** „Aufbau der Arbeit" an die erweiterte Gliederung anpassen; Achsen-Repositories +
  Sub-Achsen korrekt darstellen; Umfangsrahmen (60–80 S.) berücksichtigen.
- **Referenz:** `07_bausteine_matrix_N_erweitert`, `34_KONSOLIDIERTER_MASTER_IST_STAND`.
- **Akzeptanz:** Aufbau-Abschnitt spiegelt finale Kap.-2/3-Struktur.

### Querschnitt

#### AP-C1 — Code-Gegenprüfung (gemeinsam programmierter Code)
- **Auslöser:** Auftrag „der Code muss wohl auch gegengeprüft werden".
- **Aufgabe:** Aussagen in Kap. 1–3 gegen den realen Code der Submodule (`comdare-cache-engine`,
  `comdare-prt-art`) verifizieren (Achsen-Anzahl, Schichten-Namen, Interface-Verhalten, Profile);
  Abweichungen Text↔Code auflisten + im Text korrigieren (NICHT den Submodul-Code des parallelen
  Implementierungs-Agenten ändern).
- **Referenz:** `34_KONSOLIDIERTER_MASTER_IST_STAND`, `18_achsen_algorithmus_paper_code_map`.
- **Akzeptanz:** Text↔Code-Abgleichliste; Text konsistent mit Code-Ist-Stand.

---

## 6. Reihenfolge (kleinschrittig)

1. **AP-E1** (Großen Beleg lesen — liefert Struktur für G1/S1)
2. **AP-G1 → AP-G8** (Grundlagen schärfen/gliedern; Definitions-Klassen)
3. **AP-S1, AP-S2** (Stand der Technik als Instanz-Spiegel)
4. **AP-E2 → AP-E5** (Einleitung an finale Struktur anpassen)
5. **AP-C1** (Code-Gegenprüfung, fortlaufend begleitend)

Jeder Schritt: Recherche → Edit (DE+EN) → lokaler Build-Check → Commit/Push → Abnahme.

---

## 7. Offene Entscheidungen (vor großen Edits)

1. **Reihenfolge ok?** (Kap. 2 → 3 → 1) oder anders priorisiert?
2. **Umfang pro AP:** vollständige Ausformulierung im Text vs. erst Gliederung+Stichpunkte zur Abnahme?
3. **Compliance:** KI-Erklärung/zwei-Fassungen-Regel jetzt vorbereiten oder erst zur Endabgabe?
4. **Großer Beleg:** ist `20250811_Großer_Beleg_Beispiel.zip` der inhaltlich relevante (eigene) Beleg
   oder nur ein Struktur-Beispiel?
