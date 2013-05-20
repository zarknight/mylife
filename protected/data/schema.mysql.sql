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
  firstname varchar(128),
  lastname varchar(128),
  email varchar(128),
  relation varchar(128),
  create_date timestamp,
  update_date timestamp
);

-- Message
create table tbl_submission (
  id integer not null primary key AUTO_INCREMENT,
  userid integer not null,
  eventid integer,
  title varchar(128),
  content text,
  create_date timestamp,
  update_date timestamp
);

create table tbl_submission_contact (
  contactid integer not null,
  messageid integer not null
);

create table tbl_event (
  id integer not null primary key AUTO_INCREMENT,
  eventname varchar(128),
  eventdate date,
  description varchar(256),
  create_date timestamp,
  update_date timestamp
);
