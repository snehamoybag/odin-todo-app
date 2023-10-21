const snakeCaseinator = (string) => {
  return string.toLowerCase().split(" ").join("-");
};

export default snakeCaseinator;
