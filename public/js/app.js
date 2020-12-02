const weatherForm = document.querySelector('form');
const searchItem = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
let units = 'm';

function updateUnit(){
    units = document.getElementById("unitSelect").value;
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();     //  Prevents page auto-reloading
    
    const location = searchItem.value;

    //  Messages to show when loading, also clears text when doing another search
    messageOne.textContent = 'Loading information...';
    messageTwo.textContent = '';

    //  Fetching new weather data
    fetch('/weather?address=' + location + '&units=' + units).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    });
});