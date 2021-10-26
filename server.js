const Pool = require('pg').Pool;
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'production') {
    const databaseConfig = { connectionString: process.env.DATABASE_URL };
    const pool = new Pool(databaseConfig);
    module.exports = pool;

} else if (process.env.NODE_ENV === 'development') {
    const pool = new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        port: process.env.PORT
    });
    module.exports = pool;

}
// const databaseConfig = { connectionString: process.env.DATABASE_URL };
// const pool = new Pool(databaseConfig);
// module.exports = pool;