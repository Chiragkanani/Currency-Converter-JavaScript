const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromVal = document.querySelector(".from select");
let toVal = document.querySelector(".to select");
let msg = document.querySelector(".msg p");

// console.log(dropdowns)
// console.log(countryList)
// for (const key in countryList) {
//     console.log(key,countryList[key])
//     }


for (const select of dropdowns) {
    for (const countrycode in countryList) {
        let option = document.createElement("option")
        option.innerText=countrycode;
        option.value = countrycode;
        if(select.name==="from" && countrycode==="USD"){
            option.selected = "selected";
        }else if(select.name === "to" && countrycode==="INR"){
            option.selected = "selected";
        }
        select.append(option); 
    }
    select.onchange = () => {
        let img = select.parentElement.querySelector("img");
        let val = select.value;
        img.setAttribute("src", `https://flagsapi.com/${countryList[val]}/flat/32.png`);
    }
    
}

// dropdowns[0].onchange = ()=>{
//     // console.log("hello")
//     let img = document.querySelector("#from");
//     let val = dropdowns[0].value;
//     img.setAttribute("src",`https://flagsapi.com/${countryList[val]}/flat/32.png`);
// }

// dropdowns[1].onchange = ()=>{
//     // console.log("hello")
//     let img = document.querySelector("#to");
//     let val = dropdowns[1].value;
//     img.setAttribute("src",`https://flagsapi.com/${countryList[val]}/flat/32.png`);
// }


btn.addEventListener("click",async(evt)=>{
        evt.preventDefault();
    let alert = document.querySelector("#alert");
        let amount = document.querySelector("#amount");
        let amtVal = amount.value;
        if(amtVal == ""){
            alert.innerText="Enter Amount first";
            setTimeout(() => {
                alert.innerText = "";
            }, 1500)
            exit();
        }else if(amtVal<1){
            alert.innerText="Enter Right Amount";
            setTimeout(() => {
                alert.innerText = "";
            }, 1500)
            exit();
        }
       
        
    const URL = `${base_url}${fromVal.value.toLowerCase()}/${toVal.value.toLowerCase()}.json`
    let responce = await fetch(URL);
    let data = await responce.json();
    // console.log(data.inr)
    let rate = data[toVal.value.toLowerCase()]
    let convertVal = rate*amtVal;
    msg.innerText=`${amtVal} ${fromVal.value} = ${convertVal} ${toVal.value}`

})