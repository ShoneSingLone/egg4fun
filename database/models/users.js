/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		inviter_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		username: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		weibo: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		weixin: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		team_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		receive_remote: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		email_verifyed: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		avatar: {
			type: DataTypes.STRING(40),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false
		}
	}, {
		tableName: 'users'
	});
};
