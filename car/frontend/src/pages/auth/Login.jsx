import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios'
import UseAuth from '../../hooks/UseAuth';
const Login = () => {
  // const { signInUser } = useContext(AuthContext);
  const {signInUser}=UseAuth()
  const navigate = useNavigate();
const location = useLocation()
const handleSubmit = (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  const form = e.target;
  const email = form.email.value;
  const password = form.password.value;

  signInUser(email, password)
    .then((userCredential) => {
      // Signed in
      const loggedInUser = userCredential.user;
      console.log(loggedInUser);
      const user = { email };

      axios.post('http://localhost:4000/jwt', user, { withCredentials: true })
        .then((res) => {
          if (res.data.success) {
            navigate(location?.state ? location?.state : '/');
          }
        })
        .catch((axiosError) => {
          console.error('Error posting to /jwt:', axiosError);
        });
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.error('Sign-in error:', errorMessage);
    });
};

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="w-1/2 mr-12">
          <img
            src="https://images.unsplash.com/photo-1517676109075-9a94d44145d1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fHww"
            alt=""
            className="h-[410px] w-96 border-8 border-cyan-950 rounded-2xl"
          />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body border-8 border-cyan-950 rounded-2xl" onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold text-cyan-900 text-center">Login</h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" name="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name="password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-cyan-900 text-white">Login</button>
            </div>
            <Link to="/signup" className="text-center text-cyan-950 font-semibold hover:underline">Signup</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
