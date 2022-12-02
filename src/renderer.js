/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
const path = require('path')
const crud = require(path.join(__dirname, 'src/CRUD.js'))
n = new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("curr_date").innerHTML = n.toISOString().slice(0, 10);
document.getElementById("id_input").value = n.toISOString().slice(0, 10);
for (let i = 0; i < document.querySelectorAll("#id_input4").length; i++) {
  document.querySelectorAll("#id_input4")[i].min = n.toISOString().slice(0, 10);
}
for (let i = 0; i < document.querySelectorAll("#id_input5").length; i++) {
  document.querySelectorAll("#id_input5")[i].readOnly = true
}

crud.Get_all(document.getElementById("id_input").value).then((data) => {
  console.log(data)
  table = document.getElementsByTagName("table")[0];
  var rows = table.querySelectorAll('tr');
  for (let i = 1; i < rows.length; i++) {
    rows[i].children[1].value = ""
    rows[i].children[2].children[0].value = ""
    rows[i].children[3].children[0].value = ""
    rows[i].children[4].children[0].value = ""
    rows[i].children[5].children[0].value = ""
    rows[i].children[6].children[0].value = ""
    rows[i].children[7].children[0].value = ""
    rows[i].children[8].children[0].value = ""
    rows[i].children[9].children[0].value = ""



  }
  for (let i = 1; i < rows.length; i++) {

    rows[i].children[1].value = data[i - 1].id
    rows[i].children[2].children[0].value = data[i - 1].number
    rows[i].children[3].children[0].value = data[i - 1].court
    rows[i].children[4].children[0].value = data[i - 1].complainant
    rows[i].children[5].children[0].value = data[i - 1].Defendant
    rows[i].children[6].children[0].value = data[i - 1].time
    rows[i].children[7].children[0].value = data[i - 1].notes
    rows[i].children[8].children[0].value = data[i - 1].Next_Date
    rows[i].children[9].children[0].value = data[i - 1].Prev_Date
    if (data.length == 1) break;

  }

})


function getVal() {
  const val = document.getElementById("id_input").value;
  document.getElementById("curr_date").innerHTML = val;
  //console.log(val);

  // data={
  //   "Date":val ,
  //   //"Curr":n.toISOString().slice(0, 10)
  // }
  crud.Get_all(val).then((data) => {
    console.log(data)
    if (data.length == 0) {
      table = document.getElementById("myTable");
      var rows = table.querySelectorAll('tr');

      for (let i = 1; i < rows.length; i++) {
        rows[i].children[1].value = ""

        rows[i].children[2].children[0].value = ""
        rows[i].children[3].children[0].value = ""
        rows[i].children[4].children[0].value = ""
        rows[i].children[5].children[0].value = ""
        rows[i].children[6].children[0].value = ""
        rows[i].children[7].children[0].value = ""
        rows[i].children[8].children[0].value = ""
        rows[i].children[9].children[0].value = ""

      }
    } else {
      table = document.getElementById("myTable");
      var rows = table.querySelectorAll('tr');
      for (let i = 1; i < rows.length; i++) {
        rows[i].children[1].value = ""
        rows[i].children[2].children[0].value = ""
        rows[i].children[3].children[0].value = ""
        rows[i].children[4].children[0].value = ""
        rows[i].children[5].children[0].value = ""
        rows[i].children[6].children[0].value = ""
        rows[i].children[7].children[0].value = ""
        rows[i].children[8].children[0].value = ""
        rows[i].children[9].children[0].value = ""

      }
      for (let i = 1; i < rows.length; i++) {
        rows[i].children[1].value = data[i - 1].id
        rows[i].children[2].children[0].value = data[i - 1].number
        rows[i].children[3].children[0].value = data[i - 1].court
        rows[i].children[4].children[0].value = data[i - 1].complainant
        rows[i].children[5].children[0].value = data[i - 1].Defendant
        rows[i].children[6].children[0].value = data[i - 1].time
      
        rows[i].children[7].children[0].value = data[i - 1].notes
        rows[i].children[8].children[0].value = data[i - 1].Next_Date
        rows[i].children[9].children[0].value = data[i - 1].Prev_Date
        if (data.length == 1) break;
      }

    }
  })
}

