let symbols = ["🍒","🍋","⭐","💎","7️⃣"];

let balance = 100;

function spin(){

if(balance <=0){
alert("Saldo finito");
return;
}

balance -=1;
document.getElementById("balance").innerText = balance;

let r1 = randomSymbol();
let r2 = randomSymbol();
let r3 = randomSymbol();

document.getElementById("reel1").innerHTML = r1;
document.getElementById("reel2").innerHTML = r2;
document.getElementById("reel3").innerHTML = r3;

if(r1==r2 && r2==r3){

let win = 10;

balance += win;

document.getElementById("balance").innerText = balance;

document.getElementById("result").innerHTML = "💰 JACKPOT +€"+win;

}else{

document.getElementById("result").innerHTML = "Riprova";

}

}

function randomSymbol(){

return symbols[Math.floor(Math.random()*symbols.length)];

}
