import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { firestore } from '../lib/firebase';
import Comment from './Comment';

function PostDetail({ match }) {
  const [post, setPost] = useState(null);
  async function getPostId() {
    const postRefId = await firestore
      .collection('posts')
      .doc(match.params.postId)
      .get();

    const userRef = await firestore
      .collection('users')
      .doc(postRefId.data().userId)
      .get();

    return {
      id: postRefId.id,
      title: postRefId.data().title,
      description: postRefId.data().description,
      user: {
        userId: userRef.id,
        displayName: userRef.data().displayName,
        photoURL: userRef.data().photoURL,
      },
    };
  }
  useEffect(() => {
    getPostId().then(data => {
      setPost(data);
    });
  }, []);
  if (!post) return <div>Loading ...</div>;
  return (
    <div className="container mt-5">
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
              <span>
                <span className="mr-2">creatBy</span>
                <span>{post.user.displayName}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <Comment />
    </div>
  );
}

PostDetail.propTypes = {
  match: PropTypes.object, // eslint-disable-line
};
export default withRouter(PostDetail);
