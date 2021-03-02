import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import BitcoinWalletService from '../../services/wallet';
import { Logger } from 'winston';


export const generateHDWallet = async (req: Request, res: Response, next: NextFunction) => {
  const generateSchema = Joi.object({
    seed: Joi.string().required(),
    path: Joi.string().required(),
  });
  const logger: Logger = Container.get('logger');
  logger.debug('creating segwit address endpoint');
  try {
    const { error, value } = generateSchema.validate(req.body);
    if (error){
    return next(error)
    }
    const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService);
    const generateAddress = await bitcoinWalletServiceInstance.GenerateSegwitWithHD(value.seed, value.path);
    return res.status(200).json({ success: true, message: 'generated segwit wallet', data: generateAddress });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}

export const generateMultisigAddress = async (req: Request, res: Response, next: NextFunction) => {
  const Schema = Joi.object({
    m: Joi.number().required(),
    n: Joi.number().required(),
    pubkey: Joi.array().required(),
  });
  const logger: Logger = Container.get('logger');
  logger.debug('creating mulitsignature address endpoint');
  try {
    const { error, value } = Schema.validate(req.body);
    if (error) next(error);
    if (value.pubkey.length !== value.n) {
      return res.status(401).json({ status: false, message: `expected ${value.n} pubkeys got ${value.pubkey.length}` })
    }
    const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService);
    const generateAddress = await bitcoinWalletServiceInstance.GenerateMultisigP2SH(value.m, value.pubkey);
    return res.status(200).json({ success: true, message: 'generated segwit wallet', data: generateAddress });
  } catch (e) {
    logger.error('🔥 error: %o', e);
    return next(e);
  }
}



