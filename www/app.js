/*  establim l'url de conexió amb l'API */
const BaseUrlUsers = "http://localhost:3000/api/user";
const BaseUrlTemes = "http://localhost:3000/api/temes";
const BaseUrlFavs = "http://localhost:3000/api/favorit";

/* aquesta funcio comprova si tenim el "romandre sessió activa" */
function checkifLoged(){
    if(!(localStorage.getItem("id") === null)){
        sessionStorage.setItem("id",localStorage.getItem("id"));
        window.location.href = 'http://localhost:3000/website.html';
    }
}

/* aquesta funcio tanca la comanda */
function logOut(){
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'http://localhost:3000/index.html';
}

/* funció per a la gestió de la creació d'una compta */
function signup(){
    let aux = {
        "username" : document.getElementById("userS").value,
        "email" : document.getElementById("emailS").value,
        "passwd" : document.getElementById("passwordS").value,
        "genres": "",
    };

    fetch(BaseUrlUsers+"A", {
        method: "POST",
        body: JSON.stringify(aux),
        headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
                if(res.ok) {
                    res.json().then((res2) => {
                        if(document.getElementById("keepLog").checked){
                            localStorage.setItem("id", res2);
                            sessionStorage.setItem("id",res2);
                            window.location.href = 'http://localhost:3000/website.html';
                        }else{
                            sessionStorage.setItem("id",res2);
                            window.location.href = 'http://localhost:3000/website.html';
                        }
                        
                    });
                }else{
                    alert("aquest correu ja esta siguent utilitzat");
                }
        })
}

/* funció per a la gestió de l'inici de sessió */
function login(){
    let aux = {
        "email" : document.getElementById("emailL").value,
        "passwd" : document.getElementById("passwordL").value
    };
    fetch(BaseUrlUsers+"C", {
        method: "POST",
        body: JSON.stringify(aux),
        headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
                if(res.ok) {
                    res.json().then((res2) => {
                        if(document.getElementById("keepLog").checked){
                            localStorage.setItem("id", res2);
                            sessionStorage.setItem("id",res2);
                            window.location.href = 'http://localhost:3000/website.html';
                        }else{
                            sessionStorage.setItem("id",res2);
                            window.location.href = 'http://localhost:3000/website.html';
                        }
                    });
                }else{
                    alert("usuari o contrasenya no valids");
                }
    })
}

/* funcio per activar el botó de romandre sessió activa */
function mark(){

    if(document.getElementById("keepLog").checked){
        document.getElementById("keepLog").checked = false;
        document.getElementById("keepL1").style.background = '#573b8a';
        document.getElementById("keepL2").style.background = '#573b8a';

    }else{
        document.getElementById("keepLog").checked = true;
        document.getElementById("keepL1").style.background = 'green';
        document.getElementById("keepL2").style.background = 'green';
    }   
}

/* funcio per treure cançons de la llista de favorits */
async function remove2favlist(favsong){
    theme = (favsong.parentElement).outerHTML;
    console.log(theme);

    fav = {
        _idUser: sessionStorage.getItem("id"),
        favsong: theme
    }

     await fetch(BaseUrlFavs+'/rm', {
        method: "POST",
        body: JSON.stringify(fav),
        headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
                if(res.ok) {
                    document.getElementById("fav").innerHTML = ``;
                    loadFavs();
                }else{
                    alert("No s'ha pogut afegir el tema a favorits o ja existeix");

                }
    })

}

/* funcio per afegir cançons de la llista de favorits */
async function add2favlist(favsong){
    theme = (favsong.parentElement).outerHTML;
    fav = {
        "_idUser": sessionStorage.getItem("id"),
        "favsong":  theme.replace('onclick="add2favlist(this)"','onclick="remove2favlist(this)"')
    }

     await fetch(BaseUrlFavs+'/add', {
        method: "POST",
        body: JSON.stringify(fav),
        headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
                if(res.ok) {
                    document.getElementById("fav").innerHTML = ``;
                    loadFavs();
                }else{
                    alert("No s'ha pogut afegir el tema a favorits o ja existeix");

                }
    })
}

