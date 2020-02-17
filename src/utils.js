const weiIntValue = val => {
  // Check length
  if (val.length === 0) return 0;

  // Check for digits
  const isNaN = val.replace(/\D/g, "").length === 0;
  if (isNaN) return 0;

  // Check for invalid characters
  const hasInvalidCharacters = val.replace(/[0-9.]/g, "").length > 0;
  if (hasInvalidCharacters) return 0;

  // Check for multiple periods
  const hasTooManyDecimals = val.replace(/[^.]/g, "").length > 1;
  if (hasTooManyDecimals) return 0;

  // Check precision
  const parts = val.split(".");
  const isPrecisionTooHigh = parts.length > 1 && parts[1].length > 18;
  if (isPrecisionTooHigh) return 0;

  // Eth -> Wei -> Int
  return parseInt(window.web3.utils.toWei(val, "ether"), 10);
};

export { weiIntValue };
