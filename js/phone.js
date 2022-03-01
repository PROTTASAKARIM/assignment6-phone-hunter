const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    // searchField.value = '';
    // console.log(searchField);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhones(data.data))
}
const showPhones = phones => {
    // console.log(phones);
    // for (const phone of phones) {
    //     console.log(phone)
    // }
    const searchResultShow = document.getElementById('search-result');
    searchResultShow.textContent = '';
    const phoneDetails = document.getElementById('show-phone-details');
    phoneDetails.textContent = '';
    phones.forEach(phone => {

        // 
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick="getPhone('${phone.slug}')" type="button" class="btn btn-primary">Show Details</button>
                </div>
        </div>
        `
        searchResultShow.appendChild(div)
    });
}
const getPhone = phone => {
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetils(data.data))
}
const showPhoneDetils = phone => {
    console.log(phone)
    const phoneDetails = document.getElementById('show-phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Name : ${phone.name}</h5>
                <p class="card-text">Phone Brand : ${phone.brand}</p>
                <p class="card-text">Features : </p>
                <p class="card-text">Phone chipSet : ${phone.mainFeatures.chipSet}</p>
                <p class="card-text">Phone displaySize : ${phone.mainFeatures.displaySize}</p>
                <p class="card-text">Phone memory : ${phone.mainFeatures.memory}</p>
                <p class="card-text">Phone sensors : ${phone.mainFeatures.sensors}</p>
                <p class="card-text">Phone storage : ${phone.mainFeatures.storage}</p>
                <p class="card-text">Others : </p>
                <p class="card-text">Phone storage : ${phone.others.Bluetooth}</p>
                <p class="card-text">Phone storage : ${phone.others.GPS}</p>
                <p class="card-text">Phone storage : ${phone.others.NFC}</p>
                <p class="card-text">Phone storage : ${phone.others.Radio}</p>
                <p class="card-text">Phone storage : ${phone.others.USB}</p>
                <p class="card-text">Phone storage : ${phone.others.WLAN}</p>
                <p class="card-text">Phone storage : ${phone.releaseDate ? phone.releaseDate : "No release date is found"}</p>

            </div>
    </div>
    `
    phoneDetails.appendChild(div);
}