/* funcio per carregar la llista de favorits */
function loadFavs(){
    
    fetch(BaseUrlFavs+'/'+sessionStorage.getItem("id"), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
        if(res.ok) {res.json().then((res2) => {
            document.getElementById("fav").innerHTML =`<h1>ENJOY YOUR FAVOURITES ALLWAYS</h1>`;

            document.getElementById("fav").innerHTML += ` <br>`+(res2[0].favlist);

        });
 
        }else{
            alert("No s'han pogut obtenir els temes favorits");

        }
})
}

/* fucio per carregar el menú de generes */
function loadGenres(){

fetch(BaseUrlUsers+'/genre/'+sessionStorage.getItem("id"), {
    method: "GET",
    headers: {
        'Content-Type': 'application/json'
    }}).then((res) => {
        if(res.ok) {
            res.json().then((res2) => {

                document.getElementById('tags').innerHTML = ``;

                if((res2[0].genres).includes('HIP-HOP')){
                    document.getElementById('tags').innerHTML +=  `<button onclick="modifyStatus(this)" class="active">HIP-HOP</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">HIP-HOP</button>`;
                }

                if((res2[0].genres).includes('ELECTRONIC')){
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">ELECTRONIC</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">ELECTRONIC</button>`;
                }

                if((res2[0].genres).includes('ALTERNATIVE')){
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">ALTERNATIVE</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">ALTERNATIVE</button>`;
                }

                if((res2[0].genres).includes('BLUES')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">BLUES</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">BLUES</button>`;
                }

                if((res2[0].genres).includes('CLASSIC')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">CLASSIC</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">CLASSIC</button>`;
                }

                if((res2[0].genres).includes('COUNTRY')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">COUNTRY</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">COUNTRY</button>`;
                }

                document.getElementById('tags').innerHTML += '<br>';

                if((res2[0].genres).includes('DANCE')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">DANCE</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">DANCE</button>`;
                }

                if((res2[0].genres).includes('JAZZ')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">JAZZ</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">JAZZ</button>`;
                }

                if((res2[0].genres).includes('LATIN')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">LATIN</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">LATIN</button>`;
                }

                if((res2[0].genres).includes('POP')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">POP</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">POP</button>`;
                }

                if((res2[0].genres).includes('REAGGE')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">REAGGE</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">REAGGE</button>`;
                }

                if((res2[0].genres).includes('ROCK')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">ROCK</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">ROCK</button>`;
                }

                if((res2[0].genres).includes('R&B-SOUL')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">R&B-SOUL</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">R&B-SOUL</button>`;
                }

                if((res2[0].genres).includes('WORLDWIDE')){

                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="active">WORLDWIDE</button>`;

                }else{
                    document.getElementById('tags').innerHTML += `<button onclick="modifyStatus(this)" class="">WORLDWIDE</button>`;
                }
        })

        }else{

            alert("No s'han pogut obtenir els temes favorits");

        }
})
}

/* funcio per modificar els estatus del genere */
async function modifyStatus(a){
    if(a.classList.contains('active')){ 
        let aux = {
            genre: a.textContent
            }
       await fetch(BaseUrlUsers+'/genre/rm/'+sessionStorage.getItem("id"), {
            method: "PUT",
            body: JSON.stringify(aux),
            headers: {
                'Content-Type': 'application/json'
            }}).then((res) => {
                    if(res.ok) {

                    }else{
                        alert("No s'ha pogut eliminar el genere");
    
                    }
        });
        a.classList.remove('active');
        document.getElementById(a.textContent).remove();
        /* location.reload(); */

    }else{
        let aux = {
            genre: a.textContent
            }
        await fetch(BaseUrlUsers+'/genre/add/'+sessionStorage.getItem("id"), {
            method: "PUT",
            body: JSON.stringify(aux),
            headers: {
                'Content-Type': 'application/json'
            }}).then((res) => {
                    if(!res.ok) {
                        alert("No s'ha pogut afegir el genere");
                    }
        });
        a.classList.add('active');
        showSongs(a.textContent);

    }
}

/* funció per a mostrar saber quina playlist carregar */
async function showplaylist(){
    await fetch(BaseUrlUsers+'/genre/'+sessionStorage.getItem("id"), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
            if(res.ok) {
                res.json().then((res2) => {
                    if((res2[0].genres).includes('HIP-HOP')){
                        showSongs('HIP-HOP');
                    }
                    if((res2[0].genres).includes('ELECTRONIC')){
                        showSongs('ELECTRONIC');
                    }
                    if((res2[0].genres).includes('ALTERNATIVE')){
                        showSongs('ALTERNATIVE');
                    }
                    if((res2[0].genres).includes('BLUES')){
                        showSongs('BLUES');
                    }
                    if((res2[0].genres).includes('CLASSIC')){
                        showSongs('CLASSIC');
                    }
                    if((res2[0].genres).includes('COUNTRY')){
                        showSongs('COUNTRY');
                    }
                    if((res2[0].genres).includes('DANCE')){
                        showSongs('DANCE');
                    }
                    if((res2[0].genres).includes('JAZZ')){
                        showSongs('JAZZ');
                    }
                    if((res2[0].genres).includes('LATIN')){
                        showSongs('LATIN');
                    }
                    if((res2[0].genres).includes('POP')){
                        showSongs('POP');
                    }
                    if((res2[0].genres).includes('REAGGE')){
                        showSongs('REAGGE');
                    }
                    if((res2[0].genres).includes('ROCK')){
                        showSongs('ROCK');
                    }
                    if((res2[0].genres).includes('R&B-SOUL')){
                        showSongs('R&B-SOUL');
                    }
                    if((res2[0].genres).includes('WORLDWIDE')){
                        showSongs('WORLDWIDE');
                    }
                })}
})
}

/* funció per a mostrar la playlist necesària */
function showSongs(style){

    fetch(BaseUrlTemes+'/'+style, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }}).then((res) => {
            if(res.ok) {
                res.json().then((res2) => {
                    document.getElementById('songs').innerHTML += `
                    <div class="style" id="`+style+`">
                    <h1> STYLE: `+style+`</h1>`;
                for(i=0;i < 10;i++){
                    let r1 = Math.random()*(256);
                    let g1 = Math.random()*(256);
                    let b1 = Math.random()*(256);
                    
                    let r2 = Math.random()*(256);
                    let g2 = Math.random()*(256);
                    let b2 = Math.random()*(256);

                    let temp = Math.floor(Math.random() * res2.length);
                    document.getElementById(style).innerHTML += `
                    <div id="theme" align="center" style="background: linear-gradient(70deg,rgb(`+r1+`,`+g1+`,`+b1+`),rgb(`+r2+`,`+g2+`,`+b2+`));">
                    `+res2[temp].ytframe+`
                    <h2>`+res2[temp].name+`</h2>
                    <h3>`+res2[temp].author+`</h3>
                    <i class="fa fa-star-o" style="font-size:60px;" onclick="add2favlist(this)" onmouseover="addclass(this)" onmouseleave="removeclass(this)"></i>
                    </div>`;
                }
                document.getElementById('songs').innerHTML += `</div>`;

                })

            }})
}

/* funcio per a modificar l'estat de l'incone favorits */
function addclass(a){
    a.classList.remove('fa-star-o');
    a.classList.add('fa-star');
}

/* funcio per a modificar l'estat de l'incone favorits */
function removeclass(a){
    a.classList.remove('fa-star');
    a.classList.add('fa-star-o')
}