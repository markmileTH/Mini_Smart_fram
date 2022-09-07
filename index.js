// const { count } = require("console");

google.charts.load('current', {
    'packages': ['corechart', 'bar']
});
google.charts.setOnLoadCallback(loadTable);



const image1 = "https://cors-anywhere.herokuapp.com/https://thingspeak.com/channels/1826094/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15";
const image2 = "https://cors-anywhere.herokuapp.com/https://thingspeak.com/channels/1826094/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15";
const image3 = "https://cors-anywhere.herokuapp.com/https://thingspeak.com/channels/1826094/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15";


//  function loadPosts() {
//      const getBtn = document.getElementById('get-data_iot');
//      const getcreated_at = document.getElementById('created_at');
//      const getentry_id = document.getElementById('entry_id');
//      const getHumidity = document.getElementById('Humidity');
//      const getTemperature = document.getElementById('Temperature');
//      const getSoil_moisture = document.getElementById('Soil_moisture')
//      const getph = document.getElementById('ph')

//      const getdata = () => {
//          axios.get('https://api.thingspeak.com/channels/1826094/fields/1,2,3,4.json').then(response => {
//              console.log(response);
//              getcreated_at.innerHTML = response.data.created_at;
//              getentry_id.innerHTML = response.data.entry_id;
//              getHumidity.innerHTML = response.data.field1;
//              getTemperature.innerHTML = response.data.field2;
//              getSoil_moisture.innerHTML = response.data.field3
//              getph.innerHTML = response.data.field4;

//         });
//      };
//      getBtn.addEventListener('click', getdata);
//  }

//  function loadPosts() {
//       $("#mytable").empty();
//      // $("#main").show();
//      // $("#details").hide();

//      var url = "https://api.thingspeak.com/channels/1826094/fields/1,2,3,4.json";


//      $.getJSON(url)
//           .done((data) => {
//                $.each(data, (key, value) => {
//                     console.log(data);
//                     var line = "<tr>";
//                     line += "<td>" + value.created_at +"</td>";
//                     line += "<td><b>" + value.id+ "</b><br/>";
//                     line += "<td>"+value.field1 + "</td>";
//                     line += "<td>"+value.field2+ "</td>"
//                     line += "<td>"+value.field3+ "</td>"
//                     line += "<td>"+value.field4+ "</td>"
//                     line += "</tr>";

//                    $("#mytable").append(line);

//               });

//          })
//          .fail((xhr, status, error) => {
//          })
// }





function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/iot_data");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            var num = 1;
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {

                trHTML += '<tr>';
                trHTML += '<td>' + num + '</td>';
                trHTML += '<td>' + object['created_at'] + '</td>';
                trHTML += '<td>' + object['Humidity'] + '</td>';
                trHTML += '<td>' + object['Temperature'] + '</td>';
                trHTML += '<td>' + object['Soil_moisture'] + '</td>';
                trHTML += '<td>' + object['ph'] + '</td>';
                trHTML += '<td>';
                trHTML += '<a type="button" id="edit" class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
                trHTML += "</tr>";

                num++;
            };
            document.getElementById("mytable").innerHTML = trHTML;

            loadGraph();

        }
    };
}



function loadQueryTable() {
    document.getElementById("mytable").innerHTML = "<tr><th scope=\"row\" colspan=\"5\">Loading...</th></tr>";
    const searchText = document.getElementById('searchTextBox').value;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/iot_data/created_at/" + searchText);

    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var trHTML = '';
            var num = 1;
            const objects = JSON.parse(this.responseText).IOT_DATA2;
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + num + '</td>';
                trHTML += '<td>' + object['created_at'] + '</td>';
                trHTML += '<td>' + object['Humidity'] + '</td>';
                trHTML += '<td>' + object['Temperature'] + '</td>';
                trHTML += '<td>' + object['Soil_moisture'] + '</td>';
                trHTML += '<td>' + object['ph'] + '</td>';
                trHTML += '<td>';
                trHTML += '<a type="button"  class="btn btn-outline-secondary" onclick="showCompliantEditBox(\'' + object['_id'] + '\')"><i class="fas fa-edit"></i></a>';
                trHTML += '<a type="button" class="btn btn-outline-danger" onclick="compliantDelete(\'' + object['_id'] + '\')"><i class="fas fa-trash"></i></a></td>';
                trHTML += "</tr>";
                num++;


            }
            console.log(trHTML);
            document.getElementById("mytable").innerHTML = trHTML;

        }
    };
}

