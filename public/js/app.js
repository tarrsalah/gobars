var app = {};

var Bar = function(data) {
    this.id = m.prop(data.id);
    this.name= m.prop(data.name);
};

app.vm= {};
app.vm.init = function() {
    var vm = app.vm;
    m.request({
	method:"GET",
	url:"/bars"})
	.then(function(bars) {
	    bars.forEach(function(bar) {
		vm.bars().push(new Bar(bar));
	    });
	});
    vm.bar =  m.prop("");
    vm.bars = m.prop([]);
    vm.add = function() {
	if (vm.bar()) {
	    m.request({
		method:"POST",
		url:"/bars",
		data: {
		    name: vm.bar()
		}})
		.then(function(bar) {
		    vm.bars().push(new Bar(bar));
		});
	}
    };
};

app.view = function() {
    return m("div", {id:"container"},[
	m("header", [
	    m("h1", "Bars")
	]),

	m("div", {class:"bars"},[
	    m("form", {class:"pure-form"}, [
		m("fielset", [
		    m("input", {type: "text",
				value: app.vm.bar(),
				onchange: m.withAttr("value", app.vm.bar)}),
		    m("button",{
			onclick: app.vm.add,
			type:"button",
			class:"pure-button pure-button-primary",
			id:"add"
		    }, "add"),
		])
	    ]),

	    m("ul",
	      app.vm.bars().map(function(b) {
		  return m('li', b.name());
	      }))
	])
    ]);
};

app.controller= function() {
    app.vm.init();
};

m.module(document.getElementById("app"), app);
