https://github.com/grahamjenson/list_of_recommender_systems

## Forward Chaining,Backward Chaining
When you visit your doctor, what goes on in the doctor’s mind, in my opinion is little bit of  forward chaining and backward chaining. Based on the symptoms you have provided, the doctor does forward chaining reasoning to arrive at some  hypothesis.

Then as you may have observed, as your conversation with doctor continues, the doctor tries to elicit more facts by asking you about specific additional  symptoms.  What’s going on at this stage is that the doctor is doing backward chaining to prove the validity of the initial hypothesis by checking with additional facts.

### Mahout cold-start

How do I adapt my recommendation engine to cold starts?


#### Database(MySQL) prepare

There's two steps in that process to allow MySQL allow remoe access:

a) Grant privileges. As root user execute:

`
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'password';
`

b) bind to all addresses:

The easiest way is to comment out the line in your my.cnf file:(/etc/mysql/mysql.conf.d/mysqld.cnf )

`
bind-address = 127.0.0.1 
`

and restart mysql

`
service mysql restart
`

#### Database(MySQL) create

`
CREATE DATABASE `td_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
`

#### Database export

```
select
    user_info.*,
    user_item_detail.*,
    consult_info.*,
    mprescription.*,
    einstruction.*
    from user_info 
    left join user_item_detail on user_info.item_id = user_item_detail.id
    left join consult_info on user_info.consult_id = consult_info.id
    left join mprescription on consult_info.pid = mprescription.id
    left join einstruction on consult_info.iid = einstruction.id
     where user_info.consult_id!=-1
     into outfile '/var/lib/mysql-files/user_info_item_detail_consult_presciption_instruction.csv' fields terminated by ',' enclosed by '"' lines terminated by '\n';
```
#### Database migration

```
mysqldump -u root -p  td_test > td_test.sql
```

```
mysql -u root -p  td_test < td_test.sql
```
