
import { postendpointHelper } from './utils'


describe('Generate HD segwit wallet with path using API', () => {

  it('should return status 200 with correct payload', async () => {
    const data = {
      seed: "praise you muffin lion enable neck grocery crumble super myself license ghost",
      path: "m/44'/0'/0'/0/0"
    }
    const api = await postendpointHelper('/api/generate/segwit', data)
    expect(api.status).toBe(200)
  });

  it('should return status 400 with wrong or incomplete payload', async () => {
    const data = {
      seed: "praise you muffin lion enable neck grocery crumble super myself license ghost",
    }
    const api = await postendpointHelper('/api/generate/segwit', data)
    expect(api.status).toBe(400)
  });

  it('should return status 400 with wrong payload format', async () => {
    const data = {
      seed: "praise you muffin lion enable neck grocery crumble super myself license ghost",
      path: "hmm"
    }
    const api = await postendpointHelper('/api/generate/segwit', data)
    expect(api.status).toBe(400)
  });

});


describe('Multisignature Segwit wallet using API', () => {
  it('should return status 200 with correct payload', async () => {
    const data = {
      "m": 2,
      "n": 3,
      "pubkey": [
        "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
        "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
        "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9"
      ]
    }
    const api = await postendpointHelper('/api/generate/multisig', data)
    expect(api.status).toBe(200)
  });

  it('should return status 400 with wrong payload', async () => {
    const data = {
      "hehe": "me",
      "n": 3,
      "pubkey": [
        "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
        "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
        "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9"
      ]
    }
    const api = await postendpointHelper('/api/generate/multisig', data)
    expect(api.status).toBe(400)
  });

  it('should return status 401 when n does not equal pubkeys', async () => {
    const data = {
      "m": 2,
      "n": 4,
      "pubkey": [
        "026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01",
        "02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9",
        "03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9"
      ]
    }
    const api = await postendpointHelper('/api/generate/multisig', data)
    expect(api.status).toBe(401)
  });

});
