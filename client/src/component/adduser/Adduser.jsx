import React, {useState, useEffect} from 'react'
import './adduser.css'


import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'
import axios from 'axios'

import {useNavigate, Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

import {userregister as userregaction} from '../../action/useraction'

const Adduser = () => {
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    

    let navigate = useNavigate()
    let dispatch = useDispatch()

    let useerlogin = useSelector(state => state.userlogin)
    let {loading, userinfo, error} = useerlogin
    let userreg = useSelector(state => state.userregister)
    let {loading:regloading, userinfo:reguser, error:regerror} = userreg
    useEffect(() => {
      if(userinfo){
        navigate('/userlist')
      }
    }, [userinfo, navigate])
    
    let submit = (e) => {
        e.preventDefault()
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!email || !name || !password || !cpassword) {

            alert('Please enter the required fields')
        
        } 
        else if(password.length < 6){
            alert('Password should be at least 6 characters') 
        }
        else if(password !== cpassword){
            alert('password do not match') 
        }
        else if (email && ! regexEmail.test(email)) {
            alert('Enter a valid email')
        } else {
            if(userinfo){
                
                navigate('/userlist')   
            }
            else {
                if(regerror){
                 
                alert(regerror)
                }
                else {
                dispatch(userregaction(name, email, password))
                navigate('/userlist')
            } 
               
            }
            let user = {
                email: email,
                // first_name: fname,
                // last_name: lname
            }
            axios.post('https://reqres.in/api/users', user).then((res) => {
                console.log(res)
                navigate('/userlist')

            }).catch((err) => {
                console.log(err)
            })
            setemail('')
            
            setname('')
            setpassword('')

        }
    }
    return (
        <div className='form'>
            <h2>Register</h2>
            <hr/>
            <Form>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control value={email}
                        type="email"
                        placeholder="Enter email"
                        autoComplete='off'
                        onChange={
                            (e) => setemail(e.target.value)
                        
                        }/> </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter your Name</Form.Label>
                    <Form.Control value={name}
                        type="text"
                        placeholder="Enter your name"
                        autoComplete='off'
                        onChange={
                            (e) => setname(e.target.value)
                        }/> {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */} </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicfirstname">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password}
                        type="text"
                        placeholder="Enter your first name"
                        onChange={
                            (e) => setpassword(e.target.value)
                        }
                        
                        autoComplete='off'
                        />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fo">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control value={cpassword}
                        type="text"
                        placeholder="Enter your last name"
                        onChange={
                            (e) => setcpassword(e.target.value)
                        }
                        autoComplete='off'
                        
                        />
                </Form.Group>
                <Link to='/login'>already registered click here to login</Link>

                <div className="d-grid gap-2">
                    <Button onClick={submit}
                        variant="primary"
                        type='submit'
                        size="lg">
                        Submit
                    </Button>
                </div>
            </Form>
        </div>
    )
}






export default React.memo(Adduser)