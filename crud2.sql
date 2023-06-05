CREATE DATABASE crud2;
USE crud2;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fone` varchar(45) NOT NULL,
  `data_nascimento` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`nome`, `email`, `fone`, `data_nascimento`) VALUES
('Allan1', 'ayinvestidor@gmail.com', '23123123', '2023-05-07'),
('Marlon', 'allysxd@gmail.com', '23123123', '2023-05-13'),
('Admin', 'admin@admin.com', '01010101', '2000-01-01');

USE crud2;
SELECT * FROM users;