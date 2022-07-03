import { ChessPiece } from "./ChessPiece.js";
import * as F from "./functions.js";
export class Chessboard{
    constructor(w_board, theme = ''){
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
        // CHOOSE YOUR THEME 
        this.theme = theme;
        this.c_white,this.c_black;
        if(this.theme.toLowerCase() == 'dracula'){
            this.c_white = 'rgba(35, 48, 83, 0.671)';
            this.c_black = 'rgb(125, 87, 133)';
        }
        else if(this.theme.toLowerCase()  == 'argentia'){
            this.c_white = 'rgba(11, 11, 11, 0.371)';
            this.c_black = 'rgb(100, 100, 100)';
        }
        else if(this.theme.toLowerCase()  == 'scarlet'){
            this.c_white = 'rgb(97, 40, 40)';
            this.c_black = 'rgb(134, 113, 113)';
        }
    
    }

    // fonction qui cree le plateau de jeu
    create(){
        this.board.innerHTML='';
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
                if (this.color){
                    new_case.style.background = this.c_white;
                }
                else{
                   new_case.style.background = this.c_black;
                }
                
                new_case.className+=this.color;
                new_case.className+=" chess_case";

                new_case.addEventListener('click', possibleMoves);  

                // drag and drop 
                new_case.addEventListener('drop', drop); 
                new_case.addEventListener('dragover',  allowDrop); 
        
                new_case.style.width = this.w_board/8+"px";
                new_case.style.height = this.w_board/8+"px";
                this.board.appendChild(new_case); 
               
                if (j != this.column-1){this.color = switchColor(this.color)}
              
            }
            
        }
        this.domArray = toDArray(this.board.children);   // on met sous le format [[]...]
       
    }

