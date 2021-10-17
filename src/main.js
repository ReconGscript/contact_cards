let contacts = [{
        name: "weHave SameMobile Num",
        email: "DadJockeLover@gmail.com",
        mobile: '6942091119',
        address: 'overThere , KSA , ST-22',
        image: "https://randomuser.me/api/portraits/men/88.jpg"
    }, {
        name: "party smart guy",
        email: "mrRichAlot@outlook.com",
        mobile: '6942091119',
        address: 'NotHere , USK , ST-70',
        image: "https://randomuser.me/api/portraits/men/66.jpg"
    }, {
        name: "candel with uhhh",
        email: "iLostMy@outlook.com",
        mobile: '6942091119',
        address: 'yes city , USK , ST-7',
        image: "https://randomuser.me/api/portraits/men/1.jpg"
    }, {
        name: "adam flicker bannana",
        email: "gmail.email@outlook.com",
        mobile: '6942091119',
        address: 'nah city , USK , ST-8',
        image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
        name: "sandwitch roasted car",
        email: "notGmail@gmail.com",
        mobile: '6942091119',
        address: 'planet earth , NY , ST-103',
        image: "https://randomuser.me/api/portraits/men/52.jpg"
    }, {
        name: "mouseless keyboard pen",
        email: "doYouRemember@yahoo.com",
        mobile: '6942091119',
        address: 'US , lazyTN , ST-103',
        image: "https://randomuser.me/api/portraits/men/70.jpg"
    },
    {
        name: "sticky stone pickaxe",
        email: "localhost@mypc.com",
        mobile: '6942091119',
        address: 'somewhere , where , here',
        image: "https://randomuser.me/api/portraits/men/33.jpg"
    }
];



/**
Conditional(ternary) operator
learn about it here
https: //developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator

 */
contacts = localStorage.getItem('contacts') ?
    JSON.parse(localStorage.getItem('contacts')) : contacts;


function render_cards() {
    // no return value here , you can use forEach instead
    contacts.map((contact, i) => {
        // i : is the index of the contact inside the array
        document.querySelector("#cards-container").prepend(card_template(contact, i));
    });
}
render_cards();





function card_template(contact, index = null) {

    // create card-container(div) using , itll be easier to append and prepend them later
    let card_container = document.createElement("div");
    card_container.className = "col-12 col-lg-4 col-md-6 p-1 text-secondary";
    card_container.style = "min-width:400px";
    // now
    card_container.onmouseover = () => {
        card_container.getElementsByTagName("button")[0].classList.add("d-block");
        card_container.getElementsByTagName("button")[0].classList.remove("d-none");
    }
    card_container.onmouseleave = () => {
        card_container.getElementsByTagName("button")[0].classList.add("d-none");
        card_container.getElementsByTagName("button")[0].classList.remove("d-block");
    }

    // now we add 
    card_container.innerHTML = `<div class="w-100 d-flex bg-white shadow">
               <button onclick="delete_card(this)" id="${index}" class="btn btn-danger position-absolute d-none">
                <i class="bi bi-trash"></i>
                </button>
        <div class = "col-4 d-flex align-items-center justify-content-center p-4 border-end">
        <div style="w-100">
        <img  class = "rounded-circle img-fluid" src = "${contact.image}" >
        </div>
        
        </div>
        <div class="card-body col-8 bg-white">
                            <p>
                                <span class="lead">
                                    ${contact.name}
                                </span>
                            </p>
                            <hr>
                            <p class="card-subtitle my-1 text-muted">
                                <i class="bi bi-phone"></i>
                                <span class="px-2">
                                    ${contact.mobile}
                                </span>
                            </p>
                            <p class="card-subtitle my-1 text-muted">
                                <i class="bi bi-at"></i>
                                <span class="px-2">
                                    ${contact.email}
                                </span>
                            </p>

                            <p class="card-subtitle my-1 text-muted">
                                <i class="bi bi-geo-alt"></i>
                                <span class="px-2">
                                    ${contact.address}
                                </span>
                            </p>

                        </div>
                    </div>`;

    return card_container;
}






function add_new_card() {
    // get some random image as pfp
    let number = Math.floor(Math.random() * 99)
    let random_image = `https://randomuser.me/api/portraits/men/${number}.jpg`;
    // init the contact object
    let contact = {
        name: document.querySelector("#name").value,
        mobile: document.querySelector("#mobile").value,
        email: document.querySelector("#email").value,
        address: document.querySelector("#address").value,
        image: random_image
    }
    // push to the contact array
    contacts.push(contact);
    // get the index of the new contact
    let index = contacts.indexOf(contact);
    // slap a new card into the container with the new contact object
    document.querySelector("#cards-container").prepend(card_template(contact, index));
    // cast the array into string , so we cant store it into LocalStorage
    let string_books = JSON.stringify(contacts);
    localStorage.setItem("contacts", string_books);

    document.querySelector("#name").value = '';
    document.querySelector("#mobile").value = '';
    document.querySelector("#email").value = '';
    document.querySelector("#address").value = '';

}




function delete_card(id) {
    contacts.splice(id.id, 1);
    let string_books = JSON.stringify(contacts);
    localStorage.setItem("contacts", string_books);
    document.querySelector("#cards-container").innerHTML = '';
    render_cards();
}