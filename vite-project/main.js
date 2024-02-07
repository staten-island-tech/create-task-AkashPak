import "./style.css";
import { DomSelectors } from "./dom.js";

const bogdanIsSmelly = {
  'In Training': 0,
  'Rookie': 1,
  'Fresh': 2,
  'Champion': 5,
  'Ultimate': 3,
  'Armor': 5,
  'Mega': 6,
};

const url = "https://digimon-api.vercel.app/api/digimon";
async function getData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
getData(url)
async function choosedigi() {
  const data = await fetch(url);
  const usabledata = await data.json();
  const filtered = usabledata.filter(
    (a) => a.name === DomSelectors.firstdigimoninput.value
  );
  filtered.forEach((d) => {
    document.querySelector(".flex-container").insertAdjacentHTML(
      "beforeend",
      `<div class="digicard">
<h1 class="diginame">${d.name}</h1>
<img src= "${d.img}" alt="" class="ItemImage">
<h2 class="digilevel">${d.level}</h2>
</div>`
    );
  });
  return filtered;
}
async function Comparison() {
  const usa1 = await levelbynameone()
  const usa2= await levelbynametwo()

 const digifirstlevel = bogdanIsSmelly[usa1];
 const secondigilevel = bogdanIsSmelly[usa2];
 if (digifirstlevel > secondigilevel) {
   DomSelectors.box.insertAdjacentHTML(
     "beforeend",
     `<div class="Result"> 
 <h1 class="Resultlabel">Winner is ${DomSelectors.firstdigimoninput.value} </h1>
 </div>`
   );
 } else if (digifirstlevel < secondigilevel) {
   DomSelectors.box.insertAdjacentHTML(
     "beforeend",
     `<div class="Result"> 
   <h1 class="Resultlabeltwo">Winner is ${DomSelectors.seconddigimoninput.value} </h1>
   </div>`
   );
 } else if (digifirstlevel === secondigilevel) 
   DomSelectors.box.insertAdjacentHTML(
     "beforeend",
     `<div class="Result"> 
   <h1 class="Resultlabelequal"> Tie BABY!!! </h1>
   </div>`
   );
 }


 async function chooseseconddigi() {
  const data = await fetch(url);
  const usabledata = await data.json();
  const filtered = usabledata.filter(
    (a) => a.name === DomSelectors.seconddigimoninput.value
  );
  filtered.forEach((d) => {
    document.querySelector(".flex-container").insertAdjacentHTML(
      "beforeend",
      `<div class="digicard">
<h1 class="diginame">${d.name}</h1>
<img src= "${d.img}" alt="" class="ItemImage">
<h2 class="digilevel">${d.level}</h2>
</div>`
    );
    return filtered;
  });
}
 
async function levelbynameone() {
  try  {
    const data = await fetch(url);
    const usabledata = await data.json();
   const x = usabledata.filter((a)=> a.name === DomSelectors.firstdigimoninput.value)
  if (x.length >0) {
    const actuallvldata = x[0]
     return actuallvldata.level;
    }  else {
      console.log("Cant Find it");
     }
    }
   catch (error) {
         console.log("error")
  }
} 

async function levelbynametwo() {
  try  {
    const data = await fetch(url);
    const usabledata = await data.json();
   const x = usabledata.filter((a)=> a.name === DomSelectors.seconddigimoninput.value)
  if (x.length > 0) {
  const actuallvldata = x[0]
  return actuallvldata.level;}
  } catch (error) {
    console.log("error")
  }}





DomSelectors.formone.addEventListener("submit", async (e) => {
  e.preventDefault();
  levelbynameone()
  choosedigi();
});

DomSelectors.battle.addEventListener("click", async (e) => {
  e.preventDefault();
  Comparison();
});

DomSelectors.formtwo.addEventListener("submit", async (a) => {
  a.preventDefault();
  levelbynametwo();
  chooseseconddigi();
}); 

DomSelectors.reset.addEventListener("click", async (e)=> {
  e.preventDefault();
  DomSelectors.box.innerHTML= null
  DomSelectors.input.value=''
})

