slot_machine = new function(){
	this.maxPlays = 2;
	this.user = {
		lives: this.maxPlays,
		result: "",
		description: "",
	};
	
	this.play = function(){
			random = Math.random();
			
			if(random <= 0.4){
				this.user.result = "winner";
				this.user.description = "Yeah buddy - you's a winner!";
				this.user.lives--;
			}
			else if (random > 0.4 && random <= 0.8){
				this.user.result = "loser";
				this.user.description = "Sorry buddy... Better luck next time.";
				this.user.lives--;
			}
			else{
				this.user.result = "oneup";
				this.user.description = "You just won an extra spin! Go you.";
				this.user.lives++;
			}
			
			this.refresh();
	};
	
	this.refresh = function(){
		results = document.getElementById("results");
		results.innerHTML = this.user.description;
		results.className = this.user.result;
		if(this.user.lives == 0)
		{
			document.getElementById("btn_spin").disabled = true;
			document.getElementById("spins").innerHTML = "GAME OVER.<br />Sorry no more spins available.";
			document.getElementById("spins").className = "gameover";
		}
		else
		{
			document.getElementById("spins").innerHTML = "Spins available: " + this.user.lives;
		}
		sessionStorage.spins_left = this.user.lives;
	};
}();

window.onload = function () { 
	if(typeof(Storage) !== "undefined") {
        if (sessionStorage.spins_left) {
            slot_machine.user.lives = sessionStorage.spins_left;
        } else {
            sessionStorage.spins_left = slot_machine.user.lives;
        }
    } else {
        document.getElementById("session").innerHTML = "Unsupported browser.";
    }
    
    slot_machine.refresh();
};

