import { useEffect } from 'react'
// import io from 'socket.io-client';
// import { getToken } from '../../Utils/Common';
// const socket = io(`${process.env.REACT_APP_SOCKET}/?token=${getToken()}`);
function Step2(props) {
  // const [loading, setLoading] = useState(false)

  useEffect(() => {
    localStorage.removeItem('paymentId');  
  
    return () => {
      // socket.disconnect({token: getToken()});
    }
  }, [])
  
  return (
    <>
    <h1 className='subtitle' >Payment Confirmations</h1>
      <div className="topup">
        <div className="topupform">
           <h4 className='subtitle'> Do you confirm User {props.data?.user_name} for payment??</h4>
            <div className="topupform__buttons">
           <input type="button" value="Yes" onClick={()=>{ window.open( `${process.env.REACT_APP_PAYMENT}/?paymentId=${props.data.paymentId}`,"_self" ) }}/>
           {/* <input type="button" value="No" /> */}
           </div>
        </div>
      </div>
    </>
  )
}

export default Step2