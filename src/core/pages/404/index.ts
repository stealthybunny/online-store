import Page from '../../templates/page';
import './404.css';

export default class NotFound extends Page {
  static TextObject = {
    MainTitle: 'Error 404: page not found',
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
