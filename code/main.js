let showrow = document.querySelector('#rows')
let navlink = document.querySelectorAll('.urls li a')
let inputsearch = document.querySelector('#search')
/*this for colse and open the side bar*/
function opennavbar(){
    $(".side ").animate({
        left: 0
    }, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");

    for (let i = 0; i < 5; i++) {
        $(".urls li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}
function closenavbar() {
    let boxWidth = $(".side .navmain").outerWidth()
    $(".side").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");

    $(".urls li").animate({
        top: 300
    }, 500)


}
closenavbar()

$(".side i.open-close-icon").click(() => {
    if ($(".side").css("left") == "0px") {
        console.log('its work');
        closenavbar()
    } else {
        opennavbar()
    }
})


async function getdata(inputt='now_playing'){
    
    if(inputt == 'trending/all/day'){
        let data = await fetch(`https://api.themoviedb.org/3/${inputt}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let showdata = await data.json()
        displaydata(showdata.results)
    }
    else{
        let data = await fetch(`https://api.themoviedb.org/3/movie/${inputt}?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
        let showdata = await data.json()
        displaydata(showdata.results)
    }
}
async function searchMovies(query) {
    try {
        const apiKey = 'eba8b9a7199efdcb0ca1f96879b83c44';
        const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${(query)}&language=en-US`;

        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const searchdata = await response.json();
        displaydata(searchdata.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
function displaydata(data) {
    let box = '';
    for (let i = 0; i < data.length; i++) {
        
        let rating = data[i].vote_average / 2; 
        let filledStars = '<i class="fa-solid fa-star"></i>'.repeat(Math.floor(rating));
        let halfStar = (rating % 1 !== 0) ? '<i class="fa-regular fa-star"></i>' : '';

        box += `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div class="image rounded-3 overflow-hidden d-flex flex-column">
                    <div class="image-container">
                        <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path || data[i].backdrop_path}" class="w-100" alt="movie image">
                    </div>
                    <div class="info text-white p-3 d-flex flex-column justify-content-between">
                        <div>
                            <h2>${data[i].title || data[i].name}</h2>
                            <p>${data[i].overview}</p>
                            <span>Release Date: ${data[i].release_date || 'N/A'}</span>
                            <div class="stars text-warning my-3">
                            ${filledStars}${halfStar}
                        </div>
                        <div class="rating  my-4">
                            <span class="fs-4">${parseFloat(data[i].vote_average.toFixed(1))}</span>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    showrow.innerHTML = box;
}



getdata()

function getnavlinkname(){
    navlink.forEach(function(e){
        e.addEventListener('click',function(e){
            let getname = e.target.getAttribute('data-type');
            getdata(getname)
        })
    })
}
getnavlinkname()

inputsearch.addEventListener('change',function(){
    searchMovies(inputsearch.value)
})

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const nameInput = document.getElementById('name');
        const name = nameInput.value.trim();
        if (name === '') {
            alert('Please enter your name.');
            nameInput.focus();
            return;
        }

        const emailInput = document.getElementById('email');
        const email = emailInput.value.trim();
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            emailInput.focus();
            return;
        }

        const phoneInput = document.getElementById('phone');
        const phone = phoneInput.value.trim();
        if (!isValidPhoneNumber(phone)) {
            alert('Please enter a valid phone number.');
            phoneInput.focus();
            return;
        }

        const ageInput = document.getElementById('age');
        const age = ageInput.value.trim();
        if (!isValidAge(age)) {
            alert('Please enter a valid age between 1 and 150.');
            ageInput.focus();
            return;
        }

        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            passwordInput.focus();
            return;
        }

        const repasswordInput = document.getElementById('repassword');
        const repassword = repasswordInput.value;
        if (password !== repassword) {
            alert('Passwords do not match.');
            repasswordInput.focus();
            return;
        }

        
        alert('Form submitted successfully!');
        
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhoneNumber(phone) {
        const phoneRegex = /^\+?\d{8,15}$/;
        return phoneRegex.test(phone);
    }

    function isValidAge(age) {
        const ageRegex = /^(?:1[0-4]?\d|150)$/;
        return ageRegex.test(age);
    }
});
