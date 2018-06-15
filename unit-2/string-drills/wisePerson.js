const wisePerson = (wiseType, whatToSay) =>{
    if(wiseType === 'Sebastian'){
        return `Wow. Clayton. Great Job! I was going to say "${whatToSay}", but no.`
    } else {
        return `A wise ${wiseType} once said: ${whatToSay}`
    }
}    
    
console.log(wisePerson('Sebastian', 'baaa'))