import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { Request, Response, NextFunction, ErrorRequestHandler} from 'express';


export default ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).json({message: 'server is up and running'});
  });


  app.enable('trust proxy');
  app.use(cors());

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
