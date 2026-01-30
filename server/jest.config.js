export default {
  testEnvironment: "node",
//   collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      functions: 70,
      lines: 70,
      branches: 50
    }
  }
};
