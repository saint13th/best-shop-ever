import { fetchService } from '../services/fetchService/fetchService';

(function () {
    const addToCartButton = document.querySelector('#addToCartButton');
    const addToCartError = document.querySelector('#addToCartError');

    addToCartButton && addToCartButton.addEventListener('click', async (e) => {
        try {
            e.preventDefault();

            const productId = addToCartButton.getAttribute('data-productId');
            const response = await fetchService.post({
                url: '/cart',
                params: {
                    productId
                }
            });

            if (response.error) {
                addToCartError.innerHTML = response.error;

                return;
            }

            addToCartError.innerHTML = '';
            alert('Товар добавлен в корзину!')
        } catch (error) {
            addToCartError.innerHTML = error.message;
            alert('Не получилось добавить товар в корзину!')
        }
    })
}(fetchService))