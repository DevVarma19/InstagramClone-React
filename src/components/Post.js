import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import "./Post.css";

function Post({ postId, userName, avatarURL, imgURL, caption, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // Custom functions
  const fetchComments = () => {
    const comRef = collection(db, "posts", postId, "comments");
    const unsub = onSnapshot(comRef, (docsSnap) => {
      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          comment: doc.data(),
        };
      });
      setComments(data);
    });

    return () => {
      unsub();
    };
  };

  const postComment = (e) => {
    e.preventDefault();

    const comRef = collection(db, "posts", postId, "comments");
    addDoc(comRef, {
      timestamp: serverTimestamp(),
      text: comment,
      username: user.displayName,
    });

    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={userName} src={avatarURL} />
        <h3>{userName}</h3>
      </div>
      <img className="post__image" src={imgURL} alt="" />

      <h4 className="post__text">
        <strong> {userName}: </strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => {
          return (
            <p key={comment.id}>
              <strong>{comment.comment.username}</strong> {comment.comment.text}
            </p>
          );
        })}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
