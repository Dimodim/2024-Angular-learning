module.exports = {
  preset: "jest-preset-angular",
  roots: ["src"],
  // moduleNameMapper: {
  //   '^src/(.*)$': '<rootDir>/src/$1',
  // },
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  moduleNameMapper: {
    "@oshc(.*)": "<rootDir>/src/app/modules/oshc/$1",
    "@shared(.*)": "<rootDir>/src/app/@shared/$1",
    '^src/(.*)$': '<rootDir>/src/$1',

  }
};
