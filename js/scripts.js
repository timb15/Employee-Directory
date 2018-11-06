//Waits until the document is loaded before running any JS
$(document).ready( function () {
    let employees = [];
    let searchedEmployees = [];

    //fecthes promise from database of users
    const fetchData = fetch('https://randomuser.me/api/?nat=us&results=12')
                            .then(res => res.json())
                            .catch(error => console.log('Looks like there was a problem!', error));

    //calls the generateEmployees function on the results array from the data retrived from the database                
    Promise.resolve(fetchData)
                    .then(data => {
                        for(let i = 0; i < data.results.length; i ++ ) {
                            employees.push(data.results[i]);
                        }
                        generateEmployees(employees);
                    });
    
                               
   
    //Function to generate and display employees on the page
    function generateEmployees(data) {
        for(let i = 0; i < data.length; i++) {
            let employeeCard = `<div class="card" id="${i}">
                                <div class="card-img-container" id="${i}">
                                <img class="card-img" src="${data[i].picture.large}" alt="profile picture" id="${i}"></div>
                                <div class="card-info-container" id="${i}">
                                <h3 class="card-name cap" id="${i}">${data[i].name.first} ${data[i].name.last}</h3>
                                <p class="card-text" id="${i}">${data[i].email}</p>
                                <p class="card-text cap" id="${i}">${data[i].location.city}, ${data[i].location.state}</p></div>
                                </div>`;

            $('#gallery').append(employeeCard);
        };
        addCardListener();
    };


    /*
    function that creates a modal when any part of the employee card is clicked.
    Also adds click listeners to the buttons on the modal 
    */
     function generateModal(user, idNum) {
        let employeeModal = `<div class="modal-container" id="${idNum}">
                            <div class="modal">
                            <div class="modal-btn-container" id="modal-btn-container">
                            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>                   
                            <button type="button" id="modal-prev-btn" class="btn"><strong>prev</strong></button>
                            <button type="button" id="modal-next-btn" class="btn"><strong>next</strong></button>
                            </div>
                            <div class="modal-info-container">
                            <img class="modal-img" src="${user.picture.medium}" alt="profile picture">
                            <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                            <p class="modal-text">${user.email}</p>
                            <p class="modal-text cap">${user.location.city}</p>
                            <hr>
                            <p class="modal-text">${user.phone}</p>
                            <p class="modal-text cap" >${user.location.street},  
                            ${user.location.state} ${user.location.postcode}</p>
                            <p class="modal-text">Birthday: ${user.dob.date.slice(0,10)}</p>
                            </div>
                            </div>`;

        $('body').append(employeeModal);
        addModalListener();
        if(user.gender === 'male') {
            $('.modal')[0].style.backgroundColor = 'lightblue';
        }
        else {
            $('.modal')[0].style.backgroundColor = 'lightpink';
        }
     }

    //function to add a click listener to the employee card
    function addCardListener () {
        $('.card').each(function (i, card){
            if(searchedEmployees.length > 0){
                card.addEventListener('click', function (e) {
                    const num = parseInt(e.target.id);
                    generateModal(searchedEmployees[num], num);       
                });
            }
            else {
                card.addEventListener('click', function (e) {
                    const num = parseInt(e.target.id);
                    generateModal(employees[num], num); 
                }); 
            }
        });
    }       
    

    //function to add a click listener for each button on the employee modal
    function addModalListener() {
        $('#modal-btn-container').click(function (e){
            const modal = $('.modal-container')[0];
            const userNum = parseInt(modal.id);
            if(searchedEmployees.length > 0){
                if(e.target.textContent === 'X') {
                    modal.remove();
                    }
                    else if(e.target.textContent === 'next' && userNum < searchedEmployees.length - 1) {
                        modal.remove();
                        generateModal(searchedEmployees[userNum + 1], userNum + 1);
        
                    }
                    else if(e.target.textContent === 'prev' && userNum > 0) {
                        modal.remove();
                        generateModal(searchedEmployees[userNum - 1], userNum - 1);
                    }

            }
            else {
                if(e.target.textContent === 'X') {
                modal.remove();
                }
                else if(e.target.textContent === 'next' && userNum < employees.length - 1) {
                    modal.remove();
                    generateModal(employees[userNum + 1], userNum + 1);

                }
                else if(e.target.textContent === 'prev' && userNum > 0) {
                    modal.remove();
                    generateModal(employees[userNum - 1], userNum - 1);
                }
            }
       });
    }


    //adding a searchbar to the page
    const searchBar = `<form action="#" method="get" id="search-form">
                    <input type="search" id="search-input" class="search-input" placeholder="Search...">
                    <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
                    </form>`
    $('#search-container').append(searchBar);

        
    //adding a submit listener to the searchbar form    
    $('#search-form').submit(function () {
            searchedEmployees = [];
            const searchValue = $('#search-input').val();
            searchedEmployees = employees.filter(employee => (employee.name.first.startsWith(searchValue) || employee.name.last.startsWith(searchValue) ));
            $('#gallery').empty();
            generateEmployees(searchedEmployees); 
            });           
                           
    
        


});//ready end