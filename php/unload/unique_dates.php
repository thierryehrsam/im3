<?php
require_once '../config.php';
header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT DISTINCT datum FROM Genre_Chart ORDER BY datum ASC";
    $stmt = $pdo->prepare($sql);
    $stmt->execute();

    // Nur die Datumsspalte als flaches Array
    $dates = $stmt->fetchAll(PDO::FETCH_COLUMN, 0);

    echo json_encode($dates);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>