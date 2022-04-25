window.addEventListener("DOMContentLoaded", setup);

function setup(){
  const options = {
    rootMargin: "0px 0px -200px 0px"
  }

  const observer = new IntersectionObserver((entries, observer)=> {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      } else{
        return; 
      }
    })
  }, options);

  const header = document.querySelectorAll("h1");
  header.forEach(h => observer.observe(h));

  const paras = document.querySelectorAll('p');
  paras.forEach(p => observer.observe(p));
}
