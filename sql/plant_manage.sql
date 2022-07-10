/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50737
Source Host           : localhost:3306
Source Database       : plant_manage

Target Server Type    : MYSQL
Target Server Version : 50737
File Encoding         : 65001

Date: 2022-07-06 10:07:41
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `Login` varchar(255) DEFAULT NULL COMMENT '登录名',
  `Pwd` varchar(255) DEFAULT NULL COMMENT '密码',
  `author` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL COMMENT '名字',
  `login` varchar(50) DEFAULT NULL COMMENT '登录账号',
  `pwd` varchar(50) DEFAULT NULL COMMENT '登录密码',
  `sex` varchar(50) DEFAULT NULL COMMENT '性别',
  `tel` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `mail` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of client
-- ----------------------------

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `forumid` int(11) NOT NULL COMMENT '论坛id',
  `userid` int(11) NOT NULL COMMENT '用户id',
  `content` text COMMENT '评论内容',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='论坛评论';

-- ----------------------------
-- Records of comment
-- ----------------------------

-- ----------------------------
-- Table structure for forum
-- ----------------------------
DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL COMMENT '用户id',
  `title` varchar(100) DEFAULT NULL COMMENT '主题',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='论坛';

-- ----------------------------
-- Records of forum
-- ----------------------------

-- ----------------------------
-- Table structure for garden
-- ----------------------------
DROP TABLE IF EXISTS `garden`;
CREATE TABLE `garden` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL COMMENT '用户id',
  `plantname` varchar(100) DEFAULT NULL COMMENT '植物名字',
  `planttype` varchar(100) DEFAULT NULL COMMENT '植物类型',
  `image` varchar(100) DEFAULT NULL COMMENT '植物图片',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='花园';

-- ----------------------------
-- Records of garden
-- ----------------------------

-- ----------------------------
-- Table structure for remind
-- ----------------------------
DROP TABLE IF EXISTS `remind`;
CREATE TABLE `remind` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) NOT NULL COMMENT '用户id',
  `remindname` varchar(100) DEFAULT NULL COMMENT '提醒事项',
  `status` varchar(64) DEFAULT NULL COMMENT '提醒状态',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='我的提醒';

-- ----------------------------
-- Records of remind
-- ----------------------------

-- ----------------------------
-- Table structure for wiki
-- ----------------------------
DROP TABLE IF EXISTS `wiki`;
CREATE TABLE `wiki` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL COMMENT '标题',
  `image` varchar(100) DEFAULT NULL COMMENT '百科封面',
  `content` text COMMENT '百科正文',
  `introduction` text COMMENT '百科简介',
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='百科';

-- ----------------------------
-- Records of wiki
-- ----------------------------
