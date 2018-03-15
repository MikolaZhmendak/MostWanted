var arrayofarrays = [[1],[1,2,5,3,6],[1,2,3]];

// the collection of possibilities
var results = []; 
//this is the funciton that is called recursively
function getOption(currentIndex, parentArray, currentOptionArray){
    //loops through the current index of the parent array
    for(let i = 0; i < parentArray[currentIndex].length; i++){
        // this line takes the currentoptionarray and copies it
        let currentOption = currentOptionArray.slice(0);
        //this adds the currently selected index to the array
        currentOption.push(parentArray[currentIndex][i]);
        //if we have reached the end of the parent array we push to our results
        //else we call the function recursively
        if(currentIndex >= parentArray.length-1){
            results.push(currentOption);
        }
        else{
            // we add 1 to the current index and pass in the new current option array
            // (the one we copied and added to)
            getOption(currentIndex+1, parentArray, currentOption);
        }
    }
}
getOption(0,arrayofarrays,[]);
console.log(results);