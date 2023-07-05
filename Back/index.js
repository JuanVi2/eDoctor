'use strict'

const port = process.env.PORT || 3000;
const miIp = 'localhost';

const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const validator = require('validator');
var helmet = require('helmet');
const multer = require ('multer');
const upload = multer({storage:multer.memoryStorage()});

const app = express();
app.use(helmet());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const mysql = require('mysql');

const config = {
	host: 'localhost',
	user: 'root',
	password: "root",
	database: 'eDoctor'
};

const cors = require('cors');
const PoolCluster = require('mysql/lib/PoolCluster');
const { table } = require('console');

var allowCrossTokenHeader = (req, res, next) => {
	res.header("Access-Control-Allow-Headers", "*");
	return next();
};

var allowCrossTokenOrigin = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	return next();
};

app.use(cors());
app.use(allowCrossTokenHeader);
app.use(allowCrossTokenOrigin);
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));


const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken')
const jwt = require('./services/token.service');
const pool = mysql.createPool(config);
module.export = pool;


app.listen(port, () => {
	console.log(`Servidor ejecutándose en ${miIp}:${port}`);
})

/////////////////////////////////////////////////////////////////////////////////////////

// Authorization: Bearer <token>
function verifyToken(req, res, next) {
	const bearerHeader = req.headers['authorization'];

	if (typeof bearerHeader !== 'undefined') {
		const bearerToken = bearerHeader.split(" ")[1];
		req.token = bearerToken;
		next();
	}
	else {
		res.status(403);
	}
}

app.post('/api/login', (req, res) => {
	var email = req.body.EMAIL;
	var password = req.body.PASSWORD;
	var switchDB = "USER";
	var user;

	if (validator.isEmpty(email) || validator.isEmpty(password)) {
		res.status(400).json('Ni el email ni la contraseña pueden estar vacíos');
	} else {
		pool.query(`SELECT * FROM ${switchDB} WHERE email = '${email}'`, (err, result) => {
			if (err) {
				res.status(500).json(
					{
						mensaje: 'Error en la conexión con la base de datos',
						error: err
					});
			}
			else if (result.length > 0) {
				const myUser = Object.values(JSON.parse(JSON.stringify(result)))[0];
				//console.log(myUser)
				if (bcrypt.compareSync(password, myUser.PASSWORD)) {
					res.status(200).json({
						message: 'Login OK',
						token: jwt.createToken(myUser),
						user: myUser
					});
					//console.log(myUser)
				}
				else {
					res.status(400).json('La password no coincide');
				}
			}
			else {
				res.status(404).json('El email no está registrado en la base de datos');
			}
		});
	}
});

function generateAccesToken(email) {
	return jwt.sign(email, 'mysecretkey');
}

app.post('/api/register', (req, res) => {
	var email_registro = req.body.EMAIL;
	var password_registro = req.body.PASSWORD;
	var name_registro = req.body.NAME;
	var age_registro = req.body.AGE;
	var switchDB = "USER";
	
	// Comprobamos que los campos obligatorios no están vacíos
	if (validator.isEmpty(email_registro) || validator.isEmpty(password_registro) || validator.isEmpty(name_registro) || validator.isEmpty(age_registro)) {
		res.status(400).json('Ningun campo puede estar vacío');
	}
	else {
		pool.query(`SELECT email FROM USER WHERE email = '${email_registro}'`, (err, result) => {
			if (err) res.status(500).json(err);
			else {
				console.log(result);
				if (result.length > 0)
					res.status(400).json('Ese email ya existe');
				else {
					var newUser = {
						'name': name_registro,
						'password': password_registro,
						'age': age_registro,
						'email': email_registro
					}
					newUser.password = bcrypt.hashSync(newUser.password, 10);
				
					pool.query(`INSERT INTO ${switchDB} SET ?`, newUser, (err, result) => {
						if (err) res.status(500).send(err);
						else res.status(200).json({
							user: 'newUser',
							message: 'Registro OK',
							token: jwt.createToken(newUser)
						})
					});
				}
			}
		});
	}
});

