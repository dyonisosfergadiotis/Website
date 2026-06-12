# Claude Brief: App-Unterseiten

## Ziel

Erstelle drei responsive, lebendige Produktseiten fuer die statische GitHub-Pages-Website:
**NewsFeeder**, **PayScope**, **Wetterblatt**. Jede App bekommt eine eigene visuelle Welt, bleibt
aber durch Typografie, Navigation, Abstaende und Footer Teil desselben Portfolios. Kein
generisches SaaS-Template und keine Apple-Seitenkopie.

## Bestand

- Hauptseite: `index.html`
- Globale Styles: `css/stylesheet.css`
- JavaScript: `js/`
- Icons: `AppIcons/`
- NewsFeeder-Basis: `projects/NF/NotiFeeder.html`, `projects/NF/stylesheet.css`
- NewsFeeder-Screens: `projects/NF/AppViews/`
- iPhone-Rahmen: `projects/NF/iPhone16-Teal-H.png`
- Sprache: englische Website-Texte; deutsche Texte in echten Screenshots bleiben.

Hauptseite aktualisieren:

- `NotiFeeder` -> `NewsFeeder`
- `MoneyMap` -> `PayScope`
- `Project Three` -> `Wetterblatt`
- Namen, Icons, Texte und Links korrigieren.

NewsFeeder vorerst **nur als iOS-App mit Home- und Lock-Screen-Widgets** praesentieren. Keine
Mac-, Apple-Watch-, Watch-App- oder Watch-Widget-Bezuege. Falschen CTA `View on Mac App Store`
entfernen.

## Gemeinsame Anforderungen

- Produktgeschichte: Problem -> Loesung -> Kernfunktionen -> Erlebnis -> Technik/Datenschutz ->
  Abschluss.
- Richtstruktur: Hero, Problem/Loesung, 3-5 Feature-Kapitel, charakteristische Interaktion,
  Widget/Offline/Ecosystem, Technik/Datenschutz, Portfolio-Ruecklink.
- Jede Seite bekommt eigene Dramaturgie statt identischem Template.
- Nur echte Icons und Screenshots; keine erfundenen UI-Screens oder leeren Mockup-Boxen.
- Keine erfundenen Nutzerzahlen, Reviews, Preise, Awards oder Store-Links.
- Ohne echten Download-Link: `Coming soon`, `Back to portfolio` oder kein Store-CTA.
- Semantisches HTML, Kontrast, Tastaturbedienung, Alt-Texte, Desktop/Tablet/Mobile.
- `prefers-reduced-motion` respektieren.
- Animationen erklaeren Inhalt; keine hektische Dauerbewegung.
- Kleine Vanilla-JS-Loesungen bevorzugen; Bilder skalieren/lazy-loaden; Motion ueber
  `transform`/`opacity`.
- Gemeinsame Navigation: App-Name, `Back to portfolio`, Abschnittslinks.

---

## NewsFeeder

**Positionierung:** Focused RSS reader for personally selected sources: calm, searchable,
offline-ready and free from algorithmic recommendations.

**Problem/Loesung:** News und Fachinhalte sind ueber Websites und algorithmische Feeds verteilt.
NewsFeeder sammelt selbst gewaehlte RSS-/Atom-Quellen, bewahrt Lesestatus/Lesezeichen, stellt
Artikel offline bereit und zeigt relevante Inhalte in iPhone-Widgets.

**Zielgruppe:** RSS-Nutzer; Leser vieler News-, Blog- und Fachquellen; Studierende, Entwickler
und Knowledge Worker; datenschutzbewusste Apple-Nutzer; Offline-/Spaeterleser.

**Bestaetigte Funktionen:**

- RSS-/Atom-Feeds hinzufuegen, bearbeiten, loeschen; gemeinsamer Stream.
- Suche in Titel, Inhalt, Autor; Sortierung; Filter fuer ungelesen, Lesezeichen, heute.
- Persistenter Gelesen-Status und Lesezeichen.
- Feed-Farben als Orientierung; zwei Kartenstile inklusive farbintensiver Variante.
- Reader mit Lesezeit/-fortschritt; Typografie, Zeilenabstand, Ausrichtung und Breite einstellbar.
- Teilen und im Browser oeffnen.
- Lokale Feed-/Artikel-Caches, Offline-Preloading und Offline-Archiv.
- iCloud/CloudKit-Sync fuer Feeds, Status, Farben und Lesezeichen.
- Optionale lokale Artikelzusammenfassungen via Apple Foundation Models, nur auf kompatiblen
  Geraeten.
