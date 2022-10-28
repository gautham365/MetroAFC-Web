import { QRCodeSVG } from "qrcode.react";
import React from "react";

function Step1(props) {
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