
// Start the loop
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        
        if (entry.isIntersecting){
            entry.target.classList.add("show");
        } /*else {
            entry.target.classList.remove("show"); 

            
        }*/
    });
});

const hiddenZ = document.querySelectorAll('.hiddenZ')
hiddenZ.forEach((el)=>observer.observe(el)); 

const hiddenY = document.querySelectorAll('.hiddenY')
hiddenY.forEach((el)=>observer.observe(el)); 
   
