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

// linea centrale vincente
function spin(){
  if(balance<=0){
    alert("Saldo finito");
    return;
  }
  
  balance -= 1;
  document.getElementById("balance").innerText = balance;

  // riempi rulli con simboli casuali
  reels.forEach(reel=>{
    reel.innerHTML="";
    for(let i=0;i<5;i++){
      const img = document.createElement("img");
      img.src = symbols[Math.floor(Math.random()*symbols.length)];
      reel.appendChild(img);
    }
  });

  // animazione rulli
  reels.forEach((reel,i)=>{
    setTimeout(()=>{
      reel.style.transform = `translateY(-${Math.floor(Math.random()*3)*60}px)`;
    }, i*200);
  });

  // controlla vincita dopo animazione
  setTimeout(()=>{
    const midSymbols = reels.map(r=>r.children[1].src);
    let jackpot = midSymbols.every((v,i,a)=>v===a[0]);

    if(jackpot){
      balance += 50;
      document.getElementById("balance").innerText = balance;
      document.getElementById("result").innerHTML = "💰 JACKPOT!";
      // effetto luminoso rulli
      reels.forEach(r=>r.style.boxShadow="0 0 50px gold");
      setTimeout(()=> reels.forEach(r=>r.style.boxShadow="0 0 20px gold"),1000);
    }else{
      document.getElementById("result").innerHTML = "Riprova!";
    }
  },1500);
}
