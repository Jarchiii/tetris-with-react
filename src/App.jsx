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
        piece: null
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

    //PIECE FONCTIONS
    generatePiece = () =>{
        let piece = {}
        piece.posX = 0
        piece.posY = 0
        piece.grid = pieceCollection[0]
        piece.mergeData = []
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
         
        }
        
    }


  render(){
    return(
      <div id="wrapper_tetris">
      <h1>Tetris</h1>
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
