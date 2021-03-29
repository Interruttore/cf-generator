function getVowels(string){
    let vowels = "";
    for(let char of string){
        if(vowelsList.includes(char)){
            vowels += char;
        }
    }
    return vowels;
}

function getConsonant(string){
    let consonant = "";
    for(let char of string){
        if(!vowelsList.includes(char)){
            consonant += char;
        }
    }
    return consonant;
}



function getComune(search){
    return comuniData.filter(
        function (comuniData) {
            return comuniData.nome == search || comuniData.codice == search;
        }
    )
}

function getStateCode(state){
    return statiData.filter(
        function(statiData){
            return statiData.nome == state;
        }
    )
}


function addLastName(lastName){
    let temp = "";
    lastNameVowels = getVowels(lastName);
    lastNameConsonants = getConsonant(lastName);
    if (lastNameConsonants.length >= 3){
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

function addFirstName(firstName){
    let temp = "";
    firstNameVowels = getVowels(firstName);
    firstNameConsonants = getConsonant(firstName);
    if (firstNameConsonants.length >= 3){
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

function addBirthDate(birthDate, gender){
    let temp = "";
    temp += birthDate.getYear();
    temp += monthDictionary[birthDate.getMonth()];
    date = birthDate.getDate();
    if(gender === "f"){
        temp += date + 40;
    }else if( Math.max(Math.floor(Math.log10(Math.abs(date))), 0) + 1 < 2){
        temp += "0" + date;
    }else{
        temp += date;
    }
    return temp;
}


function addComuneCode(comune){
    let temp = "";
    if(comune != null){
        let code = getComune(comune);
        console.log(code);
        temp += code[0].codice;
    }
    return temp;
}

function addStateCode(state){
    let temp = "";
    let code = getStateCode(state);
    temp +=  "Z" + code[0].codice;    
    return temp;
}


function addControlCode(cf){
    cf = cf.toLowerCase();
    let value = 0;
    for(let i=0; i < cf.length; i++){
        if((i+1) % 2 == 0){
            value += evenControlList[cf[i]];

        }else{
            value += oddControlList[cf[i]];
        }
        
    }
    value = value%26;   
    return controlList[value];
}


function fillLists(){
    for(comune of comuniData){
        $("#comuneListOptions").append($("<option></option>")
        .attr("value",comune.nome)
        .text(comune.nome)
        );
    }

    for(stato of statiData){
        $("#statoListOptions").append($("<option></option>")
        .attr("value",stato.nome)
        .text(stato.nome)
        );
    }
}


$(document).ready( function() {
    
    fillLists();
   
    $("form").submit(function(event){
        cf = "";
        event.preventDefault();
        document.getElementById("cf").innerHTML= "";
        let values = $("form").serializeArray();
        console.log(values);

        let firstName = values[0].value.toLowerCase();
        let lastName = values[1].value.toLowerCase();
        let date = new Date(values[2].value);
        let gender = values[3].value.toLowerCase();
        let comune = values[4].value;
        let state = values[5].value;

        
        cf += addLastName(lastName,lastName);
        cf += addFirstName(firstName,lastName);
        cf += addBirthDate(date, gender);
        if(comune != ""){
            cf += addComuneCode(comune);
        }else{
            cf += addStateCode(state);
        }
        cf += addControlCode(cf);
        document.getElementById("cf").innerHTML = cf.toUpperCase();
        
        
    });

    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    }) 
})

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copyIcon").tooltip('dispose')
                    .attr("title","Copiato!")
                    .tooltip('toggle');   
}

function calcoloInverso(cf){
    //PTRNDR97P11D969U
    let gender;
    let birthDate = cf.slice(9,11);
    let month = cf.slice(8,9);
    console.log(month.toLowerCase());
    month = monthDictionary.indexOf(month.toLowerCase()) + 1;
    if(birthDate > 40){
        gender = "f"
    }else{
        gender = "m"
    }
    let year = cf.slice(6,8);
    let comune = cf.slice(11,15);
    comune = getComune(comune)[0].nome;
    
    console.log(gender,birthDate,month,year,comune);

}





cf = "";
values = "";

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
    "z": 23,
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
    "z": 25,
    
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
    25: "z",
}





