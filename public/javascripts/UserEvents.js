
  const button = document.getElementById("delete");
  let deleteUser = (id) => { 
  const user = document.getElementById(id); 
  console.log(user); 
  user.style.display = 'none'; }
  button.addEventListener("click", deleteUser);

    
