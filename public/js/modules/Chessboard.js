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

    
    }
    click(){
        console.log(new_case.pos_row,new_case.pos_col);
    }

    // fonction qui cree le plateau de jeu
    create(){
        
        for (let i = 0; i < this.plateau.length; i++) {
            for (let j = 0; j < this.plateau.length; j++) {
                let img = document.createElement("img");
                img.draggable="true";
                img.src = "";
                img.id = "piece"+i+j
                img.setAttribute("piece","");
                img.addEventListener('dragstart', this.dragStart);

                let new_case = document.createElement("div");

                new_case.appendChild(img);
                new_case.pos_row = i;
                new_case.pos_col = j;
                // new_case.onclick = "this.click()";

                new_case.className+=this.color;
                new_case.className+=" chess_case";

                new_case.addEventListener('click', this.givePos); 

                // drag and drop 
                new_case.addEventListener('drop',  this.drop); 
                new_case.addEventListener('dragover',  this.allowDrop); 
        
                new_case.style.width = this.w_board/8+"px";
                new_case.style.height = this.w_board/8+"px";
                this.board.appendChild(new_case); 
               
                if (j != this.column-1){this.switchColor()}
              
            }
            
        }

    }

// methode qui met a jour le plateau
    update(){
        let domArray = this.toDArray(this.board.children);
        for (let i = 0; i < this.plateau.length; i++) {
            for (let j = 0; j < this.plateau.length; j++) {

                if (this.plateau[i][j] == "pionn"){
                    // on ajoute a chaque fois la proporete oiece qui vaut la piece adequate
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","tour");   
                    domArray[i][j].getElementsByTagName('img')[0].src = this.pion_b.img;

                }else if(this.plateau[i][j] == "pionb"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","pion");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.pion_w.img;

            
                }else if(this.plateau[i][j] == "Tn"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","tour");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.tour_b.img;


                }else if(this.plateau[i][j] == "foub"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","fou");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.fou_w.img;

                }
                else if(this.plateau[i][j] == "Tb"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","tour");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.tour_w.img;

                }
                else if(this.plateau[i][j] == "foun"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","fou");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.fou_b.img;

                }
                else if(this.plateau[i][j] == "chevn"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","chev");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.chev_b.img;

                }
                else if(this.plateau[i][j] == "chevb"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","chev");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.chev_w.img;

                }
                else if(this.plateau[i][j] == "roib"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","roi");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.roi_w.img;

                }
                else if(this.plateau[i][j] == "roin"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","roi");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.roi_b.img;

                }
                else if(this.plateau[i][j] == "reineb"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","reine");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.reine_w.img;

                }
                else if(this.plateau[i][j] == "reinen"){
                    domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","reine");
                    domArray[i][j].getElementsByTagName('img')[0].src = this.reine_b.img;

                }
  
            }
        }
             
    }
    allowDrop(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    }
    dragStart(e) {
        console.log( e.target)
        e.dataTransfer.setData('text', e.target.id);
        e.dataTransfer.dropEffect = "move";
        console.log("drag over");
    }
    drop(e) {


        e.preventDefault();
        console.log("drag down");
        // get the draggable element
        const id = e.dataTransfer.getData("text/plain");
        e.dataTransfer.dropEffect = "move";
        const draggable = document.getElementById(id);
        // console.log(e.target)
        // console.log(draggable);
        // add it to the drop target
        console.log(draggable);
        e.target.appendChild(draggable);
    

        // let parent = e.target.parentNode;
        // parent.getElementsByTagName("img")[0].src="";
        // console.log("parent",parent);

        
    }

    givePos(){
       console.log(this.pos_col,this.pos_row);
       console.log(this);
    }

    switchColor(){
        this.color ? this.color = false : this.color = true;
    }
    
    toDArray(liste){
        let ret = [];
        let array = [];
        for (let i = 0; i < liste.length+1; i++) {
            if(i%8 == 0 & i!= 0){
                ret.push(array);
                array = []; 
            }
            array.push(liste[i]);
        }
  
        return ret;
    }

}

