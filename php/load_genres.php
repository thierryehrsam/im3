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


$data = include('transform_genres.php');
// Binde die Datenbankkonfiguration ein
require_once 'config.php';

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL mit Platzhaltern (datum wird per CURDATE() gesetzt)
    $sql = "INSERT INTO Genre_Chart (genre_id, datum)
            VALUES (:genre_id, CURDATE())";

    $stmt = $pdo->prepare($sql);

    // Jedes Genre in die DB einfügen
    foreach ($data as $genreName) {
        $stmt->execute([
            ':genre_id' => $genreName
        ]);
    }

    echo "Daten erfolgreich eingefügt.";

} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>