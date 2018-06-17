const checkItem = (element) =>{
    let itemTitle = $(element).parents('li').children('.shopping-item')

    if(itemTitle.attr('class').includes('shopping-item__checked')){
        itemTitle.removeClass('shopping-item__checked')
    } else {
        itemTitle.addClass('shopping-item__checked')
    }
}

const checkItemListen = ()=>{
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event){
        event.preventDefault()
        checkItem(this)
    })
}

const deleteItem = (element)=>{
    $(element).parents('li').remove()
}

const deleteItemListen = ()=>{
    $('.shopping-list').on('click', '.shopping-item-delete', function(event){
        event.preventDefault()
        deleteItem(this)
    })
}

const addItem = (item)=>{
    $('.shopping-list').append(
        `<li><span class="shopping-item">${item}</span><div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div></li>`
    ) 
}

const addItemListen = ()=>{
    $('#js-shopping-list-form').children('button').click(function(event){
        event.preventDefault()
        let item = $(this).siblings('.js-shopping-list-entry').val()
        addItem(item)
    })
}

$(function(){
    addItemListen()
    checkItemListen()
    deleteItemListen()

})