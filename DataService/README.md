#Mahout cold-start

如何利用 Mahout 去解决推荐时的冷启动，包括用户冷启动（新用户）和物品冷启动（新物品）。这应该说是每一个推荐系统都会面临着的问题，因此推荐系统的研究者们想出了很多的解决方案，不过很抱歉，Mahout 中对于冷启动问题并没有专门的实现，原因很简单，目前的 Mahout 只是一个机器学习算法库（框架），它不是一个推荐系统或推荐引擎。不过，我们还是可以利用 Mahout 中提供的一些算法帮助我们解决冷启动。 

对于新用户，（1）如果是一个注册用户并且已经登录，但没有发生任何用户行为（比如评论、分享、收藏、购买），那么我们可以拿他的注册信息，根据他的性别、年龄、所在地等信息进行推荐，也就是基于人口统计特征的推荐（Demographic-based）；（2）如果是一个注册用户但没有登录，那么我们可以通过 cookie 去识别用户，这个时候 cookie 和 userId 有同等的功效，解决的办法也就和（1）类似了。顺便罗嗦几句，一个成熟的推荐系统能够做到在用户未登录的情况下也能进行推荐，这就告诉我们，标识用户的除了 userId，还有 cookie，所以可以在记录用户喜好的表里增加一列用来存储用户的 cookie，这个视实际情况而定（对于 SNS 站点，如微博需要登录才能使用，不存在此类问题，但是对于淘宝就存在此问题）；（3）对于未注册的新访客，因为没有人口统计信息，所以一般通过一些热卖推荐、随机推荐引导用户浏览、点击、收藏、注册，让用户在网站上发生一些有价值的行为，然后再根据这些行为进行推荐。 

对于新物品，只要有物品的属性，那怕没有任何人对它进行评分，也是可以进行推荐的，方法就是根据物品的属性去推荐，也就是基于内容的推荐（Content-based），通过物品的属性去计算物品之间的相关度。举个例子，如果新加入的物品是一本刚出版的《HBase: The Definitive Guide》，没有任何用户对它进行过评分或购买，假设这个时候有一个用户对《Hadoop in Action》有了很高的评分，那么我们就可以把《HBase: The Definitive Guide》推荐给这个用户，因为这两本书用着共同的属性和特点：计算机、分布式、大数据 ... 

那么如何利用 Mahout 帮忙解决新用户和新物品的冷启动问题呢？一个简单的方法是聚类。对于新用户，我们根据他们的人口统计信息去聚类，把用户划分成一个一个的簇；新物品也是一样的，可以利用物品的属性，如果没有属性，可以对物品的介绍和描述进行分词，抽取出物品的属性和关键词描述，然后根据属性和关键词去聚类，把物品划分成一个一个的簇。

#Database(MySQL) prepare

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

#Database(MySQL) create

`
CREATE DATABASE `td_test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
`