var rs = "";
var rsFull = "";

window.addEventListener("DOMContentLoaded", event => {
	var rulesetSelect = document.getElementById("ruleset");
	var variationSelect = document.getElementById("variation");
	var variationDiv = document.getElementById("variationDiv");
	var start = document.getElementById("start");
	
	rulesetSelect.addEventListener("change", e => {
		if(rulesetSelect.value === "noname") {
			var s = document.createElement("option");
			s.value = "standard";
			s.disabled = true;
			s.textContent = "Standard";
			variationSelect.add(s);
		
			var c = document.createElement("option");
			c.value = "corellian";
			c.disabled = true;
			c.textContent = "Correlian";
			variationSelect.add(c);
		
			var i = document.createElement("option");
			i.value = "Imperial";
			i.disabled = true;
			i.textContent = "Imperial";
			variationSelect.add(i);
			
			variationDiv.style.display = "block";
		} else {
			variationSelect.innerHTML = "";
			variationDiv.style.display = "none";
		}
	});
	
	start.addEventListener("click", e => {
		rs = rulesetSelect.value;
		var varn = variationSelect.value;
		rsFull = rs;
		if(varn != "") {
			rsFull += "-"+varn;
		}
		document.getElementById("game").style = "";
		document.getElementById("startPage").className = "unloaded";
		setTimeout(()=>{document.getElementById("game").className = "loaded";}, 0);
		console.log(rsFull);
		setTimeout(rollDice, 1000);
	});
	
	console.log("Loaded!");
});

function rollDice() {
	var p1die = document.getElementById("p1die");
	var p2die = document.getElementById("p2die");
	var p1fn = Math.ceil(Math.random()*6);
	var p2fn = Math.ceil(Math.random()*6);
	p1die.innerHTML = '<img src="dice/d6-d-'+p1fn+'.svg" alt="Player 1\'s die showing '+p1fn+'" width=64px/>';
	p2die.innerHTML = '<img src="dice/d6-d-'+p2fn+'.svg" alt="Player 2\'s die showing '+p2fn+'" width=64px/>';
	
	document.getElementById("rollSound").play();
	if(p1fn == p2fn) {
		setTimeout(rollDice, 1500);
	} else {
		setTimeout(initGame, 2500, p1fn > p2fn);
	}
}

function initGame(p1Start) {
	console.log("Player "+(p1Start ? "1" : "2")+" is starting first");
	document.getElementById("p1die").style.display = "none";
	document.getElementById("p2die").style.display = "none";
}