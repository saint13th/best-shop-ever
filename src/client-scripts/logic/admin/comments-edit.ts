import { fetchService } from '../../services/fetchService/fetchService';


const editButtons = document.querySelectorAll('.edit-comment');
const deleteButtons = document.querySelectorAll('.delete-comment');

editButtons.forEach((element) => {
    element.addEventListener('click', async(event) => {
        try {
            event.preventDefault();

            const id = (event.target as HTMLElement).getAttribute('data-id');
            const commentId = (event.target as HTMLElement).getAttribute('data-commentId');
            const wrapper = (event.target as HTMLElement).closest('tr');
            const userName = (wrapper.querySelector('.comment-userName') as HTMLInputElement).value;
            const text = (wrapper.querySelector('.comment-text') as HTMLInputElement).value;

            const { result, error } = await fetchService.patch({
                url: `/admin/comments/${id}`,
                params: { userName, text, commentId },
            })

            if (error) {
                alert(error);
                return;
            }
            if (result) {
                window.location.reload();
            }

        } catch (error) {
            alert(error.message);
        }
    })
});

deleteButtons.forEach((element) => {
    element.addEventListener('click', async(event) => {
        try {
            event.preventDefault();

            const id = (event.target as HTMLElement).getAttribute('data-id');
            const { result, error } = await fetchService.deleteRequest({
                url: `/admin/comments/${id}`,
                params: {},
            })

            if (error) {
                alert(error);
                return;
            }
            if (result) {
                window.location.reload();
            }

        } catch (error) {
            alert(error.message);
        }
    })
});

