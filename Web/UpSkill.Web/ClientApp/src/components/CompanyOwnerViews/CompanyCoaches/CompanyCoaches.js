import {useState} from 'react';
import CoachCard from '../../Shared/CoachCard/CoachCard';
import './CompanyCoaches.css';
import { Button } from 'react-bootstrap';


const initialCoaches=[
    {id:1,fullName:'Brent Foster',coachField:'Leadership ',company:'Google',price:50,imageUrl:'https://www.g20.org/wp-content/uploads/2021/01/people.jpg'},
    {id:2,fullName:'Philipa',coachField:'Leadership',company:'Amazon',price:50 ,imageUrl:'https://www.g20.org/wp-content/uploads/2021/01/people.jpg'},
    {id:3,fullName:'Test',coachField:'Leadership',company:'Google',price:50,imageUrl:'https://www.g20.org/wp-content/uploads/2021/01/people.jpg'},
    {id:4,fullName:'Brent Foster',coachField:'Leadership',company:'Google',price:50,imageUrl:'https://www.g20.org/wp-content/uploads/2021/01/people.jpg'},
]
export default function CoachList() {
    const [coaches,setCoaches]=useState(initialCoaches)
    return (
        <>
        <div className={'buttonContainer'}> <Button variant="primary">Primary</Button></div>
        <div className="coachesContainer">
            {
                coaches.map((coach)=>(
                    <CoachCard
                     key ={ coach.id} 
                     coachDetails={coach}
                     displaySession={false}
                     displayPrice={true}>
                    <Button className="cardButton"> Cancel</Button>
                    </CoachCard>
                ))
            }
        </div>
        </>
    )
}
