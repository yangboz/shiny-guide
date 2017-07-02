
## Forward Chaining,Backward Chaining
When you visit your doctor, what goes on in the doctor’s mind, in my opinion is little bit of  forward chaining and backward chaining. Based on the symptoms you have provided, the doctor does forward chaining reasoning to arrive at some  hypothesis.

Then as you may have observed, as your conversation with doctor continues, the doctor tries to elicit more facts by asking you about specific additional  symptoms.  What’s going on at this stage is that the doctor is doing backward chaining to prove the validity of the initial hypothesis by checking with additional facts.

https://pkghosh.wordpress.com/2010/11/20/ruling-with-drools-rule-engine/

http://oncodesign.io/2015/08/10/dynamically-create-rules-using-drools--rule-templates/

### Mahout cold-start

How do I adapt my recommendation engine to cold starts?

https://github.com/grahamjenson/list_of_recommender_systems

### Color difference formulas

RGB: ((r2 - r1)2 + (g2 - g1)2 + (b2 - b1)2)1/2

RGBA: Δr² + Δg² + Δb² + 3 × Δa²

```
max((r₁-r₂)², (r₁-r₂ - a₁+a₂)²) +
max((g₁-g₂)², (g₁-g₂ - a₁+a₂)²) +
max((b₁-b₂)², (b₁-b₂ - a₁+a₂)²)
```

HSV: 

Sqrt((X0 - X1)*(X0 - X1) + (Y0 - Y1)*(Y0 - Y1) + (Z0 - Z1)*(Z0 - Z1))

C² = A² + B² + 2*A*B*Cos(Theta)

https://en.wikipedia.org/wiki/Color_difference

https://www.compuphase.com/cmetric.htm

https://stackoverflow.com/questions/1725505/finding-similar-colors-programatically

https://stackoverflow.com/questions/9018016/how-to-compare-two-colors-for-similarity-difference


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
