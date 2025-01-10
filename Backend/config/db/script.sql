-- Crear Base de Datos
CREATE DATABASE softjobs;

-- Ingresar a la Base de datos
\c softjobs;

-- Borrar tabla si Existe
DROP TABLE IF EXISTS usuarios;

-- Crear tabla
CREATE TABLE usuarios ( 
    id SERIAL, 
    email VARCHAR(50) NOT NULL UNIQUE, 
    password VARCHAR(60) NOT NULL, 
    rol VARCHAR(25), 
    lenguage VARCHAR(20) );

-- Revisar tabla
SELECT * FROM usuarios;