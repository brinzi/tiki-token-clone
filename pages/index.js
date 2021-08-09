import { last } from 'cheerio/lib/api/traversing';
import { ethers } from 'ethers';

import React, { useEffect, useState } from 'react';
import artifact from './artifacts/index.json';
const countdown = require('../public/countdown.min.js');

const pcsRouter = {
  // address: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
  address: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  abi: [
    {
      inputs: [
        { internalType: 'address', name: '_factory', type: 'address' },
        { internalType: 'address', name: '_WETH', type: 'address' },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      inputs: [],
      name: 'WETH',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'amountADesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBDesired', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        {
          internalType: 'uint256',
          name: 'amountTokenDesired',
          type: 'uint256',
        },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'addLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'factory',
      outputs: [{ internalType: 'address', name: '', type: 'address' }],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
      ],
      name: 'getAmountIn',
      outputs: [{ internalType: 'uint256', name: 'amountIn', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveIn', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveOut', type: 'uint256' },
      ],
      name: 'getAmountOut',
      outputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
      ],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
      ],
      name: 'getAmountsIn',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
      ],
      name: 'getAmountsOut',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveA', type: 'uint256' },
        { internalType: 'uint256', name: 'reserveB', type: 'uint256' },
      ],
      name: 'quote',
      outputs: [{ internalType: 'uint256', name: 'amountB', type: 'uint256' }],
      stateMutability: 'pure',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidity',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETH',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'removeLiquidityETHSupportingFeeOnTransferTokens',
      outputs: [
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountToken', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'token', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountTokenMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountETHMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityETHWithPermitSupportingFeeOnTransferTokens',
      outputs: [
        { internalType: 'uint256', name: 'amountETH', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'address', name: 'tokenA', type: 'address' },
        { internalType: 'address', name: 'tokenB', type: 'address' },
        { internalType: 'uint256', name: 'liquidity', type: 'uint256' },
        { internalType: 'uint256', name: 'amountAMin', type: 'uint256' },
        { internalType: 'uint256', name: 'amountBMin', type: 'uint256' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        { internalType: 'bool', name: 'approveMax', type: 'bool' },
        { internalType: 'uint8', name: 'v', type: 'uint8' },
        { internalType: 'bytes32', name: 'r', type: 'bytes32' },
        { internalType: 'bytes32', name: 's', type: 'bytes32' },
      ],
      name: 'removeLiquidityWithPermit',
      outputs: [
        { internalType: 'uint256', name: 'amountA', type: 'uint256' },
        { internalType: 'uint256', name: 'amountB', type: 'uint256' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapETHForExactTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactETHForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETH',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForETHSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapExactTokensForTokensSupportingFeeOnTransferTokens',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactETH',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        { internalType: 'uint256', name: 'amountInMax', type: 'uint256' },
        { internalType: 'address[]', name: 'path', type: 'address[]' },
        { internalType: 'address', name: 'to', type: 'address' },
        { internalType: 'uint256', name: 'deadline', type: 'uint256' },
      ],
      name: 'swapTokensForExactTokens',
      outputs: [
        { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    { stateMutability: 'payable', type: 'receive' },
  ],
};
const ltc = {
  address: '0x4338665cbb7b2485a8855a139b75d5e34ab0db94',
  decimals: 18,
};

const bnb = {
  address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  decimals: 18,
};

const busd = {
  address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  decimals: 18,
};

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

const magmaContractAddress = '0xF3593b3476ac58fA32878973B7ABf45AE055687F';
const magmaDecimals = 18;
const magmaAbi = artifact;
const magmaContract = new ethers.Contract(magmaContractAddress, magmaAbi, provider);
const pcsRouterContract = new ethers.Contract(pcsRouter.address, pcsRouter.abi, provider);


async function getAmountsOut(quoteAmount, path) {
  return await pcsRouterContract.functions['getAmountsOut'](
    quoteAmount,
    path,
    { gasLimit: 1000000000000 }
  );
}

async function getmagmaPrice() {
  const functionResponse = await getAmountsOut(`${1 * Math.pow(10, magmaDecimals)}`, [magmaContractAddress, bnb.address, busd.address]);
  const priceInUsd = Number(functionResponse.amounts[2].toString()) / Math.pow(10, busd.decimals);
  // console.log('magma', priceInUsd)
  return priceInUsd;
}

async function getBnbPrice() {
  const functionResponse = await getAmountsOut(`${1 * Math.pow(10, bnb.decimals)}`, [bnb.address, busd.address]);
  const priceInUsd = Number(functionResponse?.amounts[1].toString()) / Math.pow(10, busd.decimals);
  // console.log('bnb', priceInUsd)
  return priceInUsd;
}

async function getLtcPrice() {
  const functionResponse = await getAmountsOut(`${1 * Math.pow(10, ltc.decimals)}`, [ltc.address, bnb.address, busd.address]);
  const priceInUsd = Number(functionResponse?.amounts[2].toString()) / Math.pow(10, busd.decimals);
  return priceInUsd;
}



// const address = "0x63222b8120e7b72D9a39093f44cb0a9dea629132";


function TimeDifference(current, previous) {

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    const secs = Math.round(elapsed / 1000);
    return secs > 1 ? secs + ' Seconds Ago' : secs + ' Second Ago';
  }

  else if (elapsed < msPerHour) {
    const mins = Math.round(elapsed / msPerMinute);
    return mins > 1 ? mins + ' Minutes Ago' : mins + ' Minute Ago';
  }

  else if (elapsed < msPerDay) {
    const hours = Math.round(elapsed / msPerHour);
    return hours > 1 ? hours + ' Hours Ago' : hours + ' Hour Ago';
  }

  else if (elapsed < msPerMonth) {
    return '~ ' + Math.round(elapsed / msPerDay) + ' days Ago';
  }

  else if (elapsed < msPerYear) {
    return '~ ' + Math.round(elapsed / msPerMonth) + ' months Ago';
  }

  else {
    return '~ ' + Math.round(elapsed / msPerYear) + ' years Ago';
  }
}

let timer;




async function getMetamaskWallet() {
  let metamask;
  try {
    metamask = new ethers.providers.Web3Provider(window.ethereum, 56);
  } catch (e) {
    console.log('wrong chain', e);
    return null;
  }
  // Prompt user for account connections
  await metamask.send("eth_requestAccounts", []).then((res) => {

  });
  return metamask.getSigner();
  // metamask.getSigner().getAddress
}

async function getWallet() {

  const wallet = await getMetamaskWallet();

  console.log(wallet, 'here');
  if (wallet === null) return;


  const magmaContract = new ethers.Contract(magmaContractAddress, magmaAbi, wallet);

  const walletAddr = await wallet.getAddress();
  return [wallet, walletAddr, magmaContract];
}



async function getTotalDistribution() {
  return magmaContract.getTotalDividendsDistributed();
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function getmagmaVolume() {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=tiki-token&vs_currencies=usd&include_market_cap=false&include_24hr_vol=true&include_24hr_change=false&include_last_updated_at=false');
  const resolved = await res.json();
  const volume = resolved['tiki-token'].usd_24h_vol;
  return volume;
}



export default function Home({ address }) {

  const [wallet, setWallet] = useState(null);
  const [magmaings, setMagmaings] = useState(0);

  const [holdings, setHoldings] = useState(0);
  const [totalDividentDistributed, setTotalDividentDistributed] = useState(0);
  const [totalDividentDistributedUSD, setTotalDividentDistributedUSD] = useState(0);

  const [paid, setPaid] = useState(0);
  const [lastPaid, setLastPaid] = useState(0);
  const [nextPayoutProgress, setNextPayoutProgress] = useState(0);
  const [nextPayoutValue, setNextPayoutValue] = useState(0);

  const [claiming, setClaiming] = useState(false);

  const [refreshAddressData, setRefreshAddressData] = useState(true);
  const [refreshTimeData, setRefreshTimeData] = useState(true);

  const [magmaVolume, setmagmaVolume] = useState(null);
  const [bnbPrice, setBnbPrice] = useState(null);
  const [magmaPrice, setmagmaPrice] = useState(null);
  const [ltcPrice, setLtcPrice] = useState(null);
  const claim = async () => {

    const wallet = await getMetamaskWallet();

    console.log(wallet, 'here');
    if (wallet === null) return;


    const magmaContract = new ethers.Contract(magmaContractAddress, magmaAbi, wallet);

    const walletAddr = await wallet.getAddress();
    console.log(magmaContract);
    try {
      setClaiming(true);
      await magmaContract.claim();
      setClaiming(false);
    } catch (error) {
      setClaiming(false);
    }

  };

  useEffect(() => {
    getmagmaVolume().then(res => {
      setmagmaVolume(res);
    });

    getBnbPrice().then(res => {
      setBnbPrice(res);
    });

    getLtcPrice().then(res => {
      setLtcPrice(res);
    });

    if (ethers.utils.isAddress(address)) {
      if (localStorage.getItem('address') !== address) {
        localStorage.setItem('address', address);
      }

      callContract(address);
    }
  }, [address, refreshAddressData]);

  useEffect(() => {
    getTotalDistribution().then(res => {
      const val = res / 1e18;
      setTotalDividentDistributed((val).toFixed(2));
      setTotalDividentDistributedUSD((val * ltcPrice).toFixed(2));

    });
  }, ltcPrice);


  // const earningsInDollars = magmaVolume == 0 ? (holdings / 1000000000) * 220000 : (holdings / 1000000000) * (magmaVolume * 0.11);
  // const earningsInBnb = earningsInDollars / bnbPrice;

  // console.log(lastPaid)
  const payoutText = <><span className="text-yellow-300">
    {nextPayoutValue != 0 ? nextPayoutValue + ' LTC' : 'Processing'}
  </span>{Date.now() - lastPaid >= 3 * 60 * 1000 * 60 ? ` | ${nextPayoutProgress}%`
    : ` | ${countdown(Date.now(), lastPaid + 3 * 1000 * 60 * 60, countdown.HOURS | countdown.MINUTES).toString()}`}</>;
  // const compoundedmagmaAfterNDays = (starting, days) => {
  //   let accumulatedmagma = Number(starting);
  //   for (let i = 0; i < days; i++) {
  //     accumulatedmagma = magmaVolume == 0 ? accumulatedmagma + (((accumulatedmagma / 1000000000) * 220000) / magmaPrice) : accumulatedmagma + (((accumulatedmagma / 1000000000) * (magmaVolume * 0.11)) / magmaPrice);
  //   }
  //   return accumulatedmagma.toFixed(0);
  // };

  const callContract = () => {
    magmaContract.getNumberOfDividendTokenHolders().then(holders => {
      magmaContract.balanceOf(address).then(balance => {
        setHoldings((balance / 1e18).toFixed(0));
        magmaContract.getAccountDividendsInfo(address).then(result => {
          provider.getBalance(address).then(balance => {
            setMagmaings((balance / 1e18).toFixed(4));
            setPaid(parseInt(result[4]._hex, 16) - parseInt(result[3]._hex, 16));
            setLastPaid(parseInt(result[5]._hex, 16) * 1000);
            setNextPayoutProgress((100 - ((parseInt(result[2]._hex, 16) / parseInt(holders._hex, 16)) * 100)).toFixed(0));
            setNextPayoutValue((parseInt(result[3]._hex, 16) / 1e18).toFixed(4));
            window.clearTimeout(timer);
            timer = window.setTimeout(function () { setRefreshAddressData(!refreshAddressData); }, 9000);
          });
        });
      });
    });
  };

  return (
    <div>
      <div className="max-w-screen-lg mx-auto py-5 mb-10">
        <section className="">
          <div className="w-11/12  mx-auto  ">

            <div className="flex align-center justify-between	 ">

              <h1 className="text-4xl font-semibold text-black dark:text-white  mb-4 items-center flex">BigMag Earnings Manager</h1>
              <img width="160" height="160" className=" mb-4 mt-4" src="/logo.png" />


            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2  ">
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">

                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Your BigMag Holdings</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{`${numberWithCommas(holdings)}`}</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">

                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Total LTC Received</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{`${(paid / 1e18).toFixed(4)}`}</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">

                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Last Payout Time</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{`${lastPaid === 0 ? 'Never' : TimeDifference(Date.now(), lastPaid)}`}</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800">
                <div className="p-4 flex items-center">

                  <div>
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Next Loading</p>
                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{payoutText}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid  gap-4 mt-4">
              <button onClick={() => {
                if (!wallet) {
                  getWallet().then(data => setWallet(data[0]));
                } else {
                  claim();
                }
              }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" disabled={claiming}>
                {claiming ? "Claiming..." :

                  !wallet ? 'Connect wallet to claim manually' : 'Claim LTC'

                }
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="border border-gray-300 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 col-span-2">
                <div className="p-4 flex flex-col text-center items-center">

                  <img className="w-32 h-32 mb-4 mt-4" src="/bnb.png" />
                  <p className="mt-4 font-semibold text-gray-600 dark:text-gray-300 text-3xl text-center">Total Paid To Holders</p>
                  <p className="text-green-400 dark:text-green-400 text-4xl md:text-6xl text-center mb-8">
                    {totalDividentDistributed}
                    <span className="text-yellow-300">LTC</span>
                    <br />
                    =${totalDividentDistributedUSD}
                  </p>
                </div>
              </div>
              {/* 
              <div className="border border-gray-300 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 col-span-2 lg:col-span-1">
                <div className="p-4 flex flex-col text-center items-center">
                  <img className="w-32 h-32 mb-4 mt-4" src="https://magmatoken.app/static/media/money.d301ec34.png" />
                  <p className="mt-4 font-semibold text-gray-600 dark:text-gray-300 text-3xl text-center">
                    Your {numberWithCommas(holdings)} Magma Earns:
                  </p>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{numberWithCommas(earningsInBnb.toFixed(2))} LTC</span>(${numberWithCommas((earningsInDollars).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Day</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{numberWithCommas((earningsInBnb*7).toFixed(2))}</span>(${numberWithCommas((earningsInDollars*7).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Week</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{numberWithCommas((earningsInBnb*30).toFixed(2))} </span>(${numberWithCommas((earningsInDollars*30).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Month</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{numberWithCommas((earningsInBnb*365).toFixed(2))}</span>(${numberWithCommas((earningsInDollars*365).toFixed(2))})
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">Per Year</span>
                    </p>
                  </div>
                  <p className="text-gray-600 py-1 dark:text-gray-400 text-xl text-center -mt-2">Dynamic estimations based on 24h of trading volume 30,000
                  </p>
                </div>
              </div> */}



              {/* <div className="border border-gray-300 min-w-0 rounded-lg shadow-xs overflow-hidden bg-white dark:bg-gray-800 col-span-2 lg:col-span-1">
                <div className="p-4 flex flex-col text-center items-center">
                  <img className="w-32 h-32 mb-4 mt-4" src="https://magmatoken.app/static/media/money.d301ec34.png" />
                  <p className="mt-4 font-semibold text-gray-600 dark:text-gray-300 text-3xl text-center">
                    Your {numberWithCommas(holdings)} Magma Earns:
                  </p>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{holdings != 0 ? numberWithCommas(compoundedmagmaAfterNDays(holdings, 7)) : '0'}LTC</span>({holdings != 0 ? (compoundedmagmaAfterNDays(holdings, 7)/holdings).toFixed(2) : '0'}x Earnings)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In a Week</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{holdings != 0 ? numberWithCommas(compoundedmagmaAfterNDays(holdings, 30)) : '0'}</span> ({holdings != 0 ? (compoundedmagmaAfterNDays(holdings, 30)/holdings).toFixed(2) : '0'}x Earnings)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In a Month</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{holdings != 0 ? numberWithCommas(compoundedmagmaAfterNDays(holdings, 182)) : '0'} </span>({holdings != 0 ? (compoundedmagmaAfterNDays(holdings, 182)/holdings).toFixed(2) : '0'}x Earnings)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In 6 Months</span>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-green-400 dark:text-green-400 text-2xl text-center">
                      <span className="text-yellow-300">{holdings != 0 ? numberWithCommas(compoundedmagmaAfterNDays(holdings, 365)) : '0'}</span>({holdings != 0 ? (compoundedmagmaAfterNDays(holdings, 365)/holdings).toFixed(2) : '0'}x Earnings)
                      <span className="text-gray-600 dark:text-gray-400 text-xl text-center ml-2 mt-2">In 1 Year</span>
                    </p>
                  </div>
                  <p className="text-gray-600 py-1 dark:text-gray-400 text-xl text-center -mt-2">Estimations are based on current Magmaprice (${magmaPrice?.toFixed(6)})
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </section>

      </div>

    </div>

  );
}
