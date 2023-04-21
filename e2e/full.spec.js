"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const utils_1 = require("./utils");
const fixtures_1 = require("./utils/fixtures");
const QuillPage_1 = __importDefault(require("./utils/QuillPage"));
(0, test_1.test)('compose an epic', ({ page }) => __awaiter(void 0, void 0, void 0, function* () {
    const type = page.type.bind(page);
    page.type = (selector, text, options) => __awaiter(void 0, void 0, void 0, function* () {
        options = Object.assign({ delay: 1 }, options);
        return type(selector, text, options);
    });
    yield page.goto('http://localhost:9000/standalone/full');
    const quillPage = new QuillPage_1.default(page);
    yield page.waitForSelector('.ql-editor', { timeout: 10000 });
    yield (0, test_1.expect)(page).toHaveTitle('Full Editor - Quill Rich Text Editor');
    yield page.type('.ql-editor', 'The Whale');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual('<p>The Whale</p>');
    yield page.keyboard.press('Enter');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual('<p>The Whale</p><p><br></p>');
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('Tab');
    yield page.type('.ql-editor', fixtures_1.P1);
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('Enter');
    yield page.type('.ql-editor', fixtures_1.P2);
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p>The Whale</p>',
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    // More than enough to get to top
    yield Promise.all(Array(40)
        .fill(0)
        .map(() => page.keyboard.press('ArrowUp')));
    yield page.keyboard.press('ArrowDown');
    yield page.keyboard.press('Enter');
    yield page.type('.ql-editor', fixtures_1.CHAPTER);
    yield page.keyboard.press('Enter');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p>The Whale</p>',
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    // More than enough to get to top
    yield Promise.all(Array(20)
        .fill(0)
        .map(() => page.keyboard.press('ArrowUp')));
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.press('Backspace');
    yield page.keyboard.press('Backspace');
    yield page.keyboard.press('Backspace');
    yield page.keyboard.press('Backspace');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p>Whale</p>',
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    yield page.keyboard.press('Delete');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p><br></p>',
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    yield page.keyboard.press('Delete');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p><br></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    yield page.click('.ql-toolbar .ql-bold');
    yield page.click('.ql-toolbar .ql-italic');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p><strong><em><span class="ql-cursor">\uFEFF</span></em></strong></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    let bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    let italic = yield page.$('.ql-toolbar .ql-italic.ql-active');
    (0, test_1.expect)(bold).not.toBe(null);
    (0, test_1.expect)(italic).not.toBe(null);
    yield page.type('.ql-editor', 'Moby Dick');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p><strong><em>Moby Dick</em></strong></p>',
        `<p>${fixtures_1.CHAPTER}</p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    italic = yield page.$('.ql-toolbar .ql-italic.ql-active');
    (0, test_1.expect)(bold).not.toBe(null);
    (0, test_1.expect)(italic).not.toBe(null);
    yield page.keyboard.press('ArrowRight');
    yield page.keyboard.down('Shift');
    yield Promise.all(Array(fixtures_1.CHAPTER.length)
        .fill(0)
        .map(() => page.keyboard.press('ArrowRight')));
    yield page.keyboard.up('Shift');
    bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    italic = yield page.$('.ql-toolbar .ql-italic.ql-active');
    (0, test_1.expect)(bold).toBe(null);
    (0, test_1.expect)(italic).toBe(null);
    yield page.keyboard.down(utils_1.SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.up(utils_1.SHORTKEY);
    bold = yield page.$('.ql-toolbar .ql-bold.ql-active');
    (0, test_1.expect)(bold).not.toBe(null);
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<p><strong><em>Moby Dick</em></strong></p>',
        `<p><strong>${fixtures_1.CHAPTER}</strong></p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    yield page.keyboard.press('ArrowLeft');
    yield page.keyboard.press('ArrowUp');
    yield page.click('.ql-toolbar .ql-header[value="1"]');
    (0, test_1.expect)(yield quillPage.editorHTML()).toEqual([
        '<h1><strong><em>Moby Dick</em></strong></h1>',
        `<p><strong>${fixtures_1.CHAPTER}</strong></p>`,
        '<p><br></p>',
        `<p>\t${fixtures_1.P1}</p>`,
        '<p><br></p>',
        `<p>${fixtures_1.P2}</p>`,
    ].join(''));
    const header = yield page.$('.ql-toolbar .ql-header.ql-active[value="1"]');
    (0, test_1.expect)(header).not.toBe(null);
    yield page.keyboard.press('ArrowDown');
    yield page.keyboard.press('ArrowDown');
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('Enter');
    yield page.keyboard.press('ArrowUp');
    yield page.type('.ql-editor', 'AA');
    yield page.keyboard.press('ArrowLeft');
    yield page.keyboard.down(utils_1.SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.press('b');
    yield page.keyboard.up(utils_1.SHORTKEY);
    yield page.type('.ql-editor', 'B');
    (0, test_1.expect)(yield quillPage.root.locator('p').nth(2).innerHTML()).toBe('ABA');
    yield page.keyboard.down(utils_1.SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.up(utils_1.SHORTKEY);
    yield page.type('.ql-editor', 'C');
    yield page.keyboard.down(utils_1.SHORTKEY);
    yield page.keyboard.press('b');
    yield page.keyboard.up(utils_1.SHORTKEY);
    yield page.type('.ql-editor', 'D');
    (0, test_1.expect)(yield quillPage.root.locator('p').nth(2).innerHTML()).toBe('AB<strong>C</strong>DA');
    const selection = yield page.evaluate(utils_1.getSelectionInTextNode);
    (0, test_1.expect)(selection).toBe('["DA",1,"DA",1]');
}));
//# sourceMappingURL=full.spec.js.map