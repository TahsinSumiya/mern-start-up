import React, { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from 'axios'
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const auth = getAuth(app);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user.email
            const loggedUser = {email:userEmail}
            setUser(currentUser);
            setLoading(false);  

            if(currentUser){
                
                    axios.post('http://localhost:4000/jwt',loggedUser,{withCredential:true})
                    .then(res=>{
                        console.log('token response',res.data)
                    })
            }
            else{
                axios.post('http://localhost:4000/logout',loggedUser,{withCredential:true})
                .then(res=>{
                    console.log('loggediout',res.data)
                })
            }
        });

        return () => {
            unsubscribe();
        };
    }, [auth]);

    const authInfo = {
        user,
        createUser,
        signInUser,
        loading,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
