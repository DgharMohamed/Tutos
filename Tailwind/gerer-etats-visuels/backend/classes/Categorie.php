<?php   
    class Categorie{
        private $id;
        private $nom;
        private $couleur;
        private $icone;

        public function __construct($id=null,$nom="",$couleur="",$icone="")  {
            $this->id=$id;
            $this->nom=$nom;
            $this->couleur=$couleur;
            $this->icone=$icone;
        }

        public function getId() : int {
            return $this->id;
        }
        public function getNom() : string {
            return $this->nom;
        }
        public function getCouleur() : string {
            return $this->couleur;
        }
        public function getIcone() : string {
            return $this->icone;
        }
    }
?>