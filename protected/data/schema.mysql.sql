-- User
create table tbl_user (
  id integer not null primary key AUTO_INCREMENT,
  username varchar(128) not null,
  password varchar(128) not null,
  email varchar(128) not null,
  firstname varchar(128),
  lastname varchar(128),
  birthday date,
  photo varchar(128),
  create_date timestamp,
  update_date timestamp
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
  description text,
  status int(1),
  create_date timestamp not null,
  update_date timestamp not null,
  submission_date timestamp
);

create table tbl_submission_contact (
  contactid integer,
  submissionid integer,
  primary key (contactid, submissionid),
  foreign key (contactid) references tbl_contact(id),
  foreign key (submissionid) references tbl_submission(id)
);
