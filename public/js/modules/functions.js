export function turnToWho(array){
    let chess_game = setInterval(function(){
        let turn = true;
        for (let i = 0; i < array.length; i++) {
            if (turn){
                if (array[i].children > 0 && array[i].children[0].getAttribute('color') == 'white'){
                    array[i].children[0].removeAttribute('dragstart',dragStart);
                }
            }
        }
    },1000)
}