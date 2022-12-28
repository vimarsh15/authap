import './userlist.css'
import axios from 'axios'


import React, {useState, useEffect} from 'react'
import {Table, Image, Pagination, Form, Button} from 'react-bootstrap'
import {useSelector, useDispatch} from 'react-redux'

import {useNavigate} from 'react-router-dom'
import {userlogout} from '../../action/useraction'



const Userlist = () => {
    let active = 1;
    let items = [];
    
    
    const [page , setpage] = useState(0)

    let pagination = (pagee)=>{
    
      setpage(pagee)
    }
    for (let number = 1; number <= 5; number++) {
        items.push(
          <Pagination.Item onClick={()=> pagination(number)} key={number} active={number === page}>
            {number}
          </Pagination.Item>
        );
      }
      let navigate = useNavigate()
      let useerlogin = useSelector(state => state.userlogin)
      
      let {loading, userinfo:loginuser, error} = useerlogin
      
      let dispatch = useDispatch()  
      const [userinfo, setuserinfo] = useState([])
      
      const [search , setsearch] = useState('')
      useEffect(() => {
        if(!loginuser){
              navigate('/')
        }
        // console.log(loginuser.token)
    
        
        let config = {
          headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${loginuser?.token}`
           
          }   
        }
        if(search){
         
          axios.get(`http://localhost:3200/api/user/?username=${search}`, config).then((res) => {
            setuserinfo(res ?. data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
        }
        else {
          axios.get(`http://localhost:3200/api/user/page?page=${page}`, config).then((res) => {
            setuserinfo(res ?. data)
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
        }

        

    }, [loginuser, search, navigate, page])

   let logout = ()=>{
     dispatch(userlogout())
   
   } 
 
    return (
        <div className='table'>
             <div style={{ display:'flex', alignContent:'space-around'}} > 
            <h2>User list</h2>
               <Button onClick={logout} style={{ marginLeft:'auto'}}>log out</Button>
             </div>
            <hr/>
            
            <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        {/* <Form.Label>Email address</Form.Label> */}
        <Form.Control type="text" placeholder="Search user" onChange={(e) => setsearch(e.target.value)} 
        autoComplete='off'
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      
    </Form>


            <Table striped bordered hover>
                <thead>
                    <tr>
  
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody> {
                    userinfo?.map((user) => (
                        <tr>
                            
                                
                            <td>{
                                user ?. _id
                            }</td>
                            <td>{
                                user ?. name
                            }</td>
                            <td>{
                                user.email
                            }</td>
                        </tr>
                    ))
                } </tbody>
            </Table>
            {
         <Pagination>{items}</Pagination> 
                            
            } 
        </div>
    )
}

export default React.memo(Userlist)