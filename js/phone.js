const loadPhone = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url) ;
    const data = await res .json();
    displayPhones(data.data);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container')
      phoneContainer.innerText = '';
    //    display 20 phone only
    const showAll = document.getElementById('show-all')
    if( phones.length >  10){
       phones = phones.slice(0, 10);
       showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }

    // display no phones found
    const noPhone = document.getElementById('no-phone-messeg');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }

    else{
        noPhone.classList.add('no-done')
    }
    // display all phones


      phones.forEach(phone => {
    const phoneDiv = document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML = `
         <div class="card p-4">
          <img src="${phone.image}" class="card-img-top" alt="...">
          <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
    `;
        phoneContainer.appendChild(phoneDiv);
      });
      // stop loader
      toggolSpinner(false);
}

document.getElementById('btn-search').addEventListener('click',function(){
      // start loader
      toggolSpinner(true);
  const searchPhone = document.getElementById('search-phone')
    const searchText = searchPhone.value;
    loadPhone(searchText);
})

const toggolSpinner = losding => {
  const loder = document.getElementById('loder')
  if(losding){
    loder.classList.remove('d-none')
  }
  else{
    loder.classList.add('d-none');
  }
}
  

// loadPhone();