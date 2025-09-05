export const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;
export const rollD6 = () => randomInt(1, 6);
export const rollD10 = () => randomInt(1, 10);
