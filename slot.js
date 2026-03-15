let balance = 100;

const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3"),
  document.getElementById("reel4"),
  document.getElementById("reel5")
];

// simboli PNG
const symbols = [
  "images/book.png",
  "images/pharaoh.png",
  "images/scarab.png",
  "images/treasure.png",
  "images/crown.png"
];

// linee vincenti (per semplicità solo 10 linee principali)
const lines = [
  [0,0,0,0,0], // linea superiore
  [1,1,1,1,1], // linea centrale
  [2,2,2,2,2], // linea inferiore
  [0,1,2,1,0], // V diagonale
  [2,1,0,1,2], // Λ diagonale
  [0,0,1,0,0],
  [2,2,1,2,2],
  [1,0,1,2,1],
  [1,2,1,0,1],
  [0,1,1,1,2]
];

function spin(){
  if(balance<=0){
    alert("Saldo finito");
    return;
  }

  balance -= 1;
  document.getElementById("balance").innerText = balance;

  // riempi i rulli con 3 simboli ciascuno
  const reelSymbols = reels.map(()=>[symbols[Math.floor(Math.random()*symbols.length)],
                                      symbols[Math.floor(Math.random()*symbols.length)],
                                      symbols[Math.floor(Math.random()*symbols.length)]]);

  reels.forEach((reel,i)=>{
    reel.innerHTML="";
    reelSymbols[i].forEach(sym=>{
      const img = document.createElement("img");
      img.src = sym;
      reel.appendChild(img);
    });
    // animazione rulli
    setTimeout(()=>{
      reel.style.transform = `translateY(-${Math.floor(Math.random()*3)*70}px)`;
    }, i*150);
  });

  // controlla vincita dopo animazione
  setTimeout(()=>{
    let winLines = [];
    lines.forEach((line,index)=>{
      let first = reelSymbols[0][line[0]];
      let win = reelSymbols.every((r,j)=>r[line[j]]===first);
      if(win) winLines.push(index+1);
    });

    if(winLines.length>0){
      let winAmount = 20 * winLines.length;
      balance += winAmount;
      document.getElementById("balance").innerText = balance;
      document.getElementById("result").innerHTML = `💰 JACKPOT! Linee vincenti: ${winLines.join(", ")} +€${winAmount}`;
      // effetto luminoso rulli
      reels.forEach(r=>r.style.boxShadow="0 0 50px gold");
      setTimeout(()=> reels.forEach(r=>r.style.boxShadow="0 0 20px gold"),1000);
    }else{
      document.getElementById("result").innerHTML = "Riprova!";
    }

  },1200);
}
