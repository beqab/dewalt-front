export const devLogger = {
  log: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") console.log(...args);
  },
  error: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") console.error(...args);
  },
  warn: (...args: unknown[]) => {
    if (process.env.NODE_ENV !== "production") console.warn(...args);
  },
};
