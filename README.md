# Bitcoin Wallet API server

Wallet API for generating segwit wallet and multisignature P2SH address

## Routes

|Route| Method  | Params  | Description|
|----------------|--|--|--|
| $url/api/generate/segwit|POST | seed, path |generates segwit address with seed and path |
|$url/api/generate/segwit | POST| m, n, pubkeys[]|generate multisignature address 

## Postman Collection
[get the collection](https://www.getpostman.com/collections/339a9a822463815ab2a8)

## Local development
- Fork/Clone
- Install dependencies - yarn install
- Compile - npm run build
- Run the development server - yarn run dev
- Test - yarn run test
