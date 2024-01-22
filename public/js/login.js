(function () {
    const loginForm = document.querySelector('#loginForm');

    loginForm.addEventListener("submit", async (e) => {
        try {
            e.preventDefault();

            const formType = loginForm.dataset.type;
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            const loginError = document.querySelector('#loginError');
            const getUrl = () => {
                if (formType === 'signin') return '/api/v1/auth/signIn';
                if (formType === 'signup') return `/api/v1/auth/signUp`;
            }
            const url = getUrl();

            const { result, error } = await fetchService.request({
                method: 'POST', url, params: {
                    email,
                    password,
                }
            })

            if (error) {
                loginError.innerHTML = error;

                return;
            }

            loginError.innerHTML = '';
            // window.location.pathname = '/';
        } catch (error) {
            loginError.innerHTML = error.message;
        }
    });
}({ fetchService }))