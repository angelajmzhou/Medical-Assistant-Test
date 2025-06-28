import { test, expect } from '@playwright/test';

const expected_response = 'Sorry, it seems like you didn’t accurately describe your health issue. Could you please provide more details about any symptoms or concerns you currently have? Thank you!';
test('chat_utilities_test', async ({ page}, testInfo) => {
  await page.goto('https://192.168.10.14/auth');
  await page.getByRole('textbox', { name: 'Enter Your Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Email' }).fill('admin@useradmin.com');
  await page.getByRole('textbox', { name: 'Enter Your Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('admin123');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).press('Enter');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'New Chat' }).click();

  await page.getByLabel('Edit').getByRole('button').click();
  await page.locator('textarea').click();
  await page.locator('textarea').fill('Test edit.\n');
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  //check if edit was saved
  await expect(page.getByText('Test edit.')).toBeVisible();

  await page.locator('#chat-input').fill('Test message.');
  await page.locator('#send-message-button').click();
  await page.locator('.visible').first().click();

  await page.locator('textarea').fill('Test edit 2.');
  await page.getByRole('button', { name: 'Cancel' }).click();
 
  await expect(page.getByText('Test edit 2.')).not.toBeVisible();

  await page.locator('.visible').first().click();
  await page.locator('textarea').fill('Test edit 2. ');
  await page.getByRole('button', { name: 'Save As Copy' }).click();

  await expect(page.getByText('Test edit 2.')).toBeVisible();
  await expect(page.getByText('2/2')).toBeVisible();

  await page.getByLabel('Continue Response').locator('#continue-response-button').click();
  const exp_string = `Test edit 2. ${expected_response}`;
  await expect(page.getByText(exp_string)).toBeVisible();
try{
  await page.getByLabel('Regenerate').getByRole('button').click();
} catch (error) {
  console.error('Regenerate button not found:', error);
  await page.getByLabel('Regenerate').getByRole('button', { exact: true }).filter({ has: page.locator(':visible') }).click();

}
  await expect(page.getByText(`${expected_response}`)).toBeVisible();
  expect(page.getByText('3/3')).toBeVisible();

  //check whether you can toggle between response versions
  await page.locator('.self-center.p-1').first().click();
  expect(page.getByText(exp_string)).toBeVisible();
  expect(page.getByText('2/3')).toBeVisible();
  await page.locator('.self-center.p-1').first().click();
  expect(page.getByText(expected_response)).toBeVisible();
  expect(page.getByText('1/3')).toBeVisible();
  await page.locator('.flex.self-center.min-w-fit > button:nth-child(3)').click();
  expect(page.getByText(exp_string)).toBeVisible();
  expect(page.getByText('2/3')).toBeVisible();
  await page.locator('.flex.self-center.min-w-fit > button:nth-child(3)').click();
    expect(page.getByText(expected_response)).toBeVisible();
  expect(page.getByText('3/3')).toBeVisible();

  const browserTag = testInfo.project.name; // 'chromium', 'webkit', 'firefox'
  const chatName = `Test Chat - ${browserTag}`

  //check tagging functionality
  await page.getByRole('button', { name: 'Toggle Sidebar' }).click();
  await page.getByRole('button', { name: 'Chat Menu' }).click();
  await page.getByText('Add Tags').click();
  await page.getByRole('button', { name: 'Add Tag' }).click();
  await page.getByRole('combobox', { name: 'Add a tag' }).fill(chatName);
  await page.getByRole('button', { name: 'Save Tag' }).click();

  //check chat renaming functionality
  const chatItem = page.locator('.w-full.flex.justify-between').first();
  await chatItem.hover();
  await page.getByRole('button', { name: 'Chat Menu' }).first().click();
  await page.getByRole('button', { name: 'Chat Menu' }).first().click();

  const renameMenuItem = page.getByRole('menuitem', { name: 'Rename' });
  await expect(renameMenuItem).toBeVisible(); // ensures it exists
  await renameMenuItem.click();
  await page.locator('input.bg-transparent.w-full.outline-hidden.mr-10').fill(chatName);

  await page.getByLabel('Confirm').locator('button').click();

  //check tagged search functionality
  await page.getByRole('button', { name: 'Chats' }).click();
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'tag: search for tags' }).click();
  await page.getByRole('button', { name: 'Test Chat test_chat' }).click();
  const sidebar = page.locator('#sidebar'); // or '.sidebar' or similar
  await expect(sidebar.getByText(chatName).first()).toBeVisible();


  //check pinning functionality
  await page.getByRole('textbox', { name: 'Search' }).fill('');
  await page.locator('body').click();  
  await page.getByRole('button', { name: 'Chats' }).click();
  await page.getByRole('button', { name: 'Chat Menu' }).click();
  const pinMenuItem = page.getByRole('menuitem', { name: 'Pin' });
  await expect(pinMenuItem).toBeVisible(); // ensures it exists
  await pinMenuItem.click();

  const pinnedHeader = page.locator('button:has-text("Pinned")');
  const pinnedContainer = pinnedHeader.locator('xpath=ancestor::div[contains(@class, "flex-col")]');
  const pinnedSection = pinnedContainer.locator('div[slot="content"]').first();
  await expect(pinnedSection).toContainText(chatName);

  await page.getByRole('button', { name: 'Chat Menu' }).first().click();
  const deleteMenuItem = page.getByRole('menuitem', { name: 'Delete' });
  await expect(deleteMenuItem).toBeVisible(); // ensures it exists
  await deleteMenuItem.click();
  await page.getByRole('button', { name: 'Confirm' }).click();

  await expect(sidebar).not.toContainText(chatName);
});
