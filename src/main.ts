var rs = "";
var rsFull = "";
var ctx;

interface Game {
	name: string;
	id: string;
	supported: boolean;
	variants?: Array<Variant>;
}

interface Variant {
	name: string;
	id: string;
	supported: boolean;
}

const games: Array<Game> = [
{name: "Galaxy's Edge", id:"galaxysedge", supported: false},
{name: "Jedi Challenges", id:"jedichallenges", supported: false},
{name: "Brad Bambara", id:"bambara", supported: false},
{name: "DalsianDon", id:"dalsiandon", supported: false},
{name: "Igor Barzilia / Groi", id:"barzilia/groi", supported: false},
{name: "Joe Lutovsky", id:"lutovsky", supported: false},
{name: "Mike Kelley", id:"kelley", supported: false},
{name: "No Name Publishing", id:"noname", supported: false, variants:[
	{name: "Standard", id: "standard", supported: false},
	{name: "Corelian", id: "corellian", supported: false},
	{name: "Imperial", id: "imperial", supported: false}
]},
{name: "Noth", id:"noth", supported: false},
{name: "Paper Dragon Folding", id:"paperdragon", supported: false},
{name: "Steve & Ian Martin", id:"martins", supported: false},
{name: "Tim Ballard", id:"ballard", supported: false}
]

window.addEventListener("DOMContentLoaded", event => {
	var rulesetSelect = document.getElementById("ruleset") as HTMLSelectElement;
	var variationSelect = document.getElementById("variation") as HTMLSelectElement;
	var variationDiv = document.getElementById("variationDiv") as HTMLDivElement;
	var start = document.getElementById("start") as HTMLButtonElement;
	ctx = (document.getElementById("board") as HTMLCanvasElement).getContext("2d");
	
	for(var game of games) {
		var opt = document.createElement("option");
		opt.value = game.id;
		opt.textContent = game.name;
		opt.disabled = !game.supported;
		rulesetSelect.add(opt);
	}
	
	rulesetSelect.addEventListener("change", e => {
		var game = gameFromId(rulesetSelect.value);
		if(game.variants) {
			for(var variant of game.variants) {
				var opt = document.createElement("option");
				opt.value = variant.id;
				opt.textContent = variant.name;
				opt.disabled = !variant.supported;
				variationSelect.add(opt);
			}
			
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

function gameFromId(gameId: string): Game {
	for(var game of games) {
		if(game.id === gameId) {
			return game;
		}
	}
	return null;
}

function variantFromId(variantId: string, game: Game): Variant {
	if(game.variants) {
		return null;
	}
	for(var v of game.variants) {
		if(v.id === variantId) {
			return v;
		}
	}
	return null;
}