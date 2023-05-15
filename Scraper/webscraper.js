const puppeteer = require('puppeteer');
const jsdom = require('jsdom');
const BaseUrlTemes = "http://localhost:3000/api/temes";

async function scraper(URL, cat){
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(URL);
    const body = await response.text();
    const { window: { document } } = new jsdom.JSDOM(body);
    var artista = document.querySelectorAll('.artist-text#Artist div');
    var titol = document.querySelectorAll('.song-text#title div');
    let song = {};
    let title = new Array();
    for(i=0; i < titol.length; i=i+2){
      title.push(titol[i]);
    }
    for(i=0; i < artista.length; i++){
      var cadena = title[i].textContent+` `+artista[i].textContent;
      var url2check = "https://www.top-charts.com/es/s/"+cadena.replace(".","-").replace(",","-").replace(/ /g,"-").replace("--","-").toLowerCase();
      ytelement = await getUrl(url2check);
      if(ytelement != 'empty'){
        song = {
          "name": artista[i].textContent.toUpperCase(),
          "author": title[i].textContent.toUpperCase(),
          "genre": cat,
          "ytframe": ytelement
        }
        await fetch(BaseUrlTemes, {
          method: "POST",
          body: JSON.stringify(song),
          headers: {
              'Content-Type': 'application/json'
          }})
          console.log(song);
      }
    }
    await browser. close();
  }catch (error){
    console.error(error);
  }
}


async function Scraper(){
  await scraper('https://www.top-charts.com/es/canciones/hip-hop-rap/en-todo-el-mundo/total','HIP-HOP');
  await scraper('https://www.top-charts.com/es/canciones/electronica/en-todo-el-mundo/total','ELECTRONIC');
  await scraper('https://www.top-charts.com/es/canciones/alternativa/en-todo-el-mundo/total','ALTERNATIVE');
  await scraper('https://www.top-charts.com/es/canciones/blues/en-todo-el-mundo/total','BLUES');
  await scraper('https://www.top-charts.com/es/canciones/clasica/en-todo-el-mundo/total','CLASSIC');
  await scraper('https://www.top-charts.com/es/canciones/country/en-todo-el-mundo/total','COUNTRY');
  await scraper('https://www.top-charts.com/es/canciones/dance/en-todo-el-mundo/total','DANCE');
  await scraper('https://www.top-charts.com/es/canciones/jazz/en-todo-el-mundo/total','JAZZ');
  await scraper('https://www.top-charts.com/es/canciones/latina/en-todo-el-mundo/total','LATIN');
  await scraper('https://www.top-charts.com/es/canciones/pop/en-todo-el-mundo/total', 'POP');
  await scraper('https://www.top-charts.com/es/canciones/reggae/en-todo-el-mundo/total','REAGGE');
  await scraper('https://www.top-charts.com/es/canciones/rock/en-todo-el-mundo/total','ROCK');
  await scraper('https://www.top-charts.com/es/canciones/rb-soul/en-todo-el-mundo/total','R&B-SOUL');
  await scraper('https://www.top-charts.com/es/canciones/world/en-todo-el-mundo/total','WORLDWIDE');
}

Scraper();


async function getUrl(link){
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const response = await page.goto(link);
    const body = await response.text();
    const { window: { document } } = new jsdom.JSDOM(body);
    await browser. close();
    element = document.querySelectorAll('iframe');
    if(element[0] == undefined){
      return 'empty';
    }else{
      return element[0].outerHTML;
    }

  }catch (error){
    console.error(error);

  }
}