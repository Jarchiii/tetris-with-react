import React from 'react'
import './App.css';

function Menu({actions}) {


    return (
        <div id="menu">
            <h1>Tetris</h1>
            <button onClick={() => actions.launchGame()}>Play</button>
            <button onClick={() => actions.launchOptions()}>Option</button>
        </div>
    )
}

export default Menu
