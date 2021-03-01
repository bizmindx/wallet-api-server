import { Router } from 'express';
import * as walletController from '../controllers/walletController';

const walletRouter = Router();

export default (app: Router) => {
  app.use('/generate', walletRouter);
  //generate bitcoin HD account
  walletRouter.route('/segwit').post(walletController.generateHDWallet);
  //generate bitcoin multisignature 
  walletRouter.route('/multisig').post(walletController.generateMultisigAddress);
  return app;
};