function loadGraph() {
    var Hemidity = 0;
    var Temperature = 0;
    var Soil_moisture = 0;
    var ph = 0;
    // var closeMo = 0;
    // var closeNonMo = 0;
    // var other = 0;

    // var Web = 0;
    // var Phone = 0;
    // var Fax = 0;
    // var Postal = 0;
    // var Referral = 0;
    // var subother = 0;

    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/iot_data");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                switch (object['IOT_DATA']) {
                    case "ความชื้นในอากาศ":
                        Hemidity = Hemidity + 1;
                        break;
                    case "อุณหภูมิ":
                        Temperature = Temperature + 1;
                        break;
                    case "ความชื้นในดิน":
                        Soil_moisture = Soil_moisture + 1;
                        break;
                    case "ค่า ph ในดิน":
                        ph = ph + 1;
                        break;

                }
            }

            var TimelyResponseData = google.visualization.arrayToDataTable([
                ['IOT_DATA', 'Case'],
                ['ความชื้นในอากาศ', Hemidity],
                ['อุณหภูมิ', Temperature],
                ['ความชื้นในดิน', Soil_moisture],
                ['ค่า ph ในดิน', ph],
            ]);

            var optionsTimelyResponse = { title: 'Timely Response Stats (Latest  10000 cases)' };
            var chartTimelyResponse = new google.visualization.PieChart(document.getElementById('piechartTimelyResponse'));
            chartTimelyResponse.draw(TimelyResponseData, optionsTimelyResponse);

            var dataSubmitted = google.visualization.arrayToDataTable([
                ['Submitted Via', 'Number', {
                    role: 'style'
                }, {
                        role: 'annotation'
                    }],
                ['Hemidity ', Hemidity, 'gold', 'Hemidity '],
                ['Temperature ', Temperature, 'color: #F65A83', 'Temperature '],
                ['Soil_moisture', Soil_moisture, 'color: #F9F5EB', 'Soil_moisture'],
                ['ph', Referral, 'color: #607EAA', 'ph'],
            ]);

            var optionSubmitted = {
                title: 'Submitted Via Stats (Latest  10000 cases)',
                legend: { position: 'none' }
            };

            var chartSubmitted = new google.visualization.BarChart(document.getElementById('barchartSubmitted'));
            chartSubmitted.draw(dataSubmitted, optionSubmitted);
        }
    };


}

function showCompliantCreateBox() {

    var d = new Date();
    // const date = d.toISOString().split('T')[0]

    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
     
    // console.log(dateTime)

    Swal.fire({
        title: 'Create Data',
        html: '<input id="created_at" class="swal2-input" placeholder="created_at" type="hidden" value="' + dateTime + '">' +

            '<div class="mb-3"><label for="humidity" class="form-label">Humidity</label>' +
            '<input class="form-control" id="Humidity" placeholder="Humidity"></div>' +
            '<div class="mb-3"><label for="Product" class="form-label">Temperature</label>' +
            '<input class="form-control" id="Temperature" placeholder="Temperature"></div>' +
            '<div class="mb-3"><label for="Sub_product" class="form-label">Soil_moisture</label>' +
            '<input class="form-control" id="Soil_moisture" placeholder="Soil_moisture"></div>' +
            '<div class="mb-3"><label for="Issue" class="form-label">ph</label>' +
            '<input class="form-control" id="ph" placeholder="ph"></div>',


        focusConfirm: false,
        preConfirm: () => {
            compliantCreate();
        }
    });
}

function compliantCreate() {
    const created_at = document.getElementById("created_at").value;
    const Humidity = document.getElementById("Humidity").value;
    const Temperature = document.getElementById("Temperature").value;
    const Soil_moisture = document.getElementById("Soil_moisture").value;
    const ph = document.getElementById("ph").value;


    console.log(JSON.stringify({
        'created_at': created_at,
        created_at: created_at,
        'Humidity': Humidity,
        Humidity: Humidity,
        'Temperature': Temperature,
        Temperature: Temperature,
        'Soil_moisture': Soil_moisture,
        Soil_moisture: Soil_moisture,
        'ph': ph,
        ph: ph,


    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:3001/iot_data/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        'created_at': created_at,
        created_at: created_at,
        'Humidity': Humidity,
        Humidity: Humidity,
        'Temperature': Temperature,
        Temperature: Temperature,
        'Soil_moisture': Soil_moisture,
        Soil_moisture: Soil_moisture,
        'ph': ph,
        ph: ph

    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Create Compliant Successfully!',
                'success'
            );
            loadTable();
            console.log(objects);
        }
    };
}

function compliantDelete(id) {
    console.log("Delete: ", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:3001/iot_data/delete");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Delete Compliant Successfully!',
                'success'
            );
            loadTable();
        }
    };
}

