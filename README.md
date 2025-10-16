# IM3 Dokumentation Projektarbeit
### von Thierry Ehrsam und Benjamin Zuberühler
---

 **Website** ➡️ [MetaBeats](https://mmpim3.thierryehrsam.ch)

 ---

## Kurzbeschreibung des Projekts

Diese Seite untersucht, ob das Wetter in der Schweiz Einfluss auf die gehörten Musikgenres hat. Dafür kombinieren wir Wetterdaten von Open-Meteo mit den beliebtesten Artists von Last.fm und leiten daraus die meistgehörten Genres ab. Jede Woche zeigen wir das Wetter im Vergleich zu den Top-Genres. Ebenfalls sind die meistgehörten Genres pro Wetter und die Entwicklung von verschiedenen Genres aufrufbar.

**Beispiel**

Wenn es beispielsweise eine Woche lang sonnig ist, zeigt die Seite, ob in dieser Zeit vermehrt fröhliche oder energiegeladene Genres wie Pop oder Dance gehört wurden – im Vergleich zu Regenwochen, in denen ruhigere Genres dominieren könnten.

**API's**

- Open-Meteo API – liefert Wetterdaten (Temperatur, Niederschlag, etc.)
- Last.fm API – liefert Musik-Trends und Top-Genres
- Eigene Datenbank – speichert und aggregiert die API-Daten

**zukünftige Erweiterungsmöglichkeiten**
- Vergleich zwischen verschiedenen Regionen oder Jahreszeiten
- Erweiterung um weitere APIs (z. B. Spotify, Air Quality)
- Wettervorhersage (und mögliche TopGenres vorhersehen)
- Zeitraum der Daten manuell definieren

**Hinweis / Coachinginputs**
Mit Beni haben wir besprochen, dass wir die gespeicherten Daten möglichst einfach und minimalisitisch halten sollen, weshalb wir die meisten Daten nach dem Transform wieder verwerfen und nicht in unserer Datenbank speichern. Auch die Berechnung des Wetters haben wir auf Anweisung sehr stark vereinfacht.

---

## Learnings und Schwierigkeiten Beni 


## Learnings und Schwierigkeiten Thierry


---
## Benutzte Ressourcen und Prompts 
GitHub Copilot: Hat geholfen, einfache Strukturaufgaben zu übernehmen und bei kleineren Darstellungsfehlern unterstützt.

ChatGPT: Wurde eingesetzt, um komplexere Themen und Probleme aufzuzeigen, verständlich zu erklären und um Lösungsvorschläge zu erarbeiten.

---

## Anforderungen
Kurzbeschreibung des Projekts mit folgenden Themen:
- Kurzbeschreibung des Projekts (max. 500 Zeichen)
- Learnings und Schwierigkeiten (max. 200 Zeichen pro Person)
- benutzte Ressourcen und Prompts

**Bewertungsraster Technik**
Punkte für Prozesserfüllung
- API wird abgerufen (extract) (3)
- Daten werden transformiert (transform → bereinigt, aggregiert, generiert) (3)
- Daten werden in eigene Datenbank geschrieben (load) (3)
- Daten werden aus eigener Datenbank gelesen (unload) (3)
- DOM wird dynamisch manipuliert (2)
- Daten werden in geeigneten Datenformat dargestellt (2)
- Datenvisualisierung erstellt (2)

Punkte für Codequalität
- HTML, CSS valide (1)
- Responsive (3)
- Javascript und PHP logisch strukturiert (3)
- Javascript und PHP Effizienz (Schleifen und Variablen clever eingesetzt) (3)
- Wiederverwendbarkeit (Funktionen mit Variablen Übergabe) (2)
- Datenbank logisch aufgebaut (2)
- Verbindungen zur Datenbank gesichert (2)


