/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80035 (8.0.35)
 Source Host           : localhost:3306
 Source Schema         : library

 Target Server Type    : MySQL
 Target Server Version : 80035 (8.0.35)
 File Encoding         : 65001

 Date: 17/05/2024 17:08:32
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE `_prisma_migrations`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) NULL DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `rolled_back_at` datetime(3) NULL DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
INSERT INTO `_prisma_migrations` VALUES ('81ff5719-2f49-4928-a7fd-1d7890db6a21', 'b632fbe53b3ea30765ca95b18ed4952270658bdf42bb698b8896106d2294de74', '2024-03-26 08:16:53.954', '20240326081653_mylib', NULL, NULL, '2024-03-26 08:16:53.859', 1);

-- ----------------------------
-- Table structure for book
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'bookId',
  `book_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '书名',
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '作者',
  `lend_state` int UNSIGNED NOT NULL DEFAULT 0 COMMENT '借用状态 0空闲 1借用',
  `lend_user_id` int NULL DEFAULT NULL COMMENT '借用者',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `lend_user_id`(`lend_user_id` ASC) USING BTREE,
  CONSTRAINT `lend_user_id` FOREIGN KEY (`lend_user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES (1, '西游记1', '吴承恩', 0, NULL);
INSERT INTO `book` VALUES (3, '水浒传', '', 1, NULL);
INSERT INTO `book` VALUES (4, '猎狐', '沈石溪', 1, NULL);
INSERT INTO `book` VALUES (5, '狼王梦', '沈石溪', 0, NULL);
INSERT INTO `book` VALUES (6, '红楼梦', '曹雪芹', 0, NULL);
INSERT INTO `book` VALUES (7, '哈利·波特', 'J.K.罗琳 (J.K.Rowling)', 0, NULL);
INSERT INTO `book` VALUES (8, '小王子', '[法] 圣埃克苏佩里', 0, NULL);
INSERT INTO `book` VALUES (9, '天龙八部', '金庸', 0, NULL);
INSERT INTO `book` VALUES (10, '撒哈拉的故事', '三毛', 0, NULL);
INSERT INTO `book` VALUES (11, '杀死一只知更鸟', '[美] 哈珀·李', 0, NULL);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '账号',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '昵称',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '邮箱',
  `auth` int NULL DEFAULT 1 COMMENT '权限 -1超级管理 0管理 1用户',
  `status` int NOT NULL DEFAULT 0 COMMENT '状态 0正常 1禁用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '123456', 'orange', '1828199209@qq.com', -1, 0);
INSERT INTO `user` VALUES (2, 'admin1', '123456', NULL, NULL, 1, 0);
INSERT INTO `user` VALUES (3, 'admin2', '123456', NULL, NULL, 0, 0);

SET FOREIGN_KEY_CHECKS = 1;
