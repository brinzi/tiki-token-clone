import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import artifact from './artifacts/token.json';
import router from './artifacts/router.json';


const countdown = require('../public/countdown.min.js');

const pcsRouter = {
  // address: '0x05ff2b0db69458a0750badebc4f9e13add608c7f',
  address: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
};
const doge = {
  address: '0xba2ae424d960c26247dd6c32edc70b295c744c43',
  decimals: 8,
};

const bnb = {
  address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  decimals: 18,
};

const busd = {
  address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
  decimals: 18,
};


const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.defibit.io/");

const magmaContractAddress = '0x24401cf6e48757adee23c50bbd9284379f154ef0';
const magmaDecimals = 9;
const magmaAbi = artifact;
const magmaContract = new ethers.Contract(magmaContractAddress, magmaAbi, provider);
const pcsRouterContract = new ethers.Contract(pcsRouter.address, router, provider);


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


async function getDogePrice() {
  const functionResponse = await getAmountsOut(`${1 * Math.pow(10, doge.decimals)}`, [doge.address, bnb.address, busd.address]);
  const priceInUsd = Number(functionResponse?.amounts[2].toString()) / Math.pow(10, busd.decimals);
  return priceInUsd;
}



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
  const [holdings, setHoldings] = useState(0);
  const [claiming, setClaiming] = useState(false);

  const [refreshAddressData, setRefreshAddressData] = useState(true);
  const [magmaPrice, setmagmaPrice] = useState(0);

  const [totalSupply, setTotalSupply] = useState(0);
  const [marketCap, setMarketCap] = useState(0);

  const claim = async () => {

    const wallet = await getMetamaskWallet();
    if (wallet === null) return;


    const magmaContract = new ethers.Contract(magmaContractAddress, magmaAbi, wallet);
    const walletAddr = await wallet.getAddress();
    try {
      setClaiming(true);
      await magmaContract.claim();
      setClaiming(false);
    } catch (error) {
      setClaiming(false);
    }

  };

  useEffect(() => {
    getmagmaPrice().then(res => {
      if (!res) {
        res = 0;
      }
      setmagmaPrice(res.toFixed(8));
    });


    if (ethers.utils.isAddress(address)) {
      if (localStorage.getItem('address') !== address) {
        localStorage.setItem('address', address);
      }

      callContract(address);
    }
  }, [address, refreshAddressData]);

  useEffect(() => {
    setMarketCap(magmaPrice * totalSupply);

  }, [magmaPrice, totalSupply]);


  const callContract = () => {
    magmaContract.balanceOf(address).then(balance => {
      setHoldings((Number(balance.toString()) / 1e9).toFixed(0));
    });

    magmaContract.getCirculatingSupply().then(supply => {
      setTotalSupply(supply).toFixed(0);
    });


  };
  return (
    <div>
      <div className="max-w-screen-lg mx-auto  mb-10">
        <section className="">
          <div className="w-11/12  mx-auto  ">

            <div className="flex flex-col text-center align-center justify-between	items-center margin-stats mb-8">
              <h1 className="text-5xl font-semibold text-brown mt-4 mb-8 items-center flex">BabyMetaDoge Earnings</h1>
              <div>
                <button onClick={() => {
                  if (!wallet) {
                    getWallet().then(data => setWallet(data[0]));
                  } else {
                    claim();
                  }
                }} className="bg-brown rounded-full  border-orange  py-2 px-4 disabled:text-gray" style={{ fontSize: '1.5rem' }} disabled={claiming}>
                  {claiming ? "Claiming..." :

                    !wallet ? 'Connect to Claim' : 'Claim DOGE'

                  }
                </button>

                {/* <button onClick={() => {
                  if (!wallet) {
                    getWallet().then(data => setWallet(data[0]));
                  } else {
                    claim();
                  }
                }} className="bg-transparent rounded-full border-2 border-orange text-white  py-2 px-4 disabled:text-gray" disabled={true}>
                 Rewards are currently disabled
                </button> */}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-3  md:h-80 text-center mt-4 ">
              <div className="min-w-0 mt-4  rounded-lg shadow-custom">
                <div className="p-4 mt-4 flex items-center justify-center text-center w-full">
                  <div>
                    <p className="mb-2 text-2xl font-medium ">Holdings</p>
                    <p className="text-4xl  margin-stats text-brown">{`${numberWithCommas(holdings)}`}</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 mt-4 rounded-lg shadow-custom">
                <div className="p-4 mt-4 flex items-center  justify-center text-center w-full">
                  <div>
                    <p className="mb-2 text-2xl font-medium ">Price</p>
                    <p className="text-4xl margin-stats text-brown">${`${magmaPrice}`}</p>
                  </div>
                </div>
              </div>
              <div className="min-w-0 mt-4 rounded-lg shadow-custom">
                <div className="p-4 mt-4 flex items-center  justify-center text-center w-full">

                  <div>
                    <p className="mb-2 text-2xl font-medium ">MarketCap</p>
                    <p className="text-4xl  margin-stats text-brown">${`${marketCap}`}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* <div className="grid grid-cols-2 gap-4 margin-stats">
              <div className=" min-w-0 mt-4 rounded-lg   col-span-2">
                <div className=" mt-4 flex flex-col text-center items-center">
                  <div className="relative pt-1 w-full">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="  inline-block py-1 px-2  rounded-full  bg-trasparent">
                          Next Loading
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="  inline-block ">
                          {payoutText}
                        </span>
                      </div>
                    </div>
                    <div style={{ height: '5px' }} className="overflow-hidden  mb-4 text-xs flex shadow-custom">
                      <div style={{ width: nextPayoutProgress + '%' }} className="shadow-none flex flex-col text-center whitespace-nowrap  justify-center bg-orange"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img className="w-32 h-32 mb-4 margin-stats" src="/doge.png" />
              <div>
                <p className="margin-stats text-4xl text-5xl text-center">Total Paid To Holders</p>
                <p className=" break-all  text-brown text-4xl md:text-5xl text-center mb-8 mt-2">
                  {totalDividentDistributed}
                  <span className="text-orange">DOGE</span>
                  <br />
                  =${totalDividentDistributedUSD}
                </p>
              </div>
            </div> */}
          </div>
        </section>

      </div>

    </div>

  );
}
