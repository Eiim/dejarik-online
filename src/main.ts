var rs = "";
var rsFull = "";
var ctx;

window.addEventListener("DOMContentLoaded", event => {
	var rulesetSelect = document.getElementById("ruleset") as HTMLSelectElement;
	var variationSelect = document.getElementById("variation") as HTMLSelectElement;
	var variationDiv = document.getElementById("variationDiv") as HTMLDivElement;
	var start = document.getElementById("start") as HTMLButtonElement;
	ctx = (document.getElementById("board") as HTMLCanvasElement).getContext("2d");
	
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
		document.getElementById("game").style.display = "";
		document.getElementById("startPage").className = "unloaded";
		setTimeout(()=>{document.getElementById("game").className = "loaded";}, 0);
		console.log(rsFull);
		setTimeout(rollDice, 1000);
	});
	
	console.log("Loaded!");
});

function rollDice() {
	var p1die = document.getElementById("p1die") as HTMLImageElement;
	var p2die = document.getElementById("p2die") as HTMLImageElement;
	var p1fn = Math.ceil(Math.random()*6);
	var p2fn = Math.ceil(Math.random()*6);
	p1die.src = 'dice/d6-d-'+p1fn+'.svg';
	p1die.alt = 'Player 1\'s die showing '+p1fn;
	p2die.src = 'dice/d6-d-'+p2fn+'.svg';
	p2die.alt = 'Player 1\'s die showing '+p2fn;
	
	p1die.style.opacity = "1";
	p2die.style.opacity = "1";
	
	//(document.getElementById("rollSound") as HTMLAudioElement).play();
	if(p1fn == p2fn) {
		setTimeout(rollDice, 1500);
	} else {
		setTimeout(initGame, 2500, p1fn > p2fn);
	}
}

function initGame(p1Start: boolean) {
	console.log("Player "+(p1Start ? "1" : "2")+" is starting first");
	document.getElementById("p1die").style.opacity = "0";
	document.getElementById("p2die").style.opacity = "0";
}