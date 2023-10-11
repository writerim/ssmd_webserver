var config = {
    production: {
        server: {
            port: '3423',
            url: 'http://127.0.0.1'
        }
    },
    test: {
    },
    database : {
        production: {
            type: 'mysql',
            db: 'prod',
            login: 'prod',
            password: 'prod',
            logging: false,
            host : '127.0.0.1',
            options: {
                "encrypt": true,
                //"enableArithAbort": true,
                trustServerCertificate: false,
            },
            define: ''
        },
        test: {
            type: 'mysql',
            db: 'test',
            login: 'test',
            password: 'test',
            logging: false,
            options: {
                "encrypt": true,
                //"enableArithAbort": true,
                trustServerCertificate: false,
            },
            define: ''
        }
    }
};
module.exports = config;