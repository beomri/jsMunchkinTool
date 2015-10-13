var MAX_PLAYERS = 6,
	INITIAL_PLAYERS = 3,
	MAX_LEVEL = 10,
	levels = [],
	items = [],
	item_tables = [],
	sum_boxes = [];
	
function updateSums(uid) {
	sum_boxes[uid].value = levels[uid] + items[uid];
}

function countItems(uid) {
	items[uid] = 0;
	var rows = item_tables[uid].childNodes;
	for (i = 0; i < rows.length - 1; i++) {
		if(rows[i].cells[0].childNodes[0].checked) {
			items[uid] += parseInt(rows[i].cells[2].childNodes[0].value);
		}
	}
	updateSums(uid);
}

function insertCellName(uid, table) {
	var t_name = document.createElement("TABLE");
	t_name.style.width = "100%";

	
	var d_text = document.createElement("TD");
	var d_lock = document.createElement("TD");

	var name_text = document.createElement("INPUT");
	name_text.type = "textbox";
	name_text.value = "player's name";
	name_text.size = "10";
	var changed = false;
	name_text.onfocus = function() {if (!changed) {name_text.value = ""; changed = true;}};
	
	var lock_button = document.createElement("INPUT");
	lock_button.type = "button";
	lock_button.value = "Lock";
	lock_button.onclick = function() {if (name_text.value != "") {name_text.disabled = "true"; lock_button.hidden = "true";}};
	
	d_text.appendChild(name_text);
	d_lock.appendChild(lock_button);
	
	t_name.appendChild(d_text);
	t_name.appendChild(d_lock);
	
	/* if (uid >= INITIAL_PLAYERS) {
		name_text.hidden = "true";
		lock_button.hidden = "true";
		var addP_button = document.createElement("INPUT");
		addP_button.type = "button";
		addP_button.value = "Add Player";
		addP_button.onclick = function() {name_text.removeAttribute("hidden"); lock_button.removeAttribute("hidden"); addP_button.hidden = "true";};
		t_name.appendChild(addP_button);
	 }*/
	 
	table.appendChild(t_name);
}

function insertCellLevel(uid, table) {
	var t_name = document.createElement("TABLE");
	t_name.style.width = "100%";
	
	var d_up = document.createElement("TD");
	var d_down = document.createElement("TD");
	var d_lvl = document.createElement("TD");
	
	var lvl_text = document.createElement("INPUT");
	lvl_text.value = levels[uid];
	lvl_text.disabled = "true";
	lvl_text.size = "2";
	
	var up_button = document.createElement("INPUT");
	up_button.type = "button";
	up_button.value = "+";
	up_button.onclick = function() {levels[uid] += 1; lvl_text.value = levels[uid]; updateSums(uid);};
	
	var down_button = document.createElement("INPUT");
	down_button.type = "button";
	down_button.value = "-";
	down_button.onclick = function() {if (levels[uid] > 1) {levels[uid] -= 1; lvl_text.value = levels[uid]; updateSums(uid);}};
	
	d_down.appendChild(down_button);
	d_up.appendChild(up_button);
	d_lvl.appendChild(lvl_text);
	
	t_name.appendChild(document.createTextNode("Level:  "));
	t_name.appendChild(d_down);
	t_name.appendChild(d_lvl);
	t_name.appendChild(d_up);
	
	table.appendChild(t_name);
}

function insertCellSum(uid, table) {
	var t_name = document.createElement("TR");
	t_name.align = "middle";
	
	var sum_text = document.createElement("INPUT");
	sum_text.disabled = "true";
	sum_text.size = "4";
	sum_boxes.push(sum_text);
	
	t_name.appendChild(document.createTextNode("Total Power:  "));
	t_name.appendChild(sum_text);
	
	table.appendChild(t_name);
}

function getItemUI(uid) {
	var r_ui = document.createElement("TR");
	//r_ui.appendChild(document.createTextNode("new item"));
	
	var d_check = document.createElement("TD");
	var check_item = document.createElement("INPUT");
	check_item.type = "checkbox";
	check_item.onchange = function() {countItems(uid);};
	d_check.appendChild(check_item);
	
	var d_name = document.createElement("TD");
	var item_name = document.createElement("INPUT");
	item_name.type = "textbox";
	item_name.value = "Item's name"
	item_name.size = "10";
	item_name.onclick = function() {item_name.value = "";};
	d_name.appendChild(item_name);
	
	var d_bonus = document.createElement("TD");
	var item_bonus = document.createElement("INPUT");
	item_bonus.type = "textbox";
	item_bonus.size = "1";
	item_bonus.value = "0";
	item_bonus.oninput = function() {countItems(uid);};
	d_bonus.appendChild(item_bonus);
	
	r_ui.appendChild(d_check);
	r_ui.appendChild(d_name);
	r_ui.appendChild(d_bonus);
	
	return r_ui;
}

function getNewItemButton(uid, table) {
	var new_row = document.createElement("TR");
	new_row.style.textAlign = "center";
	
	var new_button = document.createElement("INPUT");
	new_button.type = "button";
	new_button.value = "Add Item";
	new_button.onclick = function() {table.removeChild(table.lastElementChild); table.appendChild(getItemUI(uid)); getNewItemButton(uid, table);};
	
	new_row.appendChild(new_button);
	table.appendChild(new_row);
}

function insertCellItems(uid, table) {
	var r_items = document.createElement("TR");
	r_items.appendChild(document.createTextNode("Items:"));
	r_items.appendChild(document.createElement("BR"));
	
	var item_table = document.createElement("TABLE");
	item_table.style.width = "100%";
	item_tables[uid] = item_table;
	getNewItemButton(uid, item_table);
	r_items.appendChild(item_table);
	table.appendChild(r_items);
}

function getCharacter() {
	var d = document.createElement("DIV");
	
	var c_table;
	for (i = 0; i < MAX_PLAYERS; i++)
	{
		levels[i] = 1;
		items[i] = 0;
		
		c_table = document.createElement("TABLE");
		c_table.width = (100 / MAX_PLAYERS) + "%";
		c_table.border = "1";
		insertCellName(i, c_table);
		insertCellLevel(i, c_table);
		insertCellSum(i, c_table);
		insertCellItems(i, c_table);
		
		d.appendChild(c_table);
		
		updateSums(i);
	}
	
	return d;
}