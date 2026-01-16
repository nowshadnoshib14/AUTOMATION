class EditBrandPage {
    constructor(page) {
        this.page = page;
        this.home = page.locator('.relative.flex.w-full.flex-row').first();
        this.content = page.locator('.relative.flex.w-full.flex-row.items-center.space-x-\\[10px\\].whitespace-nowrap.rounded-lg.p-4.text-\\[\\#464A58\\]').first();
        this.marketing = page.locator('div:nth-child(2) > .group\\/menu-item > div > .flex.w-full.cursor-pointer > .relative').first();
        this.reports = page.locator('div:nth-child(3) > .w-full.text-sm > div > .group\\/menu-item > div > .flex.w-full.cursor-pointer > .relative').first();
         this.editPageValidator = page.getByRole('button', { name: 'All Locations' });
         //Content Submenu
         this.menu = page.locator('div').filter({ hasText: /^Menus$/ }).nth(2);
         this.sites = page.locator('div').filter({ hasText: /^Sites$/ }).nth(2);
         this.pages = page.locator('div').filter({ hasText: /^Pages$/ }).nth(2);
         this.mediaLibrary = page.locator('div').filter({ hasText: /^Media Library$/ }).nth(2);







    }

}
module.exports = { EditBrandPage };
