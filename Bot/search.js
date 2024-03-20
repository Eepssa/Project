const express=require('express')

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/weather',async (req,res)=>{
//    console.log(req.body.search)
//    res.end(req.body.search)

        const searchValue = req.body.search;
        const { keyword, location } = getInfo(searchValue);
        console.log(keyword)
        console.log(location)
        if (!keyword || !location) {
            return res.status(400).send('Invalid query');
        }

        try {
            let responseMessage = '';
            const weatherData = await getWeatherData(location);
            if (keyword === 'temp'|| keyword==='temperature') {
                responseMessage = `The temperature in ${location} is ${weatherData.main.temp}K.`;
            } else if (keyword === 'weather'||keyword==='climate') {
                responseMessage = `The weather in ${location} is ${weatherData.weather[0].description}.`;
            } 
            else if (keyword === 'visibility') {
                responseMessage = `The visibility in ${location} is ${weatherData.visibility} meters.`;
            } else if (keyword === 'pressure') {
                responseMessage = `The pressure in ${location} is ${weatherData.main.pressure} hPa.`;
            } else if (keyword === 'humidity') {
                responseMessage = `The humidity in ${location} is ${weatherData.main.humidity}%.`;
            } 
            else if (keyword === 'wind' || keyword === 'wind speed') {
                responseMessage = `The wind speed in ${location} is ${weatherData.wind.speed} meters per second.`;
            }
            else {
                responseMessage = 'Invalid keyword. Supported keywords are "temp" and "weather".';
            }
    
            res.send(responseMessage);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            res.status(500).send('Error fetching weather data. Please try again later.');
        }


    function getInfo(searchValue){
        const keywords=['temp','temperature','weather','climate','visibility','pressure','humidity','wind speed','wind'];
        const words=searchValue.toLowerCase().split(' ');
        console.log(words);
        let location=words[words.length -1];
        let keyword=''

        for(const word of words){
            if(keywords.includes(word)){
                keyword=word;
            }
        }
        return { keyword, location };
    }
})

async function getWeatherData(location){
    const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a9b5869cd05d313d1f5559ceb1665400`)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}



app.listen(3000,()=>{
    console.log('server started')
})
