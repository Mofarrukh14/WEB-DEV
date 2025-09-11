document.addEventListener('DOMContentLoaded', () => {
    const cartBadge = document.getElementById('cart-badge');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const plusButtons = document.querySelectorAll('.plus-btn');
    const minusButtons = document.querySelectorAll('.minus-btn');
    const cartPopup = document.getElementById('cart-popup');
    const cartPopupItems = document.getElementById('cart-popup-items');
    const cartPopupTotal = document.getElementById('cart-popup-total');

    let cartCount = 0;
    let cart = {}; // {itemId: {title, price, quantity, img}}

    // Initialize all quantities to 0 on page load
    const quantityValues = document.querySelectorAll('.organic-box-item .quantity-value');
    quantityValues.forEach(span => {
        span.textContent = '0';
        // Update price to base price
        const itemBox = span.closest('.organic-box-item');
        const basePrice = parseFloat(itemBox.querySelector('.item-price').getAttribute('data-base-price'));
        itemBox.querySelector('.item-price').textContent = `$${basePrice.toFixed(2)}/ Box`;
    });

    // Helper to get item info from DOM
    function getItemInfo(button) {
        const itemBox = button.closest('.organic-box-item');
        const itemId = button.getAttribute('data-item');
        const title = itemBox.querySelector('.item-title').textContent;
        const priceText = itemBox.querySelector('.item-price').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        const img = itemBox.querySelector('.organic-image img').getAttribute('src');
        const quantity = parseInt(itemBox.querySelector('.quantity-value').textContent);
        return {itemId, title, price, quantity, img};
    }

    function updateCartBadge() {
        cartBadge.textContent = cartCount;
    }

    function updateCartPopup() {
        cartPopupItems.innerHTML = '';
        let total = 0;
        Object.values(cart).forEach(item => {
            if (item.quantity > 0) {
                total += item.price * item.quantity;
                cartPopupItems.innerHTML += `
                  <div class="cart-popup-item">
                    <img src="${item.img}" class="cart-popup-item-img" alt="${item.title}" />
                    <div class="cart-popup-item-details">
                      <div class="cart-popup-item-title">${item.title} Box</div>
                      <div class="cart-popup-item-price">$${(item.price * item.quantity).toFixed(2)}/ Box</div>
                      <div class="cart-popup-item-quantity">
                        <button class="quantity-btn minus-btn" data-cart-item="${item.itemId}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn plus-btn" data-cart-item="${item.itemId}">+</button>
                        <button class="cart-popup-remove" data-cart-item="${item.itemId}">&times;</button>
                      </div>
                    </div>
                  </div>
                `;
            }
        });
        cartPopupTotal.textContent = `Total : $${total.toFixed(2)}`;
    }

    // Show cart popup
    function showCartPopup() {
        const cartPopup = document.getElementById('cart-popup');
        // Show popup
        cartPopup.classList.add('open');
        updateCartPopup();
    }

    // Add to Cart button logic
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemInfo = getItemInfo(button);
            const itemId = button.getAttribute('data-item');
            if (!cart[itemId]) {
                cart[itemId] = { ...itemInfo, quantity: 1 };
            } else {
                cart[itemId].quantity++;
            }
            cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
            updateCartBadge();
            updateCartPopup();
            showCartPopup(); // <-- Make sure this is called here!
        });
    });



    // Delegate plus/minus/remove in cart popup
    cartPopupItems.addEventListener('click', (e) => {
        const itemId = e.target.getAttribute('data-cart-item');
        if (!itemId) return;
        if (e.target.classList.contains('plus-btn')) {
            cart[itemId].quantity++;
        } else if (e.target.classList.contains('minus-btn')) {
            if (cart[itemId].quantity > 1) {
                cart[itemId].quantity--;
            } else {
                delete cart[itemId];
            }
        } else if (e.target.classList.contains('cart-popup-remove')) {
            delete cart[itemId];
        }
        cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
        updateCartBadge();
        updateCartPopup(); // This will update item price and total
        // Close popup if cart is empty
        if (cartCount === 0) {
            cartPopup.style.display = 'none';
        }
    });

    // Checkout button closes the cart popup
    const checkoutBtn = document.querySelector('.cart-popup-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            document.getElementById('cart-popup-items').style.display = 'none';
            document.getElementById('cart-popup-total').style.display = 'none';
            document.getElementById('thank-you-message').style.display = 'block';
            // Optionally clear cart here
            setTimeout(() => {
                document.getElementById('cart-popup').style.display = 'none';
                // Reset popup for next open
                document.getElementById('cart-popup-items').style.display = '';
                document.getElementById('cart-popup-total').style.display = '';
                document.getElementById('thank-you-message').style.display = 'none';
            }, 3000); // Hide after 3 seconds
        });
    }

    // Shop Now and Start Shopping scroll
    const shopNowBtn = document.getElementById('shop-now-btn');
    const startShoppingBtn = document.getElementById('start-shopping-btn');
    const organicBoxesSection = document.getElementById('organic-boxes-container');

    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            organicBoxesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (startShoppingBtn) {
        startShoppingBtn.addEventListener('click', () => {
            organicBoxesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    const cartContainer = document.querySelector('.cart-container'); // Make sure your cart icon has this class

    if (cartContainer) {
        cartContainer.addEventListener('click', () => {
            if (cartCount > 0) {
                cartPopup.style.display = 'flex';
                updateCartPopup();
            }
        });
    }

    document.querySelector('.cart-container').addEventListener('click', function() {
        showCartPopup();
    });

    document.querySelector('.organic-boxes-items').addEventListener('click', function(e) {
        // Plus button
        if (e.target.classList.contains('plus-btn')) {
            const itemBox = e.target.closest('.organic-box-item');
            const quantityValue = itemBox.querySelector('.quantity-value');
            let quantity = parseInt(quantityValue.textContent);
            quantity++;
            quantityValue.textContent = quantity;

            // Update price text
            const basePrice = parseFloat(itemBox.querySelector('.item-price').getAttribute('data-base-price'));
            itemBox.querySelector('.item-price').textContent = `$${(basePrice * quantity).toFixed(2)}/ Box`;
        }

        // Minus button
        if (e.target.classList.contains('minus-btn')) {
            const itemBox = e.target.closest('.organic-box-item');
            const quantityValue = itemBox.querySelector('.quantity-value');
            let quantity = parseInt(quantityValue.textContent);
            if (quantity > 0) {
                quantity--;
                quantityValue.textContent = quantity;

                // Update price text
                const basePrice = parseFloat(itemBox.querySelector('.item-price').getAttribute('data-base-price'));
                itemBox.querySelector('.item-price').textContent = `$${(basePrice * quantity).toFixed(2)}/ Box`;
            }
        }

        // Add to Cart button
        if (e.target.classList.contains('add-to-cart-btn')) {
            const itemBox = e.target.closest('.organic-box-item');
            const itemId = e.target.getAttribute('data-item');
            const title = itemBox.querySelector('.organic-heading').textContent;
            const basePrice = parseFloat(itemBox.querySelector('.item-price').getAttribute('data-base-price'));
            const quantity = parseInt(itemBox.querySelector('.quantity-value').textContent);
            const img = itemBox.querySelector('.organic-image img').getAttribute('src');
            if (!cart[itemId]) {
                cart[itemId] = { itemId, title, price: basePrice, quantity, img };
            } else {
                cart[itemId].quantity += quantity;
            }
            cartCount = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
            updateCartBadge();
            updateCartPopup();
            showCartPopup();
        }
    });

    document.addEventListener('mousedown', function(e) {
        const cartPopup = document.getElementById('cart-popup');
        if (
            cartPopup &&
            cartPopup.style.display === 'flex' &&
            !cartPopup.contains(e.target) &&
            !e.target.classList.contains('cart-container')
        ) {
            cartPopup.style.display = 'none';
        }
    });
});


