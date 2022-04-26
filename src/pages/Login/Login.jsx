import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const location = useLocation();
    const redirect_uri = location.state?.from || '/';
    const navigate = useNavigate();



    const handleSignIn = e => {
        e.preventDefault();
        console.log(email, password);

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate('/dashboard/main');
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully logged in',
                    showConfirmButton: false,
                    timer: 1500
                });
            }).catch(error => {
                const errorMessage = error.message;
                setError(() => {
                    console.log(errorMessage);
                });
            })
        setError('');
        setSuccess('');
    }


    const handleEmailChange = e => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }





    return (
        <>
            <Header />
            <h2 className='text-4xl font-bold pt-28 text-center'>Login</h2>
            <div className="w-5/6 mb-64 md:w-1/2 lg:w-1/4 mx-auto pt-16 pb-12 mt-10 bg-gray-200 rounded-box">
                <form onSubmit={handleSignIn}>
                    <div className="form-control w-3/4 md:w-2/3 mx-auto ">
                        <label className="label">
                            <span className="label-text ">Email</span>
                        </label>
                        <input onBlur={handleEmailChange} required type="email" placeholder="Type your email" className="input text-gray-900 text-lg" />
                        <label className="label">
                            <span className="label-text ">Password</span>
                        </label>
                        <input onBlur={handlePasswordChange} required type="password" placeholder="Type your password" className="input text-gray-900 text-lg" />
                        <br /><br />
                        <input type="submit" value="LOGIN" className=" btn bg-rose-500 hover:bg-gray-500 text-white border-none" />
                        <br />
                        <div className="text-red-500 pb-5">
                            {error}
                        </div>
                        <div>
                            {success}
                        </div>
                        <h2 className=' text-center'>Don't have Account?<NavLink className="text-rose-500" to="/signup"> Click to Signup</NavLink></h2>

                    </div>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default Login;