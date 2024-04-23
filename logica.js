/**
 

 */
const typeColor = {
    bug: "#26de81",
    dragon :"#ffeaa7",
    electric :"#fed330",
    fairy:"#f6a4eb",
    fighting:"#7c474a",
    fire:"#ff0f59",
    flying:"#20bcd8",
    grass:"#5b8d68",
    ground:"#dea82a",
    ghost :"#453754",
    ice:"#125075",
    normal:"#f4d3ed",
    poison:"#9c4c8b",
    psychic:"#fc61a4",
    rock:"#4f280e",
    water:"#00a6f1",
    steel :"#8281b6" ,
    dark : "#000000"
}
const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("cart");
const btn = document.getElementById("btn");

//el evento clikl para generar cartas

let getPokedata = () => {
    //gemerar un numero rando beetwn este es el numero del pokemon
    let id = Math.floor(Math.random() * 300) + 1;
    //console.log(id)
    //conbina el numero alaterio del pokemon la la url de la api .
    const urlfinal = url + id ;
   // console.log(urlfinal)
   //fecht
   fetch(urlfinal)
    .then((response) => response.json())
    .then((data) => {
        generadorCartas(data);
        });

};
//generadorCartas 

let generadorCartas = (data)=> {
    console.log(data)
    //comensemos a tomar los datos que nesesitamos
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.
    front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAtk = data.stats[1].base_stat;
    const statdefensa = data.stats[2].base_stat;
    const statvelocidad = data.stats[5].base_stat;

    //generador de color

    const themaColor = typeColor[data.types[0].type.name];
    console.log(themaColor);

    card.innerHTML = `   
        <p class="hp">
        <span>HP</span>
           ${hp}
        </p>
        <img src="${imgSrc}">
        <!--parte inferior de la carta donde va la informacion detallada-->
         <h2 class="poke-name">${pokeName}</h2>
        <!--divisiones de Tipos Hp Atk Def Velocidad-->
         <div class="types">

        </div>
        <div class="estadisticas">
            <div>
            <h3>${statAtk}</h3>
            <p>Ataque</p>
            </div>
            <div>
            <h3>${statdefensa}</h3>
            <p>Defensa</p>
            </div>
            <div>
            <h3>${statvelocidad}</h3>
            <p>Velocidad</p>
            </div>
        </div>`;
        appendTypes(data.types);
        styleCard(themaColor);
}

let appendTypes = (types) => {
    types.forEach((item)  => {
        let span = document.createElement("span");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    
    }) 
};

let styleCard = (color) => {
   card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, #fff 36%)`;
   card.querySelectorAll(".types span").forEach((typeColor) =>{
    typeColor.style.backgroundColor = color;
   })
}
btn.addEventListener("click" , getPokedata);
window.addEventListener("load", getPokedata);

