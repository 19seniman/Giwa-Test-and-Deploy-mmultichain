require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { ethers } = require("ethers");
const NETWORKS = require("./networks");

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[++i] : true;
      out[key] = val;
    }
  }
  return out;
}

function resolveNetworkList(input, pool) {
  if (!input || input === "all") return Object.keys(pool);
  return input.split(",").map((s) => s.trim().toLowerCase());
}

async function deployToNetwork(name, pool, artifact, ctorArgs, privateKey, envLabel) {
  const cfg = pool[name];
  if (!cfg) {
    console.log(`✗ [${name}] tidak dikenal di mode ${envLabel} — lihat networks.js untuk daftar yang didukung`);
    return { name, ok: false, error: "unknown network" };
  }

  const rpcUrl = process.env[cfg.rpcEnv];
  if (!rpcUrl) {
    console.log(`✗ [${name}/${envLabel}] RPC URL kosong — set env ${cfg.rpcEnv} di .env`);
    return { name, ok: false, error: `missing ${cfg.rpcEnv}` };
  }

  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl, cfg.chainId);
    const wallet = new ethers.Wallet(privateKey, provider);

    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    console.log(`… [${name}/${envLabel}] mengirim transaksi deploy...`);

    const contract = await factory.deploy(...ctorArgs);
    const receipt = await contract.deploymentTransaction().wait();
    const address = await contract.getAddress();

    console.log(`✓ [${name}/${envLabel}] deployed at ${address} (block ${receipt.blockNumber})`);
    return { name, env: envLabel, ok: true, address, txHash: receipt.hash };
  } catch (err) {
    console.log(`✗ [${name}/${envLabel}] gagal: ${err.shortMessage || err.message}`);
    return { name, env: envLabel, ok: false, error: err.shortMessage || err.message };
  }
}

async function main() {
  const args = parseArgs();

  if (!args.artifact) {
    console.error("Gunakan: node deploy.js --artifact <file.json> --networks <chain1,chain2|all> [--args \"a,b,c\"]");
    process.exit(1);
  }

  const privateKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!privateKey) {
    console.error("DEPLOYER_PRIVATE_KEY belum di-set di file .env");
    process.exit(1);
  }

  const artifactPath = path.resolve(args.artifact);
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const ctorArgs = args.args ? args.args.split(",").map((s) => s.trim()) : [];

  const envLabel = args.testnet ? "testnet" : "mainnet";
  const pool = NETWORKS[envLabel];
  const targets = resolveNetworkList(args.networks, pool);

  console.log(`\nMode: ${envLabel.toUpperCase()}`);
  console.log(`Deploying ke ${targets.length} jaringan: ${targets.join(", ")}\n`);

  const results = [];
  for (const net of targets) {
    // Sequential agar log rapi & nonce per-wallet per-chain tidak konflik.
    const res = await deployToNetwork(net, pool, artifact, ctorArgs, privateKey, envLabel);
    results.push(res);
  }

  console.log("\n=== Ringkasan ===");
  for (const r of results) {
    console.log(r.ok ? `${r.name} (${envLabel}): ${r.address}` : `${r.name} (${envLabel}): FAILED (${r.error})`);
  }

  const outFile = `deployment-results.${envLabel}.json`;
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log(`\nHasil lengkap tersimpan di ${outFile}`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
