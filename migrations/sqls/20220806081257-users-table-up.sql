/* Replace with your SQL commands */
CREATE TABLE 'users' (
  'id' int(11) NOT NULL AUTO_INCREMENT,
  'firstname' varchar(255) NOT NULL,
  'lastname' varchar(255) NOT NULL,
  'password' varchar(255) NOT NULL,
  PRIMARY KEY ('id')
) ENGINE=InnoDB DEFAULT CHARSET=utf8;