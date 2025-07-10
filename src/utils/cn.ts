import classNames from "classnames";

export const cn = (...args: classNames.ArgumentArray): string =>
  classNames(...args);
