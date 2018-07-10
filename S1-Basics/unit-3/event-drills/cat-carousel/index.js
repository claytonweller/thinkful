const grabSrc = (imgElement) =>{
   return $(imgElement).attr('src')
}

const grabAlt = (imgElement) =>{
    return $(imgElement).attr('alt')
}

const updateHeroAlt = (newAlt) =>{
    $(".hero").children('img').attr('alt', newAlt)
}

const updateHeroSrc = (newSrc)=>{
    $(".hero").children('img').attr('src', newSrc)
}

$(function() {
    $(".thumbnail").children("img").click(function(event) {
      event.stopPropagation();

    let newAlt = grabAlt(this)
    let newSrc = grabSrc(this)
      
    updateHeroAlt(newAlt)
    updateHeroSrc(newSrc)
    
    });
  });