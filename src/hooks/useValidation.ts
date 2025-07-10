import { useState, useCallback } from "react";
import { VALIDATION_MESSAGES } from "../utils/constants";

type ValidationRules = {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
};

export const useValidation = (rules: ValidationRules = {}) => {
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(
    (value: string) => {
      if (rules.required && !value.trim()) {
        setError(VALIDATION_MESSAGES.ERROR_REQUIRED_TEXT);
        return false;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        setError(VALIDATION_MESSAGES.MAX_LENGTH(rules.maxLength));
        return false;
      }

      if (rules.minLength && value.length < rules.minLength) {
        setError(VALIDATION_MESSAGES.MIN_LENGTH(rules.minLength));
        return false;
      }

      setError(null);
      return true;
    },
    [rules]
  );

  return {
    error,
    validate,
  };
};
