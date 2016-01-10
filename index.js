const createApp = require('virtual-app')
const vdom = require('virtual-dom')
const hyperx = require('hyperx')
const xtend = require('xtend')

const hx = hyperx(vdom.h)

// attach
const app = createApp(document.body, vdom)
const render = app.start(modifier, { example: false, title: '' })
function modifier (action, state) {
  if (action.type === 'example') return xtend(state, { example: true })
  if (action.type === 'title') return xtend(state, { title: action.title })
}

// render loop
render(function render (state) {
  return hx`<h1>${state.title}</h1>`
})

// states
app.on('*', function (action, state, oldState) {
  console.log('action happened ' + JSON.stringify(action))
})

app.on('title', function (action, state, oldState) {
  console.log('state has new title: ' + state.title)
})

// trigger some actions
app.store({ type: 'example' })
app.store({ type: 'title', title: 'awesome example' })
