document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var price = document.getElementById('price').value;

    var product = {
        name: name,
        price: price
    };

    saveProduct(product);
    clearForm();
});


