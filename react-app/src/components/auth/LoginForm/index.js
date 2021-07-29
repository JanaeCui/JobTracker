import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../../store/session';
import styles from "./LoginForm.module.css";
import logo from "../../../images/logo.png"
import { UilEnvelopeAlt } from '@iconscout/react-unicons'
import { UilLock } from '@iconscout/react-unicons'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    const demoUser = await dispatch(login('demo@aa.io', 'password'))
    if(demoUser) {
      setErrors(demoUser);
    }
  }

  const history = useHistory();
  const routeChange = () =>{
    let path = `/sign-up`;
    history.push(path);
  }

  const logoRouteChange = () =>{
    let path = `/`;
    history.push(path);
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/jobs' />;
  }

  return (
    <div className={styles.outerDiv}>
      <div className={styles.nav}>
        <img onClick={logoRouteChange} className={styles.logo} src={logo}></img>
      </div>
      <div className={styles.formDiv}>

          <form className={styles.form} onSubmit={onLogin}>
              <div >
                <div className={styles.errorsDiv}>
                  <div>
                    {errors.map((error, ind) => (
                      <div className={styles.errorSmallDiv}>
                        <div className={styles.errors} key={ind}>{error}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.logInDiv}>
                  <div className={styles.title}>Log In</div>
                </div>
                <div className={styles.email}>
                  <div className={styles.label}>
                    <label htmlFor='email'>Email</label>
                  </div>
                  <div className={styles.iconParentDiv}>
                    <UilEnvelopeAlt  className={styles.emailIcon}/>
                    <input className={styles.input}
                      name='email'
                      type='text'
                      placeholder='Email'
                      value={email}
                      onChange={updateEmail}
                    />
                  </div>
                </div>
                <div className={styles.password}>
                  <div className={styles.label}>
                    <label htmlFor='password'>Password</label>
                  </div>
                  <div className={styles.iconParentDiv}>
                    <UilLock  className={styles.passwordIcon}/>
                    <input
                      className={styles.input}
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                </div>
                <div className={styles.buttonDiv}>
                  <button className={styles.button} type='submit'>Login</button>
                </div>
                <div className={styles.demoUserDiv}>
                  <div onClick={demoLogin} className={styles.demoUser}>Demo User</div>
                </div>
                <div className={styles.askAccountDiv}>
                  <div className={styles.askAccount}>Do not have an account?<span className={styles.signUp} onClick={routeChange}>Sign up</span></div>
                </div>
              </div>
          </form>
        </div>

    </div>
  );
};

export default LoginForm;
