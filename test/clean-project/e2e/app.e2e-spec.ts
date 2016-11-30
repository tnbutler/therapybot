import { CleanProjectPage } from './app.po';

describe('clean-project App', function() {
  let page: CleanProjectPage;

  beforeEach(() => {
    page = new CleanProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
