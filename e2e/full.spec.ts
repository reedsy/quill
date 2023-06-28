import { expect } from '@playwright/test';
import { getSelectionInTextNode, SHORTKEY } from './utils';
import { test, CHAPTER, P1, P2 } from './fixtures';

test('compose an epic', async ({ page, editorPage }) => {
  const type = page.type.bind(page);
  page.type = async (selector, text, options) => {
    options = {
      delay: 1,
      ...options,
    };
    return type(selector, text, options);
  };

  await editorPage.open();
  await expect(page).toHaveTitle('Full Editor - Quill Rich Text Editor');

  await page.type('.ql-editor', 'The Whale');
  expect(await editorPage.root.innerHTML()).toEqual('<p>The Whale</p>');

  await page.keyboard.press('Enter');
  expect(await editorPage.root.innerHTML()).toEqual(
    '<p>The Whale</p><p><br></p>',
  );

  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.type('.ql-editor', P1);
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.type('.ql-editor', P2);
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p>The Whale</p>',
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );

  // More than enough to get to top
  await Promise.all(
    Array(40)
      .fill(0)
      .map(() => page.keyboard.press('ArrowUp')),
  );
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.type('.ql-editor', CHAPTER);
  await page.keyboard.press('Enter');
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p>The Whale</p>',
      '<p><br></p>',
      `<p>${CHAPTER}</p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );

  // More than enough to get to top
  await Promise.all(
    Array(20)
      .fill(0)
      .map(() => page.keyboard.press('ArrowUp')),
  );
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Backspace');
  await page.keyboard.press('Backspace');
  await page.keyboard.press('Backspace');
  await page.keyboard.press('Backspace');
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p>Whale</p>',
      '<p><br></p>',
      `<p>${CHAPTER}</p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );

  await page.keyboard.press('Delete');
  await page.keyboard.press('Delete');
  await page.keyboard.press('Delete');
  await page.keyboard.press('Delete');
  await page.keyboard.press('Delete');
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p><br></p>',
      '<p><br></p>',
      `<p>${CHAPTER}</p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );

  await page.keyboard.press('Delete');
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p><br></p>',
      `<p>${CHAPTER}</p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );

  await page.click('.ql-toolbar .ql-bold');
  await page.click('.ql-toolbar .ql-italic');
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p><strong><em><span class="ql-cursor">\uFEFF</span></em></strong></p>',
      `<p>${CHAPTER}</p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );
  let bold = await page.$('.ql-toolbar .ql-bold.ql-active');
  let italic = await page.$('.ql-toolbar .ql-italic.ql-active');
  expect(bold).not.toBe(null);
  expect(italic).not.toBe(null);

  await page.type('.ql-editor', 'Moby Dick');
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p><strong><em>Moby Dick</em></strong></p>',
      `<p>${CHAPTER}</p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );
  bold = await page.$('.ql-toolbar .ql-bold.ql-active');
  italic = await page.$('.ql-toolbar .ql-italic.ql-active');
  expect(bold).not.toBe(null);
  expect(italic).not.toBe(null);

  await page.keyboard.press('ArrowRight');
  await page.keyboard.down('Shift');
  await Promise.all(
    Array(CHAPTER.length)
      .fill(0)
      .map(() => page.keyboard.press('ArrowRight')),
  );
  await page.keyboard.up('Shift');
  bold = await page.$('.ql-toolbar .ql-bold.ql-active');
  italic = await page.$('.ql-toolbar .ql-italic.ql-active');
  expect(bold).toBe(null);
  expect(italic).toBe(null);

  await page.keyboard.down(SHORTKEY);
  await page.keyboard.press('b');
  await page.keyboard.up(SHORTKEY);
  bold = await page.$('.ql-toolbar .ql-bold.ql-active');
  expect(bold).not.toBe(null);
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<p><strong><em>Moby Dick</em></strong></p>',
      `<p><strong>${CHAPTER}</strong></p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );

  await page.keyboard.press('ArrowLeft');
  await page.keyboard.press('ArrowUp');
  await page.click('.ql-toolbar .ql-header[value="1"]');
  expect(await editorPage.root.innerHTML()).toEqual(
    [
      '<h1><strong><em>Moby Dick</em></strong></h1>',
      `<p><strong>${CHAPTER}</strong></p>`,
      '<p><br></p>',
      `<p>\t${P1}</p>`,
      '<p><br></p>',
      `<p>${P2}</p>`,
    ].join(''),
  );
  const header = await page.$('.ql-toolbar .ql-header.ql-active[value="1"]');
  expect(header).not.toBe(null);

  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowUp');
  await page.type('.ql-editor', 'AA');
  await page.keyboard.press('ArrowLeft');
  await page.keyboard.down(SHORTKEY);
  await page.keyboard.press('b');
  await page.keyboard.press('b');
  await page.keyboard.up(SHORTKEY);
  await page.type('.ql-editor', 'B');
  expect(await editorPage.root.locator('p').nth(2).innerHTML()).toBe('ABA');
  await page.keyboard.down(SHORTKEY);
  await page.keyboard.press('b');
  await page.keyboard.up(SHORTKEY);
  await page.type('.ql-editor', 'C');
  await page.keyboard.down(SHORTKEY);
  await page.keyboard.press('b');
  await page.keyboard.up(SHORTKEY);
  await page.type('.ql-editor', 'D');
  expect(await editorPage.root.locator('p').nth(2).innerHTML()).toBe(
    'AB<strong>C</strong>DA',
  );
  const selection = await page.evaluate(getSelectionInTextNode);
  expect(selection).toBe('["DA",1,"DA",1]');
});
