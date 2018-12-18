module.exports = {
    apps : [{
      name      : 'RW',
      script    : 'server.js',
      env: {
        ENV: 'development'
      },
      watch: ['api', 'libs', 'envs', 'server.js', 'db']
    }]
  };

