export class ChessPiece{
    constructor(nom,color){
        this.nom = nom;
        this.img;   // chemin absolut de l'image
        this.color = color;
        this.toPng();
    }

    // rightMove(){

    // }

    toPng(){
        this.img = "public/img/pieces/"+this.color+this.nom+".png";
        console.log(this.img);
    }
}