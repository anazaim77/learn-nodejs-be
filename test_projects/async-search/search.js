const API = require("./mock-api");
const EventEmitter = require("node:events");

class Search extends EventEmitter {
  constructor() {
    super(); // Call parent constructor for proper inheritance
  }
  searchCount = async (term) => {
    if (term === undefined) {
      this.emit("SEARCH_ERROR", { message: "INVALID_TERM" });
      return;
    }
    this.emit("SEARCH_STARTED", term);
    return API.countMatches(term)
      .then((count) => {
        this.emit("SEARCH_SUCCESS", { term, count });
      })
      .catch((error) => {
        console.log("error", error);
        this.emit("SEARCH_ERROR", { message: "CONNECTION_ERROR", term });
      });
  };
}

module.exports = Search;