// methode qui met a jour le plateau
    update(){
        // timer black 
        window.timer_black = new  easytimer.Timer();
        window.timer_black.start({countdown: true, startValues: {minutes: 10}});

        window.timer_black.addEventListener('secondsUpdated', function (e) {
        document.getElementById('timer_black').innerHTML = timer_black.getTimeValues().toString().substring(3);
        });
        

        // timer white
        window.timer_white = new  easytimer.Timer();
        window.timer_white.start({countdown: true, startValues: {minutes: 10}});

        window.timer_white.addEventListener('secondsUpdated', function (e) {
            console.log(timer_white.getTimeValues().toString().substring(3));
        document.getElementById('timer_white').innerHTML = timer_white.getTimeValues().toString().substring(3);
        });



       
        for (let i = 0; i < this.plateau.length; i++) {
            for (let j = 0; j < this.plateau.length; j++) {

                let img = document.createElement("img");
                img.draggable="true";
                img.src = "";
                img.id = "piece"+i+j;
                img.style.cursor = 'pointer';
                img.style.transform = 'transform 2s ease 1s'
                img.setAttribute("piece","");
               
                img.setAttribute("color","");
                img.addEventListener('dragstart',dragStart);

                if (this.plateau[i][j] == "pionn"){
                    // on ajoute a chaque fois la proporete piece qui vaut la piece adequate
                    this.domArray[i][j].appendChild(img);
                    this.domArray[i][j].getElementsByTagName('img')[0].setAttribute("piece","pion");
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
        turnToWho(this.domArray,true);
        window.timer_black.pause();
    }
// affiche les coups possible pour la piece cliquer
    
 

    
};
function switchColor(color){
    if(color){
        return false;
    }
    else{
        return true;
    }
}
function possibleMoves(e){
    let domArray = toDArray(e.path[2].children);
    unTarget(domArray);  // on retire tous ls marquages
    let name_piece,pos_row,pos_col,color;
    pos_row = e.target.parentNode.pos_row;
    pos_col = e.target.parentNode.pos_col;
    let nb_kings_moves = 0;
    let  moves = [];
    if ( e.target.parentNode.children){
        if ( e.target.parentNode.children[0]){
            name_piece =  e.target.parentNode.children[0].getAttribute('piece');   // on recuepre les données des pieces
            color =   e.target.parentNode.children[0].getAttribute('color');
        } 
    }
    else {
        unTarget(domArray);
    }
    // MOVES PION
    if (name_piece == "pion" && color == "white" && domArray[pos_row-1][pos_col].children.length ==0){
        moves.push([pos_row-1,pos_col]);
        if(pos_row==6  && domArray[pos_row-2][pos_col].children.length ==0 ){
            moves.push([pos_row-2,pos_col]);
        }
       
    }
    if( pos_row-1>= 0 && pos_row-1<=7 && pos_col-1 >= 0 && pos_col-1 <= 7){
        if (name_piece == "pion" && color == "white" && domArray[pos_row-1][pos_col-1].children.length > 0){    // ajout moves de cote pion
            if (domArray[pos_row-1][pos_col-1].children[0].getAttribute('color') != 'white'){
                moves.push([pos_row-1,pos_col-1]);
            }
        }
    }
    if( pos_row-1>= 0 && pos_row-1<=7 && pos_col+1 >= 0 && pos_col+1 <= 7){
        if (name_piece == "pion" && color == "white" && domArray[pos_row-1][pos_col+1].children.length > 0){
            if (domArray[pos_row-1][pos_col+1].children[0].getAttribute('color') != 'white'){
                moves.push([pos_row-1,pos_col+1]);
            }
        }
    }
    if (name_piece == "pion" && color == "black" && domArray[pos_row+1][pos_col].children.length ==0){
        moves.push([pos_row+1,pos_col]);
        if(pos_row==1  && domArray[pos_row+2][pos_col].children.length ==0){
            moves.push([pos_row+2,pos_col]);
        }
       
    }
    if( pos_row+1>= 0 && pos_row+1<=7 && pos_col-1 >= 0 && pos_col-1 <= 7){
        if (name_piece == "pion" && color == "black" && domArray[pos_row+1][pos_col-1].children.length > 0){
            if (domArray[pos_row+1][pos_col-1].children[0].getAttribute('color') != 'black'){
                moves.push([pos_row+1,pos_col-1]);
            }
        }
    }
    if( pos_row+1>= 0 && pos_row+1<=7 && pos_col+1 >= 0 && pos_col+1 <= 7){
        if (name_piece == "pion" && color == "black" && domArray[pos_row+1][pos_col+1].children.length > 0){
            if (domArray[pos_row+1][pos_col+1].children[0].getAttribute('color') != 'black'){
                moves.push([pos_row+1,pos_col+1]);
            }
        }
    }


    // MOVES CHEVALIER
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
  
    // MOVES FOU ET REINE
    if(name_piece == "fou"  || name_piece == "reine"){
        let pos_row_ = pos_row, pos_col_ = pos_col; // on met pos_row et pos_col dans des varibles temporaires
        // mouvement HAUT DROITE
        while( pos_row_+1>= 0 && pos_row_+1<=7 && pos_col_+1 >= 0 && pos_col_ +1<= 7  ){
            if(domArray[pos_row_+1][pos_col_+1].children.length != 0){
                if(domArray[pos_row_+1][pos_col_+1].children[0].getAttribute('color') == e.target.getAttribute('color')){
                    break;
                }
                else{   // on qjoute une derniere fois puis on part de la boucle
                    pos_row_++;
                    pos_col_++;
                    moves.push([pos_row_,pos_col_]);
                    break;
                } 
            }
                           
            pos_row_++;
            pos_col_++;
            moves.push([pos_row_,pos_col_]);
            
            
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;
        // mouvement HAUT GAUCHE
        while( pos_row_+1>= 0 && pos_row_+1<=7 && pos_col_-1 >= 0 && pos_col_-1 <= 7   ){
            if(domArray[pos_row_+1][pos_col_-1].children.length != 0){
                if(domArray[pos_row_+1][pos_col_-1].children[0].getAttribute('color') == e.target.getAttribute('color')){
                    break;
                } 
                else{
                    pos_row_++;
                    pos_col_--;
                    moves.push([pos_row_,pos_col_]);
                    break;
                }
            }
            pos_row_++;
            pos_col_--;
            moves.push([pos_row_,pos_col_]);
            
           
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;
        // Mouvement BAS DROITE
        while( pos_row-1>= 0 && pos_row_-1<=7 && pos_col_+1 >= 0 && pos_col_+1 <= 7  ){
            if(domArray[pos_row_-1][pos_col_+1].children.length != 0){
                if(domArray[pos_row_-1][pos_col_+1].children[0].getAttribute('color') == e.target.getAttribute('color')){
                    break;
                } 
                else{
                    pos_row_--;
                    pos_col_++;
                    moves.push([pos_row_,pos_col_]);
                    break;
                }
            }
            pos_row_--;
            pos_col_++;
            moves.push([pos_row_,pos_col_]);
            
           
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;
        // mouvement BAS GAUCHE
        while( pos_row_-1>= 0 && pos_row_-1<=7 && pos_col_ -1>= 0 && pos_col_-1<= 7 ){  // && domArray[pos_row_-1][pos_col_-1].children.length ==0
            if(domArray[pos_row_-1][pos_col_-1].children.length != 0){
                if(domArray[pos_row_-1][pos_col_-1].children[0].getAttribute('color') == e.target.getAttribute('color')){
                    break;
                }
                else{
                    pos_row_--;
                    pos_col_--;
                    moves.push([pos_row_,pos_col_]);
                    break;
                }
                
            }
            pos_row_--;
            pos_col_--;
            moves.push([pos_row_,pos_col_]);
            
            
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;
    }
    // MOVES TOUR ET  REINE
    if(name_piece == "tour" || name_piece == "reine"){
        let pos_row_ = pos_row, pos_col_ = pos_col;
        // mouvement HAUT
        while( pos_row_+1>= 0 && pos_row_+1<=7 && pos_col_ >= 0 && pos_col_ <= 7 ){
            if(domArray[pos_row_+1][pos_col_].children.length != 0){
                if(domArray[pos_row_+1][pos_col_].children[0].getAttribute('color') == e.target.getAttribute('color')){    // ON VERIFIE SI IL Y A UN PION DE LA MEME COULEUR ALORS ON SARRETE
                    break;
                } 
                else{
                    pos_row_++;
                    moves.push([pos_row_,pos_col_]);
                    break;
                }
            }
            pos_row_++;
            moves.push([pos_row_,pos_col_]);
            
            
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;
        // mouvement DROITE
        while( pos_row_>= 0 && pos_row_<=7 && pos_col_+1 >= 0 && pos_col_+1 <= 7){
            if(domArray[pos_row_][pos_col_+1].children.length != 0){
                if(domArray[pos_row_][pos_col_+1].children[0].getAttribute('color') == e.target.getAttribute('color')){
                    break;
                } 
                else{
                    pos_col_++;
                    moves.push([pos_row_,pos_col_]);
                    break;
                }
            }
            pos_col_++;
            moves.push([pos_row_,pos_col_]);
           
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;
        // mouvement GAUCHE
        while( pos_row_-1>= 0 && pos_row_-1<=7 && pos_col_ >= 0 && pos_col_ <= 7 ){
            if(domArray[pos_row_-1][pos_col_].children.length != 0){
                if(domArray[pos_row_-1][pos_col_].children[0].getAttribute('color') == e.target.getAttribute('color')){
                    break;
                } 
                else{
                    pos_row_--;
                    moves.push([pos_row_,pos_col_]);
                    break;
                }
            }
            pos_row_--;
            moves.push([pos_row_,pos_col_]);
            
            
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;
        // MOUVEMENT BAS
        while( pos_row_>= 0 && pos_row_<=7 && pos_col_-1 >= 0 && pos_col_-1 <= 7 ){
            if(domArray[pos_row_][pos_col_-1].children.length != 0){
                if(domArray[pos_row_][pos_col_-1].children[0].getAttribute('color') == e.target.getAttribute('color')){
                    break;
                } 
                else{
                    pos_col_--;
                    moves.push([pos_row_,pos_col_]);
                    break;
                }
            }
            pos_col_--;
            moves.push([pos_row_,pos_col_]);
        
           
        }
        pos_row_ = pos_row;
        pos_col_ = pos_col;

    }
    // mouvement du ROI
    if(name_piece== 'roi'){
        if( pos_row+1>=0&& pos_row+1<=7 && pos_col+1>=0 && pos_col+1<=7 ){
            if(domArray[pos_row+1][pos_col+1].children.length != 0){
                if(domArray[pos_row+1][pos_col+1].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row+1,pos_col+1]);
                  
                }
            }
            else{
                moves.push([pos_row+1,pos_col+1]);

                
            }
          
        }
        if( pos_row+1>=0&& pos_row+1<=7 && pos_col-1>=0 && pos_col-1<=7 ){
            if(domArray[pos_row+1][pos_col-1].children.length != 0){
                if(domArray[pos_row+1][pos_col-1].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row+1,pos_col-1]);
                }
            }
            else{
                moves.push([pos_row+1,pos_col-1]);
                
            }
        }
        if( pos_row-1>=0&& pos_row-1<=7 && pos_col+1>=0 && pos_col+1<=7 ){
            if(domArray[pos_row-1][pos_col+1].children.length != 0){
                if(domArray[pos_row-1][pos_col+1].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row-1,pos_col+1]);
                  
                }
            }
            else{
                moves.push([pos_row-1,pos_col+1]);

                
            }
        }
        if( pos_row-1>=0&& pos_row-1<=7 && pos_col-1>=0 && pos_col-1<=7 ){
            if(domArray[pos_row-1][pos_col-1].children.length != 0){
                if(domArray[pos_row-1][pos_col-1].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row-1,pos_col-1]);
                  
                }
            }
            else{
                moves.push([pos_row-1,pos_col-1]);

            }
        }
        if( pos_row+1>=0&& pos_row+1<=7 && pos_col>=0 && pos_col<=7 ){
            if(domArray[pos_row+1][pos_col].children.length != 0){
                if(domArray[pos_row+1][pos_col].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row+1,pos_col]);
                  
                }
            }
            else{
                moves.push([pos_row+1,pos_col]);

                
            }
        }

        if( pos_row-1>=0&& pos_row-1<=7 && pos_col>=0 && pos_col<=7 ){
            if(domArray[pos_row-1][pos_col].children.length != 0){
                if(domArray[pos_row-1][pos_col].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row-1,pos_col]);
                  
                }
            }
            else{
                moves.push([pos_row-1,pos_col]);

                
            }
        }
        if( pos_row>=0&& pos_row<=7 && pos_col+1>=0 && pos_col+1<=7 ){
            if(domArray[pos_row][pos_col+1].children.length != 0){
                if(domArray[pos_row][pos_col+1].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row,pos_col+1]);
                  
                }
            }
            else {
                moves.push([pos_row,pos_col+1]);


            }
        
        }
        if( pos_row>=0&& pos_row<=7 && pos_col-1>=0 && pos_col-1<=7 ){
            if(domArray[pos_row][pos_col-1].children.length != 0){
                if(domArray[pos_row][pos_col-1].children[0].getAttribute('color') != e.target.getAttribute('color')){
                    moves.push([pos_row,pos_col-1]);
                  
                }
            }
            else{
                moves.push([pos_row,pos_col-1]);

                
            }
        }                 
   
    }

    // affiche les cases possibles 
    if (moves.length > 0){
        for (let i = 0; i < moves.length; i++) {
            domArray[moves[i][0]][moves[i][1]].classList.toggle('cible');
        }
        blockNonPossibleMove(moves,domArray);
    }

    


 }

