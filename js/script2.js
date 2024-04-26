// import main from '../Crop_Yield_Prediction_ML model/predictCropYield'

function mainConentLoader() {

  // const linearRegressionPrediction = main();
    const container = document.getElementById('container');
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container-div');
    const lContent = document.createElement('div');
    lContent.classList.add('left-content');
    const formInput = document.createElement('form');
    formInput.classList.add('form-cont');
    const showTempDiv = document.createElement('div');
    showTempDiv.classList.add('show-temp-div');
    showTempDiv.innerHTML = '<p>Enter you location to get the details here.</p>';
    // geographical details
  
    const geoLoaderDiv = document.createElement('div');
    geoLoaderDiv.classList.add('geoLoaderStyle');
    geoLoaderDiv.innerHTML = 'Your location will be here';
    let cropyieldPrediction = Math.random() * 80;
  
   
  
    function takeInput() {
      formInput.innerHTML = `
      <label for="location">Enter the Location to get details</label><br><br>
      <input id='location' type="text" required><br><br>
      <input class="submit-btn" type="submit">
    `;
      lContent.append(formInput, geoLoaderDiv);
      contentContainer.appendChild(lContent);
      container.appendChild(contentContainer);
    }
    takeInput();
    // adding the div to show the temp details
    contentContainer.appendChild(showTempDiv);
  
    // fetch the weather api and console.log it
    async function renderShowTempDiv(weatherData) {
      const showTemp = document.createElement('div');
      const imageVar = document.createElement('img');
      imageVar.classList.add('showContImg');
  
      // get gif from giphy partSSS
  
  
      showTemp.classList.add('show-temp');
      showTempDiv.innerHTML = '';
      showTemp.innerHTML = `<p>Temp in celsius = ${weatherData.current.temp_c} °c<br>
                            
                               <br>Wind = ${weatherData.current.wind_kph}kph<br>
                               <br>Wind direction = ${weatherData.current.wind_dir}<br>
                               <br>Gust = ${weatherData.current.gust_kph}kph<br> 
                               <br>Condition = ${weatherData.current.condition.text}<br>
                               <br>Weather with in 3 months = ${weatherData.forecast.forecastday[2].day.condition.text}<br>
                               <br>Succeed rate for growing crops in this land is = ${cropyieldPrediction}<br>
                               <!--The code down below is the ml model's data -->
                               <!--<br>Succeed rate for growing crops in this land is = ${cropyieldPrediction}<br>-->
                              <br></p>`
                               ;
    
      
      console.log(weatherData.forecast.forecastday[2].day);
      showTempDiv.appendChild(showTemp);
    }
  
    function renderGeoLoader(weatherData) {

        
      const showLocation = document.createElement('div');
      showLocation.classList.add('showLocationStyle');
      geoLoaderDiv.innerHTML = '';
      latitude = weatherData.location.lat;
      longitude = weatherData.location.lon;
      showLocation.innerHTML = `<iframe width = "250px" height = "280px" src = "https://maps.google.com/maps?q=${latitude},${longitude}&hl=es;z=14&amp;output=embed" frameborder="0" marginheight="0" marginwidth="0"   style="border:0;" <iframe src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3444.528623711416!2d85.853742!3d20.31174!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDE4JzQyLjMiTiA4NcKwNTEnMTMuNSJF!5e1!3m2!1sen!2sus!4v1700317411209!5m2!1sen!2sus" width="600" height="450" style="border:0;"></iframe>`;
  
      geoLoaderDiv.appendChild(showLocation);
    }
  
    async function getApiDatas() {
      const getLocation = document.getElementById('location').value;
      try {
        const response = await fetch(`
        http://api.weatherapi.com/v1/forecast.json?key=10d8920911ff496591871009231009&q=${getLocation}&days=10&aqi=yes&alerts=yes`, { mode: 'cors' });
        const weatherData = await response.json();
        
        renderShowTempDiv(weatherData);
        renderGeoLoader(weatherData);
      } catch (err) {
      // eslint-disable-next-line no-alert
        alert('Enter a valid place');
      }
    }
  
    formInput.addEventListener('submit', (e) => {
      e.preventDefault();
      getApiDatas();
    });
  }
  
mainConentLoader()
  