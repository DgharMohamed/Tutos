<?php
require_once __DIR__ . '/../../backend/classes/GestionCategories.php';
class CategorieController
{
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

        // 2. Déclaration de la responsabilité de la réponse
        header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: *'); // Pratique pour le dev local

        // 3. Renvoi des données brutes
        echo json_encode($data);
    }
}


$controller = new CategorieController();
$controller->listerCategories();
