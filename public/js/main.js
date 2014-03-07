(function(){
	requirejs.config({
		paths: {
			'jquery': 'vendor/jquery/jquery.min'
		}
	});

	require(['bars'], function(bars){
		bars.init();
	});
})();
