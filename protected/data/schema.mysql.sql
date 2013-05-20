-- User
create table tbl_user (
  id integer not null primary key AUTO_INCREMENT,
  username varchar(128) not null,
  password varchar(128) not null,
  email varchar(128) not null
);

insert into tbl_user (username, password, email) values ('test1', 'pass1', 'test1@example.com');
insert into tbl_user (username, password, email) values ('test2', 'pass2', 'test2@example.com');

-- Contact
create table tbl_contact (
  id integer not null primary key AUTO_INCREMENT,
  userid integer not null,
  rolename varchar(128),
  email varchar(128)
);

-- Message
create table tbl_message (
  id integer not null primary key AUTO_INCREMENT,
  userid integer not null,
  rolename varchar(128),
  email varchar(128)
);

create table tbl_message_contact(
  contactid integer not null,
  messageid integer not null
);