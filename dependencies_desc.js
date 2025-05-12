export const dependencies_description = {
  name: 'trello-server',
  version: '1.0.0',
  description: '',
  main: './src/server.js',
  scripts: {
    clean: 'rimraf build && mkdir build',
    'build-babel': 'babel ./src -d ./build/src',
    build: 'npm run clean && npm run build-babel',
    production: 'npm run build && cross-env BUILD_MODE=production node ./build/src/server.js',
    dev: 'cross-env BUILD_MODE=dev nodemon --exec npx babel-node ./src/server.js',
    test: 'echo "Error: no test specified" && exit 1'
  },
  keywords: [],
  author: '',
  license: 'ISC',
  dependencies: {
    'async-exit-hook': '^2.0.1',
    'babel-plugin-module-resolver': '^5.0.2', //alias path for .babelrc
    dotenv: '^16.4.7',
    express: '^4.21.2',
    'http-status-codes': '^2.3.0', // list status code for response
    joi: '^17.13.3', //Create and validate data
    mongodb: '^6.15.0',
    rimraf: '^6.0.1'
  },
  devDependencies: {
    '@babel/cli': '^7.27.0',
    '@babel/core': '^7.26.10',
    '@babel/node': '^7.26.0',
    '@babel/preset-env': '^7.26.9',
    '@babel/preset-react': '^7.26.3',
    'cross-env': '^7.0.3', // cấu hình build_mode cho env ở trong script bash
    eslint: '^9.23.0',
    'eslint-plugin-react': '^7.37.4',
    globals: '^16.0.0',
    nodemon: '^3.1.9',
    prettier: '3.5.3'
  }
}
