const SrOnly = (text) => {
  const srOnlyEl = document.createElement("span");
  srOnlyEl.classList.add("sr-only");
  srOnlyEl.textContent = text;
  return srOnlyEl;
};

export default SrOnly;
