let mysql = require('mysql');

let conectarDB = mysql.createConnection({
    host: 'srv1352.hstgr.io',
    user: 'u508480104_jfuentes',
    password: 'xDq37+gNSk^mQ!;5)}\'p@W',
    database: 'u508480104_miscdata'
});


conectarDB.connect((err) => {
    if (err){
        return console.error(err.message);
    };
    console.log('DB conectada');
})

export default conectarDB;
