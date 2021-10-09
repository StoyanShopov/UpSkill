import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import CoachesCard from '../../Coaches/CoachesCatalog/Coaches-Card/Coaches-Card';
import RemovePopup from '../../Shared/RemovePopup/RemovePopup';

import './CompanyCoaches.css';

import { getCoaches } from "../../../services/coachService";
import { disableBodyScroll } from '../../../utils/utils';


export default function CoachList() {
  const [coaches, setCoaches] = useState([]);
  const [onRemove, setOnRemove] = useState(false);
  const initialPageCoaches = 0;

  useEffect(() => {
    getCoaches(initialPageCoaches)
      .then(coaches => {
        setCoaches(coaches);
      });
  }, []);

  function setOnRemoveInternal() {
    setOnRemove(true);
    let buttonElements = document.getElementsByClassName('companyOwner-cardBtn');
    let imageElements = document.getElementsByClassName('coaches-image');
    imageElements[0].style.position = "inherit";
    imageElements[1].style.position = "inherit";
    imageElements[2].style.position = "inherit";
    buttonElements[0].style.position = "inherit";    
    disableBodyScroll();
  }

  return (
    <div className="content main-content">
      <RemovePopup trigger={onRemove} onRemove={setOnRemove} atPage="coaches"/>
      <div className={'buttonContainer'}>
        {' '}
        <input type="button" className="btn btn-outline-primary px-4 m-4" value="Add" />
      </div>
      <div className="coachesContainer">
        {coaches.map((coach) => (
          <CoachesCard
            key={coach.id}
            coachDetails={coach}
            displaySession={false}
            displayPrice={true}
          >
            <Button className="cardButton companyOwner-cardBtn" onClick={e => setOnRemoveInternal()}>Remove</Button>
          </CoachesCard>
        ))}
      </div>
    </div>
  );
}
