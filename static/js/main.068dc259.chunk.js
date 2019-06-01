(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){"use strict";n.r(e);var r=n(0),a=n.n(r),i=n(7),o=n.n(i),s=(n(14),n(15),n(1)),h=n(2),l=n(4),c=n(3),u=n(5),f=function(t){function e(){var t,n;Object(s.a)(this,e);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(a)))).state={rotorPosition:0},n.canvases=[],n}return Object(u.a)(e,t),Object(h.a)(e,[{key:"rotate",value:function(t){var e=this;this.setState({rotorPosition:(this.state.rotorPosition+t+this.props.numberOfChars)%this.props.numberOfChars},function(){return e.drawRotor()})}},{key:"componentDidMount",value:function(){this.drawRotor(!1)}},{key:"drawRotor",value:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],e=this.canvases.map(function(t){return t.getContext("2d")});t&&e[1].clearRect(0,0,this.props.width,this.props.height);var n=Math.min(this.props.width,this.props.height)/2,r=[this.props.width/2,this.props.height/2],a=n/12;t||(e[0].beginPath(),e[0].fillStyle="lightgray",e[0].arc(r[0],r[1],n,0,2*Math.PI),e[0].fill(),e[0].strokeStyle="gray",e[0].textAlign="center",e[0].textBaseline="middle",e[0].fillStyle="black",e[0].font="normal "+Math.floor(n/3)+"pt sans-serif",e[0].fillText(this.props.name,r[0],r[1])),e[1].textAlign="center",e[1].textBaseline="middle";for(var i=0;i<this.props.numberOfChars;++i){var o=Math.PI-2*(i-this.state.rotorPosition)*Math.PI/this.props.numberOfChars,s=[r[0]+(n-1.3*a)*Math.sin(o),r[1]+(n-1.3*a)*Math.cos(o)];t||(e[0].beginPath(),e[0].arc(s[0],s[1],a,0,2*Math.PI),e[0].stroke()),e[1].beginPath(),e[1].fillStyle="black",e[1].font="normal "+Math.floor(a)+"pt sans-serif",e[1].fillText(this.props.chars[i],s[0],s[1])}}},{key:"render",value:function(){var t=this;return a.a.createElement("div",{className:"rotor"},a.a.createElement("div",null,this.state.rotorPosition),a.a.createElement("button",{onClick:function(){return t.rotate(1)}},"+1"),a.a.createElement("button",{onClick:function(){return t.rotate(-1)}},"-1"),a.a.createElement("div",{style:{position:"relative",width:this.props.width,height:this.props.height,margin:"20px auto"}},a.a.createElement("canvas",{ref:function(e){return t.canvases[0]=e},width:this.props.width,height:this.props.height,style:{position:"absolute",top:0,left:0}}),a.a.createElement("canvas",{ref:function(e){return t.canvases[1]=e},width:this.props.width,height:this.props.height,style:{position:"absolute",top:0,left:0}})))}}]),e}(a.a.Component),p=function(t){function e(t,n){return Object(s.a)(this,e),Object(l.a)(this,Object(c.a)(e).call(this,t,n,e.alphabet.length))}return Object(u.a)(e,t),Object(h.a)(e,[{key:"encryptAlphabetString",value:function(t){var n=Array.from({length:t.length},function(e,n){return t.charAt(n).toUpperCase()}).filter(function(t){return e.alphabet.indexOf(t)>=0}).map(function(t){return e.alphabet.indexOf(t)});return(n=this.encryptChars(n)).map(function(t){return e.alphabet.charAt(t)}).join("")}}]),e}(function(){function t(e,n,r){if(Object(s.a)(this,t),this.rotorPositions=void 0,this.currentPosition=0,this.reflectorConfiguration=void 0,this.numberOfChars=void 0,n.length!==r&&r%2!==0)throw Error();this.rotorPositions=e,this.reflectorConfiguration=n,this.numberOfChars=r}return Object(h.a)(t,[{key:"resetPosition",value:function(t){if(t){if(this.rotorPositions.length!==t.length)throw Error();this.rotorPositions=t}this.currentPosition=0}},{key:"encryptChar",value:function(t){var e=this;return this.rotorPositions.forEach(function(n,r){var a=n+Math.floor(e.currentPosition/Math.max(e.numberOfChars*r,1));t+=a}),t%=this.numberOfChars,t=this.reflectorConfiguration.find(function(e){return e.includes(t)}).find(function(e){return e!==t}),this.rotorPositions.reverse().forEach(function(n,r){var a=e.rotorPositions.length-r-1,i=n+Math.floor(e.currentPosition/Math.max(e.numberOfChars*a,1));t=t-i+e.numberOfChars}),t%=this.numberOfChars,this.currentPosition++,t}},{key:"encryptChars",value:function(t){var e=this;return t.map(function(t){return e.encryptChar(t)})}}]),t}());p.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ_?";var m=function(t){function e(){var t,n;Object(s.a)(this,e);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(a)))).state={inputChar:null,outputChar:null},n.chars=Array.from({length:p.alphabet.length},function(t,e){return p.alphabet.charAt(e)}),n}return Object(u.a)(e,t),Object(h.a)(e,[{key:"inputButtonSelected",value:function(t){this.setState({input:t})}},{key:"render",value:function(){var t=this;return a.a.createElement("div",{className:"Rotors"},a.a.createElement("h2",null,"Rotors"),a.a.createElement("div",{style:{display:"flex",justifyContent:"center"}},a.a.createElement(f,{numberOfChars:p.alphabet.length,chars:this.chars,width:400,height:400,name:"R1"}),a.a.createElement(f,{numberOfChars:p.alphabet.length,chars:this.chars,width:400,height:400,name:"R2"}),a.a.createElement(f,{numberOfChars:p.alphabet.length,chars:this.chars,width:400,height:400,name:"R3"})),a.a.createElement("div",null,this.chars.map(function(e){return a.a.createElement("button",{key:"input-button-"+e,id:"input-button-"+e,onClick:function(){return t.inputButtonSelected(e)}},e)})),a.a.createElement("div",null,"Input: ",this.state.inputChar),a.a.createElement("div",null,"Output: ",this.state.outputChar))}}]),e}(a.a.Component),d=function(t){function e(){var t,n;Object(s.a)(this,e);for(var r=arguments.length,a=new Array(r),i=0;i<r;i++)a[i]=arguments[i];return(n=Object(l.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(a)))).state={plain:"",encoded:"",encoderConfiguration:["A","A","A"]},n.enigma=new p([0,0,0],Array.from({length:p.alphabet.length/2},function(t,e){return e}).map(function(t){return[t,p.alphabet.length-1-t]})),n.chars=Array.from({length:p.alphabet.length},function(t,e){return p.alphabet.charAt(e)}),n}return Object(u.a)(e,t),Object(h.a)(e,[{key:"encode",value:function(t){var e=this;t=t.replace(" ","_"),t=Array.from({length:t.length},function(e,n){return t.charAt(n).toUpperCase()}).filter(function(t){return e.chars.indexOf(t)>=0}).join(""),this.setState({plain:t}),this.enigma.resetPosition(this.state.encoderConfiguration.map(function(t){return e.chars.indexOf(t)}));var n=this.enigma.encryptAlphabetString(t);this.setState({encoded:n})}},{key:"updateEncoderConfiguration",value:function(t,e){var n=this.state.encoderConfiguration;e.length>=2&&(e=e.charAt(1)),e=e.toUpperCase(),this.chars.indexOf(e)>=0&&(n[t]=e),this.setState({encoderConfiguration:n}),this.encode(this.state.plain)}},{key:"render",value:function(){var t=this;return a.a.createElement("div",{className:"Encoder"},a.a.createElement("h2",null,"Encoder"),a.a.createElement("div",null,a.a.createElement("div",{className:"encoder-configurations"},a.a.createElement("div",{className:"encoder-configurations-title"},"Configurations:"),a.a.createElement("div",null,a.a.createElement("label",{htmlFor:"R1-Configuration"},"R1:"),a.a.createElement("input",{id:"R1-Configuration",value:this.state.encoderConfiguration[0],onChange:function(e){return t.updateEncoderConfiguration(0,e.target.value)}}),a.a.createElement("label",{htmlFor:"R2-Configuration"},"R2:"),a.a.createElement("input",{id:"R2-Configuration",value:this.state.encoderConfiguration[1],onChange:function(e){return t.updateEncoderConfiguration(1,e.target.value)}}),a.a.createElement("label",{htmlFor:"R3-Configuration"},"R3:"),a.a.createElement("input",{id:"R3-Configuration",value:this.state.encoderConfiguration[2],onChange:function(e){return t.updateEncoderConfiguration(2,e.target.value)}}))),a.a.createElement("div",null,a.a.createElement("div",{className:"encoder-input"},a.a.createElement("label",{htmlFor:"PlainInput"},"Plain Text:"),a.a.createElement("input",{id:"PlainInput",value:this.state.plain,onChange:function(e){return t.encode(e.target.value)}})),a.a.createElement("div",{className:"encoder-output"},"Output: ",a.a.createElement("span",{className:"encoder-output-text"},this.state.encoded)))))}}]),e}(a.a.Component),g=function(){return a.a.createElement("div",{className:"App"},a.a.createElement("h1",null,"Enigma"),a.a.createElement(d,null),a.a.createElement("hr",null),a.a.createElement(m,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},8:function(t,e,n){t.exports=n(16)}},[[8,1,2]]]);
//# sourceMappingURL=main.068dc259.chunk.js.map