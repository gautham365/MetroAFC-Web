import React from 'react'
import './paymentstatus.css'
import {ReactComponent as Closecircle} from '../close-circle.svg'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../Utils/Common';

function PaymentStatus() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({state: false, receipt: {}});
    // get payment_id from query string
    const urlParams = new URLSearchParams(window.location.search);
    const payment_id = urlParams.get('paymentId');
    

    useEffect(() => {
      
        setLoading(true)
        axios.post(`${process.env.REACT_APP_HOST}/payment/getReceipt`, { token: getToken(), payment_id: payment_id })
        .then(response => {
            console.log(response.data.receipt)
            setLoading(false)
            setData({state: true, receipt: response?.data?.receipt})  
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
            // setData({})
        })
      return () => {
        
      }
    }, [payment_id])


    if (loading) {
        // return <div className="loadclass"><span className="loader-11"></span></div>;
        return <>
        <div className="loadclass-new">
          <div className="spinner-box">
        <div className="configure-border-1">  
          <div className="configure-core"></div>
        </div>  
        <div className="configure-border-2">
          <div className="configure-core"></div>
        </div> 
        </div>
        </div>
        </>;  }
    

  return (
    <>
    <div className='dash'>
    <h1 className='subtitle'>Payment Status</h1>
    {data.state?
    <div className="wrapperAlert">

  <div className="contentAlert">

    <div className="topHalf">
      <div> {data.receipt?.status==='TXN_SUCCESS'? 
        <svg viewBox="0 0 512 512" className="mark" title="check-circle">
        <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
        </svg>:
        
        <Closecircle />}

        </div>

        {data.receipt?.status==='TXN_SUCCESS'? 
         <div><span className="h">Topup Success</span></div>   
         :
        
         <div><span className="h e">Topup Failed</span></div>}

        </div> 
        <div className="bottomHalf">
      
                <div className="det">Amount: {data.receipt?.txn_amount}</div> 
                <div className="det">To: {data.receipt?.username}</div> 
                <div className="det">Mode: {data.receipt?.payment_mode}</div>       
                <div className="det">Gateway: {data.receipt?.gateway_name}</div>       

        </div>
        </div>
        </div>: <h1>Error</h1> }
    </div> 
    </>
  )
}

export default PaymentStatus