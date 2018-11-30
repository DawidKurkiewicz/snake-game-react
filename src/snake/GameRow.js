import React from 'react'
import GameCell from './GameCell'

const style = {
    display: 'flex'
}

const GameRow = (props => (
    <div
    style={style}
    >
        {
            props.row.map(cell => (
                <GameCell
                    cell={cell}
                />
            ))
        }
    </div>
))
export default GameRow