import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from "../../services/auth";
import Modal from "react-modal";
import {loadUser} from '../../store/actions/signupActions'
import { useDispatch} from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';

Modal.setAppElement('#root');

const Login = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()

  let history = useHistory();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(loadUser(user.id))
      setIsOpen(false);
      history.push("/");
    } else {
      setErrors(user.errors);
    }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    const user = await login('demo@user.com', 'password');
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(loadUser(user.id));
      setIsOpen(false);
      history.push("/")
    } else {
      setErrors(user.errors);
    }
  };

  return (
    <>
      <button className="button--login" onClick={() => setIsOpen(true)}>Sign in</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Login Modal"
        className="modal modal--login"
        overlayClassName="modal__overlay"
        shouldCloseOnOverlayClick={true}
        closeTimeoutMS={500}
      >
        <div className="modal__header">
          <h2>Login</h2>
          <div className="modal__close-btn" onClick={() => setIsOpen(false)}>
            <CloseIcon style={{fontSize: 30}} />
          </div>
        </div>

        <div className="modal__error-container">
            {errors.map((error) => (
              <div className="modal__error" key={error.id}>{error}</div>
            ))}
        </div>

        <form className="modal__form" onSubmit={onLogin}>
          <div className="modal__content">
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              required={true}
              onChange={updateEmail}
            />
          </div>
          <div className="modal__content">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              required={true}
              onChange={updatePassword}
            />
          </div>
          <div className="modal__btn-container">
            <button className="modal__btn" type="submit">Login</button>
            <button className="modal__btn" onClick={onDemo} >Demo User</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default Login
