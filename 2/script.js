let finished = false;
let qidf1 = 0;
let qidf2 = 0;
let qidf3 = 0;
let item1 = null;
let item2 = null;
let item3 = null;

var pups=[]
var beds=[]
var toys=[]
init();
function init()
{
	Array.from(document.getElementsByClassName("choice-grid")[0].children).forEach(function(item){
		pups.push(item);
		item.addEventListener("click",function(){
			   choice(1,item);
			})
	})
  Array.from(document.getElementsByClassName("choice-grid")[1].children).forEach(function(item){
		beds.push(item);
		item.addEventListener("click",function(){
			   choice(2,item);
			})
	})
  Array.from(document.getElementsByClassName("choice-grid")[2].children).forEach(function(item){
		toys.push(item);
    item.addEventListener("click",function(){
		    choice(3,item);
		})
	})
console.log(pups)
}

function choice(qid,ch){
  if(finished==true){
    return;
  }
  if(qid===1){
    item1 = ch.dataset.choiceId;
    pups.forEach(function(item){
      item.style.opacity = 0.6;
      item.style.background = "#f4f4f4" ;
      item.children[1].src = "images/unchecked.png";
    })
    ch.style.opacity = 1;
    ch.style.background  = "#cfe3ff";
    ch.children[1].src= "images/checked.png";
    qidf1 = 1;
  }
  if(qid===2){
    item2 = ch.dataset.choiceId;
    beds.forEach(function(item){
      item.style.opacity = 0.6;
      item.style.background = "#f4f4f4" ;
      item.children[1].src = "images/unchecked.png";
    })
    ch.style.opacity = 1;
    ch.style.background  = "#cfe3ff";
    ch.children[1].src= "images/checked.png";
    qidf2 = 1;
  }
  if(qid===3){
    item3 = ch.dataset.choiceId;
    toys.forEach(function(item){
      item.style.opacity = 0.6;
      item.style.background = "#f4f4f4" ;
      item.children[1].src = "images/unchecked.png";
    })
    ch.style.opacity = 1;
    ch.style.background  = "#cfe3ff";
    ch.children[1].src= "images/checked.png";
    qidf3 = 1;
  }
  if(qidf1===1&&qidf2===1&&qidf3===1){
    finished = true;
    showResult();
  }
}

function showResult(){
  document.getElementById("result").style.display = "block";
  if(item2 == item3){
    console.log(item2)
    document.getElementById('rr').innerHTML = "You got:"+RESULTS_MAP[item2].title;
    document.getElementById('rrr').innerHTML = RESULTS_MAP[item2].contents;
    document.getElementById('rrrr').innerHTML = "Restart quiz";
  }
  else{
    document.getElementById('rr').innerHTML = "You got:"+RESULTS_MAP[item1].title;
    document.getElementById('rrr').innerHTML = RESULTS_MAP[item1].contents;
    document.getElementById('rrrr').innerHTML = "Restart quiz";
  }
}

function restart(){
  finished = false;
  qidf1 = 0;
  qidf2 = 0;
  qidf3 = 0;
  item1 = null;
  item2 = null;
  item3 = null;
  document.getElementById("result").style.display = "none";
  pups.forEach(function(item){
    item.style.opacity = 1;
    item.style.background = "#f4f4f4" ;
    item.children[1].src = "images/unchecked.png";
  })
  beds.forEach(function(item){
    item.style.opacity = 1;
    item.style.background = "#f4f4f4" ;
    item.children[1].src = "images/unchecked.png";
  })
  toys.forEach(function(item){
    item.style.opacity = 1;
    item.style.background = "#f4f4f4" ;
    item.children[1].src = "images/unchecked.png";
  })
  let x = document.getElementById("top");
    x.scrollIntoView({behavior:"smooth"});
}
