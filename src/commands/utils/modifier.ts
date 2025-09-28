import { Result } from "typescript-result";
import { sum } from "./sum.js";

class MisformedModiferError extends Error {
  readonly type = "misformed-modifier-error";
}

type ParseModifierResult = {
  modifiers: Array<number>;
  /**
   * A string representation of the parsed modifiers, starts with a leading space.
   */
  stringifiedModifiers: string;
  total: number;
};

export const parseModifier = (
  modifier: string | undefined | null,
): Result<ParseModifierResult, MisformedModiferError> => {
  if (!modifier) return Result.ok({ modifiers: [], stringifiedModifiers: "", total: 0 });

  const modifierRegex = /[0-9+\- ]+/;
  const passes = modifierRegex.test(modifier);

  if (!passes) return Result.error(new MisformedModiferError());

  const parsedModifier: Array<number> = [];

  let currentPolarity: 1 | -1 = 1;
  let currentNumber: string | undefined = undefined;
  for (let i = 0; i < modifier.length; i++) {
    const currentChar = modifier[i];
    if (currentChar === undefined) break;
    if (currentChar === " ") continue;

    // We got a new operand
    if (currentChar === "+" || currentChar === "-") {
      // We were already processing a number, so lets save it
      if (currentNumber !== undefined) {
        const newModifier = parseInt(currentNumber, 10);
        if (Number.isNaN(newModifier)) return Result.error(new MisformedModiferError());
        parsedModifier.push(currentPolarity * newModifier);

        currentPolarity = 1;
        currentNumber = undefined;
      }

      if (currentChar === "+") {
        /* We don't need to do anything? */
      }
      if (currentChar === "-") {
        currentPolarity *= -1;
      }
    } else {
      // Handling digits
      if (currentNumber === undefined) currentNumber = currentChar;
      else currentNumber += currentChar;
    }
  }

  // We're out of the loop, make sure we save the last number we were processing
  if (currentNumber !== undefined) {
    const newModifier = parseInt(currentNumber, 10);
    if (Number.isNaN(newModifier)) return Result.error(new MisformedModiferError());
    parsedModifier.push(currentPolarity * newModifier);
  }

  return Result.ok({
    modifiers: parsedModifier,
    stringifiedModifiers: stringifyModifiers(parsedModifier),
    total: parsedModifier.reduce(sum),
  });
};

export const stringifyModifiers = (modifiers: Array<number>): string => {
  return modifiers.reduce((accum, modifier) => {
    const sign = modifier >= 0 ? "+" : "-";

    return accum + ` ${sign} ${Math.abs(modifier)}`;
  }, "");
};
