import React, {Component} from 'react';
import logo from './logo.svg';
import Grid from './Grid'
import pieceCollection from './pieceCollection'
import NextPiece from './NextPiece'
import Menu from "./Menu"
import Game from "./Game"
import Options from "./Options"
import './App.css';

class App extends Component {
  
    state ={
        componentToLoaded : Menu,
        actions: null

    }

    componentDidMount(){
        this.launchMenu()
    }


    launchGame = () => {
        this.setState({componentToLoaded: Game, actions:{
            launchMenu : () => this.launchMenu(),

        }})

    }

    launchOptions = () => {
        this.setState({componentToLoaded: Options,  actions:{
            launchMenu : () => this.launchMenu(),

        }})

    }

    launchMenu = () =>{
        this.setState({
            componentToLoaded: Menu, 
            actions: 
                {
                    launchGame : () => this.launchGame(),
                    launchOptions : () => this.launchOptions()
          }
        }
        )
    }





    
    
   

  render(){
    return(
      <div id="wrapper_tetris">

          { (this.state.componentToLoaded !== 0 &&         
            <this.state.componentToLoaded actions={this.state.actions}/>
)}

        </div>
    )
    
    }
  }




export default App;
