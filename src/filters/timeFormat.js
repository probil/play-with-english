const pad = (number) => (`0${number}`).slice(-2);

export default (value) => {
  const minutes = Math.trunc(value / 60);
  const seconds = value % 60;
  return `${pad(minutes)}:${pad(seconds)}`;
};
