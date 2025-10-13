<?php
require_once '../config.php';
header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "
        SELECT 
            G.name_id AS genre_name,
            G.farb_code AS color,
            GC.datum,
            W.wetter_code,
            W.temperatur_min,
            W.temperatur_max,
            COUNT(GC.id) AS anzahl
        FROM Genre_Chart GC
        JOIN Genre G ON G.name_id = GC.genre_id
        JOIN Wetter W ON W.datum = GC.datum
        GROUP BY G.name_id, G.farb_code, GC.datum, W.wetter_code, W.temperatur_min, W.temperatur_max
        ORDER BY G.name_id, GC.datum
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Gruppieren nach Genre
    $genres = [];
    foreach ($rows as $row) {
        $genreName = $row['genre_name'];
        if (!isset($genres[$genreName])) {
            $genres[$genreName] = [
                'name' => $genreName,
                'color' => $row['color'],
                'weather_data' => []
            ];
        }

        $genres[$genreName]['weather_data'][] = [
            'datum' => $row['datum'],
            'anzahl' => (int)$row['anzahl'],
            'wetter_code' => $row['wetter_code'],
            'temperatur_min' => (float)$row['temperatur_min'],
            'temperatur_max' => (float)$row['temperatur_max']
        ];
    }

    echo json_encode(array_values($genres));

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>