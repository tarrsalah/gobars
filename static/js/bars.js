$(function() {    
    loadbars();    

    $("#submit").click(addbar);
    $("#bar").keyup(function(key) {
        if (key.which == 13) {
            addbar();
        }
    });

});

function loadbars() {
    $.ajax("/bars", {
        contentType: "application/json",
        success: function(data) {
            $("#bars").children().remove();
            $.each(data, function(index, item) {
                $("#bars").prepend($("<li>").text(item.Name));
            });
        }
    });
}

function addbar() {
    $.ajax({
        url: "/bar",
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({Name:$("#bar").val()}),
        success: loadbars
    });
}