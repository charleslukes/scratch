

$(document).ready(function() {
    //generate pin
    function getRandom() {
        return Math.floor(Math.random()*10000000000000000)+1;
      }
    
    //var values = '';
    

    //getting values from fields
    var $cardField = $('#cards');
    var $amountField = $('#amounts');
    var $quantityField = $('#quantity');
    
    function update(newVal, inputData){
        let values = newVal;
        values +=
        `<tr> 
        <td>${inputData.type}</td>
        <td>${inputData.amount}</td>
        <td>${inputData.quantity}</td>
        <td>${inputData.pin}</td>
        <td><button type="button" class="btn btn-warning"><i class="far fa-edit"></i></button>
        <button type="button" class="btn btn-info"><i class="fas fa-info-circle"></i></button>  <button type="button" class="btn btn-danger" onclick = "deleteFunc(${inputData.id})"><i class="fas fa-trash-alt"></i></button></td>
        </tr>`
        return values;
    }

    //called my get function
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3000/posts',
            success: function(data){
                let newValue = '';
                $.each(data, function(i, newData){
    
                //calling the function
                let ans = update(newValue, newData);
                $('#tableId').append(ans);
                });
                $('#tableId').DataTable();     
            },
            error: function(){
                alert("error loading data");
            }
          });

   //updates when generate button is clicked
        $('.genBut').click(function(){
            var fields = {
                type: $cardField.val(),
                amount: $amountField.val(),
                quantity: $quantityField.val(),
                pin: getRandom() //generates the random number
            }
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3000/posts',
                data: fields,
                success: function(newData){
                let newValue = '';
                let ans = update(newValue, newData);
                $('#tableId').append(ans);
                $('#tableId').DataTable();
                },
                error: function(){
                    alert("error loading data");
                }
            });
        })
        
    
});

//Deleting from the tables
function deleteFunc(id){
    $.ajax({
        type: 'DELETE',
        url: `http://localhost:3000/posts/${id}`,
        success: function(){
            $('#tableId').remove();
            $('#tableId').DataTable();
        },
        error: function(){
            alert('error');
        }
    })
}