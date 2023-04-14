require('dotenv').config();

const Web3= require('web3');
const apiKey=  process.env['apiKey'];
const network= 'goerli';
const node = `https://eth.getblock.io/${apiKey}/${network}/`;

const web3 = new Web3(node);    
// console.log( web3); 
const account_To=  web3.eth.accounts.create(); 
// console.log(accountTo);
const privateKey= process.env['privateKey'];
const account_From= web3.eth.accounts.privateKeyToAccount(privateKey);
// console.log(account_From);

const createSignedTx= async( rawTx)=>{          // this function will signing the transactions 
    rawTx.gas= await web3.eth.estimateGas(rawTx);
    return await account_From.signTransaction(rawTx);
}
const sendSignedTx= async(signedTx)=>{ // 
    web3.eth.sendSignedTransaction(signedTx.rawTransaction().then(console.log));  //sending the singned transaction to the etherueum network so that the miners can check , whatever they usually do 
}
const  amountTo="0.001" ;

const rawTx={
    to:account_To.address,
    value:web3.utils.toWei(amountTo,"ether");
}
createSignedTx(rawTx).then(sendSignedTx);
