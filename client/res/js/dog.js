const info = document.getElementById("info");
const getAllDogsBtn = document.getElementById("getAllDogsBtn");
const getDogByIdBtn = document.getElementById("getDogByIdBtn");
const postDogBtn = document.getElementById("postDogBtn");
const putDogBtn = document.getElementById("putDogBtn");
const patchDogBtn = document.getElementById("patchDogBtn");
const deleteDogBtn = document.getElementById("deleteDogBtn");
const getDogByIdInput = document.getElementById("getDogByIdInput");
const postNameInput = document.getElementById("postNameInput");
const postAgeInput = document.getElementById("postAgeInput");
const putIdInput = document.getElementById("putIdInput");
const putNameInput = document.getElementById("putNameInput");
const putAgeInput = document.getElementById("putAgeInput");
const patchIdInput = document.getElementById("patchIdInput");
const patchNameInput = document.getElementById("patchNameInput");
const patchAgeInput = document.getElementById("patchAgeInput");
const deleteIdInput = document.getElementById("deleteIdInput");

const getAllDogsEvent = async () => {
  try {
    const res = await fetch("http://127.0.0.1:3000/dog", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    const data = await res.json();
    info.innerHTML = "";
    data.dogs.map((dog) => {
      info.innerHTML += `<p>id: ${dog._id}</p>`;
      info.innerHTML += `<p>name: ${dog.name}</p>`;
      info.innerHTML += `<p>age: ${dog.age}</p>`;
      info.innerHTML += `<p>request: ${Object.values(dog.request)}</p>`;
      info.innerHTML += `<p><br></p>`;
    });
  } catch (error) {
    info.innerText = error;
  }
};
getAllDogsBtn.onclick = getAllDogsEvent;

const getDogByIdEvent = async () => {
  try {
    const getDogByIdInputValue = getDogByIdInput.value;
    const res = await fetch(
      `http://127.0.0.1:3000/dog/${getDogByIdInputValue}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    const data = await res.json();
    info.innerHTML = `<p>id: ${data._id}</p>`;
    info.innerHTML += `<p>name: ${data.name}</p>`;
    info.innerHTML += `<p>age: ${data.age}</p>`;
    info.innerHTML += `<p>request: ${Object.values(data.request)}</p>`;
  } catch (error) {
    info.innerHTML = `<p>Dog not found!</p>`
  }
};
getDogByIdBtn.onclick = getDogByIdEvent;

const postDogEvent = async () => {
  try {
    const postNameInputValue = postNameInput.value;
    const postAgeInputValue = postAgeInput.value;
    const res = await fetch("http://127.0.0.1:3000/Dog", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: postNameInputValue,
        age: postAgeInputValue,
      }),
    });
    const data = await res.json();
    info.innerHTML = `<p>Message: ${data.message}</p>`;
    info.innerHTML += `<p>Created dog:</p>`;
    info.innerHTML += `<p>id: ${data.createdDog._id}</p>`;
    info.innerHTML += `<p>name: ${data.createdDog.name}</p>`;
    info.innerHTML += `<p>age: ${data.createdDog.age}</p>`;
    info.innerHTML += `<p>payload: ${Object.values(
      data.createdDog.payload
    )}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
postDogBtn.onclick = postDogEvent;

const putDogEvent = async () => {
  try {
    const putIdInputValue = putIdInput.value;
    const putNameInputValue = putNameInput.value;
    const putAgeInputValue = putAgeInput.value;
    const res = await fetch(`http://127.0.0.1:3000/dog/${putIdInputValue}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        name: putNameInputValue,
        age: putAgeInputValue,
      }),
    });
    const data = await res.json();
    info.innerHTML = `<p>${Object.values(data)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
putDogBtn.onclick = putDogEvent;

const patchDogEvent = async () => {
  try {
    const patchIdInputValue = patchIdInput.value;
    const patchNameInputValue = patchNameInput.value;
    const patchAgeInputValue = patchAgeInput.value;
    let body = [];
    if (patchNameInputValue.trim().length) {
      const nameProp = {
        propName: "name",
        value: patchNameInputValue,
      };
      body.push(nameProp);
    }
    if (patchAgeInputValue.trim().length) {
      const ageProp = {
        propName: "age",
        value: patchAgeInputValue,
      };
      body.push(ageProp);
    }
    const res = await fetch(`http://127.0.0.1:3000/Dog/${patchIdInputValue}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify(body)
    });
    const data = await res.json();
    info.innerHTML = `<p>Message: ${data.msg}</p>`;
    info.innerHTML += `<p>Request: ${Object.values(data.request)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
patchDogBtn.onclick = patchDogEvent;

const deleteDogEvent = async () => {
  try {
    const deleteIdInputValue = deleteIdInput.value;
    const res = await fetch(
      `http://127.0.0.1:3000/dog/${deleteIdInputValue}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (!data) return info.innerHTML = `<p>Dog not found!</p>`;
    info.innerHTML = `<p>${Object.values(data)}</p>`;
  } catch (error) {
    info.innerText = error;
  }
};
deleteDogBtn.onclick = deleteDogEvent;
