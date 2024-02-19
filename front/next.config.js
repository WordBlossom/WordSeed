const path = require("path");

module.exports = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: "@import 'src/styles/styles.scss';",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "velog.velcdn.com",
        port: "",
        // pathname: "",
      },
      {
        protocol: "https",
        hostname: "player.vimeo.com",
        port: "",
        // pathname: "",
      },
    ],
  },
};
