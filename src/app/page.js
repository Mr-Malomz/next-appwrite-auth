'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAccount, logout } from '../../utils/appwriteClient';

export default function Home() {
	const [session, setSession] = useState(null);
	const router = useRouter();

	const getSession = () => {
		getAccount()
			.then((res) => setSession(res))
			.catch((err) => {
				router.push('/signin');
				console.log(err);
			});
	};

	useEffect(() => {
		getSession();
	}, []);

	const signOut = () => {
		logout();
		alert('logout successful');
		router.push('/signin');
	};

	return (
		<div className='w-screen h-screen bg-white'>
			<main className='py-4 px-4 lg:py-10 lg:px-10 w-full'>
				<div className='flex justify-center mb-8'>
					<h1 className='text-2xl font-medium text-gray-700'>
						Welcome
					</h1>
				</div>
				<section className='flex justify-center'>
					<div className='px-4 py-2 border rounded-lg w-full lg:w-2/4'>
						<h3 className='text-gray-700'>
							Name: {session && session.name}
						</h3>
						<h3 className='text-gray-700 mt-4'>
							Name: {session && session.email}
						</h3>
						<button
							className='text-sm text-white px-8 py-2 rounded-sm bg-black hover:bg-gray-800 mt-6'
							onClick={signOut}
						>
							Log out
						</button>
					</div>
				</section>
			</main>
		</div>
	);
}
