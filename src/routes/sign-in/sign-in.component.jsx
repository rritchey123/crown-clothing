
import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = ()=>{
    // useEffect(()=>{
    //     async function fetchData() {
    //         const response =  await getRedirectResult(auth)
    //         console.log(response)
    //         if(response){
    //             const userDocRef = await createUserDocumentFromAuth(response.user)
    //         }
    //         return response
    //       }
    //       fetchData();
    // },[])
    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        const userDocRef  =await  createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Goggle popup
            </button>
            <SignUpForm/>
        </div>
    )
}
export default SignIn