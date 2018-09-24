'use strict';
const bodyParser = require('body-parser')
const express = require('express');
const fs = require('fs');
const https = require("https");

const app = express();

const darkSkyAPI = 'ENTER-YOUR-API-KEY';
const httpPromise = (url) => {
  return new Promise(function(resolve, reject) {
		https.get( url, resp => {
			resp.setEncoding("utf8");
		  let body = "";
		  resp.on("data", data => { body += data });
		  resp.on("end", () => {
		    try {
					body = JSON.parse(body);
        } catch(e) {
          reject(e);
        }
				resolve(body);
			});
			resp.on('error', err => reject(err));
		});
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*Endpoint to get the week's details TODO - implement a caching system*/
app.post('/api/v1/getWeek', (req, res) => {
	
	let week = [];
	let d = new Date();
	let day = d.getDay(),
			diff = d.getDate() - day - 6 + (day == 0 ? -6:1); // adjust when day is sunday
	
	const url = 'https://api.darksky.net/forecast/' + darkSkyAPI + '/' + req.body.coords + ',';
	const params = '?exclude=hourly,currently,flags';
	
	//We calculate the last Monday
	let lastMonday = new Date(d.setDate(diff));
	lastMonday.setHours(0);
	lastMonday.setMinutes(0);
	lastMonday.setSeconds(0);
	
	//Ugly way to chain up HTTP requests
	httpPromise( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params ).then( (body) => {
			week.push(...body.daily.data);
			lastMonday = new Date(lastMonday.setDate( lastMonday.getDate() + 1 ));
			
			//Second
			httpPromise( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params ).then( (body) => {
				week.push(...body.daily.data);
				lastMonday = new Date(lastMonday.setDate( lastMonday.getDate() + 1 ));
				
				//Third
				httpPromise( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params ).then( (body) => {
					week.push(...body.daily.data);
					lastMonday = new Date(lastMonday.setDate( lastMonday.getDate() + 1 ))
					
					//Forth
					httpPromise( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params ).then( (body) => {
						week.push(...body.daily.data);
						lastMonday = new Date(lastMonday.setDate( lastMonday.getDate() + 1 ))
						
						//Fifth
						httpPromise( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params ).then( (body) => {
							week.push(...body.daily.data);
							lastMonday = new Date(lastMonday.setDate( lastMonday.getDate() + 1 ))
							
							//Sixth
							httpPromise( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params ).then( (body) => {
								week.push(...body.daily.data);
								lastMonday = new Date(lastMonday.setDate( lastMonday.getDate() + 1 ))
								
								//Seventh
								httpPromise( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params ).then( (body) => {
									week.push(...body.daily.data);
									week[0]["dayName"] = "Mon";
									week[1]["dayName"] = "Tue";
									week[2]["dayName"] = "Wed";
									week[3]["dayName"] = "Thu";
									week[4]["dayName"] = "Fri";
									week[5]["dayName"] = "Sat";
									week[6]["dayName"] = "Sun";
									week[0]["nonce"] = (new Date().getTime());

									res.json(week);
								});
							});
						});
					});
				});
			});
	})

});

/*Endpoint to get the day's details*/
app.post('/api/v1/getDay', (req, res) => {
	
	let d = new Date();
	let day = d.getDay(),
			diff = d.getDate() - day - 6 + (day == 0 ? -6:1); // adjust when day is sunday
	
	const url = 'https://api.darksky.net/forecast/5a34f2b02774c7083f62113e2401aff9/' + req.body.coords + ',';
	const params = '?exclude=currently,flags';
	
	//We calculate the last Monday
	let lastMonday = new Date(d.setDate(diff));
	lastMonday.setHours(0);
	lastMonday.setMinutes(0);
	lastMonday.setSeconds(0);
	lastMonday = new Date(lastMonday.setDate( lastMonday.getDate() + parseInt(req.body.dayIndex, 10) + 1 ));
	
	https.get( url + (parseInt(lastMonday.getTime() / 1000, 10)) + params, resp => {
		resp.setEncoding("utf8");
		let body = "";
		resp.on("data", data => { body += data });
		resp.on("end", () => {
			body = JSON.parse(body);
			body.nonce = (new Date().getTime());

			res.json(body);
		});
	});
})

/*Endpoint to get the US States (Courtesy of simplemaps.com)*/
app.get(/^\/api\/v1\/cities\/([^\/]+)\/$/, (req, res, next) => {
	try {
		fs.readFile(require.resolve('./cities/'+req.params[0]+'.json'), (err, data) => {
	    if (err) {
				next(err)
			}
	    else
				res.json(JSON.parse(data))
	  });
	}
	catch(err) {
		res.status(404).send('Not found');
		console.log(err);
	}
});

/*Endpoint to get the US Cities (Courtesy of simplemaps.com)*/
app.get(/^\/api\/v1\/cities\/([^\/]+)\/([^\/]+)\/$/, (req, res, next) => {
	try {
		fs.readFile(require.resolve('./cities/'+req.params[0]+'/'+req.params[1]+'.json'), (err, data) => {
	    if (err) {
				next(err)
			}
	    else
				res.json(JSON.parse(data))
	  });
	}
	catch(err) {
		res.status(404).send('Not found');
		console.log(err);
	}
});

const port = 5000;
app.listen(port, ()=> console.log(`Server started on port ${port}`))
