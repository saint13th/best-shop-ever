(function () {
    const commentsForm = document.querySelector('#commentsForm');

    commentsForm.addEventListener("submit", async (e) => {
        try {
            e.preventDefault();

            const commentsValue = document.querySelector('#comment').value;
            const productName = commentsForm.dataset.product;

            const response = await fetchService.post({
                url: '/product-comments',
                params: {
                    productName,
                    rating: 5, // TODO: rating
                    commentText: commentsValue,
                }
            })

            if (response.error) {
                alert(response.error);

                return;
            }

            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    });
}(fetchService))