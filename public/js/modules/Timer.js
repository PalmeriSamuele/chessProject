export class Timer {
    constructor(chrono){
        this.time= chrono;
        this.onTimeTrackBlack = 1;
        this.onTimeTrackWhite = 1;
        console.log(this)
        this.intervalBlack;
  
    }
    startBlack(){
        let start_minutes = this.time;
        let time = start_minutes*60;
    
        this.intervalBlack = setInterval(function() {
            const minutes = Math.floor(time/60);
            let seconds = time%60;
            document.getElementById('timer_black').innerHTML = `${minutes}:${seconds}`;
            time--;
            console.log(typeof(minutes),minutes)
            if (minutes == 0 && seconds== 0){
                clearInterval(x);
                document.getElementById("timer_black").innerHTML = "BOOOM";
            }
          }, 1000);
    }
    startWhite(){
        let start_minutes = this.time;
        let time = start_minutes*60;
    
        var x = setInterval(function() {
            const minutes = Math.floor(time/60);
            let seconds = time%60;
            document.getElementById('timer_white').innerHTML = `${minutes}:${seconds}`;
            console.log(typeof(this.onTimeTrackBlack),this);
            time-=this.onTimeTrackBlack ;
            console.log(typeof(minutes),minutes)
            if (minutes == 0 && seconds== 0){
                clearInterval(x);
                document.getElementById("timer_white").innerHTML = "BOOOM";
            }
          }, 1000);
    }

    pause() {
        this.onTimeTrack = 0;
    }
    continue(){
        this.onTimeTrack = 1;
    }
}
// export class Timer {
//     constructor(time,div){
//         this.time= time;
//         this.timer_box = div;
//         this.onTimeTrack = 1;
//         console.log( this.timer_box);
//     }
//     start(){
//         let start_minutes = this.time;
//         let startseconds = start_minutes*60;
    
//         var x = setInterval(function() {
//             const minutes = Math.floor(startseconds/60);
//             let seconds =  this.time%60;
//             this.timer_box.innerHTML = `${minutes}:${seconds}`;
//             this.time-=this.onTimeTrack;
//             console.log(typeof(minutes))
//             if (minutes == 0 && seconds== 0){
//                 clearInterval(x);
//                 document.getElementById(`timer_${this.color}`).innerHTML = "BOOOM";
//             }
//           }, 1000);
//     }
//     pause() {
//         this.onTimeTrack = 0;
//     }
//     continue(){
//         this.onTimeTrack = 1;
//     }
// }
