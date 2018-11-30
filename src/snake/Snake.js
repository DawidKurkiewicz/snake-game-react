import React from 'react'
import GameBoard from './GameBoard';


class Snake extends React.Component {
    constructor(props) {
        super()

        const halfBoardDimension = Math.ceil(props.boardDimension / 2) - 1

        this.intervalId = null
        this.currentGameBoard = null
        this.direction = 'right'
        this.currentPlayerIndex = 0


        this.state = {
            gameBoard: (
                Array(props.boardDimension)
                    .fill(
                        Array(props.boardDimension)
                            .fill(1)
                    )
            ),
            snakes: [
                [
                    { x: halfBoardDimension + 2, y: halfBoardDimension },
                    { x: halfBoardDimension + 1, y: halfBoardDimension }

                ],
                [
                    { x: halfBoardDimension - 2, y: halfBoardDimension },
                    { x: halfBoardDimension - 1, y: halfBoardDimension }

                ]
            ],

            meals: [],
            gameTickTime: props.startGameTickTime
        }
    }
    componentDidMount() {
        this.intervalId = setInterval(
            this.gameTick,
            this.state.gameTickTime

        )
        window.addEventListener(
            'keydown',
            this.onArrowKeyDown
        )
        this.placeNewMeal()

    }
    componentWillUnmount() {
        clearInterval(this.intervalId)
        window.removeEventListener(
            'keydown',
            this.onArrowKeyDown
        )

    }
    gameTick = () => {
        this.checkIfMovesAreAvailable()
    }
    placeNewMeal = () => {
        this.setState({
            meals: this.state.meals.concat(
                this.generateNewMealPosition()
            )
        })
    }

    generateNewMealPosition = () => {
        const randomX = Math.round(Math.random() * (this.props.boardDimension) - 1)
        const randomY = Math.round(Math.random() * (this.props.boardDimension) - 1)
        return {
            x: randomX,
            y: randomY
        }
    }

    checkIfMovesAreAvailable = () => {
        const snakeHeadPosition = this.state.snakes[this.currentPlayerIndex][0]
        let newSnakeHeadPosition = null
        switch (this.direction) {
            case 'left':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x - 1,
                    y: snakeHeadPosition.y
                }
                break
            case 'right':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x + 1,
                    y: snakeHeadPosition.y
                }
                break
            case 'up':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x,
                    y: snakeHeadPosition.y - 1
                }
                break
            case 'down':
                newSnakeHeadPosition = {
                    x: snakeHeadPosition.x,
                    y: snakeHeadPosition.y + 1
                }
                break
            default:
        }
        if (
            this.currentGameBoard[newSnakeHeadPosition.y] &&
            this.currentGameBoard[newSnakeHeadPosition.y][newSnakeHeadPosition.x]
        ) {
            this.checkIfIsMealOnNextMovePosition(newSnakeHeadPosition)
        } else {
            this.endGame()
        }
    }



    checkIfIsMealOnNextMovePosition = (newSnakeHeadPosition) => {
        const newMeals = this.state.meals.filter(
            mealPosition => (
                mealPosition.x !== newSnakeHeadPosition.x ||
                mealPosition.y !== newSnakeHeadPosition.y
            )
        )
        if (newMeals.length === this.state.meals.length) {
            this.moveSnake(newSnakeHeadPosition)

        } else {
            this.moveSnakeOnMeal(newSnakeHeadPosition)
            this.setState({

                meals: newMeals
            })
        }
    }
    moveSnakeOnMeal = (newSnakeHeadPosition) => {
        const snake = this.state.snakes[this.currentPlayerIndex]
        const snakeWithNewHead = [newSnakeHeadPosition].concat(snake)

        const newSnakes = this.state.snakes.map((snake, i) => (
            this.currentPlayerIndex === i ?
                snakeWithNewHead
                :
                snake
        ))

        this.setState({
            snakes: newSnakes
        })
    }

    moveSnake = (newSnakeHeadPosition) => {
        const snake = this.state.snakes[this.currentPlayerIndex]
        const snakeWithoutTail = snake.slice(0, -1)
        const snakeWithNewHead = [newSnakeHeadPosition].concat(snakeWithoutTail)

        const newSnakes = this.state.snakes.map((snake, i) => (
            this.currentPlayerIndex === i ?
                snakeWithNewHead :
                snake
        ))

        this.setState({
            snakes: newSnakes
        })
    }

    endGame = () => {
        alert(`Lost!`)
    }



    onArrowKeyDown = event => {
        switch (event.key) {
            case 'ArrowUp':
                this.direction = 'up'
                break
            case 'ArrowDown':
                this.direction = 'down'
                break
            case 'ArrowLeft':
                this.direction = 'left'
                break
            case 'ArrowRight':
                this.direction = 'right'
                break
            default:
        }
    }
    composeGameBoard = () => {
        const gameBoardCopy = JSON.parse(JSON.stringify(this.state.gameBoard))

        this.state.snakes
            .forEach(snake => (
                snake.forEach(bodyCellPosition => (
                    gameBoardCopy[bodyCellPosition.y][bodyCellPosition.x] = 0
                ))
            ))

        this.state.meals.forEach(mealPosition => (
            gameBoardCopy[mealPosition.y][mealPosition.x] = 'F'
        ))
        return gameBoardCopy
    }

    render() {
        this.currentGameBoard = this.composeGameBoard()
        return (
            <div>
                <GameBoard
                    gameBoard={this.currentGameBoard}
                />
            </div>
        )
    }
}

Snake.defaultProps = {
    boardDimension: 11,
    startGameTickTime: 1000
}
export default Snake