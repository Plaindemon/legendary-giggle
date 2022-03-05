import { fb } from '../../service/firebase';
import { useEffect } from 'react';
import { useAuth, useResolved } from '../../hooks';
import { Routes, Route, useNavigate } from "react-router-dom";
import { Login, Signup, Chat } from "components";

// import { render } from "react-dom";

export const App = () => {

// useEffect(() => {
//  fb.firestore.collection('chatUsers').where('userName', '==', 'plaindemon').get().then(res => {
//      const user = res.docs[0]?.data();
//      console.log(user)
//  })
// }, [])
const navigate = useNavigate();
const { authUser } = useAuth();
const authResolved = useResolved(authUser);

useEffect(() => {
    console.log(' AUTH USER: ', authUser, authResolved);
}, [authUser, authResolved]);

// functionality to redirect to the login form
useEffect(() => {
    if(authResolved) {
        // navigate(!!authUser ? '/' : '/login')
    }
}, [authResolved, authUser, navigate]);




    return(
        <div className="app">
          <Routes>
            <Route exact path='/' element={<Chat />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            
        </Routes>  
        </div>
        
    )
};