function getVal1() {
  const val = document.getElementById("weekly_date").value;

  var curr = new Date(val); // get current date
  var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  var last = first + 4; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first)).toISOString().slice(0, 10);
  var lastday = new Date(curr.setDate(last)).toISOString().slice(0, 10);
  console.log(lastday, firstday);

  crud.Get_weekly(firstday, lastday).then((data) => {
    console.log(data)
    if (data.length == 0) {
      table = document.getElementById("myTable1");
      var rows = table.querySelectorAll('tr');

      for (let i = 1; i < rows.length; i++) {
        rows[i].children[1].value = ""

        rows[i].children[2].children[0].value = ""
        rows[i].children[3].children[0].value = ""
        rows[i].children[4].children[0].value = ""
        rows[i].children[5].children[0].value = ""
        rows[i].children[6].children[0].value = ""
        rows[i].children[7].children[0].value = ""
        rows[i].children[8].children[0].value = ""
        rows[i].children[9].children[0].value = ""
      }
    } else {
      table = document.getElementById("myTable1");
      var rows = table.querySelectorAll('tr');
      for (let i = 1; i < rows.length; i++) {
        rows[i].children[1].value = ""
        rows[i].children[2].children[0].value = ""
        rows[i].children[3].children[0].value = ""
        rows[i].children[4].children[0].value = ""
        rows[i].children[5].children[0].value = ""
        rows[i].children[6].children[0].value = ""
        rows[i].children[7].children[0].value = ""
        rows[i].children[8].children[0].value = ""
        rows[i].children[9].children[0].value = ""
        
      }
      for (let i = 1; i < rows.length; i++) {
        rows[i].children[1].value = data[i - 1].id
        rows[i].children[2].children[0].value = data[i - 1].number
        rows[i].children[3].children[0].value = data[i - 1].court
        rows[i].children[4].children[0].value = data[i - 1].complainant
        rows[i].children[5].children[0].value = data[i - 1].Defendant
        rows[i].children[6].children[0].value = data[i - 1].time
        rows[i].children[7].children[0].value = data[i - 1].notes
        rows[i].children[8].children[0].value = data[i - 1].Next_Date
        rows[i].children[9].children[0].value = data[i - 1].Prev_Date
        if (data.length == 1) break;
      }

    }
  })

  // data={
  //   "Date":val ,
  //   //"Curr":n.toISOString().slice(0, 10)
  // }
  // crud.Get_all(val).then((data) => {
  //     console.log(data)
  //     if(data.length==0){
  //       table = document.getElementsByTagName("table")[0];
  //       var rows = table.querySelectorAll('tr');

  //        for (let i = 1; i < rows.length; i++) {
  //          rows[i].children[1].value = ""

  //          rows[i].children[2].children[0].value = ""
  //          rows[i].children[3].children[0].value = ""
  //          rows[i].children[4].children[0].value = ""
  //          rows[i].children[5].children[0].value = ""
  //          rows[i].children[6].children[0].value = ""
  //          rows[i].children[7].children[0].value = ""
  //        }
  //     }else{
  //       table = document.getElementsByTagName("table")[0];
  //       var rows = table.querySelectorAll('tr');
  //       for (let i = 1; i < rows.length; i++) {
  //         rows[i].children[1].value = ""
  //         rows[i].children[2].children[0].value = ""
  //         rows[i].children[3].children[0].value = ""
  //         rows[i].children[4].children[0].value = ""
  //         rows[i].children[5].children[0].value = ""
  //         rows[i].children[6].children[0].value = ""
  //         rows[i].children[7].children[0].value = ""
  //       }
  //        for (let i = 1; i < rows.length; i++) {
  //         rows[i].children[1].value = data[i-1].id
  //         rows[i].children[2].children[0].value = data[i-1].court
  //         rows[i].children[3].children[0].value = data[i-1].complainant
  //         rows[i].children[4].children[0].value = data[i-1].Defendant
  //         rows[i].children[5].children[0].value = data[i-1].notes
  //         rows[i].children[6].children[0].value = data[i-1].Next_Date
  //         rows[i].children[7].children[0].value = data[i-1].Prev_Date
  //          if (data.length == 1) break;
  //        }

  //   }
  //   })
}


$('.submit').on('click', function (event) {
  event.preventDefault();
  const val = document.getElementById("id_input").value;
  //let val2=val==''? n.toISOString().slice(0, 10):val

  inserted_data = [$(this).closest('tr').find('input[id="id_input1.5"]').val(), $(this).closest('tr').find('input[id="id_input1"]').val(),
  $(this).closest('tr').find('input[id="id_input2"]').val(),
  $(this).closest('tr').find('input[id="id_input3"]').val(), $(this).closest('tr').find('input[id="id_input3.55"]').val(),$(this).closest('tr').find('input[id="id_input3.5"]').val(),
  $(this).closest('tr').find('input[id="id_input4"]').val() == '' ? null : $(this).closest('tr').find('input[id="id_input4"]').val(),
    null,
  document.getElementById("id_input").value]



  inserted_data2 = [$(this).closest('tr').find('input[id="id_input1.5"]').val(), $(this).closest('tr').find('input[id="id_input1"]').val(),
  $(this).closest('tr').find('input[id="id_input2"]').val(),
  $(this).closest('tr').find('input[id="id_input3"]').val(), $(this).closest('tr').find('input[id="id_input3.55"]').val(),$(this).closest('tr').find('input[id="id_input3.5"]').val(),
    null,
  document.getElementById("id_input").value,
  $(this).closest('tr').find('input[id="id_input4"]').val() == '' ? null : $(this).closest('tr').find('input[id="id_input4"]').val()
  ]

  crud.insert(inserted_data)
  crud.insert(inserted_data2)

});

document.getElementById("export").addEventListener('click', () => {
  html2canvas(document.getElementById('export_div'))
    .then(canvas => {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.setAttribute('download', 'imageName. png');
      a.setAttribute("href", url);
      a.click();

    })
})
document.getElementById("export1").addEventListener('click', () => {
  html2canvas(document.getElementById('export_div1'))
    .then(canvas => {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.setAttribute('download', 'imageName. png');
      a.setAttribute("href", url);
      a.click();

    })
})