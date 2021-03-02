import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import routes from '../api';
import config from '../config';

const Limiter = rateLimit({ max: 20, windowMs: 1 * 60 * 1000, message: 'IP has exceed request threshold' });

export default ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).json({message: 'server is up and running'});
  });
  
  app.enable('trust proxy');
  app.use(compression())
  app.use(helmet());
  app.use(cors());
  app.use(Limiter);
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());
  app.use((req, res, next) => {
    const err: any = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  
  app.use((err: any, req: any, res: any, next?:any) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ success: false, message: err.message });
    }
    res.status(err.status || 400);
    res.json({
      errors: {
        message: err.message,
        status: false
      },
    });
  });
};
