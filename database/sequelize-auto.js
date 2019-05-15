var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('egg4fun', 'root', 'mysql');

const fs = require("fs").promises;



function autoRun() {
    return new Promise((resolve, reject) => {
        auto.run(function (err) {
            if (err) reject(err);
            resolve(auto);
        });
    })
}

(async () => {
    let res = await autoRun();
    let tables = res.tables;
    for (const key in tables) {
        if (tables.hasOwnProperty(key)) {
            const element = tables[key];
            await fs.writeFile(`./tables-${key}-info.js`, JSON.stringify(element));
        }
    }
    await fs.writeFile("./foreignKeys-info.js", JSON.stringify(res.foreignKeys));
})();