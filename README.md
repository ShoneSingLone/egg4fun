# egg4fun



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

```bash
npm i 
egg-msg-flash 
egg-y-validator 
egg-security 
ramda 
chalk
egg-security
uuid
bcrypt
egg-passport
egg-passport-local
egg-jwt
koa-is-json zlib
egg-sequelize 
mysql2
```

`"egg-y-validator": "file:./local_modules/egg-y-validator",`

[egg-passport](https://github.com/eggjs/egg-passport)

egg-y-validator

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```


### 隐藏配置信息
通过dotenv 从配置信息egg4fun_env.confgs里面读取（为了安全，文件位置不在工程目录内）

- MYSQL_PWD
- MYSQL_USER
- SESSION_SECRET



### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org


```js
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js 
│   ├── controller 
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

<ul>
<li><code>app/router.js</code> 用于配置 URL 路由规则，具体参见 <a href="https://eggjs.org/zh-cn/basics/router.html">Router</a>。</li>
<li><code>app/controller/**</code> 用于解析用户的输入，处理后返回相应的结果，具体参见 <a href="https://eggjs.org/zh-cn/basics/controller.html">Controller</a>。</li>
<li><code>app/service/**</code> 用于编写业务逻辑层，可选，建议使用，具体参见 <a href="https://eggjs.org/zh-cn/basics/service.html">Service</a>。</li>
<li><code>app/middleware/**</code> 用于编写中间件，可选，具体参见 <a href="https://eggjs.org/zh-cn/basics/middleware.html">Middleware</a>。</li>
<li><code>app/public/**</code> 用于放置静态资源，可选，具体参见内置插件 <a href="https://github.com/eggjs/egg-static" target="_blank" rel="noopener">egg-static</a>。</li>
<li><code>app/extend/**</code> 用于框架的扩展，可选，具体参见<a href="https://eggjs.org/zh-cn/basics/extend.html">框架扩展</a>。</li>
<li><code>config/config.{env}.js</code> 用于编写配置文件，具体参见<a href="https://eggjs.org/zh-cn/basics/config.html">配置</a>。</li>
<li><code>config/plugin.js</code> 用于配置需要加载的插件，具体参见<a href="https://eggjs.org/zh-cn/basics/plugin.html">插件</a>。</li>
<li><code>test/**</code> 用于单元测试，具体参见<a href="https://eggjs.org/zh-cn/core/unittest.html">单元测试</a>。</li>
<li><code>app.js</code> 和 <code>agent.js</code> 用于自定义启动时的初始化工作，可选，具体参见<a href="https://eggjs.org/zh-cn/basics/app-start.html">启动自定义</a>。关于<code>agent.js</code>的作用参见<a href="https://eggjs.org/zh-cn/core/cluster-and-ipc.html#agent-%E6%9C%BA%E5%88%B6">Agent机制</a>。</li>
</ul>

```bash
npm i egg-mysql --save
```

## sequelize

sequelize init =>config=>.gitignore 

```bash
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file[aliases: migration:create]  
  sequelize model:generate                    Generates a model and its migration[aliases: model:create]  
  sequelize seed:generate                     Generates a new seed file
```

## 插件开发

[plugin](https://eggjs.org/zh-cn/advanced/plugin.html)

# CSRF
[egg-security](https://eggjs.org/zh-cn/basics/middleware.html)
[security](https://eggjs.org/zh-cn/core/security.html)





# 搜索过的问题

[controller not exists](https://github.com/eggjs/egg/issues/2350):主要是在router.js里写错了controller的名字
[app.model.define is not a function](https://github.com/eggjs/egg/issues/3306) 使用`sequelize init`之后的问题

