import { useState, useEffect } from 'react';
import CoachesCard from '../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card';
import './CompanyCoaches.css';
import { Button } from 'react-bootstrap';

import { getCoaches } from "../../../services/coachService";

export default function CoachList() {
  const [coaches, setCoaches] = useState([]);
  const initialPageCoaches = 0;

  useEffect(() => {
    getCoaches(initialPageCoaches)
        .then(coaches => {
            setCoaches(coaches);
        });
}, []);

  return (
    <>
      <div className={'buttonContainer'}>
        {' '}
        <input type="button" className="btn btn-outline-primary px-4 m-4" value="Add"/>
      </div>
      <div className="coachesContainer">
        {coaches.map((coach) => (
          <CoachesCard
            key={coach.id}
            coachDetails={coach}
            displaySession={false}
            displayPrice={true}
          >
            <Button className="cardButton"> Cancel</Button>
          </CoachesCard>
        ))}
      </div>
    </>
  );
}
