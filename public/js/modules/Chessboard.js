import { ChessPiece } from "./ChessPiece.js";

export class Chessboard{
    constructor(w_board){
        this.w_board = w_board;
        this.board = document.getElementById('echequier');
        this.board.style.width = this.w_board+17+"px";
        this.column = 8;
        this.row = "abcdefgh";
        this.color = false;

        this.plateau = [["Tn","chevn","foun","roin","reinen","foun","chevn","Tn"],["pionn","pionn","pionn","pionn","pionn","pionn","pionn","pionn"],[],[],[],[],["pionb","pionb","pionb","pionb","pionb","pionb","pionb","pionb"],["Tb","chevb","foub","roib","reineb","foub","chevb","Tb"]];
        this.pion_b = new ChessPiece('pion','b');
        this.pion_w = new ChessPiece('pion','w');
        this.tour_b = new ChessPiece('tour','b');
        this.tour_w = new ChessPiece('tour','w');
        this.fou_b = new ChessPiece('fou','b');
        this.fou_w = new ChessPiece('fou','w');
        this.chev_b = new ChessPiece('chev','b');
        this.chev_w = new ChessPiece('chev','w');
        this.roi_b = new ChessPiece('roi','b');
        this.roi_w = new ChessPiece('roi','w');
        this.reine_b = new ChessPiece('reine','b');
        this.reine_w = new ChessPiece('reine','w');
        this.img;
        this.new_case;
     
    }

    update(){
        
        for (let i = 0; i < this.plateau.length; i++) {
            for (let j = 0; j < this.plateau.length; j++) {
                this.new_case = document.createElement("div");
                
                this.img = document.createElement("img");
                this.img.id = `piece[${i}][${j}]`; 
                this.img.draggable="true";
                //this.img.ondragstart="this.dragStart(this)";
                this.img.addEventListener('dragstart', this.dragStart);
   
                this.img.className+="piece_img"

                if (this.plateau[i][j] == "pionn"){
                    
                    this.img.src = this.pion_b.img;
                    this.new_case.appendChild(this.img);
                }else if(this.plateau[i][j] == "pionb"){
                                    
                
                    this.img.src = this.pion_w.img;
                    this.new_case.appendChild(this.img);
            
                }else if(this.plateau[i][j] == "Tn"){
                  
                    this.img.src = this.tour_b.img;
                    this.new_case.appendChild(this.img);
                }else if(this.plateau[i][j] == "foub"){
                    
                    this.img.src = this.fou_w.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "Tb"){
                    this.img.src = this.tour_w.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "foun"){
                    this.img.src = this.fou_b.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "chevn"){
            
                    this.img.src = this.chev_b.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "chevb"){
                
                    this.img.src = this.chev_w.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "roib"){
              
                    this.img.src = this.roi_w.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "roin"){
                 
                    this.img.src = this.roi_b.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "reineb"){
                
                    this.img.src = this.reine_w.img;
                    this.new_case.appendChild(this.img);
                }
                else if(this.plateau[i][j] == "reinen"){
               
                    this.img.src = this.reine_b.img;
                    this.new_case.appendChild(this.img);
                }

                this.new_case.className+=this.color;
                this.new_case.className+=" chess_case";
                this.new_case.addEventListener('ondrop',  this.drop); 
                this.new_case.addEventListener('ondragover',  this.allowDrop); 
                // this.new_case.onfocus = this.focus();
                this.new_case.style.width = this.w_board/8+"px";
                this.new_case.style.height = this.w_board/8+"px";
                this.board.appendChild(this.new_case); 
               
                if (j != this.column-1){this.switchColor()}
                this.plateau[i][j] = this.new_case;
            }
            
        }
        console.log(this.plateau);
    }
    allowDrop(ev) {
        ev.preventDefault();
        }
    dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        console.log("drag over");
    }
    drop(e) {
    
        // get the draggable element
        const id = ev.dataTransfer.getData("text");
        const draggable = document.getElementById(id);
    
        // add it to the drop target
        e.target.appendChild(draggable);
    
        // display the draggable element
        draggable.classList.remove('hide');
        console.log("drag down");
    }

    focus(){
        this.new_case.style.border="2px solid orange";
    }

    switchColor(){
        this.color ? this.color = false : this.color = true;
    }





}

