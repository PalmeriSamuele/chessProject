import { ChessPiece } from "./ChessPiece.js";

export class Chessboard{
    constructor(w_board){
        this.w_board = w_board;
        this.board = document.getElementById('echequier');
        this.board.style.width = this.w_board+17+"px";
        this.board.style.height = this.w_board+17+"px";
        this.column = 8;
        this.row = "abcdefgh";
        this.color = false;
        
     
    }

    create(){
        let pion_b = new ChessPiece('pion','b');
        let pion_w = new ChessPiece('pion','w');
        let tour_b = new ChessPiece('tour','b');
        let tour_w = new ChessPiece('tour','w');
        let fou_b = new ChessPiece('fou','b');
        let fou_w = new ChessPiece('fou','w');
        let chev_b = new ChessPiece('chev','b');
        let chev_w = new ChessPiece('chev','w');
        let roi_b = new ChessPiece('roi','b');
        let roi_w = new ChessPiece('roi','w');
        let reine_b = new ChessPiece('reine','b');
        let reine_w = new ChessPiece('reine','w');
        let img;
        for (let i = 0; i < this.row.length; i++) {
            for (let j = 0; j < this.column; j++) {
                let new_case = document.createElement("div");
                if (i==1){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = pion_b.img;
                    new_case.appendChild(img);
                }else if(i==6){
                                    
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = pion_w.img;
                    new_case.appendChild(img);
            
                }else if(i==0 & j==0 || i==0 & j==7){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = tour_b.img;
                    new_case.appendChild(img);
                }else if(i==7 & j==2 || i==7 & j==5){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = fou_w.img;
                    new_case.appendChild(img);
                }
                else if(i==7 & j==0 || i==7 & j==7){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = tour_w.img;
                    new_case.appendChild(img);
                }
                else if(i==0 & j==2 || i==0 & j==5){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = fou_b.img;
                    new_case.appendChild(img);
                }
                else if(i==0 & j==1 || i==0 & j==6){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = chev_b.img;
                    new_case.appendChild(img);
                }
                else if(i==7 & j==1 || i==7 & j==6){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = chev_w.img;
                    new_case.appendChild(img);
                }
                else if(i==7 & j==3){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = roi_w.img;
                    new_case.appendChild(img);
                }
                else if(i==0 & j==3){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = roi_b.img;
                    new_case.appendChild(img);
                }
                else if(i==7 & j==4){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = reine_w.img;
                    new_case.appendChild(img);
                }
                else if(i==0 & j==4){
                    img = document.createElement("img");
                    img.className+="piece_img"
                    img.src = reine_b.img;
                    new_case.appendChild(img);
                }
            
            
                
                new_case.className+=this.color;
                new_case.className+=" chess_case";
                new_case.style.width = this.w_board/8+"px";
                new_case.style.height = this.w_board/8+"px";
            
                this.board.appendChild(new_case); 
                if (j != this.column-1){this.switchColor()}
            
                
            }
            
        }
    }


   

    switchColor(){
        this.color ? this.color = false : this.color = true;
    }


}