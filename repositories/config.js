var config = {
    production: {
        type: 'mysql',
        db: 'sdm',
        login: 'sergey',
        password: 'writer',
        logging: false,
        host : '172.20.240.1',
        options: {
            "encrypt": true,
            //"enableArithAbort": true,
            trustServerCertificate: false,
        },
        define: ''
    },
    test: {
        type: 'mysql',
        db: 'sdm_test',
        login: 'test',
        password: 'writer',
        logging: false,
        options: {
            "encrypt": true,
            //"enableArithAbort": true,
            trustServerCertificate: false,
        },
        define: ''
    }
};
module.exports = config;