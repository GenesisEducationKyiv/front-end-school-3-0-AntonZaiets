import { O } from '@mobily/ts-belt';
export const getParam = (param: string): O.Option<string> => {
  return O.fromNullable(new URLSearchParams(window.location.search).get(param));
};

export const setParam = (key: string, value: string) => {
  const params = new URLSearchParams(window.location.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
};
