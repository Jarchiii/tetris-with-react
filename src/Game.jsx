  
import React, { Component } from 'react'
import Grid from './Grid'
import pieceCollection from './pieceCollection'
import NextPiece from './NextPiece'

import LevelAndLine from './LevelAndLine'
import TimeAndScore from './TimeAndScore'


class Game extends Component{

	state = {
		grid: null,
		gridHeight: 20,
		gridWidth: 10,
		piece: null,
		nbrCleanLine: 0,
		lvl: 1,
		nextPieceIndex: null,
		isLostGame: false,
		options: {},
		score: 0,
		linePerLvl: 5
	}

	// preview next piece
	componentDidMount() { 

	
		
        this.initGame()
        let keyPressed = []
        let multipleKeyPressed = false
        window.addEventListener("keyup", (e) => {
            multipleKeyPressed = false
            let index = keyPressed.indexOf(e.keyCode)
            keyPressed.splice(index ,1)
        })

        window.addEventListener("keydown", (e) => {
            console.log(e.keyCode)
           if (keyPressed.indexOf(e.keyCode) === -1) {
                keyPressed.push(e.keyCode)
            }

           if (keyPressed.length> 1) {
                keyPressed.forEach(
                   (keyCode, index) => {
                       if (multipleKeyPressed === false && index === 0) {
                       multipleKeyPressed = true
                       } else {
                        this.exectueKeyCode(keyCode)
                       }
                   }
                )
            } else{
                this.exectueKeyCode(keyPressed[0])
            }



            // switch (e.keyCode) {
            //     case 39: this.pieceMoveToXAxis(1)
            //         break;
            //     case 37 : this.pieceMoveToXAxis(-1)
            //         break;
            //     case 40 : this.pieceMoveToYAxis(1)
            //         break;
            //     case 88 : this.rotatePiece("right")
            //         break;
            //     case 89 : this.rotatePiece("left")
            //         break;
            //     default : break;
            
            // }

            //37 gauche
            //39 droite
            // 40 bas
    })
  }

