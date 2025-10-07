<?php
/* ============================================================================
   HANDLUNGSANWEISUNG (unload.php)
   1) Setze Header: Content-Type: application/json; charset=utf-8.
   2) Binde 001_config.php (PDO-Config) ein.
   3) Lies optionale Request-Parameter (z. B. location, limit, from/to) und validiere.
   4) Baue SELECT mit PREPARED STATEMENT (WHERE/ORDER BY/LIMIT je nach Parametern).
   5) Binde Parameter sicher (execute([...]) oder bindValue()).
   6) Hole Datensätze (fetchAll) – optional gruppieren/umformen fürs Frontend.
   7) Antworte IMMER als JSON (json_encode) – auch bei leeren Treffern ([]) .
   8) Setze sinnvolle HTTP-Statuscodes (400 für Bad Request, 404 bei 0 Treffern (Detail), 200 ok).
   9) Fehlerfall: 500 + { "error": "..." } (keine internen Details leaken).
  10) Keine HTML-Ausgabe; keine var_dump in Prod.
   ============================================================================ */


require_once 'config.php'; // Stellen Sie sicher, dass dies auf deine tatsächliche Konfigurationsdatei verweist

try {
   $pdo = new PDO($dsn, $username, $password, $options);

   $sql = "SELECT * FROM `Genre`";

   $stmt = $pdo->prepare($sql);
   $stmt->execute();

   $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

   return $data;
} catch (PDOException $e) {
   echo json_encode(['error' => $e->getMessage()]);
}
?>