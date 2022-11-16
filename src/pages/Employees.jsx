import imageExists from "image-exists";
import { useState, useEffect, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../css/Employees.module.css'

function Employees() {
  const [employee, setEmployee] = useState([]);
  const [inputNone, setInputNone] = useState(true);
  const idRef = useRef();
  const nameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const urlRef = useRef();
  

  //DONE  TODO: Load data from backend service

  useEffect (()=>{
      fetch("https://reqres.in/api/users") 
        .then (res => res.json())
        .then (data =>  setEmployee(data.data))
    },[]
  );

  useEffect (()=>{
      idRef.current.value = Math.max(...employee.map(el => el.id))+1
    }, [employee]
  );

  const addEmployee = () => {
      // TODO: Add validations
      // TODO: Add an employee to the table
      if(!(validateID() && validateEmail() && validateName(firstNameRef)&& validateName(lastNameRef) && validateURL())) return false;

      const newEmployee = {
          "id": idRef.current.value,
          "email": emailRef.current.value, 
          "first_name":firstNameRef.current.value,
          "last_name": firstNameRef.current.value,
          "avatar": urlRef.current.value
      }
      employee.push(newEmployee);
      console.log(employee)
      setEmployee(employee.slice());
    }

  const deleteEmployee = (ix) => {
    toast("Employee deleted");
    employee.splice(ix, 1);
    setEmployee(employee.slice());
  }

  const validateID = () =>{
    if ( employee.findIndex(el=>Number(el.id) === Number(idRef.current.value))<0){
      idRef.current.className = "form-control";
      return true;
    } else {
      idRef.current.className = "form-control inputError";
      toast("The ID has been taken");
      return false;
    }
  }

  const validateName = whichName =>{
    const regex = new RegExp('^[a-zA-ZõäöüßÕÄÖÜ -]*$', 'gm');
    if(regex.test(whichName.current.value)){
      whichName.current.className = "form-control";
      return true;
    } else {
      toast("Only letters, a space, and a hyphen are allowed!");
      whichName.current.className = "form-control inputError";
      return false;
    }
  }

  const validateEmail = () => {
    const regex = new RegExp (/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/, 'gm');
    if (regex.test(emailRef.current.value)){
      emailRef.current.className = "form-control";
      return true;
    } else {
      if (emailRef.current.value !== "") {
        emailRef.current.className = "form-control inputError";
      }
      toast.error ("Please insert valid email. /n Username @ Mailserver . Domain");
      return false;
    }
  }

  const validateURL = () =>{
   // toast("The URL will not be entered.");
   //  return true;
    
    const regex = new RegExp ('^https?:[^=\?]*.[j|J][p|P][G|g]$', 'gm');
    const testUrl = urlRef.current.value.trim();
    let isValid = false;
    
    const valid =() =>{
      document.getElementById("xx").src = testUrl;
      urlRef.current.className = "form-control";
      isValid = true;
    }
    const notValid= txt =>{
      console.log(txt);
      toast.error("Input must be valid URL(with 'http(s):') and point to a jpg image."); 
      if (urlRef.current.value !== "") urlRef.current.className = "form-control inputError";
      document.getElementById("xx").src = "";
      isValid = false;
      return false; 
    }
    
//    const isValidHttpUrl = string => {
  //  }

    if(!regex.test(testUrl)) return notValid("not jpg");

    /* sobib kui cors on oma
     fetch(testUrl)
      .then (res => {
        console.log(res);
        if(res.status===200){
          valid();
        } else {
          notValid('status '+ res.status);
        }
      })
      .catch(e => {notValid("catch");console.log(e)} );
    */
   /*
      try {
        let url = new URL(testUrl);
        if (url.protocol === "http:" || url.protocol === "https:"){
          valid();
        } else {
          notValid("Not http")
        }
      } catch (_) {
        notValid("Url catch");
      }
      */

      imageExists(testUrl, function(exists) {
        if (exists) {
          console.log("it's alive!");
          valid();
        }
        else {
          console.log("oh well");
          notValid("imageExists");
        }
      });
      return isValid;
  }
 
  const newInput = () =>{
    setInputNone(false);
      setTimeout(() => {
        firstNameRef.current.focus();  
      }, 50);
  }

  const newInputBlure = () => {
    setTimeout(newInputBlureTimeout, 50);
  }

  const newInputBlureTimeout = () =>{
    if((firstNameRef.current===document.activeElement) || (lastNameRef.current===document.activeElement)) return;
    setInputNone(true);
    nameRef.current.title = nameRef.current.value = firstNameRef.current.value + " " + lastNameRef.current.value;
    validateName (nameRef);
  }
  
  return (<div>
     <ToastContainer />
    <div className="container">
      <h2 className="mb-4">Employees</h2>
      <Table className="table table-hover table-bordered table-sortable">
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          {/* <!--DONE TODO: Add a column for an avatar --> */}
          <th>Img
          </th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>{employee.map((el, ix)=>
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.first_name + " " + el.last_name}</td>
              <td>{el.email}</td>
              <td>
                {el.avatar!==''?<img src={el.avatar} alt="avatar" className={style.avatar}/>
                               :<span className={style.noImage}>No image</span>
                }
              </td>
              <td><Button onClick={()=>deleteEmployee(ix)} type="button" variant="danger">Delete</Button></td>
            </tr>
          )}
        <tr className="input-row">
          <td><input onBlur={validateID} ref={idRef} type="text" placeholder="ID" className="form-control" size="3" /></td>
          
          <td>
            <span className={!inputNone ?"inputNone":undefined }>
              <input onFocus={newInput} ref={nameRef} type="text" placeholder="Name" className =" form-control"/>
            </span>
            <span className={inputNone ?"inputNone":undefined} onBlur={newInputBlure}>
              <input onChange={()=>validateName(firstNameRef)} ref={firstNameRef} placeholder="First name" className="form-control" />
              <input onChange={()=>validateName(lastNameRef)} ref={lastNameRef} placeholder="Last name" className="form-control"/>
            </span>
          </td>

          <td><input ref={emailRef} onBlur={validateEmail} type="text" placeholder="Email" className="form-control"/></td>
          <td><input ref={urlRef} onBlur={validateURL} type="Url" placeholder="Avatar JPG URL" className="form-control" title="Insert employee avatar URL in JPG format."/></td>
          <td><Button onClick={addEmployee} type="submit" variant="success">Add</Button></td>
        </tr>
        
        </tbody>
      </Table>
      <img id="xx" alt="xx" className={style.avatar}/>
    </div>
  </div>)
}

export default Employees;