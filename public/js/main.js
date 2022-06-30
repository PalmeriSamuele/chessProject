
import { Chessboard } from "./modules/Chessboard.js";



let chess = new Chessboard(window.innerWidth/2.3);   //on recupere la width de l'ecran

chess.create();
chess.update();
