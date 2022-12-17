const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./AGENDA.db');


db.run(`CREATE TABLE IF NOT EXISTS "CRUD_crud" ("id" integer NOT NULL PRIMARY KEY AUTOINCREMENT, "number" varchar(1000) NULL,"court" varchar(1000) NULL, "complainant" varchar(1000) NULL, "Defendant" varchar(1000) NULL, "number_AD" varchar(15) NULL,"notes" varchar(2900) NULL, "Next_Date" date NULL, "Prev_Date" date NULL, "Curr_Date" date NULL)`);



exports.insert = function(arr) {


	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run('INSERT INTO CRUD_crud(number,court,complainant,Defendant,number_AD,notes,Next_Date,Prev_Date,Curr_Date) VALUES(?,?,?,?,?,?,?,?,?)', arr, (err) => {
				if(err) {
					// console.log(err.message)
				  resolve(400); 
				}
				resolve(200);
			  })
		});
	});

  
};

exports.delete = function(number) {

	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.run(`delete from CRUD_crud where number = "${number}"`, (err) => {
				if(err) {
				  // console.log(err.message)
				 resolve(err.message); 
				}
				resolve(200) ;
			  });
			
		});
	});

  };

  exports.update = function(number , arr) {
	// console.log(number , arr);
	var number1=0
	var ids=[]
	db.all(`select number from CRUD_crud where id = ${number}`, (err, rows) => {
		if (err) {
			reject(err);}
		for (let i of rows) {
			number1=i.number
		}
		db.all(`select id from CRUD_crud where number = "${number1}"`, (err, rows) => {
			if (err) {
				reject(err);}
			
			for (let i of rows) {
				ids.push(i.id)
			}
	
			ids=ids.toString()
			// console.log(`update CRUD_crud set number = ${arr[0]} , court = "${arr[1]}" , complainant = "${arr[2]}" , Defendant = "${arr[3]}" , number_AD = "${arr[4]}" , notes = "${arr[5]}" , Next_Date= "${arr[6]}" , Prev_Date = "${arr[7]}"  where id in (${ids})`);
			// console.log(ids);
	
			db.run(`update CRUD_crud set number = ${arr[0]} , court = "${arr[1]}" , complainant = "${arr[2]}" , Defendant = "${arr[3]}" , number_AD = "${arr[4]}" , notes = "${arr[5]}" , Next_Date= "${arr[6]}" , Prev_Date = "${arr[7]}"  where id in (${ids})`, (err) => {
			  if(err) {
				// console.log(err.message);
		
				return 400
			  }
			  return 200;
			})
		});
	});
  };  


// exports.Get_all = function (date) {
//   let rows1
//   db.all(`select * from CRUD_crud where Curr_Date = "2022-11-20"`, (err,rows) => {
//     if(err) {
//       return console.log(err.message); 
//     }
//     rows1=rows
//     console.log(rows1);
//   })

// }

exports.Get_all = (data) => {
//   console.log(`"${data}"`);
	return new Promise((resolve, reject) => {
		db.serialize(() => {
			db.all(`select * from CRUD_crud where Curr_Date = "${data}"`, (err, rows) => {
				if (err) reject(err);
				resolve(rows);
				// console.log(rows);
			});
		});
	});
};


exports.Get_weekly = (first,last) => {
	  return new Promise((resolve, reject) => {
		  db.serialize(() => {
			  db.all(`select * from CRUD_crud where Next_Date IS NOT NULL and Next_Date between "${first}" and "${last}"`, (err, rows) => {
				  if (err) reject(err);
				//   console.log(rows);
				  resolve(rows);
			  });
		  });
	  });
  };



