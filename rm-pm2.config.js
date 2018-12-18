module.exports = {
    apps : [{
      name      : 'rm',
      script    : 'server.js',
      env: {
        ENV: 'development'
      },
      watch: ['api', 'libs', 'envs', 'server.js']
    }]
  };

  