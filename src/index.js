import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import './css/style.css'

import Index from './components/Index'
import App from './components/App'
import StorePicker from './components/StorePicker'
import NotFound from './components/NotFound'

const Root = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Index}>
        <IndexRoute component={StorePicker} />
        <Route path="store/:storeId" component={App} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  )
}

ReactDOM.render(
  <Root />,
  document.getElementById('main')
)
