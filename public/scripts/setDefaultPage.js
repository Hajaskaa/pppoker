import { changePage } from "./util.js";

export default function setDefaultPage(socket) {
  socket.on("setDefaultPage", () => {
    console.log("Default page set");
    changePage("1");
  });
}
