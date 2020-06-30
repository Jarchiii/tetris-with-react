import React from 'react'
import './App.css';

function Grid({grid ,piece}) {

    return (
        <div id="grid">
            {
                grid.map(
                    (line, y) => {
                        return line.map(
                            (col, x) => {
                                return <span key={x + " - " + y} className={(x === 0) ? "first" :'' }>
                                    {
                                        (piece !==null) ? 
                                        (piece.mergeData.indexOf(x + " _ "+ y ) !==-1 ? "1" :  grid[y][x])
                                        :  grid[y][x] 
                                       
                                   }
                                </span>
                            }
                        )
                    }
                )
            }
        </div>
    )
}

export default Grid
