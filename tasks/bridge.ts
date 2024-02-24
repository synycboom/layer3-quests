import { task } from 'hardhat/config';
import { Tokens, Token, Bridge } from '@synapseprotocol/sdk';
import { BigNumber, type BigNumberish } from '@ethersproject/bignumber';
import * as dotenv from 'dotenv';

dotenv.config();

function A() {
  console.log(Tokens)
}
// function parseBigNumberish(
//   n: BigNumberish,
//   token: Token,
//   chainId: number
// ): BigNumber {
//   return n instanceof BigNumber
//     ? (n as BigNumber)
//     : token.etherToWei(n, chainId);
// }
//
// async function calculateBridgeSwapOutput(args: {
//   chainId: number;
//   tokenFrom: Token;
//   tokenTo: Token;
//   amountFrom: BigNumberish;
//   chainIdTo: number;
// }) {
//   const { chainId, ...rest } = args;
//   const fnArgs = {
//     ...rest,
//     amountFrom: parseBigNumberish(rest.amountFrom, rest.tokenFrom, chainId),
//   };
//
//   const synapseBridge = new Bridge.SynapseBridge({ network: chainId });
//   const { amountToReceive } = await synapseBridge.estimateBridgeTokenOutput(
//     fnArgs
//   );
//
//   return amountToReceive;
// }
//
// async function executeBridgeSwap(args: {
//   ethers: any,
//   chainId: number;
//   tokenFrom: Token;
//   tokenTo: Token;
//   amountFrom: BigNumberish;
//   chainIdTo: number;
//   addressTo?: string;
// }) {
//   const amountTo: BigNumberish = await calculateBridgeSwapOutput({
//     chainId: args.chainId,
//     tokenFrom: args.tokenFrom,
//     tokenTo: args.tokenTo,
//     amountFrom: args.amountFrom,
//     chainIdTo: args.chainIdTo,
//   });
//   const { chainId, ...rest } = args;
//   const fnArgs = {
//     ...rest,
//     amountFrom: parseBigNumberish(rest.amountFrom, rest.tokenFrom, chainId),
//     amountTo: parseBigNumberish(amountTo, rest.tokenTo, rest.chainIdTo),
//   };
//
//   const synapseBridge = new Bridge.SynapseBridge({ network: chainId });
//   const signers = await args.ethers.getSigners();
//   const signer = signers[0];
//
//   const setTx = await synapseBridge.executeBridgeTokenTransaction(
//     fnArgs,
//     signer as any
//   );
//
//   console.log(setTx);
// }
//
// task('bridge', 'Send a USDT token from BNB chain to Metis').setAction(
//   async (_, hre) => {
//     //Structure arguments properly
//     const chainIds = [
//       parseInt(process.env.BNB_CHAIN_ID || ''),
//       parseInt(process.env.METIS_CHAIN_ID || ''),
//     ];
//
//     await executeBridgeSwap({
//       ethers: hre.ethers,
//       chainId: chainIds[0],
//       tokenFrom: Tokens.USDT,
//       tokenTo: Tokens.USDC,
//       amountFrom: BigNumber.from('2000000000000000000'),
//       chainIdTo: chainIds[1],
//       addressTo: process.env.ADDRESS,
//     });
//
//     // //Set up providers (RPCs) for each chain desired**
//     // const bnbProvider: Provider = new JsonRpcProvider(process.env.BNB_RPC_URL);
//     // const metisProvider: Provider = new JsonRpcProvider(
//     //   process.env.METIS_RPC_URL
//     // );
//     //
//     // const providers = [bnbProvider, metisProvider];
//     //
//     // //Set up a SynapseSDK instance
//     // const Synapse = new SynapseSDK(chainIds, providers);
//     // const originRouter = Synapse.synapseRouterSet.getSynapseRouter(chainIds[0]);
//     // const originRouterAddress = originRouter.address;
//     //
//     // originRouter.getConnectedBridgeTokens;
//     // // quote
//     // const quote = await Synapse.bridgeQuote(
//     //   chainIds[0], // From Chain
//     //   chainIds[1], // To Chain
//     //   process.env.BNB_USDT_TOKEN_ADDRESS || '', // FROM Token
//     //   process.env.METIS_USDC_TOKEN_ADDRESS || '', // To Token
//     //   BigNumber.from('2000000000000000000') // Amount = 2 tokens
//     // );
//     //
//     // const resp = await Synapse.bridge(
//     //   process.env.ADDRESS || '',
//     //   originRouterAddress,
//     //   chainIds[0], // From Chain
//     //   chainIds[1], // To Chain
//     //   process.env.BNB_USDT_TOKEN_ADDRESS || '', // Origin Token Address
//     //   BigNumber.from('2000000000000000000'), // Amount = 2 tokens
//     //   quote.originQuery, // Origin query from bridgeQuote()
//     //   quote.destQuery // Destination query from bridgeQuote()
//     // );
//     //
//     // console.log(resp);
//   }
// );
