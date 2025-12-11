import bunyan from 'bunyan';
import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public PORT: number | undefined;
  public REDIS_HOST: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_TTL: number | undefined;


  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/tags';
  private readonly DEFAULT_REDIS_HOST = 'redis://localhost:6379';
  private readonly DEFAULT_REDIS_TTL = 7200;

  constructor() {
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.PORT = parseInt(process.env.PORT as string) || 5001;
    this.REDIS_HOST = process.env.REDIS_HOST || this.DEFAULT_REDIS_HOST;
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_TTL = parseInt(process.env.REDIS_TTL as string) || this.DEFAULT_REDIS_TTL;
  }

  public validateConfig(): void {
    for(const [key, value] of Object.entries(this)) {
      console.log(key, value);
      if(value === undefined) {
        throw new Error(`Missing configuration for ${key}`);
      }
    }
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

}

export const config: Config = new Config();