- Home-Screen-Widgets Small/Medium/Large, Lock-Screen-Widget, Artikel-Deep-Links sowie
  Widget-Auswahl nach Feed/Filter.

**Technik:** Native iOS-App; Swift, SwiftUI, SwiftData, WidgetKit, AppIntents, CloudKit,
Foundation Models, lokales Caching.

**Theme:** Calm editorial technology; tiefes Navy/fast Schwarz, Himmelblau, variable Feed-Akzente,
ruhige Typografie, klare Karten, grosszuegige Abstaende, dezente Glasflaechen. Inhalt und Reader
stehen im Mittelpunkt.

- Light accent: `#2F7FD6`
- Dark accent: `#7CC4FF`

**Interaktion:** 2-3 schwebende Artikelkarten ordnen sich beim Scrollen zum iPhone-Feed; eine
Karte morpht in den Reader, der spaeter zur `Now Reading`-Leiste minimiert. Search-Chip markiert
Begriffe, Farbchips wechseln Kartenakzente, danach Widget-Wand. Erzaehlprinzip:
`collect -> filter -> read`.

**Kapitel/Copy:**

- Hero: **Your sources. One focused feed.**
  `Follow the publications you choose, keep articles ready offline, and return to what matters without an algorithm deciding for you.`
- Curate: **Build a feed around the sources you trust.** Feed-Auswahl, Farben, Timeline.
- Find: **Search, filter and pick up where you left off.** Suche, ungelesen, heute, Lesezeichen.
- Read: **A reader designed to stay out of the way.** Reader, Fortschritt, Typografie, Mini-Reader.
- Understand: **Turn long articles into a quick on-device briefing.** Als optional und
  geraeteabhaengig kennzeichnen.
- Widgets: **The next article is already waiting.** Nur iPhone Home/Lock Screen.
- Privacy/Offline: **Your reading flow stays useful when the connection does not.** Cache,
  Offline-Artikel, iCloud.

**Assets:**

- `AppIcons/NF.png`
- `projects/NF/iPhone16-Teal-H.png`
- `projects/NF/AppViews/HomeView.PNG`
- `projects/NF/AppViews/View_Feed_Unread_New_to_Old.PNG`
- `projects/NF/AppViews/View_Feed_Read_New_to_Old.PNG`
- `projects/NF/AppViews/View_Search.PNG`
- `projects/NF/AppViews/View_Settings.PNG`
- Aktuelles Icon:
  `/Users/dyonisosfergadiotis/Projekte/NotiFeeder/NotiFeeder/Assets.xcassets/AppIcon.appiconset/Icon_LG-iOS-Default-1024x1024@1x.png`

---

## PayScope

**Positionierung:** Native iOS workspace connecting shifts, working time, breaks, tips and
expected earnings.

**Problem/Loesung:** Schichtplan, Arbeitszeit, Pausen, Trinkgeld und Monatsverdienst liegen oft
getrennt. PayScope verbindet Tagesfokus, Kalender, Berechnungen und Monatsstatistik; Daten bleiben
lokal nutzbar und koennen via iCloud synchronisieren.

**Zielgruppe:** Schichtarbeiter, Werkstudierende, Teilzeitkraefte; Gastronomie, Einzelhandel,
Pflege, Logistik, Events; Nutzer wechselnder Zeiten/mehrerer Segmente; Menschen, die Zeit,
Trinkgeld und erwarteten Verdienst nachvollziehen wollen.

**Bestaetigte Funktionen:**

- Tageserfassung mit Start/Ende, Segmenten, Notizen; Arbeit, manuell, Urlaub, Feiertag, Krankheit.
- Automatische/manuelle Pausen mit Validierung.
- Stundenlohn oder Monatsgehalt; Tages-/Wochen-/Monatswerte; Brutto/Netto; Zeitkonto.
- Kalender mit Status, Warnungen, Fehlern, Wochenwerten und Trinkgeld.
- 13-Wochen-Rueckschau fuer Urlaub/Krankheit; Feiertagsimport nach Land/Region.
- Statistik: KPIs, Tages-/Monats-/Jahresverlauf, Kategorien; CSV-Monatsexport.
- Lokale Fallback-Speicherung plus iCloud/CloudKit-Sync.
- Live Activity, Dynamic Island und Lock-Screen-Widgets fuer laufende/kommende Schichten.
- Control Center: Schicht starten/beenden, Trinkgeld hinzufuegen, krank markieren.
- App Intents, Akzentfarben, alternative App-Icons.

**Wording-Grenze:** Werte sind berechnet/erwartet auf Basis der Nutzereingaben. Keine Behauptung,
PayScope ersetze offizielle Lohnabrechnung, Steuerberatung oder rechtlich verbindliche Berechnung.

