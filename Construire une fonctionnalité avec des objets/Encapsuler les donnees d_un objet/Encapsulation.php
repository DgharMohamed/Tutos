<?php
class Categorie {
    private int $id;
    private string $nom;

    public function __construct(int $id, string $nom) {
        $this->id = $id;
        $this->setNom($nom);
    }

    public function getId(): int {
        return $this->id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getNom(): string {
        return $this->nom;
    }

    public function setNom(string $nouveauNom): void {
        if (strlen($nouveauNom) > 2) {
            $this->nom = $nouveauNom;
        } else {
            echo "Erreur : Nom trop court !<br>";
        }
    }
}

?>
