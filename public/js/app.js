(function(m) {
    var app = {};

    var Bar = function(data) {
	this.id = m.prop(data.id);
	this.name= m.prop(data.name);
    };

    Bar.prototype.save = function() {
	return m.request({
	    method:"POST",
	    url:"/bars",
	    data: {
		name: this.name()
	    }
	});
    };

    Bar.prototype.getAll = function() {
	return m.request({
	    method:"GET",
	    url:"/bars"
	});
    };

    app.vm= {};
    app.vm.init = function() {
	var vm = app.vm,
	    bar =  new Bar({name:""}),
	    bars = m.prop([]);

	bar.getAll().then(function(bars) {
	    bars.forEach(function(bar) {
		vm.bars().push(new Bar(bar));
	    });
	});

	vm.bar = bar;
	vm.bars = bars;
    };

    app.controller= function() {
	app.vm.init();
	this.add= function() {
	    var vm = app.vm;

	    if (vm.bar.name()) {
		vm.bar.save().then(function(bar) {
		    vm.bars().push(new Bar(bar));
		    vm.bar.name("");
		});
	    }
	};
    };

    app.view = function(controller) {
	var bar = app.vm.bar,
	    bars= app.vm.bars;

	return [
	    m("form.pure-form", [
		m("fielset", [
		    m("input", {type: "text",
				value: bar.name(),
				onchange: m.withAttr("value", bar.name)}),
		    m("button#add.pure-button.pure-button-primary", {
			onclick: controller.add,
			type:"button"},
		      "add"),
		])
	    ]),

	    m("ul",
	      bars().map(function(b) {
		  return m('li', b.name());
	      }))
	];
    };

    m.module(document.getElementById("bars"), app);
}(m));
