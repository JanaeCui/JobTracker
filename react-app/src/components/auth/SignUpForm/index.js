import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory} from 'react-router-dom';
import { signUp } from '../../../store/session';
import logo from '../../../images/logo.png'
import { UilEnvelopeAlt } from '@iconscout/react-unicons'
import { UilLock } from '@iconscout/react-unicons'
import styles from "./SignUpForm.module.css";
import { UilUserCircle } from '@iconscout/react-unicons'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const history = useHistory();
  const routeChange = () =>{
    let path = `/login`;
    history.push(path);
  }

  const logoRouteChange = () =>{
    let path = `/`;
    history.push(path);
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
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

        <form className={styles.form} onSubmit={onSignUp}>
          <div>
            <div className={styles.errorsDiv}>
              <div>
                {errors.map((error, ind) => (
                  <div className={styles.errorSmallDiv}>
                    <div className={styles.errors} key={ind}>{error}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.signUpDiv}>
              <div className={styles.title}>Create your free account</div>
            </div>
            <div className={styles.signUpDiv}>
              <div className={styles.title2}>Organize your job search!</div>
            </div>

            <div className={styles.userName}>
              <div className={styles.label}>
                <label>User Name</label>
              </div>
              <div className={styles.iconParentDiv}>
                <UilUserCircle  className={styles.userNameIcon}/>
                <input className={styles.input}
                  placeholder='Enter username'
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                />
              </div>
            </div>
            <div className={styles.email}>
              <div className={styles.label}>
                <label>Email</label>
              </div>
              <div className={styles.iconParentDiv}>
                <UilEnvelopeAlt  className={styles.emailIcon}/>
                <input className={styles.input}
                  placeholder='Enter email address'
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                />
              </div>
            </div>
            <div className={styles.password}>
              <div className={styles.label}>
                <label>Password</label>
              </div>
              <div className={styles.iconParentDiv}>
                <UilLock  className={styles.passwordIcon}/>
                <input
                  placeholder='Enter password'
                  className={styles.input}
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                />
              </div>
            </div>
            <div className={styles.password}>
              <div className={styles.label}>
                <label>Repeat Password</label>
              </div>
              <div className={styles.iconParentDiv}>
                <UilLock  className={styles.passwordIcon}/>
                <input
                  className={styles.input}
                  placeholder='Confirm password'
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                  required={true}
                />
              </div>
            </div>
            <div className={styles.buttonDiv}>
              <button className={styles.button} type='submit'>Sign Up</button>
            </div>
            <div className={styles.askAccountDiv}>
              <div className={styles.askAccount}>Already have an account?<span className={styles.logIn} onClick={routeChange}>Log In</span></div>
            </div>
            <div className={styles.askAccountDiv}>
              <div className={styles.askAccount2}>By continuing, you agree to Job Tracker's</div>
            </div>
            <div className={styles.askAccountDiv}>
              <div className={styles.askAccount3}>Terms of Service and Privacy Policy</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
