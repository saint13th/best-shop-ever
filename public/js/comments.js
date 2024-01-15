const commentsForm = document.querySelector('#commentsForm');

commentsForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        const commentsValue = document.querySelector('#comment').value;
        const productName = commentsForm.dataset.product;
        const commentError = document.querySelector('#commentError');

        const response = await fetch(`/product-comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                productName,
                rating: 5, // TODO: rating
                commentText:commentsValue,
            })
        });

        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }

        if (response.error) {
            throw new Error(response.error.message);
        }

        commentError.innerHTML = '';
        window.location.reload();
    } catch (error) {
        loginError.innerHTML = error.message;
    }
});