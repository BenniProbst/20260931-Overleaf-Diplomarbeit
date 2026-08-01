# RÜCKFRAGEN Thesis-Nachzug (Schritt 2 von 3) — 01.08.2026

> Grundlage: Design-Planung (2 Fable-xhigh-Agenten: Struktur+Kommentar-Inventar+Kapitel-Plan
> +K2-Research-Plan; Diff-Stimmigkeitsprüfung der Owner-Änderungen 28.07.–01.08.).
> Rohdaten: Workflow wf_e472844c (super-Session). Owner-Kommentar-Inventar = 9 Einträge
> (5 neue aus 683476a/ba0eb57 + 1 Alt-Arbeitsanker K5 + 3 Rahmen-TODOs).
> Struktur-Befund: EN-Kapitel sind 1:1-Zwillinge gleicher Basenamen (die 8er-Dateien sind
> un-includete Alt-Quellen der Habich-Restruktur); alle Owner-Änderungen seit 28.07. sind DE-only.

## A. ENTSCHEIDUNGEN (blockierend für Schritt 3)

**E-1 Achsen-Zählung global** — Thesis trägt durchgehend „neunzehn Kompositions-Achsen
(T0–T18)"; O-8-Kanon ist 18 Organ-Achsen (T00–T17) + DREI System-Haupt-Achsen
(target_isa/operating_system/external_utils) + Mess-Realm.
Empfehlung: (a) Voll-Nachzug auf die neue Ordnung in allen Kapiteln, Alt-Zählung nur als
historische Vorstufe. Owner bestätigt bitte die exakte Zähl-Formel (18 Organ; telemetry
zweigeteilt Mess-Unter-Achse UND System-Achse).

**E-2 FF-Umbau-Schnitt** (Kommentar K1:74) — Empfehlung: (a) FF0–FF4-Nummern ERHALTEN,
je FF benannte Teilfragen je Achsen-Kategorie (Mess/System/Organ); vermeidet die
Verweis-Kaskade durch K6/Aufgabenstellung. Alternative (b) Neuschnitt FF-M/FF-S/FF-O.

**E-3 Abgebrochener Kommentar K1:100** — „% Wie sieht es unter diesem Punkt auch neben der "
(endet mitten im Satz, unter der FF2-Teilfrage Knoten-/Cache-Line-Größe). Bitte
vervollständigen — wird nicht geraten.

**E-4 Ketten-Kommentar in der Aufgabenstellung** (Z.72) vs. Datei-Doktrin „Lösung nicht
vorwegnehmen". Empfehlung: (a) anforderungssprachlich ohne Klassennamen in der
Aufgabenstellung („XML-getriebene automatisierte Bau-, Mess- und Auswerte-Kette bis
CSV/xlsx und LaTeX-Diagrammen"); Planer/CacheEngineBuilder wörtlich erst ab K3.
(Abstract nennt beide bereits — dort bleibt es.)

**E-9 K2-Umfang (Habich-Grundlagen)** — Empfehlung: (a) ~5–8 Seiten als Unterabschnitte
IN die bestehende Hardware-Sektion 2.2 + Begriffs-Taxonomie in 2.1 + eigener kurzer
Unterabschnitt „cache-conscious/oblivious Strukturen" vor 2.3. Research-Plan R1–R6 liegt
(Begriffs-Taxonomie; Parameter-Katalog inkl. Assoziativität/3-C; Prefetching; DRAM/NUMA/TLB;
Struktur-Überblick mit Struktur×Parameter-Tabelle; Mess-Parameter/PMC). Neue Quellen u.a.
Aggarwal/Vitter 1988, Chilimbi/Hill/Larus 1999, Mittal 2016, Lameter 2013, Kim 2010 FAST.

## B. ENTSCHEIDUNGEN (Empfehlung gilt, falls kein Widerspruch)

**E-5** Impl-Detail-Tiefe: K4/K5 knapp als Reproduzierbarkeits-/QS-Argument (Zwei-Gate,
Lager-Skip nur grün-inventarisiert), Technik-Details in Anhang B. **E-6** HW-Erkennung:
Konzept vollständig in K3 (zweigeteilte Mess-Achse), K4 nur P1-Ist + Ehrlichkeitsnote
(4800 = eingefrorenes dmidecode-Ergebnis; Gewinn = automatisierte Wiedervorlage mit
Provenienz). **E-7** EN-Sync je Kapitel im selben Paket (nicht Sammelpass). **E-10**
Voll-Bau-Zahlen (2^17×12=1.572.864) als SOLL gekennzeichnet in K5-Methodik; Ergebnisse
erst nach Lauf.

## C. NICHT-BLOCKIEREND / OWNER-LIEFERUNGEN (E-8)

Danksagung (Wortlaut), Sperrvermerk (Wortlaut+Platzierung, TU-Formalia), offizielles
Aufgabenblatt-PDF. TODOs bleiben bis Lieferung stehen. K5:165-Platzhalter (Mess-Einspeisung)
bleibt als Arbeitsanker — nicht Teil der Kommentar-Lösch-Checkliste.

## D. DIFF-STIMMIGKEIT (zweitrangiger Auftrag) — Ergebnis

6 von 8 geprüften Fakten-Änderungen STIMMIG mit der Implementierung (Abstract-Dreischicht
in der Tier-Binary; Planer+CEB namensgleich im Code; CT-Doktrin; Makro-Benchmarking;
Ketten-Kommentar strukturell gedeckt; FF-Achsen-Trennung deckungsgleich mit RegistryTrio +
kSystemAxisOrder). ZWEI Befunde der Klasse IMPL_MUSS_NACHZIEHEN (Owner-Text = Gesetz,
Implementierung muss folgen — als Hauptstrang-Merkposten verbucht):
1. **Micro-Benchmarking-Auflösung:** Owner-Soll „je Entwurfsbestandteil innerhalb JEDER
   gemeinsamen Interface-Funktion der Kategorie-Hülle + Kategorien-Vergleich" — das
   Mess-Record trägt die Interface-Funktions-Auflösung heute nicht vollständig.
2. **xlsx-Export:** Owner-Soll „Auswertung über CSV/xlsx" — xlsx existiert im gesamten
   Code-Tree nicht (nur als Doktrin in docs); CSV ist implementiert.

## E. ABLAUF SCHRITT 3 (nach Owner-Antworten)

Sequenzielle Fable-xhigh-Kapitel-Agenten in strikter Reihenfolge, jeder baut auf den
Ergebnissen der Vorgänger: Aufgabenstellung → K1 → K2 (inkl. Deep-Research R1–R6 + Bib) →
K3 → K4 → K5 → K6 → Anhänge → Rahmen/Abstract-EN. Je Kapitel: DE führend + EN-Sync im
selben Paket; Ton an den 5 Eich-Sätzen der Bestands-Arbeit; abgearbeitete Owner-Kommentare
werden GELÖSCHT; Build-Beweis (lint/pdf) je Paket; Commits mit Studenten-Identität.
