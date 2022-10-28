import React from 'react'

function StepProgress(props) {
  return (
    <>
    <div className='step-progress-container'>
    <ul id="progressbar">
      <li className={props.step0?"active":""}>Initiate</li>
      <li className={props.step1?"active":""}>Verify User</li>
      <li className={props.step2?"active":""}>Payment</li>
    </ul>
    </div>
    </>
  )
}

export default StepProgress