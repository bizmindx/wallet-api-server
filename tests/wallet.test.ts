
import BitcoinWalletService from '../src/services/wallet' 
import { Container } from 'typedi';


describe('Generate HD segwit wallet with path', () => {
  const data = {
    mnemonic: "praise you muffin lion enable neck grocery crumble super myself license ghost",
    path: "m/44'/0'/0'/0/0"
  }
  it('should generate a segwith wallet address', async () => {
    const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService);
    const generateAddress = await bitcoinWalletServiceInstance.GenerateSegwitWithHD(data.mnemonic, data.path);
    expect(generateAddress).toBe("2N2bRCxuC2sGmDgFdhjfeReqqP6NDsweXH7")
  });

});


describe('Multisignature Segwit wallet', () => {
  const data = {
    "m": 2,
    "n": 3,
    "pubkey": [
      "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
      "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
      "023e4740d0ba639e28963f3476157b7cf2fb7c6fdf4254f97099cf8670b505ea59",
    ]
  }
  it('should generate a multsignature P2SH address', async () => {
    const bitcoinWalletServiceInstance = Container.get(BitcoinWalletService);
    const address = await bitcoinWalletServiceInstance.GenerateMultisigP2SH(data.m, data.pubkey);
    expect(address).toBe("3DQoEFJEWqJYqmrkdV5gPRNrnZv9ompoEr")
  });

});
