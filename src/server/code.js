// Use ES6/7 code
const onOpen = (e) =>
    DocumentApp.getUi() // Or SheetsApp or FormApp.
        .createAddonMenu()
        .addItem('360AI', 'showSidebar')
        .addToUi();

const onInstall = (e) => onOpen(e);

const showSidebar = () => {
    const ui = HtmlService.createHtmlOutputFromFile('index.html').setTitle(
        'Author Insights with EDIA\'s 360AI '
    );
    return DocumentApp.getUi().showSidebar(ui);
};

// Expose public functions
global.onOpen = onOpen;
global.onInstall = onInstall;
global.showSidebar = showSidebar;
