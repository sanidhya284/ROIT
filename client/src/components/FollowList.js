import React, { useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalContext';

const FollowList = ({ type }) => { // Pass "following" or "followers" as a prop
  const { state } = React.useContext(GlobalContext);
  const currentUser = state.user;
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    const fetchFollows = async () => {
      // Fetch following or follower data from blockchain (adjust based on your implementation)
      const fetchedFollows = await fetchFollowsData(currentUser.address, type);
      setFollows(fetchedFollows);
    };
    fetchFollows();
  }, [currentUser, type]);

  return (
    <div>
      <h2>{type === 'following' ? 'Following' : 'Followers'}</h2>
      {follows.map((follow, index) => (
        <div key={index}>
          <p>{follow.username}</p>
        </div>
      ))}
    </div>
  );
};

export default FollowList;