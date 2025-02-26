/** @type {import('ts-jest').JestConfigWithTsJest} */
const path = require('path')
const rootDir = path.resolve(__dirname, '../tinper-m-basic')
const rootConfig = require('./test/root-config')
module.exports = {
  rootDir: `${rootDir}`,
  // js测试环境  要安装 jest-environment-jsdom
  testEnvironment: 'jsdom',
  // 识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
  // testMatch: ["<rootDir>/src/components/**/*.(spec|test).(js|ts)?(x)"],
  roots: rootConfig,
  // 指定需要转换的文件或代码片段
  transform: {
    // '^.+\\.(js|jsx)$': 'babel-jest',
    // '^.+\\.(ts|tsx)$': 'ts-jest',
    // '\\.(less|css)$': 'jest-less-loader',
    // '^.+\\.(js|jsx|ts|tsx)$': ["@swc/jest"],
    '\\.[jt]sx?$': './test/jest.preprocess.js'
  },
  moduleNameMapper: {
    // "^@utils/(.*)$": "<rootDir>/src/utils/$1"
    '\\.(css|sass|scss|less)$': 'identity-obj-proxy',
    '\\.svg$': 'identity-obj-proxy',
    'antd-mobile-fieldid': 'identity-obj-proxy',
    '@tinper/m-icons/lib/iconfont/iconfont.js': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: [
    'js', 'ts', 'jsx', 'tsx'
  ],
  setupFiles: ['<rootDir>/test/jestsetup.js'],
  // 每个单测都需要的公共内容
  setupFilesAfterEnv: ['<rootDir>/test/setupTest.ts'],
  // 指定需要忽略的文件或代码片段
  transformIgnorePatterns: ['<rootDir>/node_modules'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    './src/components/**/*.{js,jsx,tsx}',
    '!./src/components/**/i*.tsx',
    '!./src/components/**/demos/*.tsx',
    '!./src/components/radio/src/CheckIcon.tsx',
    '!./src/components/radio/src/CircleSelectedIcon.tsx',
    '!./src/components/radio/src/CloseOutline.tsx',
    '!./src/components/button/src/Button.manifest.tsx',
  ],
  coverageDirectory: 'coverage',
  reporters: [
    'default',
    [
      '<rootDir>/node_modules/jest-html-reporters',
      {
        pageTitle: '多语专项测试报告',
        publicPath: '<rootDir>/coverage',
        filename: 'langReport.html',
        openReport: false,
        expand: true,
        hideIcon: true,
        includeConsoleLog: true,
      }
    ]
  ]
};
