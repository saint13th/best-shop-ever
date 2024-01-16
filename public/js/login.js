const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        const formType = loginForm.dataset.type;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const loginError = document.querySelector('#loginError');
        const getUrl = () => {
            if (formType === 'signin') return '/auth/signIn';
            if (formType === 'signUp') return `/${formType}`;
        }
        const url = getUrl();

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        if (response.error) {
            throw new Error(response.error.message);
        }

        loginError.innerHTML = '';
        window.location.pathname = '/';
    } catch (error) {
        loginError.innerHTML = error.message;
    }
});