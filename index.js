const history = require('sheet-router/history')
const sheetRouter = require('sheet-router')
const createApp = require('virtual-app')
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const xtend = require('xtend')

const hx = hyperx(vdom.h)

// routing
const router = sheetRouter('/404', function (r) {
  return [
    r('/', function (params, h, state) {
      console.log('/')
      return template(h, state)
    }),
    r('/double', function (params, h, state) {
      console.log('/double')
      console.log(state)
      return template(h, state)
    }),
    r('/404', function (params, h, state) {
      console.log('/404')
      return template(h, state)
    })
  ]
})
history(router)

// initialize and attach
const app = createApp(document.body, vdom)
const initialState = { count: 0, location: document.location.href }
const render = app.start(modifyState, initialState)
render((state) => router(state.location, app.h, state))

// manage state changes
function modifyState (action, state) {
  if (action.type === 'increment') {
    return xtend(state, { count: state.count + 1 })
  }
  if (action.type === 'decrement') {
    return xtend(state, { count: state.count - 1 })
  }
}

function template (h, state) {
  return hx`
    <main>
      <a href="/">single</a>
      <a href="/double?foo=bar">double</a>
      <div>${state.count}</div>
      <button onclick=${app.send({ type: 'decrement' })}>-1</button>
      <button onclick=${app.send({ type: 'increment' })}>+1</button>
    </main>
  `
}
