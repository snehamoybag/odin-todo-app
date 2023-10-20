const attributeAndClassSetter = (elem, props) => {
  for (const key in props) {
    const value = props[key];

    if (key === "class" && Array.isArray(value)) {
      elem.classList.add(...value);
    } else if (key === "class" && !Array.isArray(value)) {
      elem.classList.add(value);
    } else if (key !== "class") {
      elem.setAttribute(key, value);
    }
  }
};

export default attributeAndClassSetter;
