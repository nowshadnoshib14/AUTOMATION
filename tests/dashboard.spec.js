const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { BrandManagerPage } = require('../pages/BrandManagerPage');
const { NewBrandWindow } = require('../pages/NewBrand');
test.describe('DISHIO Dashboard and Account Menu Scenarios', () => {
    let loginPage;
    let brandPage;
    let newbrand;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        brandPage = new BrandManagerPage(page);
        newbrand = new NewBrandWindow(page);
        await loginPage.navigate();
        await page.getByRole('button', { name: 'Accept' }).click();
        await loginPage.login('', '');
        // await expect(page).toHaveURL('https://dishio-admin-staging.vercel.app/dashboard/brandlist', { timeout: 10000 });
    });
    // test.only('TC_83: Verify Brand Manager Page ', async ({ page }) => {
    //     await test.step('Verify the user is redirected to the BrandManager dashboard', async () => {
    //         await expect(page).toHaveURL('https://dishio-admin-staging.vercel.app/dashboard/brandmanager');
    //     });
    // });

    test('TC_84: Account Menu Expansion', async () => {
        await test.step('Click the account icon', async () => {
            await brandPage.openAccountMenu();
        });
        await test.step('Verify Dropdouwn options are visible', async () => {
            await expect(brandPage.myAccountOption).toBeVisible();
            await expect(brandPage.learningOption).toBeVisible();
            await expect(brandPage.languageOption).toBeVisible();

            await expect(brandPage.logoutOption).toBeVisible();
        });
    });
    test('TC_86: Language Selection Functionality', async () => {
        await brandPage.openAccountMenu();
        await test.step('Check the language option', async () => {
            await brandPage.languageOption.click();
            await expect(brandPage.eng).toBeVisible();
            await expect(brandPage.es).toBeVisible();
            await expect(brandPage.por).toBeVisible();
            await expect(brandPage.fra).toBeVisible();





        });
    });
    // test('TC_87:Navigate to My Account',async({page})=>{
    //     await brandPage.openAccountMenu();
    //     await test.step('Click "My account"',async()=>{
    //         await brandPage.myAccountOption.click();
    //     });

    // });
    test('TC_88: Learning Resources Access(New Tab)', async ({ page, context }) => {
        await brandPage.openAccountMenu();
        const pagePromise = context.waitForEvent('page');
        await test.step('Click "Learning"', async () => {
            await brandPage.learningOption.click();
        });
        const newTabPage = await pagePromise;
        await newTabPage.waitForLoadState();
        await test.step('Verify the new tab contains the skool URL', async () => {
            await expect(newTabPage).toHaveURL('https://www.skool.com/dishio/about');
        })

    });
    test('TC_89: Logout Functionality:', async ({ page }) => {
        await brandPage.openAccountMenu();
        await test.step('Click "Log out"', async () => {
            await brandPage.logoutOption.click();
        });
        await test.step('Verify redirection to the login page:', async () => {
            await expect(page).toHaveURL('https://dishio-admin-staging.vercel.app/signin', { timeout: 10000 });
        });

    });
    test('Verify Page Identity and Content', async () => {
        await test.step('Verify Brand Manager Title and Description', async () => {
            await expect(brandPage.headerTitle).toBeVisible();
            await expect(brandPage.descriptionText).toBeVisible();

        });
    });
    test('Verify Dishio Logo Presence', async () => {
        await test.step('Check if Dishio logo is visible', async () => {
            await expect(brandPage.dishioLogo).toBeVisible();
        });
    });
    test('Verify Side Navigation Links', async ({ page }) => {
        await test.step('Check visibility of Personal Information Links', async () => {
            await expect(brandPage.sidebarPersonalInfo).toBeVisible();
            await brandPage.sidebarPersonalInfo.click();
            await expect(page).toHaveURL('https://dishio-admin-staging.vercel.app/dashboard/personal-information');
        });
        await test.step('Check visibility of Security Links', async () => {
            await expect(brandPage.sidebarSecurity).toBeVisible();
            await brandPage.sidebarSecurity.click();
            await expect(page).toHaveURL('https://dishio-admin-staging.vercel.app/dashboard/security');
        });
        await test.step('Check visibility of Preferences Links', async () => {
            await expect(brandPage.sidebarPreferences).toBeVisible();
            await brandPage.sidebarPreferences.click();
            await expect(page).toHaveURL('https://dishio-admin-staging.vercel.app/dashboard/preferences');
        });
    });
    test('Verify Navigation Bar Expand/Collapse Functionality', async ({ page }) => {
        await test.step('Check Expand Functionality', async () => {
            await expect(brandPage.sidebarToggleExpand).toBeVisible();
            await brandPage.sidebarToggleExpand.click();
            await expect(page).locator('.my-3').toBeVisible();
        });
        await test.step('Check Collapse Functionality', async () => {
            await expect(brandPage.sidebarToggleCollapse).toBeVisible();
            await brandPage.sidebarToggleCollapse.click();
            // await expect(page).locator('div').filter({ hasText: /^Brand Manager$/ }).nth(2).not.toBeVisible();

        });

    });
    test('Verify "New Brand" Button Functionality', async () => {
        await test.step('Click "New Brand" Button and verify navigation', async () => {
            await newbrand.newBrandButton.click();
            await expect(newbrand.createBrandContinueButton).toBeVisible();
            await expect(newbrand.createBrandcancelButton).toBeVisible();
         });

    });
    test('Brand List Operation(Search',async({page})=>{
        await test.step('Search for a brand',async()=>{
            await brandPage.brandSearch.fill('PizzaBurg');
            await page.waitForTimeout(2000);
            // await page.getByText('PizzaBurg').toBeVisible();
            await expect(page).getByRole('img', { name: 'brand-logo' }).toBeVisible();

        });
    });
});
