<?php 

class Humaine{
    public $nom;
    public $age;


        public function __construct($nomInitial, $ageInitial){
            $this->nom = $nomInitial;
            $this->age = $ageInitial;
        }
        public function afficheInfo(){
                echo   "my name is " . $this->nom . " I'm " . $this->age . "years old" ;
        }

 


}

$per = new Humaine("mohamed","23");

$per->afficheInfo();




?>