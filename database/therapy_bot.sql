-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 19, 2016 at 09:23 AM
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
  `child_chat_node_id` int(11) DEFAULT NULL,
  `display_order` int(11) NOT NULL DEFAULT '1',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `dictionary_group_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `answer_buttons`
--

INSERT INTO `answer_buttons` (`id`, `chat_node_id`, `text`, `child_chat_node_id`, `display_order`, `is_visible`, `dictionary_group_id`) VALUES
(1, 2, 'Happy', 4, 1, 1, NULL),
(2, 2, 'Sad', 4, 2, 1, NULL),
(3, 2, 'Angry', 4, 3, 1, NULL),
(4, 2, 'Afraid', 4, 4, 1, NULL),
(5, 2, 'Ashamed', 4, 5, 1, NULL),
(6, 4, 'Yes', 5, 1, 1, 1),
(7, 4, 'No', 3, 2, 1, 2),
(8, 5, '1', 6, 1, 1, 4),
(9, 5, '2', 6, 2, 1, 5),
(10, 5, '3', 6, 3, 1, 6),
(11, 5, '4', 6, 4, 1, 7),
(12, 5, '5', 6, 5, 1, 8),
(18, 6, 'Yes', 7, 1, 1, 1),
(19, 6, 'No', 3, 2, 1, 2),
(20, 2, 'HELP', 3, 6, 0, 3),
(21, 9, 'About me', 8, 1, 0, NULL),
(22, 9, 'What can I help with?', 10, 1, 1, NULL),
(23, 9, 'Let''s get started!', 1, 1, 1, NULL),
(24, 10, 'MOOD CHECK MODULE', 1, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bot_users`
--

CREATE TABLE IF NOT EXISTS `bot_users` (
  `id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_log_records`
--

CREATE TABLE IF NOT EXISTS `chat_log_records` (
  `id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL,
  `bot_users_id` int(11) NOT NULL,
  `is_bot_question` tinyint(1) NOT NULL,
  `message_text` text,
  `answer_buttons_id` int(11) DEFAULT NULL,
  `chat_nodes_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `chat_nodes`
--

CREATE TABLE IF NOT EXISTS `chat_nodes` (
  `id` int(11) NOT NULL,
  `chat_version_id` int(11) NOT NULL,
  `display_order` int(11) NOT NULL DEFAULT '999',
  `question_text` text,
  `user_variable_id` int(11) DEFAULT NULL,
  `is_start_node` tinyint(1) NOT NULL DEFAULT '0',
  `not_recognized_chat_node_id` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_nodes`
--

INSERT INTO `chat_nodes` (`id`, `chat_version_id`, `display_order`, `question_text`, `user_variable_id`, `is_start_node`, `not_recognized_chat_node_id`) VALUES
(1, 1, 4, 'Great, let''s begin :) What is your name?', 1, 0, 2),
(2, 1, 999, 'Hi [@1@] =)  Let’s start by doing a MOOD CHECK. How would you describe your mood now?', 2, 0, 10),
(3, 1, 999, 'Alright, let''s try again :) Type your current mood or click the button below to see a list of common moods to choose from.', 2, 0, 4),
(4, 1, 999, 'I understand you are feeling [@2@]. Is that correct?', NULL, 0, 5),
(5, 1, 999, 'Cool - and on a scale from 1 to 5, how intensely are you feeling [@2@]?', 3, 0, 10),
(6, 1, 999, 'So, you are feeling [@2@] at an intensity of [@3@] out of 5?', NULL, 0, 10),
(7, 1, 999, 'Thanks [@1@]! You''ve now completed your MOOD CHECK. Tracking your mood over time can be a powerful tool to help improve your mood.', NULL, 0, 9),
(8, 1, 2, 'Here will be so brief information about me. But now it''s not.', NULL, 0, 9),
(9, 1, 1, 'Hi, I''m TherapyBot!', NULL, 1, 9),
(10, 1, 3, 'Here is list of modules. And we have only one for now!', NULL, 0, 10);

-- --------------------------------------------------------

--
-- Table structure for table `chat_versions`
--

CREATE TABLE IF NOT EXISTS `chat_versions` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `chat_versions`
--

INSERT INTO `chat_versions` (`id`, `title`, `create_at`) VALUES
(1, 'Initial MOOD CHECK MODULE.', '2016-12-09 10:07:16');

-- --------------------------------------------------------

--
-- Table structure for table `dictionary_groups`
--

CREATE TABLE IF NOT EXISTS `dictionary_groups` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

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
-- Table structure for table `user_variables`
--

CREATE TABLE IF NOT EXISTS `user_variables` (
  `id` int(11) NOT NULL,
  `chat_version_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_system` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_variables`
--

INSERT INTO `user_variables` (`id`, `chat_version_id`, `name`, `is_system`) VALUES
(1, 1, 'USER_NAME', 1),
(2, 1, 'USER_MOOD', 0),
(3, 1, 'MOOD_INTENSITY', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_variable_values`
--

CREATE TABLE IF NOT EXISTS `user_variable_values` (
  `id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `bot_users_id` int(11) NOT NULL,
  `user_variable_id` int(11) NOT NULL,
  `value` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
-- Indexes for table `chat_versions`
--
ALTER TABLE `chat_versions`
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
-- Indexes for table `user_variables`
--
ALTER TABLE `user_variables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_variable_values`
--
ALTER TABLE `user_variable_values`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bot_users_id` (`bot_users_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer_buttons`
--
ALTER TABLE `answer_buttons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `bot_users`
--
ALTER TABLE `bot_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `chat_log_records`
--
ALTER TABLE `chat_log_records`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `chat_nodes`
--
ALTER TABLE `chat_nodes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `chat_versions`
--
ALTER TABLE `chat_versions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `dictionary_groups`
--
ALTER TABLE `dictionary_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `dictionary_synonyms`
--
ALTER TABLE `dictionary_synonyms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `user_variables`
--
ALTER TABLE `user_variables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user_variable_values`
--
ALTER TABLE `user_variable_values`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
