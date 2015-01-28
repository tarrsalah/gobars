(function(m) {
    var app = {};

    var Bar = function(data) {
	this.id = m.prop(data.id);
	this.name= m.prop(data.name);
    };

    app.vm= {};
    app.vm.init = function() {
	var vm = app.vm;
	vm.bar =  m.prop("");
	vm.bars = m.prop([]);
	m.request({
	    method:"GET",
	    url:"/bars"
	}).then(function(bars) {
	    bars.forEach(function(bar) {
		vm.bars().push(new Bar(bar));
	    });
	});
    };
    app.vm.add = function() {
	var vm = app.vm;
	if (vm.bar()) {
	    m.request({
		method:"POST",
		url:"/bars",
		data: {
		    name: vm.bar()
		}
	    }).then(function(bar) {
		vm.bars().push(new Bar(bar));
		vm.bar("");
	    });
	}
    };

    app.controller= function() {
	app.vm.init();
    };

    app.view = function() {
	return [
	    m("form.pure-form", [
		m("fielset", [
		    m("input", {type: "text",
				value: app.vm.bar(),
				onchange: m.withAttr("value", app.vm.bar)}),
		    m("button#add.pure-button.pure-button-primary", {
			onclick: app.vm.add,
			type:"button"},
		      "add"),
		])
	    ]),

	    m("ul",
	      app.vm.bars().map(function(b) {
		  return m('li', b.name());
	      }))
	];
    };

    m.module(document.getElementById("bars"), app);
}(m));
