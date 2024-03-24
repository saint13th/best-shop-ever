import { fetchService } from '../../services/fetchService/fetchService';

(function () {
  const createProductForm = document.querySelector('#createProductForm');
  const specs = document.querySelector('#specs');
  const specsSkeleton = document.querySelector('#spec-skeleton');
  const addSpecButton = document.querySelector('#add-spec-button');

  const getSpecs = () => {
    try {
      let result = [];
      const specRows = document.querySelectorAll('.product-spec__row');

      if (!specRows.length) return;

      for (let i = 0; i < specRows.length; i++) {
        const currentRow = specRows[i];
        const name = currentRow.querySelector('.product-spec__name').value;
        const value = currentRow.querySelector('.product-spec__value').value;

        result.push({ name, value });
      }

      return result;
    } catch (error) {
      alert('Не удалось получить характаристики!');
    }
  };

  createProductForm &&
    createProductForm.addEventListener('submit', async (e) => {
      const createProductError = document.querySelector('#createProductError');

      try {
        e.preventDefault();

        const title = document.querySelector('#title').value;
        const name = document.querySelector('#name').value;
        const price = document.querySelector('#price').value;
        const rating = document.querySelector('#rating').value;
        const image = document.querySelector('#image').value;
        const description = document.querySelector('#description').value;
        const shortDescription =
          document.querySelector('#shortDescription').value;
        const createProductSuccess = document.querySelector(
          '#createProductSuccess',
        );
        const specs = getSpecs();
        const url = '/admin/products';

        const { result, error } = await fetchService.post({
          url,
          params: {
            title,
            name,
            price,
            rating,
            image,
            description,
            shortDescription,
          },
        });

        if (error) {
          createProductError.innerHTML = error;

          return;
        }

        createProductError.innerHTML = '';
        createProductSuccess.innerHTML = 'Пользователь создан';
        createUserForm.reset();
      } catch (error) {
        createProductError.innerHTML = error.message;
      }
    });

  addSpecButton &&
    addSpecButton.addEventListener('click', (e) => {
      try {
        const emptydiv = document.createElement('div');

        emptydiv.innerHTML = specsSkeleton.innerHTML;
        specs.appendChild(emptydiv);
      } catch (error) {
        alert('Не удалось добавить характаристику!');
      }
    });

  specs &&
    specs.addEventListener('click', (e) => {
      try {
        const dataDeleteSpec = e.target.getAttribute('data-delete-spec');

        if (dataDeleteSpec) {
          const closesParent = e.target.closest('.product-spec__row');

          closesParent.remove();
        }
      } catch (error) {
        alert('Не удалось удалить характаристику!');
      }
    });
})(fetchService);
