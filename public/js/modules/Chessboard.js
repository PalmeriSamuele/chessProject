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

        this.domArray ;
    
    }

    // fonction qui cree le plateau de jeu
    create(){
        
        for (let i = 0; i < this.plateau.length; i++) {
            for (let j = 0; j < this.plateau.length; j++) {
                // let img = document.createElement("img");
                // img.draggable="true";
                // img.src = "";
                // img.id = "piece"+i+j;

    
                // img.setAttribute("piece","");
                // img.addEventListener('dragstart', this.dragStart);

                let new_case = document.createElement("div");

                new_case.pos_row = i;
                new_case.pos_col = j;
                // new_case.onclick = "this.click()";

                new_case.className+=this.color;
                new_case.className+=" chess_case";

                new_case.addEventListener('click', this.possibleMoves);  // click sur une image _ retrour sa position et la piece

                // drag and drop 
                new_case.addEventListener('drop',  this.drop); 
                new_case.addEventListener('dragover',  this.allowDrop); 
        
                new_case.style.width = this.w_board/8+"px";
                new_case.style.height = this.w_board/8+"px";
                this.board.appendChild(new_case); 
               
                if (j != this.column-1){this.switchColor()}
              
            }
            
        }
        this.domArray = toDArray(this.board.children);   // on met sous le format [[]...]
       
    }

// methode qui met a jour le plateau
    update(){

        for (let i = 0; i < this.plateau.length; i++) {
            for (let j = 0; j < this.plateau.length; j++) {

                let img = document.createElement("img");
                img.draggable="true";
                img.src = "";
                img.id = "piece"+i+j;
               
                img.setAttribute("piece","");
                img.setAttribute("color","");
                img.addEventListener('dragstart', this.dragStart);

                if (this.plateau[i][j] == "pionn"){
                    // on ajoute a chaque fois la proporete oiece qui vaut la piece adequate
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","tour");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","black");    
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.pion_b.img;
                    

                }else if(this.plateau[i][j] == "pionb"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","pion");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","white");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.pion_w.img;

            
                }else if(this.plateau[i][j] == "Tn"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","tour");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","black");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.tour_b.img;


                }else if(this.plateau[i][j] == "foub"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","fou");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","white");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.fou_w.img;

                }
                else if(this.plateau[i][j] == "Tb"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","tour");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","white");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.tour_w.img;

                }
                else if(this.plateau[i][j] == "foun"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","fou");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","black"); 
                     
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.fou_b.img;

                }
                else if(this.plateau[i][j] == "chevn"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","chev");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","black");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.chev_b.img;

                }
                else if(this.plateau[i][j] == "chevb"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","chev");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","white");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.chev_w.img;

                }
                else if(this.plateau[i][j] == "roib"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","roi");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","white");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.roi_w.img;

                }
                else if(this.plateau[i][j] == "roin"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","roi");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","black");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.roi_b.img;

                }
                else if(this.plateau[i][j] == "reineb"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","reine");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","white");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.reine_w.img;

                }
                else if(this.plateau[i][j] == "reinen"){
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","reine");
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("color","black");  
                    this.domArray[i][j].getElementsByTagName('img')[0].src = this.reine_b.img;

                }
  
            }
        }
             
    }
