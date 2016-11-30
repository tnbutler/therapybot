import { TestAppNgPage } from './app.po';

describe('test-app-ng App', function() {
  let page: TestAppNgPage;

  beforeEach(() => {
    page = new TestAppNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
