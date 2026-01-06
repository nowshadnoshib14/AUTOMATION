const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('DISHIO Sign In Scenarios', () => {
  let loginPage;
  const credentials = {
    email: 'testerbd365@gmail.com',
    pass: 'A@12345b'
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test.only('TC_1: Valid Sign-In', async ({ page }) => {
    await test.step('Fill credentials and submit', async () => {
      await loginPage.login(credentials.email, credentials.pass);
    });

    await test.step('Verify successful navigation', async () => {
      // Typically check for a dashboard URL or element
      await expect(page).toHaveURL('https://dishio-admin-staging.vercel.app/dashboard/brandmanager'); 
    });
  });

  test('TC_2: Invalid Sign-In', async () => {
    await test.step('Enter wrong password and submit', async () => {
      await loginPage.login(credentials.email, 'WrongPass123');
    });

    await test.step('Verify "Invalid Credentials" message appears', async () => {
       await expect(loginPage.invalidCredentialsToast).toBeVisible();
    });
  });

  test('TC_3: Empty Field Sign-In', async () => {
    await loginPage.signInButton.click();
    await expect(loginPage.emailError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
  });

  test('TC_4: Password Visibility Toggle', async () => {
    await loginPage.passwordInput.fill(credentials.pass);
    
    // Check hidden
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'password');

    await loginPage.togglePasswordVisibility();
    
    // Check visible
    await expect(loginPage.passwordInput).toHaveAttribute('type', 'text');
  });

  test('TC_6: Forgot Password Link', async ({ page }) => {
    await loginPage.forgotPasswordLink.click();
    await expect(page).toHaveURL(/forgotpassword/);
  });

  test('TC_8: Support Link', async () => {
    await expect(loginPage.supportLink).toBeVisible();
    await expect(loginPage.supportLink).toHaveAttribute('href', 'mailto:support@dish.io');
  });
});