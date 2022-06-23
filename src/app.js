const api = async () => {
  try {
    const response = await fetch("https://reqres.in/api/users?page=1");
    const responseTwo = await fetch("https://reqres.in/api/users?page=2");
    if (response.status === 200 || responseTwo.status == 200) {
      const { data } = await response.json();
      localStorage.setItem("usuarios", JSON.stringify(data));
      const result = await responseTwo.json();
      localStorage.setItem("usuarios-dos", JSON.stringify(result.data));
    }
  } catch (error) {}
};

const getLocal = () => {
  const firstData = JSON.parse(localStorage.getItem("usuarios"));
  const secondData = JSON.parse(localStorage.getItem("usuarios-dos"));
  const data = [...firstData, ...secondData];
  return data;
};
const getUsers = async ()  => {
  try {
    const data = getLocal();
    const usuarios = document.getElementById("avatars");
    await data.forEach((element) => {
      usuarios.innerHTML += `<section class="avatar" id="${element.id}">
                    <img class="avatar-img" src="${element.avatar}" alt="">
                    <div class="avatar-info">
                        <p>${element.first_name} ${element.last_name}</p> 
                        <p class="e-mail"> ${element.email}</p>
                    </div>
                </section>`;
       
    });
    await showModal()
  } catch (error) {
    console.log(error);
  }
};
const showModal = () => {
  const data = getLocal();
  const allCardsUsers = document.querySelectorAll(".avatar");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  allCardsUsers.forEach((card) =>
    card.addEventListener("click", async () => {
      modal.classList.add("show");
      closeModal.classList.add("show")
      const findUser = data.find((usuario) => usuario.id == card.id);
      modal.innerHTML = 
      `<div class="modal" >
            <div class="modal-content">
                <img class="modal-img" src="${findUser.avatar}" alt="">
                <div class="avatar-info">
                    <p>${findUser.first_name}${findUser.last_name}</p> 
                    <p class="e-mail"> ${findUser.email}</p>
                </div>
            </div>
        </div>`;
    }));
    closeModal.addEventListener("click", () => {
        closeModal.classList.remove('show')
        modal.classList.remove("show");
    });
}; 

window.addEventListener("load", async () => {
  await api();
  await getUsers();
});
