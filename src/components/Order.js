import React from 'react'
import { formatPrice } from '../helpers'

class Order extends React.Component {
  constructor (props) {
    super(props)

    this.renderOrder = this.renderOrder.bind(this)
  }

  renderOrder (key) {
    const fish = this.props.fishes[key]
    const count = this.props.order[key]

    const btnRemove = <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>

    if (!fish || fish.status === 'unavailable') {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : 'Fish'} is no longer available! {btnRemove}
        </li>
      )
    }

    return (
      <li key={key}>
        <span>{count}lbs {fish.name}</span> {btnRemove}
        <span className="price">{formatPrice(count * fish.price || 0)}</span>
      </li>
    )
  }

  render () {
    const orderIds = Object.keys(this.props.order)
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key]
      const count = this.props.order[key]
      const isAvailable = fish && fish.status === 'available'

      if (isAvailable) {
        return prevTotal + (count * fish.price || 0)
      }

      return prevTotal
    }, 0)

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {
            orderIds.map(this.renderOrder)
          }
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    )
  }
}

Order.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  order: React.PropTypes.object.isRequired,
  removeFromOrder: React.PropTypes.func.isRequired
}

export default Order
