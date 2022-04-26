/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeAuthentication from "../firebase/firebase.init";
import Swal from "sweetalert2";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();



    ///////// GOOGLE SIGN IN POPUP //////////
    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider)
            .then(result => {
                const user = result.user;
                setUser(user);
                // SAVE USER TO DATABASE
                saveUser(user.email, user.displayName, 'PUT');
                console.log(result.user);
                // eslint-disable-next-line no-unused-expressions
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully logged in via Google',
                    showConfirmButton: false,
                    timer: 1500
                });

            }).catch(error => {
                console.log(error);
            })
            .finally(() => setIsLoading(false));
    }
    ////////// USER LOG OUT //////////
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully logged out',
                    showConfirmButton: false,
                    timer: 1500
                });
            }).finally(() => setIsLoading(false))
    }
    /////// OBSERVE WHEATHER AUTH STATE CHANGED OR NOT ///////

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, user => {
            if (user) {
                console.log('inside state changed', user);
                setUser(user);
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])



    // SAVE USER TO DATABASE
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://blooming-anchorage-02539.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        signInUsingGoogle,
        isLoading,
        user,
        logOut
    }
}

export default useFirebase;