// TODO refactor this mess !
define('bars', ['jquery'], function($) {
	return {
		init : function(){
			$(function() {    
				loadbars();    
				$("#submit").click(addbar);
				$("#bar").keyup(function(key) {
					if (key.which == 13) {
						addbar();
					}
				});
			});

			var loadbars = function() {
				$.ajax("/bars", {
					dataType: 'json',
				})
				.done(function(data) {
						$("#bars").children().remove();
						$.each(data, function(index, item) {
							$("#bars").prepend($("<li>").text(item.Name));
						});
				});
			};

			var addbar = function() {
				$.ajax({
					type: 'POST',
					url: "/bar",
					data: JSON.stringify({name:$("#bar").val()}),
					success: loadbars,
					contentType: 'application/json'
				});
			};
		}
	};
});