  exectueKeyCode = (keyCode) => {
    switch (keyCode) {
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

  }

	



	initGame = () => {

		this.baseIntervalTimer = 1000
		this.globalTimer = 0

		setInterval(() => { 
			this.globalTimer++
		},1000)

		this.key_pressed = []
		this.multiple_key_pressed = false

		//keyboard bind
		window.addEventListener("keyup", this.keyupActions)
		window.addEventListener("keydown", this.keydownActions)

		this.setState({
			grid: this.buildGrid(),
			nextPieceIndex: this.generateNextPieceIndex(),
			nbrCleanLine: 0,
			lvl: 1,
			isLostGame: false,
			score:0
		}, () => {
			this.generatePiece()

			this.launchTimer()
		})
	}

	lostGame = () => {
		//mettre fin au jeu
		clearInterval(this.timer)
		//set status lost game
		this.setState({ isLostGame: true })
		//debind event
		window.removeEventListener("keyup", this.keyupActions)
		window.removeEventListener("keydown", this.keydownActions)
	}

	//TIMER FONCTION
	launchTimer = () => {
		this.timer = setInterval(() => {
			this.pieceMoveToYAxis(1)
		}, this.convertLvlToTime())
	}

	convertLvlToTime = () => { 	
		let interval = this.baseIntervalTimer - (this.state.lvl - 1) * 35
		return (interval < 100) ? 100 : interval
	}

	//GRID FUNCTIONS
	buildGrid = () => {

		let grid = []

		for (let y = 0; y < this.state.gridHeight; y++) {
			let line = []
			for (let x = 0; x < this.state.gridWidth; x++) {
				line.push(0);
			}
			grid.push(line)
		}

		return grid

	}

	mergePieceToGrid = () => {

		let score = this.state.score
		let lvl = this.state.lvl
		let lvlChanged = false
		const virtualGrid = this.state.grid
		let nbrCleanLine = this.state.nbrCleanLine

		this.state.piece.mergeData.forEach(element => {
			const [y, x] = element.split("_")
			virtualGrid[y][x] = this.state.piece.color
		});

		let { cleanGrid, nbrLineCompleted } = this.cleanGrid(virtualGrid)
		nbrCleanLine += nbrLineCompleted


		if (nbrLineCompleted > 0) { 
			
			//update score
			score += parseInt(Math.pow(nbrLineCompleted, 2) * lvl * this.convertLvlToTime())
			
			//changement of lvl
			if (nbrCleanLine >= this.state.linePerLvl) { 
				nbrCleanLine = 0
				lvl++
				lvlChanged = true
				clearInterval(this.timer)
			}

		}
		
		this.setState({ grid: cleanGrid, piece: null, nbrCleanLine, lvl, score }, () => { 
			this.generatePiece()
			if (lvlChanged) { 
				this.launchTimer()
			}
		})
	}

	//PIECE FUNCTIONS
	generateNextPieceIndex() { 
		return Math.floor( Math.random() * pieceCollection.length )
	}

	generatePiece = () => {

		let piece = {}
		piece.posY = 0

		let indexPieceCollection = this.state.nextPieceIndex
		piece.color = indexPieceCollection + 1 // +1 because 0 is empty cell

		piece.grid = pieceCollection[indexPieceCollection]
		//if value of 0,0 coordinate equal 0 offset y to -1 for init spawn
		if (piece.grid[0][0] === 0) { 
			piece.posY--
		}

		piece.posX = Math.floor( (this.state.gridWidth - piece.grid[0].length) / 2 )
		
		piece.mergeData = []
		let coordinate = this.pieceCanBeMove(piece)
		if (coordinate !== false) {
			piece.mergeData = coordinate
			this.setState({ piece, nextPieceIndex: this.generateNextPieceIndex() })
		} else { 
			this.lostGame()
		}

	}

	pieceCanBeMove = (piece) => { 
		
        let coordinate = []
        if (piece.grid !=undefined){
		for (let y = 0; y < piece.grid.length; y++) {
			for (let x = 0; x < piece.grid[0].length; x++) {
				if (piece.grid[y][x] > 0) { 

					if (this.state.grid[y + piece.posY] === undefined) { 
						return false // out of range Y
					}

					if (this.state.grid[y + piece.posY][x + piece.posX] === undefined) { 
						return false //out of range X
					}

					if (this.state.grid[y + piece.posY][x + piece.posX] > 0) { 
						return false
					}

					coordinate.push( (y + piece.posY) + "_" + (x + piece.posX) )
				}
			}
		}

		return coordinate

    }
}

	pieceMoveToXAxis = (deltaX) => { 
		
		let piece = { ...this.state.piece }

		if (piece === null) { 
			return false
		}

		piece.posX += deltaX

		let coordinate = this.pieceCanBeMove(piece)
		if (coordinate !== false) { 
			piece.mergeData = coordinate
			this.setState({piece})
		}

	}


	pieceMoveToYAxis = (deltaY) => { 
		
		let piece = { ...this.state.piece }

		if (piece === null) { 
			return false
		}

		piece.posY += deltaY

		let coordinate = this.pieceCanBeMove(piece)
		if (coordinate !== false) {
			piece.mergeData = coordinate
			this.setState({ piece })
		} else { 
			this.mergePieceToGrid()
		}

	}

	rotatePiece = (sense) => {

		let piece = { ...this.state.piece }

		if (piece === null) { 
			return false
		}

		let newGrid = []

		if (sense === "right") {
			for (let x = 0; x < piece.grid[0].length; x++) {
				let line = []
				for (let y = piece.grid.length - 1; y > -1; y--) {
					line.push(piece.grid[y][x]);
				}
				newGrid.push(line)
			}
		} else if ( sense === "left") { 
			for (let x = piece.grid[0].length - 1; x > -1; x--) {
				let line = []
				for (let y = 0; y < piece.grid.length; y++) {
					line.push( piece.grid[y][x] );
				}
				newGrid.push( line )
			}
		}

		piece.grid = newGrid

		let coordinate = this.pieceCanBeMove(piece)
		if (coordinate !== false) {
			piece.mergeData = coordinate
			this.setState({ piece })
		} else { 

			let isPositionUpdate = false

			//if x is out of range
			if (piece.posX < 0) {
				piece.posX = 0
				isPositionUpdate = true
			} else if (piece.grid[0].length + piece.posX  > this.state.gridWidth) {
				piece.posX = this.state.gridWidth - piece.grid[0].length
				isPositionUpdate = true
			} else if (piece.posY < 0) {
				piece.posY = 0
				isPositionUpdate = true
			}

			if (isPositionUpdate) { 
				coordinate = this.pieceCanBeMove(piece)
				if (coordinate !== false) {
					piece.mergeData = coordinate
					this.setState({ piece })
				}
			}
		}
	}

	cleanGrid = (grid) => {

		let cleanGrid = []
		let nbrLineCompleted = 0

		for (let y = 0; y < this.state.gridHeight; y++) {

			let lineCompleted = true
			for (let x = 0; x < this.state.gridWidth; x++) {
				if (grid[y][x] === 0) { 
					lineCompleted = false
				}
			}

			if (lineCompleted === false) {
				cleanGrid.push(grid[y])
			}

		}

		nbrLineCompleted = this.state.gridHeight - cleanGrid.length

		for (let i = 0; i < nbrLineCompleted; i++) { 
			cleanGrid.unshift( this.makeCleanLine(this.state.gridWidth) )
		}

		return { cleanGrid, nbrLineCompleted}

	}

	makeCleanLine(width) { 
		let line = []
		for (let x = 0; x < width; x++) {
			line.push(0)
		}
		return line
	}

	render() { 

		if (this.state.isLostGame) { 
			return (
				<div id="wrapper_lost_game">
					<h2>Game Over</h2>
					<div className="score">Score : {this.state.score}</div>
					<div id="menu">
						<button onClick={() => this.props.actions.launchMenu()}>Back</button>
					</div>					

				</div>
			)
		}

		return (
			<div id="wrapper_grid">	
				<LevelAndLine lvl={this.state.lvl} line={this.state.nbrCleanLine} linePerLvl={this.state.linePerLvl} />
				{
					this.state.nextPieceIndex !== null &&
					<NextPiece grid={pieceCollection[this.state.nextPieceIndex]} color={this.state.nextPieceIndex + 1} />
				}
				{
					this.state.grid !== null &&
						<Grid
							grid={this.state.grid}
							piece={this.state.piece}
						/>
				}
				<TimeAndScore score={this.state.score} globalTimer={this.globalTimer} />
			</div>
		)
	}

}

export default Game;