<?php

/* ============================================================================
   HANDLUNGSANWEISUNG (transform.php)
   0) Schau dir die Rohdaten genau an und plane exakt, wie du die Daten umwandeln möchtest (auf Papier)
   1) Binde extract.php ein und erhalte das Rohdaten-Array.
   2) Definiere Mapping Koordinaten → Anzeigename (z. B. Bern/Chur/Zürich).
   3) Konvertiere Einheiten (z. B. °F → °C) und runde sinnvoll (Celsius = (Fahrenheit - 32) * 5 / 9).
   4) Leite eine einfache "condition" ab (z. B. sonnig/teilweise bewölkt/bewölkt/regnerisch).
   5) Baue ein kompaktes, flaches Array je Standort mit den Ziel-Feldern.
   6) Optional: Sortiere die Werte (z. B. nach Zeit), entferne irrelevante Felder.
   7) Validiere Pflichtfelder (location, temperature_celsius, …).
   8) Kodieren: json_encode(..., JSON_PRETTY_PRINT) → JSON-String.
   9) GIB den JSON-String ZURÜCK (return), nicht ausgeben – für den Load-Schritt.
  10) Fehlerfälle als Exception nach oben weiterreichen (kein HTML/echo).
   ============================================================================ */

$topArtists = include('extract_top_tags.php'); // Array mit Artists + ihren Top-Tags
$genresDb = include('unload_genres.php');      // Array mit verfügbaren Genres (Strings)

// --- Transformation der Daten ---
$genres = [];

foreach ($topArtists as $artistData) {
    $foundGenre = 'Sonstige'; // Default-Wert

    // Prüfen, ob toptags->tag existiert
    if (
        !isset($artistData['toptags']) ||
        !isset($artistData['toptags']['tag']) ||
        !is_array($artistData['toptags']['tag'])
    ) {
        $genres[] = $foundGenre;
        continue;
    }

    // Jetzt korrekt auf die Tags zugreifen
    foreach ($artistData['toptags']['tag'] as $tag) {
        if (!isset($tag['name'])) continue;
        $tagName = $tag['name'];
        $tagPrefix = substr($tagName, 0, 3);

        foreach ($genresDb as $dbGenre) {
            $dbPrefix = substr(strtolower($dbGenre['name_id']), 0, 3);

            if ($tagPrefix === $dbPrefix) {
                $foundGenre = $dbGenre['name_id'];
                break 2; // Match gefunden → zum nächsten Artist
            }
        }
    }

    $genres[] = $foundGenre;
}

return $genres;
?>