// fonction qui va bloquer toutes les case ou la pieces ne peux pas aller
function blockNonPossibleMove(moves,domArray){
    let temp;
    for (let i = 0; i < domArray.length; i++) {
        for (let j = 0; j < domArray.length; j++) {
            
            temp = [i,j];

            if(!hasArray(moves,temp)){
               domArray[i][j].removeEventListener('drop',drop);
               domArray[i][j].removeEventListener('dragover',allowDrop)
            }


         
 
        }
        
    }

 }

 function hasArray(liste,elem){
    let ret = 0;
    for (let i = 0; i < liste.length; i++) {
       for (let j = 0; j < liste[i].length; j++) {
        if(liste[i][j] === elem[j]){
            ret++;
            if(ret === 2){
                return true;
            }
            
        }else{
            ret = 0;
        }
        
       }
       ret = 0;
        
    }
    return false;
}
// fonction qui enleve un marquage sur une case et qui faitr en sorte qu on puisse y cliquer une deuxieme fois
function unTarget(domArray){
    domArray.forEach(elem => {
        elem.forEach(div => {
            if( div.classList.contains('cible')){
                div.classList.remove('cible');
                
            }
  
            div.addEventListener('drop', drop); 
            div.addEventListener('dragover',  allowDrop); 

            
        });

      
    });
}

