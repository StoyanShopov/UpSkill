import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CoachesCard from './Coaches-Card/Coaches-Card';

import './CoachesCatalog.css';

import { getCoaches } from '../../../services/coachService';

export default function CoachesCatalog() {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    getCoaches(0).then((coaches) => {
      setCoaches(coaches);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="row list-unstyled coaches-list">
          {coaches.map((coach) => (
            <div className="col-sm-4 text-align-center" key={coach.id}>
              <CoachesCard
                key={coach.id}
                coachDetails={coach}
                displaySession={false}
                displayPrice={true}
              >
                <Button className="coaches-cardButton"> Add </Button>
                {/* <Button className="coaches-cardButton"> Remove </Button>*/}
              </CoachesCard>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
