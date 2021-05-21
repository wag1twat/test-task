import CryptoJS from "crypto-js";

export const createHash = function (timestamp: number): string {
  if (process.env.REACT_APP_PUBLIC_KEY && process.env.REACT_APP_PRIVATE_KEY) {
    return CryptoJS.MD5(
      timestamp +
        process.env.REACT_APP_PRIVATE_KEY +
        process.env.REACT_APP_PUBLIC_KEY
    ).toString();
  }

  return "";
};
