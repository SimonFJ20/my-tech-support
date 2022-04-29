
DROP DATABASE IF EXISTS `MyTechSupport`;

CREATE DATABASE `MyTechSupport`;

USE `MyTechSupport`;

CREATE TABLE `Customers` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `createdAt` timestamp NOT NULL,
  `email` varchar(64) NOT NULL,
  `phone` varchar(16) NOT NULL,
  `firstName` varchar(64) NOT NULL,
  `lastName` varchar(64) NOT NULL
);

CREATE TABLE `Supporters` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `createdAt` timestamp NOT NULL,
  `email` varchar(64) NOT NULL,
  `firstName` varchar(64) NOT NULL,
  `lastName` varchar(64) NOT NULL,
  `passwordHash` varchar(64) NOT NULL,
  `permissions` varchar(16) NOT NULL,
  `role` varchar(16) NOT NULL
);

CREATE TABLE `Sessions` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `createdAt` timestamp NOT NULL,
  `supporter` int NOT NULL,
  `token` varchar(64) NOT NULL,
  FOREIGN KEY (`supporter`) REFERENCES `Supporters` (`id`)
);

CREATE TABLE `Tickets` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `createdAt` timestamp NOT NULL,
  `title` varchar(256) NOT NULL,
  `assignee` int NOT NULL,
  `category` varchar(64) NOT NULL,
  `due` timestamp NOT NULL,
  FOREIGN KEY (`assignee`) REFERENCES `Supporters` (`id`)
);
