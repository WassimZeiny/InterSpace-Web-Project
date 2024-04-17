-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema csis_228_spring_24_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema csis_228_spring_24_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `csis_228_spring_24_db` DEFAULT CHARACTER SET utf8 ;
USE `csis_228_spring_24_db` ;

-- -----------------------------------------------------
-- Table `csis_228_spring_24_db`.`Interests`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `csis_228_spring_24_db`.`Interests` ;

CREATE TABLE IF NOT EXISTS `csis_228_spring_24_db`.`Interests` (
  `interestID` INT NOT NULL,
  `interestName` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`interestID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csis_228_spring_24_db`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `csis_228_spring_24_db`.`User` ;

CREATE TABLE IF NOT EXISTS `csis_228_spring_24_db`.`User` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `userEmail` VARCHAR(45) NOT NULL,
  `userPass` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NULL,
  `profilePic` BLOB NULL,
  `bio` VARCHAR(45) NULL,
  `streakStartDate` DATETIME NULL,
  `streakCount` INT NULL,
  `Interests_interestID` INT NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE,
  INDEX `fk_User_Interests2_idx` (`Interests_interestID` ASC) VISIBLE,
  CONSTRAINT `fk_User_Interests2`
    FOREIGN KEY (`Interests_interestID`)
    REFERENCES `csis_228_spring_24_db`.`Interests` (`interestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csis_228_spring_24_db`.`Friends`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `csis_228_spring_24_db`.`Friends` ;

CREATE TABLE IF NOT EXISTS `csis_228_spring_24_db`.`Friends` (
  `friendID` INT NOT NULL,
  `User_userID` INT NOT NULL,
  PRIMARY KEY (`friendID`),
  INDEX `fk_Friends_User2_idx` (`User_userID` ASC) VISIBLE,
  CONSTRAINT `fk_Friends_User2`
    FOREIGN KEY (`User_userID`)
    REFERENCES `csis_228_spring_24_db`.`User` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csis_228_spring_24_db`.`Msg`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `csis_228_spring_24_db`.`Msg` ;

CREATE TABLE IF NOT EXISTS `csis_228_spring_24_db`.`Msg` (
  `msgID` INT NOT NULL,
  `msgContent` VARCHAR(45) NULL,
  `User_userID` INT NOT NULL,
  `Friends_friendID` INT NOT NULL,
  PRIMARY KEY (`msgID`),
  INDEX `fk_Msg_User1_idx` (`User_userID` ASC) VISIBLE,
  INDEX `fk_Msg_Friends1_idx` (`Friends_friendID` ASC) VISIBLE,
  CONSTRAINT `fk_Msg_User1`
    FOREIGN KEY (`User_userID`)
    REFERENCES `csis_228_spring_24_db`.`User` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Msg_Friends1`
    FOREIGN KEY (`Friends_friendID`)
    REFERENCES `csis_228_spring_24_db`.`Friends` (`friendID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csis_228_spring_24_db`.`Posts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `csis_228_spring_24_db`.`Posts` ;

CREATE TABLE IF NOT EXISTS `csis_228_spring_24_db`.`Posts` (
  `postID` INT NOT NULL,
  `postType` VARCHAR(45) NOT NULL,
  `postDate` VARCHAR(45) NOT NULL,
  `postExpiry` VARCHAR(45) NULL,
  `postContent` VARCHAR(45) NOT NULL,
  `User_userID` INT NOT NULL,
  `Interests_interestID` INT NOT NULL,
  PRIMARY KEY (`postID`),
  INDEX `fk_Posts_User1_idx` (`User_userID` ASC) VISIBLE,
  INDEX `fk_Posts_Interests1_idx` (`Interests_interestID` ASC) VISIBLE,
  CONSTRAINT `fk_Posts_User1`
    FOREIGN KEY (`User_userID`)
    REFERENCES `csis_228_spring_24_db`.`User` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Posts_Interests1`
    FOREIGN KEY (`Interests_interestID`)
    REFERENCES `csis_228_spring_24_db`.`Interests` (`interestID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csis_228_spring_24_db`.`Comments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `csis_228_spring_24_db`.`Comments` ;

CREATE TABLE IF NOT EXISTS `csis_228_spring_24_db`.`Comments` (
  `commentID` INT NOT NULL,
  `commentContent` VARCHAR(45) NULL,
  `User_userID` INT NOT NULL,
  `Posts_postID` INT NOT NULL,
  PRIMARY KEY (`commentID`),
  INDEX `fk_Comments_User1_idx` (`User_userID` ASC) VISIBLE,
  INDEX `fk_Comments_Posts1_idx` (`Posts_postID` ASC) VISIBLE,
  CONSTRAINT `fk_Comments_User1`
    FOREIGN KEY (`User_userID`)
    REFERENCES `csis_228_spring_24_db`.`User` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comments_Posts1`
    FOREIGN KEY (`Posts_postID`)
    REFERENCES `csis_228_spring_24_db`.`Posts` (`postID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `csis_228_spring_24_db`.`Reacts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `csis_228_spring_24_db`.`Reacts` ;

CREATE TABLE IF NOT EXISTS `csis_228_spring_24_db`.`Reacts` (
  `reactID` INT NOT NULL,
  `Posts_postID` INT NOT NULL,
  `User_userID` INT NOT NULL,
  PRIMARY KEY (`reactID`, `Posts_postID`),
  INDEX `fk_Reacts_Posts1_idx` (`Posts_postID` ASC) VISIBLE,
  INDEX `fk_Reacts_User1_idx` (`User_userID` ASC) VISIBLE,
  CONSTRAINT `fk_Reacts_Posts1`
    FOREIGN KEY (`Posts_postID`)
    REFERENCES `csis_228_spring_24_db`.`Posts` (`postID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reacts_User1`
    FOREIGN KEY (`User_userID`)
    REFERENCES `csis_228_spring_24_db`.`User` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
