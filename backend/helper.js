const jwt = require('jsonwebtoken');

function getOffset(currentPage = 1, listPerPage) {
    return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

function validToken(token) {
    console.log("This guy wants to know if he's in")
    console.log("bro said my token is " + token)
    if (!token) {
        console.log("the fool actually forgot his token")
      return false;
    }
  
    try {
        const decoded = jwt.verify(token.split(" ")[1], "secret");
        console.log(`looks good. role: ${decoded.data[0].role}`)
        return true;
    } catch (error) {
        console.log("what a moron. " + error)
        return false;
    }
}

function administratorToken(token) {
    console.log("This guy wants to know if he's that guy")
    console.log("bro said my token is " + token)
    if (!token) {
        console.log("the fool actually forgot his token")
      return false;
    }
    
    try {
        const decoded = jwt.verify(token.split(" ")[1], "secret");
        console.log(`looks good. role: ${decoded.data[0].role}`)
        if (decoded.data[0].role == "admin") {
            return true;
        }
        return false;
    } catch (error) {
        console.log("what a moron. " + error)
        return false;
    }
}

class AuthorizationError extends Error {
    constructor(message) {
      super(message);
      this.name = 'AuthorizationError';
    }
  }

module.exports = {
    AuthorizationError,
    administratorToken,
    validToken,
    getOffset,
    emptyOrRows
}