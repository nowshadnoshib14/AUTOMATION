class NewBrandPage {
    constructor(page) {
        this.page = page;
        this.newBrandButton = page.getByTestId('create-brand-button');
        this.createBrandContinueButton = page.getByTestId('showFields');
        this.createBrandcancelButton = page.getByRole('button', { name: 'Cancel' });

 


    }
   
}
module.exports = { NewBrandPage };
