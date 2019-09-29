import React, { useEffect, useState } from 'react';
import pick from 'lodash/pick';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import { auth, firestore } from './lib/firebase';
import NewPost from './components/NewPost';
import Post from './components/Post';
import PostDetail from './components/PostDetail';
import * as actions from './actions';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await firestore.collection('users').doc(user.uid);
        const getUser = await userRef.get();
        if (!getUser.data()) {
          userRef
            .set(pick(user, ['email', 'displayName', 'photoURL']))
            .then(() => {
              console.log('add user success');
            })
            .catch(err => {
              console.log('cannot add user', err);
            });
        }
        dispatch(actions.getUser(pick(user, ['email', 'displayName', 'uid', 'photoURL'])));
        setCurrentUser(pick(user, ['email', 'displayName', 'uid', 'photoURL']));
      } else {
        console.log('no user');
      }
    });
  }, []);
  return (
    <Router>
      <div>
        <Navbar currentUser={currentUser} />
        <Route component={Post} path="/" exact />
        <Route
          render={() => {
            return <NewPost currentUser={currentUser} />;
          }}
          path="/post/new"
        />
        <Route component={PostDetail} path="/posts/:postId" />
      </div>
    </Router>
  );
}

export default App;
