
import { Chessboard } from "./modules/Chessboard.js";

// DRACULA ----- ARGENTIA-----SCARLET
let chess = new Chessboard(window.innerWidth/2.13,10);   //on recupere la width de l'ecran
chess.create();
// en fonction du button cliauer le theme sera changer
document.getElementById('dracula').addEventListener('click',function(){
    chess.changeTheme('dracula');
   
    
})
document.getElementById('argentia').addEventListener('click',function(){
    chess.changeTheme('argentia');
    
})

document.getElementById('scarlet').addEventListener('click',function(){
    chess.changeTheme('scarlet');
   
})
document.getElementById('classic').addEventListener('click',function(){
    chess.changeTheme('');
  
})


// changer les minutes

document.getElementById('30m').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,30);
    chess.create();
   
    
})
document.getElementById('10m').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,10);
    chess.create();
    
})

document.getElementById('5m').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,5);
    chess.create();
   
})
document.getElementById('1m').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,1);
    chess.create();
  
})

document.getElementById('play_btn').addEventListener('click', function(){
    document.getElementById('play_btn').disabled = 'true';
    
    chess.update();
    
})

document.getElementById('logo').addEventListener('click',function(){
    document.getElementById('logo').style.transform = 'rotate(360deg)';
})

document.getElementById('turn_board').addEventListener('click', function(){
    document.getElementById('echequier').style.transform = 'rotate(180deg)';
    for (let i = 0; i < document.getElementById('echequier').children.length; i++) {
        if( document.getElementById('echequier').children.length > 0){
            document.getElementById('echequier').children[i].style.transform = 'rotate(180deg)';
        }
        
    }
})