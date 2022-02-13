import {ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {ref as databaseRef, push, set, get} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";

document.forms["productForm"].addEventListener("submit",onAddProduct);
document.querySelector("#productImage").addEventListener("change",onImageSelected);

function onAddProduct(evt) {
    evt.preventDefault();
    uploadNewProduct();
}


function onImageSelected(evt) {
    let file = evt.target.files[0];
    console.log(file);
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

async function uploadNewProduct() {
    const name = document.querySelector('#productName').value.trim();
    const price = document.querySelector('#price').value.trim();
    const rating = document.querySelector('#rating').value.trim();
    const review = document.querySelector('#review').value.trim();
    const file = document.querySelector('#productImage').files[0];

    const imageRef = storageRef(storage,`productsImage/${file.name}`);
    const dataRef =  databaseRef( db, 'products');

    const uploadResult = await uploadBytes(imageRef, file);
    const urlPath =  await getDownloadURL(imageRef);
    const storagePath = uploadResult.metadata.fullPath;

    //push return a ref to area with the key but no data written yet.
    const itemRef = await push(dataRef);

    set(itemRef,{
        key:itemRef.key,
        sku: `darksoul${itemRef.key}`,
        urlPath,
        storagePath,
        name,
        price,
        rating,
        review
     })

}