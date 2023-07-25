import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { UserDataContext } from '../../UserDataContext/UserDataContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate = useNavigate();
let {saveUserData} = useContext(UserDataContext)
let [ isloading , setisloading] = useState(false)
let [error , seterror] = useState('')
let [ user , setUser] = useState({
   
     "email":"", 
     "password":"",
})

function getUserData(eventInfo){
let myUser = {...user}
myUser[eventInfo.target.name] = eventInfo.target.value
setUser(myUser);
};


async function sendUserDataToApi(){
let {data} = await axios.post(`https://movies-api.routemisr.com/signin`,user)
if(data.message === 'success'){
  localStorage.setItem('userToken' , data.token);
  saveUserData();
  navigate('/all')
    setisloading(false)

}
else{
    seterror(data.message)
    setisloading(false)

}


}

function sendRegisterDataToApi(e){
    setisloading(true)
    e.preventDefault()
sendUserDataToApi()

}




  return <>
<div className="box w-75 m-auto">
<form  onSubmit={sendRegisterDataToApi} className='mt-lg-5 pt-lg-5 pt-5 mt-5'>

<div><label htmlFor='email' className='lead mb-2'>Email :</label>
<input onChange={getUserData}  type="email" className="form-control mb-2 my-input" id="email" name='email'/>
{error? <div className="alert alert-danger">{'invalid Data'}</div>:''}

<label htmlFor='password' className='lead mb-2'>Password:</label>
<input  onChange={getUserData} type="password" className="form-control mb-2 my-input" id="password" name='password'/>
<button className='btn btn-lg btn-outline-info mt-2'>{isloading===true?<i className='fas fa-spin fa-spinner'></i>:'Login'}</button>
<Link to={'/register'}><button className='btn btn-lg btn-outline-info mt-2 ms-2'>Signup</button></Link></div>

</form>
</div>
  
  </>
}