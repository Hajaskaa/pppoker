export function showVotesEvent(
  socket,
  showVotes,
  socketsInTheRoomVoteNumbersElement,
  average
) {
  showVotes.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("showVotesButtonAction", () => {});
  });

  socket.on("updateVoteList", (votesData) => {
    let votes = votesData;

    let child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    while (child2) {
      socketsInTheRoomVoteNumbersElement.removeChild(child2);
      child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    }
    for (let vote of votes) {
      const item = document.createElement("li");
      item.textContent = vote;
      socketsInTheRoomVoteNumbersElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }

    votes = votes
      .filter((word) => word !== "💀")
      .filter((word) => word !== "0");
    if (votes.length) {
      let numbers = votes.map(Number);
      let sum = numbers.reduce((acc, num) => acc + num, 0);
      let avg = sum / numbers.length;

      let roundedAverage = avg % 1 !== 0 ? avg.toFixed(1) : avg;

      average.textContent = "Average: " + roundedAverage;
    } else {
      average.textContent = "Please give meaningful votes! :)";
    }
  });
}
