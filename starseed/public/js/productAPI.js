//FOR THE API MODAL
function showModal(product) {
    const modal = document.getElementById('myModal1');
    modal.style.display = "block";
    
    const productImage = modal.querySelector('.productImage');
    const productName = modal.querySelector('.productName');
    const productPrice = modal.querySelector('.productPrice');
    const productDescription = modal.querySelector('.prod-desc');

    productImage.src = product.image;
    productName.textContent = product.name;
    productPrice.textContent = 'Sold as: P' + product.price;

    const descriptionList = product.description.map(desc => `<h4>${desc}</h4>`).join('');
    productDescription.innerHTML = `<h3>୨⎯ Product Description ⎯୧</h3>` + descriptionList;
}

// Close modal on clicking 'x'
document.querySelector('.close1').addEventListener('click', function () {
    document.getElementById('myModal1').style.display = "none";
});

// Close modal on clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('myModal1');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Product click event to show modal
$(document).ready(function() {
    $('.item-product img').each(function(index) {
        $(this).click(function() {
            const productId = $(this).closest('.item-product').data('id');
            const product = window.products.find(p => p.id == productId);
            if (product) {
                showModal(product);
            }
        });
    });
});




// Rating display
document.getElementById('ratingSlider').addEventListener('input', function () {
    document.getElementById('ratingValue').value = this.value;
});

// Submit rating event
document.getElementById('submitRatingBtn').addEventListener('click', function () {
    const ratingValue = document.getElementById('ratingValue').value;
    document.getElementById('finalRating').innerText = ratingValue;
    document.getElementById('submittedMessage').style.display = 'block';
});

// Redo rating event
document.getElementById('redoRatingBtn').addEventListener('click', function () {
    document.getElementById('submittedMessage').style.display = 'none';
    document.getElementById('ratingSlider').value = 0;
    document.getElementById('ratingValue').value = 0;
});
