document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // HEADER SCROLL EFFECT
    // =========================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check in case page starts scrolled
    handleScroll();

    // =========================================
    // MOBILE NAVIGATION MENU
    // =========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');
    const mobileMenuIcon = mobileToggle.querySelector('i');

    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            mobileMenuIcon.className = 'fas fa-times';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        } else {
            mobileMenuIcon.className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    };

    mobileToggle.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active classes
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // =========================================
    // HERO SLIDER
    // =========================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const dotsContainer = document.getElementById('slider-dots');
    
    let currentSlide = 0;
    let sliderInterval;
    const intervalTime = 6000; // 6 seconds

    // Create dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetTimer();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
                dots[index].classList.add('active');
            } else {
                slide.classList.remove('active');
                dots[index].classList.remove('active');
            }
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    };

    const goToSlide = (index) => {
        currentSlide = index;
        updateSlider();
    };

    const startTimer = () => {
        sliderInterval = setInterval(nextSlide, intervalTime);
    };

    const resetTimer = () => {
        clearInterval(sliderInterval);
        startTimer();
    };

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetTimer();
        });
        
        startTimer();
    }

    // =========================================
    // MODAL & OVERLAY TRIGGERS (SEARCH, ACCOUNT, CART)
    // =========================================
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

    const accountBtn = document.getElementById('account-btn');
    const accountModal = document.getElementById('account-modal');
    const closeAccount = document.getElementById('close-account');

    const cartBtn = document.getElementById('cart-btn');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const cartShopNow = document.getElementById('cart-shop-now');

    // Helper functions for drawer display
    const openDrawer = (drawer) => {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeAllDrawers = () => {
        searchOverlay.classList.remove('active');
        accountModal.classList.remove('active');
        cartDrawer.classList.remove('active');
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        if (mobileMenuIcon) mobileMenuIcon.className = 'fas fa-bars';
    };

    // Mobile Bottom Navigation Buttons
    const bottomSearchBtn = document.getElementById('bottom-search-btn');
    const bottomAccountBtn = document.getElementById('bottom-account-btn');
    const bottomCartBtn = document.getElementById('bottom-cart-btn');

    // Event listeners for opening
    const initSearchTrigger = () => {
        openDrawer(searchOverlay);
        setTimeout(() => searchInput.focus(), 300); // Focus input after sliding open
    };

    if (searchBtn) searchBtn.addEventListener('click', initSearchTrigger);
    if (bottomSearchBtn) bottomSearchBtn.addEventListener('click', initSearchTrigger);

    const initAccountTrigger = () => {
        openDrawer(accountModal);
    };

    if (accountBtn) accountBtn.addEventListener('click', initAccountTrigger);
    if (bottomAccountBtn) bottomAccountBtn.addEventListener('click', initAccountTrigger);

    const initCartTrigger = () => {
        openDrawer(cartDrawer);
    };

    if (cartBtn) cartBtn.addEventListener('click', initCartTrigger);
    if (bottomCartBtn) bottomCartBtn.addEventListener('click', initCartTrigger);

    // Event listeners for closing
    if (closeSearch) closeSearch.addEventListener('click', closeAllDrawers);
    if (closeAccount) closeAccount.addEventListener('click', closeAllDrawers);
    if (closeCart) closeCart.addEventListener('click', closeAllDrawers);
    if (overlay) overlay.addEventListener('click', closeAllDrawers);
    if (cartShopNow) cartShopNow.addEventListener('click', closeAllDrawers);

    // Active bottom navigation state shifting
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', () => {
            bottomNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // =========================================
    // LUXURY SMOOTH SCROLLING FOR ANCHORS
    // =========================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close active mobile overlays & drawers
                closeAllDrawers();
                
                // Nudge active nav class
                if (this.classList.contains('nav-link')) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
                
                // Calculate position with absolute header offset compensation
                const headerHeight = header ? header.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close drawers on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllDrawers();
        }
    });

    // =========================================
    // ACCOUNT MODAL TAB SWITCHING
    // =========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const accountForms = document.querySelectorAll('.account-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            accountForms.forEach(f => f.classList.remove('active'));

            btn.classList.add('active');
            const targetForm = document.getElementById(`${targetTab}-form`);
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });

    // =========================================
    // DYNAMIC SHOPPING CART MANAGEMENT
    // =========================================
    const cartCountEls = document.querySelectorAll('.cart-count');
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmptyMessage = document.getElementById('cart-empty-message');
    const cartDrawerFooter = document.getElementById('cart-drawer-footer');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const cartTotalQty = document.querySelector('.cart-total-qty');
    
    let cart = [];

    // Render cart items dynamically in drawer
    const renderCart = () => {
        cartItemsList.innerHTML = '';
        
        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'flex';
            if (cartDrawerFooter) cartDrawerFooter.classList.remove('active');
            if (cartTotalQty) cartTotalQty.textContent = '0';
            cartCountEls.forEach(el => el.textContent = '0');
            return;
        }

        cartEmptyMessage.style.display = 'none';
        if (cartDrawerFooter) cartDrawerFooter.classList.add('active');

        let subtotal = 0;
        let totalQty = 0;

        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            totalQty += item.quantity;

            const cartItemHtml = `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-details">
                        <div>
                            <span class="cart-item-category">${item.category}</span>
                            <h4 class="cart-item-name"><a href="#">${item.name}</a></h4>
                            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <div class="cart-item-qty-container">
                            <button class="qty-btn minus" data-index="${index}"><i class="fas fa-minus"></i></button>
                            <span class="qty-val">${item.quantity}</span>
                            <button class="qty-btn plus" data-index="${index}"><i class="fas fa-plus"></i></button>
                        </div>
                    </div>
                    <button class="cart-item-remove" data-index="${index}" aria-label="Remove item"><i class="far fa-trash-alt"></i></button>
                </div>
            `;
            cartItemsList.insertAdjacentHTML('beforeend', cartItemHtml);
        });

        if (subtotalAmount) subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
        if (cartTotalQty) cartTotalQty.textContent = totalQty;
        cartCountEls.forEach(el => el.textContent = totalQty);

        // Note: Individual button event listeners are omitted here in favor of high-performance event delegation set up globally below.
    };

    // Setup single delegated click listener on cart items list for maximum performance and lower memory usage
    if (cartItemsList) {
        cartItemsList.addEventListener('click', (e) => {
            const plusBtn = e.target.closest('.qty-btn.plus');
            const minusBtn = e.target.closest('.qty-btn.minus');
            const removeBtn = e.target.closest('.cart-item-remove');

            if (plusBtn) {
                const index = parseInt(plusBtn.getAttribute('data-index'));
                cart[index].quantity += 1;
                renderCart();
            } else if (minusBtn) {
                const index = parseInt(minusBtn.getAttribute('data-index'));
                if (cart[index].quantity > 1) {
                    cart[index].quantity -= 1;
                } else {
                    cart.splice(index, 1);
                }
                renderCart();
            } else if (removeBtn) {
                const index = parseInt(removeBtn.getAttribute('data-index'));
                cart.splice(index, 1);
                renderCart();
            }
        });
    }

    // Add product to cart array
    const addToCart = (product) => {
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
        
        // Cart count pop animation on both header and bottom nav badges
        cartCountEls.forEach(el => {
            el.style.transform = 'scale(1.3)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
            }, 300);
        });

        // Open cart drawer immediately to show success
        openDrawer(cartDrawer);
    };

    // Attach listeners to "Add to Cart" buttons on page
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card');
            const name = card.querySelector('.product-name a').textContent.trim();
            const category = card.querySelector('.product-category').textContent.trim();
            const priceText = card.querySelector('.product-price').textContent.trim();
            
            // Extract numerical price, handle old and new price elements
            let price = 0;
            const newPriceEl = card.querySelector('.price-new');
            if (newPriceEl) {
                price = parseFloat(newPriceEl.textContent.replace('$', ''));
            } else {
                price = parseFloat(priceText.replace('$', ''));
            }
            
            const img = card.querySelector('.product-img-main').getAttribute('src');

            addToCart({ name, category, price, img });

            // Button temporary feedback text using CSS classes instead of inline style injection
            const originalText = btn.textContent;
            btn.textContent = 'Added!';
            btn.classList.add('added');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('added');
            }, 1500);
        });
    });

    // =========================================
    // WISHLIST TOGGLE
    // =========================================
    const wishlistBtns = document.querySelectorAll('.action-icon[data-tooltip="Add to Wishlist"]');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const heartIcon = btn.querySelector('i');
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
            
            if (heartIcon.classList.contains('fas')) {
                heartIcon.style.color = 'var(--clr-sale)';
                btn.setAttribute('data-tooltip', 'Remove from Wishlist');
            } else {
                heartIcon.style.color = '';
                btn.setAttribute('data-tooltip', 'Add to Wishlist');
            }
        });
    });

    // =========================================
    // QUICK VIEW PLACEHOLDER
    // =========================================
    const quickViewBtns = document.querySelectorAll('.action-icon[data-tooltip="Quick View"]');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productName = btn.closest('.product-card').querySelector('.product-name a').textContent;
            alert(`Quick View modal for "${productName}" is coming soon in development!`);
        });
    });
});
