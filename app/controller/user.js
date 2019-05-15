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
        l("signIn", ctx.request.body);
        let res = await ctx.verify('user.signin', 'body');
        l("res", res, res === ctx.request.body);
        ctx.body = '登陆成功';
    }
    /**
     * @description 注册
     * @memberof User
     */
    async signUp() {
        const {
            ctx
        } = this;
        l("signUp", ctx.request.body);
        await ctx.verify('user.signup', 'body');
        const json = await ctx.service.user.signUp();
        ctx.body = json;
    } catch (error) {
        l(chalk.blue("chalk.red(error)"), chalk.red(error));
    }
}

module.exports = User