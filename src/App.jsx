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
        let result = this.pieceCanBeMove(piece)
        console.log(result)

        if (result){
            this.setState({piece})
        }
    }

    pieceCanBeMove = (piece) => {
        for(let y = 0; y< piece.grid.length; y++){
            for (let x = 0; x<piece.grid[0].length; x++) {
                if(piece.grid[y][x] > 0 ){
                    if( this.state.grid[y+piece.posY][x +piece.posX] !==0){ 
                        return false
                   }
                    piece.mergeData.push ( y + "_" + x)
                }
            }

        }
        return true

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
