import React, { Component } from 'react'
import Snake from './snake/Snake'
import {database } from './firebaseConfig'

class App extends Component {
  render() {
    return (
      <div>
        <Snake
        firebaseDatabase = {database}
        />
      </div>
    )
  }
}

export default App
