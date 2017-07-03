import { LoginappPage } from './app.po';

describe('loginapp App', () => {
  let page: LoginappPage;

  beforeEach(() => {
    page = new LoginappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
