import { useState } from "react"
import FormInput from "../form-input/form-input.component"
import { signInWithGooglePopup,createUserDocumentFromAuth,signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import './sign-in-form.style.scss'

import Button from '../button/button.component'


const defaultFormFields = {
    email:"",
    password:"",
}

const SignInForm =()=>{

    const [formFields,setFormFields] = useState(defaultFormFields)
    const {email,password} = formFields

    const resetFromFields = ()=>{
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async ()=>{
        const {user} = await signInWithGooglePopup();
        await  createUserDocumentFromAuth(user)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            const response = await signInAuthUserWithEmailAndPassword(email,password)
            console.log(response)
            resetFromFields()
        }catch(err){
            if(['auth/wrong-password','auth/user-not-found'].includes(err.code)) {
                alert("incorrect username or password")
            }
        }

    }

    const handleChange =(event)=>{
        const {name,value} = event.target
        setFormFields({...formFields,[name]:value})
    }
    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit={handleSubmit}>
            
                <FormInput label = "Email" type="email" required onChange = {handleChange}  name="email" value={email}/>
                
                <FormInput label="Password" type='password' required onChange = {handleChange}  name="password" value={password} />
                

                <div className = 'buttons-container'>
                <Button type='submit'>Sign In</Button>
                <Button type = 'button'buttonType='google'onClick={signInWithGoogle}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm