import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import React from 'react'
import { Image, ListGroup } from 'react-bootstrap'
const SCREEN_HEIGHT = window.innerHeight;
const menuItems = [
    { name: 'General Information', link: '/General' },
    { name: 'Courses', link: '/Courses' },
    { name: 'Coaches', link: '/Coaches' },
    { name: 'Employees', link: '/Employees' },
    { name: 'Invoice', link: '/Invoice' },
    { name: 'Log Out', link: '/LogOut' }

]
export default function (props) {
    let history = useHistory();
    const selectedMenuName = history.location.pathname.substring(1, history.location.pathname.length);
   
    let selectedMenuStyle = { fontWeight: 550, marginTop: '20px',  display:'block' ,color:'black'}
    let nonSelectedMenuStyle = { fontWeight: 350, marginTop: '20px' ,display:'block',color:'black' }
    //display:'inline-block' 
    console.log(SCREEN_HEIGHT)
    return (
        <div style={{ top: '50px', width: '20%', height: SCREEN_HEIGHT, backgroundColor: '#296CFB1A', position: 'fixed', }}>
            <div style={{ marginTop: '10%', marginBottom: '2%' }}>
                <Image style={{ width: 50, height: 50, display: 'inline-flex' }} roundedCircle={true} src="https://us.123rf.com/450wm/pressmaster/pressmaster1601/pressmaster160100574/51254490-serious-businessman-with-laptop-working-in-office.jpg?ver=6" />
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                    <span style={{ display: 'block', }}>Christo Peev</span>
                    <span style={{ display: 'block' }}>Motoion Software</span>
                </div>

            </div>
            <hr />
            <div style={{textAlign:'center'}}>

                {
                    menuItems.map((menuItem) => (
                        <>
                            <Link to={menuItem.link} key={menuItem.name} style={{ textDecoration: 'none'  }}>
                                <span style={menuItem.name === selectedMenuName ? selectedMenuStyle : nonSelectedMenuStyle}>{menuItem.name}</span>

                            </Link>
                            <hr/>

                        </>


                    ))
                }
            </div>


        </div>
    )
}
