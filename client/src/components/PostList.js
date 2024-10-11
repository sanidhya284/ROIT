import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';
import PostActions from './components/PostActions';
import EditPost from './components/EditPost'; // Assuming EditPost.js is in components

const PostList = () => {
  const { state, dispatch } = React.useContext(GlobalContext);
  const [editingPost, setEditingPost] = useState(null); // Track currently editing post

  useEffect(() => {
    const loadPosts = async () => {
      if (!state.posts.length) { // Check if posts are already loaded
        dispatch({ type: 'POSTS_FETCH_START' }); // Start loading indicator
        try {
          const posts = await fetchPosts();
          dispatch({ type: 'POSTS_FETCH_SUCCESS', payload: posts }); // Update posts
        } catch (error) {
          dispatch({ type: 'POSTS_FETCH_ERROR', payload: error.message });
        }
      }
    };
    loadPosts();
  }, []);

  const handleEditPost = async (postId, newContent) => {
    // Update post data on blockchain or your data storage
    // Update local state after successful update
    dispatch({ type: 'POST_UPDATED', payload: { id: postId, content: newContent } });
    setEditingPost(null); // Stop editing after successful update
  };

  return (
    <div>
      {state.isLoading && <p>Loading posts...</p>}
      {state.error && <p>Error: {state.error}</p>}
      {state.posts.map((post, index) => (
        <div key={index}>
          <p>{post.content}</p>
          <small>By: {post.author}</small>
          {editingPost === post.id ? (
            <EditPost content={post.content} onEditPost={(newContent) => handleEditPost(post.id, newContent)} />
          ) : (
            <PostActions postId={post.id} />
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;