// retourne les coordonées possibles pour une piece
    possibleMoves(e){
        let domArray = toDArray(e.path[2].children);
        unTarget(domArray);
        let name_piece,pos_row,pos_col,color;
        pos_row = this.pos_row;
        pos_col = this.pos_col;
        let  moves = [];
        if (this.children[0]){
            name_piece = this.children[0].getAttribute('piece');   // on recuepre les données des pieces
            color =  this.children[0].getAttribute('color');
        }  else {
            name_piece = false;
        }
        console.log(pos_row,pos_col);
        if (name_piece == "pion" & color == "white"){
            moves = [[pos_row-1,pos_col],[pos_row-2,pos_col]];
        }
        if (name_piece == "pion" & color =="black"){
            moves = [[pos_row+1,pos_col],[pos_row+2,pos_col]];
        }
        if (name_piece == "chev"){

            if( pos_row+2>=0&& pos_row+2<=7 && pos_col+1>=0 && pos_col+1<=7 ){
                moves.push([pos_row+2,pos_col+1]);
            }
            if( pos_row+2>=0&& pos_row+2<=7 && pos_col-1>=0 && pos_col-1<=7 ){
                moves.push([pos_row+2,pos_col-1]);
            }
            if( pos_row-2>=0&& pos_row-2<=7 && pos_col+1>=0 && pos_col+1<=7 ){
                moves.push([pos_row-2,pos_col+1]);
            }
            if( pos_row-2>=0&& pos_row-2<=7 && pos_col-1>=0 && pos_col-1<=7 ){
                moves.push([pos_row-2,pos_col-1]);
            }
            if( pos_row+1>=0&& pos_row+1<=7 && pos_col-2>=0 && pos_col-2<=7 ){
                moves.push([pos_row+1,pos_col-2]);
            }
            if( pos_row+1>=0&& pos_row+1<=7 && pos_col+2>=0 && pos_col+2<=7 ){
                moves.push([pos_row+1,pos_col+2]);
            }
            if( pos_row-1>=0&& pos_row-1<=7 && pos_col-2>=0 && pos_col-2<=7 ){
                moves.push([pos_row-1,pos_col-2]);
            }
            if( pos_row-1>=0&& pos_row-1<=7 && pos_col+2>=0 && pos_col+2<=7 ){
                moves.push([pos_row-1,pos_col+2]);
            }
            
        }
        if(name_piece == "fou"  || name_piece == "reine"){
            let pos_row_ = pos_row, pos_col_ = pos_col; // on met pos_row et pos_col dans des varibles temporaires
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_row_++;
                pos_col_++;
                
            }
            pos_row_ = pos_row;
            pos_col_ = pos_col;
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_row_++;
                pos_col_--;
               
            }
            pos_row_ = pos_row;
            pos_col_ = pos_col;
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_row_--;
                pos_col_++;
               
            }
            pos_row_ = pos_row;
            pos_col_ = pos_col;
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_row_--;
                pos_col_--;
                
            }
        }
        if(name_piece == "tour" || name_piece == "reine"){
            let pos_row_ = pos_row, pos_col_ = pos_col;
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_row_++;
                
            }
            pos_row_ = pos_row;
            pos_col_ = pos_col;
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_col_++;
               
            }
            pos_row_ = pos_row;
            pos_col_ = pos_col;
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_row_--;
                
            }
            pos_row_ = pos_row;
            pos_col_ = pos_col;
            while( pos_row_>= 0 && pos_row_<=7 && pos_col_ >= 0 && pos_col_ <= 7){
                moves.push([pos_row_,pos_col_]);
                pos_col_--;
               
            }

        }
        console.log(moves)


        if (moves){
            for (let i = 0; i < moves.length; i++) {
                domArray[moves[i][0]][moves[i][1]].classList.toggle('cible');
            }
        }


     }

    //  methode qui montre les coup possible pour les pieces
 
    
    allowDrop(e) {
        e.preventDefault();
    }
    dragStart(e) {
        // on supprimer d'abord tous les styles applique 
    
        e.dataTransfer.setData('text', e.target.id);
       

    }
    drop(e) {
        console.log(e.path[1].children);
        let domArray = toDArray(e.path[1].children);
        console.log(domArray);
        console.log(toDArray(e.path[1].children));
        e.preventDefault();
      
        // get the draggable element
        const id = e.dataTransfer.getData("text/plain");
     
        const draggable = document.getElementById(id);

        unTarget(domArray);
        
        //console.log(e.target).
        e.target.appendChild(draggable);
    

        
    }
    unTarget(){
        this.domArray.forEach(elem => {
            console.log( elem.classList);
            elem.classList.remove('cible');
        });
    }

    switchColor(){
        this.color ? this.color = false : this.color = true;
    }
    




};
function unTarget(domArray){
    console.log(domArray);
    domArray.forEach(elem => {
        elem.forEach(div => {
            console.log( div.classList);
            if( div.classList.contains('cible')){
                div.classList.remove('cible');
            }
        });

      
    });
}
function toDArray(liste){
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