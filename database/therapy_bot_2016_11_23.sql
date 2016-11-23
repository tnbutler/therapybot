-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 23, 2016 at 08:03 AM
-- Server version: 5.6.26-log
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `therapy_bot`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer_buttons`
--

CREATE TABLE IF NOT EXISTS `answer_buttons` (
  `id` int(11) NOT NULL,
  `chat_node_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `display_order` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answer_buttons`
--

INSERT INTO `answer_buttons` (`id`, `chat_node_id`, `text`, `display_order`) VALUES
(1, 2, 'Happy', 1),
(2, 2, 'Sad', 2),
(3, 2, 'Angry', 3),
(4, 2, 'Afraid', 4),
(5, 2, 'Ashamed', 5),
(6, 4, 'Yes', 1),
(7, 4, 'No', 2),
(8, 5, '1', 1),
(9, 5, '2', 2),
(10, 5, '3', 3),
(11, 5, '4', 4),
(12, 5, '5', 5);

-- --------------------------------------------------------

--
-- Table structure for table `bot_users`
--

CREATE TABLE IF NOT EXISTS `bot_users` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bot_users`
--

INSERT INTO `bot_users` (`id`, `created_at`, `updated_at`, `name`) VALUES
(1, '2016-11-19 10:56:41', '2016-11-19 10:56:49', 'Bob');

-- --------------------------------------------------------

--
-- Table structure for table `chat_log_records`
--

CREATE TABLE IF NOT EXISTS `chat_log_records` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  `bot_users_id` int(11) NOT NULL,
  `is_bot_question` tinyint(1) NOT NULL,
  `message_text` text,
  `answer_buttons_id` int(11) DEFAULT NULL,
  `chat_nodes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_log_records`
--

INSERT INTO `chat_log_records` (`id`, `created_at`, `updated_at`, `bot_users_id`, `is_bot_question`, `message_text`, `answer_buttons_id`, `chat_nodes_id`) VALUES
(1, '2016-11-19 10:56:41', '2016-11-19 10:56:41', 1, 1, NULL, NULL, 1),
(2, '2016-11-19 10:56:49', '2016-11-19 10:56:49', 1, 0, 'Bob', NULL, 1),
(3, '2016-11-19 10:56:49', '2016-11-19 10:56:49', 1, 1, NULL, NULL, 2),
(4, '2016-11-19 10:57:09', '2016-11-19 10:57:09', 1, 0, 'Sad', NULL, 2),
(5, '2016-11-19 10:57:09', '2016-11-19 10:57:09', 1, 1, NULL, NULL, 4),
(6, '2016-11-19 10:57:23', '2016-11-19 10:57:23', 1, 0, 'nope', NULL, 4),
(7, '2016-11-19 10:57:52', '2016-11-19 10:57:52', 1, 0, 'nope', NULL, 4),
(8, '2016-11-19 10:58:30', '2016-11-19 10:58:30', 1, 0, 'nope', NULL, 4),
(9, '2016-11-19 10:59:33', '2016-11-19 10:59:33', 1, 0, 'nope', NULL, 4),
(10, '2016-11-19 10:59:33', '2016-11-19 10:59:33', 1, 1, NULL, NULL, 3),
(11, '2016-11-19 10:59:48', '2016-11-19 10:59:48', 1, 0, 'pooop', NULL, 3),
(12, '2016-11-19 10:59:48', '2016-11-19 10:59:48', 1, 1, NULL, NULL, 4),
(13, '2016-11-19 11:00:15', '2016-11-19 11:00:15', 1, 0, '', 7, 4),
(14, '2016-11-19 11:00:15', '2016-11-19 11:00:15', 1, 1, NULL, NULL, 3),
(15, '2016-11-22 09:44:30', '2016-11-22 09:44:30', 1, 0, '', 7, 3),
(16, '2016-11-22 09:44:30', '2016-11-22 09:44:30', 1, 1, NULL, NULL, 3);

-- --------------------------------------------------------

