const planSubmit = async (event) => {
    event.preventDefault();

    const plan_name = document.querySelector('#planName').value.trim();
    const description = document.querySelector('#description').value.trim();
    const startDate = new Date(document.querySelector('#startDate').value);
    const endDate = new Date(document.querySelector('#endDate').value);

    await fetch('/api/planner', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            plan_name,
            description,
            start_date: startDate.toISOString(),
            end_date: endDate.toISOString()
        })
    })
    .catch(err => console.error('Error:', err));

    document.location.replace('/my-plans');
}

document.querySelector('#planSubmit').addEventListener('click', planSubmit);