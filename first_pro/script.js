const API = "https://66a7e0b453c13f22a3d15761.mockapi.io/users/users";
const user_container = document.querySelector(".user-container");
const user_form = document.querySelector(".user-form");
let EditId;
//console.log(userContainer)
async function getAllUsers(){
    const res = await fetch(API,{
        method:"GET"
     })
const data = await res.json()
console.log(data);
renderAllUsersdata(data)
}

//getAllUsers()
//Post(create)
async function addNewUser(newdata){
    const res= await fetch(API,{
        method: "POST",
        body:JSON.stringify(newdata),
        headers:{
    "Content-Type":"Application/JSON"
        }
    })

    const data = await res.json()
    appendUserCard(data)
  
}


// PUT - (update)
  async function updateUser(id,updateUser){
     const res = await fetch(`${API}/${id}`,{
        method:"PUT",
        body:JSON.stringify(updateUser),
        headers:{
    "Content-Type":"Application/JSON"
        },
    })
        const data = await res.json()
        if (data) {
          location.reload();
        }
        console.log(data)
     
  }


//   //updateUser("10",dummyData)
//   getAllUsers()
//Delete user
  async function deleteUser(id, parent) {
    const res = await fetch(`${API}/${id}`, {
      method: "DELETE",
      
    });
    const data = await res.json();
    if(data){
      parent.remove()
    }
    console.log(data)
  }



  //Form Details

  user_form.innerHTML +=`
  <form>
<h2> User Management </h2>
  <input
   type="text"
   required 
   value="" 
   placeholder="Enter your UserName"
    class="input-text"
     id="input-name"
     />
  <input
   type="text"
  required 
  value="" 
  placeholder="Enter your Batch" 
  class="input-text"
   id="input-batch"/>
  <input
   type="number"
  required value=""
   placeholder="Enter your Number"
    class="input-text" 
    id="input-contact"
    />
  <button type="submit" id="add-btn" class="btn">Create</button>
  <button type="submit" id="update-btn" class="btn">Update</button>
</form>
  `;
  
  //input feilds
  const inp_name = document.querySelector("#input-name")
  const inp_batch = document.querySelector("#input-batch")
  const inp_contact= document.querySelector("#input-contact")
  const update_btn= document.querySelector("#update-btn")
  const add_btn= document.querySelector("#add-btn")
  update_btn.style.display ="none";


  //to get user input values
  function getUserInputValues(){
    return{
      name: inp_name.value,
      batch: inp_batch.value,
      contact: inp_contact.value
    }
  }
// to clear form 
  function clearForm(){
    inp_name.value="";
    inp_batch.value="";
    inp_contact.value="";
  }


  function createUserCard(user){
    const card = document.createElement("div")
    card.setAttribute("class","card")
    card.innerHTML += `
      <h1>${user.name}</h1>
      <p>Batch <span id=batch-value>${user.batch}</span></p>
      <p>Contact <span id=contact-value>${user.contact}</span></p>
      <div class = "btn-group"> 
      <button data-id=${user.id} id="edit-btn" class="btn">Edit</button>
      <button data-id=${user.id} id="delete-btn" class="btn">Delete</button>
       </div>
    `;
    return card;
}

//console.log(createUserCard())
function appendUserCard(user){
   const appendedData =  createUserCard(user);
   user_container.append(appendedData);
}

function renderAllUsersdata(users){
  users.map((user)=>{
     appendUserCard(user)
  })

}

user_form.addEventListener("click",(e)=>{
  e.preventDefault();
  if(e.target.id =="add-btn"){
    const payload = getUserInputValues()
    addNewUser(payload);
    clearForm();
  }
  if (e.target.id == "update-btn") {
    const payload = getUserInputValues();
    console.log(payload);
    console.log(EditId);
    updateUser(EditId, payload);
  }

})

function populateForm(parent) {
  inp_name.value = parent.querySelector("h1").innerText;
  inp_batch.value = parent.querySelector("#batch-value").innerText;
  inp_contact.value = parent.querySelector("#contact-value").innerText;
  update_btn.style.display = "block";
  add_btn.style.display = "none";
 }




user_container.addEventListener("click",(e)=>{
//e.preventDefault()
const id= e.target.dataset.id;
const parent =e.target.parentNode.parentNode;
if(e.target.id=="delete-btn"){
  deleteUser(id,parent)
}
if((e.target.id =="edit-btn")){
  populateForm(parent)
  EditId = id

}
});

//deleteUser(id)
getAllUsers()




