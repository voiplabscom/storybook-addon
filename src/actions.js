import { getSelectedValue, getTheme, getCurrentInd } from './selectors';

export const setCurrent = (store, ind, api) => {
  // api is undefined? unable to set query params for theme index
  // api.setQueryParams({
  //   themeInd: ind,
  // });
  return {
    ...store,
    currentTheme: ind,
  };
};

export const selectValue = (store, { name, namespace, type }) => ({
  ...store,
  selectedValue: { name, namespace, type },
});

export const updateTheme = (store, ind, newTheme) => {
  const { themesList } = store;
  const newThemesList = [...themesList];
  newThemesList[ind] = newTheme;
  const newStore = {
    ...store,
    themesList: newThemesList,
  };
  return newStore;
};

const mutateObj = (obj, namespace, key, value) => {
  const nestedObj = namespace.reduce((subObj, subKey) => subObj[subKey], obj);
  nestedObj[key] = value;
};

export const changeSelectedColor = (store, color) => {
  const selected = getSelectedValue(store);
  if (!selected) return store;
  const { name, namespace } = selected;
  const theme = getTheme(store);
  const ind = getCurrentInd(store);
  const themeClone = JSON.parse(JSON.stringify(theme));
  mutateObj(themeClone, namespace, name, color);

  return updateTheme(store, ind, themeClone);
};
