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

                                let classes = []
                                let value = 0
                                if (x===0) {
                                    classes.push("first")
                                }
                                if (piece !==null){
                                    if ((piece !==null && piece.mergeData.indexOf(y+" _ "+x) !==-1)) {
                                        classes.push("color")

                                        value = piece.color
                                    }
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

export default Grid
