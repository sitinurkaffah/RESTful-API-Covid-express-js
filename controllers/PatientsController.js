// import Model Patients
const Patients = require("../models/Patients");

class PatientsController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const patients = await Patients.all();

    // Cek apakah data array tidak kosong
    if (patients.length > 0) {
      const data = {
        message: `Get All Resource`,
        data: patients,
      };

      return res.status(200).json(data);
    }

    // Jika data array kosong
    const data = {
      message: `Resource is empty`,
    };

    return res.status(200).json(data);
  }
  async store(req, res) {
    
    /** 
     * Validasi sederhana
     * - Handle jika salah satu data tidak dikirim
    */
    
    // destructing object req.body
    const { name, phone, address, status } = req.body;

    // jika data undefined maka kirim response error
    if (!name || !phone || !address || !status) {
      const data = {
        message: `All fields must be filled correctly`,
    };

    return res.status(422).json(data);
  }

  // else
    const patients = await Patients.create(req.body);

    const data = {
      message: `Resource is added successfully`,
      data: patients,
    };

    return res.status(201).json(data);
  }

  async update(req, res) {
    const { id } = req.params;
    const patients = await Patients.find(id);

    if (patients) {
      const patients = await Patients.update(id, req.body);
      const data = {
        message: `Resource is updated successfully`,
        data: patients,
      };

    return res.status(200).json(data);
  }

  // jika tidak ditemukannya data
  else {
  const data = {
    message: `Resource not found`,
  };

  res.status(404).json(data); 
  }
}
  
  async destroy(req, res) {
    const { id } = req.params;

    const patients = await Patients.find(id);
    if (patients) {
      await Patients.delete(id);
      const data = {
        message: `Resources is deleted successfully`,
      };

    res.status(200).json(data);
  }

  // jika tidak ditemukannya data
  const data = {
    message: `Resource not found`,
  };

  res.status(404).json(data);
  }

  async show(req, res) {
    const { id } = req.params;

    const patients = await Patients.find(id);
    if (patients) {
      const data = {
        message: `Get detail resources`,
        data: patients,
      };

    res.status(200).json(data);
  }

  // jika tidak ditemukannya data
  else {
  const data = {
    message: `Resource not found`,
  };

  res.status(404).json(data); 
  }
}
}

// Membuat object PatientsController
const object = new PatientsController();

// Export object PatientsController
module.exports = object;