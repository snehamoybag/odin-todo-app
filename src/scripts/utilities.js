export const snakeCase = (string) => {
  return string.toLowerCase().split(" ").join("-");
};

export const setElementProps = (elm, props = {}) => {
  for (const key in props) {
    const value = props[key];

    if (key === "class") elm.classList.add(value);
    else elm.setAttribute(key, value);
  }
};

export const storeAndSyncData = (data, dataKey) => {
  localStorage.setItem(dataKey, JSON.stringify(data));
  const storageData = JSON.parse(localStorage.getItem(dataKey));
  return storageData;
};
