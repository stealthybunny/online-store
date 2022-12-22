export default abstract class Page {
  protected container: HTMLElement;
  static TextObject = {};

  constructor(id: string, className: string) {
    this.container = document.createElement('main');
    this.container.id = id;
    this.container.className = className;
  }

  protected createPageTitle(text: string) {
    document.title = text;
  }

  protected createHeaderTitle(text: string) {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render() {
    return this.container;
  }
}
