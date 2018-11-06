module.exports = {
    'setupTestFrameworkScriptFile': '<rootDir>/src/test/setup.js',
    'snapshotSerializers': ['enzyme-to-json/serializer'],
    'moduleNameMapper': {
        '^.+\\.(css|less|scss|sass)$': 'babel-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/test/mock/file.mock.js'
    }
};
