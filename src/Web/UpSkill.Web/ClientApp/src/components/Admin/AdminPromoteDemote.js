import axios from "axios";

import React, { useState, setState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './adminPromoteDemote.css';
import serviceActions from '../../services/adminPromoteDemoteService'

export default function PromoteDemote() {

    const [user, setUser] = useState({});
    const [data, setData] = useState({});
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [flag, setFlag] = useState(false);

    const getUser = async (e) => {
        const { data } = await serviceActions.getUserAsync(email);
        const user = data;

        setUser(user);
        setRoles(user.role);
        setFlag(true);
    }

    const promoteUser = async (e) => {
        await serviceActions.promoteAsync(email);
    }

    const demoteUser = async (e) => {
        await serviceActions.demoteAsync(email);

    }

    const handleInput = (event) => {
        event.preventDefault();
        const email = event.target.value;
        setEmail(email);
    }

    // useEffect((user) => {
    //     serviceActions.getUserAsync().then((data) => {
    //         setUser(data);
    //     });
    // }, [user]);

    return (
        <>
            <div class='dataContainer'>
                <input
                    className='input-group-text'
                    id='email'
                    placeholder='Enter email address...'
                    onChange={handleInput}
                    value={email}
                />
                <button className='btn btn-primary btn-space' onClick={getUser}>Search</button>
            </div>
            <br />
            {flag ?
                <table className="table table-bordered table-default table-hover">
                    <thead >
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">Full Name</th>
                            <th scope="col">Current Role</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody  >
                        <tr>
                            <td className='rows'>{user.email}</td>
                            <td className='rows'>{user.fullName}</td>
                            <td className='rows'>{user.role.map((r) => <p key={user.email}>{r}</p>)}</td>
                            <td>
                                <div >
                                    <button className='btn btn-primary' onClick={promoteUser}>Promote</button>
                                    <button className='btn btn-danger btn-space' onClick={demoteUser}>Demote</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                :
                <div>
                </div>
            }
        </>
    );
}
