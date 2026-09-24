<?php
class Categorie {
    private string $nom; 

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

$cat = new Categorie();
$cat->setNom("Mohamed"); 
$cat->setNom("Ne"); 
echo "<br> Le nom est désormais : " . $cat->getNom();
?>