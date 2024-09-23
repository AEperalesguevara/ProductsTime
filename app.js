document.addEventListener("DOMContentLoaded", function () {
  const productGrid = document.getElementById("product-grid");

  function loadProducts() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((products) => {
        products.forEach((product, index) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card");

          let timerDuration;
          if (index === 0) {
            timerDuration = 1;
          } else if (index === 1) {
            timerDuration = 3;
          } else {
            timerDuration = Math.floor(Math.random() * 2) + 2;
          }

          const timerId = `timer-${product.id}`;
          const buyButtonId = `buy-${product.id}`;

          productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description.slice(0, 100)}...</p>
            <p class="price">$${product.price}</p>
            <button class="buy-button" id="${buyButtonId}">Comprar</button>
            <div class="timer" id="${timerId}">${timerDuration} minutos</div>
          `;

          productGrid.appendChild(productCard);

          const button = document.getElementById(buyButtonId);
          button.addEventListener("click", () => {
            alert("Comprado");
          });

          startTimer(timerDuration, buyButtonId);
        });
      })
      .catch((error) => console.error("Error al cargar los productos:", error));
  }

  function startTimer(duration, buttonId) {
    let timer = duration * 60;
    const button = document.getElementById(buttonId);

    const interval = setInterval(() => {
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
      document.getElementById(
        `timer-${buttonId.split("-")[1]}`
      ).textContent = `${minutes} min ${seconds < 10 ? "0" : ""}${seconds} sec`;

      timer--;

      if (timer < 0) {
        clearInterval(interval);
        button.disabled = true;
        button.classList.add("disabled");
        button.textContent = "Agotado";
      }
    }, 1000);
  }

  loadProducts();
});