**Technik:** SwiftUI, SwiftData, CloudKit, ActivityKit, WidgetKit, AppIntents, Control Widgets,
Swift Charts, XCTest; kein eigenes Backend.

**Theme:** Atmospheric productivity dashboard; Gruen oder Indigo passend zum Icon; helle/dunkle
atmosphaerische Verlaeufe; subtiles Kalender-/Zeitachsenraster; duenne Borders; starke
Zahlenhierarchie; Rounded-Kennzahlen plus sparsame Serif-Headlines.

- Spacing: `4, 8, 12, 16, 24, 32`
- Kartenradius: `14-18px`; Controls: ca. `12px`
- Material-Oberflaechen mit Kontur und leichtem Akzent-Tint.

**Interaktion:** Hero mit Schicht-Fortschrittsbogen; beim Scrollen steigen verstrichene Zeit und
`earned so far` anhand klar markierter Beispieldaten. Kalender klappt auf und faerbt Kategorien;
Charts zeichnen sich im Viewport; Live-Activity/Dynamic-Island-Demo zeigt Start, Lauf, Abschluss;
Control-Center-Aktionen als kompakte Vorschau.

**Kapitel/Copy:**

- Hero: **See where your shift is going.**
  `Track time, breaks, tips and expected earnings without losing the bigger monthly picture.`
- Today: **One glance for the shift that matters now.** Fortschritt, Zeiten, Rest, Woche, Verdienst.
- Calendar: **Every workday tells part of the month.** Typen, Trinkgeld, Warnungen.
- Calculations: **Rules stay visible instead of disappearing inside a total.** Pausen,
  13-Wochen-Regel, fehlende Historie.
- Statistics: **Turn individual shifts into a useful pattern.** Lohn, Zeitkonto, beste Tage,
  Kategorien, Jahr.
- Live: **Your current shift stays visible outside the app.** Live Activity, Dynamic Island,
  Lock Screen, Control Center.
- Data: **Local first, synced when available.** Lokal, iCloud, CSV.

**Assets/Screenshots:**

- Aktuelles Icon:
  `/Users/dyonisosfergadiotis/Projekte/PayScope/PayScope/Assets.xcassets/AppIcon.appiconset/PayScope-iOS-Default-1024x1024@1x.png`
- `AppIcons/MM.png` ist veraltet; aktuelles gruene Uhr-/Checkmark-Icon verwenden.
- Noch keine Website-Screenshots. Nur echte Screens aufnehmen: Today-Bogen, Monatskalender,
  Day Editor, Statistik/Lohn, Zeitkonto, Live Activity/Dynamic Island, Control Center.

---

## Wetterblatt

**Positionierung:** Privacy-friendly weather journal with understandable, timely forecasts that
remain useful offline.

**Problem/Loesung:** Viele Wetter-Apps zeigen Zahlen ohne klare Relevanz oder Datenfrische.
Wetterblatt rendert zuerst den lokalen Forecast, aktualisiert im Hintergrund, berechnet
Zeitangaben aus der realen Ortszeit und erklaert Regen, Wind, UV, Luft und Pollen in einer ruhigen
deutschsprachigen Journal-Oberflaeche.

**Zielgruppe:** Pendler; Outdoor-, Fahrrad- und Spaziergang-Nutzer; Menschen, die Regenbeginn und
-menge verstehen wollen; Pollenempfindliche; datenschutzbewusste Nutzer; Freunde ruhiger
Alternativen zu datenueberladenen Wetter-Apps.

**Bestaetigte Funktionen:**

- Aktuell/gefuehlt, stuendlich, bis zu 10 Tage, Temperaturspannen.
- Niederschlagsmenge/-wahrscheinlichkeit und kurzfristiger Regen-Nowcast.
- Wind, Feuchte, UV, Sonnenauf/-untergang.
- Hinweise fuer Gewitter, Starkregen, Wind, Hitze, Frost, UV.
- Luftqualitaet; Pollen fuer Erle, Birke, Gras, Beifuss, Olive, Ambrosia je nach Region/Saison.
- Ortssuche, gespeicherte Orte, aktueller Standort; Einheiten fuer Temperatur/Wind/Regen.
- Lokaler Forecast-Cache; letzter Snapshot sofort beim Start.
- Ehrliche Freshness-/Offline-Hinweise; aktuelles Zeitfenster wird nach Ortszeit neu berechnet.
- Home-Widgets fuer aktuell, Stunden, Regen, Woche; Lock-Screen-Varianten; App-Group-Daten.
- Reduzierbare Animationen und barrierearme Typografie.

