module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage'),
        require('karma-coverage-istanbul-reporter'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false
      },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './coverage/W2MChallenge'),
        reports: ['html', 'lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true
      },
      reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
      browsers: ['Chrome'],
      angularCli: {
        environment: 'dev'
      },
      singleRun: false,
      restartOnFileChange: true
    });
  };
  