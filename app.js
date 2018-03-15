function app(people){
  people = insertAge(people);
  var searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'").toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions and try again. :)");
    app(people);
    break;
  }
}

function searchByTraits(people) {

  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation', 'quit'.");
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
     case "quit":
      return; 
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

  let userInputHeight = promptFor("What is the persons height?", checkValidUserInput); 

  let newArray = people.filter(function (el) {

    if(el.height == userInputHeight) {
      return true;
    }
  });
  return newArray;
}

function searchByWeight(people) {

  let userInputWeight = promptFor("How much does the person weigh?", checkValidUserInput);


  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });
  return newArray;
}

function searchByEyeColor(people) {

  let userInputEyeColor = promptFor("What is the persons eye color?", checkValidUserInput);
  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
  });
  return newArray;
}

function searchByGender(people) {

  let userInputGender = promptFor("What is the persons gender?", checkValidUserInput);

  let newArray = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  return newArray;
}


function searchByAge(people) {
  let userInputAgeAtLeast = promptFor("The person you are looking for at least how old?", checkValidUserInput);
  let userInputAgeAtMost = promptFor("The person you are looking for has a max age of?", checkValidUserInput);
  let newArray = people.filter(function (el) {
    if ((el.age <= userInputAgeAtMost) && (el.age >= userInputAgeAtLeast)) {
      
      return true;
    }
  });
  return newArray;
}

function searchByOccupation(people) {

  let userInputOccupation = promptFor("What is this persons occupation?", checkValidUserInput);

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
  });
  return newArray;
}

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");
  switch(displayOption){
    case "info":
    displayPerson(person,people);
    break;
    case "family":
    	displayFamily(person,people);
    break;
    case "descendants":
    	displayDescendants(person,people);
    break;
    case "restart":
    app(people);
    break;
    case "quit":
    return; 
    default:
    return mainMenu(person, people);
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
}

function searchById(id,people) {
  let newArray = people.filter(function (el) {
    if(el.id == id) {
      return true;
    }
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

function displayDescendants(person,people){
	let descendants = getDescendants(person,people);
	displayPeople(descendants);
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

function getDescendants(person,people) {
	let child = getChildren(person,people);
	let found = 0;
	while (child.length > found) {
		    child = child.concat(getDescendants(child[found],people));
        found++;
	}
	return child;
}

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

function getFullName(input,people){
	let output = [];
		if (Array.isArray(input)) {
			for (let i = 0; i < input.length; i++){
				output.push(searchById(input[i],people)[0]);
			}
		} else {
			output = searchById(input,people);
		}
	
	  fullname = output.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join(", ");
	return fullname;
}


function displayPerson(person,people){
  var personInfo ="id: " + person.id + "\n";
  personInfo += "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Spouse: " + getFullName(person.currentSpouse,people) + "\n";
  personInfo += "Parent: " + getFullName(person.parents,people) + "\n";

  alert(personInfo);
}

function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input){
  return true; // default validation only
}

function checkValidUserInput(input){
 return input != null || input != "";
 }
