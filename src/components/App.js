import React from 'react'
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'

import sampleFishes from '../sample-fishes'

class App extends React.Component {
  constructor () {
    super()

    // getInitialState
    this.state = {
      fishes: {},
      order: {}
    }

    this.addFish = this.addFish.bind(this)
    this.loadSampleFishes = this.loadSampleFishes.bind(this)
    this.addToOrder = this.addToOrder.bind(this)
  }

  loadSampleFishes () {
    this.setState({ fishes: sampleFishes })
  }

  addFish (fish) {
    const fishes = {...this.state.fishes}
    const timestamp = Date.now()

    fishes['fish-' + timestamp] = fish

    this.setState({ fishes })
  }

  addToOrder (key) {
    const order = {...this.state.order}
    order[key] = order[key] + 1 || 1

    this.setState({ order })
  }

  render () {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object.keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory loadSamples={this.loadSampleFishes} addFish={this.addFish} />
      </div>
    )
  }
}

export default App
