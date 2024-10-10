import React, { useState } from 'react';

const LikeButton = () => {
    // State to keep track of like status and like count
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(100); // Example starting count

    const handleLikeClick = () => {
        if (liked) {
            setLikeCount(likeCount - 1); // Decrement like count if liked
        } else {
            setLikeCount(likeCount + 1); // Increment like count if not liked
        }
        setLiked(!liked); // Toggle liked state
    };

    return (
        <div style={styles.container}>
            <button style={liked ? styles.likedButton : styles.button} onClick={handleLikeClick}>
                {liked ? 'Liked' : 'Like'}
            </button>
            <p>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</p>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: 'Arial, sans-serif',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    likedButton: {
        padding: '10px 20px',
        backgroundColor: '#28a745', // Green when liked
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default LikeButton;
