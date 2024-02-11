export const formatNumber = (count: number) => {
  if (count < 1000) {
    return count.toString();
  } else if (count < 10000) {
    const truncated = Math.floor(count / 100) / 10;
    return truncated.toFixed(1) + "k";
  } else if (count < 1000000) {
    const truncated = Math.floor(count / 1000);
    return truncated.toString() + "k";
  } else if (count < 10000000) {
    const truncated = Math.floor(count / 100000) / 10;
    return truncated.toFixed(1) + "m";
  } else {
    const truncated = Math.floor(count / 1000000);
    return truncated.toString() + "m";
  }
};
