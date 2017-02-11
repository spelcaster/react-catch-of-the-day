import React from 'react'

class Index extends React.Component {
  render () {
    return (
      <div className="routerView">
        {this.props.children}
      </div>
    )
  }
}

Index.propTypes = {
  children: React.PropTypes.object.isRequired
}

export default Index
