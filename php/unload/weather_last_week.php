<?php
require_once '../config.php';
header('Content-Type: application/json; charset=utf-8');

try {
    date_default_timezone_set('Europe/Zurich');

    // Heute
    $today = new DateTimeImmutable('now', new DateTimeZone('Europe/Zurich'));
    $weekday = (int)$today->format('N'); // 1=Mo ... 7=So

    // Start der aktuellen Woche (Montag)
    $currentWeekMonday = $today->modify('-' . ($weekday - 1) . ' days');

    // Vergangene Woche
    $start = $currentWeekMonday->modify('-7 days')->format('Y-m-d');
    $end   = $currentWeekMonday->modify('-1 day')->format('Y-m-d'); // Sonntag

    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT datum, wetter_code FROM Wetter WHERE datum BETWEEN :start AND :end ORDER BY datum ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':start', $start);
    $stmt->bindValue(':end', $end);
    $stmt->execute();

    $weather = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($weather);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>