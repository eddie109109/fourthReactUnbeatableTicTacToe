import React, {useState} from 'react';

const user = 1;
const computer = 2;
var currentPlayer = user;
var spotCheckers = ["","","","","","","","",""];


function Board(props) {

  function getLegalMoves() {
    const legalMoves = [];
    for (var i =0; i < spotCheckers.length; i++) {
      if (spotCheckers[i] === "") {
        legalMoves.push(i);
      }
    }
    return legalMoves
  }

  function getLegalMoves1(boardState) {
    const legalMoves = [];
    for (var i =0; i < boardState.length; i++) {
      if (boardState[i] === "") {
        legalMoves.push(i);
      }
    }
    return legalMoves;
  }

  function startGame() { // wipe out the whole game state and restart again
    spotCheckers = ["","","","","","","","",""];
    setSpot0("");
    setSpot1("");
    setSpot2("");
    setSpot3("");
    setSpot4("");
    setSpot5("");
    setSpot6("");
    setSpot7("");
    setSpot8("");
    setDisplayDrawState("none");
    setDisplayWinState("none");
    setDisplayLoseState("none");
    currentPlayer = user;
  }

  function finishMessage() {
    const gameResult = checkGameState();
    if (gameResult == 1) {
      setDisplayWinState("");
    } else if (gameResult == 2) {
      setDisplayLoseState("");
    } else if (gameResult == 0) {
      setDisplayDrawState("");
      return;
    }
    console.log("finish");
  }


  function smartComputerAction() {
    // first check the game if it is finished, if it is not, proceed to calculating the best move
    var gameResult = checkGameState();
    if (gameResult == 1) {
      setDisplayWinState("");
      return;
    } else if (gameResult == 2) {
      setDisplayLoseState("");
      return;
    } else if (gameResult == 0){
      setDisplayDrawState("");
      return;
    }

    var bestScore = -Infinity;
    var bestMove;

    var legalMoves = getLegalMoves(); // get a list of legal moves

    // var copyGameBoard = getCopyGameBoard(spotCheckers); // get a copy of the current board

    for (var i = 0; i < legalMoves.length; i++) {
      spotCheckers = makeMove(spotCheckers,legalMoves[i],computer);
      // console.log(copyGameBoard);
      var score = minimax(spotCheckers,false);
      spotCheckers[legalMoves[i]] = ""; // change the board back to the previous state
      if (score > bestScore) {
        bestMove = legalMoves[i];
        bestScore = score;
      }

    }
    // console.log("bestMove",bestMove);

    spotCheckers[bestMove] = "X";

    // change the interface
    switch(bestMove) {
      case 0:
        setSpot0("X");
        break;
      case 1:
        setSpot1("X");
        break;
      case 2:
        setSpot2("X");
        break;
      case 3:
        setSpot3("X");
        break;
      case 4:
        setSpot4("X");
        break;
      case 5:
        setSpot5("X");
        break;
      case 6:
        setSpot6("X");
        break;
      case 7:
        setSpot7("X");
        break;
      case 8:
        setSpot8("X");
        break;
      default:
      console.log("error");
  }

  gameResult = checkGameState();
  if (gameResult == 1) {
    setDisplayWinState("");
    return;
  } else if (gameResult == 2) {
    setDisplayLoseState("");
    return;
  } else if (gameResult == 0){
    setDisplayDrawState("");
    return;
  }

    currentPlayer = user;

} // end of function

  // currentPlayer should be 2, computer is making a move
  function minimax(copyGameBoard,isMax) {

    if (checkGameState(copyGameBoard) !== -1) {

      var gameResult = checkGameState(copyGameBoard);
      if (gameResult == 0) {

        return 0;
      } else if (gameResult == 2) { // this means pc won

        return 1;
      } else {

        return -1; // when game result == 1, user won
      }
    }

    if (isMax) {
      var bestScore = -Infinity;
      var legalMoves = getLegalMoves1(copyGameBoard);
      for (var i = 0; i < legalMoves.length; i++) {

        var copyGameBoard = makeMove(copyGameBoard,legalMoves[i],computer);
        var score = minimax(copyGameBoard, false);
        copyGameBoard[legalMoves[i]] = ""; // roll back
        bestScore = Math.max(score, bestScore);
      }

    } else {
      var bestScore = Infinity;
      var legalMoves = getLegalMoves1(copyGameBoard);
      for (var i = 0; i < legalMoves.length; i++) {
        var copyGameBoard = makeMove(copyGameBoard,legalMoves[i],user);
        var score = minimax(copyGameBoard, true);
        copyGameBoard[legalMoves[i]] = ""; // roll back
        bestScore = Math.min(score, bestScore);
      }

    }
    return bestScore;

  }

  function makeMove(gameBoard, move, currentPlayer) { // this returns a new boardState
    // var copyGameBoard = getCopyGameBoard(gameBoard);
    if (currentPlayer == 1) { // this means its the user
      gameBoard[move] = "O";
      return gameBoard;
    } else {
      gameBoard[move] = "X"; // this means its the computer to make a move
      return gameBoard;
    }
  }

  function getOpponent(currentPlayer) {
    return 3 - currentPlayer;
  }

  function getCopyGameBoard(boardState){
    const copyGameBoard =[];
    for (var i =0; i < boardState.length; i++) {
      copyGameBoard.push(boardState[i]);
    }
    return copyGameBoard;
  }

  function checkGameState(boardState) { // this function is to check a simulated board
    if (boardState[0] === "O" && boardState[1] === "O" && boardState[2] === "O") {
      return 1;
    } else if (boardState[3] === "O" && boardState[4] === "O" && boardState[5] === "O") {
      return 1;
    } else if (boardState[6] === "O" && boardState[7] === "O" && boardState[8] === "O") {
      return 1;
    } else if (boardState[0] === "O" && boardState[3] === "O" && boardState[6] === "O") {
      return 1;
    } else if (boardState[1] === "O" && boardState[4] === "O" && boardState[7] === "O") {
      return 1;
    } else if (boardState[2] === "O" && boardState[5] === "O" && boardState[8] === "O") {
      return 1;
    } else if (boardState[0] === "O" && boardState[4] === "O" && boardState[8] === "O") {
      return 1;
    } else if (boardState[2] === "O" && boardState[4] === "O" && boardState[6] === "O") {
      return 1;
    } else if (boardState[0] === "X" && boardState[1] === "X" && boardState[2] === "X") {
      return 2;
    } else if (boardState[3] === "X" && boardState[4] === "X" && boardState[5] === "X") {
      return 2;
    } else if (boardState[6] === "X" && boardState[7] === "X" && boardState[8] === "X") {
      return 2;
    } else if (boardState[0] === "X" && boardState[3] === "X" && boardState[6] === "X") {
      return 2;
    } else if (boardState[1] === "X" && boardState[4] === "X" && boardState[7] === "X") {
      return 2;
    } else if (boardState[2] === "X" && boardState[5] === "X" && boardState[8] === "X") {
      return 2;
    } else if (boardState[0] === "X" && boardState[4] === "X" && boardState[8] === "X") {
      return 2;
    } else if (boardState[2] === "X" && boardState[4] === "X" && boardState[6] === "X") {
      return 2;
    }

    var counter = 0;
    for (var i = 0; i < boardState.length; i++) {
      if (boardState[i] === "X" || boardState[i] === "O") {
        counter ++;
      }
    }
    // if all the spots are occupied and not 1 or 2 returned yet, that means its a draw, otherwise the game is still on
    if (counter == 9) {
      return 0;
    } else {
      return -1;
    }
  }


  function computerAction() {
    var gameResult = checkGameState();
    // console.log(typeof gameResult);
    if (gameResult == 1) {
      setDisplayWinState("");
      return;
    } else if (gameResult == 2) {
      setDisplayLoseState("");
      return;
    } else if (gameResult == 0){
      setDisplayDrawState("");
      return;
    }

    var legalMoves = getLegalMoves();

    var randomNumber1 = Math.floor(legalMoves.length-1);

    var pickedIndex = legalMoves[randomNumber1];

    spotCheckers[pickedIndex] = "X"; // change the array

    // change the interface
    switch(pickedIndex) {
      case 0:
        setSpot0("X");
        break;
      case 1:
        setSpot1("X");
        break;
      case 2:
        setSpot2("X");
        break;
      case 3:
        setSpot3("X");
        break;
      case 4:
        setSpot4("X");
        break;
      case 5:
        setSpot5("X");
        break;
      case 6:
        setSpot6("X");
        break;
      case 7:
        setSpot7("X");
        break;
      case 8:
        setSpot8("X");
        break;
      default:
      console.log("error");
    }

    // when the computer finishes making a move, immediately check the result
    gameResult = checkGameState();
    if (gameResult == 1) {
      setDisplayWinState("");
      return;
    } else if (gameResult == 2) {
      setDisplayLoseState("");
      return;
    } else if (gameResult == 0){
      setDisplayDrawState("");
      return;
    }

    // if the game is not over rotate to the user
    currentPlayer = user;
  }// end of computerAction func

  function transition() { // after 0.1 second, the computer will make a random move
    currentPlayer = computer;
    setTimeout(()=>{
      // computerAction();
      smartComputerAction(); // change to minimax
    },100);
  }

  function checkGameState() {
    if (spotCheckers[0] === "O" && spotCheckers[1] === "O" && spotCheckers[2] === "O") {
      return 1;
    } else if (spotCheckers[3] === "O" && spotCheckers[4] === "O" && spotCheckers[5] === "O") {
      return 1;
    } else if (spotCheckers[6] === "O" && spotCheckers[7] === "O" && spotCheckers[8] === "O") {
      return 1;
    } else if (spotCheckers[0] === "O" && spotCheckers[3] === "O" && spotCheckers[6] === "O") {
      return 1;
    } else if (spotCheckers[1] === "O" && spotCheckers[4] === "O" && spotCheckers[7] === "O") {
      return 1;
    } else if (spotCheckers[2] === "O" && spotCheckers[5] === "O" && spotCheckers[8] === "O") {
      return 1;
    } else if (spotCheckers[0] === "O" && spotCheckers[4] === "O" && spotCheckers[8] === "O") {
      return 1;
    } else if (spotCheckers[2] === "O" && spotCheckers[4] === "O" && spotCheckers[6] === "O") {
      return 1;
    } else if (spotCheckers[0] === "X" && spotCheckers[1] === "X" && spotCheckers[2] === "X") {
      return 2;
    } else if (spotCheckers[3] === "X" && spotCheckers[4] === "X" && spotCheckers[5] === "X") {
      return 2;
    } else if (spotCheckers[6] === "X" && spotCheckers[7] === "X" && spotCheckers[8] === "X") {
      return 2;
    } else if (spotCheckers[0] === "X" && spotCheckers[3] === "X" && spotCheckers[6] === "X") {
      return 2;
    } else if (spotCheckers[1] === "X" && spotCheckers[4] === "X" && spotCheckers[7] === "X") {
      return 2;
    } else if (spotCheckers[2] === "X" && spotCheckers[5] === "X" && spotCheckers[8] === "X") {
      return 2;
    } else if (spotCheckers[0] === "X" && spotCheckers[4] === "X" && spotCheckers[8] === "X") {
      return 2;
    } else if (spotCheckers[2] === "X" && spotCheckers[4] === "X" && spotCheckers[6] === "X") {
      return 2;
    }

    var counter = 0;
    for (var i = 0; i < spotCheckers.length; i++) {
      if (spotCheckers[i] === "X" || spotCheckers[i] === "O") {
        counter ++;
      }
    }
    // if all the spots are occupied and not 1 or 2 returned yet, that means its a draw, otherwise the game is still on
    if (counter == 9) {
      return 0;
    } else {
      return -1;
    }
  }


  function handleClick(e) {
    const gameResult = checkGameState()
    if (gameResult == 1) {
      setDisplayWinState("");
      return;
    } else if (gameResult == 2) {
      setDisplayLoseState("");
      return;
    } else if (gameResult == 0){
      setDisplayDrawState("");
      return;
    }

    if (currentPlayer == user) { // if it is the user's turn then we record and click and change it
      const {id} = e.target; // deconstruct the event object
      if (id === "0") {
        if (spotCheckers[0] !== "X" && spotCheckers[0] !== "O" ) {
          setSpot0("O");
          spotCheckers[0] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "1") {
        if (spotCheckers[1] !== "X" && spotCheckers[1] !== "O" ) {
          setSpot1("O");
          spotCheckers[1] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "2") {
        if (spotCheckers[2] !== "X" && spotCheckers[2] !== "O" ) {
          setSpot2("O");
          spotCheckers[2] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "3") {
        if (spotCheckers[3] !== "X" && spotCheckers[3] !== "O" ) {
          setSpot3("O");
          spotCheckers[3] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "4") {
        if (spotCheckers[4] !== "X" && spotCheckers[4] !== "O" ) {
          setSpot4("O");
          spotCheckers[4] = "O";
        } else {
          console.log("not again");
          return;
        }

      } else if (id === "5") {
        if (spotCheckers[5] !== "X" && spotCheckers[5] !== "O" ) {
          setSpot5("O");
          spotCheckers[5] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "6") {
        if (spotCheckers[6] !== "X" && spotCheckers[6] !== "O" ) {
          setSpot6("O");
          spotCheckers[6] = "O";
        } else {
          console.log("not again");
          return;
        }

      } else if (id === "7") {
        if (spotCheckers[7] !== "X" && spotCheckers[7] !== "O" ) {
          setSpot7("O");
          spotCheckers[7] = "O";
        } else {
          console.log("not again");
          return;
        }

      } else if (id === "8") {
        if (spotCheckers[8] !== "X" && spotCheckers[8] !== "O" ) {
          setSpot8("O");
          spotCheckers[8] = "O";
        } else {
          console.log("not again");
          return;
        }
      }
      // console.log(spotCheckers);
      transition(); // transition to the computer
    }
  }

  const [spot0, setSpot0] = useState("");// set all the beginning spots to ""
  const [spot1, setSpot1] = useState("");
  const [spot2, setSpot2] = useState("");
  const [spot3, setSpot3] = useState("");
  const [spot4, setSpot4] = useState("");
  const [spot5, setSpot5] = useState("");
  const [spot6, setSpot6] = useState("");
  const [spot7, setSpot7] = useState("");
  const [spot8, setSpot8] = useState("");


  const [displayWinState,setDisplayWinState] = useState("none");
  const [displayLoseState,setDisplayLoseState] = useState("none");
  const [displayDrawState,setDisplayDrawState] = useState("none");

  function handleClick(e) {
    const gameResult = checkGameState()
    if (gameResult == 1) {
      setDisplayWinState("");
      return;
    } else if (gameResult == 2) {
      setDisplayLoseState("");
      return;
    } else if (gameResult == 0){
      setDisplayDrawState("");
      return;
    }

    if (currentPlayer == user) { // if it is the user's turn then we record and click and change it
      const {id} = e.target; // deconstruct the event object
      if (id === "0") {
        if (spotCheckers[0] !== "X" && spotCheckers[0] !== "O" ) {
          setSpot0("O");
          spotCheckers[0] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "1") {
        if (spotCheckers[1] !== "X" && spotCheckers[1] !== "O" ) {
          setSpot1("O");
          spotCheckers[1] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "2") {
        if (spotCheckers[2] !== "X" && spotCheckers[2] !== "O" ) {
          setSpot2("O");
          spotCheckers[2] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "3") {
        if (spotCheckers[3] !== "X" && spotCheckers[3] !== "O" ) {
          setSpot3("O");
          spotCheckers[3] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "4") {
        if (spotCheckers[4] !== "X" && spotCheckers[4] !== "O" ) {
          setSpot4("O");
          spotCheckers[4] = "O";
        } else {
          console.log("not again");
          return;
        }

      } else if (id === "5") {
        if (spotCheckers[5] !== "X" && spotCheckers[5] !== "O" ) {
          setSpot5("O");
          spotCheckers[5] = "O";
        } else {
          console.log("not again");
          return;
        }
      } else if (id === "6") {
        if (spotCheckers[6] !== "X" && spotCheckers[6] !== "O" ) {
          setSpot6("O");
          spotCheckers[6] = "O";
        } else {
          console.log("not again");
          return;
        }

      } else if (id === "7") {
        if (spotCheckers[7] !== "X" && spotCheckers[7] !== "O" ) {
          setSpot7("O");
          spotCheckers[7] = "O";
        } else {
          console.log("not again");
          return;
        }

      } else if (id === "8") {
        if (spotCheckers[8] !== "X" && spotCheckers[8] !== "O" ) {
          setSpot8("O");
          spotCheckers[8] = "O";
        } else {
          console.log("not again");
          return;
        }
      }
      transition(); // transition to the computer
    }
  }


  return(
    <div className = "Board">
      <div style={{display:displayWinState}} className= "winningMessage">
      <h1 >You Win!</h1>
      <img src="./img/smallBlackMan.gif" alt="smart black man" width="200"></img>
      </div>
      <div style={{display:displayLoseState}} className= "losingMessage" >
      <h1 >You Lose!</h1>
      <img src="./img/sucker.gif" alt="sucker man" width="200"></img>
      </div>
      <div style={{display:displayDrawState}} className= "drawGameMessage">
      <h1 >It's a draw!</h1>
      <img src="./img/tieGame.gif" alt="tie game" width="200"></img>
      </div>

      <div className = "row border-b" style={{display:props.unlockGame}}>
        <div onClick= {handleClick} className ="col border-r" id="0">{spot0}</div>
        <div onClick= {handleClick} className ="col border-r" id="1">{spot1}</div>
        <div onClick= {handleClick} className ="col " id="2">{spot2}</div>
      </div>
      <div className = "row border-b" style={{display:props.unlockGame}}>
        <div onClick= {handleClick} className ="col border-r" id="3">{spot3}</div>
        <div onClick= {handleClick} className ="col border-r" id="4">{spot4}</div>
        <div onClick= {handleClick} className ="col " id="5">{spot5}</div>
      </div>
      <div className = "row" style={{display:props.unlockGame}}>
        <div onClick= {handleClick} className ="col border-r" id="6">{spot6}</div>
        <div onClick= {handleClick} className ="col border-r" id="7">{spot7}</div>
        <div onClick= {handleClick} className ="col " id="8">{spot8}</div>
      </div>
      <div className = "menu">
        <button onClick={startGame} className= "playAgainButton">Play again</button>

      </div>
    </div>
  );
}


export default Board;
