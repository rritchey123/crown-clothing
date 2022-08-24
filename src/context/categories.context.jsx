import { createContext ,useState,useEffect} from "react";

import { addCollectionAndDocuments,getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

import SHOP_DATA from '../shop-data'

export const CategoriesContext = createContext({
    products:[]
})

export const CategoriesProvider = ({children})=>{
    const [categoriesMap,setCategoriesMap] = useState({})


    // * Initially populating categories collection
    // useEffect(()=>{
    //     addCollectionAndDocuments('categories',SHOP_DATA)
    // })

    useEffect(()=>{
        const getCategoriesMap = async ()=>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap)
        }
        getCategoriesMap()
        
    },[])
    const value = {categoriesMap}
    return(
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    )
}