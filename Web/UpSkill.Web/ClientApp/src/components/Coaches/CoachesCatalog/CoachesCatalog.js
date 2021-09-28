import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CoachCard from '../../Shared/CoachCard/CoachCard';

import './CoachesCatalog.css';

import { getCoaches } from "../../../services/coachService";

export default function CoachesCatalog() {
    const [coaches, setCoaches] = useState([]);

    useEffect(() => {
        getCoaches(0)
            .then(coaches => {
                setCoaches(coaches);
            });
    }, []);

    return (
        <>
            <div className="container">
                <div className="row list-unstyled coaches-list">
                    {coaches.map((coach) => (
                        <div className="col-sm-4">     
                        <CoachCard
                            key={coach.id}
                            coachDetails={coach}
                            displaySession={false}
                            displayPrice={true}
                        >
                            <Button className="cardButton"> Cancel</Button>
                        </CoachCard>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
