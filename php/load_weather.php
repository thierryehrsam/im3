<?php
/* ============================================================================
   HANDLUNGSANWEISUNG (load.php)
   1) Binde 001_config.php (PDO-Config) ein.
   2) Binde transform.php ein → erhalte TRANSFORM-JSON.
   3) json_decode(..., true) → Array mit Datensätzen.
   4) Stelle PDO-Verbindung her (ERRMODE_EXCEPTION, FETCH_ASSOC).
   5) Bereite INSERT/UPSERT-Statement mit Platzhaltern vor.
   6) Iteriere über Datensätze und führe execute(...) je Zeile aus.
   7) Optional: Transaktion verwenden (beginTransaction/commit) für Performance.
   8) Bei Erfolg: knappe Bestätigung ausgeben (oder still bleiben, je nach Kontext).
   9) Bei Fehlern: Exception fangen → generische Fehlermeldung/Code (kein Stacktrace).
  10) Keine Debug-Ausgaben in Produktion; sensible Daten nicht loggen.
   ============================================================================ */


// Transformations-Skript  als 'transform.php' einbinden
$data = include('transform_weather.php');

// Binde die Datenbankkonfiguration ein
require_once 'config.php';

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO Wetter 
    (temperatur_min, temperatur_max, bewoelkung, niederschlagsmenge, schneefall, datum)
    VALUES (:temperatur_min, :temperatur_max, :bewoelkung, :niederschlagsmenge, :schneefall, :datum)";

    //Bereitet SQL vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
    foreach ($data as $row) {
        $stmt->execute([
            ':temperatur_min'     => $row['temperatur_min'],
            ':temperatur_max'     => $row['temperatur_max'],
            ':bewoelkung'         => $row['bewoelkung'],
            ':niederschlagsmenge' => $row['niederschlagsmenge'],
            ':schneefall'         => $row['schneefall'],
            ':datum'              => $row['datum']
        ]);
    }

    echo "Daten erfolgreich in die Tabelle 'Wetter' eingefügt.";

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
