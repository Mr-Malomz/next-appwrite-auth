'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createAccount } from '../../../utils/appwriteClient';
import Link from 'next/link';

export default function SignUp() {
	const router = useRouter();
	const [value, setValue] = useState({ name: '', email: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		const { email, name, password } = value;
		createAccount(email, password, name)
			.then((res) => {
				setIsLoading(false);
				alert('Account created successfully! you can now login');
				router.push('/signin');
			})
			.catch((e) => {
				setIsLoading(false);
				alert('Error creating user');
			});
	};

	return (
		<div className='w-screen h-screen bg-white'>
			<main className='py-4 px-4 lg:py-10 lg:px-10 w-full'>
				<div className='flex justify-center mb-8'>
					<h1 className='text-2xl font-medium text-gray-700'>
						Authentication with Appwrite and Nextjs 13
					</h1>
				</div>
				<section className='flex justify-center'>
					<div className='px-4 py-2 border rounded-lg w-full lg:w-2/4'>
						<div className='border-b h-8 mb-4'>
							<h3 className='text-gray-700'>
								Sign up with your details
							</h3>
						</div>
						<form onSubmit={handleSubmit}>
							<fieldset>
								<label className='text-sm text-gray-400 mb-4 block'>
									Name
								</label>
								<input
									name='name'
									className='border w-full rounded-sm mb-6 p-2'
									required
									value={value.name}
									onChange={handleChange}
									type='text'
								/>
							</fieldset>
							<fieldset>
								<label className='text-sm text-gray-400 mb-4 block'>
									Email
								</label>
								<input
									name='email'
									className='border w-full rounded-sm mb-6 p-2'
									required
									value={value.email}
									onChange={handleChange}
									type='email'
								/>
							</fieldset>
							<fieldset>
								<label className='text-sm text-gray-400 mb-4 block'>
									Password
								</label>
								<input
									name='password'
									className='border w-full rounded-sm mb-6 p-2'
									required
									value={value.password}
									onChange={handleChange}
									type='password'
								/>
							</fieldset>
							<button
								className='text-sm text-white px-8 py-2 rounded-sm bg-blue-600 hover:bg-blue-700'
								disabled={isLoading}
							>
								Sign up
							</button>
							<div className='flex mt-6'>
								<p>Already have an account?</p>{' '}
								<Link
									href='/signin'
									className='ml-2 text-blue-600 font-medium'
								>
									Sign in
								</Link>
							</div>
						</form>
					</div>
				</section>
			</main>
		</div>
	);
}
