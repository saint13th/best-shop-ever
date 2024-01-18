const commentsForm = document.querySelector('#commentsForm');

commentsForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault();

        const commentsValue = document.querySelector('#comment').value;
        const productName = commentsForm.dataset.product;
        const commentError = document.querySelector('#commentError');

        const response = await fetchData({
            method: 'POST', url: '/product-comment', params: {
                productName,
                rating: 5, // TODO: rating
                commentText: commentsValue,
            }
        })

        console.log({ response })

        if (response.error) {
            commentError.innerHTML = error;

            return;
        }

        commentError.innerHTML = '';
        window.location.reload();
    } catch (error) {
        commentError.innerHTML = error.message;
    }
});