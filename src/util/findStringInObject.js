// Function to find a string in the object of arrays and return the property name
export function findStringInObjectOfArrays(object, searchString) {
  let foundKey = null;

  // Iterate through the keys (property names) of the object
  for (let key in object) {
    if (
      Object.prototype.hasOwnProperty.call(object, key) &&
      Array.isArray(object[key])
    ) {
      // Iterate through the elements of each array
      for (let i = 0; i < object[key].length; i++) {
        // Check if the array element is a string and contains the search string
        if (
          typeof object[key][i] === "string" &&
          object[key][i].includes(searchString)
        ) {
          foundKey = key;
          break; // Stop iterating if a match is found
        }
      }
    }

    if (foundKey) {
      break; // Stop iterating if a match is found in any array
    }
  }

  return foundKey;
}
