CREATE DATABASE  IF NOT EXISTS `hospital_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hospital_system`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital_system
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `booking_status` varchar(45) DEFAULT NULL,
  `slot_id` int DEFAULT NULL,
  `booking_date` date DEFAULT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `fk_doctor_id_idx` (`doctor_id`),
  KEY `fk_patient_id_idx` (`patient_id`),
  KEY `fk_slotid_idx` (`slot_id`),
  CONSTRAINT `fk_doctor-id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `fk_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `fk_slot_id` FOREIGN KEY (`slot_id`) REFERENCES `slot` (`slot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(45) DEFAULT NULL,
  `department_description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Cardiology','Cardiology'),(2,'Cancer ','Cancer');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `contact_no` double DEFAULT NULL,
  `email_id` varchar(255) DEFAULT NULL,
  `aadhar_no` double DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_department_id_idx` (`department_id`),
  CONSTRAINT `fk_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,6,'Harshal','Wagh','Pune','MBBS',4567890,'dfghj',3456789,1),(2,7,'John','Doe','123 Elm St','MBBS',9876543210,'john.doe@example.com',123456789012,1),(3,8,'prakash','Doe','123 Main St, Springfield, IL','MD',1234567890,'johndoe@example.com',123456789012,1);
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `patient_name` varchar(255) DEFAULT NULL,
  `date_of_birth` varchar(255) DEFAULT NULL,
  `blood_group` varchar(255) DEFAULT NULL,
  `patient_address` varchar(255) DEFAULT NULL,
  `patient_aadhar_no` varchar(255) DEFAULT NULL,
  `patient_email_id` varchar(255) DEFAULT NULL,
  `patient_contact_no` double DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  KEY `fk_userid_idx` (`user_id`),
  CONSTRAINT `fk_userid` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,1,'Prajwal','21-01-2002','A+','Pune','123456789123','abc@gmail.com',7855448899),(2,2,'Sandesh','6-1-2001','O+','Pune','121212121212','sandy@gmail.com',9096559556),(3,3,'ptient4','1999-3-8','o','sdf','sdf','sdfsd',8876),(4,4,'Harshal','2124-03-21','O','asds','4124121','adasd@gmail.com',4124214),(5,8,'ptient5','1999-3-8','o','sdf','sdf','sdfsd',8876),(6,9,'ptient5','1999-3-8','o','sdf','sdf','sdfsd',8876),(7,10,'as','2024-08-02','a','asd','79641','as2@gmail.com',1234567890),(8,11,'asf','2414-12-12','A','sdasda','242421','sdsadasd@gmail.com',125124),(9,12,'asfaf','1212-12-12','assa','sas','123213','sadas@gmail.com',3123),(10,13,'Harshal','1212-12-12','o-','asdadasd','203172124993','as2@gmail.com',9422038444),(11,14,'Harshal','1212-12-12','o-','asdadasd','203172124993','as2@gmail.com',9422038444),(21,22,'Wagh Harshal','2002-01-09','A+','Pune','123456789100','abc@gmail.com',1234679922);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `booking_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `amount` int DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `fk_booking_id_idx` (`booking_id`),
  KEY `fk_patientid_idx` (`patient_id`),
  CONSTRAINT `fk_booking_id` FOREIGN KEY (`booking_id`) REFERENCES `booking` (`booking_id`),
  CONSTRAINT `fk_patientid` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `prescription_id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`prescription_id`),
  KEY `fk_docid_idx` (`doctor_id`),
  KEY `fk_patid_idx` (`patient_id`),
  CONSTRAINT `fk_docid` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`),
  CONSTRAINT `fk_patid` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `report_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `url` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`report_id`),
  KEY `fk_patntid_idx` (`patient_id`),
  CONSTRAINT `fk_patntid` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_id` int NOT NULL,
  `role_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Patient'),(2,'Doctor'),(3,'Admin');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slot`
--

