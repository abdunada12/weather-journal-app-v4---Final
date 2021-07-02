/* Global Variables */
const btn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =  d.getDate()+'.'+(d.getMonth()+1)+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const apiKey = '46a53287560485d0d356aedd5b9c9c78'

// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', performAction)

// .then(console.log(data))

async function performAction(e){
    await getTemp()
    .then( async (jsonData)=> {
        const feeling = document.getElementById('feelings').value;
        // Function to POST data 
        await fetch('/takeData', {
            method:'POST',
            credentials:'same-origin',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Date: newDate,
                Temperature: jsonData.main.temp+' C',
                Feeling: feeling,
                CityName: jsonData.name
            }),
        })
        return await fetch('/sendData', {
            method:'GET',
            credentials:'same-origin',
        })
        
    })
    .then(async response=> {
        const data = await response.json()
        return data
    }
       )
    .then(async (data)=> {
        document.getElementById('date').innerHTML = '📆 Date is: '+ data[0].Date;
        document.getElementById('temp').innerHTML = '🌡 Temperature is: '+data[0].Temperature;
        document.getElementById('content').innerHTML = '🥴 Your feeling is: '+data[0].Feeling;
        document.getElementById('city').innerHTML = '🌎 City is: '+data[0].CityName;
})
    .catch(err=>err);
}

/* Function called by event listener */
async function getTemp(){ 
    try{
        zipCode = document.getElementById('zip').value;
        if (!zipCode){
            warningPrompt()
            return
        };
        const fullURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
        const response = await fetch(fullURL);
        if (response.status === 404 || response.status === 400){
            warningPrompt()
            return
        }
        const data = await response.json();
        // console.log(data);
        return data
    }catch(error){
        console.log(error);
    }
}
//function to bring pop up box when response is 404 or 400
const warningPrompt = function(){
    const warning = document.getElementById('black');
    const xButt = document.getElementById('x-butt');
    warning.style.display = 'grid';
    xButt.addEventListener('click', function(){
        warning.style.display = 'none'
    })
    setTimeout(()=> {
        warning.style.display = 'none'
    }, 5500)
}


