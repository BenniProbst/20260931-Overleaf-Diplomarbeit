# AP-Z1 — Beschaffungs-/Finalisierungs-Liste (historische + Exoten-/unpublizierte Primärquellen)

> Erzeugt 2026-06-16 aus dem AP-Z2-Verifikations-Workflow (`wdgknzjqu`). Die Bib-Einträge sind bereits in
> `literatur.bib` (web-verifizierte Metadaten); **diese Liste betrifft den Volltext-Zugang bzw. die finale
> Metadaten-Bestätigung.** Die mit „SLUB" markierten Paper brauchen **deinen Bibliotheks-/TU-Dresden-Login**
> (ich kann die PDFs nicht selbst ziehen). Schlüssel = `\cite`-Key in `literatur.bib`.

## A) Paywalled, aber publiziert → via SLUB / TU-Dresden-Lizenz beschaffen (Volltext zum Lesen/Zitat-Verifikation)
| Key | P-ID | Venue / Quelle | Hinweis |
|-----|------|----------------|---------|
| `bender2005coboblivious` | P17 | SIAM J. Computing (SICOMP) | Journal-Version von `bender2000cobtree` (FOCS 2000); SICOMP-Subscription |
| `saikkonen2008multilevel` | P18 | Springer LNCS (WADS 2008) | SpringerLink via SLUB |
| `saikkonen2016layout` | P19 | Springer LNCS (WADS 2016) | SpringerLink via SLUB |
| `khan2010adaptive` | P23 | IEEE Trans. Multimedia | IEEE Xplore via TU-Dresden; **Eignung prüfen** (Multimedia-Streaming-Kontext — DB-Prefetching-Relevanz zweifelhaft) |
| `naderan2016adaptivefilter` | P24 | IEEE Trans. Computers | IEEE Xplore via TU-Dresden |
| `michael2004hazard` | P30 | IEEE Trans. Parallel & Distributed Systems (TPDS) | IEEE Xplore via TU-Dresden |
| `herter2011cama` | A12 | IEEE ECRTS 2011 | IEEE Xplore via TU-Dresden (cache-aware Allokator) |
| `zhang2024pathprefix` | P26 | Elsevier FGCS | ScienceDirect via SLUB; **Volume/Issue/DOI in der Bib noch unvollständig → beim Beschaffen ergänzen** |

## B) Unpubliziert / „to appear" / limitiert → Metadaten beim Erscheinen finalisieren (nicht beschaffbar)
| Key | P-ID | Status | To-do beim Erscheinen |
|-----|------|--------|------------------------|
| `mueller2025btreesback` | P20 | SIGMOD 2025 „to appear" | finalen DOI / arXiv-ID nachtragen (Bib hat `note={To appear}`) |
| `mahling2025hotpath` | P25 | SIGMOD 2025 „to appear" | finalen DOI / arXiv-Preprint nachtragen |
| `zhang2025hierarchical` | P27 | ASPLOS 2025 „to appear" | finalen DOI / arXiv-Preprint nachtragen |
| `schmidt2025hbm` | P32 | TU-Dresden-Preprint, arXiv pending | Venue/DOI nachtragen, sobald veröffentlicht |
| `berthold2023vampir` | P33 | DaMoN-2023-**Poster** (kein Volltext, kein DOI) | Zitierbarkeit eingeschränkt; ggf. durch offizielle VAMPIR/OTF2-Tool-Referenz oder ZIH-Techreport ersetzen |

## Hinweise
- Alle übrigen ~28 neuen Korpus-Einträge sind **open** (ACM DL / IEEE Xplore / arXiv / Verlags-Open-Access) und
  brauchen keine Sonder-Beschaffung.
- Maschinenlesbare Vollfassung (inkl. P-ID→Key-Map aller 47): `sessions/ap-z1-z2-keymap.json`.
- Nach Beschaffung/Finalisierung: betroffene Einträge in `literatur.bib` ergänzen (DOI/pages/volume) und die
  `note={To appear …}`-Felder entfernen; danach `build.ps1 -Lang de`/`-Lang en` (BibTeX) erneut laufen lassen.
