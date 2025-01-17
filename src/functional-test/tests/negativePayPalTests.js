/*
 * Copyright (c) 2019 Payoneer Germany GmbH. All rights reserved.
 */

const { Builder, By } = require("selenium-webdriver");
const { clearAndSendKeysToVisibleElement } = require("../services/elementUtils");
const { loadNewPage, waitForDocStateComplete, switchToDefaultContent, waitForUrlContainsValues } = require("../services/pageUtils");
const { clickOnPayPalButton } = require("../services/paypal");

const negativePayPalTests = (index) => {
    beforeEach(async () => {
        await loadNewPage();
        await waitForDocStateComplete();
        await switchToDefaultContent();
    });

    afterEach(async () => {
        await switchToDefaultContent();
    });
    it("Check magic number 100.04, TRY_OTHER_ACCOUNT, INVALID_ACCOUNT", async () => {
        await clearAndSendKeysToVisibleElement("[test-id=price1]", "100.04");
        await clickOnPayPalButton(index);
        await waitForUrlContainsValues(["interactionCode=TRY_OTHER_ACCOUNT", "interactionReason=INVALID_ACCOUNT"]);
    });

    it("Checks magic number 101.03, TRY_OTHER_NETWORK, NETWORK_FAILURE", async () => {
        await clearAndSendKeysToVisibleElement("[test-id=price1]", "101.03");
        await clickOnPayPalButton(index);
        await waitForUrlContainsValues(["interactionCode=TRY_OTHER_NETWORK", "interactionReason=NETWORK_FAILURE"]);
    });

    it("Checks magic number 104.11, TRY_OTHER_ACCOUNT, INVALID_ACCOUNT", async () => {
        await clearAndSendKeysToVisibleElement("[test-id=price1]", "104.11");
        await clickOnPayPalButton(index);
        await waitForUrlContainsValues(["interactionCode=TRY_OTHER_ACCOUNT", "interactionReason=INVALID_ACCOUNT"]);
    });

    it("Checks magic number 100.14, RETRY, TEMPORARY_FAILURE", async () => {
        await clearAndSendKeysToVisibleElement("[test-id=price1]", "100.14");
        await clickOnPayPalButton(index);
        await waitForUrlContainsValues(["interactionCode=RETRY", "interactionReason=TEMPORARY_FAILURE"]);
    });

    it("Checks magic number 104.02, TRY_OTHER_ACCOUNT, NETWORK_FAILURE", async () => {
        await clearAndSendKeysToVisibleElement("[test-id=price1]", "104.02");
        await clickOnPayPalButton(index);
        await waitForUrlContainsValues(["interactionCode=TRY_OTHER_NETWORK", "interactionReason=NETWORK_FAILURE"]);
    });

    it("Checks magic number 100.14, TRY_OTHER_ACCOUNT, NETWORK_FAILURE", async () => {
        await clearAndSendKeysToVisibleElement("[test-id=price1]", "100.14");
        await clickOnPayPalButton(index);
        await waitForUrlContainsValues(["interactionCode=RETRY", "interactionReason=TEMPORARY_FAILURE"]);
    });
};

const negativePaypalCheckoutTests = () => negativePayPalTests(0);
const negativePaypalPayLaterTests = () => negativePayPalTests(4);

module.exports = {
    negativePaypalCheckoutTests,
    negativePaypalPayLaterTests,
};
