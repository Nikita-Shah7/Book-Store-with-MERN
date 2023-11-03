const SERVER_PORT = 5555;
const USER = "<username>";
const PASSWORD = "<password>";
const HOST = "localhost";
const DB_PORT = 5432;
const DB1 = "nik1";
const RELATION1 = "Book";
const RELATION2 = "User";
const RELATION3 = "Admin";
const CONNECTION_STRING = `postgresql://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DB1}`;

module.exports = {
    SERVER_PORT, USER, PASSWORD, HOST, DB_PORT, DB1, CONNECTION_STRING
}

