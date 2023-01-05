const planSubmit = async (event) => {
    event.preventDefault();

    const plan_name = document.querySelector('#planName').value.trim();
    const description = document.querySelector('#description').value.trim();
    const startDate = new Date(document.querySelector('#startDate').value);

    console.log(plan_name, description, startDate.toISOString());

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
            end_date: 2024
        })
    })
    .catch(err => console.error('Error:', err));
}

document.querySelector('#planSubmit').addEventListener('click', planSubmit);