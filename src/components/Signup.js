import styles from "./stylish.module.css";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';

    
const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" ,gender:""});
  const navigate= useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
        gender:credentials.gender,
      }),
    });
    
    const json = await response.json();
    if(json.success){
      localStorage.setItem("token", json.hashcode);
      navigate("/home");
    }
    else{
      props.showAlert("Invalid Credentials","warning")
    }
      localStorage.setItem("token", json.hashcode);
      props.showAlert("Your Account has been created: Login to Continue","success");
        const res= await fetch("http://localhost:5000/api/auth/sendmail",{
      method:'POST',
      headers:{
        "Content-Type":'application/json'
      },
          
      body:JSON.stringify({name:credentials.name,email: credentials.email,message:'Welcome '+credentials.name+' to iText-Editor'})
    })
    console.log(res);
        navigate("/login")
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

    return (
        <div>
          <section className={styles.sectional}>
    <div className={styles.formbox}>
        <div className="fval">
            <form onSubmit={handleSubmit}>
                <h2 className={styles.h2}>SignUp</h2>
                <div className={styles.inputbox}>
                    <ion-icon name="text-outline"></ion-icon>
                    <input type="text" id="name" name="name" onChange={onChange} required/>
                    <label htmlFor="name">Name</label>
                </div>
                <div className={styles.inputbox}>
                    <ion-icon name="mail-outline"></ion-icon>
                    <input type="email" id="email" name="email" onChange={onChange} required/>
                    <label htmlFor="email">E-Mail</label>
                </div>
                
                <div className={styles.inputbox}>
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" id="password" name="password" onChange={onChange} minLength={5} required/>
                    <label htmlFor="">Password</label>
                </div>
                {/* <div className={styles.inputbox}>
                    <ion-icon name="lock-closed-outline"></ion-icon>
                    <input type="password" id="cpassword" name="cpassword" onChange={onChange} minLength={5} required/>
                    <label htmlFor="">Confirm Password</label>
                </div> */}
                <div className={styles.inputbox}>
                        <ion-icon name="transgender-outline"></ion-icon>
                        <input type="text" id="gender" name="gender" onChange={onChange} minLength={3} required/>
                        <label htmlFor="">Gender</label>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">SignUp</button>
                    </form>  </div>  
            
            </div></section>
          
        </div>     
        
    )
}
export default Signup