import React, {Component} from 'react';
import logo from './logo.svg';
import Grid from './Grid'
import pieceCollection from './pieceCollection'
import './App.css';

class App extends Component {
  
    state ={
        grid :null,
        gridHeight : 10,
        gridWidth : 8,
        piece: null,
        nbrCleanLine : 0
    }


    initGame = () => {
        this.setState({grid: this.buildGrid()}, () => {
         this.generatePiece()
        })
    }

    componentDidMount() {
        this.initGame()
        window.addEventListener("keyup", (e) => {
            console.log(e.keyCode)
            switch (e.keyCode) {
                case 39: this.pieceMoveToXAxis(1)
                    break;
                case 37 : this.pieceMoveToXAxis(-1)
                    break;
                case 40 : this.pieceMoveToYAxis(1)
                    break;
                case 88 : this.rotatePiece("right")
                    break;
                case 89 : this.rotatePiece("left")
                    break;
                default : break;
            
            }

            //37 gauche
            //39 droite
            // 40 bas
    })
  }

//GRID FONCTIONS
    buildGrid = () => {
       let grid = []
        for(let y = 0; y< this.state.gridHeight; y++){
            let line = []
            for (let x = 0; x<this.state.gridWidth; x++) {
                line.push(0)
            }

            grid.push(line)
        }
        console.log(grid)

        return grid
    }

    mergePieceToGrid = () => {
    const virtualGrid = this.state.grid
    let nbrCleanLine = this.state.nbrCleanLine

     this.state.piece.mergeData.forEach((element) => {
         const [y, x] = element.split(" _ ")
         virtualGrid[y][x] = this.state.piece.color
     })

     let { cleanGrid, nbrLineCompleted} =  this.cleanGrid(virtualGrid)
     nbrCleanLine += nbrLineCompleted
        
     
     this.setState({grid : cleanGrid , piece : null,  nbrCleanLine: nbrCleanLine}, () => {
        
            this.generatePiece();
        })
        console.log(this.state.grid)
    }

    cleanGrid = (grid) => {
        let cleanGrid = []
        let nbrLineCompleted = 0
        for (let y = 0 ; y<this.state.gridHeight; y++){
            let lineCompleted = true
            for (let x = 0; x <this.state.gridWidth; x++){
                if (grid[y][x]===0){
                    lineCompleted = false
                }
            }
            if (lineCompleted===false){
                cleanGrid.push(grid[y])

            } 
            }
            nbrLineCompleted= this.state.gridHeight - cleanGrid.length
            for (let i = 0; i < nbrLineCompleted; i++){
                cleanGrid.unshift(this.makeCleanLine(this.state.gridWidth))
            }

            return { cleanGrid, nbrLineCompleted}
 
        }

        makeCleanLine (width){
            let line = []
            for (let x = 0; x <width; x++){
                line.push(0)
            }
            return line

        }


    

    //PIECE FONCTIONS
    generatePiece = () =>{
        let piece = {}
        piece.posX = 0
        piece.posY = 0
        let indexPieceCollection = [Math.floor(Math.random() * pieceCollection.length)]
        piece.mergeData = []
        piece.grid = pieceCollection[indexPieceCollection]
        piece.color = indexPieceCollection + 1 

        if (piece.grid[0][0] ===0){
            piece.posY--
        }

        piece.posX= Math.floor((this.state.gridWidth - piece.grid[0].length)/2)



        let coordinate = this.pieceCanBeMove(piece)
  
        if (coordinate !== false){
            piece.mergeData = coordinate
            this.setState({piece})
        }
    }

    pieceCanBeMove = (piece) => {
        let coordinate = []
        for(let y = 0; y< piece.grid.length; y++){
            for (let x = 0; x<piece.grid[0].length; x++) {
                if(piece.grid[y][x] > 0 ){
                    if(this.state.grid[y+piece.posY] === undefined ){
                        return false // out of range Y
                    }


                     
                    if(this.state.grid[y+piece.posY][x +piece.posX] === undefined){
                        return false //out of range X
                    } 
                    if( this.state.grid[y+piece.posY][x +piece.posX] > 0){ 
                        return false
                   } 
                    coordinate.push ( (y +piece.posY)+ " _ " + (x+piece.posX))
                }
            }

        }
        return coordinate

    }

    pieceMoveToXAxis = (deltaX) => {
        let piece = { ... this.state.piece}
        if (piece ===null){
            return false
        }
        piece.posX+= deltaX
        let coordinate = this.pieceCanBeMove(piece)
        if (coordinate !== false) {
            piece.mergeData = coordinate 
            this.setState({piece})
         
        }
    }


    pieceMoveToYAxis = (deltaY) => {
        let piece = {...this.state.piece}
        if (piece ===null) {
            return false
        }
        piece.posY+=deltaY
        let coordinate = this.pieceCanBeMove(piece)
        if (coordinate !== false) {
            piece.mergeData = coordinate 
            this.setState({piece})
         
        } else {
            this.mergePieceToGrid()
        }
        
    }

    rotatePiece = (direction) => {
        let piece = { ... this.state.piece}
        if (piece ===null){
            return false
        }
        let newGrid = []
        console.log(piece.grid)
        if (direction === "right"){
            for (let x = 0; x<piece.grid[0].length; x++) 
            {
                let line = []
                for(let y = piece.grid.length-1; y>-1; y--){
                    line.push(piece.grid[y][x])
            }
        
            newGrid.push(line)
            }
        } 
        if (direction === "left")
        {
            for (let x = piece.grid[0].length-1; x>-1; x--)
             {
                let line = []
                for(let y = 0; y<piece.grid.length; y++){
                    line.push(piece.grid[y][x])
                }
        
            newGrid.push(line)
            }
        }
        piece.grid = newGrid
        let coordinate = this.pieceCanBeMove(piece)
        if (coordinate !== false) {
            piece.mergeData = coordinate 
            this.setState({piece})
        
        } else {
            if (piece.posX<0){
                piece.posX=0
                coordinate = this.pieceCanBeMove(piece)
                if (coordinate !== false){
                    piece.mergeData = coordinate
                    this.setState({piece})
                } 
                
                }
    
                else if (piece.grid[0].length + this.state.gridWidth > this.state.gridWidth){
                    piece.posX = this.state.gridWidth - piece.grid[0].length
                    coordinate = this.pieceCanBeMove(piece)
                    if (coordinate !== false){
                        piece.mergeData = coordinate
                        this.setState({piece})
                    } 
                }
        }
        }
    
    
   

  render(){
    return(
      <div id="wrapper_tetris">
      <h1>Tetris</h1>
      <p className="score">{this.state.nbrCleanLine}</p>
      {this.state.grid  !== null &&
       <Grid 
       grid={this.state.grid}
       piece={this.state.piece}
       />}
      </div>
    )
    
    }
  }




export default App;
