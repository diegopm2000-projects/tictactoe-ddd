// Prevent different timezones of execution environments (dev, pipeline, etc)
process.env.TZ = 'GMT'

module.exports = {
  preset: "ts-jest",
  cache: true,
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.{ts, tsx}"
  ],
  detectOpenHandles: true,
  testMatch: [
    "**/test/unitTest/main/**/*.{ts, tsx}"
  ],
  testTimeout: 45000,
}