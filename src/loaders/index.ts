import expressLoader from './express';
import { Container} from 'typedi';
import { Application } from 'express';
import Logger from './logger';

export default async ({ expressApp }: {expressApp: Application}) => {
  Container.set('logger', Logger);
  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
