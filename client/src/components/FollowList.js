import React, { useEffect, useState, useRef } from 'react';
import  GlobalState from '../context/GlobalState';
import { fetchFollowsData } from '../Services/blockchainService'; // Import fetchFollowsData

const FollowList = ({ type }) => {
  const { state } = React.useContext(GlobalState);
  const currentUser = state.user;
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    const fetchFollows = async () => {
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