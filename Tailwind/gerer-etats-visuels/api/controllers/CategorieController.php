<?php
require_once __DIR__ . '/../../backend/classes/GestionCategories.php';
class CategorieController
{
    public function listerCategories(): void {
        header('Content-Type: application/json; charset=utf-8');
        $gestion = new GestionCategorie();
        $categories = $gestion->getAll();
        $resultat = array_map(static function ($categorie): array {
            return [
                'id' => $categorie->getId(),
                'nom' => $categorie->getNom(),
                'couleur' => $categorie->getCouleur(),
                'icone' => $categorie->getIcone(),
            ];
        }, $categories);

        echo json_encode($resultat, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    }
}

$controller = new CategorieController();
$controller->listerCategories();
