console.log("Hey from ourmenu.js");

let foodItems = [];

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  
  const currentPage = location.pathname.split("/").pop();
  const isHomePage =
    currentPage === "" ||          
    currentPage === "index.html";  

  if (isHomePage) {
    fetchHomeItems(); //for homepage
  } else {
    fetchFoodItems(); // for ourmenu
  }


  const subscribeInput = document.querySelector(".subscribe-form input");
  const subscribeButton = document.querySelector(".subscribe-form button");

  if (subscribeInput && subscribeButton) {
    subscribeButton.addEventListener("click", () => {
      const email = subscribeInput.value.trim();

      if (email === "") {
        alert("Please enter your email before subscribing!");
      } else {
        alert("Thanks for subscribing!");
        subscribeInput.value = ""; 
      }
    });
  }
});

// Common fetch for all menu
async function fetchFoodItems() {
  try {
    const response = await fetch("foodItems.json");
    if (!response.ok) throw new Error("Network response was not ok");
    foodItems = await response.json();
    populateMenu(foodItems);
  } catch (error) {
    console.error("Error fetching food items:", error);
  }
}

// show 4 food items on homepage
  async function fetchHomeItems() {
    try {
      const response = await fetch("foodItems.json");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Home food items loaded:", data);

      foodItems = data;

      // store data in a global variable so the popup works
      function createCards(items, containerSelector) {
      const container = document.querySelector(containerSelector);
        if (!container) return;
        container.innerHTML = items.map(item => createMenuItem(item)).join("");
      }

      // 4 items per section
      const bestSeller = data.filter(item => item.best_seller === "yes").slice(0, 4);
      createCards(bestSeller, "#bestSellers .ourmenu-items");

      const trending = data.filter(item => item.trending === "yes").slice(0, 4);
      createCards(trending, "#trending .ourmenu-items");

      const starters = data.filter(item => item.category.toLowerCase() === "starter").slice(0, 4);
      createCards(starters, "#starter .ourmenu-items");

      const beverages = data.filter(item => item.category.toLowerCase() === "beverages").slice(0, 4);
      createCards(beverages, "#beverages .ourmenu-items");

      const mainCourse = data.filter(item => item.category.toLowerCase() === "main course").slice(0, 4);
      createCards(mainCourse, "#main-course .ourmenu-items");

      const combo = data.filter(item => item.category.toLowerCase() === "combo").slice(0, 4);
      createCards(combo, "#combo .ourmenu-items");
    } catch (err) {
      console.error("Error loading home items:", err);
    }
 }

// Our Menu Page
  function populateMenu(foodItems) {
    const categories = {
      'bestSellers': [],
      'trending': [],
      'starter': [],
      'beverages': [],
      'main-course': [],
      'combo':[]
    };

    foodItems.forEach(item => {
      if (item.best_seller === "yes") categories.bestSellers.push(item);
      if (item.trending === "yes") categories.trending.push(item);
      let cat = item.category.toLowerCase().replace(" ", "-");
      if (categories[cat]) categories[cat].push(item);
    });

    for (const category in categories){
      const categoryContainer = document.getElementById(category);
      if (!categoryContainer) continue;
      categoryContainer.querySelector(".ourmenu-items").innerHTML =
        categories[category].map(item => createMenuItem(item)).join("");
    }
  }

// Card Template
  function createMenuItem(item) {
    return `
      <div class="ourmenu-card" data-id="${item.id}">
        <img src="${item.imageurl}" alt="${item.title}" />
          <div class="menu-card-content">
            <h4>${item.title}</h4>
            <p>${item.description || ""}</p>
            <span>Price: <strike class="strike-price">$${item.actual_price}</strike> $${item.selling_price}</span>
          </div>
          <div class="add-to-cart-btn">
            <button class="cta-button" onclick="addtoCart('${item.id}', '${item.selling_price}', '${item.title}', '${item.imageurl}')">
              Add to Cart
            </button>
          </div>
    </div>`;
  }

// Add to Cart
  function addtoCart(id, price, title, imageUrl) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price: parseFloat(price), imageUrl, quantity: 1 });
        alert("✅ Added to cart");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

//Update Cart Count
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElement = document.querySelector(".cart-count");
    if (countElement) countElement.textContent = totalCount;
  }

