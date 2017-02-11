import React from 'react'

class Index extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <div className="routerView">
        {this.props.children}
      </div>
    )
  }
}

export default Index
