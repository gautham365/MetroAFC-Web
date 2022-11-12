import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./topup.css";
import { getToken } from "../../Utils/Common";
import Step1 from "./Step1";
import Step2 from "./Step2";
import StepProgress from "./StepProgress";
import { Prompt } from 'react-router-dom'
import io from 'socket.io-client';
const socket = io(`${process.env.REACT_APP_SOCKET}/?token=${getToken()}`,{
  reconnection: true,
  autoConnect: false,
});
console.log("in topup");
// import { useNavigate } from 'react-router-dom'
function Topup() {
  // let history = useHistory();
  // let pid = history.location.search?.slice(5);
  let pid = localStorage.getItem("paymentId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [step1, setStep1] = useState({ state: false, data: {payment_id: 324342} });
  const [step2, setStep2] = useState({ state: false, data: {user_name: "HI"} });

  const tryReconnect = useCallback(() => {
    setTimeout(() => {
      socket.connect()
      
    }, 2000);
  }, [])

  useEffect(() => {
    // console.log(socket);
    if (!socket.connected && !step2.state){
      tryReconnect();
    }

    socket.io.on('close',(reason,description)=>{
      console.log("socket closed");
      if (reason==="transport close")tryReconnect();
    })

    socket?.on('assigned', (data) => {
      console.log(data,localStorage.getItem('paymentId'));
      setStep2({ state: true, data: { user_name: data.username, paymentId: localStorage.getItem('paymentId') } });
    });

    if (pid) {
      setLoading(true);
      axios.post(`${process.env.REACT_APP_HOST}/payment/getStatus`,{ token: getToken(), payment_id: pid})
      .then((response) => {
        setStep1({ state: true, data: response.data });
        setLoading(false)
      })
      .catch((error) => {
        setError(error.response?.data.error);
        setLoading(false);
        localStorage.removeItem('paymentId');
      });
    }
    
    
    // const handleBeforeUnload = (event) => {
    //   event.preventDefault()
    //   // event.returnValue = message
    //   // return message
    // }

    
    //   window.addEventListener('beforeunload', handleBeforeUnload)
    

    return () => {
      console.log("unmounting");
      socket.disconnect({token: getToken()});
    }
    // return (e) => {
    //   console.log("unmounting");
    //   if (window.confirm("Are you sure to ABORT the transaction")===true) {
    //     axios.post(`${process.env.REACT_APP_HOST}/payment/abort`, {token: getToken(), payment_id: paymentId.current})
    //     .then(res => {
    //       // console.log(res);
    //       // navigate('/dashboard')
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     })
    //     console.log("ABORTED");
    //   }else{
    //     // navigate('/dashboard')
    //   //  prevent unmounting

    //   }
      
    // };
  }, [pid, step2.state, tryReconnect]);

  const handleClick = (e) => {
    // setStep1({ state: true, data: {payment_id: 324342} })
    // return ;
    e.preventDefault();
    setLoading(true);
    // let amt = document.getElementById('topup-amount').value;
    // console.log(amt)
    // window.open(`http://localhost:8080?amount=${amt}&custId=cust313&orderId=234234`, "_self");
    axios
      .post(`${process.env.REACT_APP_HOST}/payment/generatePaymentId`, {
        token: getToken(),
        amount: document.getElementById("topup-amount").value,
      })
      .then((response) => {
        // history.replace(`/topup/?pid=${response.data.payment_id}`)
        // history.push(`/topup/?pid=${response.data.payment_id}`)
        setStep1({ state: true, data: response.data });
        setLoading(false);
        console.log(response.data);
        localStorage.setItem("paymentId", response.data.payment_id);
        // window.open(response.data.data.paymentUrl, "_self");
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response?.data.error);
        console.log(error);
        // setStep1({ state: true, data: {payment_id: 324342} })
      });
  };

  // if (loading) {
  //   // return <div className="loadclass"><span className="loader-11"></span></div>;
  //   return (
  //     <>
  //       <div className="loadclass-new">
  //         <div className="spinner-box">
  //           <div className="configure-border-1">
  //             <div className="configure-core"></div>
  //           </div>
  //           <div className="configure-border-2">
  //             <div className="configure-core"></div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
    <Prompt
        when={step1.state===true}
        message="Are you sure you want to leave?"
      />
    {<StepProgress step0={true} step1={step1.state} step2={step2.state}  />}
      {step2.state ? (
        <>
          <Step2 data={step2.data} setData={setStep2} soc={socket}/>
        </>
      ) : step1.state ? (
        <>
          <Step1 data={step1.data} />
        </>
      ) : (
        <>
          <div className="topup">
            <div className="topupform">
              <form onSubmit={handleClick}>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="topup-amount"
                    placeholder="Enter amount"
                    required  
                  />
                  {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
                  <input type="submit" value={loading ? 'Loading...' : 'Proceed'} disabled={loading} />
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Topup;
/* if (step1.state) {
          return (
            <div className='dash'>
            <h1 className='subtitle'>Topup</h1>
            <Step1 handleClick={handleClick} step1={step1} setStep1={setStep1} setStep2={setStep2} />
            </div>
          )
        }
        
    
        if (step2.state) {
          return (
            <div className='dash'>
            <h1 className='subtitle'>Topup2</h1>
            <div className='topup'>
    
            <div className='topupform'>
            <form>
            <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input type='number' className='form-control' id='topup-amount' placeholder='Enter amount' />
    
            <input type="button" value="Proceed" onClick={handleClick} />
            </div>
            </form>
            </div>
            </div>
            </div>
          )
        }
        
          return (
            <div className='dash'>
            <h1 className='subtitle'>Topup</h1>
            <div className='topup'>
    
            <div className='topupform'>
            <form>
            <div className='form-group'>
            <label htmlFor='amount'>Amount</label>
            <input type='number' className='form-control' id='topup-amount' placeholder='Enter amount' />
    
            <input type="button" value="Proceed" onClick={handleClick} />
            </div>
            </form>
            </div>
            </div>
            </div>
          ) */
