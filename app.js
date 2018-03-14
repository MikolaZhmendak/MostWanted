/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  people = insertAge(people);
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }

}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  if (filteredPeople.length > 1) {
 		displayPeople (filteredPeople);
  	searchByTraits(filteredPeople);
  } else {
   
   	let foundPerson = filteredPeople[0];
	  mainMenu(foundPerson, people);
	}
}
function searchByHeight(people) {
  let userInputHeight = prompt("What is the persons height?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}
function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.weight matches userInputHeight
  });

  return newArray;
}
function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What is the persons eye color?");

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.eyeCOlor matches userInputHeight
  });

  return newArray;
}
function searchByGender(people) {
  let userInputGender = prompt("What is the persons gender?");

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    
    }
    // return true if el.gender matches userInputHeight
  });

  return newArray;
}
function searchByAge(people) {
  let userInputAge = prompt("How old is the person you are looking for?");

  let newArray = people.filter(function (el) {
    if(el.age == userInputAge) {
      return true;
    }
    // return true if el.age matches userInput
  });

  return newArray;
}
function searchByOccupation(people) {
  let userInputOccupation = prompt("What is this persons occupation?");

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.occupation matches userInputHeight
  });

  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person);
    // TODO: get person's info
    break;
    case "family":
    	displayFamily(person,people);
    break;
    case "descendants":
    // TODO: get person's descendants
    
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let personFoundByFullName = people.filter(function(el){
    if (el.firstName == firstName && el.lastName == lastName){
      return true;
    }
  });

    mainMenu(personFoundByFullName[0], people);

   // return personFoundByFullName[0];
 /// displayPerson(personFoundByFullName[0]);
   //return personFoundByFullName;

  // TODO: find the person using the name they entered


}
function searchById(id,people) {


  let newArray = people.filter(function (el) {
    if(el.id == id) {
      return true;
    }
    // return true if el.id matches parent
  });
  return newArray;
}
function searchByParentId(parents,people) {
	let newArray = [];
	  newArray = people.filter(function (el) {
			for (let i = 0; i < parents.length; i++) {
		    if(el.id == parents[i]) {
		      return true;
		    }
	    // return true if el.id matches parent
	  }
		
	});
  return newArray;
}
function displayFamily(person,people){
	let spouse = searchById(person.currentSpouse,people);
	let sibling = getSibling(person.parents,people);
	let parents = searchByParentId(person.parents,people);
	let child = getChildren(person,people);
	let family = parents.concat(sibling.concat(spouse.concat(child)));
	displayPeople(family);
}

function getSibling(parents,people) {
	let siblings = [];
  siblings = people.filter(function (el) {
		for (let i = 0; i < parents.length; i++) {
			for (x = 0; x < el.parents.length; x++) {
				if(el.parents[x] == parents[i]) {
		      return true;
		    }
			}
		}
	});
	return siblings;
}
function getChildren(person,people) {
	let child = [];
  child = people.filter(function (el) {
		for (x = 0; x < el.parents.length; x++) {
			if(el.parents[x] == person.id) {
	      return true;
	    }
		}
	});
	return child;
}
// alerts a list of people. function for arrays
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}
function getAge(dob){ 
	let array = dob.split("/");
	let year = Number(array[2]);
	let month = Number(array[0]) - 1;
	let day = Number(array[1]);
	let today = new Date();
	let age = today.getFullYear() - year;
	if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
		age--;
	}
	return age;
}

function insertAge(people) {
	for (let i = 0; i < people.length; i++) {
		people[i].age = getAge(people[i].dob);
	}
	return people;
}

function displayPerson(person){
  // print all of the information about a person:  function for objects
  // height, weight, age, name, occupation, eye color.
  var personInfo ="id: " + person.id + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "		Gender: " + person.gender + "\n";
  personInfo += "		Age: " + person.age + "\n";
  personInfo += "		Height: " + person.height + "\n";
  personInfo += "		Weight: " + person.weight + "\n";
  personInfo += "		Occupation: " + person.occupation + "\n";
  personInfo += "		Eye Color: " + person.eyeColor + "\n";
  personInfo += "		Spouse: " + person.currentSpouse + "\n";  // TODO: finish getting the rest of the information to display
  personInfo += "		Parent: " + person.parents + "\n";  // TODO: finish getting the rest of the information to display

  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
