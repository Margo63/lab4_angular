$( ".but" ).on( "click", function() {
    //alert(this.id);
    window.location = "https://localhost:8443/admin/users/"+this.id


} );


$('.select_state').on('change', function() {
    // alert(this.value)
    // alert(this.id)
    const data = {
        id: this.id,
        state: this.value
    }
    $.ajax({
        url: '/setState',
        data:JSON.stringify(data),
        dataType:"json",
        headers: {
            'Content-Type': 'application/json'
        },

        type: 'PUT',
        success: function(result) {
           // alert("posted")
            // Do something with the result
        }
    });

});

$('.select_role').on('change', function() {
    // alert(this.value)
    // alert(this.id)

    const data = {
        id: this.id,
        role: this.value
    }
    $.ajax({
        url: '/setRole',
        data:JSON.stringify(data),
        dataType:"json",
        headers: {
            'Content-Type': 'application/json'
        },

        type: 'PUT',
        success: function(result) {
            //alert("posted")
            // Do something with the result
        }
    });
    //alert( $('#select_state').attr("class") );

});

$.get("/getList") .done((data)=>{
    $.each(JSON.parse(data), function(key, entry){
        let SelectState = $('#'+entry.id+'.select_state');
        SelectState.val(entry.state)

        let SelectRole = $('#'+entry.id+'.select_role');
        SelectRole.val(entry.role)

    })

})