--
-- Table structure for table `chat_nodes`
--

CREATE TABLE IF NOT EXISTS `chat_nodes` (
  `id` int(11) NOT NULL,
  `system_name` varchar(255) DEFAULT NULL,
  `question_text` text,
  `user_variable_name` varchar(255) DEFAULT NULL,
  `is_start_node` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_nodes`
--

INSERT INTO `chat_nodes` (`id`, `system_name`, `question_text`, `user_variable_name`, `is_start_node`) VALUES
(1, 'N001_FIRST_GREETING', 'Hi, I am Bob. I am a chatbot that uses evidence-based therapy to help people who are experiencing negative feelings. What should I call you?', 'USER_NAME', 1),
(2, 'N002_WHAT_IS_YOUR_MOOD', 'Hi @USER_NAME@! Obviously, I am not a human, but I will do my best to respond appropriately to what you write. Let''s start by doing a simple MOOD CHECK. How would you describe your mood currently?', 'USER_MOOD', 0),
(3, 'N003_POSSIBLE_MOODS_HELPER', 'Well, as you asked to help, here is list of suggestions for you: peace and quiet, lack of emotion; surprise, astonishment; anticipation; emotional uplift, excitement; inspiration, enthusiasm... Now, how would you describe your mood currently?', 'USER_MOOD', 0),
(4, 'N004_FEELING_VERIFY', 'I understand you are feeling @USER_MOOD@. Is that correct?', NULL, 0),
(5, 'N005_MOOD_INTENSITY', 'Now, on a scale from 1 to 5, how intensely are you feeling @USER_MOOD@?', 'MOOD_INTENSITY', 0),
(6, 'N006_MOOD_VERIFY', 'I understand you are feeling @USER_MOOD@ at an intensity of @MOOD_INTENSITY@ out of 5. Is this correct?', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `dictionary_groups`
--

CREATE TABLE IF NOT EXISTS `dictionary_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dictionary_groups`
--

INSERT INTO `dictionary_groups` (`id`, `name`) VALUES
(8, 'five'),
(7, 'four'),
(3, 'help'),
(2, 'no'),
(4, 'one'),
(6, 'three'),
(5, 'two'),
(1, 'yes');

-- --------------------------------------------------------

--
-- Table structure for table `dictionary_synonyms`
--

CREATE TABLE IF NOT EXISTS `dictionary_synonyms` (
  `id` int(11) NOT NULL,
  `dictionary_group_id` int(11) NOT NULL,
  `text` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dictionary_synonyms`
--

INSERT INTO `dictionary_synonyms` (`id`, `dictionary_group_id`, `text`) VALUES
(1, 1, 'Yes'),
(2, 1, 'Yup'),
(3, 1, 'Ok'),
(4, 1, 'Okay'),
(5, 1, 'True'),
(6, 1, 'Agree'),
(7, 2, 'No'),
(8, 2, 'Nope'),
(9, 2, 'Disagree'),
(10, 2, 'Don''t'),
(11, 3, 'help'),
(12, 3, 'help me'),
(13, 3, '?'),
(14, 4, 'one'),
(15, 4, '1'),
(16, 2, 'five'),
(17, 2, '5'),
(18, 6, 'three'),
(19, 6, '3'),
(20, 7, 'four'),
(21, 7, '4'),
(22, 8, 'five'),
(23, 8, '5'),
(34, 5, 'two'),
(35, 5, '2');

-- --------------------------------------------------------

--
-- Table structure for table `node_flow_rules`
--

CREATE TABLE IF NOT EXISTS `node_flow_rules` (
  `id` int(11) NOT NULL,
  `parent_node_id` int(11) DEFAULT NULL,
  `answer_buttons_id` int(11) DEFAULT NULL,
  `child_node_id` int(11) NOT NULL,
  `condition_statement` varchar(255) NOT NULL,
  `execution_priority` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `node_flow_rules`
--

INSERT INTO `node_flow_rules` (`id`, `parent_node_id`, `answer_buttons_id`, `child_node_id`, `condition_statement`, `execution_priority`) VALUES
(1, 1, NULL, 2, 'GOTO', 2),
(2, 2, NULL, 3, 'INSTRUCTION_FIND(''help'')', 1),
(3, NULL, 1, 4, 'GOTO', 1),
(4, NULL, 2, 4, 'GOTO', 1),
(5, NULL, 3, 4, 'GOTO', 1),
(6, NULL, 4, 4, 'GOTO', 1),
(7, NULL, 5, 4, 'GOTO', 1),
(8, 3, NULL, 4, 'GOTO', 1),
(9, 2, NULL, 4, 'GOTO', 2),
(10, NULL, 6, 5, 'GOTO', 1),
(11, NULL, 7, 3, 'GOTO', 1),
(12, 4, NULL, 5, 'INSTRUCTION_FIND(''yes'')', 1),
(13, 4, NULL, 3, 'INSTRUCTION_FIND(''no'')', 2),
(14, 4, NULL, 5, 'GOTO', 3),
(15, NULL, 8, 6, 'GOTO', 1),
(16, NULL, 9, 6, 'GOTO', 2),
(17, NULL, 10, 6, 'GOTO', 3),
(18, NULL, 11, 6, 'GOTO', 4),
(19, NULL, 12, 6, 'GOTO', 5),
(20, NULL, 13, 6, 'GOTO', 6),
(21, NULL, 14, 6, 'GOTO', 7),
(22, NULL, 15, 6, 'GOTO', 8),
(23, NULL, 16, 6, 'GOTO', 9),
(24, NULL, 17, 6, 'GOTO', 10),
(25, 5, NULL, 6, 'INSTRUCTION_FIND(''one'')', 1),
(26, 5, NULL, 6, 'INSTRUCTION_FIND(''two'')', 2),
(27, 5, NULL, 6, 'INSTRUCTION_FIND(''three'')', 3),
(28, 5, NULL, 6, 'INSTRUCTION_FIND(''four'')', 4),
(29, 5, NULL, 6, 'INSTRUCTION_FIND(''five'')', 5),
(35, 5, NULL, 5, 'GOTO', 11);

-- --------------------------------------------------------

--
-- Table structure for table `user_variables`
--

CREATE TABLE IF NOT EXISTS `user_variables` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `bot_users_id` int(11) NOT NULL,
  `variable_name` varchar(255) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_variables`
--

INSERT INTO `user_variables` (`id`, `created_at`, `updated_at`, `bot_users_id`, `variable_name`, `value`) VALUES
(1, '2016-11-19 10:56:49', '2016-11-19 10:56:49', 1, 'USER_NAME', 'Bob'),
(2, '2016-11-19 10:57:09', '2016-11-22 09:44:30', 1, 'USER_MOOD', 'No');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer_buttons`
--
ALTER TABLE `answer_buttons`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bot_users`
--
ALTER TABLE `bot_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_log_records`
--
ALTER TABLE `chat_log_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_nodes`
--
ALTER TABLE `chat_nodes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dictionary_groups`
--
ALTER TABLE `dictionary_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `name` (`name`);

--
-- Indexes for table `dictionary_synonyms`
--
ALTER TABLE `dictionary_synonyms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `node_flow_rules`
--
ALTER TABLE `node_flow_rules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_variables`
--
ALTER TABLE `user_variables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bot_users_id` (`bot_users_id`,`variable_name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer_buttons`
--
ALTER TABLE `answer_buttons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `bot_users`
--
ALTER TABLE `bot_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `chat_log_records`
--
ALTER TABLE `chat_log_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `chat_nodes`
--
ALTER TABLE `chat_nodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `dictionary_groups`
--
ALTER TABLE `dictionary_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `dictionary_synonyms`
--
ALTER TABLE `dictionary_synonyms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `node_flow_rules`
--
ALTER TABLE `node_flow_rules`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `user_variables`
--
ALTER TABLE `user_variables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
