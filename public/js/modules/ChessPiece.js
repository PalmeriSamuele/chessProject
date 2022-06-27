

export class ChessPiece{
    constructor(nom,color){
        this.nom = nom;
        this.img;   // chemin absolut de l'image
        this.color = color;
        this.toPng();
        this.pos_row;
        this.pos_col;
    }

    // rightMove(){

    // }

    toPng(){
        this.img = "public/img/pieces/"+this.color+this.nom+".png";
    }

    
}