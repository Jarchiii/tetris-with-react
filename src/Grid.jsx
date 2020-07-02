import React from 'react'
import './App.css';

function Grid({grid ,piece}) {
 grid = colorizedEmptyCellule(grid)
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

function colorizedEmptyCellule(grid){
    
    let colorLine = grid[grid.length -1]
     for (let y = grid.length - 2 ; y > -1; y--){
         for (let x = 0; x < grid[0].length; x ++){
            if(grid[y][x] <=0 && colorLine !==0) {
                grid[y][x] = Math.abs(colorLine[x])*-1
            }
         }

         colorLine = grid [y]
     }
    return grid
}

export default Grid
