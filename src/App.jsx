import React, {Component} from 'react';
import logo from './logo.svg';
import Grid from './Grid'
import './App.css';

class App extends Component {
  
    state ={
        grid :null,
        gridHeight : 10,
        gridWidth : 8
    }

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

    initGame = () => {
        this.setState({grid: this.buildGrid()})
    }

    componentDidMount() {
        this.initGame()
    }

  render(){
    return(
      <div id="wrapper_tetris">
      <h1>Tetris</h1>
      {this.state.grid  !== null &&     <Grid grid={this.state.grid}/>}
  
      </div>
    )
    
    }
  }




export default App;
