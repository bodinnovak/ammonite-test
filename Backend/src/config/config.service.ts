import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';

config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('DATABASE_HOST'),
      port: parseInt(this.getValue('DATABASE_PORT')),
      username: this.getValue('DATABASE_USER'),
      password: this.getValue('DATABASE_PASSWORD'),
      database: this.getValue('DATABASE_NAME'),

      entities: ['**/*.entity{.ts,.js}'],

      migrationsTableName: 'migration',
      synchronize: false,

      migrations: ['src/migration/*.ts'],

      cli: {
        migrationsDir: 'src/migration',
      },

      ssl: false,
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_HOST',
  'DATABASE_PORT',
  'DATABASE_USER',
  'DATABASE_PASSWORD',
  'DATABASE_NAME',
]);

export { configService };
