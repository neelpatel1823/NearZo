import { productApi } from './api.js';

document.addEventListener("DOMContentLoaded", () => {
    const uploadForm = document.querySelector(".uploadForm");

    if (!uploadForm) return;

    uploadForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = uploadForm.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Adding...';
        submitBtn.disabled = true;

        try {
            const imageInput = document.getElementById("productImage");
            const file = imageInput ? imageInput.files[0] : null;

            const formData = new FormData();
            formData.append('name', document.getElementById("productName")?.value.trim() || "");
            formData.append('price', document.getElementById("productPrice")?.value.trim() || "0");
            formData.append('description', document.getElementById("productDescription")?.value.trim() || "");
            formData.append('availability', document.getElementById("productAvailability")?.value || "In Stock");
            formData.append('storeName', document.getElementById("storeName")?.value.trim() || "");
            formData.append('storeLocation', document.getElementById("storeLocation")?.value.trim() || "");
            if (file) {
                formData.append('image', file);
            }

            await productApi.create(formData);
            window.location.href = "products.html";
        } catch (error) {
            alert(`Failed to add product: ${error.message}`);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});