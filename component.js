const sheetify = function () {}

const prefix = sheetify(`h1 {
  text-align: center;
}`, { isFile: false })

module.exports = render

function render (hx, state) {
  return hx`<h1 class=${prefix}>${state.title}</h1>`
}
