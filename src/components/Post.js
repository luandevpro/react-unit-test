import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { firestore } from '../lib/firebase';
import * as actions from '../actions';

export default function Post() {
  const posts = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const arr = [];
    const unsubscribe = firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(async change => {
          if (change.type === 'added') {
            const data = {
              id: change.doc.id,
              title: change.doc.data().title,
              createdAt: change.doc.data().createdAt,
              description: change.doc.data().description,
              user: await firestore
                .collection('users')
                .doc(change.doc.data().userId)
                .get()
                .then(re => {
                  return re.data();
                }),
            };
            arr.push(data);
            if (arr.length >= 10) {
              dispatch(actions.getPost(arr));
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
  if (!posts) return <div>loading ..</div>;
  posts.sort((a, b) => {
    return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate());
  });
  return (
    <div className="container mt-5">
      <div className="row">
        {posts.map(post => (
          <div className="col-sm-12 mb-5" key={post.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
                <div className="card-title">
                  <img
                    src={post.user.photoURL}
                    alt=""
                    width="25px"
                    height="25px"
                    className="rounded-circle mr-3"
                  />
                  <span>{post.user.displayName}</span>
                </div>
                <Link to={`/posts/${post.id}`} className="btn btn-primary">
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
