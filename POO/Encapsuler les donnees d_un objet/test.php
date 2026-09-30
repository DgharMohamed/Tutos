<?php
require 'Encapsulation.php';


$cat = new Categorie(1, "Mohamed");
$cat->setNom("Ne");
echo "<br> Le nom est désormais : " . $cat->getNom();

?>