import React from 'react'


const style = {
    display: 'flex',
    flexBasis: '10%',
    justifyContent: 'center',
    alignItems: 'center'

}

const GameCell = (props) => {
    const color = (
        props.cell === 0 ?
            'black'
            :
            props.cell === 'F' ?
                'green'
                :
                'white'
    )

    return (
        <div
            style={{
                ...style,
                flexBases: 100 / props.numberOfCells + '%',
                backgroundColor: color
            }}
        >
        </div>
    )
}
export default GameCell