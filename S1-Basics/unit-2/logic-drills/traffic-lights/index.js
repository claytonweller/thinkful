function doTrafficLights() {
    const activeLight = getActiveLight();
    switch (activeLight){
        case 'red':
            turnRed()
            break
        case 'yellow':
            turnYellow()
            break
        case 'green':
            turnGreen()
            break
        default:
            console.log('There is no light for this color!')    
            break
    }
  
}
  
  // this function randomly returns red, yellow, or green
  // and is called by doTrafficLights.
  // don't modify it!
function getActiveLight() {
    return (['red', 'green', 'yellow'])[Math.floor(Math.random() * 3)];
}
  
  /* From here down, you are not expected to 
     understand.... for now :)  
     
     
     Nothing to see here!
     
  */
  
  function turnOffLights() {
    $('.traffic-light').removeClass('yellow-on red-on green-on');
  }
  
  function turnGreen() {
    turnOffLights();
    $('.green-light').addClass('green-on');
  }
  
  function turnYellow() {
    turnOffLights();
    $('.yellow-light').addClass('yellow-on');
  }
  
  function turnRed() {
    turnOffLights();
    $('.red-light').addClass('red-on');
  }
  
  
  function handleClicks() {
    $('.js-control-lights').click(function() {
      doTrafficLights();
    });
  }
  
  $(function() {
    turnOffLights();
    handleClicks();
  });