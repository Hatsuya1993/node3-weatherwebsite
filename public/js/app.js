console.log("Work")

document.querySelector("form").addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector(".data1").innerHTML = "Loading...."
    let val = (document.querySelector("input").value)
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + val + "&appid=3a6d6374813054bbbe5b1b5598a46169&units=metric").then((response) => {
        response.json().then((data) => {
            if (data.cod == 404) {
                // console.log("Error")
                document.querySelector(".data1").innerHTML = "Error"
            } else {
                // console.log(data.name)
                // console.log(data.coord.lat)
                // console.log(data.coord.lon)
                document.querySelector(".data1").innerHTML = data.name
                document.querySelector(".data2").innerHTML = data.coord.lat
                document.querySelector(".data3").innerHTML = data.coord.lon
                document.querySelector(".data4").innerHTML = data.main.temp
            }

        })
    })
})