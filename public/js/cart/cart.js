(function () {
    const deleteButtons = document.querySelectorAll('.deleteItem');

    for (let index = 0; index < deleteButtons.length; index++) {
        const deleteButton = deleteButtons[index];

        deleteButton.addEventListener('click', async (event) => {
            try {
                const dataDeleteId = deleteButton.getAttribute('data-deleteId');

                if (!dataDeleteId) return;

                const { result, error } = await fetchService.request({ url: `/cart/${dataDeleteId}`, method: 'DELETE' });

                if (error) {
                    alert(error.message);
                    return;
                }

                window.location.reload();
            } catch (error) {
                alert(error.message);
            }
        })
    }
}(fetchService));