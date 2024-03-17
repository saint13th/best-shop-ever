import { fetchService } from '../../services/fetchService/fetchService';


const editButtons = document.querySelectorAll('.products-edit-button');

editButtons.forEach((element) => {
    element.addEventListener('click', async(event) => {
        try {
            event.preventDefault();

            const id = (event.target as HTMLElement).getAttribute('data-id');
            const wrapper = (event.target as HTMLElement).closest('tr');
            const title = (wrapper.querySelector('.product-title') as HTMLInputElement).value;
            const name = (wrapper.querySelector('.product-name') as HTMLInputElement).value;
            const price = (wrapper.querySelector('.product-price') as HTMLInputElement).value;
            const image = (wrapper.querySelector('.product-image') as HTMLInputElement).value;
            const rating = (wrapper.querySelector('.product-rating') as HTMLInputElement).value;
            const description = (wrapper.querySelector('.product-description') as HTMLInputElement).value;
            const shortDescription = (wrapper.querySelector('.product-shortDescription') as HTMLInputElement).value;

            const { result, error } = await fetchService.patch({
                url: `/admin/products/${id}`,
                params: { title, name, price, image, rating, description, shortDescription },
            })

            if (error) {
                alert(error);
                return;
            }
            if (result) {
                window.location.reload();
            }

        } catch (error) {
            alert(error.message);
        }
    })
});
