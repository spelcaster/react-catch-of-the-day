import React from 'react'
import { getFunName } from '../helpers'

class StorePicker extends React.Component {
  static propTypes = {
    router: React.PropTypes.object
  }

  goToStore = (event) => {
    event.preventDefault()
    const storeId = this.storeInput.value
    console.log(storeId)
    this.props.router.push('/store/' + storeId)
  }

  render () {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input type="text" required placeholder="Store Name"
          defaultValue={getFunName()}
          ref={(input) => { this.storeInput = input }} />
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

export default StorePicker
