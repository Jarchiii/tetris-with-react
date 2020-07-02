import React from 'react'
import './App.css';

function NextPiece({grid}) {
 console.log("ici", grid)
    return (
        <div id="nextPiece" className="grid">
            {
                grid.map(
                    (line, y) => {
                        return line.map(
                            (col, x) => {

                                let classes = []
                                let value = 0
                                if (x===0) {
                                    classes.push("first")
                                }
                                
                                if ((grid[y][x] < 0)) {
                                    classes.push('colorizedEmptyCellule' + grid[y][x])
                                    grid[y][x]= 0


                                }







                                if ((grid[y][x] > 0)) {
                                    classes.push('color')
                                    value = grid[y][x]
                                }


                                return <span key={x + " _ " + y} className={classes.join(" ")}>
                                   {value}
                                </span>
                            }
                        )
                    }
                )
            }
        </div>
    )
}



export default NextPiece
