module.exports = {
    run() {
        switch(process.env.ENV) {
            case 'development': 
                require('dotenv').config({path: './envs/development.env'});
            break;
        
            case 'production': 
                require('dotenv').config({path: './envs/production.env'});
            break;
        }
    }
}