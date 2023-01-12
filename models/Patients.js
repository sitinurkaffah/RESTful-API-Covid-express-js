// import database
const db = require("../config/database");

// membuat class Patients
class Patients {
  // solution with promise + async await
  static all() {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients";
      /**
       * Melakukan query meggunakan method query
       * Menerima 2 params: query dan callback
       */
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  /**
   * Membuat method static create: melakukan insert data ke database
   */
  static async create(data) {
    // promise 1
    const id = await new Promise((resolve, reject) => {
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, function(err, results) {
          resolve(results.insertId);
      });
  });
    // refactor promise 2
    const patients = this.find(id);
    return patients;
}

/**
 * membuat method static find: melakukan select data by id
 */

static find(id) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Patients WHERE id= ?`;
    db.query(query, id, (error, results) => {
      if (error) {
        reject(error);
      } else {
        const [patients] = results;
        resolve(patients);
      }
    });
  });
}

/**
 * membuat method static update
 */

static async update(id, data) {
  await new Promise((resolve, reject) => {
    const query = `UPDATE Patients SET ? WHERE id = ?`;
    db.query(query, [data, id], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  const patients = await this.find(id);
  return patients;
}

/**
 * membuat method static delete
 */
static async delete(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM Patients WHERE id = ?";
    db.query(sql, id, (err, results) => {
      resolve(results)
      });
    });
  }

/**
 * membuat method static search by name
 */
static search(name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM patients WHERE name LIKE '%" + name + "%'";
    db.query(sql, name, (err, results) => {
      resolve(results);
      });
    });
  }

/**
 * membuat method static find by status
 */
static async findByStatus(status) {
  if (status == 'positive') {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM patients WHERE status = 'Positive'";
      db.query(sql, status, (err, results) => {
        resolve(results);
      });
    });
  }

/**
 * membuat method static find by recovered status
 */
else if (status == 'recovered') {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM patients WHERE status = 'Recovered'";
    db.query(sql, status, (err, results) => {
      resolve(results);
    });
  });
}

/**
 * membuat method static find by dead status
 */
else if (status == 'dead') {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM patients WHERE status = 'dead'";
    db.query(sql, status, (err, results) => {
      resolve(results);
    });
  });
}
}
}

// export class Patients
module.exports = Patients;