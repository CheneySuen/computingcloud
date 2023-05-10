db.auth('admin-user', 'admin-password')
db.createUser({
    user: 'csit6000o',
    pwd: 'csit6000o',
    roles: ["root"],
});

db = db.getSiblingDB("cart")