/*app.post('/api/register', (req, res) => {
	var email_registro = req.body.EMAIL;
	var password_registro = req.body.PASSWORD;
	var name_registro = req.body.NAME;
	var username_registro = req.body.USERNAME;
	var birth_date_registro = req.body.BIRTH_DATE;
	var db = req.body.isAdmin;
	var switchDB;

	if(db){
		switchDB = "ADMIN";
	}
	else{
		switchDB = "USER"
	}
	// Comprobamos que los campos obligatorios no están vacíos
	if (validator.isEmpty(email_registro) || validator.isEmpty(password_registro)) {
		res.status(400).json('Ni el email ni la contraseña pueden estar vacíos');
	}
	else {
		pool.query(`SELECT email FROM USER WHERE email = '${email_registro}'`, (err, result) => {
			if (err) res.status(500).json(err);
			else {
				console.log(result);
				if (result.length > 0)
					res.status(400).json('Ese email ya existe');
				else {
					var newUser = {
						'name': name_registro,
						'username': username_registro,
						'password': password_registro,
						'birth_date': birth_date_registro,
						'email': email_registro
					}
					newUser.password = bcrypt.hashSync(newUser.password, 10);
				
					pool.query(`INSERT INTO ${switchDB} SET ?`, newUser, (err, result) => {
						if (err) res.status(500).send(err);
						else res.status(200).json({
							user: 'newUser',
							message: 'Registro OK',
							token: jwt.createToken(newUser)
						})
					});
				}
			}
		});
	}
});*/

/////////////////////// Api de Notes /////////////////////////////
app.get('/notes/:id', (req, res) => {
	const userId = req-params.id
	pool.query(`SELECT * FROM NOTES WHERE userId = ${userId}`, (err, notes) => {
		if (err || !notes) res.status(500).json(err);

		else {
			res.status(200).json({
				status: 'success',
				baths: notes
			});
		}
	});

});

app.get('/notes/:id', (req, res) => {
	const noteId = req.params.id;
	pool.query(`SELECT * FROM NOTES WHERE id = ${noteId}`, (err, result) => {
		if (err) throw err;

		else{
			res.status(200).json({
				status: 'success',
				bath: result
			});
		}
	}); 

});

app.delete('/notes/:id', (req, res) => {
	const noteId = req.params.id;

	pool.query(`DELETE FROM NOTES WHERE ID = ${noteId}`, (err, result) => {
		if (err) res.status(500).json(err);

		else res.json(result);
	});
});

app.post('/notes', (req, res) => {
	const newNote = req.body;
	pool.query('INSERT INTO NOTES SET ?', newNote, (err, result) => {
		if(err) throw err;
		else res.status(200).json({"text": 'Nota añadida', "valor":true});
	});
	console.log(newNote);
});

/////////////////////////////////////////////////////////////////////////////////////////

app.get('/users', (req, res) => {
	pool.query('SELECT * FROM USER', (err, users) => {
		if (err || !users) res.status(500).json(err);

		else res.status(200).json({
			status: 'success',
			users: users
		});
	});

});

