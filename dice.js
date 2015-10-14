var counter = 0,
	intervalId = 0,
	rollsNum = 22,
	delay = 70,
	dice_img = 0,
	roll_button = 0;


function setPic() {
	counter++;
	var num = Math.floor((Math.random() * 6) + 1);
	dice_img.src = "res/d" + num + ".jpg";
	if (counter >= rollsNum) {
		counter = 0;
		clearInterval(intervalId);
		roll_button.disabled = false;
	}
}

function roll() {
	roll_button.disabled = true;
	intervalId = setInterval(setPic, delay);
}

function getDice() {
	var t_name = document.createElement("DIV");
	t_name.align = "middle";
	
	dice_img = document.createElement("IMG");
	dice_img.src = "res/d6.jpg";
	
	roll_button = document.createElement("INPUT");
	roll_button.type = "button";
	roll_button.value = "Roll Dice!";
	roll_button.onclick = roll;
	
	t_name.appendChild(roll_button);
	t_name.appendChild(document.createElement("BR"));
	t_name.appendChild(document.createElement("BR"));
	t_name.appendChild(dice_img);
	
	return t_name;
}
