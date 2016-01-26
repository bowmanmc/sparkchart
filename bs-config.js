
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    'files': [
        'src/**/*.html',
        'src/images/*',
        'src/scripts/*.js',
        'src/styles/*.min.css'
    ],
    'watchOptions': {
        'ignoreInitial': true
    },
    'server': {
        'baseDir': 'src'
    },
    'proxy': false,
    'port': 9000,
    'middleware': false,
    'open': 'local',
    'browser': 'chrome',
    'reloadOnRestart': false,
    'notify': false,
};
