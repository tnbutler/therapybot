import { TherapybotAdminPage } from './app.po';

describe('therapybot-admin App', function() {
  let page: TherapybotAdminPage;

  beforeEach(() => {
    page = new TherapybotAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
