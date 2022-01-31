import React, { useState, useRef } from 'react';

export default function SendTransaction({ web3, user, fetchBalance }) {
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [txnHash, setTxnHash] = useState();

  const sendTxBtnRef = useRef();

  const sendTransaction = async () => {
    if (!toAddress || !amount) return;
    disableForm();
    const { transactionHash } = await web3.eth.sendTransaction({
      from: user.publicAddress,
      to: toAddress,
      value: web3.utils.toWei(amount)
    });
    setTxnHash(transactionHash);
    enableForm();
  }

   // Disable input form while the transaction is being confirmed
   const disableForm = () => {
    setTxnHash();
    setDisabled(true);
    sendTxBtnRef.current.innerText = 'Submitted...';
  }

  // Re-enable input form once the transaction is confirmed
  const enableForm = () => {
    setDisabled(false);
    setToAddress(''); // Clear form inputs
    setAmount(''); // Clear form inputs
    fetchBalance(user.publicAddress); // Update balance after gas fee paid for transaction
    sendTxBtnRef.current.innerText = 'Send Transaction';
  }


  return (
    <div className='container'>
          <h1>Send Transaction</h1>
          <input type='text' disabled={disabled} value='0x38640d450d65696A1354e0515F59f8F780C11e8D' readOnly onChange={(e) => setToAddress(e.target.value)} className='full-width' placeholder='To Address' />
          <input type='text' disabled={disabled} value={amount} onChange={(e) => setAmount(e.target.value)} className='full-width' placeholder='Amount(excl. Gas Fee)' />
          <button disabled={disabled} ref={sendTxBtnRef} onClick={sendTransaction}>Send Transaction</button>
          {
          txnHash &&
            <div className='info'>
              <a href={`https://alfajores-blockscout.celo-testnet.org/tx/${txnHash}`} target='_blank'>
                View Transaction
              </a> 
            </div>
          }
        </div>
  )
}