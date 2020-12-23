"use strict";
exports.__esModule = true;
exports.User = void 0;
var User = /** @class */ (function () {
    function User(id, email, _token, tokenExpirationDate) {
        this.id = id;
        this.email = email;
        this._token = _token;
        this.tokenExpirationDate = tokenExpirationDate;
    }
    Object.defineProperty(User.prototype, "token", {
        get: function () {
            if (!this.tokenExpirationDate || this.tokenExpirationDate <= new Date()) {
                return null;
            }
            return this._token;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "tokenDuration", {
        get: function () {
            if (!this.token) {
                console.log(this.token);
                return 0;
            }
            return this.tokenExpirationDate.getTime() - new Date().getTime();
        },
        enumerable: false,
        configurable: true
    });
    return User;
}());
exports.User = User;
