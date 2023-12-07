export function showVotesEvent(
  socket,
  showVotes,
  socketsInTheRoomVoteNumbersElement,
  average
) {
  showVotes.addEventListener("click", (e) => {
    e.preventDefault();
    socket.emit("showVotesButtonAction", (r) => {
      console.log(r);
    });
  });

  socket.on("showVotesFromServer", (e) => {
    let votes = e;

    console.log("votes");
    console.log(votes);
    let child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    while (child2) {
      socketsInTheRoomVoteNumbersElement.removeChild(child2);
      child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    }
    for (let vote of votes) {
      const item = document.createElement("li");
      console.log(vote);
      item.textContent = vote;
      socketsInTheRoomVoteNumbersElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }

    console.log("votes1");
    console.log(votes);
    votes = votes.filter((word) => word !== "💀");
    console.log("votes2");
    console.log(votes);
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
