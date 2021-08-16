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
			variationSelect.innerText = "";
			variationDiv.style.display = "none";
		}
	});
	
	start.addEventListener("click", e => {
		var rs = rulesetSelect.value;
		var varn = variationSelect.value;
		var rsFull = rs;
		if(varn != "") {
			rsFull += "-"+varn;
		}
		console.log(rsFull);
	});
	
	console.log("Loaded!");
});