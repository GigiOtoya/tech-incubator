import { clear } from "@testing-library/user-event/dist/clear"
import React, {usestate, useEffect, useState } from "react"
import fire from './components/fire'

const Authenticate = () => {
    const [user, setUser] = useState('')
    const [email, setEmail] = usestate('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = usestate('')
    const [passwordError, setPasswordError] = usestate('')
    const [hasAccount, setHasAccount] = useState(false)

    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }

    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
    }
    const handleLogin = () => {
        clearErrors()
        fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
            switch (err.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setEmailError(err.message)
                    break
                case "auth/wrong-password":
                    setPasswordError(err.message)
                    break
            }
        })
    }

    const handleSignup = () => {
        clearErrors()
        fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((err) => {
            switch (err.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    setEmailError(err.message)
                    break
                case "auth/weak-password":
                    setPasswordError(err.message)
                    break
            }
        })
    }
    
    const handleLogout = () => {
        fire.auth().signOut()
    }

    const authListener = () => {
        fire.aauth().onAuthStateChanged(user => {
            if(user) {
                clearInputs()
                setUser(user)
            }
            else {
                setUser("")
            }
        })
    }

    useEffect(() => {
        authListener()
    }, [])


    // return (

    // )
    
    
}