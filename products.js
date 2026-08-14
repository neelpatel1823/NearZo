import { productApi } from './api.js';

document.addEventListener("DOMContentLoaded", async () => {
    const gridContainer = document.getElementById("productsGrid");
    if (!gridContainer) return;

    try {
        const products = await productApi.getAll();

        if (products.length === 0) {
            gridContainer.style.display = "none";
            gridContainer.innerHTML = '<p style="text-align: center; color: #64748b; padding: 40px;">No products available yet.</p>';
            return;
        }

        gridContainer.style.display = "grid";

        gridContainer.innerHTML = products.map(product => {
            let badgeClass = "badge-in-stock";
            if (product.availability === "Low Stock") {
                badgeClass = "badge-low-stock";
            } else if (product.availability === "Out of Stock") {
                badgeClass = "badge-out-of-stock";
            }

            return `
                <article class="product-card">
                    <div class="product-img-wrapper">
                        <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">
                    </div>
                    <div class="product-info">
                        <span class="stock-badge ${badgeClass}">• ${product.availability}</span>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        
                        <div class="product-price-row">
                            <span class="product-price">₹${Number(product.price).toLocaleString('en-IN')}</span>
                        </div>
                        
                        <hr class="card-divider" />
                        
                        <div class="product-footer">
                            <span class="store-name">${product.storeName}</span>
                            <span class="store-location"><span class="pin">📍</span> ${product.storeLocation}</span>
                        </div>
                    </div>
                </article>
            `;
        }).join('');
    } catch (error) {
        gridContainer.style.display = "block";
        gridContainer.innerHTML = `<p style="text-align: center; color: #ef4444; padding: 40px;">Failed to load products: ${error.message}</p>`;
    }
});