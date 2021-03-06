const path = require('path');

module.exports = {
    testTimeout: 10000,
    setupFilesAfterEnv: [
        path.resolve(__dirname, './jest-configs/setup-test-env.js'),
    ],
    transform: {
        // "^.+\\.(tsx?|jsx?)$": "ts-jest",
        '\\.svg': '<rootDir>/jest-configs/svgTransform.js',
        '^.+\\.(tsx?|jsx?)$': `<rootDir>/jest-configs/jest-preprocess.js`,
    },
    moduleNameMapper: {
        // "\\.svg": `./jest-configs/__mocks__/file-mocks.js`,
        '\\.svg': `<rootDir>/jest-configs/svgTransform.js`,
        'typeface-*': 'identity-obj-proxy',
        '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
        '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/jest-configs/__mocks__/file-mocks.js`,
    },
    testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
    transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`, `\\.svg`],
    globals: {
        __PATH_PREFIX__: ``,
    },
    testRegex: '/__tests__/.*\\.(test|spec)\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    collectCoverage: false,
    coverageReporters: ['lcov', 'text', 'html'],
    collectCoverageFrom: [
        '**/*tsx',
        '!<rootDir>/src/__tests__/*',
        '!<rootDir>/src/components/ui/*',
        '!<rootDir>/src/axios.tsx',
        '!<rootDir>/src/utils/dateUtils.tsx',
        '!<rootDir>/src/utils/listUtils.tsx',
        '!<rootDir>/src/models/**',
        '!<rootDir>/src/pages/404.tsx',
        '!<rootDir>/src/components/shareButton.tsx',
        '!<rootDir>/src/components/seo.tsx',
        '!<rootDir>/src/hooks/useNotifications.tsx',
        '!<rootDir>/src/store/reduxWrapper.tsx',
        '!<rootDir>/src/store/actions/actionsTypes.tsx',
        '!<rootDir>/src/store/actions/index.tsx',
        '!<rootDir>/src/store/sagas/index.tsx',
    ],
};
