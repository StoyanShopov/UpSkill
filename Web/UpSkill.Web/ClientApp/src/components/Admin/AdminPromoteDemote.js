import axios from "axios";
import React, { useState, setState, useEffect } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './adminPromoteDemote.css';

export default function PromoteDemote() {

    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");
    const [roles, setRoles] = useState([]);
    const [flag, setFlag] = useState(false);

    const getUser = async (e) => {
        const { data } = await axios.get(`https://localhost:44319/Admin/Admin?email=${email}`);
        const user = data;

        setUser(user);
        setRoles(user.role);
        setFlag(true);
    }

    const promoteUser = async (e) => {
        await axios.put(`https://localhost:44319/Admin/Admin/promote?email=${user.email}`)
            .then(() => {
                getUser()
            });
    }

    const demoteUser = async (e) => {
        await axios.put(`https://localhost:44319/Admin/Admin/demote?email=${user.email}`)
            .then(() => {
                getUser()
            });
    }
    const handleInput = (event) => {
        const email = event.target.value;
        setEmail(email);
    }

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
                <button class='btn btn-primary btn-space' onClick={getUser}>Search</button>
            </div>
            <br />
            {flag ?
                <table class="table table-bordered table-default table-hover">
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
                            <td class='rows'>{user.email}</td>
                            <td class='rows'>{user.fullName}</td>
                            <td class='rows'>{roles.map((r) => <p key={user.email}>{r}</p>)}</td>
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