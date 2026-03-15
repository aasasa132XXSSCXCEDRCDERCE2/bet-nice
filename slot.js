const symbols = ["📖","💀","🗿","👑","🦅"]; // simboli egizi
let balance = 100;

function spin(){
  if(balance <=0){
    alert("Saldo finito");
    return;
  }

  balance -= 1;
  document.getElementById("balance").innerText = balance;

  let reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3")
  ];

  // animazione rulli
  reels.forEach(reel => {
    reel.innerHTML = "";
    for(let i=0;i<3;i++){
      let s = symbols[Math.floor(Math.random()*symbols.length)];
      let span = document.createElement("div");
      span.innerText = s;
      reel.appendChild(span);
    }
  });

  // risultato semplice: linea centrale
  let midSymbols = reels.map(r=>r.children[1].innerText);

  setTimeout(()=>{
    if(midSymbols[0]===midSymbols[1] && midSymbols[1]===midSymbols[2]){
      let win = 10;
      balance += win;
      document.getElementById("balance").innerText = balance;
      document.getElementById("result").innerHTML = `💰 JACKPOT +€${win} - ${midSymbols[0]}!`;
    }else{
      document.getElementById("result").innerHTML = "Riprova!";
    }
  },500);
}
