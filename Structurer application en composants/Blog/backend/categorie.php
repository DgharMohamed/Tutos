<?php
// 1. Déclarer que la réponse est du JSON
header('Content-Type: application/json');

// 2. Préparer les données (Simulation de BDD)
$categories = [
    ["id" => 1, "nom" => "Développement Web"],
    ["id" => 2, "nom" => "Design UI/UX"]
];

// 3. Convertir le tableau PHP en JSON et l'afficher
echo json_encode($categories);
?>