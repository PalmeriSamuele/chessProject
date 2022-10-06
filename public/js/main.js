
import { Chessboard } from "./modules/Chessboard.js";
window.chrono = 10;
// DRACULA ----- ARGENTIA-----SCARLET
var chess = new Chessboard(window.innerWidth/2.13,10);   //on recupere la width de l'ecran
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
    
    window.chrono = 30;
    
})
document.getElementById('10m').addEventListener('click',function(){
    window.chrono = 10;
    
})

document.getElementById('5m').addEventListener('click',function(){
    window.chrono = 5;
   
})
document.getElementById('1m').addEventListener('click',function(){
    window.chrono = 1;
  
})

document.getElementById('play_btn').addEventListener('click', function(){
    createTimers(window.chrono)
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

function createTimers(chrono){
    window.timer_black = new  easytimer.Timer();
    window.timer_black.addEventListener('secondsUpdated', function (e) {
        document.getElementById('timer_black').innerHTML = timer_black.getTimeValues().toString().substring(3);
    });


    // timer white
    window.timer_white = new  easytimer.Timer();
    window.timer_white.addEventListener('secondsUpdated', function (e) {
        document.getElementById('timer_white').innerHTML = timer_white.getTimeValues().toString().substring(3);
    });

}