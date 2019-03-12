import * as publicFunctions from './docs-utilities.js';

// Expose public functions
global.onOpen = publicFunctions.onOpen;
global.onInstall = publicFunctions.onInstall;
global.showSidebar = publicFunctions.showSidebar;
