import { QRCodeSVG } from "qrcode.react";
import { useEffect } from 'react'

// import { getToken } from '../../Utils/Common';

function Step1({soc: socket, ...props}) {
  // const socketRef = useRef(null);
  useEffect(() => {
    // if (socketRef.current == null) {
    //   socketRef.current = io(`${process.env.REACT_APP_SOCKET}/?token=${getToken()}`);
    // }

    // const {current: socket} = socketRef;

    // socket = io(`${process.env.REACT_APP_SOCKET}/?token=${getToken()}`);
   
    return () => {
      // socket.disconnect({token: getToken()});
    }
  }, [socket,props])
  
  return (
    <>
    <h1 className='subtitle' >Verify User</h1>
      <div className="topup">
        <div className="topupform">
        {props.data?.payment_id && <QRCodeSVG value={`topup:${props.data?.payment_id}`}
          bgColor="white" 
          fgColor="black" 
          includeMargin={true}
          size={300}
          />}
        </div>
      </div>
    </>
  );
}

export default Step1;
// topup:${props.step1.data.payment_id}