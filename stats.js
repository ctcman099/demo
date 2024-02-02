const { Web3 } = require('web3');

const web3 = new Web3('https://eth-mainnet.g.alchemy.com/v2/uEmZGjY6Lcik-27YKrnL-m2GaGbcQXFi');
const abi = require('./vat_abi.json');

const vatAddress = '0x35D1b3F3D7966A1DFe207aa4514C12a259A0492B'; // vat
const flashAddress = '0x60744434d6339a6B27d73d9Eda62b6F66a0a04FA'; // flash

const contract = new web3.eth.Contract(abi, vatAddress);

async function abc() {
  {
    const result = (await contract.methods.dai(flashAddress).call());
    console.log('Flash dai balance in vat: ', result);
  }

  {
    const result = (await contract.methods.sin(flashAddress).call());
    console.log(result);
  }

  {
    const result = (await contract.methods.debt().call());
    console.log(result);
  }

  {
    const result = (await contract.methods.vice().call());
    console.log(result);
  }

}

abc();