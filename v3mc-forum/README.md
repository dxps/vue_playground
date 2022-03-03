# v3mc-forum

A forum app.

<br/>

## VSCode Notes

Using these extensions:
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)

And have these related settings:
```json
"[vue]": {
    "editor.defaultFormatter": "octref.vetur"
},
"vetur.format.defaultFormatter.js": "prettier",
```

<br/>

## Setup & Usage

Run: 

- `pnpm i` to install the dependencies
- `pnpm run serve` for compiling and hot reloading during development.
- `pnpm run build` for doing (incl minification) the production build.
- `pnpm run list --fix` for linting and fixes (according to `.eslintrc.js`)<br/>
  To use the same 4 spaces indentation, added also the VSCode setting `"editor.detectIndentation": false`
  
<br/>
