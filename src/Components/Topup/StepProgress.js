import React from 'react'

function StepProgress(props) {
  return (
    <>
    <div className='step-progress-container'>
    {/* <ul id="progressbar">
      <li className={props.step0?"active":""}>Initiate</li>
      <li className={props.step1?"active":""}>Verify User</li>
      <li className={props.step2?"active":""}>Payment</li>
    </ul> */}
    <div id="stepper" className="stepper-wrapper">
      <div className={`stepper-item ${props.step0?"completed":""}`}>
        <div className="step-counter">{props.step1?<>&#10004;</>:"1"}</div>
        <div className="step-name">Initiate</div>
      </div>
      <div className={`stepper-item ${props.step1?"completed":""}`}>
        <div className="step-counter"> {props.step2?<>&#10004;</>:"2"}</div>
        <div className="step-name">Verify User</div>
      </div>
      <div className={`stepper-item ${props.step2?"completed":""}`}>
        <div className="step-counter">{false?<>&#10004;</>:"3"}</div>
        <div className="step-name">Payment</div>
      </div>
      
    </div>
    </div>
    </>
  )
}

export default StepProgress;



// @keyframes progress{
// 0%{
//   width: 0%;
//   /* background: #27AE60; */
// }
// 100%{
//     width: 100%;
//     /* background: #27AE60; */
// }
// };