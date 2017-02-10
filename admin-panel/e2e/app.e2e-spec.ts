import { TpaPage } from './app.po';

describe('tpa App', function() {
  let page: TpaPage;

  beforeEach(() => {
    page = new TpaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
