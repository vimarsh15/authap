import React, {useState, useEffect} from 'react'
import './login.css'


import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'
import {useNavigate, Link} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import {userlogin} from '../../action/useraction'



const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    let useerlogin = useSelector(state => state.userlogin)
    let {loading, userinfo, error} = useerlogin  
     
    
    let dispatch = useDispatch()
    let navigate = useNavigate()
    
    useEffect(() => {
    if(userinfo){
          
        navigate('/userlist')
    }
    
      
    }, [userinfo, navigate])
    
    
    let submit = (e) => {
        e.preventDefault()
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
        if (!email || !password) {

            alert('Please enter the required fields')
        
        } 
        else if (email && ! regexEmail.test(email)) {
            alert('Enter a valid email')
        } else {
            dispatch(userlogin(email, password))
            if(error){
                alert(error)
              
                        
            }
            else {
                navigate('/userlist')
            
            }
            // let user = {
            //     email: email,
                
            // }
            // axios.post('https://reqres.in/api/users', user).then((res) => {
            //     console.log(res)
            //     navigate('/userlist')

            // }).catch((err) => {
            //     console.log(err)
            // })
            setemail('')
            
            // setname('')
            setpassword('')

        }
    }
    return (
        <div className='form'>
            <h2>Login</h2>
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
                {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter your Name</Form.Label>
                    <Form.Control value={name}
                        type="text"
                        placeholder="Enter your name"
                        autoComplete='off'
                        onChange={
                            (e) => setemail(e.target.value)
                        }/> 
                        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
         </Form.Group> */}
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
                <Link to='/'>not registered yet click here to register </Link>
                <div className="d-grid gap-2">
                    <Button onClick={submit}
                        variant="primary"
                        type='submit'
                        size="lg">
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    )
}






export default React.memo(Login)