import { useEffect, useState } from "react";
import axios from "axios";
import "./topup.css";
import { getToken } from "../../Utils/Common";
import Step1 from "./Step1";
import Step2 from "./Step2";
import StepProgress from "./StepProgress";
// import { useNavigate } from 'react-router-dom'
function Topup() {
  const [loading, setLoading] = useState(false);
  const [step1, setStep1] = useState({ state: false, data: {payment_id: 324342} });
  const [step2, setStep2] = useState({ state: false, data: {user_name: "HI"} });
  // let navigate = useNavigate()

  useEffect(() => {
    // axios.post(`${process.env.REACT_APP_HOST}/getStatus`)

    return () => {};
  }, []);

  const handleClick = () => {
    // setStep1({ state: true, data: {payment_id: 324342} })
    // return ;
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
        console.log(response.data);
        setStep1({ state: true, data: response.data.payment_id });
        setLoading(false);
        // window.open(response.data.data.paymentUrl, "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    // return <div className="loadclass"><span className="loader-11"></span></div>;
    return (
      <>
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
      </>
    );
  }

  return (
    <>
    {<StepProgress step0={true} step1={step1.state} step2={step2.state} />}
      {step2.state ? (
        <>
          <Step2 data={step2.data} />
        </>
      ) : step1.state ? (
        <>
          <Step1 data={step1.data} />
        </>
      ) : (
        <>
          <div className="topup">
            <div className="topupform">
              <form>
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="topup-amount"
                    placeholder="Enter amount"
                  />

                  <input type="button" value="Proceed" onClick={handleClick} />
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
