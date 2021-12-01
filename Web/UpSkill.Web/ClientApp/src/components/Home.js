import React, { useContext, useState } from 'react';
import { NavLink } from "react-router-dom";

import Lobby from './Chat/Lobby';
import Chat from './Chat/Chat';

import chatContext from "../Context/ChatContext";
import zoomContext from "../Context/ZoomContext";
import { useTranslation } from "react-i18next";

export default function Home() {
	const { t } = useTranslation();
	const current_time = new Date("2021-12-1");

	const [joinRoom, sendMessage, closeConnection, messages, setMessages, connection] = useContext(chatContext);
	const [joinCourses, sendJoinMessage, startRoom, sendInviteMessage, receiveMessage] = useContext(zoomContext);

	return (
		<>
			{!connection
				? <Lobby joinRoom={joinRoom} />
				: <Chat messages={messages} sendMessage={sendMessage} />
			}


			<NavLink to="/Courses" className="btn btn-outline-info mt-5 font-weight-bold" exact={true}>
				<b>{t('to_courses_btn')}</b>
			</NavLink>

			<div className="w-50 mt-5">
				<h4>{t('part_of_coach_view')}</h4>
				<form onSubmit={e => startRoom(e)}>
					<input type="text" placeholder="course Id... exmp: 8" />
					<button type="submit" className="btn btn-outline-danger m-3 font-weight-bold">
						<p>{t('start_room_btn')}</p>
					</button>
				</form>
				<p className="fw-bold">{t('first_instruction')}</p>
				<p className="fw-bold">{t('second_instruction')}</p>
				<p className="fw-bold">{t('third_instruction')}</p>
			</div>

			<div className="mt-3">
				{t('lorem_ipsum')}
			</div>

			<div className="mt-5">1914 translation by H. Rackham
				"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure tha  "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure tha
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

				Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
				"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
			</div>
		</>
	);
}
