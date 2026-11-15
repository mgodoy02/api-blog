-- =====================================================
--  Actividad 8 - API Blog
-- =====================================================


-- -----------------------------------------------------
--  1. Base de datos
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS blog;
USE blog;


-- -----------------------------------------------------
--  2. Tablas
-- -----------------------------------------------------
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS autores;

CREATE TABLE autores (
  id      INT          NOT NULL AUTO_INCREMENT,
  nombre  VARCHAR(100) NOT NULL,
  email   VARCHAR(150) NOT NULL UNIQUE,
  imagen  VARCHAR(255),
  PRIMARY KEY (id)
);

CREATE TABLE posts (
  id              INT          NOT NULL AUTO_INCREMENT,
  titulo          VARCHAR(200) NOT NULL,
  descripcion     TEXT         NOT NULL,
  fecha_creacion  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  categoria       VARCHAR(50)  NOT NULL,
  autor_id        INT          NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (autor_id) REFERENCES autores(id)
);


-- -----------------------------------------------------
--  3. Comprobación de la estructura
-- -----------------------------------------------------
DESCRIBE autores;
DESCRIBE posts;


-- -----------------------------------------------------
--  4. Datos de prueba
-- -----------------------------------------------------
INSERT INTO autores (nombre, email, imagen) VALUES
  ('Ana García',  'ana@mail.com',  'https://i.pravatar.cc/150?img=1'),
  ('Luis Pérez',  'luis@mail.com', 'https://i.pravatar.cc/150?img=2');

INSERT INTO posts (titulo, descripcion, categoria, autor_id) VALUES
  ('Mi primer post',          'Contenido de prueba',                          'General',      1),
  ('Introducción a Express',  'Cómo crear una API con Express y MySQL.',      'Programación', 2);


-- -----------------------------------------------------
--  5. Consultas utilizadas en la API
-- -----------------------------------------------------

-- Todos los autores               → GET /api/autores
SELECT * FROM autores;

-- Todos los posts con su autor    → GET /api/posts
SELECT p.id, p.titulo, p.descripcion, p.fecha_creacion, p.categoria,
       a.id     AS autor_id,
       a.nombre AS autor_nombre,
       a.email  AS autor_email,
       a.imagen AS autor_imagen
FROM posts p
INNER JOIN autores a ON p.autor_id = a.id;

-- Posts de un autor               → GET /api/autores/:autorId/posts
SELECT * FROM posts WHERE autor_id = 1;