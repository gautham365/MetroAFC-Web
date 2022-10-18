import axios from 'axios';
import { useState } from 'react';
import { getToken } from '../Utils/Common';

function Updatedetails() {
    const [loading, setLoading] = useState(false);
    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        // console.log(e.target.age.value)
        // console.log(e.target.q1.value)
        // console.log(e.target.q2.value)
        // console.log(e.target.q3.value)
        axios.post(`${process.env.REACT_APP_HOST}/users/feedback`,{token: getToken(), name: e.target.name.value, feedback: e.target.feedback.value})
        .then((res)=>{
            console.log(res.data.recom);
            // setRecom({call: true, msg: res.data.recom});
        })
        .catch((error)=>{
            console.log(error?.reponse?.data);
        })
    }

    if (loading) {
        return <div className="loadclass"><span className="loader-11"></span></div>;
      }

  return (<>
  <h2>Updatedetails</h2>
  <div className="formData">
        <form onSubmit={handleSubmit}>
            <span>Therapist Name</span> 
            <input type={"text"} name={"name"} placeholder={"Therapist Name"} /> <br />
            <span>Your Feedback</span>
            <input type={"text"} name={"feedback"} placeholder={"Enter your Feedback for the Therapist"} /> <br />
   
            <input type="submit" value="Submit" />
        </form>
        
        </div>
  </>
  )
}

export default Updatedetails;