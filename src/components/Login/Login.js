import React from 'react';
import styles from './Login.module.css';

function LoginPage() {
  return (
    <div className={styles.loginwrap}>
      <div className={styles.loginContainer}>
        <h1 className={styles.title}>Admins Login</h1>
        <form className={styles.form}>
          <label htmlFor="username" className={styles.label}>Username</label>
          <input type="text" id="username" name="username" required className={styles.input} />
          
          <label htmlFor="password" className={styles.label}>Password</label>
          <input type="password" id="password" name="password" required className={styles.input} />
          
          <button type="submit" className={styles.button}>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
