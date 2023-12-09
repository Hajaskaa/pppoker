export function changePage(pageId) {
  // Hide all sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Show the selected section
  const selectedSection = document.getElementById(pageId);
  selectedSection.classList.add("active");
}

export function copyRoomIdEvent(copyRoomId, roomCode) {
  copyRoomId.addEventListener("click", (e) => {
    e.preventDefault();
    // get the container
    // const roomCodeElement = document.querySelector("#roomCode");
    // Create a fake `textarea` and set the contents to the text
    // you want to copy
    const storage = document.createElement("textarea");
    storage.value = roomCode.innerHTML.split(" ")[1];
    roomCode.appendChild(storage);

    // Copy the text in the fake `textarea` and remove the `textarea`
    storage.select();
    storage.setSelectionRange(0, 99999);
    document.execCommand("copy");
    roomCode.removeChild(storage);
  });
}

export function updateMainGameArea(
  socketsInTheRoomElement,
  socketsInTheRoomVoteNumbersElement,
  averageElement,
  namesInRoom,
  votesInRoom,
  roomState
) {
  let child = socketsInTheRoomElement.lastElementChild;
  //players
  while (child) {
    socketsInTheRoomElement.removeChild(child);
    child = socketsInTheRoomElement.lastElementChild;
  }
  const socketNamesInRoom = namesInRoom;
  for (let socketName of socketNamesInRoom) {
    const item = document.createElement("li");
    item.textContent = socketName;
    socketsInTheRoomElement.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  }

  if (roomState) {
    console.log("updateMainGameIfBranch");
    console.log(namesInRoom, votesInRoom, roomState);
    let votes = votesInRoom;

    let child3 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    while (child3) {
      socketsInTheRoomVoteNumbersElement.removeChild(child3);
      child3 = socketsInTheRoomVoteNumbersElement.lastElementChild;
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

      averageElement.textContent = "Average: " + roundedAverage;
    } else {
      averageElement.textContent = "Please give meaningful votes! :)";
    }
  } else {
    console.log("updateMainGameElseBranch");
    console.log(namesInRoom, votesInRoom, roomState);
    let child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    while (child2) {
      socketsInTheRoomVoteNumbersElement.removeChild(child2);
      child2 = socketsInTheRoomVoteNumbersElement.lastElementChild;
    }
    for (let socketName of socketNamesInRoom) {
      const item = document.createElement("li");
      console.log(socketName);
      item.textContent = "?";
      socketsInTheRoomVoteNumbersElement.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }

    averageElement.textContent = "";
  }
}
