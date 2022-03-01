document.getElementById('no-phone-found').style.display = 'none';
document.getElementById('loading-spinner').style.display = 'none';
document.getElementById('display-all').style.display = 'none';


const toggleSpinner = displayStyle => {
    document.getElementById('loading-spinner').style.display = displayStyle;
}
const noPhoneFound = displayStyle => {
    document.getElementById('no-phone-found').style.display = displayStyle;
}
const showAllbutton = displayStyle => {
    document.getElementById('display-all').style.display = displayStyle;
}

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    toggleSpinner('block')
    noPhoneFound('none');
    if (searchText == '') {
        noPhoneFound('block');
        toggleSpinner('none');
        showAllbutton('none');
        const searchResultShow = document.getElementById('search-result');
        searchResultShow.textContent = '';
        const phoneDetails = document.getElementById('show-phone-details');
        phoneDetails.textContent = '';

    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => showPhones(data.data))

    }
}


const showPhones = phones => {

    const searchResultShow = document.getElementById('search-result');
    searchResultShow.textContent = '';
    const phoneDetails = document.getElementById('show-phone-details');
    phoneDetails.textContent = '';
    if (phones.length == 0) {
        noPhoneFound('block');
    }
    else {

        if (phones.length > 20) {
            const slicePhones = phones.slice(0, 20);
            slicePhones?.forEach(phone => {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p class="card-text">${phone.brand}</p>
                                <a href="#top"><button onclick="getPhone('${phone.slug}')" type="button" class="btn btn-primary">Show Details</button></a>
                                
                            </div>
                    </div>
                   
                    `
                searchResultShow.appendChild(div)
            })
            document.getElementById('display-all').style.display = 'block';
            document.getElementById('display-all').addEventListener('click', function () {
                document.getElementById('display-all').style.display = 'none';
                const restPhones = phones.slice(20);
                restPhones?.forEach(phone => {
                    const div = document.createElement('div');
                    div.classList.add('col');
                    div.innerHTML = `
                        <div class="card" style="width: 18rem;">
                            <img src="${phone.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${phone.phone_name}</h5>
                                    <p class="card-text">${phone.brand}</p>
                                    <a href="#top"><button onclick="getPhone('${phone.slug}')" type="button" class="btn btn-primary">Show Details</button></a>
                                    
                                </div>
                        </div>
                       
                        `
                    searchResultShow.appendChild(div)
                })
            })


        } else {
            noPhoneFound('none');
            phones.forEach(phone => {
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <p class="card-text">${phone.brand}</p>
                                <a href="#top"><button onclick="getPhone('${phone.slug}')" type="button" class="btn btn-primary">Show Details</button></a>
                                
                            </div>
                    </div>
                    `
                searchResultShow.appendChild(div)

            });
        }


    }
    toggleSpinner('none')
}
const getPhone = phone => {
    const url = `https://openapi.programming-hero.com/api/phone/${phone}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showPhoneDetils(data.data))
}
const showPhoneDetils = phone => {
    // console.log(phone)
    const phoneDetails = document.getElementById('show-phone-details');
    phoneDetails.textContent = '';
    if (phone.others) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card m-2" style="width: 100%;">
            <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Phone Name : ${phone.name}</h5>
                    <p class="card-text">Phone Brand : ${phone.brand}</p>
                    <p class="card-text">Features : </p>
                    <p class="card-text">Phone chipSet : ${phone.mainFeatures.chipSet}</p>
                    <p class="card-text">Phone displaySize : ${phone.mainFeatures.displaySize}</p>
                    <p class="card-text">Phone memory : ${phone.mainFeatures.memory}</p>
                    <p class="card-text">Phone sensors :  ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : "No data found"}</p>
                    <p class="card-text">Phone storage : ${phone.mainFeatures.storage}</p>
                    <p class="card-text">Others : </p>
                    <p class="card-text">Phone Bluetooth : ${phone.others.Bluetooth}</p>
                    <p class="card-text">Phone GPS : ${phone.others.GPS}</p>
                    <p class="card-text">Phone NFC : ${phone.others.NFC}</p>
                    <p class="card-text">Phone storage : ${phone.others.Radio}</p>
                    <p class="card-text">Phone Radio : ${phone.others.USB}</p>
                    <p class="card-text">Phone WLAN : ${phone.others.WLAN}</p>
                    <p class="card-text">Phone Release Date : ${phone.releaseDate ? phone.releaseDate : "No release date is found"}</p>
    
                </div>
        </div>
        
        `
        phoneDetails.appendChild(div);
    } else {
        const div = document.createElement('div');
        div.innerHTML = `
    <div class="card m-2" style="width: 100%;">
        <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">Phone Name : ${phone.name}</h5>
                <p class="card-text">Phone Brand : ${phone.brand}</p>
                <p class="card-text">Features : </p>
                <p class="card-text">Phone chipSet : ${phone.mainFeatures.chipSet}</p>
                <p class="card-text">Phone displaySize : ${phone.mainFeatures.displaySize}</p>
                <p class="card-text">Phone memory : ${phone.mainFeatures.memory}</p>
                <p class="card-text">Phone sensors : ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors : "No data found"}</p>
                <p class="card-text">Phone storage : ${phone.mainFeatures.storage}</p>
                <p class="card-text">Others : Properties not found</p>
                <p class="card-text">Phone Release Date : ${phone.releaseDate ? phone.releaseDate : "No release date is found"}</p>

            </div>
    </div>
    
    `
        phoneDetails.appendChild(div);
    }

}

