const {makeBadge,ValidationError}=require('badge-maker');
const url=require('url');
const axios=require('axios');
module.exports=async(req,res)=>
{
    const error=function(message)
    {
        res.writeHead(400,{'Content-Type':'image/svg+xml'});
        res.end(makeBadge({color:'red',message:message,style:"for-the-badge"}));
    }
    const urlobj=url.parse(req.url,true,false);
    try{
        if('user' in urlobj.query)
        {
            const dat=await axios.get('https://codeforces.com/api/user.info?handles='+urlobj.query['user']);
            var obj=dat.data;
            if(obj.status!='OK')
            {
                error('no such user');
                return;
            }
            res.setHeader('Content-Type','image/svg+xml');
            res.setHeader("Cache-Control","public, max-age=86400");
            res.writeHead(200);
            var svg;
            if(obj.result[0].rank==undefined) svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'unrated',color:'black'});
            if(obj.result[0].rank=='newbie') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'newbie  '+obj.result[0].rating,color:'808080'});
            if(obj.result[0].rank=='pupil') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'pupil  '+obj.result[0].rating,color:'008000'});
            if(obj.result[0].rank=='specialist') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'specialist  '+obj.result[0].rating,color:'03a89e'});
            if(obj.result[0].rank=='expert') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'expert  '+obj.result[0].rating,color:'00f'});
            if(obj.result[0].rank=='candidate master') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'candidate master  '+obj.result[0].rating,color:'aa00aa'});
            if(obj.result[0].rank=='master') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'master  '+obj.result[0].rating,color:'ff8c00'});
            if(obj.result[0].rank=='international master') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'international master  '+obj.result[0].rating,color:'ff8c00'});
            if(obj.result[0].rank=='grandmaster') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'grandmaster  '+obj.result[0].rating,color:'red'});
            if(obj.result[0].rank=='international grandmaster') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'international grandmaster  '+obj.result[0].rating,color:'red'});
            if(obj.result[0].rank=='legendary grandmaster') svg=makeBadge({labelColor:'grey',label:obj.result[0].handle,style:"for-the-badge",message:'legendary grandmaster  '+obj.result[0].rating,color:'aa0000'});
            res.end(svg);
        }
        else
        {
            error('no user name provide');
            return;
        }
    }catch(e){
        error('no such user');
        return;
    }
}