import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../lib/firebase';
import NewComment from './NewComment';
import * as actions from '../actions';
import ListComment from './ListComment';

function Comment({ match }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const arr = [];
    const unsubscribe = firestore
      .collection('comments')
      .where('postId', '==', match.params.postId)
      .orderBy('createdAt', 'desc')
      .limit(10)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(async change => {
          if (change.type === 'added') {
            const data = {
              id: change.doc.id,
              comment: change.doc.data().comment,
              createdAt: change.doc.get('createdAt'),
              user: await firestore
                .collection('users')
                .doc(change.doc.data().userId)
                .get()
                .then(re => {
                  return re.data();
                }),
            };
            arr.push(data);
            if (
              (arr.length < 10 && arr.length >= querySnapshot.docChanges().length) ||
              arr.length >= 10
            ) {
              dispatch(actions.getComment(arr));
            }
          }
          if (change.type === 'modified') {
            console.log('Modified city: ', change.doc.data());
          }
          if (change.type === 'removed') {
            console.log('Removed city: ', change.doc.data());
          }
        });
      });
    return () => unsubscribe();
  }, []);

  return (
    <div className="container">
      <NewComment />
      <ListComment />
    </div>
  );
}

Comment.propTypes = {
   match: PropTypes.object, // eslint-disable-line
};
export default withRouter(Comment);
