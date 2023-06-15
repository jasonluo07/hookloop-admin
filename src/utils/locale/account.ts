export const status = (key: number) => {
  switch (key) {
    case 0:
      return 'Normal';
    case 1:
      return 'Archived';
    default:
      return '-';
  }
};
