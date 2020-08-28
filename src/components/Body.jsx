import React, {useState} from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Board from "./Board";

function Body() {
  const [playButton, setPlayButton] = useState("none");
  const [boardState, setBoardState] = useState(""); // set the gameboard display:none at the beginning


  function startGame() {
    setPlayButton("none");
    setBoardState("");
  }


  return (
    <div className="Body">
      <div className="wrapper-div">
        <button onClick={startGame} className="playButton" style= {{display: playButton}}>Play</button>
        <Board unlockGame={boardState}/>
      </div>
    </div>);
}

export default Body;
