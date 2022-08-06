/* Replace with your SQL commands */
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  'status' varchar(255) NOT NULL,
  'quantity' int(11) NOT NULL,
  'item_id' int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;