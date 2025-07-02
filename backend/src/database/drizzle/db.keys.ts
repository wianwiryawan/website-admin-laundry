// Type safety annotation
export interface DBConfig {
    DB_HOST: string;
    DB_PORT: number;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
}

export const config: DBConfig = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    DB_NAME: process.env.DB_NAME || 'my_db',
    DB_USERNAME: process.env.DB_USERNAME || 'my_user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'my_password',
}