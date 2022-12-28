import React from "react";
import {Container} from 'react-bootstrap'


import {BrowserRouter, Routes, Route} from 'react-router-dom'


let Adduser = React.lazy(() => import ("./component/adduser/Adduser"))
let Userlist = React.lazy(() => import ('./component/userlist/userlist'))
let Login = React.lazy(()=> import('./component/login/Login'))

function App() {
    return (


        <div>

            <Container>
                <BrowserRouter>
                    <Routes>

                        <Route path="/"
                            element={
                                < Adduser />
                        }></Route>
                        <Route path="/userlist"
                            element={<Userlist/>}></Route>
                        <Route path="/login"
                            
                            element={<Login/>}></Route>

                    </Routes>
                           
                </BrowserRouter>
            </Container>

        </div>


    );
}


export default App;