//fonction qui met une liste en format [[][]..]  8x8
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


// allow drag and drop

function allowDrop(e) {
    e.preventDefault();
}
function dragStart(e) {
    // on supprimer d'abord tous les styles applique
    e.dataTransfer.setData('text', e.target.id);
    possibleMoves(e);
   

}
function drop(e) {
    e.preventDefault();
    console.log(this);
    console.log(e.path[0].localName);

    let domArray = toDArray(e.path[1].children);
    
    unTarget(domArray);
    const id = e.dataTransfer.getData("text/plain");
 
    const draggable = document.getElementById(id);
    if (e.path[0].localName == "div" && e.path[0].children.length == 0){
        e.target.appendChild(draggable);
    }
    else if(e.path[0].localName == "div" && e.path[0].children.length != 0){
        console.log('path',e.path[1].children[0]);
        console.log(draggable);
        if (e.path[0].children[0].getAttribute('color') != draggable.getAttribute('color')){
            e.path[0].removeChild(e.path[0].children[0]);
            e.path[0].appendChild(draggable);
        }
    }
    else if (e.path[0].localName == "img"){
        console.log('path',e.path[1].children[0]);
        console.log(draggable);
        if (e.path[1].children[0].getAttribute('color') != draggable.getAttribute('color')){
            e.path[1].removeChild(e.path[1].children[0]);
            e.path[1].appendChild(draggable);
        }
    }
    unTarget(domArray);
    if(draggable.getAttribute('color') == 'white'){
        turnToWho(domArray,false);
        window.timer_white.pause();
        window.timer_black.start();
    }else{
        turnToWho(domArray,true);
        window.timer_black.pause();
        window.timer_white.start();
    }
    


   
    

}

// fonction qui desactive le click et le drag 7drop en fonction de la personne qui joue
function turnToWho(array,bool){
    let turn;
    if(bool){
        turn = 'white';
    }
    else {
        turn = 'black'
    }
    console.log(array);
    console.log('hey');
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i][j].children.length > 0 && array[i][j].children[0].getAttribute('color') != turn){
                array[i][j].children[0].removeEventListener('dragstart',dragStart);        // on enleve le drag
                array[i][j].removeEventListener('click',possibleMoves);          // on enleve le click
                console.log( array[i][j].children[0])
            }else if(array[i][j].children.length > 0 && array[i][j].children[0].getAttribute('color') == turn ){
                array[i][j].children[0].addEventListener('dragstart',dragStart);      // et on les rajoute
                array[i][j].addEventListener('click',possibleMoves);
            }
            
        }
    }
}