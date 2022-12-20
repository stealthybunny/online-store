import Page from '../../templates/page';

export default class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  constructor(id: string) {
    super(id);
  }

  private createAsideContent() {
    //create by TS!
    console.log('Add content to aside and products block!');
  }

  render() {
    this.createPageTitle(MainPage.TextObject.MainTitle);
    this.createAsideContent();
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
