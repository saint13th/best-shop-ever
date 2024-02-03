import { fetchService } from '../../services/fetchService/fetchService';

(function () {
    const createUserForm = document.querySelector('#createUserForm');

    createUserForm && createUserForm.addEventListener("submit", async (e) => {
        try {
            e.preventDefault();

            const name = document.querySelector('#name').value;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const image = document.querySelector('#image').value;
            const createUserError = document.querySelector('#createUserError');
            const createUserSuccess = document.querySelector('#createUserSuccess');
            const url = '/admin/users';

            const role = Array.prototype.slice.call(document.querySelectorAll('#role option:checked'), 0).map((v) => {
                return v.value;
            });

            const { result, error } = await fetchService.post({
                url,
                params: {
                    name,
                    role,
                    email,
                    password,
                    image
                }
            })

            if (error) {
                createUserError.innerHTML = error;

                return;
            }

            createUserError.innerHTML = '';
            createUserSuccess.innerHTML = 'Пользователь создан';
            createUserForm.reset();
        } catch (error) {
            createUserError.innerHTML = error.message;
        }
    });
}(fetchService));