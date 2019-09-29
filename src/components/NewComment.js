import React from 'react';
import { Form, Formik, Field } from 'formik';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import { firestore } from '../lib/firebase';

const NewComment = ({ match }) => {
  const currentUser = useSelector(state => state.currentUser);
  const handleSubmit = values => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const commentRef = firestore.collection('comments');
    commentRef
      .add({
        comment: values.comment,
        postId: match.params.postId,
        userId: currentUser.uid,
        createdAt: timestamp,
      })
      .then(result => {
        console.log(result.id);
      });
  };
  return (
    <div>
      <Formik
        initialValues={{
          comment: '',
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <div className="form-group">
              <Field
                name="comment"
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
    </div>
  );
};

export default withRouter(NewComment);
