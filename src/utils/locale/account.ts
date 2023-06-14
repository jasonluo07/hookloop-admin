export const status = (key: number) => {
  switch (key) {
    case 0:
      return '凍結';
    case 1:
      return '正常';
    default:
      return '-';
  }
};
