<?php
require_once '../backend/classes/GestionCategorie.php';
header('Content-Type: application/json');
class CategorieController {
    public function listerCategories(): void {
        $gestion = new GestionCategorie();
        $categories = $gestion->getAll();
        $data = [];
        foreach ($categories as $cat) {
            $data[] = [
                'id' => $cat->getId(),
                'nom' => $cat->getNom(),
                'couleur' => $cat->getCouleur(),
                'icone' => $cat->getIcone()
            ];
        }
        echo json_encode($data);
    }

    public function ajouterCategorie(string $nom, string $couleur, string $icone): void {
        $gestion = new GestionCategorie();
        $categorie = $gestion->createCategorie($nom, $couleur, $icone);
        echo json_encode($gestion->getAll());
    }
}

$controller = new CategorieController();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $nom = $data['nom'] ?? '';
    $couleur = $data['couleur'] ?? '';
    $icone = $data['icone'] ?? '';
    $controller->ajouterCategorie($nom, $couleur, $icone);
    
}

else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $controller->listerCategories();
}
?>