const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'Ajuzie'
});

client.connect();

function createAppointmentTable() {
  client
  .query(`CREATE TABLE appointments (
    id INTEGER PRIMARY KEY,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    patient_name VARCHAR(50) NOT NULL
  )`)
  .then((result) => console.log(result))
  .catch((e) => console.error(e.stack))
.then(() => client.end());
}

function createAppointment(id, start_time, end_time, patient_name) {
  client
  .query(`SELECT * FROM appointments
  WHERE ${start_time} BETWEEN start_time AND end_time;`)
  .then((result) => checkAppointment(result.rowCount, id, start_time, end_time, patient_name))
  .catch((e) => console.error(e.stack))
.then(() => client.end());
}

createAppointment();

function checkAppointment(overlaps, id, start_time, end_time, patient_name) {
  if (overlaps == 0) {
  client
  .query(`INSERT INTO appointments (id, start_time, end_time, patient_name)
  VALUES (${id}, ${start_time}, ${end_time}, ${patient_name})`)
  .then((result) => console.log(result))
  .catch((e) => console.error(e.stack))
  .then(() => client.end());
  }
  else {
    console.log("it is overlapping with a current booking")
  }
}
