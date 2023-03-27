function showDate() {
            let getHeading = document.querySelector("h1");
            let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
            let showDate = new Date().toLocaleString('en-US', options);
            getHeading.innerText = `${showDate}`;
        }

        window.onload = function () {
            showDate();
        };

        //--------->
        //uses the current coords to display the current weather in the location you are in 
        let apiKey = "cff2aa1e3c91c0248805f01bed83e69c";
        let geoLocationURL = "https://api.openweathermap.org/data/2.5/weather?"

        function showPosition(position) {
            console.log(position);
            let currentLatitude = position.coords.latitude;
            //let latitudeNumber = document.querySelector("#lat");
            //latitudeNumber.innerHTML = `${currentLatitude}`;

            let currentLongitude = position.coords.longitude;
            //let longitudeNumber = document.querySelector("#lon");
            //longitudeNumber.innerHTML = `${currentLongitude}`;

            let currentTemp = axios.get(`${geoLocationURL}&lat=${currentLatitude}&lon=${currentLongitude}&appid=${apiKey}&units=imperial`).then(

                function (response) {
                    console.log(response);
                    let currentTemp = Math.round(response.data.main.temp);
                    let currentTempDisplay = document.querySelector("#CurrentTemp");
                    currentTempDisplay.innerHTML = `The temperature in your location: ${currentTemp}ºF`;
                })
        }

        navigator.geolocation.getCurrentPosition(showPosition);

        //---------->
        //function allows user to click the button and it will display the current date and time - it is NOT pretty yet. 
        //function showDate() {
        //let getHeading = document.querySelector("h1");
        //let showDate = new Date();
        //getHeading.innerText = `${showDate}`;
        //}

        //let currentDate = document.querySelector("button");
        //currentDate.addEventListener("click", showDate);

        //---------->
        //when user submits a city in the input field, this function will start 
        function startSearch(event) {
            event.preventDefault();
            let searchInput = document.querySelector("#searchField");
            let searchInputValue = searchInput.value;
            let searchNotice = document.querySelector("h3");
            searchNotice.innerText = `Please wait, we are searching for... ${searchInputValue}`;

            // use searchInputValue variable to make API call (see below)
            makeAPICall(searchInputValue);
        }

        //---------->
        // use searchInputValue variable to make API call to Open Weather (see above)
        function makeAPICall(searchInputValue) {
            console.log("testing");
            console.log(searchInputValue);

            let apiKey = "cff2aa1e3c91c0248805f01bed83e69c";
            let weatherURL = "https://api.openweathermap.org/data/2.5/weather?"

            let currentTemp = axios.get(`${weatherURL}q=${searchInputValue}&units=imperial&appid=${apiKey}`).then(

                function (response) {
                    console.log(response);
                    let currentTemp = Math.round(response.data.main.temp);
                    console.log(currentTemp);

                    showTempOnScreen(currentTemp, searchInputValue);
                })
        }

        function showTempOnScreen(currentTemp, searchInputValue) {
            console.log(currentTemp);
            let cityTemp = document.querySelector("#reqestedCityTemp");
            cityTemp.innerHTML = `The current temperature in ${searchInputValue} is ${currentTemp}ºF`

        }

        let submitSearchData = document.querySelector("#searchForm");
        submitSearchData.addEventListener("submit", startSearch);
