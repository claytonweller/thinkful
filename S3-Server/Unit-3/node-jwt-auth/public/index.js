let JWT = localStorage.getItem('jwt')


const validationCheckClick = () =>{
  $('#validate-button').click(function(event){
    event.preventDefault()
    console.log('val', JWT)

    $.ajax({
      url: "./api/protected/",
      type: "GET",
      beforeSend: function(req){
        req.setRequestHeader('Authorization', `Bearer ${JWT}`)
      },
      contentType: 'application/json'
    })
      .then(res => {
        console.log('PROTECTED', res)
        $('#the-prize').removeAttr('hidden')
        $('#the-prize').html(`<h2>${res}</h2>`)
      })
      .catch(err => console.error(err))
    

  })
}

const listenForLoginClick = () =>{
  $('#login-button').click(function(event){
    event.preventDefault()

    let query = {
      username: $('#user').val(),
      password: $('#password').val()
    }

    $.ajax({
      url: "./api/auth/login",
      type: "POST",
      data: JSON.stringify(query),
      contentType: 'application/json'
    })
      .then(res => {
        console.log('Login POST', res)
        JWT = res.authToken
        localStorage.setItem('jwt', res.authToken);
      })
      .catch(err => console.error(err))

  })
}

const listenForPostClick = () =>{
  $('#post-button').click(function(event){
    event.preventDefault()

    let query = {
      username: $('#user').val(),
      password: $('#password').val()
    }

    $.ajax({
      url: "./api/users/",
      type: "POST",
      data: JSON.stringify(query),
      contentType: 'application/json'
    })
      .then(res => console.log('user POST', res))
      .catch(err => console.error(err))

  })
}

const listenForGetClick = () =>{
  $('#get-button').click(function(event){
    event.preventDefault()

    $.getJSON('./api/users')
      .then(res => console.log('GET', res))
      .catch(err => console.error(err))
  })
}


const manageApp = () =>{
  listenForPostClick()
  listenForLoginClick()
  listenForGetClick()
  validationCheckClick()
}

$(manageApp())