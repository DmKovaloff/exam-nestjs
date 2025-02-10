import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './src/database/entities/user.entity';
import { Post } from './src/database/entities/post.entity';
import configuration from './src/config/configuration';
import * as path from 'node:path';
import * as process from 'node:process';
import { RefreshToken } from './src/database/entities/refresh-token.entity';

dotenv.config();

const config = configuration().database;
export default new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.user,
  password: config.password,
  database: config.name,
  entities: [User, Post, RefreshToken],
  migrations: [
    path.join(process.cwd(), 'src', 'database', 'migrations', '*.ts'),
  ],
  synchronize: true,
});
