



export function switchColor(color){
    if(color){
        return false;
    }
    else{
        return true;
    }
}
export function possibleMoves(e){
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
            console.log(domArray[pos_row_-1][pos_col_+1]);
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
    
    blockNonPossibleMove(moves,domArray);
    

 

    


 }

// fonction qui va bloquer toutes les case ou la pieces ne peux pas aller
export function blockNonPossibleMove(moves,domArray){
    let temp;
    for (let i = 0; i < domArray.length; i++) {
        for (let j = 0; j < domArray.length; j++) {
            
            temp = [i,j];

            if(!hasArray(moves,temp)){
               domArray[i][j].removeEventListener('drop',drop);
               domArray[i][j].removeEventListener('dragover',allowDrop)
            }
            else{
                domArray[i][j].classList.toggle('cible');
            }


         
 
        }
        
    }

 }

 export function hasArray(liste,elem){
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
export function unTarget(domArray){
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
export function toDArray(liste){
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

export function allowDrop(e) {
    e.preventDefault();
}
export function dragStart(e) {
    // on supprimer d'abord tous les styles applique
    e.dataTransfer.setData('text', e.target.id);
    possibleMoves(e);
   

}
export function drop(e) {
    e.preventDefault();
    console.log(this);
    console.log(e);

    let domArray = toDArray(e.path[1].children);
    
    
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
        console.log(e.path[1]);
        console.log('path',e.path[1].children[0]);
        console.log(draggable);
        if (e.path[1].children[0].getAttribute('color') != draggable.getAttribute('color')){
            e.path[1].removeChild(e.path[1].children[0]);
            e.path[1].appendChild(draggable);
        }
    }
    
    if (draggable != null){
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
    unTarget(domArray);
    console.log(domArray)



}

// fonction qui desactive le click et le drag 7drop en fonction de la personne qui joue
export function turnToWho(array,bool){
    let turn;
    if(bool){
        turn = 'white';
    }
    else {
        turn = 'black'
    }
    console.log(array);

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (array[i][j].children.length > 0 && array[i][j].children[0].getAttribute('color') != turn){
                array[i][j].children[0].removeEventListener('dragstart',dragStart);        // on enleve le drag
                array[i][j].removeEventListener('click',possibleMoves);          // on enleve le click
                array[i][j].addEventListener('drop',drop);
            }else if(array[i][j].children.length > 0 && array[i][j].children[0].getAttribute('color') == turn ){
                array[i][j].children[0].addEventListener('dragstart',dragStart);      // et on les rajoute
                array[i][j].addEventListener('click',possibleMoves);
                array[i][j].removeEventListener('drop',drop);
            }
            
        }
    }
}

