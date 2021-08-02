const express = require("express");
const router = express.Router();
const domain_util = require('../utils/domain_util')


// router.post('/:amount', async function(req,res){
//     let arr = req.body
//     let amount = req.params.amount;
//     let ans  = await domain_util.getUrlsFromArray(arr,amount)
//     console.log(ans)
//     res.send(ans);
// });

router.post('', async function(req,res){
    let arr = req.body
    let ans  = await domain_util.getUrlsFromArray(arr)
    res.send(ans);
});


// router.get("/:url&:amount",async(req,res)=>{
//     const url = req.params.url;
//     const amount = req.params.amount;
//     let ans  = await domain_util.getUrlsFromString(url,amount)
//     res.send(ans) 
    
// })

router.get("/:url",async(req,res)=>{
    const url = req.params.url;
    let ans  = await domain_util.getUrlsFromString(url)
    res.send(ans) 
})



router.delete("/all",async (req,res)=>{
    if(await domain_util.deleteAll()){
        res.send('deleted!') 
    }
    else{
        res.send('not deleted') 
    }
    
})

router.delete("/:url",async (req,res)=>{
    const url = req.params.url;
    if(await domain_util.deleteByUrl(url)){
        res.send('deleted!') 
    }
    else{
       res.send('not deleted')  
    }
    
})



module.exports = router;