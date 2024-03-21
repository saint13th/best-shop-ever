import { fetchService } from '../../services/fetchService/fetchService';

const editButtons = document.querySelectorAll('.edit-button');

editButtons.forEach((element) => {
  element.addEventListener('click', async (event) => {
    try {
      event.preventDefault();

      const id = (event.target as HTMLElement).getAttribute('data-id');
      const wrapper = (event.target as HTMLElement).closest('tr');
      const email = (wrapper.querySelector('.user-email') as HTMLInputElement)
        .value;
      const name = (wrapper.querySelector('.user-name') as HTMLInputElement)
        .value;
      const image = (wrapper.querySelector('.user-image') as HTMLInputElement)
        .value;
      const roles = (wrapper.querySelector('.user-roles') as HTMLInputElement)
        .value;

      const { result, error } = await fetchService.patch({
        url: `/admin/users/${id}`,
        params: { email, name, image, roles },
      });

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
  });
});
