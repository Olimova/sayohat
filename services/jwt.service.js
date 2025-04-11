const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  generateToken(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });

    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token,collback) {
    return jwt.verify(token, this.accessKey,collback);
  }

  async verifyRefreshToken(token,collback) {
    return jwt.verify(token, this.refreshKey,collback);
  }
}

module.exports = new JwtService(
  config.get("jwt.admin.access_key"),
  config.get("jwt.admin.refresh_key"),
  config.get("jwt.admin.access_time"),
  config.get("jwt.admin.refresh_time")
);

