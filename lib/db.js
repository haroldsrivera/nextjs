// librería
import { Pool } from 'pg';

// parámetros de conexión
const pool = new Pool({
  host: 'localhost', 
  port: 5432,  
  user: 'postgres', 
  password: 'Snader2019r.c', 
  database: 'postgres', 
});

// se exporta la conexión
export { pool };
