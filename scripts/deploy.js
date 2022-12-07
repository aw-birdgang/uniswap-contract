const hre = require("hardhat");
require('dotenv').config();
const router = require('../artifacts/contracts/UniswapV2Router02.sol/UniswapV2Router02.json');

const {ethers} = require("hardhat");

async function main() {
  let [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork()
  console.log(`chainId : ${network.chainId}) `)
  console.log('Deploying contracts with the account :', deployer.address);

  // wETH
  const WETH = await ethers.getContractFactory("SampleToken");
  const weth = await WETH.deploy('WETH', 'WETH', ethers.constants.MaxUint256);
  await weth.deployed();
  console.log(
      `WETH deployed to ${weth.address}`
  );

  // deploy tokenA, deploy tokenB
  const TokenA = await ethers.getContractFactory("SampleToken");
  const tokenA = await TokenA.deploy('TokenA', 'ATK', ethers.constants.MaxUint256);
  await tokenA.deployed();
  console.log(
      `TokenA deployed to ${tokenA.address}`
  );

  const TokenB = await ethers.getContractFactory("SampleToken");
  const tokenB = await TokenB.deploy('TokenB', 'BTK', ethers.constants.MaxUint256);
  await tokenB.deployed();
  console.log(
      `TokenB deployed to ${tokenB.address}`
  );

  // deploy factory contract
  const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  const uniswapV2Factory = await UniswapV2Factory.deploy(process.env.ADMIN_ADDRESS);
  await uniswapV2Factory.deployed();
  console.log(
      `UniswapV2Factory deployed to ${uniswapV2Factory.address}`
  );

  // Create Pair tokenA and tokenB
  let result = await uniswapV2Factory.createPair(tokenA.address, tokenB.address);
  let data = await result.wait();
  let pairAddress = data.events[0].args[2];
  console.log(`Pair Address: ${pairAddress}`);

  // Deploy routerV2
  const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router02");
  // const uniswapV2Router = await UniswapV2Router.deploy(uniswapV2Factory.address, process.env.WETH_TESTNET_ADDRESS);
  const uniswapV2Router = await UniswapV2Router.deploy(uniswapV2Factory.address, weth.address);
  await uniswapV2Router.deployed();
  console.log(
      `UniswapV2Router deployed to ${uniswapV2Router.address}`
  );

  // get pair address
  let pair = await uniswapV2Factory.getPair(tokenA.address, tokenB.address);
  console.log(`Get Pair Address: ${pair}`);

  console.log(`MaxUint256 value: ${ethers.constants.MaxUint256}`);

  // Add Liquidity, get amount in, get amount out
  await tokenA.approve(uniswapV2Router.address, ethers.constants.MaxUint256)
  await tokenB.approve(uniswapV2Router.address, ethers.constants.MaxUint256)
  //=============
  // let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_ENDPOINT);
  // const signer = new ethers.Wallet(process.env.ADMIN_KEY, provider);
  // const uniswapV2Router = new ethers.Contract(process.env.ROUTER_ADDRESS, router.abi, signer);

  // let result = await uniswapV2Router.addLiquidity(
  //   process.env.TOKENA_ADDRESS,
  //   process.env.TOKENB_ADDRESS,
  //   "10000",
  //   "10000",
  //   "0",
  //   "0",
  //   process.env.ADMIN_ADDRESS,
  //   ethers.constants.MaxUint256,
  //   {gasLimit: 5000000}
  // );
  // result = await result.wait();
  //==============

  result = await uniswapV2Router.addLiquidity(
      tokenA.address,
      tokenB.address,
      "1000000",
      "1000000",
      "0",
      "0",
      process.env.ADMIN_ADDRESS,
      ethers.constants.MaxUint256,
      {gasLimit: 5000000}
  );

  console.log(result);

}

main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
