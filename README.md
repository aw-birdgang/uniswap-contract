# install
```shell
npm install --save-dev hardhat

npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js --network goerli


npx hardhat verify --network goerli 0x418AF20d83099E8cC0f1767cbA7Aa39d9E6b7BbE --contract contracts/UniswapV2Factory.sol:UniswapV2Factory --constructor-args scripts/factory_args.js
npx hardhat verify --network goerli 0x2E310d043EE9c713Cc168035262846970Cd3E76b --contract contracts/UniswapV2Router02.sol:UniswapV2Router02 --constructor-args scripts/router_args.js
npx hardhat verify --network goerli 0xbf87059a64B2133cFad42c93609F5c8201D7B973 --contract contracts/UniswapV2Pair.sol:UniswapV2Pair
npx hardhat verify --network goerli 0xC0a0529D879e26703B7917A834d30aacc44c2505 --contract contracts/SampleToken.sol:SampleToken --constructor-args scripts/token_weth_args.js

```

# script
```bash
Deploying contracts with the account : 0x6A1375E47E402cd71EB5C7Db807c152886fe9045
WETH deployed to 0xC0a0529D879e26703B7917A834d30aacc44c2505
TokenA deployed to 0x340FF899FA2332cB61e45Ffa6CFD8B1613Ad40b8
TokenB deployed to 0x552416b4B7173B806E305bB3142FB8e233daF5cA
UniswapV2Factory deployed to 0x418AF20d83099E8cC0f1767cbA7Aa39d9E6b7BbE
Pair Address: 0xbf87059a64B2133cFad42c93609F5c8201D7B973
UniswapV2Router deployed to 0x2E310d043EE9c713Cc168035262846970Cd3E76b

```


# list
```bash

tokenA
https://goerli.etherscan.io/address/0x340FF899FA2332cB61e45Ffa6CFD8B1613Ad40b8#code

tokenB
https://goerli.etherscan.io/address/0x552416b4B7173B806E305bB3142FB8e233daF5cA#code

factory
https://goerli.etherscan.io/address/0x418AF20d83099E8cC0f1767cbA7Aa39d9E6b7BbE#code

router
https://goerli.etherscan.io/address/0x2E310d043EE9c713Cc168035262846970Cd3E76b#code

pair
https://goerli.etherscan.io/address/0xbf87059a64B2133cFad42c93609F5c8201D7B973#code

```

