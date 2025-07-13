import { ConfigService } from '@nestjs/config';

export const getMongoDbConfig = (configService: ConfigService) => {
  const mongoDbUri = getMongoDbUri(configService);
  const mongoDbOptions = getMongoDbOptions();
  return {
    uri: mongoDbUri,
    ...mongoDbOptions,
  };
};

const getMongoDbUri = (configService: ConfigService): string => {
  return (
    configService.get('MONGODB_PROTOCOL') +
    '://' +
    configService.get('MONGODB_USERNAME') +
    ':' +
    configService.get('MONGODB_PASSWORD') +
    '@' +
    configService.get('MONGODB_HOST') +
    ':' +
    configService.get('MONGODB_PORT') +
    '/' +
    configService.get('MONGODB_DBNAME') +
    '?authSource=' +
    configService.get('MONGODB_AUTHDB')
  );
};

const getMongoDbOptions = () => {
  return {};
};
