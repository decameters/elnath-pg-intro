console.log('client.js has been loaded');

$(document).ready(function(){
    console.log('JQ has been loaded');
    $('#jordansButton').on('click', addNewAirJordans)
    $('#shoes').on('click', '.deleteButton', removeShoe); // listens for this entire section to get clicked,
    // but only fires the removeShoe function when a .deleteButton is clicked
    $('#shoes').on('click', '.saveButton', editShoe);
    getAllShoes();
})

function addNewAirJordans(){
    $.ajax({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
        },
        success: function(response) {
            console.log('response', response);
            getAllShoes();
        }
    })
}

function getAllShoes(){
    $.ajax({
        method: 'GET',
        url: '/shoes',
        success: function(response) {
            // console.log('ajax get response', response);
            $('#shoes').empty(); // .html('') would also work
            for (let i = 0; i < response.length; i++) {
            var shoe = response[i];
            var $newShoeItem = $('<li>' + shoe.name +  '</li>');

            // create and append the save button
            var $saveShoeButton = $('<button class="saveButton">SAVE</button>');
            $newShoeItem.append($saveShoeButton);
            $saveShoeButton.data('id', shoe.id);
    
            // create and append the delete button
            var $deleteShoeButton = $('<button class="deleteButton">DELETE</button>');
            $deleteShoeButton.data('id', shoe.id);
            $newShoeItem.append($deleteShoeButton); // appends INSIDE of the element you are referring to
            // becomes the last element inside of the element you are referring to
            // could put data-id= in the button HTML
            // $('#shoes').append('<li>' + response[i].name + ', ' + response[i].cost + '<button id="delete">DELETE</button>' + '</li>')
            
            // append the new list item to the DOM
            $('#shoes').append($newShoeItem);
            }
        }
    })
}

function removeShoe() {
    // console.log($(this).data());
    
    var shoeIdToRemove = $(this).data().id;
    console.log('remove shoe was clicked, the shoe ID was', shoeIdToRemove);

    $.ajax({
        method: 'DELETE',
        url: '/shoes/' + shoeIdToRemove,
        success: function (response){
            getAllShoes();
        }
    })
}

function editShoe(){
    console.log($(this).data()); // this should log {id: '7'} or whatever the ID is
    // save button next to delete button
    // log the id
    var shoeIdToSave = $(this).data().id;
    console.log('save shoe was clicked, the shoe ID was', shoeIdToSave);

    $.ajax({
        method: 'PUT',
        url: '/shoes/' +shoeIdToSave,
        data: {
            name: 'Moon Boots',
            cost: '0'
        },
        success: function (response) {
            getAllShoes();
        }
    })
}