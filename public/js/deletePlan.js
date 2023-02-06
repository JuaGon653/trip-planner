const xImgEl = document.querySelectorAll('.x-image');

const deletePlan = async (event) => {
    const id = event.currentTarget.dataset.planid;

    await fetch(`/api/planner/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    document.location.reload();
}

for (let i = 0; i < xImgEl.length; i++) {
    xImgEl[i].addEventListener('click', deletePlan);
}