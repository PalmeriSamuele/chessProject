import { ChessPiece } from "./ChessPiece.js";
import {
        switchColor,
        possibleMoves,
        toDArray,
        allowDrop,
        dragStart,
        drop}  from "./functions.js";
export class Chessboard{
    constructor(w_board, time_choose){
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
        this.c_white,this.c_black;

        this.time_choose = time_choose;

    
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
        window.timer_black.start({countdown: true, startValues: {minutes: this.time_choose}});

        window.timer_black.addEventListener('secondsUpdated', function (e) {
        document.getElementById('timer_black').innerHTML = timer_black.getTimeValues().toString().substring(3);
        });
        

        // timer white
        window.timer_white = new  easytimer.Timer();
        window.timer_white.start({countdown: true, startValues: {minutes: this.time_choose}});

        window.timer_white.addEventListener('secondsUpdated', function (e) {
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

    changeTheme(theme){
        if(theme.toLowerCase() == 'dracula'){
            this.c_white = 'rgba(35, 48, 83, 0.671)';
            this.c_black = 'rgb(125, 87, 133)';
        }
        else if(theme.toLowerCase()  == 'argentia'){
            this.c_white = 'rgba(11, 11, 11, 0.371)';
            this.c_black = 'rgb(100, 100, 100)';
        }
        else if(theme.toLowerCase()  == 'scarlet'){
            this.c_white = 'rgb(97, 40, 40)';
            this.c_black = 'rgb(134, 113, 113)';
        }
        else{
            this.c_white='rgba(35, 28, 28, 0.692)';
            this.c_black = 'rgb(209, 189, 189)';
        }

        for (let i = 0; i < this.domArray.length; i++) {
           for (let j = 0; j < this.domArray.length; j++) {
            if (this.color){
               this.domArray[i][j].style.background = this.c_white;
            }
            else{
                this.domArray[i][j].style.background = this.c_black;
            }
            if (j != this.column-1){this.color = switchColor(this.color)}
           }
            
        }
    }
    
 

    
};
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