import {initializeApp} from 'firebase/app';
import {getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
signInWithEmailAndPassword  } from 'firebase/auth'
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD8BhXt-TowUcChOtacJ7fwhAkhkQLAQo8",
    authDomain: "crwn-clothing-db-7b920.firebaseapp.com",
    projectId: "crwn-clothing-db-7b920",
    storageBucket: "crwn-clothing-db-7b920.appspot.com",
    messagingSenderId: "865925273255",
    appId: "1:865925273255:web:ccbedb138d8989a1f9ad82"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider()
  googleProvider.setCustomParameters({
    prompt:"select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=>signInWithPopup(auth,googleProvider);
  export const signInWithGoogleRedirect =()=>signInWithRedirect(auth,googleProvider)
  export const db=getFirestore();

  export const createUserDocumentFromAuth = async(userAuth,additionalInformation={})=>{
    if(!userAuth) return;
    const userDocRef = doc(db,'users',userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()){
        const {displayName,email} = userAuth
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        }catch(err){
            console.log('ERROR CREATING USER')
            console.log(err.message)
        }
    }
    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return
    return await createUserWithEmailAndPassword(auth,email,password)
  }
  export const signInAuthUserWithEmailAndPassword = async (email,password)=>{
    if(!email || !password) return
    return await signInWithEmailAndPassword(auth,email,password)
  }