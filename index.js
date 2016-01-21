const history = require('sheet-router/history')
const bridge = require('sheet-router/bridge')
const sheetRouter = require('sheet-router')
const createApp = require('virtual-app')
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const xtend = require('xtend')

const hx = hyperx(vdom.h)

// initialize and attach
const app = createApp(document.body, vdom)
const initialState = { count: 0, mod: 1, location: document.location.href }
const render = app.start(modifyState, initialState)
const router = createRouter()
history((href) => app.store({ type: 'location', location: href }))
bridge(render, (state) => router(state.location, app.h))

// routing
function createRouter () {
  return sheetRouter('/404', function (r, t) {
    return [
      t('/', template(singleHead)),
      t('/double', template(multiHead)),
      t('/404', template(errorHead))
    ]
  })
}

// manage state changes
function modifyState (action, state) {
  if (action.type === 'location') {
    return xtend(state, { location: action.location })
  }
  if (action.type === 'increment') {
    return xtend(state, { count: state.count + 1 })
  }
  if (action.type === 'decrement') {
    return xtend(state, { count: state.count - 1 })
  }
}

// render views
function template (head) {
  return function template (params, h, state) {
    return hx`
      <main>
        <a href="/">single</a>
        <a href="/double?foo=bar">double</a>
        ${head(params, h, state)}
        <p>modifier is ${state.mod}</p>
        <div>count: ${state.count}</div>
        <button onclick=${app.send({ type: 'decrement' })}>
          -${state.mod}
        </button>
        <button onclick=${app.send({ type: 'increment' })}>
          +${state.mod}
        </button>
      </main>
    `
  }
}

// head component
function singleHead (params, h, state) {
  return hx`<h1>super single</h1>`
}

// another head component
function multiHead (params, h, state) {
  return hx`<h1>double up!</h1>`
}

// signal an error
function errorHead (params, h, state) {
  return hx`<h1>OH NO!</h1>`
}
