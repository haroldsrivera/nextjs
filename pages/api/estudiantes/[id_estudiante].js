import { pool } from '../../../lib/db';

export default async (req, res) => {
  const { id_estudiante } = req.query; 

  if (req.method === 'PUT') {
    const { nombre, apellido, edad, correo, telefono } = req.body;
    try {
      const result = await pool.query(
        'UPDATE estudiante SET nombre = $1, apellido = $2, edad = $3, correo = $4, telefono = $5 WHERE id_estudiante = $6',
        [nombre, apellido, edad, correo, telefono, id_estudiante]
      );
      
      if (result.rowCount > 0) {
        res.status(200).json({ id_estudiante, nombre, apellido, edad, correo, telefono });
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await pool.query('DELETE FROM estudiante WHERE id_estudiante = $1', [id_estudiante]);
      
      if (result.rowCount > 0) {
        res.status(200).json({ id_estudiante });
      } else {
        res.status(404).json({ message: 'Estudiante no encontrado' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};
