USE mysql;
CREATE USER 'descartec'@'%' IDENTIFIED BY 'bob@123';
GRANT ALL ON *.* TO 'descartec'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE descartec;

use descartec;