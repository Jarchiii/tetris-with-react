import React from 'react'
import './App.scss';

function NextPiece({grid}) {
 console.log("ici", grid)
    return (
        <div id="wrapper_next_piece" className="grid">
            			<span className="title">NEXT PIECE</span>
                        <div id="next_piece" className="grid">

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
                                    classes.push("color-" +  grid[y][x])
                                    value = grid[y][x]
                                }


                                return <span key={x + " _ " + y} className={classes.join(" ")}>
                                
                                </span>
                            }
                        )
                    }
                )
            }
        </div>
        </div>
    )
}



export default NextPiece
