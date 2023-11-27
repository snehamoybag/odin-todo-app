export const kebabCase = (string) => string.toLowerCase().split(" ").join("-");

export const titleCase = (string) => {
  const words = string.toLowerCase().split(" ");
  const titleCasedWords = words.map((word) => {
    const firstLetter = word[0];
    const restOfLetters = word.slice(1);
    const titleCaseWord = firstLetter.toUpperCase() + restOfLetters;
    return titleCaseWord;
  });

  return titleCasedWords.join(" ");
};

export const turncateString = (string, maxLength) => {
  if (string.length <= maxLength) return string;
  return `${string.slice(0, maxLength)}...`;
};

export const setElementProps = (elm, props = {}) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key === "class" && Array.isArray(value)) {
      elm.classList.add(...value);
    } else if (key === "class" && !Array.isArray(value)) {
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
