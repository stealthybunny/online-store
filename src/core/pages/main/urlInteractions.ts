import { queryObj } from '../../../types';

function parseUrl(url: string) {
  const query = url.split('?')[1];
  if (!query) {
    return;
  }
  const data = query.split('&');
  const res: queryObj[] = [];
  data.forEach((el) => {
    const result: queryObj = [];
    const [key, value] = el.split('=');
    const values = value.split('%E2%86%95').map((item) => item);
    result.push(key);
    result.push(values);
    res.push(result);
  });

  res.forEach((item) => {
    item[1]?.forEach((el) => {
      const checkbox = document.getElementById(`${el}`) as HTMLInputElement;
      checkbox.checked = true;
    });
  });
}

export { parseUrl };
