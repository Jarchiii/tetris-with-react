import React from 'react'
import './App.css';

function Grid({grid ,piece}) {
 grid = colorizedEmptyCellule(grid)

let projectionCoordinate = []
 if (piece ){
      projectionCoordinate = getProjectionCoordinate(grid, piece)
 }
    return (
        <div id="grid" className="grid">
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

                               if( projectionCoordinate.indexOf(y+" _ "+x) !==-1){
                                   classes.push("projection")
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

function getProjectionCoordinate (grid, piece){
 let coordinate = []
let previousCoordinate = []
 for (let virtualY = piece.posY; virtualY<grid.length; virtualY++ ) {
    previousCoordinate = coordinate
    coordinate = []

    for(let y = 0; y< piece.grid.length; y++){
        for (let x = 0; x<piece.grid[0].length; x++) {
            if(piece.grid[y][x] > 0 ){
                if(grid[y + virtualY] === undefined){
                  return previousCoordinate
                } 
                if( grid[y+virtualY][x + piece.posX] > 0){ 
                   return previousCoordinate

               } 
                coordinate.push ( (y + virtualY)+ " _ " + (x+piece.posX))
            }
        }

    }
 }

    return coordinate
}

export default Grid
