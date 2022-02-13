import {getDatabase, ref as databaseRef, push, set, get} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";
import {doc, deleteDoc } from "firebase/firestore";


async function pageInit() {
    const key = sessionStorage.getItem('key');
    const itemRef =  databaseRef( db, `products/${key}`);
    const productRef = databaseRef(db,`products/${key}`);
    const productSnapShot = await get(productRef);

    set(itemRef,{
        
     });
    

    window.location.href = "index.html";

}

pageInit();