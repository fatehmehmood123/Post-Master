console.log('Welcome To Project 6 from javascript course');



// Utility Functions:
function getElementFromString(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}

// initialing variables 
let addedParamCount = 0;

// initially hiding the parameter box
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// if user clicks in params box hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
})

// if user clicks in json  box hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    document.getElementById("parametersBox").style.display = "none";


    document.getElementById("requestJsonBox").style.display = "block";
})

// if the user clicks on + button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
    let params = document.getElementById("params");
    let string = ` <div class="row my-2 deleteExtraParameters">
                        <legend for="radio" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</legend>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Enter Parameter ${addedParamCount + 2} key" id="parameterKey${addedParamCount + 2}">
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Enter Parameter ${addedParamCount + 2} value" id="parameterValue${addedParamCount + 2}">
                        </div>
                        <button class="btn btn-primary col deleteParam">-</button>
                    </div>`;

    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);

    // add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {

        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        })
    }
    addedParamCount++;

})

let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
    document.getElementById("responsePrism").innerHTML = 'Please Wait .. Fetching response';

    // fetch all the values user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='RequestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    console.log('Url is', url);
    console.log('requestType is', requestType);
    console.log('contentType is', contentType);

    // COLLECTING PARAMETERS IN AN OBJECT   
    if (contentType == "params") {
        data = {};
        for (let index = 0; index < addedParamCount + 1; index++) {
            if (document.getElementById("parameterKey" + (index + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (index + 1)).value;
                let value = document.getElementById("parameterValue" + (index + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById("requestJsonText").value;
    }
    console.log(data);

    if (requestType == "GET") {
        fetch(url, {
            method: "GET",
        }).then(response => response.text())
            .then((text) => {
                document.getElementById("responsePrism").innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then(response => response.text())
            .then((text) => {
                document.getElementById("responsePrism").innerHTML = text;
                // document.getElementById("responseJsonText").value=text;
                Prism.highlightAll();
            });
    }


})

