import React from 'react'

export const Donations = () => {
  return (
    <div className='donations'>
      <h3>Donaciones</h3>
      <ul className='dbuttons'>
        <div className='dbuttons inner'>
          <li><a href="lightning:bitcoinbarcelona@getalby.com "target="_blank"rel="noreferrer">⚡ Lightning</a></li>
          <li><a href="https://getalby.com/p/bitcoinbarcelona "target="_blank"rel="noreferrer"><img className='exit-icon' src='./img/fi-br-sign-out.png'></img></a></li>
        </div>
        <li className='dbuttons-last'><a href="https://btcpay.bitcoinbarcelona.xyz/"target="_blank"rel="noreferrer">🔗 On-chain</a></li>
      </ul>
    </div>
  )
}
