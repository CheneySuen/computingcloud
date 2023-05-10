db.auth('admin-user', 'admin-password')
db.createUser({
    user: 'group404',
    pwd: 'group404',
    roles: ["root"],
});

db = db.getSiblingDB("cart")


