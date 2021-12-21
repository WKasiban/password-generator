// style custom select box

let x, i, j, selElmnt, a, b, c;
x = document.getElementsByClassName("lengthSelect");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        let y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
    
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  let x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);

// generate password
const resultDOM = document.getElementById("passResult");
const copyBtn = document.getElementById("copy");
const lenthDOM = document.getElementById("charLength");
const uppercaseDOM = document.getElementById("uppercase");
const numberDOM = document.getElementById("number");
const symbolDOM = document.getElementById("symbol");
const btn = document.getElementById("submit");
const form = document.getElementById("form");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    const lengthPass = lenthDOM.value;
    const includeUppercase = uppercaseDOM.checked;
    const includeNumber = numberDOM.checked;
    const includeSymbol = symbolDOM.checked;

    const upNumSym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+=-';
    const upNum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const upSym = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+=-';
    const numSym = 'abcdefghijklmnopqrstuvwxyz0123456789~!@#$%^&*()_+=-';
    const up = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
    const num = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const sym = 'abcdefghijklmnopqrstuvwxyz~!@#$%^&*()_+=-';
    const defaultGen = 'abcdefghijklmnopqrstuvwxyz'; 

    let generatePass = "";

    for (let i=0; i < lengthPass; i++) {
        if (includeUppercase && includeNumber && includeSymbol) {
            generatePass += upNumSym.charAt(Math.floor(Math.random() * upNumSym.length));
        } else if (includeUppercase && includeNumber) {
            generatePass += upNum.charAt(Math.floor(Math.random() * upNum.length));
        } else if (includeUppercase && includeSymbol) {
            generatePass += upSym.charAt(Math.floor(Math.random() * upSym.length));
        } else if (includeNumber && includeSymbol) {
            generatePass += numSym.charAt(Math.floor(Math.random() * numSym.length));
        } else if (includeUppercase) {
            generatePass += up.charAt(Math.floor(Math.random() * up.length));
        } else if (includeNumber) {
            generatePass += num.charAt(Math.floor(Math.random() * num.length));
        } else if (includeSymbol) {
            generatePass += sym.charAt(Math.floor(Math.random() * sym.length));
        } else {
            generatePass += defaultGen.charAt(Math.floor(Math.random() * defaultGen.length));
        }
    }

    resultDOM.innerHTML = generatePass;

})

// Copy generated password
copyBtn.addEventListener("click", () => {
    const clipB = navigator.clipboard;
    clipB.writeText(resultDOM.innerText).then(() => copyBtn.innerText = "Copied!");
});