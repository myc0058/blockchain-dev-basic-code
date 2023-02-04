/* eslint-disable no-undef */

if (window.ethereum && window.ethereum.isMetaMask == true) {
  console.log('ready metamask');
} else {
  console.log('no metamask');
}

window.ethereum.enable();

window.ethereum.removeAllListeners();

window.ethereum.on('accountsChanged', accounts => {
  console.log('on accountsChanged: ' + JSON.stringify(accounts));
});

window.ethereum.on('chainChanged', chainId => {
  console.log('on chainChanged: ' + JSON.stringify(chainId));
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
