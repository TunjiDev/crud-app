const Pool = require('pg').Pool;
const dotenv = require("dotenv");
dotenv.config({ path: './config.env' });

if (process.env.NODE_ENV === 'production') {
    const databaseConfig = { connectionString: process.env.DATABASE_URL };
    const pool = new Pool(databaseConfig);
    module.exports = pool;

} else if (process.env.NODE_ENV === 'development') {
    const pool = new Pool({
        user: process.env.LOCAL_USER,
        password: process.env.LOCAL_PASSWORD,
        database: process.env.LOCAL_DATABASE,
        host: process.env.LOCAL_HOST,
        port: process.env.LOCAL_PORT
    });
    module.exports = pool;
}
// const databaseConfig = { connectionString: process.env.DATABASE_URL };
// const pool = new Pool(databaseConfig);
// module.exports = pool;