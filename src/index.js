import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'
import { createHistory, useBasename } from 'history'

import './css/style.css'

import Index from './components/Index'
import App from './components/App'
import StorePicker from './components/StorePicker'
import NotFound from './components/NotFound'

const history = useBasename(createHistory)({
  basename: '/catch-of-the-day'
})

const Root = () => {
  return (
    <Router history={history}>
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
