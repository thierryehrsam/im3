<?php
require_once '../config.php';
header('Content-Type: application/json; charset=utf-8');

try {
    date_default_timezone_set('Europe/Zurich');

    $today = new DateTimeImmutable('now', new DateTimeZone('Europe/Zurich'));
    $weekday = (int)$today->format('N'); // 1=Mo ... 7=So
    $currentWeekMonday = $today->modify('-' . ($weekday - 1) . ' days');

    // Vergangene Woche
    $start = $currentWeekMonday->modify('-7 days')->format('Y-m-d');
    $end   = $currentWeekMonday->modify('-1 day')->format('Y-m-d'); // Sonntag

    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "
      SELECT gc.genre_id
      FROM Genre_Chart gc
      WHERE gc.datum BETWEEN :start AND :end
      GROUP BY gc.genre_id
      ORDER BY COUNT(*) DESC
      LIMIT 5
    ";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(':start', $start);
    $stmt->bindValue(':end', $end);
    $stmt->execute();

    // Nur die genre_id-Spalte als flaches Array
    $topGenres = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    echo json_encode($topGenres);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>