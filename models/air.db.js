const sql = require("./db.js");

// constructor
const Tutorial = function(tutorial) {
  this.id = tutorial.id;
  this.flight_name = tutorial.flight_name;
  this.origin = tutorial.origin;
  this.destination = tutorial.destination;
  this.flight_type = tutorial.flight_type;
  this.travel_date = tutorial.travel_date;
  this.flight_number = tutorial.flight_number;
  this.departure_time = tutorial.departure_time;
  this.arrival_time = tutorial.arrival_time;
  this.tour_code = tutorial.tour_code;
  this.num_seats = tutorial.num_seats;
};

Tutorial.create = (newTutorial, result) => {
  sql.query("INSERT INTO ticket_booking_ariq11 SET ?", newTutorial, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ticket_booking_ariq11: ", { id: res.insertId, ...newTutorial });
    result(null, { id: res.insertId, ...newTutorial });
  });
};

Tutorial.findById = (id, result) => {
  sql.query(`SELECT * FROM ticket_booking_ariq11 WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ticket_booking_ariq11: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Tutorial.getAll = (company_name, result) => {
  let query = "SELECT * FROM ticket_booking_ariq11";

  if (company_name) {
    query += ` WHERE title LIKE '%${company_name}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.getAllPublished = result => {
  sql.query("SELECT * FROM tutorials WHERE company_name=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tutorials: ", res);
    result(null, res);
  });
};

Tutorial.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE ticket_booking_ariq11 SET flight_name = ?, origin = ? , destination = ? , flight_type = ?, travel_date = ?, flight_number = ?, departure_time = ?, arrival_time = ? , tour_code = ?, num_seats = ? WHERE id = ?",
    [ tutorial.flight_name,  tutorial.origin,  tutorial.destination, tutorial.flight_type, tutorial.travel_date, tutorial.flight_number, tutorial.departure_time, tutorial.arrival_time, tutorial.tour_code,  tutorial.num_seats, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated tutorial: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
    }
  );
};

Tutorial.remove = (id, result) => {
  sql.query("DELETE FROM ticket_booking_ariq11 WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tutorial with id: ", id);
    result(null, res);
  });
};

Tutorial.removeAll = result => {
  sql.query("DELETE FROM ticket_booking_ariq11", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tutorials`);
    result(null, res);
  });
};

module.exports = Tutorial;