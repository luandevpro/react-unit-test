import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ListComment() {
  const comments = useSelector(state => state.comments);
  if (!comments) return <div>loading ..</div>;
  comments.sort((a, b) => {
    return new Date(b.createdAt.toDate()) - new Date(a.createdAt.toDate());
  });
  return (
    <div className="container mt-5">
      <div>
        <div className="row">
          {comments.map(comment => (
            <div className="col-sm-12 mb-5" key={comment.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{comment.comment}</h5>
                  <div className="card-title">
                    <img
                      src={comment.user.photoURL}
                      alt=""
                      width="25px"
                      height="25px"
                      className="rounded-circle mr-3"
                    />
                    <span>{comment.user.displayName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
