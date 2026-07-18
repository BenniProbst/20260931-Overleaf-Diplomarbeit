# Audit Prof. Habich (2026-06-29) — Kritik + Restruktur-Plan

> **Backup des Vor-Umbau-Stands:** Git-Tag `backup-2026-06-29-pre-habich-restruktur` (Commit `a361622`,
> Thesis-Repo) auf **beiden** Remotes (GitHub origin + GitLab intern). BASE-Pointer `a4fc439`.
> Wiederherstellung: `git checkout backup-2026-06-29-pre-habich-restruktur`.

## 1. Kontext
Prof. Habich (Erstprüfer) hat die Arbeit im Audit **bis tief in Kapitel 4** gelesen. **Inhaltlich richtig**,
aber an vielen Stellen **unzufrieden mit Struktur und Hinführung**. Kernkritik: fehlende ausgereifte Struktur,
zu viele winzige Silo-Unterkapitel, und — am gravierendsten — die **Abstraktion ist verkehrt herum** aufgebaut.

## 2. Kernkritik (wörtlich sinngemäß)
1. **Verkürzte Kapitelaufteilung:** statt 8 nur **5–6 Kapitel**.
2. **Durchgängigere Kapitel-Innenaufteilung:** **thematische Absätze, die ineinander übergehen**, statt winziger
   Silo-Unterkapitel. Fluss/Übergänge zwischen den Themen.
3. **Hinführung zum Thema** für einen **themen-fremden Leser** fehlt.
4. **Bildhaftigkeit (KERNWUNSCH):** Jedes einzelne **neue Konzept** und der **Entwurfsraum** — alles, was *nicht*
   in der Literatur nachlesbar ist — soll **bildhaft** erklärt werden. **Bilder zwischen den Texten ausdrücklich
   erwünscht**; sie **zählen NICHT** zum textuellen Gesamtumfang (60–80 Seiten Text).
5. **Abstraktions-Richtung VERKEHRT (der zentrale Punkt):** Aktuell präsentieren wir das **Mess-System für ein
   allgemeines Problem** und rollen es dann für viele Spezialfälle auf → *speziell→allgemein→speziell*. Habich will
   **allgemein → speziell**: vom allgemeinsten Fall (Suchbäume) in den speziellen.
   - Das **Mess-System muss als LÖSUNG** für das **konzeptionelle Problem der Suchbäume** begründet werden — ein
     Problem, das **bereits zu bestehenden Hardware-Anpassungen geführt hat** und nun durch weitere Optimierungen
     (Heuristiken) **geschärft** werden kann.
   - **Platzierung eher im Bereich Suchbäume** als im Bereich Mess-Systeme.
6. **Habich-Präferenz:** verliert sich gern im **Detail**, bevorzugt die Richtung allgemein→speziell.

