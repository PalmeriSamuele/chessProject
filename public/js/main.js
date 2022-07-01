
import { Chessboard } from "./modules/Chessboard.js";

// DRACULA ----- ARGENTIA-----SCARLET
let chess = new Chessboard(window.innerWidth/2.13,'');   //on recupere la width de l'ecran
chess.create();

document.getElementById('dracula').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,'dracula');
    chess.create();
    
})
document.getElementById('argentia').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,'argentia');
    chess.create();
})

document.getElementById('scarlet').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,'scarlet');
    chess.create();
})
document.getElementById('classic').addEventListener('click',function(){
    chess = new Chessboard(window.innerWidth/2.13,'');
    chess.create();
})


document.getElementById('play_btn').addEventListener('click', function(){
    //document.getElementById('play_btn').disabled = 'true';
    chess.update();
    
})