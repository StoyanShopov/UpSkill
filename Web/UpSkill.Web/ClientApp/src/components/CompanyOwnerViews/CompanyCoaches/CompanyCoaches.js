import { useState, useEffect } from 'react';
import CoachCard from '../../Shared/CoachCard/CoachCard';
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
        <Button variant="primary">Primary</Button>
      </div>
      <div className="coachesContainer">
        {coaches.map((coach) => (
          <CoachCard
            key={coach.id}
            coachDetails={coach}
            displaySession={false}
            displayPrice={true}
          >
            <Button className="cardButton"> Cancel</Button>
          </CoachCard>
        ))}
      </div>
    </>
  );
}