function showCompliantEditBox(id) {
    
    console.log("edit", id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:3001/iot_data/update" + id);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const object = JSON.parse(this.responseText).IOT_DATA2;
            console.log("showCompliantEditBox", object);
            Swal.fire({
                title: 'Edit data',
                html: '<input id="id" class="swal2-input" placeholder="ID" type="hidden" value="' + object['_id'] + '"><br>' +
                    '<div class="mb-3"><label for="Date_received" class="form-label">Date received</label>' +
                    '<input class="form-control" id="created_at" placeholder="created_at" value="' + object['created_at'] + '"></div>' +
                    '<div class="mb-3"><label for="Product" class="form-label">Product</label>' +
                    '<input class="form-control" id="Humidity" placeholder="Humidity" value="' + object['Humidity'] + '"></div>' +
                    '<div class="mb-3"><label for="Sub_product" class="form-label">Sub-product</label>' +
                    '<input class="form-control" id="Temperature" placeholder="Temperature" value="' + object['Temperature'] + '"></div>' +
                    '<div class="mb-3"><label for="Issue" class="form-label">Issue</label>' +
                    '<input class="form-control" id="Soil_moisture" placeholder="Soil_moisture" value="' + object['Soil_moisture'] + '"></div>' +
                    '<div class="mb-3"><label for="Sub_issue" class="form-label">Sub-issue</label>' +
                    '<input class="form-control" id="ph" placeholder="ph" value="' + object['ph'] + '"></div>' ,  
                focusConfirm: false,
                preConfirm: () => {
                    userEdit();
                }
            });
        }
    };
}

function userEdit() {
    const id = document.getElementById("id").value;
    const created_at = document.getElementById("created_at").value;
    const Humidity = document.getElementById("Humidity").value;
    const Temperature = document.getElementById("Temperature").value;
    const Soil_moisture = document.getElementById("Soil_moisture").value;
    const ph = document.getElementById("ph").value;

    console.log(JSON.stringify({
        "_id": id,
        "created_at": created_at,
        Humidity: Humidity,
        "Temperature": Temperature,
        Soil_moisture : Soil_moisture ,
        "ph ": ph 
     
    }));

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:3001/iot_data/update");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({
        "_id": id,
        'created_at': created_at,
        created_at: created_at,
        'Humidity': Humidity,
        Humidity: Humidity,
        'Temperature': Temperature,
        Temperature: Temperature,
        'Soil_moisture': Soil_moisture,
        Soil_moisture: Soil_moisture,
        'ph': ph,
        ph: ph
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(
                'Good job!',
                'Update Compliant Successfully!',
                'success'
            )
            loadTable();
        }
    };
}


// // contentScript.js
// function fetchResource(input, init) {
//     return new Promise((resolve, reject) => {
//         chrome.runtime.sendMessage({ input, init }, messageResponse => {
//             const [response, error] = messageResponse;
//             if (response === null) {
//                 reject(error);
//             } else {
//                 // Use undefined on a 204 - No Content
//                 const body = response.body ? new Blob([response.body]) : undefined;
//                 resolve(new Response(body, {
//                     status: response.status,
//                     statusText: response.statusText,
//                 }));
//             }
//         });
//     });
// }

// // // background.js
//  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//      fetch(request.input, request.init).then(function (response) {
//          return response.text().then(function (text) {
//              sendResponse([{
//                  body: text,
//                  status: response.status,
//                  statusText: response.statusText,
//              }, null]);
//         });
//      }, function (error) {
//          sendResponse([null, error]);
//      });
//      return true;
//  });

function edit(){
    
$("#edit").click(function () {
    const id = document.getElementById("id").value;
    const created_at = document.getElementById("created_at").value;
    const Humidity = document.getElementById("Humidity").value;
    const Temperature = document.getElementById("Temperature").value;
    const Soil_moisture = document.getElementById("Soil_moisture").value;
    const ph = document.getElementById("ph").value;
    if ($("#red_euser1").prop("checked") == true) {
         txtactive = "1";
    }
    if (idPharmacy && PharmacyName && PharmacyType && Price) {
         $.ajax({
              url: 'http://localhost:3001/iot_data/update',
              type: 'PUT',
              data: {
                   id: id,
                   created_at: created_at,
                   Humidity: Humidity,
                   Temperature: Temperature,
                   Soil_moisture: Soil_moisture,
                   ph:ph
                   //active_flag: txtactive,
              },
              success: function (data) {
                   console.log(data);
                   if (!data.error) {
                        swal("บันทึกข้อมูลเรียบร้อย");
                   } else {
                        swal("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
                   }
                   $("#editUserModal").modal('toggle');
                   loadUsers();
              }
         });
    } else {
         swal("กรุณากรอกข้อมูลให้ครบถ้วน")
    }
});
loadTable();
}


