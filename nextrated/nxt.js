$(document).ready(function() {

    //generate pin
    function getRandom() {
        return Math.floor(Math.random()*10000000000000000)+1;
      }
    //getting values from fields
    var $cardField = $('#cards');
    var $amountField = $('#amounts');
    var $quantityField = $('#quantity');
    
    //assigning variables
    // var $type = $('#type-id');  
    // var $amount = $('#amount-id');  
    // var $quantity = $('#quantity-id');
    // var $pin = $('#pin-id');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/posts',
        success: function(data){
            var values = '';
            $.each(data, function(i, newData){
               values += '<tr>'; 
               values += '<td>'+ newData.type+'</td>';
               values += '<td>'+ newData.amount+'</td>';
               values += '<td>'+ newData.quantity+'</td>';
               values += '<td>'+ newData.pin+'</td>';
               values += '<td>'+'<button type="button" class="btn btn-warning"><i class="far fa-edit"></i></button>'
                +' '+'<button type="button" class="btn btn-info"><i class="fas fa-info-circle"></i></button>'+' '+'<button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>'+'</td>';
                values += '</tr>';
            });
            $('#tableId').append(values);
            $('#tableId').DataTable();
        },
        error: function(){
            alert("error loading data");
        }
    });

        $('button').click(function(){
            var fields = {
                type: $cardField.val(),
                amount: $amountField.val(),
                quantity: $quantityField.val(),
                pin: getRandom()
            }
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/posts',
                data: fields,
                success: function(newData){
                var values = '';
                values += '<tr>'; 
                values += '<td>'+ newData.type+'</td>';
                values += '<td>'+ newData.amount+'</td>';
                values += '<td>'+ newData.quantity+'</td>';
                values += '<td>'+ newData.pin+'</td>';
                values += '<td>'+'<button type="button" class="btn btn-warning"><i class="far fa-edit"></i></button>'
                +' '+'<button type="button" class="btn btn-info"><i class="fas fa-info-circle"></i></button>'+' '+'<button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>'+'</td>';
                values += '</tr>';
                $('#tableId').append(values);
                $('#tableId').DataTable();
                },
                error: function(){
                    alert("error loading data");
                }
            });

            $('.delete').click(function(){
                $.ajax({
                    type: 'DELETE',
                    url: 'http://localhost:3000/posts'+id,
                    success: function(){
                       id.remove();
                    }
                });
            });
        })
        
});