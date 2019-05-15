const chalk = require('chalk')
/**
 ** 用户控制器
 * @class User
 * @extends {C} Egg.Controller
 */
class User extends C {
    /**
     * @description 登陆
     * @memberof User
     */
    async signIn() {
        const {
            ctx
        } = this;
        ctx.verify('user.signin', 'body')
        ctx.body = '登陆'
    }
    /**
     * @description 注册
     * @memberof User
     */
    async signUp() {
        const {
            ctx
        } = this;

        await ctx.verify('user.signup', 'body');
        const json = await ctx.service.user.signUp();
        ctx.body = json;
    } catch (error) {
        l(chalk.blue("chalk.red(error)"), chalk.red(error));
    }
}

module.exports = User