function addSortingOptionToUrl(value: string) {
  history.pushState({ name: 'example' }, 'pushstateexampel', `#${value}`);
}

export { addSortingOptionToUrl };
