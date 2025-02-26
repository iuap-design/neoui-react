const path = require("path")
const rootDir = path.resolve(__dirname, "../")
const rootConfig = require("./test/root-config")
module.exports = {
    testEnvironment: 'jsdom',
    testTimeout: 20000,
    setupFiles: ["<rootDir>/next-ui-library/test/jestsetup.js"],
    roots: rootConfig,
    moduleNameMapper: {
        '@tinper/next-ui': '<rootDir>/packages/index.tsx',
    },
    moduleFileExtensions: [
        "js", "ts", "jsx", "tsx"
    ],
    moduleDirectories: [
        "<rootDir>/next-ui-library/node_modules",
    ],
    transform: {
        "\\.[jt]sx?$": "<rootDir>/next-ui-library/test/jest.preprocess.js"
    },
    snapshotSerializers: [
        // "<rootDir>/next-ui-library/node_modules/enzyme-to-json/serializer"
    ],
    transformIgnorePatterns: [
        "node_modules/(?!lodash-es)"
    ],
    rootDir: `${rootDir}`,
    collectCoverageFrom: [
        "**/packages/**/*.{js,jsx,tsx}",
        "!**/i*.tsx",
        "!**/test/**",
        "!**/src1/**",
        "!**/src2/**",
        "**/index.tsx",
        "!**/demo/**",
        "!**/SwipeableInkTabBar.tsx",
        "!**/SwipeableTabBarNode.tsx",
        "!**/SwipeableTabContent.tsx",
        "!**/InkTabBar.tsx",
        "!**/ScrollableTabBar.tsx",
        "!**/TabBar.tsx",
        "!**/IframeUploader.tsx",
        "!**/TabBarSwipeableTabs.tsx",
        "!**/bigData.tsx",
        "!**/multiSelect.tsx",
        "!**/hooks/select.tsx",
        "!**/singleSelect.tsx",
        "!**/singleFilter.tsx",
        "!**/sum.tsx",
        "!**/HoverContent.tsx",
        "!**/MergeTable.tsx",
        "!**/PopMenu.tsx",
        "!**/wui-table/src/render/**",
        "!**/wui-table/src/table.tsx",
        "!**/multiSelectX.tsx",
        "!**/zh-cn.js",
        "!**/en_US.js",
        "!**/en_GB.tsx",
        "!**/en_GB.tsx",
        "!**/AutoTagSelect.tsx",
        "!**/wui-provider/src/renderEmpty.tsx",
        "!**/wui-provider/src locale.tsx",
        "!**/wui-core/src/Align.tsx",
        "!**/wui-animate/**",
        "!**/wui-dynamicview/**",
        "!**/wui-autocomplete/src/AutoComplete.tsx",
        "!**/iconfont.js",
        "!**/*.manifest.tsx",
    ],
    coverageProvider: "v8",
    coverageDirectory: "<rootDir>/next-ui-library/coverage",
    reporters: [
        'default',
        [
            '<rootDir>/next-ui-library/node_modules/jest-html-reporters',
            {
                pageTitle: '多语专项测试报告',
                publicPath: '<rootDir>/next-ui-library/coverage',
                filename: 'langReport.html',
                openReport: false,
                expand: true,
                hideIcon: true,
                includeConsoleLog: true,
                // customInfos: [{title: '未测属性', value: restApis, }]
            }
        ]
    ]
}
