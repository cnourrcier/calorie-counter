fetch('/view-calories-history')
    .then(res => res.json())
    .then(data => {
        const caloriesHistoryDiv = document.getElementById('calories-history');
        data.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.textContent = JSON.stringify(entry);
            caloriesHistoryDiv.appendChild(entryDiv);
        })
    })
    .catch(error => console.error('Error fetching data:', error));