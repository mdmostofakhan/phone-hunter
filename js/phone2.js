const loadPhones = async(searchText,dataLimie) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch (url);
    const data = await res.json();
    displayPhone(data.data,dataLimie);
}

const displayPhone = (phones, dataLimie) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText= '';
    
    const showAll = document.getElementById('show-all')
    if( dataLimie && phones.length > 10){
        phones = phones.slice(0, 20);
        showAll.classList.remove('d-none')
    }

    else{
        showAll.classList.add('d-none')
    }

    // no phone 
    const noPhone = document.getElementById('no-phones')
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }

    else{
        noPhone.classList.add('d-none');
    }

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
    toggelSpinner(false);
}

const processeSearch = dataLimie =>{
    toggelSpinner(true);
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    loadPhones(searchText,dataLimie);
}

document.getElementById('btn-search').addEventListener('click',function(){
    processeSearch(10)
})

const toggelSpinner = isLoding => {
    const loderSection = document.getElementById('loading');
    if (isLoding){
    loderSection.classList.remove('d-none');
    }
    else{
        loderSection.classList.add('d-none');
    }
}

document.getElementById('btn show-all').addEventListener('click',function(){
    processeSearch()
})
// loadPhones();