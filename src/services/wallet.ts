import { Service, Inject } from 'typedi';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import * as BitcoinJS from 'bitcoinjs-lib';

@Service()
export default class WalletService {
  constructor(
    @Inject('logger') private logger: { silly(arg0: string): void; error(arg0: unknown): void },
  ) {
  }
  public async GenerateSegwitWithHD(mnemonic: string, path: string): Promise <string> {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonic);
      const root = bip32.fromSeed(seed);
      const child = root.derivePath(path);
      const { address } = BitcoinJS.payments.p2wpkh({
        // redeem: BitcoinJS.payments.p2wpkh({
          pubkey: child.publicKey,
        // }),
      });
      return `${address}`;
    }catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GenerateMultisigP2SH(m: number, addresses: Array<string>): Promise <string> {
    try { 
      const pubkeys = addresses.map(hex => Buffer.from(hex, 'hex'));
      const { address } = BitcoinJS.payments.p2sh({
        redeem: BitcoinJS.payments.p2ms({ m, pubkeys }),
      });
      return `${address}`
    }catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}