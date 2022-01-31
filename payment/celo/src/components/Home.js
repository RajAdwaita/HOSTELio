import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { magic, web3 } from '../magic';
import { abi } from '../contract/abi.js';
import Loading from './Loading';
import ContractCall from './ContractCall';
import SendTransaction from './SendTransaction';
import Info from './Info';

export default function Home() {
  const [userMetadata, setUserMetadata] = useState();
  const [balance, setBalance] = useState('...');
  const contractAddress = '0x1e1bF128A09fD30420CE9fc294C4266C032eF6E7';
  const contract = new web3.eth.Contract(abi, contractAddress);
  const [message, setMessage] = useState('...');
  const history = useHistory();

  useEffect(() => {
    // On mount, we check if a user is logged in.
    // If so, we'll retrieve the authenticated user's profile, balance and contract message.
    magic.user.isLoggedIn().then(magicIsLoggedIn => {
      if (magicIsLoggedIn) {
        magic.user.getMetadata().then(user => {
          setUserMetadata(user);
          fetchBalance(user.publicAddress);
          fetchContractMessage();
        });
      } else {
        // If no user is logged in, redirect to `/login`
        history.push('/login');
      }
    });
  }, [magic]);

  const fetchBalance = (address) => {
    web3.eth.getBalance(address).then(bal => setBalance(web3.utils.fromWei(bal)))
  }

  const fetchContractMessage = () => contract.methods.message().call().then(setMessage);

  return (
    userMetadata ? (
      <>
        <Info balance={balance} user={userMetadata} magic={magic} />
        <SendTransaction web3={web3} user={userMetadata} fetchBalance={fetchBalance} />
        <ContractCall contract={contract} user={userMetadata} fetchBalance={fetchBalance} message={message} fetchContractMessage={fetchContractMessage} />  
      </>
    ) : <Loading />
  );
}

