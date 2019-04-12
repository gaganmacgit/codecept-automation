let oracledb = require('oracledb');
let config = require('config');

let dbConfig = config.get('dbConfig');
var executeQuery = (sql, params, callback) => {
    
    oracledb.getConnection({
            user: dbConfig.schema_username,
            password: dbConfig.schema_username,
            connectString: `(DESCRIPTION = (ADDRESS = (PROTOCOL=TCP)(Host=${dbConfig.host})(Port=1521))(CONNECT_DATA=(SID=${dbConfig.sid})))`
        },
        (err, connection) => {
            if (err) {
                console.error('Custom Error occured ', err);
                return;
            }
            connection.execute(sql, params, {
                    outFormat: oracledb.OBJECT
                },
                (err, result) => {
                    if (err) {
                        console.error(err.message);
                        callback(err, null);
                        doRelease(connection);
                        return;
                    }
                    console.log(' The result of query is ', result.rows[0]);
                    callback(null,result.rows[0] );
                    doRelease(connection);
                });
        });
}

function doRelease(connection) {
    connection.close(
        function (err) {
            if (err)
                console.error(err.message);
        });
}
module.exports.executeQuery = executeQuery;