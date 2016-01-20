# playground-virtual-app
Playing around with some `virtual-*` tech. Creates a minimal (`11Kb`) modern JS
application that can be rendered on both client and server.

## Installation
```sh
$ git clone git@github.com:yoshuawuyts/playground-virtual-app.git
```

## Features
- [x] [router](https://github.com/yoshuawuyts/sheet-router)
- [x] [virtual-dom rendering](https://github.com/Matt-Esch/virtual-dom)
- [x] [immutable data structures](https://github.com/Raynos/xtend)
- [x] [unidirectional event flow](https://github.com/sethvincent/store-emitter)
- [x] [human readable templates](https://github.com/substack/hyperx)
- [ ] [inline stylesheet declaration](https://github.com/sheetify/sheetify)

## Usage
```txt
Lifecycle scripts included in playground-virtual-app:
  start
    NODE_ENV=development budo . --t sheetify/transform

available via `npm run-script`:
  build
    NODE_ENV=production browserify index.js -g unassertify -g uglifyify
  disc
    NODE_ENV=production browserify index.js -g unassertify -g uglifyify --full-paths | discify --open
  size
    npm run build | gzip-size | pretty-bytes
```

## License
[MIT](https://tldrlegal.com/license/mit-license)
