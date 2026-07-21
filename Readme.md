# Multi-Chain Contract Deploy Script

Script Node.js untuk deploy smart contract yang sama ke banyak jaringan EVM
sekaligus dari satu perintah — konsep serupa fitur "one-click deploy" yang
ditawarkan Owlto Finance.

## Instalasi

```bash
npm install
cp .env.example .env
# lalu edit .env: isi DEPLOYER_PRIVATE_KEY dan RPC URL tiap chain
```

## Jaringan yang didukung

Didefinisikan di `networks.js`, masing-masing punya versi mainnet dan testnet:
ethereum, bnbchain, arbitrum, optimism, polygon, base, linea, scroll, zksync,
taiko, unichain, xlayer. Tambah/hapus sesuai kebutuhan.

| Chain     | Mainnet | Testnet          |
|-----------|---------|------------------|
| ethereum  | 1       | Sepolia (11155111) |
| bnbchain  | 56      | BSC Testnet (97) |
| arbitrum  | 42161   | Arbitrum Sepolia (421614) |
| optimism  | 10      | Optimism Sepolia (11155420) |
| polygon   | 137     | Polygon Amoy (80002) |
| base      | 8453    | Base Sepolia (84532) |
| linea     | 59144   | Linea Sepolia (59141) |
| scroll    | 534352  | Scroll Sepolia (534351) |
| zksync    | 324     | zkSync Sepolia (300) |
| taiko     | 167000  | Taiko Hekla (167009) |
| unichain  | 130     | Unichain Sepolia (1301) |
| xlayer    | 196     | X Layer Testnet (195) |

## Cara pakai

```bash
# Deploy ke beberapa jaringan MAINNET tertentu
node deploy.js --artifact ./sample-artifacts/SimpleToken.json --networks ethereum,base,arbitrum --args "MyToken,MTK,1000000"

# Deploy ke SEMUA jaringan mainnet yang terdaftar di networks.js
node deploy.js --artifact ./sample-artifacts/SimpleToken.json --networks all --args "MyToken,MTK,1000000"

# Deploy ke TESTNET (tambahkan flag --testnet)
node deploy.js --artifact ./sample-artifacts/SimpleToken.json --networks all --testnet --args "MyToken,MTK,1000000"
node deploy.js --artifact ./sample-artifacts/SimpleToken.json --networks ethereum,base --testnet --args "MyToken,MTK,1000000"
```

Hasil deploy testnet disimpan terpisah di `deployment-results.testnet.json`,
sementara mainnet di `deployment-results.mainnet.json`, supaya tidak
tertukar.

`--artifact` menunjuk ke file JSON berisi `abi` dan `bytecode` hasil kompilasi
kontrakmu (dari Hardhat, Foundry, atau Remix). File contoh di
`sample-artifacts/SimpleToken.json` hanya template struktur — kamu perlu
mengisi `bytecode` asli dari hasil kompilasi kontrak yang benar-benar mau
di-deploy.

`--args` adalah argumen constructor kontrak, dipisah koma.

## Output

- Log real-time per jaringan (berhasil/gagal, alamat kontrak, tx hash)
- File `deployment-results.json` berisi ringkasan lengkap semua hasil deploy

## Catatan keamanan

- Private key HANYA dari `.env`, tidak pernah dari argumen CLI.
- Pastikan wallet deployer punya saldo native token (ETH/BNB/dst) yang cukup
  di **setiap** jaringan tujuan untuk membayar gas.
- Selalu uji dulu di testnet sebelum deploy ke mainnet.

