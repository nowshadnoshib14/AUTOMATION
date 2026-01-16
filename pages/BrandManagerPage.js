class BrandManagerPage {
    constructor(page) {
        this.page = page;
        this.headerTitle = page.getByText('Brand Manager', { exact: true });
        this.descriptionText = page.getByText('Manage your restaurant brand(');
        this.dishioLogo = page.getByRole('img').first();
        this.sidebarPersonalInfo = page.locator('.relative.flex.w-full.flex-row.items-center.space-x-\\[10px\\].whitespace-nowrap.rounded-lg.p-4.text-\\[\\#464A58\\]').first();
        this.sidebarSecurity = page.locator('div:nth-child(3) > .group\\/menu-item > div > .flex.w-full.cursor-pointer > .relative');
        this.sidebarPreferences = page.locator('div:nth-child(4) > .group\\/menu-item > div > .flex.w-full.cursor-pointer > .relative');
        this.sidebarToggleExpand = page.locator('.cursor-pointer.\\!text-\\[\\#B3B3B3\\]');
        this.sidebarToggleCollapse = page.getByRole('img').nth(5);
        this.accountIcon = page.getByRole('button').filter({ hasText: /^$/ });
        this.myAccountOption = page.getByRole('button', { name: 'My Account' });
        this.learningOption = page.getByRole('link', { name: 'Learning' });
        this.languageOption = page.getByText('Language');
        this.logoutOption = page.getByRole('button', { name: 'Log out' });
        this.brandSearch = page.getByRole('textbox', { name: 'Search' });

        //Edit brand
        this.editBrandButton = page.locator('div:nth-child(1) > .flex.h-\\[100px\\] > .flex.h-full > .cursor-pointer.text-2xl.iconify.iconify--tabler');
        this.editPageValidator = page.getByRole('heading', { name: 'Performance', exact: true });
        this.expandButton = page.locator('div:nth-child(1) > .flex.h-\\[100px\\] > .flex.h-full > .cursor-pointer.text-2xl.iconify.iconify--ep');
        this.collapseButton = page.locator('div:nth-child(1) > .flex.h-\\[100px\\] > .flex.h-full > .cursor-pointer.text-2xl.iconify.iconify--ep');
        this.expandValidation = page.getByRole('button', { name: 'Add Location' });




        //language
        this.eng = page.getByText('English');
        this.es = page.getByText('Español');
        this.por = page.getByText('Português');
        this.fra = page.getByText('Français');

    }
    async openAccountMenu() {
        await this.accountIcon.click;
    }
}
module.exports = { BrandManagerPage };
