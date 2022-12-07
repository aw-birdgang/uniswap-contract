const {
  time,
  loadFixture
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { constants } =require( "@openzeppelin/test-helpers");

// const {ethers} = require("ethers");

describe("Init contract", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  let owner, addr1, addr2;
  let tokenA, tokenB, wETH, factory, pairAddress, pair, router,uniswapV2Pair;
  beforeEach(async function ()  {
    // Contracts are deployed using the first signer/account by default
    [owner, addr1, addr2] = await ethers.getSigners();
    // deploy weth
    const WETH = await ethers.getContractFactory("SampleToken");
    wETH = await WETH.deploy('WETH', "WETH", 1000000);
    await wETH.deployed();
    // deploy tokenA
    const TokenA = await ethers.getContractFactory("SampleToken");
    tokenA = await TokenA.deploy('TokenA', "TKA", 1000000);
    await tokenA.deployed();

    // deploy tokenB
    const TokenB = await ethers.getContractFactory("SampleToken");
    tokenB = await TokenB.deploy('TokenB', "TKB", 1000000);
    await tokenB.deployed();

    // deploy factory
    const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
    factory = await UniswapV2Factory.deploy(owner.address);
    await factory.deployed();
    // router contract
    const UniswapV2Router = await ethers.getContractFactory("UniswapV2Router02");
    router = await UniswapV2Router.deploy(factory.address, wETH.address);
    await router.deployed();
    // pair conrtact
    // const UniswapV2Pair = await ethers.getContractFactory("UniswapV2Pair");
    // uniswapV2Pair = await UniswapV2Pair.deploy();
    // await uniswapV2Pair.deployed();
    // create pair
    await factory.createPair(tokenA.address, tokenB.address);
    pairAddress = await factory.getPair(tokenA.address, tokenB.address);
    pair = await ethers.getContractAt("UniswapV2Pair", pairAddress);
    console.log('pair address: ', pair.address);
    console.log('pairAC total supply: ', await pair.totalSupply());

    await tokenA.approve(router.address, 1000000);
    await tokenB.approve(router.address, 1000000);
    await pair.approve(router.address, 1000000);
    //console.log(result);
  });

  // describe("Config contract", function () {
  //   // beforeEach(async function ()  {
  //   // });

    it("Deployment", async function () {
      let result =  await router.addLiquidity(
        tokenB.address,
        tokenA.address,
        "10000",
        "10000",
        "0",
        "0",
        owner.address,
        "9999999999999999999999"
      );
      console.log(result);
    });
  // });

});