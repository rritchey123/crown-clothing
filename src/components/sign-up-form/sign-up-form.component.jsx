import { useState } from "react"
import { useDispatch } from "react-redux"
import FormInput from "../form-input/form-input.component"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import './sign-up-form.style.scss'

import Button from '../button/button.component'
import { signUpStart, signUpSuccess } from "../../store/user/user.action"

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields
    const dispatch = useDispatch()


    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            alert("passwords do not match")
            return
        }
        try {
            dispatch(signUpStart(email, password, displayName))
            resetFormFields()
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert("Email already taken")
            } else {
                console.log("user create error")
                console.log(err)
            }

        }

    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value })
    }
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display name" type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />

                <FormInput label="Password" type='password' required onChange={handleChange} name="password" value={password} />

                <FormInput label="Confirm Password" type='password' required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm