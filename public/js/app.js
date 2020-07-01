const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
const msgOne = document.querySelector('#msg-1');
const msgTwo = document.querySelector('#msg-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = searchTerm.value;

    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch('/weather?address=' + location ).then( (response) => {
     response.json().then( (data) => {
        if(data.err) {
            msgOne.textContent = data.err;
        } else {
            msgOne.textContent = data.location;
            msgTwo.textContent = data.forecast;
        }
      })
       
    })

})
