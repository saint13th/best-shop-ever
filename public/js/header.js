(function () {
    const logoutButton = document.querySelector('#logoutButton');

    logoutButton.addEventListener('click', async (event) => {
        const { result, error } = await fetchService.post({
            url: '/auth/signOut',
            params: {}
        });

        if (error) {
            alert(error.message);
        }

        if (result) {
            window.location.pathname = '/signin'
        }
    })

}(fetchService))