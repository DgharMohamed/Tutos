<?php
    require_once "Categorie.php";
    class GestionCategorie{
        private static $dataFile = "../data/categorie.json";

        public function getAll():array{
            $categories = [];
            if(file_exists(self::$dataFile)){
                $jsonData = file_get_contents(self::$dataFile);
                $categoriesData = json_decode($jsonData, true);
                foreach($categoriesData as $categorieData){
                    $categorie = new Categorie($categorieData['id'], $categorieData['nom'] , $categorieData['couleur'], $categorieData['icone']);
                    $categories[] = $categorie;
                }
            }
            return $categories;
        }
        
        public function createCategorie($nom, $couleur, $icone):Categorie{
            $categories = $this->getAll();
            $id = count($categories) + 1;
            $categorie = new Categorie($id, $nom, $couleur, $icone);
            $categories[] = $categorie;
            file_put_contents(self::$dataFile, json_encode(array_map(function($categorie){
                return [
                    'id' => $categorie->getId(),
                    'nom' => $categorie->getNom(),
                    'couleur' => $categorie->getCouleur(),
                    'icone' => $categorie->getIcone()
                ];
            }, $categories)));
            return $categorie;
        }

        public function updateCategorie($id, $nom, $couleur, $icone):bool{
            $categories = $this->getAll();
            foreach($categories as $categorie){
                if($categorie->getId() == $id){
                    $categorie->setNom($nom);
                    $categorie->setCouleur($couleur);
                    $categorie->setIcone($icone);
                    file_put_contents(self::$dataFile, json_encode(array_map(function($categorie){
                        return [
                            'id' => $categorie->getId(),
                            'nom' => $categorie->getNom(),
                            'couleur' => $categorie->getCouleur(),
                            'icone' => $categorie->getIcone()
                        ];
                    }, $categories)));
                    return true;
                }
            }
            return false;
        }

        public function deleteCategorie($id):bool{
            $categories = $this->getAll();
            foreach($categories as $index => $categorie){
                if($categorie->getId() == $id){
                    unset($categories[$index]);
                    file_put_contents(self::$dataFile, json_encode(array_map(function($categorie){
                        return [
                            'id' => $categorie->getId(),
                            'nom' => $categorie->getNom(),
                            'couleur' => $categorie->getCouleur(),
                            'icone' => $categorie->getIcone()
                        ];
                    }, $categories)));
                    return true;
                }
            }
            return false;
        }
    }
?>