// NavBarExample.js

import React from 'react';

export function NavBar({entityName}){
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<a className="btn btn-ghost text-xl">TownVoice</a>
			</div>
			<div className="navbar-center">
			</div>
			<div className="navbar-end">
				<a className="btn btn-ghost text-xl">{entityName}</a>
			</div>
		</div>
	);
};


