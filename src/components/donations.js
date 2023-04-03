import React from 'react'

export const Donations = () => {
  return (
    <div className='donations'>
      <h3>Donaciones</h3>
      <ul className='dbuttons'>
        <div className='dbuttons inner'>
          <li><a href="lightning:gzuuus@getalby.com"target="_blank"rel="noreferrer">⚡ Lightning</a></li>
          <li><a href="https://getalby.com/p/gzuuus"target="_blank"rel="noreferrer"><img className='exit-icon' src='./img/fi-br-sign-out.png' alt=''></img></a></li>
        </div>
        <li className='dbuttons-last'><a href="https://btcpay.bitcoinbarcelona.xyz/apps/DGFprW3j8PSTm2FyoS3j1czWHbR/pos"target="_blank"rel="noreferrer">🔗 On-chain</a></li>
      </ul>
    </div>
  )
}
