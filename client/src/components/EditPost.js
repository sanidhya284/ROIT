import React, { useState } from 'react';

const EditPost = ({ content, onEditPost }) => {
  const [newContent, setNewContent] = useState(content);

  const handleEdit = () => {
    onEditPost(newContent); // Pass the updated content to a callback function
  };

  return (
    <div>
      <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />
      <button onClick={handleEdit}>Save Changes</button>
    </div>
  );
};

export default EditPost;