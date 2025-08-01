import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL_NON_POOLING!, { ssl: 'require' });

export default sql