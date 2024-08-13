import { pool } from '../../../lib/db';

export default async (req, res) => { 
  if (req.method === 'GET') { 
    try {
      const { rows } = await pool.query('SELECT * FROM estudiante');
      res.status(200).json(rows); // se envía el resultado de la consulta
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'POST') { 
    const { nombre, apellido, edad, correo, telefono } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO estudiante (nombre, apellido, edad, correo, telefono) VALUES ($1, $2, $3, $4, $5) RETURNING id_estudiante',
        [nombre, apellido, edad, correo, telefono]
      );
      const { id_estudiante } = result.rows[0];
      res.status(201).json({ id_estudiante, nombre, apellido, edad, correo, telefono }); // se envía el id del estudiante insertado
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Método no aceptado' });
  }
};
