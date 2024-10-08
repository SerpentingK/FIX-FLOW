create database TJT;
USE tjt;
select * from company;

create table company(
company_user varchar(30) not null primary key,
mail varchar(200) not null,
pasw varchar(50) not null
);

create table worker(
wname varchar(50) not null unique,
document varchar(20) not null primary key,
company varchar(30) not null,
wtype enum('administrador', 'tecnico'),
constraint fk_wor_com foreign key (company) references company(company_user)
);

create table bill(
bill_number varchar(20) primary key,
total_price float not null,
entry_date date not null,
delivery_date date,
due float,
client_name varchar(30) not null,
client_phone varchar(20),
payment float,
wname varchar(30) not null,
constraint fk_bill_wor foreign key (wname) references worker(wname)
);

create table phone(
bill_number varchar(20) not null,
phone_ref varchar(30) not null primary key,
model varchar(20) not null,
mark varchar(20) not null,
price float not null,
details varchar(250),
disp_type varchar(20),
delivered boolean,
finished boolean,
constraint fk_pho_bill foreign key (bill_number) references bill(bill_number)
);


create table category(
category varchar(30) primary key
);
create table device(
device varchar(30) primary key
);
create table suppliers(
sname varchar(50) primary key
);
create table spare_parts(
ref int primary key auto_increment,
sname varchar(50),
category varchar(30) not null,
device varchar(30) not null,
units int default 0,
constraint fk_sp_cate foreign key (category) references category(category),
constraint fk_sp_devi foreign key (device) references device(device),
constraint fk_sp_sup foreign key (sname) references suppliers(sname)
);

create table reparation(
ref int primary key auto_increment,
modification int not null,
revenue float,
wname varchar(30) not null,
phone_ref varchar(30) not null,
constraint fk_rep_pho foreign key (phone_ref) references phone(phone_ref),
constraint fk_rep_wor foreign key (wname) references worker(wname)
);

create table use_parts(
rep_ref int,
sp_ref int,
sp_price float,
constraint fk_up_rep foreign key (rep_ref) references reparation(ref),
constraint fk_up_sp foreign key (sp_ref) references spare_parts(ref)
);

create table delivery(
wname varchar(30) not null,
phone_ref varchar(30) not null,
constraint fk_del_pho foreign key (phone_ref) references phone(phone_ref),
constraint fk_del_wor foreign key (wname) references worker(wname)
);