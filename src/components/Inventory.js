import React from 'react'

import AddFishForm from './AddFishForm'

import base from '../base'

class Inventory extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      uid: null,
      owner: null
    }

    this.renderInventory = this.renderInventory.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderLogin = this.renderLogin.bind(this)
    this.authenticate = this.authenticate.bind(this)
    this.logout = this.logout.bind(this)
    this.authHandler = this.authHandler.bind(this)
  }

  componentDidMount () {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, { user })
      }
    })
  }

  handleChange (e, key) {
    const fish = this.props.fishes[key]

    // update fish with new data
    const updateFish = {
      ...fish,
      [e.target.name]: e.target.value
    }

    this.props.updateFish(key, updateFish)
  }

  renderLogin () {
    return (
      <nav className='login'>
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className='github' onClick={() => this.authenticate('github')}>
          Log In with Github
        </button>
        <button className='facebook' onClick={() => this.authenticate('facebook')}>
          Log In with Facebook
        </button>
        <button className='twitter' onClick={() =>
          this.authenticate('twitter')}>Log In with Twitter
        </button>
      </nav>
    )
  }

  authenticate (provider) {
    base.authWithOAuthPopup(provider, this.authHandler)
  }

  logout () {
    base.unauth()
    this.setState({
      uid: null
    })
  }

  authHandler (err, authData) {
    if (err) {
      console.error(err)
      return
    }

    const storeRef = base.database().ref(this.props.storeId)
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {}

      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        })
      }

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      })
    })
  }

  renderInventory (key) {
    const fish = this.props.fishes[key]

    return (
      <div className='fish-edit' key={key}>
        <input type='text' placeholder='Fish Name' name='name'
          value={fish.name} onChange={(e) => this.handleChange(e, key)} />
        <input type='text' placeholder='Fish Price' name='price'
          value={fish.price} onChange={(e) => this.handleChange(e, key)} />
        <select name='status' value={fish.status} onChange={(e) =>
          this.handleChange(e, key)} >
          <option value='available'>Fresh!</option>
          <option value='unavailable'>Sold Out</option>
        </select>
        <textarea placeholder='Fish Desc' name='desc' value={fish.desc}
          onChange={(e) => this.handleChange(e, key)} />
        <input type='text' placeholder='Fish Fish Image' name='image'
          value={fish.image} onChange={(e) => this.handleChange(e, key)} />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    )
  }

  render () {
    const logout = <button onClick={this.logout}>Log Out</button>

    if (!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      )
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store!</p>
          {logout}
        </div>
      )
    }

    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
}

Inventory.propTypes = {
  fishes: React.PropTypes.object,
  updateFish: React.PropTypes.func.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  addFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
}

export default Inventory