**Technik/Daten:** Swift 6, SwiftUI, Concurrency/Actors/async-await, Observation, URLSession,
Core Location, MapKit, WidgetKit, Open-Meteo Forecast/Geocoding/Air Quality/Pollen, lokale
JSON-Dokumente fuer Einstellungen/Orte/Cache; kein Backend.

**Theme:** Analog weather journal / modern vintage print; Creme-Papier, feine Borders, dezentes
Grain, grosse Wetterwerte, Serif-Headlines, Monospace-Labels. Nicht glossy oder standardmaessig
iOS-cardy. Palette reagiert auf Sonne/Regen/Nacht/Sturm.

- Paper `#F7F0E4`; Surface `#FBF5EA`; Border `#CDBFAA`; Ink `#2C2218`
- Secondary `#746856`; Rain `#2F73A8`; Wind `#2C817D`; Sun `#B97A18`; UV `#C97A11`

**Interaktion:** Ruhige animierte Wetterszene; Maus/Geraeteneigung verschiebt Sonne, Wolken,
Horizont minimal; Scroll wechselt Morgen/Nachmittag/Nacht; Toggle fuer Sun/Rain/Night; wenige
Regentropfen; wetteradaptive Papierpalette; Forecast wie Druckzeilen; Nowcast-Leiste ab `now`.
Grain statisch/sehr langsam. Reduced Motion: Crossfades.

**Kapitel/Copy:**

- Hero: **Weather that stays honest about time.**
  `A calm forecast for right now, the hours ahead and the days that need a little more planning.`
- Now: **Understand the moment before reading every metric.** Temperatur, Lage, Ortszeit,
  Aktualitaet, Offline.
- Rain: **See when rain starts, not just whether it might.** Nowcast, Menge, Chance, Verlauf.
- Context: **Wind, UV, air and pollen in the context of the day.** Entscheidungshilfen statt nur
  Messwerte.
- Week: **A ten-day outlook built for comparison.** Spannen, Regen, Tagesdetails.
- Offline: **The last forecast remains useful without pretending to be live.** Cache-first,
  Ortszeit, Freshness.
- Widgets: **The forecast becomes part of the home screen.** Aktuell, Stunden, Regen, Woche.

**Assets/Screenshots:**

- Aktuelles Icon:
  `/Users/dyonisosfergadiotis/Projekte/Weather App/Weather App/Assets.xcassets/AppIcon.appiconset/Wetterblatt-iOS-Default-1024x1024@1x.png`
- Noch keine Website-Screenshots. Nur echte Screens aufnehmen: sonniges Home, Regen/Nacht,
  Nowcast, Luft/Pollen, 10 Tage, Orte, Widget-Familie.

---

## Projektkarten

- **NewsFeeder** | `2026 · iOS & Widgets`
  `A focused RSS reader that keeps trusted sources searchable, offline-ready and close at hand through a flexible family of iPhone widgets.`
- **PayScope** | `2026 · iOS App`
  `A shift and earnings companion that connects working time, breaks, tips, calendar planning and monthly insights in one native workspace.`
- **Wetterblatt** | `2026 · iOS & Widgets`
  `A privacy-friendly weather journal with honest freshness states, offline forecasts, rain nowcasts and a warm editorial interface.`

## Umsetzung

1. Zuerst `index.html`, `css/stylesheet.css`, `js/` und NewsFeeder-Basis analysieren.
2. Lokale Aenderungen bewahren; keine fremde Arbeit ueberschreiben.
3. Sichtbares `NotiFeeder` zu `NewsFeeder`; alle NewsFeeder-Mac-/Watch-Bezuege entfernen.
4. Drei eigenstaendige Seiten mit gemeinsamem Navigation-/Footer-System bauen.
5. Hauptseitenkarten inklusive Namen, Icons, Copy und Links aktualisieren.
6. NewsFeeder-Screens verwenden; PayScope/Wetterblatt nur mit echten Screens. Fehlende Slots
   vorbereiten, aber keine falsche UI erfinden.
7. Pro Seite mindestens eine charakteristische sinnvolle Interaktion.
8. Desktop, Mobile, relative GitHub-Pages-Pfade und Reduced Motion testen.
9. Abschliessend geaenderte Dateien sowie fehlende Screenshots/Links nennen.

**Qualitaetsziel:** Kuratiertes Portfolio eines nativen Apple-Plattform-Entwicklers: technisch
glaubwuerdig, visuell eigenstaendig und lebendig, nicht ueberladen.