app.get('/users/:id', (req, res) => {
	const userId = req.params.id;
	pool.query(`SELECT * FROM USER WHERE id = ${userId}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});

});


app.delete('/user/:id', (req, res) => {
	const userId = req.params.id;

	pool.query(`DELETE FROM USER WHERE ID = ${userId}`, (err, result) => {
		if (err) res.status(500).json(err);

		else res.json(result);
	});
});

app.post('/user', (req, res) => {
	const newUser = req.body;
	pool.query('INSERT INTO USER ?', newUser, (err, result) => {
		if (err) throw err;
		else {
			res.status(200).json(`Usuario añadido`);
			console.log(newUser);
		}

	});

});

app.put('/user/:id', (req, res) => {
	const newName = req.body.name;
	const newUserName = req.body.username;
	const newEmail = req.body.email;
	var newPassword = req.body.password;
	const newBirth_date = req.body.birth_date;
	const userId = req.params.id;

	var newUser = {
		'name':  req.body.name,
		'password': bcrypt.hashSync(req.body.password, 10),
		'age': req.body.age,
		'email': req.body.email
	}

	

	// pool.query(`UPDATE USER SET NAME= '${newName}',USERNAME= '${newUserName}',EMAIL= '${newEmail}',BIRTH_DATE= '${newBirth_date}', PASSWORD= '${newPassword}'
	//  WHERE ID = ${userId}`, (err, result) => {
	pool.query(`UPDATE USER SET ? WHERE ID = ${userId}`,newUser, (err, result) => {
		if (err) throw err;
		else res.status(200).json(`User info changed`);
	});
});

/////////////////////////////////////////////////////////////////////////////////////////

app.get('/doctors', (req, res) => {
	pool.query('SELECT * FROM DOCTOR', (err, result) => {
		if (err) throw err;

		else res.json(result);
	});
});

app.get('/doctors/:id', (req, res) => {
	const doctorId = req.params.id;
	pool.query(`SELECT * FROM DOCTOR WHERE id = ${doctorId}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});

});

app.delete('/doctor/:id', (req, res) => {
	const doctorId = req.params.id;

	pool.query(`DELETE FROM DOCTOR WHERE ID = ${doctorId}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});
});

app.post('/doctor', (req, res) => {
	const newDoctor = req.body;
	var name = req.body.name;
	var email = req.body.email;
	var specialty = req.body.specialty;

	if (validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(specialty)) {
		res.status(400).json('Debe indicar un nombre, un email y una especialidad')
	}
	else {
		pool.query(`INSERT INTO DOCTOR SET ? `, newDoctor, (err, result) => {
			if (err) throw err;
			else res.status(200).json({"text": 'Doctor añadido', "valor":true});
		});
		console.log(newDoctor);
	}
});
/////////////////////////////////////////////////////////////////////////////////////////

app.get('/admins', (req, res) => {
	pool.query('SELECT * FROM ADMIN', (err, result) => {
		if (err) throw err;

		else res.json(result);
	});

});

app.get('/admins/:id', (req, res) => {
	const adminId = req.params.id;
	pool.query(`SELECT * FROM ADMIN WHERE id = ${adminId}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});

});

app.delete('/admin/:id', (req, res) => {
	const adminId = req.params.id;

	pool.query(`DELETE FROM ADMIN WHERE ID = ${adminId}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});
});

app.post('/admin', (req, res) => {
	const newAdmin = req.body;
	pool.query('INSERT INTO ADMIN SET ?', newAdmin, (err, result) => {
		if (err) throw err;
		else res.status(200).json(`Admin añadido`);
	});
	console.log(newAdmin);
});

app.put('/admin/:id', (req, res) => {
	const newAdmin = req.body;
	const adminId = req.params.id;
	pool.query(`UPDATE ADMIN SET ? WHERE ID = ${adminId}`, newAdmin, (err, result) => {
		if (err) throw err;
		else res.status(200).json(`Admin modificado`);
	});
	console.log(newAdmin);
});

app.put('/admin/reportUser/:id', (req, res) => {
	// Controlar la sesion del admin
	const userToBlock = req.params.id;

	pool.query(`SELECT REPORTS FROM USER WHERE ID = ${userToBlock}`, (err, result) => {
		if (err) throw err;

		else {
			const blocked = Object.values(JSON.parse(JSON.stringify(result)))[0];
			console.log(blocked);
			pool.query(`UPDATE USER SET REPORTS = ${blocked.REPORTS + 1} WHERE ID = ${userToBlock}`, (err, result) => {
				if (err) throw err;
				else {
					console.log("User reported");
					res.status(200).json("User reported successfully");
				}

			});
		}
	});
});

