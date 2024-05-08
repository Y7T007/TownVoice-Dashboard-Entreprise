import React from 'react';
import { NavBar } from '../examples/NavBar/NavBar';
import "./MainLayout.css";

export function MainLayout({ children,Entity }) {
	return (
		<div className="flex flex-col min-h-screen bg-base-100">
			<NavBar entityName={Entity} />
			<main className="flex-grow container mx-auto px-4 bg-base-200 rounded-3xl my-4">
				{children}
			</main>
			<footer className="bg-base-100 text-white py-4 px-4 text-center">
				<p>© 2024 TownVoice. All rights reserved.</p>
			</footer>
		</div>
	);
}