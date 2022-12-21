import Page from '../../templates/page';

export default class NotFound extends Page {
  static TextObject = {
    MainTitle: 'Page Not Found',
  };

  constructor(id: string, className: string) {
    super(id, className);
  }

  render() {
    this.createPageTitle(NotFound.TextObject.MainTitle);
    const title = this.createHeaderTitle(NotFound.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}
