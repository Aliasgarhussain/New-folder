class LaundryCart {
  constructor() {
    this.cart = [];
    this.services = [
      { name: 'Dry Clean', price: 200 },
      { name: 'Wash & Fold', price: 100 },
      { name: 'Ironing', price: 30 },
      { name: 'Stain Removal', price: 50 },
      { name: 'Leather & Suede Cleaning', price: 900 },
      { name: 'Wedding Dress', price: 8000 }
    ];
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCartDisplay();
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('add-btn')) {
        this.addToCart(e.target.closest('.service-item'));
      } else if (e.target.classList.contains('remove-btn')) {
        this.removeFromCart(e.target.closest('.cart-item'));
      } else if (e.target.classList.contains('book-btn')) {
        this.bookNow();
      }
    });
  }

  addToCart(serviceItem) {
    const serviceData = JSON.parse(serviceItem.dataset.service);
    const existingIndex = this.cart.findIndex(item => item.name === serviceData.name);
    
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({ ...serviceData, quantity: 1 });
    }
    
    this.animateAddButton(serviceItem.querySelector('.add-btn'));
    this.updateCartDisplay();
  }

  removeFromCart(cartItem) {
    const serviceName = cartItem.dataset.serviceName;
    const index = this.cart.findIndex(item => item.name === serviceName);
    if (index > -1) {
      this.cart[index].quantity -= 1;
      if (this.cart[index].quantity <= 0) {
        this.cart.splice(index, 1);
      }
      this.updateCartDisplay();
    }
  }

  updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalElement = document.getElementById('total');
    
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    this.cart.forEach(item => {
      total += item.price * item.quantity;
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.dataset.serviceName = item.name;
      cartItem.innerHTML = `
        <span>${item.name} (x${item.quantity})</span>
        <span>₹${item.price * item.quantity}</span>
        <button class="remove-btn">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
    });
    
    totalElement.textContent = total;
  }

  animateAddButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 150);
  }

  bookNow() {
    if (this.cart.length === 0) {
      alert('Please add services to your cart first!');
      return;
    }
    const formData = new FormData(document.querySelector('.booking-form'));
    const bookingData = {
      cart: this.cart,
      total: document.getElementById('total').textContent,
      customer: Object.fromEntries(formData)
    };
    console.log('Booking data:', bookingData); 
    alert('Booking confirmed! Thank you for choosing our laundry service.');
    this.cart = [];
    this.updateCartDisplay();
    document.querySelector('.booking-form').reset();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LaundryCart();
});

document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(newsletterForm);
      alert('Thank you for subscribing to our newsletter!');
      newsletterForm.reset();
    });
  }
});