DROP TABLE IF EXISTS `slot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `slot` (
  `slot_id` int NOT NULL AUTO_INCREMENT,
  `doctor_id` int DEFAULT NULL,
  `slot_name` varchar(45) DEFAULT NULL,
  `slot_date` date DEFAULT NULL,
  `start_time` varchar(20) DEFAULT NULL,
  `end_time` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`slot_id`),
  KEY `fk_doc_id_idx` (`doctor_id`),
  CONSTRAINT `fk_doc_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slot`
--

LOCK TABLES `slot` WRITE;
/*!40000 ALTER TABLE `slot` DISABLE KEYS */;
/*!40000 ALTER TABLE `slot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int DEFAULT NULL,
  `user_name` varchar(45) DEFAULT NULL,
  `password` varchar(155) DEFAULT NULL,
  `active` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `fk_roleid_idx` (`role_id`),
  KEY `roleid_fk_idx` (`role_id`),
  CONSTRAINT `fk_roleid` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'Patient','123123',1),(2,1,'Patient2','patient2',1),(3,1,'pa','$2a$11$tpQxEALyzkcTHDfHHOXIxOeMjW8xWA3vQbXcxkM6rqr5Muo0kL4B6',1),(4,1,'Harsh123','$2a$11$ozw8kV93Sm1vdXMYz54QqOOakK2Q26KjmtSIyIoN7OTCNuoxJX.zG',1),(6,2,'ha','$2a$11$wx/P7Xgb7PdtcUBNTSkv6OmshqaB0z5qoIKBYQk3NSInv0YrQbUjS',1),(7,2,'john.doe','$2a$11$4Va3NGLfTY2.TpNh0DRXeeARZBhWtSRpSaKpWrsC4k12ynGW/0/pe',1),(8,2,'pa22','$2a$11$LOXaDYC4/r4u2bQIoQIqk.E1cSa6fyhRLVvxIs6EYXZhDzQo4dMDG',1),(9,1,'pa22','$2a$11$JO9y5jxkPBpSEzRi5n29YeBPG6hrhvcNFa/Gf4CUf09GNlBou0jou',1),(10,1,'as','$2a$11$CtS.O8nvTeNakKDwA18yCuh0vfyM8Qy0ZoSfaH0i2jOnn97Mt9Hau',1),(11,1,'as23','$2a$11$py5GFiAc6LqAYqO2eseDk.HtwpkXMwJgpgJbEgUzHQ3INn3XI17eu',1),(12,1,'as12','$2a$11$ozyFNtp72fhEiOct5mIC6.jR2UMpmxYOFORsK4JtXT2OwSvepivjq',1),(13,1,'prakash','$2a$11$pdaM7mXiA.nL9fByU41yeen/PvnszeUTcgfDUt2yW7mw2eW8WPh2K',1),(14,1,'prakash','$2a$11$wm4.7GjXwl0nSVj0hiFhUuv.K7x6GMnEStK1iNZchbmnpGSRGkchC',1),(15,1,'Bakul','$2a$11$ws8sX8NIdrr1zIEgwXu9DekC0hpTkhEc4AT8Hnos4kihAO1EXhLsu',1),(16,1,'Bakul','$2a$11$J5QJtB2LsUNEOzIuEn25sO8zjps2/Hz/l3nfKhNTkuYDa7dslT4TG',1),(17,1,'Bakul12','$2a$11$Qk4iuxfR1zDUYON9SbZE2Or0aUm27wo5sa2JNuxmCXEvVnbeUyD/6',1),(18,1,'Bakul12','$2a$11$fbk42AgB72bsNxUvAkO0Y.IwlQL5K9tGy5eQMrtAT5gHI2DQnCvOi',1),(19,1,'Bakul12','$2a$11$3FvBUkLwvrT3/xOrZoHJren9pPtqipXmXouMZOpivon0B7zYC//t.',1),(20,1,'Bakul12','$2a$11$wXvEBgSORutgfInB5zwt1eXxJZHYGkdPeizEdcUER4iKIGW8z1K3a',1),(21,1,'Bakul12','$2a$11$EGXn215HifU/WOmZ4oaSOuQUMgghnwWpkXspNW4jtsPFgCy8TjaN6',1),(22,1,'Wagh','$2a$11$G4t4/oqHJAx/yQwWvBELZuMTu4W/fuC/48.zBGH/KUYToW56tJCXa',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-13 23:24:39
