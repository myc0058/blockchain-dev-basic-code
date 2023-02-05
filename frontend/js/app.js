/* eslint-disable no-undef */

const Web3 = require('web3');
const contractInfo = require('./new-monkey.deployed.json');

(async () => {
  let currentAccount = '';

  if (window.ethereum && window.ethereum.isMetaMask == true) {
    console.log('ready metamask');
  } else {
    console.log('no metamask');
  }

  window.ethereum.removeAllListeners();

  function accountsChanged(accounts) {
    console.log('on accountsChanged: ' + JSON.stringify(accounts));

    const selectedAccount = document.getElementById('selectedAccount');
    selectedAccount.innerText = accounts[0];
    currentAccount = accounts[0];
  }

  function chainIdChanged(chainId) {
    console.log('on chainChanged: ' + chainId);

    const selectedChainId = document.getElementById('selectedChainId');
    selectedChainId.innerText = chainId;
  }

  window.ethereum.on('accountsChanged', chainIdChanged);

  window.ethereum.on('chainChanged', chainId => {
    chainIdChanged(chainId);
  });

  window.ethereum.on('connect', connectInfo => {
    console.log('on connect: ' + JSON.stringify(connectInfo));
  });

  window.ethereum.on('disconnect', error => {
    console.log('on disconnect: ' + JSON.stringify(error));
  });

  window.ethereum.on('message', message => {
    console.log('on message: ' + JSON.stringify(message));
  });

  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });

  accountsChanged(accounts);

  const chainId = await window.ethereum.request({ method: 'eth_chainId' });

  chainIdChanged(chainId);

  const web3 = new Web3();
  var newMonkey = new web3.eth.Contract(contractInfo.abi, contractInfo.address);
  const data = newMonkey.methods.balanceOf(currentAccount).encodeABI();

  const balanceOfParam = {
    from: currentAccount,
    to: contractInfo.address,
    value: '0x0', // 16 진수로 넣어야 함
    data: data,
  };

  const myBalance = await window.ethereum.request({
    method: 'eth_call',
    params: [balanceOfParam],
  });

  const newMonkeyBalance = document.getElementById('newMonkeyBalance');
  newMonkeyBalance.innerText = myBalance;

  const mintButton = document.getElementById('mintButton');
  mintButton.onclick = async function mint() {
    const web3 = new Web3();
    var newMonkey = new web3.eth.Contract(
      contractInfo.abi,
      contractInfo.address,
    );

    const data = newMonkey.methods.mint('front').encodeABI();

    const param = {
      from: currentAccount,
      to: contractInfo.address,
      gasLimit: 5000000,
      gasPrice: Web3.utils.toHex(Web3.utils.toWei('750', 'gwei')),
      value: '0x0', // 16 진수로 넣어야 함
      data: data,
    };

    const transactionHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [param],
    });

    const txHash = document.getElementById('txHash');
    txHash.innerText = transactionHash;
  };
})();
