(function () {
    const commentsForm = document.querySelector('#commentsForm');

    commentsForm.addEventListener("submit", async (e) => {
        try {
            e.preventDefault();

            const commentsValue = document.querySelector('#comment').value;
            const productName = commentsForm.dataset.product;
            const commentError = document.querySelector('#commentError');

            const response = await fetchService.request({
                method: 'POST', url: '/api/v1/product-comments', params: {
                    productName,
                    rating: 5, // TODO: rating
                    commentText: commentsValue,
                }
            })

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
}(fetchService))