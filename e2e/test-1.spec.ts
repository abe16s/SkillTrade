import { test, expect } from '@playwright/test';

test('Customer Signup', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/FrontEnd/src/index.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();


  await page.locator('label').filter({ hasText: 'As Customer' }).click();

  const form1 = await page.getByRole('heading', { name: 'Customer Sign Up' });
  await expect(form1).toHaveText('Customer Sign Up');


  await page.getByRole('textbox', { name: 'Full Name' }).click();

  const nameField = await page.getByRole('textbox', { name: 'Full Name' })
  await expect(nameField).toBeFocused();

  await page.getByRole('textbox', { name: 'Full Name' }).fill('Beke Birhanu');
  await page.getByRole('textbox', { name: 'Email' }).click();

  const emailField = await page.getByRole('textbox', { name: 'Email' })
  await expect(emailField).toBeFocused();

  await page.getByRole('textbox', { name: 'Email' }).fill('bekaasd@gmail.com');
  await page.getByRole('textbox', { name: 'Phone' }).click();

  const phoneField = await page.getByRole('textbox', { name: 'Phone' })
  await expect(phoneField).toBeFocused();

  await page.getByRole('textbox', { name: 'Phone' }).fill('0987654341');
  await page.getByRole('textbox', { name: 'Password' }).click();

  const passwordField = await page.getByRole('textbox', { name: 'Password' })
  await expect(passwordField).toBeFocused();

  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Sign Up' }).click();

  
  await page.getByRole('button', { name: 'Sign Up' }).click();
  const alert = await page.
  waitForEvent('dialog')
  await alert.accept()

  const head = await page.getByRole('heading', { name: 'Customer Profile' })

  await expect(head).toHaveText('Customer Profile')
});


test('Technician Signup', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/FrontEnd/src/index.html');
  await page.getByRole('link', { name: 'Sign Up' }).click();

  await page.locator('label').filter({ hasText: 'As Technician' }).click();

  const form2 = await page.getByRole('heading', { name: 'Technician Sign Up' });
  await expect(form2).toHaveText('Technician Sign Up');

  await page.getByRole('textbox', { name: 'Full Name' }).click();

  const nameField = await page.getByRole('textbox', { name: 'Full Name' })
  await expect(nameField).toBeFocused();

  await page.getByRole('textbox', { name: 'Full Name' }).fill('Beke Birhanu');
  await page.getByRole('textbox', { name: 'Email' }).click();

  const emailField = await page.getByRole('textbox', { name: 'Email' })
  await expect(emailField).toBeFocused();

  await page.getByRole('textbox', { name: 'Email' }).fill('bekaasd@gmail.com');
  await page.getByRole('textbox', { name: 'Phone' }).click();

  const phoneField = await page.getByRole('textbox', { name: 'Phone' })
  await expect(phoneField).toBeFocused();

  await page.getByRole('textbox', { name: 'Phone' }).fill('0987654341');
  await page.getByRole('textbox', { name: 'Password' }).click();

  const passwordField = await page.getByRole('textbox', { name: 'Password' })
  await expect(passwordField).toBeFocused();

  await page.getByRole('textbox', { name: 'Password' }).fill('password');


  await page.getByRole('textbox', { name: 'Skills' }).click();

  const skillsField = await page.getByRole('textbox', { name: 'Skills' })
  await expect(skillsField).toBeFocused();

  await page.getByRole('textbox', { name: 'Skills' }).fill('technician electrc');
  await page.getByRole('textbox', { name: 'Experience' }).click();

  const experienceField = await page.getByRole('textbox', { name: 'Experience' })
  await expect(experienceField).toBeFocused();

  await page.getByRole('textbox', { name: 'Experience' }).fill('2 years');
  await page.getByRole('textbox', { name: 'Education Level' }).click();

  const eduField = await page.getByRole('textbox', { name: 'Education Level' })
  await expect(eduField).toBeFocused();

  await page.getByRole('textbox', { name: 'Education Level' }).fill('bachelor');
  await page.getByRole('textbox', { name: 'Available Location' }).click();

  const availField = await page.getByRole('textbox', { name: 'Available Location' })
  await expect(availField).toBeFocused();

  await page.getByRole('textbox', { name: 'Available Location' }).fill('Addis Ababa');


  await page.getByRole('textbox', { name: 'Additional Bio' }).click();

  const addField = await page.getByRole('textbox', { name: 'Additional Bio' })
  await expect(addField).toBeFocused();

  await page.getByRole('textbox', { name: 'Additional Bio' }).fill('This is enough');



  await page.getByRole('button', { name: 'Sign Up' }).click();

  const alert = await page.
  waitForEvent('dialog')
  await alert.accept()

  const head = await page.getByRole('heading', { name: 'Technician Profile' })

  await expect(head).toHaveText('technician profile')
});


test('Technician Signin', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/FrontEnd/src/index.html');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByLabel('Technician').click()
  const select = await page.getByLabel('Technician')

  await expect(select).toBeChecked()


  await page.getByRole('textbox', { name: 'Email' }).click();

  const emailField = await page.getByRole('textbox', { name: 'Email' })
  await expect(emailField).toBeFocused();

  await page.getByRole('textbox', { name: 'Email' }).fill('bekaasd@gmail.com');


  await page.getByRole('textbox', { name: 'Password' }).click();

  const passwordField = await page.getByRole('textbox', { name: 'Password' })
  await expect(passwordField).toBeFocused();

  await page.getByRole('textbox', { name: 'Password' }).fill('password');


  
  await page.getByRole('button', { name: 'Login' }).click();


  const head = await page.getByRole('heading', { name: 'technician profile' })

  await expect(head).toHaveText('technician profile')
});


test('Customer Signin', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/FrontEnd/src/index.html');
  await page.getByRole('link', { name: 'Login' }).click();

  await page.getByLabel('Customer').click()
  const select = await page.getByLabel('Customer')

  await expect(select).toBeChecked()


  await page.getByRole('textbox', { name: 'Email' }).click();

  const emailField = await page.getByRole('textbox', { name: 'Email' })
  await expect(emailField).toBeFocused();

  await page.getByRole('textbox', { name: 'Email' }).fill('betseeegaw@gmail.con');


  await page.getByRole('textbox', { name: 'Password' }).click();

  const passwordField = await page.getByRole('textbox', { name: 'Password' })
  await expect(passwordField).toBeFocused();

  await page.getByRole('textbox', { name: 'Password' }).fill('password');


  
  await page.getByRole('button', { name: 'Login' }).click();


  const head = await page.getByRole('heading', { name: 'Customer Profile' })

  await expect(head).toHaveText('Customer Profile')
});
