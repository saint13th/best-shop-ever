(function () {
    const searchLink = document.querySelector('#searchLink');
    const searchInput = document.querySelector('#searchInput');

    searchInput && searchInput.addEventListener('change', (event) => {
        const title = event.target.value;

        searchLink.setAttribute('href', `/search?title=${title}`);
    });
}())