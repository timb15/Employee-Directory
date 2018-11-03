$(document).ready( function () {
    const $gallery = $('#gallery');

    const users = fetch('https://randomuser.me/api/?nat=us&results=12')
                    .then(res => res.json())
                    .catch(error => console.log('Something Went Wrong!', error));



    function generateUsers(data) {
        let employeeCard = '';
        $(data).each(function (index, user) {
            employeeCard += `<div class="card" id="${index}">
                                <div class="card-img-container" id="${index}">
                                <img class="card-img" src="${user.picture.large}" alt="profile picture" id="${index}"></div>
                                <div class="card-info-container" id="${index}">
                                <h3 class="card-name cap" id="${index}">${user.name.first} ${user.name.last}</h3>
                                <p class="card-text" id="${index}">${user.email}</p>
                                <p class="card-text cap" id="${index}">${user.location.city}, ${user.location.state}</p></div>
                                </div>`;
        });
            $gallery.html(employeeCard);
            addCardListener();
    };//generatteUsers end

    Promise.resolve(users)
                .then(data => generateUsers(data.results));


     function generateModal(user) {
        let employeeModal = `<div class="modal-container">
                            <div class="modal">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                            <div class="modal-info-container">
                            <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                            <p class="modal-text">${user.email}</p>
                            <p class="modal-text cap">${user.location.city}</p>
                            <hr>
                            <p class="modal-text">${user.phone}</p>
                            <p class="modal-text cap" >${user.location.street}, ${user.location.city}, 
                            ${user.location.state.slice(0,2).toUpperCase()} ${user.location.postcode}</p>
                            <p class="modal-text">Birthday: ${user.dob.date.slice(0,10)}</p>
                            </div>
                            </div>`;

        $('body').append(employeeModal);
        addButtonListener();
     }


    function addCardListener () {
        $('.card').each(function (i, card){
            card.addEventListener('click', function (e) {
                    Promise
                        .resolve(users)
                        .then(data => generateModal(data.results[parseInt(e.target.id)]));       
            });
        });
    }       
    
    function addButtonListener() {
        $('#modal-close-btn').click(function (e){
            $('.modal-container').remove();
        });
    }

});//ready end