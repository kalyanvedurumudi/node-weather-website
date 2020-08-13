console.log('client side js')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.querySelector('#msg-1');
const p2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    p1.textContent = 'Loading...';
    fetch('/weather?address=' + search.value).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                p1.textContent = '';
                p2.textContent = data.error;
            } else {
                p2.textContent = '';
                p1.textContent = data.location;
            }

            console.log(data);
        })
    });
});

