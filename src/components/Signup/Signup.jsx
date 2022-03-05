import { fb } from '../../service/firebase';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormField } from 'components/formField/FormField';
import { defaultValues, validationSchema } from './formikConfig';

export const Signup = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');

  const signup = ({ email, userName, password }, { setSubmitting }) => {
    fb.auth
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        // console.log(res)
        if (res?.user?.uid) {
          fetch('/api/createUser', {
            method: 'POST'},
            {body: JSON.stringify({
              userName,
              userId: res.user.uid,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(() => {
            fb.firestore
              .collection('chatUsers')
              .doc(res.user.uid)
              .set({ userName, avatar: '' });
          });
        } else {
          setServerError(
            'We are having issues with your signup. Please try again',
          );
        }
      })
      .catch(err => {
        if (err.code === 'auth/email-already-in-use') {
          setServerError('An account with this email is already in use');
        } else {
          setServerError('We are having issues signing you up. Try again');
        }
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="auth-form">
      <h1>Signup</h1>
      <Formik
        onSubmit={signup}
        validateOnMount={true}
        initialValues={defaultValues}
        validationSchema={validationSchema}
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <FormField name="userName" label="User Name" />
            <FormField name="email" label="Email" type="email" />
            <FormField name="password" label="Password" type="password" />
            <FormField
              type="password"
              name="verifyPassword"
              label="Verify Password"
            />

            <div className="auth-link-container">
              Already have an account?{' '}
              <span
                className="auth-link"
                onClick={() => navigate.push('login')}
              >
                Log In!
              </span>
            </div>

            <button disabled={isSubmitting || !isValid} type="submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>

      {!!serverError && <div className="error">{serverError}</div>}
    </div>
  );
};
