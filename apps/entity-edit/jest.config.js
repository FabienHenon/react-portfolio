module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(css|styl|less|scss|sass)$": "identity-obj-proxy"
  },
};
