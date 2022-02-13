import {ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {ref as databaseRef, push, set, get} from 'firebase/database';
import {db, storage} from "./libs/firebase/firebaseConfig";

const productForm = document.forms['productForm'];

document.querySelector("#productImage").addEventListener("change",onImageSelected);

async function pageInit() {
    const key = sessionStorage.getItem('key');
    const productRef = databaseRef(db,`products/${key}`);
    const productSnapShot = await get(productRef);
    
    if(productSnapShot.exists()) {
        setFieldValues(productSnapShot.val());
    }

    productForm.addEventListener('submit', onUpdateProduct);
    //read data in
    //update the form values

    //submit event
    //pulldata from the value
    //create object
    //sent the object to firestore
}

function onUpdateProduct(evt) {
    evt.preventDefault();
    updateProductData();
}

function setFieldValues({urlPath, name, price, rating, review}) {
    
    productForm.elements['productName'].value = name;
    productForm.elements['price'].value = price;
    productForm.elements['rating'].value = rating;
    productForm.elements['review'].value = review;
    document.querySelector('#uploadImage img').src = urlPath;
    document.querySelector('#uploadImage img').alt = `${name} image`;
}

async function updateProductData() {


    
    const name = productForm.elements['productName'].value.trim();
    const price = productForm.elements['price'].value.trim();
    const rating = productForm.elements['rating'].value.trim();
    const review = productForm.elements['review'].value.trim();
    const file = productForm.elements['productImage'].files;

    const key = sessionStorage.getItem('key');
    const itemRef =  databaseRef( db, `products/${key}`);
    const productRef = databaseRef(db,`products/${key}`);
    const productSnapShot = await get(productRef);
    
    if(file.length !== 0) {
        //format the storage for the new image
        //images/key/file.name storage path
        const imageRef = storageRef(storage, `productsImage/${key}/${file[0].name}`);

        const uploadResult = await uploadBytes(imageRef, file[0]);
        const urlPath =  await getDownloadURL(imageRef);
        const storagePath = uploadResult.metadata.fullPath;

        set(itemRef,{
            key:itemRef.key,
            sku: `darksoul${itemRef.key}`,
            urlPath,
            storagePath,
            name,
            price,
            rating,
            review
         });
    } else {
        const urlPath = productSnapShot.val().urlPath;
        const storagePath = productSnapShot.val().storagePath;
        set(itemRef,{
            key:itemRef.key,
            sku: `darksoul${itemRef.key}`,
            urlPath,
            storagePath,
            name,
            price,
            rating,
            review
         });
    }

}

function onImageSelected(evt) {
    let file = evt.target.files[0];
    console.log(file);
    document.querySelector(".display img").src = URL.createObjectURL(file);
}

pageInit();