export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error(e);
      console.error(e.message);
    },
  },
};
