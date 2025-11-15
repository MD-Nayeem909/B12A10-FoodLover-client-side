import React, { useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	deleteUser,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from 'firebase/auth';
import { AuthContext } from './AuthContext.jsx';
import app from '../Firebase/firebase.config.js';
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const existingUser = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		return signInWithPopup(auth, googleProvider);
	};

	const logoutUser = () => {
		return signOut(auth);
	};

	const deleteAccount = () => {
		return deleteUser(auth.currentUser);
	};
	const updateUserData = async (updateData) => {
		if (!auth.currentUser) {
			throw new Error('User not logged in');
		}
		await updateProfile(auth.currentUser, updateData);
		await auth.currentUser.reload();
		return auth.currentUser;
	};

	useEffect(() => {
		// custom login user restore
		const savedUser = localStorage.getItem('authUser');
		if (savedUser) {
			setUser(JSON.parse(savedUser));
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!localStorage.getItem('authUser')) {
				setUser(currentUser);
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);
	const authData = {
		user,
		setUser,
		createUser,
		existingUser,
		logoutUser,
		loading,
		googleSignIn,
		updateUserData,
		deleteAccount,
	};
	return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
