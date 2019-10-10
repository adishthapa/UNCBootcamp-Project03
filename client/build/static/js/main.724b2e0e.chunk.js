(this.webpackJsonpmern=this.webpackJsonpmern||[]).push([[0],{5476:function(e,t,a){e.exports=a(5676)},5673:function(e,t){},5676:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(181),c=a.n(i),o=a(12),l=a(13),s=a(15),u=a(14),m=a(16),p=a(66),h=a(36),d=a(30),g=a.n(d),b=a(47),f=a(67),E=a(48),v=a(182),y=a.n(v),j=a(22),k=a.n(j),x={getUsers:function(){return k.a.get("/api/users")},getUser:function(e){return k.a.get("/api/users/"+e)},saveUser:function(e){return k.a.post("/api/users",e)},createPlayer:function(e){return k.a.post("/api/table/join",e)},leaveQueue:function(e){return k.a.delete("/api/table/leave/"+e)},leaveTable:function(e){return k.a.get("/api/table/leave/"+e)}},O=function(){return window.history.replaceState({},document.title,window.location.pathname)},C=r.a.createContext(),T=function(){return Object(n.useContext)(C)},I=function(e){var t=e.component,a=e.path,i=Object(f.a)(e,["component","path"]),c=T(),o=c.loading,l=c.isAuthenticated,s=c.loginWithRedirect;Object(n.useEffect)((function(){o||l||function(){var e=Object(b.a)(g.a.mark((function e(){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s({appState:{targetUrl:a}});case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()()}),[o,l,s,a]);return r.a.createElement(h.b,Object.assign({path:a,render:function(e){return!0===l?r.a.createElement(t,e):null}},i))},N=a(1),S=a(7),w=a(35),B=a(37),R=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(e){var t=this.context.logout,a=this.props.classes,n=this.props.leaveTable;return r.a.createElement(N.a,{position:"static",className:a.grow},r.a.createElement(N.l,null,r.a.createElement("img",{className:a.logo,alt:"Poker Logo",src:"./assets/img/logo.png"}),r.a.createElement(N.m,{variant:"h6",color:"inherit",className:a.grow},"Poker"),this.props.return?r.a.createElement(N.c,{color:"secondary",variant:"contained",className:a.button,onClick:n},r.a.createElement(B.d,null),"Return to Lobby"):"",this.props.profile?r.a.createElement(N.c,{color:"secondary",variant:"contained",className:a.button,href:"/profile"},r.a.createElement(B.a,null),"Your Profile"):"",this.props.logout?r.a.createElement(N.c,{color:"secondary",variant:"contained",className:a.button,onClick:function(){return t()}},r.a.createElement(B.c,null),"Logout"):""))}}]),t}(n.Component);R.contextType=C;var A=Object(S.withStyles)({grow:{flexGrow:1},button:{marginLeft:5},logo:{height:"50px",filter:"invert(1)"}})(R),P=a(189),M=a(186),D=a(187),L=function(e){function t(e){var a;Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).scrollToBottom=function(){a.el.scrollIntoView({behavior:"smooth"})},a.handleInputChange=function(e){var t=e.target,n=t.name,r=t.value;a.setState(Object(M.a)({},n,r)),a.sendTypingMessage()},a.sendMessage=function(e){e.preventDefault(),console.log(a.state.message),a.socket.emit("SEND_MESSAGE",{author:a.state.username,message:a.state.message}),a.setState({message:"",allMessages:a.state.allMessages.filter((function(e){return e!=="".concat(a.state.username," is typing...")}))})},a.state={allMessages:[],message:"",username:""},a.socket=a.props.socket,a.socket.on("RECEIVE_MESSAGE",(function(e){console.log("RECEIVING MESSAGE SOCKET"),n(e)}));var n=function(e){console.log(e),a.setState({allMessages:[].concat(Object(P.a)(a.state.allMessages),[e])})};return a.sendTypingMessage=function(){a.socket.emit("typing",a.state.username)},a.socket.on("isTyping",(function(e){a.state.allMessages.includes("".concat(e," is typing..."))||(console.log("SOCKET IS TYPING"),n("".concat(e," is typing...")))})),a.socket.on("FLASH",(function(e){console.log(e)})),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.scrollToBottom()}},{key:"componentDidUpdate",value:function(){this.scrollToBottom()}},{key:"render",value:function(e){var t=this,a=this.props.classes;return r.a.createElement(N.j,{className:a.grow},r.a.createElement(N.m,{className:a.header,align:"center",variant:"h6"},"Chat"),r.a.createElement(N.j,{className:a.inner},r.a.createElement(N.j,{className:a.msgDisplay,ref:this.myRef},this.state.allMessages.map((function(e){return Object(D.isEmpty)(e.author)?r.a.createElement("div",null,e.message):r.a.createElement("div",null,e.author,": ",e.message)})),r.a.createElement("div",{ref:function(e){t.el=e}})),r.a.createElement("form",{className:a.container,noValidate:!0,autoComplete:"off"},r.a.createElement(N.k,{key:"message",name:"message",placeholder:"message",value:this.state.message,onChange:this.handleInputChange,label:"Message",className:a.textField,margin:"normal"}),r.a.createElement(N.c,{onClick:this.sendMessage},"Post"))))}}]),t}(n.Component),V=Object(S.withStyles)({container:{display:"flex",flexWrap:"wrap"},grow:{flexGrow:1,height:"35vh",marginTop:5,background:"#1C2022"},header:{color:"#fff"},inner:{margin:5,padding:10,background:"#D5D5D5",height:"25vh"},msgDisplay:{overflowY:"scroll",height:"6rem"}})(L),G=Object(S.createMuiTheme)({typography:{useNextVariants:!0},palette:{primary:{main:"#1C2022"},secondary:w.amber}}),F=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).joinGame=function(e){e.preventDefault();var t=a.context.user;a.socket=a.props.socket,x.getUser(t.email).then((function(e){a.props.setName(e.data.username),x.createPlayer({name:e.data.username,cash:e.data.cash,img:e.data.image,socketId:a.props.socketId}).then((function(e){a.setState({currentPos:e.data.quePos+1,queueLength:e.data.que.length,joined:!0})}))}))},a.leaveQueue=function(e){e.preventDefault();var t=a.context.user;x.leaveQueue(t.nickname).then((function(){a.setState({currentPos:999999,queueLength:999999,joined:!1})}))},a.state={currentPos:999999,queueLength:999999,joined:!1,prime:!1},a.socket=a.props.socket,a.socket.on("ADDPLAYER",(function(e){a.state.joined&&a.setState({queueLength:e.que.length})})),a.socket.on("PRIME",(function(){a.props.position>=0&&a.setState({prime:!0})})),a.socket.on("LEAVEQUE",(function(e){var t=a.context.user;if(a.state.joined){var n=e.que.map((function(e){return e.name})).indexOf(t.nickname);a.setState({currentPos:n+1,queueLength:e.que.length})}})),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.context,t=e.isAuthenticated,a=e.loginWithPopup,i=(e.logout,this.props.classes);return this.state.prime?r.a.createElement(h.a,{to:"/table"}):r.a.createElement(S.MuiThemeProvider,{theme:G},!t&&r.a.createElement(n.Fragment,null,r.a.createElement(A,null),r.a.createElement(N.i,{container:!0,alignItems:"flex-end",className:i.background},r.a.createElement(N.i,{className:i.landingContainer,container:!0,alignItems:"center",justify:"center"},r.a.createElement(N.c,{variant:"contained",color:"secondary",className:i.button,onClick:function(){return a({})}},r.a.createElement(N.m,{variant:"h5"},r.a.createElement(B.e,null),"Log In"))),r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.j,{className:i.footer})))),t&&r.a.createElement(n.Fragment,null,r.a.createElement(A,{profile:"true",logout:"true"}),r.a.createElement(N.i,{className:i.background,container:!0,alignItems:"flex-end",justify:"center"},r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,className:i.container,justify:"center",alignItems:"center"},r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.m,{className:i.welcome,align:"center",variant:"h4"},r.a.createElement("strong",null,"Welcome to the Lobby!"))),r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},this.state.joined?r.a.createElement(N.c,{disabled:!0,onClick:this.joinGame,className:i.button,color:"secondary",variant:"contained"},r.a.createElement(N.m,{variant:"h5"},r.a.createElement(B.b,null),"Join Table")):r.a.createElement(N.c,{onClick:this.joinGame,className:i.button,color:"secondary",variant:"contained"},r.a.createElement(N.m,{variant:"h5"},r.a.createElement(B.b,null),"Join Table")),this.state.joined&&r.a.createElement(n.Fragment,null,r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.m,{align:"center",variant:"h6"},r.a.createElement("strong",null,"Current Queue Position: ",this.state.currentPos," ","out of ",this.state.queueLength))),r.a.createElement(N.c,{onClick:this.leaveQueue,color:"secondary",variant:"contained"},"Leave Queue")))))),r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.j,{className:i.footer})))))}}]),t}(n.Component);F.contextType=C;var U=Object(S.withStyles)({landingContainer:{height:"70vh"},background:{margin:0,height:"95vh",backgroundImage:"url('/assets/img/lobbybg.png')",backgroundRepeat:"repeat"},container:{height:"60vh",flexGrow:1,padding:5},button:{height:"15vh",width:"30vh",borderRadius:"15vh"},welcome:{textShadow:"1px 1px 3px #FFFFFF"},footer:{background:"#1c2022",flexGrow:1,height:"10vh"}})(F),W=a(38),q=a.n(W),z=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).getStyle=function(e,t,a){return e.didFold?a.folded:e.isAllIn?a.allIn:e.position===t?a.active:a.paper},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.classes,t=this.props,a=t.playerInfo,i=t.actionTo;return r.a.createElement(n.Fragment,null,r.a.createElement(N.j,{className:this.getStyle(a,i,e)},r.a.createElement(N.i,{container:!0},r.a.createElement(N.i,{item:!0,xs:4},r.a.createElement(N.b,{className:e.avatar,alt:"Player Avatar",src:a.img?a.img:"https://placehold.it/200"})),r.a.createElement(N.i,{item:!0,xs:12,sm:8},r.a.createElement(N.m,{variant:"body1"},a.name),r.a.createElement(N.m,{variant:"subtitle1"},a.chips)))))}}]),t}(n.Component),Q=Object(S.withStyles)({paper:{padding:10,borderRadius:"5vh",flexGrow:1,margin:5},avatar:{border:"3px solid #424242"},active:{border:"3px solid #00ff00",padding:10,borderRadius:"5vh",flexGrow:1,margin:5},folded:{opacity:.5,padding:10,borderRadius:"5vh",flexGrow:1,margin:5},allIn:{border:"3px solid #ff6600",padding:10,borderRadius:"5vh",flexGrow:1,margin:5}})(z),Y=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(e){var t=this.props.classes,a=this.props.src;return r.a.createElement(n.Fragment,null,r.a.createElement(N.j,{className:t.paper,style:a.length>0?{backgroundImage:"url(".concat(a,")"),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center"}:{}}),r.a.createElement(N.j,null),r.a.createElement(N.j,null),r.a.createElement(N.j,null),r.a.createElement(N.j,null))}}]),t}(n.Component),J=Object(S.withStyles)({paper:{height:100,width:70,margin:5,background:"#1a643f"}})(Y),K=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(e){var t=this.props.classes;return"D"===this.props.type?r.a.createElement("div",{className:t.dealer}):"SB"===this.props.type?r.a.createElement("div",{className:t.sb}):"BB"===this.props.type?r.a.createElement("div",{className:t.bb}):"C"===this.props.type?r.a.createElement("div",{className:t.chip}):r.a.createElement("div",{className:t.empty})}}]),t}(n.Component),_=Object(S.withStyles)({dealer:{height:"30px",width:"30px",background:"url('./assets/img/dealer.png')",backgroundSize:"30px 30px"},sb:{height:"30px",width:"30px",background:"url('./assets/img/SB.png')",backgroundSize:"30px 30px"},bb:{height:"30px",width:"30px",background:"url('./assets/img/BB.png')",backgroundSize:"30px 30px"},chip:{height:"30px",width:"30px",background:"url('./assets/img/chips.png')",backgroundSize:"30px 30px"},empty:{height:"30px",width:"30px"}})(K),H=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).getToken=function(e,t,a){var n,r;return 2===a.length?(n=e,(r=e+1)===a.length&&(r=0)):((n=e+1)===a.length&&(n=0),(r=n+1)===a.length&&(r=0)),t===e?"D":t===n?"SB":t===r?"BB":"x"},a.didFold=function(e,t){return e[t].didFold?{opacity:"0.5"}:{}},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(e){var t=this.props.classes,a=this.props,n=a.dealer,i=a.pot,c=a.players,o=a.nextBetAction,l=a.flop,s=a.turn,u=a.river,m=a.actionTo;return r.a.createElement(N.i,{container:!0},r.a.createElement(N.i,{item:!0,xs:3}),r.a.createElement(N.i,{item:!0,xs:3},r.a.createElement(N.i,{container:!0,justify:"center",alignItems:"center",className:t.item},c[0]?r.a.createElement(Q,{playerInfo:c[0],actionTo:m}):null,r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement(_,{type:this.getToken(n,0,c)}),r.a.createElement(_,{type:"x"}))))),r.a.createElement(N.i,{item:!0,xs:3},r.a.createElement(N.i,{container:!0,justify:"center",alignItems:"center",className:t.item},c[1]?r.a.createElement(Q,{playerInfo:c[1],actionTo:m}):null,r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement(_,{type:this.getToken(n,1,c)}),r.a.createElement(_,{type:"C"}))))),r.a.createElement(N.i,{item:!0,xs:3},r.a.createElement(N.i,{container:!0,justify:"flex-end"},r.a.createElement(N.c,{color:"inherit",variant:"contained",onClick:o,className:t.button},"Next Bet Action"))),r.a.createElement(N.i,{container:!0},r.a.createElement(N.i,{item:!0,xs:3},r.a.createElement(N.i,{container:!0,className:t.item},r.a.createElement(N.i,{item:!0,xs:11},c[7]?r.a.createElement(Q,{playerInfo:c[7],actionTo:m}):null),r.a.createElement(N.i,{item:!0,xs:1},r.a.createElement(_,{type:this.getToken(n,7,c)}),r.a.createElement(_,{type:"C"}))),r.a.createElement(N.i,{container:!0},r.a.createElement(N.i,{item:!0,xs:11},c[6]?r.a.createElement(Q,{playerInfo:c[6],actionTo:m}):null),r.a.createElement(N.i,{item:!0,xs:1},r.a.createElement(_,{type:this.getToken(n,6,c)}),r.a.createElement(_,{type:"C"})))),r.a.createElement(N.i,{item:!0,xs:6},r.a.createElement(N.i,{container:!0,height:1,className:t.cardContainer,justify:"center",alignItems:"center"},r.a.createElement(J,{src:l.length>0?l[0].frontImage:""}),r.a.createElement(J,{src:l.length>0?l[1].frontImage:""}),r.a.createElement(J,{src:l.length>0?l[2].frontImage:""}),r.a.createElement(J,{src:s?s.frontImage:""}),r.a.createElement(J,{src:u?u.frontImage:""})),r.a.createElement(N.i,{container:!0,justify:"center",alignItems:"center"},r.a.createElement("img",{className:t.potChips,alt:"Total Pot",src:"./assets/img/potChips.png"}),r.a.createElement(N.m,{variant:"h6"},"$".concat(i)))),r.a.createElement(N.i,{item:!0,xs:3},r.a.createElement(N.i,{container:!0,className:t.item},r.a.createElement(N.i,{item:!0,xs:1},r.a.createElement(_,{type:this.getToken(n,2,c)}),r.a.createElement(_,{type:"C"})),r.a.createElement(N.i,{item:!0,xs:11},c[2]?r.a.createElement(Q,{playerInfo:c[2],actionTo:m}):null)),r.a.createElement(N.i,{container:!0},r.a.createElement(N.i,{item:!0,xs:1},r.a.createElement(_,{type:this.getToken(n,3,c)}),r.a.createElement(_,{type:"x"})),r.a.createElement(N.i,{item:!0,xs:11},c[3]?r.a.createElement(Q,{playerInfo:c[3],actionTo:m}):null,r.a.createElement(N.i,{item:!0,xs:12})),r.a.createElement(N.i,{container:!0},r.a.createElement(N.i,{item:!0,xs:12})))),r.a.createElement(N.i,{item:!0,xs:3}),r.a.createElement(N.i,{item:!0,xs:3},r.a.createElement(N.i,{container:!0,justify:"center",alignItems:"center",className:t.item},r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement(_,{type:this.getToken(n,5,c)}),r.a.createElement(_,{type:"x"}))),c[5]?r.a.createElement(Q,{playerInfo:c[5],actionTo:m}):null)),r.a.createElement(N.i,{item:!0,xs:3},r.a.createElement(N.i,{container:!0,justify:"center",alignItems:"center",className:t.item},r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement(_,{type:this.getToken(n,4,c)}),r.a.createElement(_,{type:"x"}))),c[4]?r.a.createElement(Q,{playerInfo:c[4],actionTo:m}):null)),r.a.createElement(N.i,{item:!0,xs:3})))}}]),t}(n.Component),$=Object(S.withStyles)({item:{height:"15vh"},button:{margin:5},cardContainer:{height:120},potChips:{height:"100px"}})(H),Z=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(e){var t=this.props.classes,a=this.props.src;return r.a.createElement(n.Fragment,null,r.a.createElement(N.j,{className:t.paper,style:a.length>0?{backgroundImage:"url(".concat(a,")"),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center"}:{}}),r.a.createElement(N.j,null),r.a.createElement(N.j,null),r.a.createElement(N.j,null),r.a.createElement(N.j,null))}}]),t}(n.Component),X=Object(S.withStyles)({paper:{height:100,width:70,margin:5}})(Z),ee=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={sliderValue:e.bigBlind,sliderMax:e.availableChips,minBet:e.minBet},a.handleSliderValueChange=function(e){var t=e.target.value;a.setState({sliderValue:t})},a.BETTING=function(t){k.a.get("api/table/bet/".concat(e.position,"/").concat(t)),a.setState({sliderValue:a.props.minBet+a.props.bigBlind})},a.DEAL=function(e){e.preventDefault(),k.a.get("api/table/deal")},a.FLOP=function(e){e.preventDefault(),k.a.get("api/table/flop")},a.TURN=function(e){e.preventDefault(),k.a.get("api/table/turn")},a.RIVER=function(e){e.preventDefault(),k.a.get("api/table/river")},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentWillReceiveProps",value:function(e){0===e.availableChips&&this.setState({sliderMax:0,sliderValue:0}),e.availableChips!==this.state.sliderMax&&e.minBet!==this.state.minBet?this.setState({sliderMax:e.availableChips,minBet:e.minBet,sliderValue:e.minBet+this.props.bigBlind}):e.availableChips!==this.state.sliderMax?this.setState({sliderMax:e.availableChips}):e.minBet!==this.state.minBet?this.setState({minBet:e.minBet,sliderValue:e.minBet+this.props.bigBlind}):e.minBet>e.availableChips&&this.setState({sliderMax:e.availableChips,sliderValue:e.availableChips})}},{key:"render",value:function(e){var t=this,a=this.props.classes,n=this.props,i=n.cards,c=n.position,o=n.actionTo,l=n.minBet,s=n.bigBlind;n.availableChips,n.currentBet;return r.a.createElement(N.j,{className:a.grow},r.a.createElement(N.m,{variant:"h6",align:"center",className:a.header},"Your Hand"),r.a.createElement(N.j,{className:a.inner},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement(X,{src:i.length>0?i[0].frontImage:""}),r.a.createElement(X,{src:i.length>0?i[1].frontImage:""})),r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement(N.c,{disabled:c!==o,color:"primary",variant:"contained",className:a.button,onClick:function(){return t.BETTING(-1)}},"Fold"),0===l?r.a.createElement(N.c,{disabled:c!==o,color:"primary",variant:"contained",className:a.button,onClick:function(){return t.BETTING(0)}},"check"):null,0===l?r.a.createElement(N.c,{disabled:c!==o,color:"primary",variant:"contained",className:a.button,onClick:function(){return t.BETTING(t.state.sliderValue)}},"Bet"):null,l>0?r.a.createElement(N.c,{disabled:c!==o,color:"primary",variant:"contained",className:a.button,onClick:function(){return t.BETTING(l)}},"Call"):null,l>0?r.a.createElement(N.c,{disabled:c!==o,color:"primary",variant:"contained",className:a.button,onClick:function(){return t.BETTING(t.state.sliderValue)}},"raise"):null),r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement("input",{type:"range",min:l+s,max:this.state.sliderMax,name:"sliderValue",value:this.state.sliderValue,onChange:this.handleSliderValueChange,step:"1"}),r.a.createElement(N.m,{variant:"h6"},"$",this.state.sliderValue))))}}]),t}(n.Component),te=Object(S.withStyles)({grow:{flexGrow:1,height:"35vh",bottom:0,marginTop:5,background:"#1C2022"},button:{margin:5},header:{color:"#fff"},inner:{margin:5,padding:10,background:"#D5D5D5"}})(ee),ae=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(n.Fragment,null,r.a.createElement(N.m,{variant:"h6"},this.props.rank,". ",this.props.username),r.a.createElement(N.i,{container:!0,justify:"center",className:e.grid},this.props.cards.map((function(t){return r.a.createElement(N.j,{style:{backgroundImage:"url(".concat(t.frontImage,")"),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center"},className:e.cards})})),this.props.otherCards.map((function(t){return r.a.createElement(N.j,{style:{backgroundImage:"url(".concat(t.frontImage,")"),backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center"},className:e.cards})}))),1===this.props.rank?r.a.createElement(N.m,null,"WINNER!"):"",r.a.createElement(N.h,null))}}]),t}(n.Component),ne=Object(S.withStyles)({cards:{height:100,width:70,margin:5},grid:{margin:10}})(ae),re=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(a=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={open:!0},a.handleClose=function(){a.setState({open:!1})},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.hands;return r.a.createElement("div",null,r.a.createElement(N.d,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(N.g,{id:"alert-dialog-title"},"Results"),r.a.createElement(N.f,null,e.map((function(e){return r.a.createElement(ne,{username:e.player,cards:e.cards,otherCards:e.otherCards,rank:e.rank})}))),r.a.createElement(N.e,null,r.a.createElement(N.c,{variant:"outlined",onClick:this.handleClose,color:"secondary"},"Close"))))}}]),t}(r.a.Component),ie=Object(S.createMuiTheme)({typography:{useNextVariants:!0},palette:{primary:{main:"#1C2022"},secondary:w.amber}}),ce=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(e){var t=this.props.classes,a=this.props,n=a.leaveTable,i=a.dealer,c=a.pot,o=a.socket,l=a.nextBetAction,s=a.flop,u=a.turn,m=a.river,p=a.playerCards,h=a.players,d=a.position,g=a.actionTo,b=a.minBet,f=a.bigBlind,E=a.hands,v=a.currentBet;return r.a.createElement(S.MuiThemeProvider,{theme:ie},r.a.createElement(q.a,{container:!0,className:t.background},r.a.createElement(A,{return:"true",logout:"true",leaveTable:n}),r.a.createElement($,{actionTo:g,dealer:i,pot:c,players:h,socket:o,nextBetAction:l,flop:s,turn:u,river:m,position:d}),E&&E.length>0?r.a.createElement(re,{hands:E}):"",r.a.createElement(q.a,{container:!0,className:t.grow},r.a.createElement(q.a,{item:!0,xs:12,md:6},r.a.createElement(te,{socket:o,cards:p,position:d,actionTo:g,minBet:b,bigBlind:f,availableChips:h[d]?h[d].chips:0,currentBet:v})),r.a.createElement(q.a,{item:!0,xs:12,md:6},r.a.createElement(V,{socket:o})))))}}]),t}(n.Component),oe=Object(S.withStyles)({grow:{flexGrow:1,bottom:0},background:{backgroundImage:"radial-gradient(#1a643f, #1a643f, black)"}})(ce),le=function(){var e=T(),t=e.loading,a=e.user;return t||!a?r.a.createElement("div",null,"Loading..."):r.a.createElement(N.i,{container:!0,justify:"center",alignItems:"center"},r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement("img",{src:a.picture,alt:"Profile"}))),r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement("h2",null,a.name))),r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement("p",null,a.email))),r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.i,{container:!0,justify:"center"},r.a.createElement(N.c,{variant:"contained",color:"secondary",href:"/"},"Back"))))},se=Object(S.createMuiTheme)({typography:{useNextVariants:!0},palette:{primary:{main:"#1C2022"},secondary:w.amber}}),ue=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(S.MuiThemeProvider,{theme:se},r.a.createElement(A,{logout:"true"}),r.a.createElement(N.i,{container:!0,alignItems:"flex-end",className:e.background},r.a.createElement(N.i,{className:e.landingContainer,container:!0,alignItems:"center",justify:"center"},r.a.createElement(N.j,{className:e.paper},r.a.createElement(le,null))),r.a.createElement(N.i,{item:!0,xs:12},r.a.createElement(N.j,{className:e.footer}))))}}]),t}(n.Component),me=Object(S.withStyles)({landingContainer:{height:"70vh"},background:{margin:0,height:"95vh",backgroundImage:"url('/assets/img/lobbybg.png')",backgroundRepeat:"repeat"},footer:{background:"#1c2022",flexGrow:1,height:"10vh"},paper:{padding:20}})(ue),pe=a(188),he=a.n(pe),de=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(s.a)(this,Object(u.a)(t).call(this,e))).nextBetAction=function(){void 0!==a.state.actionTo&&k.a.get("/api/table/bet/".concat(a.state.actionTo,"/").concat(a.state.minBet))},a.leaveTable=function(){console.log("LEAVE"),k.a.get("/api/table/leave/"+a.state.name)},a.setName=function(e){a.setState({name:e})},a.state={playerCards:[],playerInfo:[],flop:[],hands:[],pot:0,handAction:0,position:-1,name:"",index:0,dealerIndex:0,socketId:"",availableChips:0},a.socket=he.a.connect(),a.socket.on("connect",(function(){a.setState({socketId:a.socket.id})})),a.socket.on("PRIME",(function(e){e.players.forEach((function(e){e.name===a.state.name&&a.setState({position:e.position,availableChips:e.chips})}));var t=e.players,n=e.dealerIndex,r=e.turn,i=e.river,c=e.bigBlind;a.setState({playerInfo:t,handAction:0,dealerIndex:n,flop:[],playerCards:[],turn:r,river:i,bigBlind:c})})),a.socket.on("DEALCARDS",(function(e){k.a.get("/api/player/".concat(a.state.position,"/cards")).then((function(e){a.setState({playerCards:e.data.playerCards}),k.a.get("/api/table/bet/-1/0")}))})),a.socket.on("DOFLOP",(function(e){a.setState({flop:e.flop}),k.a.get("/api/table/bet/-1/0")})),a.socket.on("DOTURN",(function(e){a.setState({turn:e.turn}),k.a.get("/api/table/bet/-1/0")})),a.socket.on("DORIVER",(function(e){a.setState({river:e.river}),k.a.get("/api/table/bet/-1/0")})),a.socket.on("CALCULATEHANDS",(function(e){a.setState({hands:e.hands})})),a.socket.on("PLACEBET",(function(e){var t=e.players,n=e.currentBet,r=e.minBet,i=e.position,c=e.pot;a.setState({playerInfo:t,currentBet:n,minBet:r,actionTo:i,pot:c}),console.log("Next bet is "+r+" to the player at position "+i)})),a.socket.on("LEAVETABLE",(function(e){console.log(e),a.setState({playerCards:[],playerInfo:[],flop:[],hands:[],pot:0,handAction:0,position:-1,dealerIndex:0,availableChips:0}),e.name===a.state.name&&(window.location.href="/")})),a.socket.on("LEAVEQUE",(function(e){console.log(e)})),a.socket.on("PAYOUT",(function(e){var t=e.players,n=e.pot,r=e.hands,i=e.payouts;a.setState({playerInfo:t,pot:n,hands:r}),console.log(r),console.log(i)})),a.socket.on("ERROR",(function(e){console.log("=============ERROR============="),console.log(e),console.log("==============END==============")})),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(h.d,null,r.a.createElement(I,{path:"/table"},r.a.createElement(oe,{actionTo:this.state.actionTo,leaveTable:this.leaveTable,pot:this.state.pot,nextBetAction:this.nextBetAction,players:this.state.playerInfo,socket:this.socket,flop:this.state.flop,turn:this.state.turn,river:this.state.river,playerCards:this.state.playerCards,position:this.state.position,dealer:this.state.dealerIndex,minBet:this.state.minBet,bigBlind:this.state.bigBlind,hands:this.state.hands,currentBet:this.state.currentBet})),r.a.createElement(I,{path:"/profile"},r.a.createElement(me,{leaveTable:this.leaveTable})),r.a.createElement(h.b,{path:"/"},r.a.createElement(U,{socket:this.socket,setName:this.setName,socketId:this.state.socketId,position:this.state.position}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement((function(e){var t=e.children,a=e.onRedirectCallback,i=void 0===a?O:a,c=Object(f.a)(e,["children","onRedirectCallback"]),o=Object(n.useState)(),l=Object(E.a)(o,2),s=l[0],u=l[1],m=Object(n.useState)(),p=Object(E.a)(m,2),h=p[0],d=p[1],v=Object(n.useState)(),j=Object(E.a)(v,2),k=j[0],T=j[1],I=Object(n.useState)(!0),N=Object(E.a)(I,2),S=N[0],w=N[1],B=Object(n.useState)(!1),R=Object(E.a)(B,2),A=R[0],P=R[1];Object(n.useEffect)((function(){(function(){var e=Object(b.a)(g.a.mark((function e(){var t,a,n,r,o;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y()(c);case 2:if(t=e.sent,T(t),!window.location.search.includes("code=")){e.next=10;break}return e.next=7,t.handleRedirectCallback();case 7:a=e.sent,n=a.appState,i(n);case 10:return e.next=12,t.isAuthenticated();case 12:if(r=e.sent,u(r),!r){e.next=19;break}return e.next=17,t.getUser();case 17:o=e.sent,d(o);case 19:w(!1);case 20:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]);var M=function(){var e=Object(b.a)(g.a.mark((function e(){var t,a,n=arguments;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.length>0&&void 0!==n[0]?n[0]:{},P(!0),e.prev=2,e.next=5,k.loginWithPopup(t);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(2),console.error(e.t0);case 10:return e.prev=10,P(!1),e.finish(10);case 13:return e.next=15,k.getUser();case 15:a=e.sent,console.log(a),d(a),u(!0),x.getUser(a.email).then((function(e){e.data?console.log("User already exists!"):x.saveUser({username:a.nickname,email:a.email,image:a.picture}).then((function(e){console.log(e),console.log("User has been added!")})).catch((function(e){return console.log(e)}))})).catch((function(e){return console.log(e)}));case 20:case"end":return e.stop()}}),e,null,[[2,7,10,13]])})));return function(){return e.apply(this,arguments)}}(),D=function(){var e=Object(b.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(!0),e.next=3,k.handleRedirectCallback();case 3:return e.next=5,k.getUser();case 5:t=e.sent,w(!1),u(!0),d(t);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.createElement(C.Provider,{value:{isAuthenticated:s,user:h,loading:S,popupOpen:A,loginWithPopup:M,handleRedirectCallback:D,getIdTokenClaims:function(){return k.getIdTokenClaims.apply(k,arguments)},loginWithRedirect:function(){return k.loginWithRedirect.apply(k,arguments)},getTokenSilently:function(){return k.getTokenSilently.apply(k,arguments)},getTokenWithPopup:function(){return k.getTokenWithPopup.apply(k,arguments)},logout:function(){return k.logout.apply(k,arguments)}}},t)}),{domain:"unc-bootcamp-project03.auth0.com",client_id:"DErnKZ3a7naISsp3FqWWu7Ja593gKtF1",redirect_uri:window.location.origin,onRedirectCallback:function(e){window.history.replaceState({},document.title,e&&e.targetUrl?e.targetUrl:window.location.pathname)}},r.a.createElement(de,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[5476,1,2]]]);
//# sourceMappingURL=main.724b2e0e.chunk.js.map