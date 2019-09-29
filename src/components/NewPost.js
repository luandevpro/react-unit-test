import React from 'react';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import { firestore } from '../lib/firebase';

function NewPost({ currentUser, history }) {
  if (!currentUser) return null;
  const handleSubmit = (values, { resetForm }) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const postRef = firestore.collection('posts');
    const userRef = firestore.collection('users').doc(currentUser.uid);
    Promise.all([
      postRef.add({
        userId: currentUser.uid,
        title: values.title,
        description: values.description,
        createdAt: timestamp,
      }),
      userRef.update({ lastPost: timestamp }),
    ]).then(data => {
      resetForm({
        title: '',
        description: '',
      });
      history.push(`/posts/${data[0].id}`);
    });
  };
  return (
    <Formik
      initialValues={{
        title: 'Add data to Cloud Firestore',
        description: 'Add data to Cloud Firestore',
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="col-md-6 mx-auto">
          <div className="form-group mt-5">
            <Field name="title" className="form-control" placeholder="Title" />
          </div>
          <div className="form-group">
            <Field
              name="description"
              component="textarea"
              className="form-control"
              placeholder="Description"
            />
          </div>
          <button type="submit" className="btn btn-success form-control">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default withRouter(NewPost);

NewPost.propTypes = {
   currentUser: PropTypes.object, // eslint-disable-line
   history: PropTypes.object, // eslint-disable-line
};
