# Slim Gooogle Docs Extension based on React

Based on: https://github.com/enuchi/React-Google-Apps-Script

This version is slightly smaller with less files and no animation.

## Installation

Clone the sample project and install dependencies:

Then [create a new Google Docs document](https://docs.google.com). Open the Script Editor and copy the script's scriptId. [**Tools > Script Editor**, then **File > Project properties**].

Paste the **scriptId** into the .clasp.json file as below:

```json
// .clasp.json

{
    "rootDir": "dist",
    "scriptId": "...paste scriptId here..."
}
```

If you have not enabled Google's Apps Script API, do so by visiting https://script.google.com/home/usersettings.
Log into CLASP to push code to the server from the command line:

```
npx clasp login
```

Modify the server-side and client-side source code in the `src` folder using ES6/7 and React. Change the scopes in `appsscript.json` if needed. When you're ready, build the app and deploy!

```
npm run deploy
```

Webpack will display any linting errors, bundle your files in `dist`, and push your files to Google's servers using CLASP. You can run `npm run build` to just build.

## How it works

"[Google Apps Script](https://en.wikipedia.org/wiki/Google_Apps_Script) is based on JavaScript 1.6 with some portions of 1.7 and 1.8 and provides subset of ECMAScript 5 API."

That means many JavaScript tools used today in modern web development will not work in the Google Apps Script environment, including `let`/`const` declarations, arrow functions, spread operator, etc.

This project circumvents those restrictions by transpiling newer code to older code that Google Apps Script understands using Babel, and also bundles separate files and modules using Webpack.

On the client-side, there are restrictions on the way HTML dialogs are used in Google Apps (Sheets, Docs and Forms). In web development you can simply reference a separate css file:

```html
<link rel="stylesheet" href="styles.css">
```

In the Google Apps Script environment you need to use [HTML templates](https://developers.google.com/apps-script/guides/html/templates), which can be cumbersome. With this project, all files are bundled together by inlining .css and .js files. Using a transpiler and bundling tool also allows us to use JSX syntax, and external libraries such as React.

## Features

-   Support for JSX syntax:

```js
return <div>Name: {person.firstName}</div>;
```

-   Support for external packages. Simply install with npm or from a file and `import`:

```shell
$ npm install react-addons-css-transition-group
```

```js
// index.jsx
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
```

-   `import` CSS from another file:

```js
import "./styles.css";
```

-   Make server calls in React with `google.script.run`:

```js
componentDidMount() {
  google.script.run
     .withSuccessHandler((data) => this.setState({names: data}))
     .withFailureHandler((error) => alert(error))
     .getSheetsData()
}
```

-   Use newer ES6/7 code, including arrow functions, spread operators, `const`/`let`, and more:

```js
const getSheetsData = () => {
    let activeSheetName = getActiveSheetName();
    return getSheets().map((sheet, index) => {
        let sheetName = sheet.getName();
        return {
            text: sheetName,
            sheetIndex: index,
            isActive: sheetName === activeSheetName
        };
    });
};
```

## Tern support

This project includes support for GAS definitions and autocomplete through a [Tern](http://ternjs.net/) plugin. Tern is a code-analysis engine for JavaScript, providing many useful tools for developing. See Tern's site for setup instructions for many popular code editors, such as Sublime, Vim and others.

Tern provides many indispensable tools for working with Google Apps Script, such as autocompletion on variables and properties, function argument hints and querying the type of an expression.

-   Autocomplete example. Lists all available methods from the appropriate Google Apps Script API:
    ![tern support](https://i.imgur.com/s1OrQNr.png "autocomplete and intelligent type detection with Tern")

-   Full definitions with links to official documentation, plus information on argument and return type:
    ![tern support](https://i.imgur.com/yg5VwAC.png "definitions with links to official documentation make developing with Google Apps Script")

## Extending this app

-   You can split up server-side code into multiple files and folders using `import` and `export` statements.
-   Make sure to expose all public functions including any functions called from the client with `google.script.run` as well as onOpen. Example below shows assignment to `global` object:

```
const onOpen = () => {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .createMenu('Dialog')
        .addItem('Add sheets', 'openDialog')
        .addToUi();
}

global.onOpen = onOpen
```

-   You may wish to remove automatic linting when running Webpack. You can do so by editing the Webpack config file and commenting out the eslintConfig line in client or server settings:

```
// webpack.config.js

const clientConfig = Object.assign({}, sharedConfigSettings, {
  ...
  module: {
    rules: [
      // eslintConfig,
      {
```

## Suggestions

Open a pull request!
