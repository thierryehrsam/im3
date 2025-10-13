<?php
require_once '../config.php';
header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = new PDO($dsn, $username, $password, $options);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "
        SELECT wetter_code, genre_id AS name, cnt AS anzahl
        FROM (
            SELECT 
                WC.name_id AS wetter_code,
                GC.genre_id,
                COUNT(GC.id) AS cnt,
                ROW_NUMBER() OVER (PARTITION BY WC.name_id ORDER BY COUNT(GC.id) DESC) AS rn
            FROM Wetter_Code WC
            LEFT JOIN Wetter W ON W.wetter_code = WC.name_id
            LEFT JOIN Genre_Chart GC ON GC.datum = W.datum
            GROUP BY WC.name_id, GC.genre_id
        ) ranked
        WHERE rn <= 5 OR rn IS NULL
        ORDER BY wetter_code, anzahl DESC
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Nach wetter_code gruppieren
    $grouped = [];
    foreach ($rows as $row) {
        $code = $row['wetter_code'];
        if (!isset($grouped[$code])) {
            $grouped[$code] = [
                'wetter_code' => $code,
                'top_genres' => []
            ];
        }

        if (!empty($row['name'])) {
            $grouped[$code]['top_genres'][] = [
                'name' => $row['name'],
                'anzahl' => (int)$row['anzahl']
            ];
        }
    }

    // alle wetter_codes mit leerem Array erhalten
    $result = array_values($grouped);

    echo json_encode($result);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>