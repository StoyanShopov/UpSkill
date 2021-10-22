import axios from "axios";
import React, { useState, setState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PromoteDemote() {

    const [user, setUser] = useState({});
    const [email, setEmail] = useState("");

    const handleInput = (event) => {
        const email = event.target.value;
        setEmail(email);
    }

    const onClickbtn = async (e) => {
        const { data } = await axios.get(`https://localhost:44319/Admin/Admin?email=${email}`);
        const user = data;
        setUser(user);
        console.log(user);
    }

    return (
        <>
            <br />
            <input
                className='input-group-text'
                id='email'
                placeholder='Enter email address...'
                onChange={handleInput}
                value={email}
            />
            <br />
            <button className='btn btn-primary' onClick={onClickbtn}>Search</button>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{user.email}</th>
                        <td>{user.fullName}</td>
                        <td>
                            {/* {user.role.map(name => <h2>{name}</h2>)} */}
                        </td>
                        <td>
                            <div >
                                <button class='btn btn-primary' >Promote</button>
                                <button class='btn btn-danger' >Demote</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}