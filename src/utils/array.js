// eslint-disable-next-line import/prefer-default-export
export const keyBy = key => (
  array => (
    array.reduce(
      (acc, item) => ({ ...acc, [item[key]]: item }),
      {},
    )
  )
);
