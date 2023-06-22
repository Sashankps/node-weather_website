const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const dataMsg = document.querySelector('#data-message');
const errorMsg = document.querySelector('#error-message');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;

  dataMsg.textContent = 'Loading...';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          errorMsg.textContent = data.error;
        } else {
          dataMsg.textContent = data.forecast;
        }
      });
    }
  );
});
