const express = require("express"); 
const bodyParser = require("body-parser");
const axios = require("axios");
const db_util = require('../utils/db_util')


async function getUrlsFromString(query){
    //check in db first 
    let urls = await db_util.getUrlsFromString(query)
    if(urls){
        console.log("from db")
        return urls
    }

    urls = []
    let currentRequest = `https://otx.alienvault.com/otxapi/indicators/?type=domain&include_inactive=0&sort=-modified&q=${query}&page=1&limit=10`
    while(currentRequest!=null){
        let respond = await axios.get(currentRequest)
        currentRequest = respond.data.next
        urls.push(...extractUrls(respond))
    }
    // let respond = await axios.get(`https://otx.alienvault.com/otxapi/indicators/?type=domain&include_inactive=0&sort=-modified&q=${query}&page=1&limit=${resultsAmount}`);
    // let respond = await axios.get("https://otx.alienvault.com/otxapi/indicators/?type=domain&include_inactive=0&sort=-modified&q=google.com&page=1&limit=10");

    // urls = extractUrls(respond)


    await db_util.addOneToDb(query,urls)
    console.log("from api")
    return urls
}




async function getUrlsFromArray(arr){
    let promises = arr.map(item =>{
        return  getUrlsFromString(item)
    })
    let responds = await Promise.all(promises)
    const ans = {}
    for(let i=0 ; i<arr.length ; i++){
        ans[arr[i]]= responds[i]
    }
    return ans
}

async function deleteByUrl(url){
    return db_util.deleteByUrl(url)
}

async function deleteAll(){
    return db_util.deleteAll()
}


function extractUrls(respond){
    console.log(respond.data.next)
    let data =  respond.data.results
    
    let urls = data.map(item=>item.indicator)
    return urls

}

exports.getUrlsFromString = getUrlsFromString;
exports.getUrlsFromArray = getUrlsFromArray;
exports.deleteByUrl = deleteByUrl;
exports.deleteAll = deleteAll;