// Hamburger menu
  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navRight = document.querySelector(".nav-right");
    if (hamburger && navRight) {
      hamburger.addEventListener("click", () => navRight.classList.toggle("active"));
    }
  });

// Popup logic
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".ourmenu-card");
    const button = e.target.closest(".add-to-cart-btn");
    if (button) return;

    if (card && card.dataset.id) {
      const itemId = card.dataset.id;
      const item = foodItems.find((i) => i.id == itemId);
      if (item) openProductPopup(item);
    }
  });

  function openProductPopup(item) {
    const popupOverlay = document.getElementById("product-popup");
    const popupDetails = document.getElementById("popup-details");

    if (!popupOverlay || !popupDetails) return;

    popupDetails.innerHTML = `
      <div class="popup-content-box">
        <img src="${item.imageurl}" alt="${item.title}" class="popup-img"/>
        <div class="popup-info">
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <p><b>Price:</b> $${item.selling_price}</p>
          <button class="popup-add-btn" onclick="addtoCart('${item.id}', '${item.selling_price}', '${item.title}', '${item.imageurl}')">
            Add to Cart
          </button>
        </div>
      </div>`;
    popupOverlay.style.display = "flex";
  }

  // Close popup
  document.querySelector(".popup-close").addEventListener("click", () => {
    document.getElementById("product-popup").style.display = "none";
  });

  //Click outside popup closes it
  document.getElementById("product-popup").addEventListener("click", (e) => {
    if (e.target.id === "product-popup") {
      document.getElementById("product-popup").style.display = "none";
    }
  });


// search functionality title based
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".search-input");
    const searchContainer = document.querySelector("#search-items .ourmenu-items");

    if (!searchInput || !searchContainer) return;

    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();

        //If the search box is empty, show the full menu again instead of showing nothing
        if (searchTerm === "") {
           searchContainer.innerHTML = "";
          populateMenu(foodItems);
          return;
        }

        // filter only by title
        const filteredItems = foodItems.filter((item) =>
          item.title.toLowerCase().includes(searchTerm)
        );

        //Show filtered results with highlighted title
        if (filteredItems.length > 0) {
          searchContainer.innerHTML = filteredItems
            .map((item) => createMenuItemWithHighlight(item, searchTerm))
            .join("");
        } else {
          searchContainer.innerHTML = `<p class="no-results">No items found</p>`;
        }

      document.querySelector("#search-items").scrollIntoView({ behavior: "smooth" });
    });
  });

// Helper function for rendering highlighted search results
  function highlightMatch(text, searchTerm) {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "ig");
    return text.replace(
      regex,
      `<span class="highlighted-text">$1</span>`
    );
  }

  function createMenuItemWithHighlight(item, searchTerm) {
    return `
      <div class="ourmenu-card">
        <div class="card-image-container">
          <img src="${item.imageurl}" alt="${item.title}" />
        </div>
      <div class="menu-card-content">
        <h4>${highlightMatch(item.title, searchTerm)}</h4>
        <p>${item.description}</p>
        <p class="price">$${item.selling_price}</p>
        <button class="cta-button" onclick="addtoCart(${item.id}, ${item.selling_price}, '${item.title}', '${item.imageurl}')">
          Add to Cart
        </button>
      </div>
      </div>`;
  }

// search input keydown and popup
  document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input");
  const searchContainer = document.querySelector("#search-items .ourmenu-items");

  if (!searchInput || !searchContainer) return;

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm === "") {
      searchContainer.innerHTML = "";
      populateMenu(foodItems);
      return;
    }

    const filteredItems = foodItems.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );

    if (filteredItems.length > 0) {
      searchContainer.innerHTML = filteredItems
        .map((item) => createMenuItemWithHighlight(item, searchTerm))
        .join("");
    } else {
      searchContainer.innerHTML = `<p class="no-results">No items found</p>`;
    }

    document.querySelector("#search-items").scrollIntoView({ behavior: "smooth" });
  });

// keydown event- press enter to open the popup
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const searchTerm = searchInput.value.toLowerCase().trim();
      if (!searchTerm) return;

      const matchedItems = foodItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm)
      );

      if (matchedItems.length > 0) {
        openProductPopup(matchedItems[0]); 
      }
    }
  });
});



