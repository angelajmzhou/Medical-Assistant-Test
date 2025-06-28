import { test, expect } from '@playwright/test';

test('signin_test', async ({ page }) => {
  //sign in
  await page.goto('https://192.168.10.14/auth');
  await page.getByRole('textbox', { name: 'Enter Your Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Email' }).fill('admin@useradmin.com');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  expect(page.getByRole('banner', { name: 'Kneron Medical AI Assistant' }));
});



const headache_msgs = [
  'I have a headache.',
  'It started in the morning.', 
  'I just woke up and was eating breakfast.',
  'I think it was just the act of waking up.',
  'It happens 2-3 times a week, before work.',
  'The headaches last around 30 minutes to an hour.',
  'It is a throbbing, constant pain.',
  'It occurs behind my eyeballs and at my temples.',
  'The headache is around a 4, and yesterday morning was a severe episode. I would rank it as a 7 on the pain scale.',
  'I think getting more sleep and eating light food in the morning helps with my symptoms, as well as reducing stress levels.',
  'I have used Advil, and only use it once a week. It was moderately affective in alleviating symptoms.',
  'Only seasonal allergies.',
  'No',
  'No, I do not smoke or use drugs.',
  'No',
  'No'
];
  
test('headache_test', async ({ page }) => {
  //sign in
  await page.goto('https://192.168.10.14/auth');
  await page.getByRole('textbox', { name: 'Enter Your Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Email' }).fill('admin@useradmin.com');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('admin123');
  page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForTimeout(1000);

  //chat with bot
  for (const msg of headache_msgs) {
    await page.locator('#chat-input').fill(msg);
    await page.locator('#send-message-button').click();
  }
  await page.getByRole('button', { name: 'Copy' }).click();
  const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
  console.log('Clipboard text:', clipboardText);
  const keywords = ['throbbing', 'constant', 'pain', 'eyeballs', 'temples', '4', '7', 'Advil', 'headache', 'stress', 'allergies', '2-3'];

for (const keyword of keywords) {
  expect(clipboardText.toLowerCase()).toContain(keyword.toLowerCase());
}
});

const heart_msgs = [
  'I have chest pains.',
  'It usually starts at night, around 9 pm.',
  'I had just finished dinner and was watching TV.',
  'The pain was in the middle of my chest, but did not radiate outwards',
  'It felt like a sharp, squeezing sensation.',
  'It happens about once a month, usually at night, after dinner.',
  'They last around 5-10 minutes.',
  'The chest pains usually happen after I finish a rather large dinner.',
  'I have experienced palpitations and sweating alongside my chest pain, but not always.',
  'I have tried changing my posture, but it did not help.',
  'I have no diagnosed medical conditions',
  'My mother has hypertension, but has not received any treatment for it.',
  'I am obese, and do not smoke or use drugs.'
];

test('heart_test', async ({ page }) => {
  //sign in
  await page.goto('https://192.168.10.14/auth');
  await page.getByRole('textbox', { name: 'Enter Your Email' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Email' }).fill('admin@useradmin.com');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('admin123');
  page.getByRole('button', { name: 'Sign in' }).click();

  for (const message of heart_msgs) {
    await page.getByRole('paragraph').filter({ hasText: /^$/ }).click(); // Focus input
    await page.locator('#chat-input').fill(message);
    await page.locator('#send-message-button').click();
  }

  await page.locator('.flex.justify-between.mt-1\\.5').click();
  await page.getByRole('button', { name: 'Copy' }).click();
  await page.getByRole('button', { name: 'Copy' }).click();
  //const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
  const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
  console.log('Clipboard text:', clipboardText);
  const keywords = ['night', '9 pm', 'dinner', 'sharp', 'squeezing', '5-10 minutes', 'posture', 'palpitations', 'sweating', 'hypertension', 'mother'];

for (const keyword of keywords) {
  expect(clipboardText.toLowerCase()).toContain(keyword.toLowerCase());
}
});

const nonsense_msgs = [
  'I don\'t feel well.',
  'The sky is blue',
  'I am not happy.',
  'Sjfa;ewoifjlkdf;gseflkajweivdflfs',
  'AaaAAAaaa'
]
const valid_responses = [
  'Sorry, it seems like you didn’t accurately describe your health issue. Could you please provide more details about any symptoms or concerns you currently have? Thank you!',
  'Sorry, the health issue you mentioned is not yet recorded in our current diagnostic database. We are aware of it and will update soon. Please contact our agent for consultation service. Thank you for your understanding!',
]
test('invalid_msgs', async ({ page }) => {
  // Recording.
  await page.goto('https://192.168.10.14/');
  await page.getByRole('textbox', { name: 'Enter Your Email' }).fill('admin@useradmin.com');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('admin123');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).press('Enter');
  await page.getByRole('button', { name: 'Sign in' }).click();

  for (const [i, msg] of nonsense_msgs.entries()) {
    console.log(`Sending message ${i+1}: ${msg}`);
    await page.locator('#chat-input').fill(msg);
    await page.locator('#send-message-button').click();
    const paragraphText = await page.getByRole('paragraph').filter({ hasText: /.+/ }).nth(2*(i+1)).textContent();
    expect(valid_responses).toContain(paragraphText?.trim());
  }
});

test('new_user', async ({ page }) => {
  await page.goto('https://192.168.10.14/');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Enter Your Full Name' }).fill('Test');
  await page.getByRole('textbox', { name: 'Enter Your Email' }).fill('test@user.com');
  await page.getByRole('textbox', { name: 'Enter Your Password' }).fill('test');
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('User Menu').click();
  await page.getByRole('button', { name: 'Settings' }).click();
  await page.getByRole('button', { name: 'Account' }).click();
  await page.locator('input[type="text"]').fill('New Test');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('input[type="text"]')).toHaveValue('New Test');
});

