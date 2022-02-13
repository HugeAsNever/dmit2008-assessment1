function productCard ({key, urlPath, name, price, rating, review}) {
    const template = `
        
        <div class="card col-4 m-2" style="width: 18rem;">
            <img src="${urlPath}" class="card-img-top" alt="picture of ${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">$ ${price}/kg</p>
                <p class="card-text">Rating: ${rating}/5.0 over ${review} reviews</p>
                <div class="d-flex justify-content-center">
                    <a href="#" class="my-3 btn btn-primary">Buy</a>
                </div>
                <button class="my-2" id="edit" data-key="${key}" style="background-color: green">Edit</button>
                <button class="my-2" id="delete" data-key="${key}" style="background-color: red" onclick="return confirm('Confirm to delete this character?')">Delete</button>
            </div>
        </div>

    `;
    const element = document.createRange().createContextualFragment(template).children[0];
    addProductControls(element);
    return element;
}



function addProductControls(product) {
    product.querySelector('#edit').addEventListener('click', onEditProduct);
    product.querySelector('#delete').addEventListener('click', onRemoveProduct);
}

function onEditProduct(evt) {
    const key = evt.target.dataset.key;
    sessionStorage.setItem('key', key);
    window.location.assign('update.html');
}

function onRemoveProduct(evt) {
    const key = evt.target.dataset.key;
    sessionStorage.setItem('key', key);
    window.location.assign('delete.html');
}

export {productCard};