## 3. Ziel-Struktur (Habich, 5–6 Kapitel)
1. **Einleitung**
2. **Suchbäume + Grundlagen** *(Teil war inhaltlich gut)*
   - 2.1 **Überblick** (sehr breit)
   - 2.2 **Hardware-Anpassung** aufgrund der geforderten **Abstraktion der Suchalgorithmen**
   - 2.3 **Definition aller Bestandteile** + konzeptionelle **Spezialkonstrukte** (z. B. „Hüllen", besondere Designpattern)
3. **Mess-System mit PRT-ART als Demonstration**
4. **Implementierung + konkrete Algorithmusbestandteile** — alle Schlüsselstellen für **PRT-ART** und **alle Ebenen
   des Mess-Systems** (Fokus: **Detail**)
5. **Evaluation** (zusammengelegt: **Methodik zuerst**, dann **Analyse der Ergebnisse** auf Basis der Methodik)
6. **Fazit + Ausblick** (einzeln ODER als Teil des Evaluations-Kapitels)

## 4. Mapping: aktuelle 8 Kapitel → Ziel 6 Kapitel
| Aktuell | → Ziel | Bewegung |
|--------|--------|----------|
| 1 Einleitung | **1 Einleitung** | Bleibt, aber **Hinführung suchbaum-first** statt framework-first; Problem→Lösung-Bogen vorzeichnen. |
| 2 Grundlagen | **2.1 Überblick (breit)** | Suchbäume als allgemeiner Ausgangspunkt. |
| 3 Stand der Technik | **2.2 Hardware-Anpassung** (+ Achsen-Sezierung als „warum Abstraktion") | SOTA **löst sich auf** in: bestehende HW-Anpassungen + die geforderte Abstraktion; **kein** Silo-Kapitel mehr. |
| 4 Konzept+Architektur (Teil: Begriffe/Anatomie/Gattungen/ABI/Spezialkonstrukte) | **2.3 Definition der Bestandteile + Spezialkonstrukte** | Konzept-Definitionen wandern **hoch** in die Grundlagen (als Vokabular der Suchbaum-Abstraktion). |
| 4 Konzept+Architektur (Teil: Mess-System/M-Modell/Builder/Drei-Stufen + PRT-ART) | **3 Mess-System mit PRT-ART als Demonstration** | Das Mess-System wird als **Lösung** des Suchbaum-Problems gerahmt, PRT-ART als Demonstrator. |
| 5 Implementierung | **4 Implementierung + konkrete Bestandteile** | Detail-Fokus: PRT-ART-Schlüsselstellen + alle Mess-System-Ebenen. |
| 6 Evaluationsmethodik | **5 Evaluation (Methodik-Teil)** | Zusammengelegt. |
| 7 Ergebnisse+Auswertung | **5 Evaluation (Analyse-Teil)** | Zusammengelegt; Methodik → Analyse. |
| 8 Fazit | **6 Fazit + Ausblick** (oder Teil von 5) | |

## 5. Der zentrale Reframe (allgemein → speziell)
**ALT (verkehrt):** Kap. 4 führt mit „unser Achsen-Bibliotheks-/Mess-System (Kernbeitrag) für das allgemeine
cache-bewusste Such-Problem" und spezialisiert dann → liest sich als *Spezial-Lösung zuerst*.

**NEU (Habich):**
1. **Suchbäume** (allgemein, vertraut) — breiter Überblick.
2. **Konzeptionelles Problem** der Suchbäume: Cache-Bewusstheit ist fest verdrahtet oder ignoriert; man kann nicht
   trennen, welche Entwurfsentscheidung welchem Lastmuster nützt (**Trennbarkeit**). Dieses Problem **trieb bereits
   bestehende Hardware-Anpassungen** (ad hoc).
3. **Geforderte Abstraktion:** Zerlegung der Suchalgorithmen in orthogonale Bestandteile/Achsen (der **Entwurfsraum**).
4. **Definition aller Bestandteile** + Spezialkonstrukte (Hüllen, Designpattern).
5. **Mess-System als LÖSUNG** (Kap. 3): um die beste Komposition zu finden — begründet aus dem Problem,
   **demonstriert an PRT-ART**; schärfbar durch Heuristiken.
6. **Implementierungs-Detail** (Kap. 4) → **Evaluation** (Kap. 5) → **Fazit** (Kap. 6).

## 6. Bildhaftigkeit — Diagramm-Bedarf (Bilder zählen NICHT zum Textumfang)
Jedes **neue, nicht-literatur-nachlesbare** Konzept braucht ein Bild. Kandidaten (zu verfeinern):
Entwurfsraum/kartesisches Produkt der Achsen · Achse=Organ + Anatomie=Verdrahtung · Lebewesen/Gattungen/Tier-Ebenen ·
Hüllen/ABI-Adapter (Spezialkonstrukte) · M-Modell (4 Subsysteme) · Drei-Stufen-Prüfung · Mess-Pipeline (7 Phasen) ·
PRT-ART als Demonstrator · Heuristik-Schleife (Messung→Profil→Konfiguration). Bestehende TikZ-Figuren wiederverwenden/
umplatzieren; neue ergänzen.

## 7. Konstanten (NICHT ändern)
- **Deutsch führt, Englisch folgt** (bilingual, DE kanonisch).
- **Inhalt bleibt** — nur **Struktur, Übergänge/Fluss, Platzierung** ändern (suchbaum-nah statt mess-system-nah).
- **Textumfang 60–80 Seiten** (Bilder exkludiert).
- Metapher-Kanon (Lebewesen≡SearchAlgorithm, Anatomie=Verdrahtung, 3 Ebenen) bleibt; Mess-System-/Achsen-Inhalte bleiben.

## 8. Offene Planungs-Entscheidungen (mit User klären)
1. **Fazit:** eigenes Kap. 6 ODER als Abschnitt von Kap. 5 (Evaluation)?
2. **Stand-der-Technik:** vollständig in Kap. 2 auflösen (kein Silo) — bestätigen.
3. **Ausführungs-Strategie:** Kapitel-für-Kapitel mit Review, oder ein großer geplanter Umbau? Auf `main` (Overleaf-Sync)
   — Overleaf-Edits während des Umbaus pausieren?
4. **Bild-Umfang:** wie viele neue Diagramme jetzt vs. später; Stil (TikZ wie bisher)?
5. **Anhänge A–F:** bleiben als Anhang (Detail-Auslagerung) — bestätigen.

## 9. Nachgereichtes Feedback + Antworten (gleicher Audit, 2026-06-29)
**Entscheidungen:** 6 Kapitel (Fazit = eigenes Kap. 6) · Vorgehen = **erst detailliert ausplanen** (kein Code) ·
Bild-Konzept-Liste **zuerst abstimmen**, dann **alle** zeichnen.

**Vertieftes Feedback (sehr wichtig):**
- **Aufgabenstellung wird NICHT gelesen:** Sie ist vollständig + korrekt (gut, dass gestellt), aber niemand liest sie
  → der Text muss **ohne** sie verständlich sein. Die **Belange der Aufgabenstellung** (cache-aware-Fokus) müssen
  **im Text selbst** eingeführt werden — **vollständig in Kapitel 3**, nach den Begrifflichkeiten (2.3), im Kontext
  der vorangegangenen Kapitel, **auf ALLE Belange von Kap. 2 zurückgreifend**.
- **Kapitel 2 = rein konzeptionell/visuell:** Abstraktionen, Bilder, erklärende Beschreibungen, die zeigen, **wie die
  Grundlagen zum Problem und zur Problemlösung führen**. **Begrifflichkeiten + wissenschaftliches Messen → Kap. 2.3.**
  **KEINE Katalog-Tabellen in Kap. 2.**
- **ALLE Tabellen → Kapitel 3** (vollständig + korrekt, nur Platzierung ändert sich).
- **Anatomie-Metapher als visuelle Leitidee** (Habich ist sehr bildhaft): die **menschliche Anatomie** nutzen, um die
  Idee des **Mess-Systems** zu erklären, und sie **grafisch in die technische abstrakte Realität überführen**.
- **Massive grafische Erweiterung (Frage 3):** ALLE Bilder + zusätzlich: **Entwurfsmuster-Bild**; **pro Achse** ein Bild
  (Algorithmen + Code-Beschreibung des **Achsen-Interfaces**); **alle Gattungen**; **UML-Diagramme aller
  Interface-Strukturen** des Codes („Landkarten"); bildhaft, **welche Achsen welche anderen nutzen**.
- **Kapitel 4 (Frage 4):** nach dem bekannten Stand der Technik **jeden PRT-ART-Algorithmus als Bild** + Beschreibung.
- **Anhänge (Frage 5):** anpassen, sobald das Gesamtbild klar ist (zurückgestellt).
- **Gesamtcharakter:** gigantische Umstrukturierung **samt grafischer Erweiterung**. Detail-Plan + Bildprogramm:
  `2026-06-29-restruktur-detailplan-gliederung-und-bildliste.md`.
