// Use ES6/7 code
const onOpen = (e) =>
    DocumentApp.getUi() // Or SheetsApp or FormApp.
        .createAddonMenu()
        .addItem('360AI', 'showSidebar')
        .addToUi();

const onInstall = (e) => onOpen(e);

const showSidebar = () => {
    const ui = HtmlService.createHtmlOutputFromFile('dialog.html').setTitle(
        'Author Extension in React'
    );
    return DocumentApp.getUi().showSidebar(ui);
};

export {onOpen, onInstall, showSidebar};
