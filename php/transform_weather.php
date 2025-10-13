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

// Bindet das Skript extract.php für Rohdaten ein und speichere es in $data
$data = include('extract_weather.php'); // lädt Rohdaten aus extract.php

if (!$data || !isset($data['daily'])) {
    die("Fehler: Keine gültigen Wetterdaten gefunden.");
}

$daily = $data['daily'];

// --- Transformation der Daten ---
$transformedData = [];

foreach ($daily['time'] as $i => $datum) {
    $tempMax = round($daily['temperature_2m_max'][$i], 1);
    $tempMin = round($daily['temperature_2m_min'][$i], 1);

    if ($daily['snowfall_sum'][$i] > 0) {
        $wetter_code = "schnee";
    } else if ($daily['precipitation_sum'][$i] > 3.0) {
        $wetter_code = "regen";
    } else if ($daily['cloud_cover_mean'][$i] > 50) {
        $wetter_code = "bewoelkt";
    } else {
        $wetter_code = "sonnig";
    }

    $transformedData[] = [
        'temperatur_min'     => $tempMin,
        'temperatur_max'     => $tempMax,
        'wetter_code'        => $wetter_code,
        'datum'              => $datum
    ];
}

print_r($transformedData);
return $transformedData;
?>