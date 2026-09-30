<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}


$fichier = __DIR__ . '/data.json';

function lireCategories(string $fichier): array
{
    if (!file_exists($fichier)) {
        return [];
    }

    $donnees = json_decode(file_get_contents($fichier), true);

    return is_array($donnees) ? $donnees : [];
}

function ecrireCategories(string $fichier, array $categories): void
{
    file_put_contents($fichier, json_encode($categories, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function lireCorps(): array
{
    $donnees = json_decode(file_get_contents('php://input'), true);

    return is_array($donnees) ? $donnees : [];
}

function repondre(array $donnees, int $code = 200): void
{
    http_response_code($code);
    echo json_encode($donnees);
    exit;
}

$categories = lireCategories($fichier);

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':
        repondre(['success' => true, 'data' => $categories]);

    case 'POST':
        $corps = lireCorps();
        $nom = trim($corps['nom'] ?? '');

        if ($nom === '') {
            repondre(['success' => false, 'message' => 'Le nom est obligatoire.'], 422);
        }

        $nouvelle = [
            'id' => $categories ? max(array_column($categories, 'id')) + 1 : 1,
            'nom' => $nom,
            'couleur' => $corps['couleur'] ?? '#000000',
            'icone' => trim($corps['icone'] ?? ''),
        ];

        $categories[] = $nouvelle;
        ecrireCategories($fichier, $categories);

        repondre(['success' => true, 'data' => $nouvelle], 201);

    case 'PUT':
        $corps = lireCorps();
        $id = (int) ($corps['id'] ?? 0);
        $index = array_search($id, array_column($categories, 'id'));

        if ($index === false) {
            repondre(['success' => false, 'message' => 'Categorie introuvable.'], 404);
        }

        $nom = trim($corps['nom'] ?? '');

        if ($nom === '') {
            repondre(['success' => false, 'message' => 'Le nom est obligatoire.'], 422);
        }

        $categories[$index]['nom'] = $nom;
        $categories[$index]['couleur'] = $corps['couleur'] ?? $categories[$index]['couleur'];
        $categories[$index]['icone'] = trim($corps['icone'] ?? $categories[$index]['icone']);

        ecrireCategories($fichier, $categories);

        repondre(['success' => true, 'data' => $categories[$index]]);

    case 'DELETE':
        $corps = lireCorps();
        $id = (int) ($corps['id'] ?? $_GET['id'] ?? 0);
        $index = array_search($id, array_column($categories, 'id'));

        if ($index === false) {
            repondre(['success' => false, 'message' => 'Categorie introuvable.'], 404);
        }

        array_splice($categories, $index, 1);
        ecrireCategories($fichier, $categories);

        repondre(['success' => true, 'id' => $id]);

    default:
        repondre(['success' => false, 'message' => 'Methode non autorisee.'], 405);
}
