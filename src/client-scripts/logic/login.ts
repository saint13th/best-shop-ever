import { fetchService } from '../services/fetchService/fetchService';


const loginForm: HTMLElement = document.querySelector('#loginForm');
const loginError: HTMLElement = document.querySelector('#loginError');

loginForm && loginForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        const formType = loginForm.dataset.type;
        const email = (document.querySelector('#email') as HTMLInputElement).value;
        const password = (document.querySelector('#password') as HTMLInputElement).value;
        const getUrl = () => {
            if (formType === 'signin') return '/auth/signIn';
            if (formType === 'signup') return `/auth/signUp`;
        }
        const url = getUrl();

        const { error } = await fetchService.post({
            url,
            params: {
                email,
                password,
            }
        })

        if (error) {
            loginError.innerHTML = error;

            return;
        }

        loginError.innerHTML = '';
        window.location.pathname = '/';
    } catch (error) {
        loginError.innerHTML = error.message;
    }
});
