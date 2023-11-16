export const snakeCase = (string) => string.toLowerCase().split(" ").join("-");

export const setElementProps = (elm, props = {}) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key === "class") elm.classList.add(...value);
    else elm.setAttribute(key, value);
  });
};

export const storeAndSyncData = (data, dataKey) => {
  localStorage.setItem(dataKey, JSON.stringify(data));
  const storageData = JSON.parse(localStorage.getItem(dataKey));
  return storageData;
};

export const closeAndRemoveModal = (modalEl) => {
  modalEl.close();
  modalEl.remove();
};
