import { Client, Account, ID } from 'appwrite';

//create client
const client = new Client();
client.setEndpoint('http://localhost/v1').setProject('PROJECTID GOES HERE');

//create account
const account = new Account(client);

export const createAccount = (email, password, name) =>
	account.create(ID.unique(), email, password, name);

export const createUserSession = (email, password) =>
	account.createEmailSession(email, password);

export const getAccount = () => account.get();

export const logout = () => account.deleteSession('current');
