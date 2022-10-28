import React from 'react'

function Step2(props) {
  return (
    <>
    <h1 className='subtitle' >Payment Confirmations</h1>
      <div className="topup">
        <div className="topupform">
           <h4> Do you confirm User {props.data?.user_name} for payment??</h4>
        </div>
      </div>
    </>
  )
}

export default Step2