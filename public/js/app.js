var app = {};

app.Bar = function(data) {
    this.id = m.prop(data.id);
    this.name = m.prop(data.name);
};

app.vm = {
    name: m.prop(""),
    bars: m.prop([])
};

app.vm.init = function() {
    m.request({method:"GET", url:"/bars"}).then(app.vm.bars);
};

app.controller= function() {
    app.vm.init();
};

app.view= function() {
    return m("div", {id:"container"},[
	m("header", [
	    m("h1", "Bars")
	]),

	m("div", {class:"bars"},[
	    m("form", {class:"pure-form"}, [
		m("fielset", [
		    m("input", {type: "text"}),
		    m("button",{
			class:"pure-button pure-button-primary",
			id:"add",
			type:"submit"},
		      "add"),
		])
	    ]),
	    // bars
	    m("ul",
	      app.vm.bars().map(function(b) {
	    	  return m('li', b.name);
	      }))
	])
    ]);
};

m.module(document.body, app);
