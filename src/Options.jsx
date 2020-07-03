import React from 'react'
import './App.scss';

function Options({actions}) {


    return (
        <div id="options">
            <h1>Options</h1>
            <p>Listes des options</p>
            <button onClick={() => actions.launchMenu()}>Back</button>
        </div>
    )
}

export default Options