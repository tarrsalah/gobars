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
	    type:Bar,
	    data: {
		name: this.name()
	    }
	});
    };

    Bar.prototype.getAll = function() {
	return m.request({
	    method:"GET",
	    url:"/bars",
	    type:Bar
	});
    };

    app.vm= {};
    app.vm.init = function() {
	var bar =  new Bar({name:""}),
	    bars = m.prop([]);
	bar.getAll().then(bars);
	app.vm.bar = bar;
	app.vm.bars = bars;
    };

    app.controller= function() {
	app.vm.init();
	this.add= function() {
	    var vm = app.vm;
	    if (vm.bar.name()) {
		vm.bar.save().then(function(bar) {
		    vm.bars().push(bar);
		    vm.bar.name("");
		});
	    }
	};
    };

    app.watchInput = function(ontype, onenter) {
	return function(e) {
	    ontype(e);
	    if (e.keyCode === 13) {
		onenter();
	    }
	};
    };

    app.view = function(ctr) {
	var bar = app.vm.bar,
	    bars= app.vm.bars;

	return [
	    m("form.pure-form",{onsubmit:function(e){e.preventDefault();}},[
		m("fielset", [
		    m("input", {type: "text",
				onkeypress:
				app.watchInput(
				    m.withAttr("value", bar.name),
				    ctr.add
				),
				value: bar.name()
			       }),
		    m("button#add.pure-button.pure-button-primary", {
			onclick: ctr.add,
			type:"button"},
		      "add")
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
