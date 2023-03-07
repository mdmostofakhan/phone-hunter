const loadPhone = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url) ;
    const data = await res .json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
      phoneContainer.innerText = '';
    //    display 20 phone only
    const showAll = document.getElementById('show-all')
    if(dataLimit && phones.length >  10){
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
            <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Go somewhere</button>
           </div>
            
      </div>
    `;
        phoneContainer.appendChild(phoneDiv);
      });
      // stop spinner or loader
      toggolSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggolSpinner(true);
    const searchPhone = document.getElementById('search-phone')
    const searchText = searchPhone.value;
    loadPhone(searchText, dataLimit);
}


document.getElementById('btn-search').addEventListener('click',function(){
      // start loader
      processSearch(10)
})

// search input field enter key handler
document.getElementById('search-phone').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10)
  }
});


const toggolSpinner = losding => {
  const loder = document.getElementById('loder')
  if(losding){
    loder.classList.remove('d-none')
  }
  else{
    loder.classList.add('d-none');
  }
}
  
// not the vest way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

const loadPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displaPhoneDetails(data.data);
}

const displaPhoneDetails = phone => {
  console.log(phone)
  const modalTitel = document.getElementById('phoneDetailModalLabel')
 modalTitel.innerText = phone.name;
 const modalBody = document.getElementById('modal-body')
 modalBody.innerHTML = `
 <img src="${phone.image}" alt="">
 <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'no Release Date Founction' }</p>
 <p>Other: ${phone.others ? phone.others.Bluetooth : 'no Bluetooth informatiion'}</p>
 <p>Main Features: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'no chipSet information'}
 `;
}

loadPhone('apple');
