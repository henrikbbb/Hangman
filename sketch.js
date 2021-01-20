let word;
let guesses = [];
let input;
let keys = [];
let cBackground;
let lives;
let buttonSubmit;

function setup() {
	createCanvas(800, 500);
	
	input = createInput('');
	input.size(200, 30);
	input.position(width/2 - 100, height*3/4 - 40);
	
	buttonSubmit = createButton('ok');
	buttonSubmit.size(50, 50);
	buttonSubmit.position(width/2 - 25, height*3/4);
	buttonSubmit.mousePressed(submit);
}

function draw() {
	let myColor = color(200);	
	if (word != null && defeat()){
		deleteKeys();
		myColor = color(200, 0, 0);
		input.show();
		buttonSubmit.show();
	} else if (victory()){
		deleteKeys();
		myColor = color(0, 200, 0);
		input.show();
		buttonSubmit.show();
	}
	background(myColor);	
	
	if (word != null){
		let w = width/word.length
		let h = 300;
		
		// calc TextSize
		let ts = 0;
		let test = true;
		while(test){
			ts++;
			textSize(ts+5);
			for (let i = 0; i < word.length; i++){
				let c = word.charAt(i);
				let tw = textWidth(c);
				if (tw > w){
					test = false;
				}
			}
		}
		
		for (let i = 0; i < word.length; i++){
			let c = word.charAt(i);
			if (c != ' '){
				// Linie
				stroke(myColor);
				strokeWeight(10);
				fill(0);
				rect(i*w, h, w, 15);
				
				// Buchstabe
				if (guesses.includes(c) || defeat()){					
					noStroke();
					let c = word.charAt(i);
					textAlign(CENTER, BOTTOM);
					text(c, i*w + w/2, h);
				}
			}
		}
	}
	
	fill(0);
	textSize(40);
	textAlign(RIGHT, TOP);
	text(lives, width, 0);
}

function submit(){
	guesses = [];
	word = input.value();
	word = word.toUpperCase();
	print(word);
	input.value('');
	createKeys();
	lives = 10;
	input.hide();
	buttonSubmit.hide();
}

function deleteKeys(){
	while (keys.length > 0){
		keys[0].button.hide();
		keys.splice(0, 1);
	}
}

function createKeys(){
	createKeyRow(['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'], 350, 50);
	createKeyRow(['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], 400, 50);
	createKeyRow(['Y', 'X', 'C', 'V', 'B', 'N', 'M'], 450, 50);
}

function createKeyRow(list, y, h){
	for (let i = 0; i < list.length; i++){
		let c = list[i];
		let x = i*width/list.length;
		let key = new Key(c, x, y, width/list.length, h);
		keys.push(key);
	}
}

function guess(c){
	guesses.push(c);
	for (let i = 0; i < keys.length; i++){
		let key = keys[i];
		if (key.c == c){
			key.button.hide();
			keys.splice(i, 1);
		}
	}
	chars = [];
	for (let i = 0; i < word.length; i++){
		chars.push(word.charAt(i));
	}
	if (!chars.includes(c)){
		lives--;
	}
}

function victory(){
	if (lives > 0){
		for (let i = 0; i < word.length; i++){
			let c = word.charAt(i);
			if (c != ' ' && !guesses.includes(c)){
				return false;
			}
		}
		return true;
	}
	return false;
}

function defeat(){
	if (lives > 0){
		return false;
	}
	return true;
}

class Key{
	constructor(c, x, y, w, h){
		this.c = c;
		this.button = createButton(c);
		this.button.position(x, y);
		this.button.size(w, h);
		this.button.style('font-size', '20px');
		this.button.mousePressed(function() {guess(c);});
	}
}