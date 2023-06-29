"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const utils_1 = require("./utils");
const fixtures_1 = require("./fixtures");
(0, fixtures_1.test)('compose an epic', async ({ page, editorPage }) => {
    const type = page.type.bind(page);
    page.type = async (selector, text, options) => {
        options = {
            delay: 1,
            ...options,
        };
        return type(selector, text, options);
    };
    await editorPage.open();
    await (0, test_1.expect)(page).toHaveTitle('Full Editor - Quill Rich Text Editor');
    await page.type('.ql-editor', 'The Whale');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual('<p>The Whale</p>');
    await page.keyboard.press('Enter');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual('<p>The Whale</p><p><br></p>');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.type('.ql-editor', fixtures_1.P1);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.type('.ql-editor', fixtures_1.P2);
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p>The Whale</p>',
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    // More than enough to get to top
    await Promise.all(Array(40)
        .fill(0)
        .map(() => page.keyboard.press('ArrowUp')));
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.type('.ql-editor', fixtures_1.CHAPTER);
    await page.keyboard.press('Enter');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p>The Whale</p>',
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    // More than enough to get to top
    await Promise.all(Array(20)
        .fill(0)
        .map(() => page.keyboard.press('ArrowUp')));
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p>Whale</p>',
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    await page.keyboard.press('Delete');
    await page.keyboard.press('Delete');
    await page.keyboard.press('Delete');
    await page.keyboard.press('Delete');
    await page.keyboard.press('Delete');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p><br></p>',
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    await page.keyboard.press('Delete');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    await page.click('.ql-toolbar .ql-bold');
    await page.click('.ql-toolbar .ql-italic');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p><strong><em><span class="ql-cursor">\uFEFF</span></em></strong></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    let bold = await page.$('.ql-toolbar .ql-bold.ql-active');
    let italic = await page.$('.ql-toolbar .ql-italic.ql-active');
    (0, test_1.expect)(bold).not.toBe(null);
    (0, test_1.expect)(italic).not.toBe(null);
    await page.type('.ql-editor', 'Moby Dick');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p><strong><em>Moby Dick</em></strong></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    bold = await page.$('.ql-toolbar .ql-bold.ql-active');
    italic = await page.$('.ql-toolbar .ql-italic.ql-active');
    (0, test_1.expect)(bold).not.toBe(null);
    (0, test_1.expect)(italic).not.toBe(null);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.down('Shift');
    await Promise.all(Array(fixtures_1.CHAPTER.length)
        .fill(0)
        .map(() => page.keyboard.press('ArrowRight')));
    await page.keyboard.up('Shift');
    bold = await page.$('.ql-toolbar .ql-bold.ql-active');
    italic = await page.$('.ql-toolbar .ql-italic.ql-active');
    (0, test_1.expect)(bold).toBe(null);
    (0, test_1.expect)(italic).toBe(null);
    await page.keyboard.down(utils_1.SHORTKEY);
    await page.keyboard.press('b');
    await page.keyboard.up(utils_1.SHORTKEY);
    bold = await page.$('.ql-toolbar .ql-bold.ql-active');
    (0, test_1.expect)(bold).not.toBe(null);
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<p><strong><em>Moby Dick</em></strong></p>',
        `<p><strong>${fixtures_1.CHAPTER}</strong></p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowUp');
    await page.click('.ql-toolbar .ql-header[value="1"]');
    (0, test_1.expect)(await editorPage.root.innerHTML()).toEqual([
        '<h1><strong><em>Moby Dick</em></strong></h1>',
        `<p><strong>${fixtures_1.CHAPTER}</strong></p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    const header = await page.$('.ql-toolbar .ql-header.ql-active[value="1"]');
    (0, test_1.expect)(header).not.toBe(null);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowUp');
    await page.type('.ql-editor', 'AA');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.down(utils_1.SHORTKEY);
    await page.keyboard.press('b');
    await page.keyboard.press('b');
    await page.keyboard.up(utils_1.SHORTKEY);
    await page.type('.ql-editor', 'B');
    (0, test_1.expect)(await editorPage.root.locator('p').nth(2).innerHTML()).toBe('ABA');
    await page.keyboard.down(utils_1.SHORTKEY);
    await page.keyboard.press('b');
    await page.keyboard.up(utils_1.SHORTKEY);
    await page.type('.ql-editor', 'C');
    await page.keyboard.down(utils_1.SHORTKEY);
    await page.keyboard.press('b');
    await page.keyboard.up(utils_1.SHORTKEY);
    await page.type('.ql-editor', 'D');
    (0, test_1.expect)(await editorPage.root.locator('p').nth(2).innerHTML()).toBe('AB<strong>C</strong>DA');
    const selection = await page.evaluate(utils_1.getSelectionInTextNode);
    (0, test_1.expect)(selection).toBe('["DA",1,"DA",1]');
});
//# sourceMappingURL=full.spec.js.map