app.put('/admin/blockUser/:id', (req, res) => {
	const userToBlock = req.params.id;

	pool.query(`SELECT BLOCKED FROM USER WHERE ID = ${userToBlock}`, (err, result) => {
		if (err) throw err;

		else {
			const blocked = Object.values(JSON.parse(JSON.stringify(result)));
			if (blocked[0].BLOCKED == 0) {
				pool.query(`UPDATE USER SET BLOCKED = 1 WHERE ID = ${userToBlock}`, (err, result) => {
					if (err) throw err;
					else {
						console.log("User blocked");
						res.status(200).json("User blocked successfully");
					}

				});
			}
			else {
				console.log("User already blocked");
				res.status(400).json(`User already blocked`);
			}
		}
	});
});

app.delete('/admin/deleteComment/:id', (req, res) => {
	const commentToDelete = req.params.id;

	pool.query(`SELECT * FROM COMMENTS WHERE ID = ${commentToDelete}`, (err, result) => {
		if (err) throw err;

		else {
			const comment = Object.values(JSON.parse(JSON.stringify(result)));
			console.log(comment);

			if (comment.length == 0) {
				res.status(400).json("No comment in DB");
			}
			else {
				pool.query(`DELETE FROM COMMENTS WHERE ID = ${commentToDelete}`, (req, result) => {
					if (err) throw err;
					else res.status(200).json(`Comment with ID = ${commentToDelete} has been deleted`);
				});
			}
		}
	})
});

/////////////////////////////////////////////////////////////////////////////////////////

app.get('/coordinates', (req, res) => {
	pool.query('SELECT * FROM COORDINATE', (err, result) => {
		if (err) throw err;

		else res.json(result);
	});

});

app.get('/coordinates/:x/:y', (req, res) => {
	const xId = req.params.x;
	const yId = req.params.y;

	pool.query(`SELECT * FROM COORDINATE WHERE LATITUDE = ${xId} AND LENGTH = ${yId}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});

});

app.post('/coordinate', (req, res) => {
	const newCoordinate = req.body;
	pool.query('INSERT INTO COORDINATE SET ?', newCoordinate, (err, result) => {
		if(err) throw err;
		else res.status(200).json({"text":'Coordinate añadido', "valor": true});
	});
	console.log(newCoordinate);
});


app.delete('/coordinate/:x/:y', (req, res) => {
	const xId = req.params.x;
	const yId = req.params.y;

	pool.query(`DELETE FROM COORDINATE WHERE LATITUDE = ${xId} AND LENGTH = ${yId}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});
});

/////////////////////////////////////////////////////////////////////////////////////////

app.get('/reports', (req, res) => {
	pool.query('SELECT * FROM REPORTES', (err, result) => {
		if (err) throw err;

		else res.json(result);
	});

});

app.post('/reports', (req, res) => {
	const newReport = req.body;
	pool.query('INSERT INTO REPORTES SET ?', newReport, (err, result) => {
		if (err) throw err;
		else res.status(200).json(`Report capturado correctamente`);
	});
	console.log(newReport);
});


app.delete('/reports/:user/:bath', (req, res) => {
	const user = req.params.user;
	const bath = req.params.bath;

	pool.query(`DELETE FROM REPORTES WHERE USER = ${user} AND BATH = ${bath}`, (err, result) => {
		if (err) throw err;

		else res.json(result);
	});
});

///////////////////////////////////////////////////////////////////////////
//Puntuacion de aseos

app.post('/bath/rate/:id', (req, res) => {
	const bathId = req.params.id;
	const rateToAdd = req.body.rate;
	
	pool.query(`SELECT AVG(RATE) AS RATE, COUNT(*) AS TAM FROM COMMENTS WHERE BATHROOM = '${bathId}'`, (err, result) => {
		if (err) {
			res.status(500).json('Error selecting comments');
		}
		else {
			var myBath = Object.values(JSON.parse(JSON.stringify(result)))[0];
			var newRate = Math.round((myBath.RATE + rateToAdd) / ((myBath.TAM) + 1));

			if(newRate > 5){
				newRate = 5;
			}

			pool.query(`UPDATE BATHROOM SET rate=${newRate} WHERE ID = ${bathId}`, (err, result) => {
				if (err) throw err;
				else {
					console.log("First rate added");
					res.status(200).json("Rate added successfully")
				}
			});
		};
	});
});

