# IM3 Dokumentation Projektarbeit
### von Thierry Ehrsam und Benjamin Zuberühler
---

 **Website** ➡️ [MetaBeats](https://mmpim3.thierryehrsam.ch)

 ---

## Kurzbeschreibung des Projekts
Diese Seite untersucht, ob das Wetter in der Schweiz Einfluss auf die gehörten Musikgenres hat. Dafür kombinieren wir Wetterdaten von Open-Meteo mit den beliebtesten Artists von Last.fm und leiten daraus die meistgehörten Genres ab. Jede Woche zeigen wir das Wetter im Vergleich zu den Top-Genres. Ebenfalls sind die meistgehörten Genres pro Wetter und die tägliche Entwicklung von verschiedenen Genres aufrufbar.

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

## Learnings und Schwierigkeiten Beni 
Das finden einer passenden Musik-API hat viel mehr Aufwand in Anspruch genommen als erwartet, da die gelieferten Daten meist zu komplex oder undurchsichtig aufgeteilt waren. Beim Erstellen der animierten, aufklappbaren Boxen mittels CSS und Javascript konnte ich (trotz anfänglichen Schwierigkeiten) einige neue Möglichkeiten von animierten Website-Elementen entdecken und erlernen.

## Learnings und Schwierigkeiten Thierry
Mit PHP und damit der Backend-Logik hatte ich nicht so grosse Schwierigkeiten, weil ich bereits viel mit grösseren Datenmengen in meiner Zeit als Informatik gearbeitet hatte. Viel gelernt habe ich im Frontend. Besonders knifflig war es, dass die Seitenpanels nur im Desktop so angezeigt werden und auf Mobile untereinander nicht aufklappbar dargestellt werden. Dies hat für mich den grössten Teil ausgemacht und musste mit viel Logik und CSS gelöst werden. Eine grosse Hilfe war hier ChatGPT, mit dem ich schrittweise (zuerst nur als PoC) zur richtigen Lösung kam.

## Benutzte Ressourcen und Prompts 
GitHub Copilot: Hat geholfen, einfache Strukturaufgaben zu übernehmen und bei kleineren Darstellungsfehlern unterstützt.

ChatGPT: Wurde eingesetzt, um komplexere Themen und Probleme aufzuzeigen, verständlich zu erklären und um Lösungsvorschläge zu erarbeiten. Bei komplexeren Dingen musste Schritt für Schritt vorgegangen werden, da es immer noch Mühe hat, grosse Probleme auf einmal zu lösen. Aber wenn man nach und nach die Komplexität steigerte, war es ein enorm nützliches Tool. 