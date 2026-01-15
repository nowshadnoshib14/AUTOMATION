class LoginPage {
  constructor(page) {
    this.page = page;
    // Locators
    this.emailInput = page.getByPlaceholder('user@email.com');
    this.passwordInput = page.getByTestId('password');
    this.signInButton = page.getByRole('button', { name: 'Sign In' });
    
    // Error messages
    this.invalidCredentialsToast = page.getByText('Invalid Credentials'); 
    this.emailError = page.getByTestId('errorEmail');
    this.passwordError = page.getByTestId('errorPassword');
    
    // Password visibility
    this.passwordToggle = page.locator('svg').nth(1); 
    
    // Links
    this.forgotPasswordLink = page.getByText('Forgot password?');
    this.supportLink = page.locator('a[href^="mailto:support@dish.io"]');
  }

  async navigate() {
    await this.page.goto('https://dishio-admin-staging.vercel.app/signin', { waitUntil: 'networkidle' });
  }

  async login(email, password) {
    if (email) await this.emailInput.fill(email);
    if (password) await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async togglePasswordVisibility() {
    await this.passwordToggle.click();
  }
}

module.exports = { LoginPage };
