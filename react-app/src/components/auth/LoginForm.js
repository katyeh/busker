// import React, { useState } from "react";
// import { useDispatch } from 'react-redux';
// import { Redirect } from "react-router-dom";
// import { login } from "../../services/auth";
// import { LOAD_USER } from '../../store/reducers/signupReducer';

// const LoginForm = ({ authenticated, setAuthenticated }) => {
//   const dispatch = useDispatch();
//   const [errors, setErrors] = useState([]);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const onLogin = async (e) => {
//     e.preventDefault();
//     const user = await login(email, password);
//     if (!user.errors) {
//       // localStorage.setItem();
//       setAuthenticated(true);
//       dispatch({
//         type: LOAD_USER,
//         ...user
//       });
//     } else {
//       setErrors(user.errors);
//     }
//   };

//   const updateEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const updatePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   if (authenticated) {
//     return <Redirect to="/" />;
//   }

//   return (
//     <form onSubmit={onLogin}>
//       <div>
//         {errors.map((error) => (
//           <div>{error}</div>
//         ))}
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           name="email"
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={updateEmail}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={updatePassword}
//         />
//         <button type="submit">Login</button>
//       </div>
//     </form>
//   );
// };

// export default LoginForm;
