import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '../constants/Colors';

const MatchCardDiv = styled.div`
  display: flex;
  width: 300px;
  height: 100px;
  margin: 20px 0px;
  background: ${Colors.GRAY};
  cursor: pointer;
  &:hover {
    box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.1);
  }
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
`;

const ProfileSummaryDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px;
`;

const BulletPoint = styled.li`
  font-size: 14px;
  padding: 2px;
`;

const MatchCard = ({ profile, matchId }) => (
  <div>
    {profile ? (
      <Link to={`/matches/${matchId}`} target="_blank" className="react-link">
        <MatchCardDiv>
          <ProfilePicture src={profile.profileImageUrl} />
          <ProfileSummaryDiv>
            <BulletPoint>{`Name: ${profile.displayName}`}</BulletPoint>
            <BulletPoint>{`Gender: ${profile.gender}`}</BulletPoint>
            <BulletPoint>{`Age: ${profile.age}`}</BulletPoint>
          </ProfileSummaryDiv>
        </MatchCardDiv>
      </Link>
    ) : (
      <MatchCardDiv />
    )}
  </div>
);

export default MatchCard;
