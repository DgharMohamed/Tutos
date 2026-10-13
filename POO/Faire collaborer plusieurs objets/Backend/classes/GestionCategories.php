<?php

require_once __DIR__ . '/Categorie.php';

class GestionCategorie
{
    public function getAll(): array
    {
        return [
            new Categorie(1, "Développement Web", "blue", "fa-code"),
            new Categorie(2, "Design", "pink", "fa-paint-brush")
        ];
    }
}

?>