export const snakeCase = (string) => string.toLowerCase().split(" ").join("-");
export const pascalCase = (string) => {
  const words = string.toLowerCase().split(" ");
  const pascalCasedWords = words.map((word) => {
    const letters = word.split("");
    letters[0] = letters[0].toUpperCase();
    return letters.join("");
  });

  return pascalCasedWords.join(" ");
};

export const setElementProps = (elm, props = {}) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key === "class" && Array.isArray(key)) {
      elm.classList.add(...value);
    } else if (key === "class" && !Array.isArray(key)) {
      elm.classList.add(value);
    } else if (key !== "class") {
      elm.setAttribute(key, value);
    }
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
