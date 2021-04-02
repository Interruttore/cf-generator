/* eslint-disable max-statements */
/* eslint-disable max-lines */


const vowelsList = ["a","e","i","o","u"];
const monthDictionary = ["a","b","c","d","e","h","l","m","p","r","s","t"];
const oddControlList = {
    "0": 1,
    "1": 0,
    "2": 5,
    "3": 7,
    "4": 9,
    "5": 13,
    "6": 15,
    "7": 17,
    "8": 19,
    "9": 21,
    "a": 1,
    "b": 0,
    "c": 5,
    "d": 7,
    "e": 9,
    "f": 13,
    "g": 15,
    "h": 17,
    "i": 19,
    "j": 21,
    "k": 2,
    "l": 4,
    "m": 18,
    "n": 20,
    "o": 11,
    "p": 3,
    "q": 6,
    "r": 8,
    "s": 12,
    "t": 14,
    "u": 16,
    "v": 10,
    "w": 22,
    "x": 25,
    "y": 24,
    "z": 23
}
const evenControlList = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7,
    "i": 8,
    "j": 9,
    "k": 10,
    "l": 11,
    "m": 12,
    "n": 13,
    "o": 14,
    "p": 15,
    "q": 16,
    "r": 17,
    "s": 18,
    "t": 19,
    "u": 20,
    "v": 21,
    "w": 22,
    "x": 23,
    "y": 24,
    "z": 25
}
const controlList = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
    4: "e",
    5: "f",
    6: "g",
    7: "h",
    8: "i",
    9: "j",
    // eslint-disable-next-line sort-keys
    10: "k",
    11: "l",
    12: "m",
    13: "n",
    14: "o",
    15: "p",
    16: "q",
    17: "r",
    18: "s",
    19: "t",
    20: "u",
    21: "v",
    22: "w",
    23: "x",
    24: "y",
    25: "z"
}





const getVowels = function(string){
    let vowels = "";
    for(const char of string){
        if(vowelsList.includes(char)){
            vowels += char;
        }
    }
    return vowels;
}

const getConsonant = function(string){
    let consonant = "";
    for(const char of string){
        if(!vowelsList.includes(char)){
            consonant += char;
        }
    }
    return consonant;
}

const getComune = function(search){
    // eslint-disable-next-line no-undef
    return comuniData.filter(function (comuniData) {
            return comuniData.nome === search || comuniData.codice === search;
        })
}

const getState = function(search){
    // eslint-disable-next-line no-undef
    return statiData.filter(function(statiData){
            return statiData.nome === search || statiData.codice === search;
        })
}

// eslint-disable-next-line max-statements
const addLastName = function(lastName){
    let temp = "";
    const lastNameVowels = getVowels(lastName);
    const lastNameConsonants = getConsonant(lastName);
    if(lastNameConsonants.length >= 3){
        temp += lastNameConsonants;
    }else{
        temp += lastNameConsonants;
        if(lastNameVowels.length > 0){
            temp += lastNameVowels;
        }
        if(temp.length < 3){
            temp += "X";
        }
    }
    return temp.slice(0,3);
}

// eslint-disable-next-line max-statements
const addFirstName = function(firstName){
    let temp = "";
    const firstNameVowels = getVowels(firstName);
    const firstNameConsonants = getConsonant(firstName);
    if(firstNameConsonants.length >= 3){
        if(firstNameConsonants.length >= 4){
            temp += firstNameConsonants[0];
            temp += firstNameConsonants[2];
            temp += firstNameConsonants[3];
        }else{
            temp += firstNameConsonants;
        }
    }else{
        temp += firstNameConsonants;
        if(firstNameVowels.length > 0){
            temp += firstNameVowels;
        }
        if(temp.length < 3){
            temp += "X";
        }  
    }
    return temp.slice(0,3);
}

const addBirthDate = function(birthDate, gender){
    let temp = "";
    temp += birthDate.getYear();
    temp += monthDictionary[birthDate.getMonth()];
    const date = birthDate.getDate();
    if(gender === "f"){
        temp += date + 40;
    }else if(Math.max(Math.floor(Math.log10(Math.abs(date))), 0) + 1 < 2){
        temp += `0${date}`;
    }else{
        temp += date;
    }
    return temp;
}


