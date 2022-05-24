class User {
    constructor(username, password, isAdmin, id = null) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.isAdmin = isAdmin;
    }
}


module.exports = User;