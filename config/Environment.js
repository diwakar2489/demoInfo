// Container for environments
var environments = {};
var currEnvironment ={}

if(process.env.NODE_ENV == 'development'){
    // Dev environment
    environments.dev = {
        'httpPORT': process.env.APP_PORT,
        'envName': process.env.NODE_ENV
      };

}else if(process.env.NODE_ENV == 'production'){
    // production environment
    environments.production = {
        'httpPORT': process.env.APP_PORT,
        'envName': process.env.NODE_ENV
      };
      
}else if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'testing'){
  environments.testing = {
    'httpPORT': '8081',
    'envName': 'testing'
  };

}
var currEnvironment = typeof (process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV : 'development';

var environmentToExport = typeof (environments[currEnvironment]) == 'object' ? environments[currEnvironment] : environments.dev;

module.exports = environmentToExport;