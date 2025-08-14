function Color() {
  let el = document.querySelector('h1');
  if (el) {
    el.style.color = 'red';
  }
}

javascript:(function Color(){let e=document.querySelector("h1");e&&(e.style.color="red")})();
javascript:(()=>{document.body.style.background='black';})()