import { test, expect } from '@playwright/test';

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
  'I had just eaten a big dinner and was watching TV on the couch when the chest pain occured.',
  'It happens about once a month, usually after a large dinner.',
  'It felt like a sharp, squeezing sensation.',
  'They last around 5-10 minutes.',
  'The chest pains usually happen after I finish a rather large dinner.',
  'I have tried changing my posture, but it did not help.',
  'I have experienced palpitations and sweating alongside my chest pain, but not always.',
  'I have no diagnosed medical conditions',
  'My mother has hypertension, but has not received any treatment for it.'
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
  const clipboardText = await page.evaluate(async () => await navigator.clipboard.readText());
  console.log('Clipboard text:', clipboardText);
  const keywords = ['night', '9 pm', 'dinner', 'watching TV', 'sharp', 'squeezing', '5-10 minutes', 'posture', 'palpitations', 'sweating', 'hypertension', 'mother'];

for (const keyword of keywords) {
  expect(clipboardText.toLowerCase()).toContain(keyword.toLowerCase());
}
});