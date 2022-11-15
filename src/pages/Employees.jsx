import { useState, useEffect, useRef } from "react";
import { Button, Table } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from '../css/Employees.module.css'

function Employees() {
  const [employee, setEmployee] = useState([]);
  // const [isOk, setIsOk] =useState(false);
  const idRef = useRef();
  const nameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const imgRef = useRef();
  const urlRef = useRef();

  //DONE  TODO: Load data from backend service

  useEffect (()=>{
      fetch("https://reqres.in/api/users") 
        .then (res => res.json())
        .then (data =>  setEmployee(data.data))
    },[]
  );

  useEffect (()=>{
      idRef.current.value = Math.max(...employee.map(o => o.id))+1
    }, [employee]
  );

  const addEmployee = () => {
      toast("// TODO: Add validations");
      toast("// TODO: Add an employee to the table");
      const newEmployee = {
          "id": idRef.current.value,
          "email": emailRef.current.value, 
          "first_name":firstNameRef.current.value,
          "last_name": firstNameRef.current.value,
          "avatar": imgRef.current.value
      }
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
    const regex = new RegExp ('^[[a-zA-Z0-9-.]+@([[a-zA-Z0-9-.]+.)+[[a-zA-Z0-9-]{2,4}$', 'gm');
    if (regex.test(emailRef.current.value)){
      emailRef.current.className = "form-control";
      return true;
    } else {
      emailRef.current.className = "form-control inputError";
      toast ("Please insert valid email. /n Username @ Mailserver . Domain");
      return false;
    }

  }

  const validateURL = () =>{
    const regex = new RegExp ('.[j|J][p|P][G|g]$', 'gm');
    const testUrl = urlRef.current.value.trim();
    const returnFalse = txt =>{
      console.log(txt);
      toast("Input must be valid URL and point to a jpg image."); 
      urlRef.current.className = "form-control inputError";
      return false; 
    }

    if(!regex.test(testUrl)) return returnFalse("pole jpg");
     fetch(testUrl)
      .then (e => {
        if(e.status === 200){
          urlRef.current.className = "form-control";
          return true;
        } else {
          returnFalse(e.status);
        }
      })
      .catch(e => returnFalse("catch"));
     return false;
  }
  const newInput = () =>{
    nameRef.current.className = style.inputNone;
    firstNameRef.current.className="form-control";
    lastNameRef.current.className="form-control";
    firstNameRef.current.focus()
  }

  const newInputBlure = () => {
    setTimeout(newInputBlureTimeout, 50);
  }

  const newInputBlureTimeout = () =>{
    if((firstNameRef.current===document.activeElement) || (lastNameRef.current===document.activeElement)) return;
    nameRef.current.className = "form-control";
    firstNameRef.current.className=style.inputNone;
    lastNameRef.current.className=style.inputNone;
    nameRef.current.value = firstNameRef.current.value + " " + lastNameRef.current.value;
    nameRef.current.title = firstNameRef.current.value + " " + lastNameRef.current.value;
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
              <td><img src={el.avatar} alt="avatar" className="avatar"/></td>
              <td><Button onClick={()=>deleteEmployee(ix)} type="button" variant="danger">Delete</Button></td>
            </tr>
          )}
        <tr className="input-row">
          <td><input onBlur={validateID} ref={idRef} type="text" placeholder="ID" className="form-control" size="3" /></td>
          
          <td><input onFocus={newInput} ref={nameRef} type="text" placeholder="Name" className =" form-control"/>
              <span onBlur={newInputBlure}>
                <input onChange={()=>validateName(firstNameRef)} ref={firstNameRef} placeholder="First name" className={style.inputNone } />
                <input onChange={()=>validateName(lastNameRef)} ref={lastNameRef} placeholder="Last name" className={style.inputNone}/>
              </span>
          </td>

          <td><input ref={emailRef} onBlur={validateEmail} type="text" placeholder="Email" className="form-control"/></td>
          <td><input ref={urlRef} onBlur={validateURL} type="Url" placeholder="Avatar JPG URL" className="form-control" title="Insert employee avatar URL in JPG format."/></td>
          <td><Button onClick={addEmployee} type="submit" variant="success">Add</Button></td>
        </tr>
        </tbody>
      </Table>
    </div>

  </div>)
}

export default Employees;