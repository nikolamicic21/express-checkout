const { Builder, By, until } = require('selenium-webdriver');

const { getElement, clickEnabledElement, expectVisibleXPathElement } = require('../services/elementUtils');

const isDocStateComplete = async () => {
    let readyState = await DRIVER.executeScript('return document.readyState');
    return readyState.toString() === 'complete';
};

const checkUrlTitle = async title => {
    let currentUrl = await DRIVER.getCurrentUrl();
    return currentUrl.includes(title);
};

const switchToWindow = async handle => {
    await DRIVER.switchTo().window(handle);
};

const checkWindowCount = async count => {
    let handles = await DRIVER.getAllWindowHandles();
    return handles.length === count;
};

async function loadNewPage() {
    try {
        let url = "http://localhost:3000/";
        return DRIVER.get(url);
    } catch (error) {
        console.log(error);

        // If the process needs to be terminated instead of returning a rejected Promise
        // then comment the return Promise line and uncomment the process.exit line.
        return Promise.reject(error);
        //process.exit(1);
    }
}

async function maximizeWindow() {
    let window = DRIVER.manage().window();
    return window.maximize();
}

async function switchToNextWindow() {
    return DRIVER.getAllWindowHandles().then(handles => switchToWindow(handles.pop()));
}

async function refreshPage() {
    let navigator = await DRIVER.navigate();
    await navigator.refresh();
    return DRIVER.wait(() => isDocStateComplete());
}

function switchToFrame(index) {
    return DRIVER.wait(until.ableToSwitchToFrame(index), TIME);
}

function switchToDefaultContent() {
    return DRIVER.switchTo().defaultContent();
}

function switchToParentFrame() {
    return DRIVER.switchTo().parentFrame();
}

async function waitForWindowCount(count) {
    return DRIVER.wait(() => checkWindowCount(count));
}

async function waitForUrlTitle(title) {
    return DRIVER.wait(() => checkUrlTitle(title));
}

module.exports = {
    isDocStateComplete,
    refreshPage,
    switchToFrame,
    switchToDefaultContent,
    switchToParentFrame,
    checkUrlTitle,
    waitForWindowCount,
    loadNewPage,
    maximizeWindow,
    waitForUrlTitle,
    switchToNextWindow
};
