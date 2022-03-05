import { fb } from '../../service/firebase';
import { useState } from 'react';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FormField } from 'components/formField/FormField';
import { validationSchema, defaultValues } from './formikConfig';

export const Login = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const login = ({ email, password }, { setSubmitting }) => {
    fb.auth
    .signInWithEmailAndPassword(email, password)
    .then( res => {
        if(!res.user) {
            setServerError('We are having trouble logginf you in please try again')
        }
    })
    .catch( err => {
        console.log(err)
        if(err.code === 'auth/wrong-password') {
            setServerError('Invalid credentials');
        } else if (err.code === 'auth/user-not-found') {
            setServerError('No account for this email');
        } else {
            setServerError('Something went wrong')
        }
    })
    .finally(() => setSubmitting(false))
  };

  return (
    <div className="auth-form">
      <h1>Login</h1>
      <Formik
        onSubmit={login}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />

            <div className="auth-link-container">
              Don't have an account?{' '}
              <span
                className="auth-link"
                onClick={() => navigate.push('/signup')}
              >
                Sign Up!
              </span>
            </div>

            <button type="submit" disabled={!isValid || isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};