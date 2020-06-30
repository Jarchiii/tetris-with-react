import React from 'react'
import './App.css';

function Grid({grid}) {

    return (
        <div id="grid">
            {
                grid.map(
                    (line, y) => {
                        return line.map(
                            (col, x) => {
                                return <span className={(x === 0) ? "first" :'' }>0</span>
                            }
                        )
                    }
                )
            }
        </div>
    )
}

export default Grid
