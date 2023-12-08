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
