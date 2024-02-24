import { Tokens, Token, Bridge } from '@synapseprotocol/sdk';
import { BigNumber, type BigNumberish } from '@ethersproject/bignumber';
import { Wallet } from "@ethersproject/wallet";
import { JsonRpcProvider } from "@ethersproject/providers";
import * as dotenv from 'dotenv';

dotenv.config();

function parseBigNumberish(
  n: BigNumberish,
  token: Token,
  chainId: number
): BigNumber {
  return n instanceof BigNumber
    ? (n as BigNumber)
    : token.etherToWei(n, chainId);
}

async function calculateBridgeSwapOutput(args: {
  chainId: number;
  tokenFrom: Token;
  tokenTo: Token;
  amountFrom: BigNumberish;
  chainIdTo: number;
}) {
  const { chainId, ...rest } = args;
  const fnArgs = {
    ...rest,
    amountFrom: parseBigNumberish(rest.amountFrom, rest.tokenFrom, chainId),
  };

  const synapseBridge = new Bridge.SynapseBridge({ network: chainId });
  const { amountToReceive } = await synapseBridge.estimateBridgeTokenOutput(
    fnArgs
  );

  return amountToReceive;
}

async function executeBridgeSwap(args: {
  signer: Wallet;
  chainId: number;
  tokenFrom: Token;
  tokenTo: Token;
  amountFrom: BigNumberish;
  chainIdTo: number;
  addressTo?: string;
}) {
  const amountTo: BigNumberish = await calculateBridgeSwapOutput({
    chainId: args.chainId,
    tokenFrom: args.tokenFrom,
    tokenTo: args.tokenTo,
    amountFrom: args.amountFrom,
    chainIdTo: args.chainIdTo,
  });
  const { chainId, ...rest } = args;
  const fnArgs = {
    ...rest,
    amountFrom: parseBigNumberish(rest.amountFrom, rest.tokenFrom, chainId),
    amountTo: parseBigNumberish(amountTo, rest.tokenTo, rest.chainIdTo),
  };

  const synapseBridge = new Bridge.SynapseBridge({ network: chainId });

  return await synapseBridge.executeBridgeTokenTransaction(
    fnArgs,
    args.signer,
  );
}

async function approveBridgeSwap(args: {
  signer: Wallet;
  chainId: number;
  token: Token;
  amount?: BigNumberish;
}) {
  const { chainId, ...rest } = args;
  const amt = rest.amount
    ? parseBigNumberish(rest.amount, rest.token, chainId)
    : undefined;

  const fnArgs = {
    ...rest,
    amount: amt,
  };

  const synapseBridge = new Bridge.SynapseBridge({ network: chainId });

  return await synapseBridge.executeApproveTransaction(fnArgs, args.signer);
}

(async () => {
  const chainIds = [
    parseInt(process.env.BNB_CHAIN_ID || ''),
    parseInt(process.env.METIS_CHAIN_ID || ''),
  ];
  const blocks = 15;
  const provider = new JsonRpcProvider(process.env.BNB_RPC_URL, { name: 'BNB', chainId: chainIds[0] });
  const signer = new Wallet(process.env.PRIVATE_KEY || '', provider);

  const approveTx = await approveBridgeSwap({
    signer,
    chainId: chainIds[0],
    token: Tokens.USDT,
    amount: BigNumber.from('2000000000000000000'),
  });
  console.log(approveTx);

  const approveEvents = await approveTx.wait(blocks);
  console.log(approveEvents);

  const swapTx = await executeBridgeSwap({
    signer,
    chainId: chainIds[0],
    tokenFrom: Tokens.USDT,
    tokenTo: Tokens.USDC,
    amountFrom: BigNumber.from('2000000000000000000'),
    chainIdTo: chainIds[1],
    addressTo: process.env.ADDRESS,
  });
  console.log(swapTx);

  const swapEvents = await swapTx.wait(blocks);
  console.log(swapEvents);

})().catch((e) => console.error(e));
