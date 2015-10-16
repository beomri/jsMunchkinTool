var counter = 0,
    intervalId = 0,
    rollsNum = 22,
    delay = 70,
    t_name = 0,
    roll_button = 0,
    dice_images = [];


function setPic() {
    counter++;
    var num = Math.floor(Math.random() * 6);
    t_name.removeChild(t_name.lastChild);
    t_name.appendChild(dice_images[num]);
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
    t_name = document.createElement("DIV");
    t_name.align = "middle";

    for (i = 0; i < 6; i++) {
        dice_images.push(document.createElement("IMG"));
        dice_images[i].src = "res/d" + (i+1) + ".jpg";
    }

    roll_button = document.createElement("INPUT");
    roll_button.type = "button";
    roll_button.value = "Roll Dice!";
    roll_button.onclick = roll;

    t_name.appendChild(roll_button);
    t_name.appendChild(document.createElement("BR"));
    t_name.appendChild(document.createElement("BR"));
    t_name.appendChild(dice_images[5]);

    return t_name;
}