const addComuneCode = function(comune){
    let temp = "";
    if(comune !== null){
        const code = getComune(comune);
        temp += code[0].codice;
    }
    return temp;
}

const addStateCode = function(state){
    let temp = "";
    const code = getState(state);
    temp += `Z${code[0].codice}`
    return temp;
}


const addControlCode = function(cf){
    const tempCf = cf.toLowerCase();
    let value = 0;
    for(let index = 0; index < tempCf.length; index += 1){
        if((index + 1) % 2 === 0){
            value += evenControlList[tempCf[index]];

        }else{
            value += oddControlList[tempCf[index]];
        }
        
    }
    value %= 26;   
    return controlList[value];
}


const fillLists = function(){
    // eslint-disable-next-line no-undef
    for(const comune of comuniData){
        $("#comuneListOptions").append($("<option></option>")
        // eslint-disable-next-line dot-location
        .attr("value",comune.nome)
        // eslint-disable-next-line dot-location
        .text(comune.nome));
    }

    // eslint-disable-next-line no-undef
    for(const stato of statiData){
        $("#statoListOptions").append($("<option></option>")
        // eslint-disable-next-line dot-location
        .attr("value",stato.nome)
        // eslint-disable-next-line dot-location
        .text(stato.nome));
    }
}


$(document).ready(function() {
    
    fillLists();
   
    // eslint-disable-next-line max-statements
    $("form").submit(function(event){
        // eslint-disable-next-line no-implicit-globals
        let cf = "";
        event.preventDefault();
        document.getElementById("cf").innerHTML = "";
        const values = $("form").serializeArray();

        const firstName = values[0].value.toLowerCase();
        const lastName = values[1].value.toLowerCase();
        const date = new Date(values[2].value);
        const gender = values[3].value.toLowerCase();
        const comune = values[4].value;
        const state = values[5].value;

        cf += addLastName(lastName,lastName);
        cf += addFirstName(firstName,lastName);
        cf += addBirthDate(date, gender);
        if(comune === ""){
            cf += addStateCode(state);
        }else{
            cf += addComuneCode(comune);
        }
        cf += addControlCode(cf);
        document.getElementById("cf").innerHTML = cf.toUpperCase();
        
        
    });

    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    // eslint-disable-next-line no-unused-vars
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        // eslint-disable-next-line no-undef
        return new bootstrap.Tooltip(tooltipTriggerEl)
    }) 
})

// eslint-disable-next-line no-unused-vars
const copyToClipboard = function(element) {
    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copyIcon").tooltip('dispose')
                    // eslint-disable-next-line dot-location
                    .attr("title","Copiato!")
                    // eslint-disable-next-line dot-location
                    .tooltip('toggle');   
}


 

// eslint-disable-next-line no-unused-vars 
const calcoloInverso = function(){
    const cf = document.getElementById("codiceFiscaleInput").value;
    const year = cf.slice(6,8);
    const comuneOrState = cf.slice(11,15);
    let birthDate = cf.slice(9,11);
    let month = cf.slice(8,9);
    let gender = "";
    month = monthDictionary.indexOf(month.toLowerCase()) + 1;
    if(birthDate > 40){
        gender = "f"
        birthDate -= 40;
    }else{
        gender = "m"
    }
    birthDate = `0${birthDate}`.slice(-2);
    month = `0${month}`.slice(-2);
    const birth = `${birthDate}/${month}/${year}`
    if(comuneOrState.toLowerCase().startsWith("z")){
        const state = getState(parseInt(comuneOrState.slice(1), 10))[0].nome;
        document.getElementById("comuneSpan").innerHTML = state;
    }else{
        const comune = getComune(comuneOrState)[0].nome;
        document.getElementById("comuneSpan").innerHTML = comune;
    }

    document.getElementById("birthdaySpan").innerHTML = birth;
    document.getElementById("genderSpan").innerHTML = gender.toUpperCase();
    document.getElementById("reverseInfo").classList.remove("hidden");
}

if(document.getElementById("reverseButton") !== null){
    document.getElementById("reverseButton").addEventListener("click", calcoloInverso);
}


