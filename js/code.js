// set website theme in light
const htmlTag = document.getElementsByTagName("html")[0];
htmlTag.setAttribute("data-theme", "light")


//catch all lets discuss api  in fetch 

const discussCardApi = (search) => {
    fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
        .then(res => res.json())
        .then(data => AllDiscussCard(data.posts , search))
        .catch(error => console.log(error))

}

const AllDiscussCard = (cards ) => {
    const cardSection = document.getElementById('discuss-card-container');
    cardSection.innerHTML = ""
    cards.forEach(ele => {
        const card = document.createElement('div');
        card.innerHTML = `
         <div class="border rounded-2xl bg-[rgb(121, 125, 252)] p-8 flex gap-5 mb-4">
                    <div class="indicator">
                     <span class="indicator-item badge ${ele.isActive ? "badge-primary" : "badge-secondary"}"></span>
                        <div class=" grid h-32 w-32 place-items-center">
                            <img src="${ele.image}" alt="">
                        </div>
                    </div>

                    <div class="space-y-3 w-full">

                        <div class="flex gap-10 items-center">
                            <p>#${ele.category}</p>
                            <p>Author : ${ele.author.name}</p>
                        </div>
                        <h4 id="title" class="text-2xl font-bold"> ${ele.title}</h4>
                        <p class="text-gray-400">${ele.description}</p>
                        <div class="border-b border-dashed border-orange-500"></div>
                        <div class="flex justify-between items-center">
                            <div class="flex justify-around md:gap-10 gap-3">
                                <div class="flex items-center md:gap-3 ">
                                    <img class="w-5" src="https://img.icons8.com/?size=32&id=jOjH1Mt48Fp1&format=png"
                                        alt="">
                                    <p>${ele.comment_count}</p>
                                </div>
                                <div  class="flex items-center md:gap-3  ">
                                    <img class="w-5" src="https://img.icons8.com/?size=30&id=60022&format=png" alt="">
                                    <p id="view-count">${ele.view_count}</p>
                                </div>
                                <div class="flex items-center md:gap-3 ">
                                    <img class="w-5" src="https://img.icons8.com/?size=50&id=19100&format=png" alt="">
                                    <p>${ele.posted_time} min</p>
                                </div>
                            </div>
                            <div id="button-clicked" onclick="buttonClicked('${ele?.title.split("'").join("")}', '${ele?.view_count}')" class="bg-[#10B981] hover:bg-[#797DFC]  p-2 rounded-full w-10 h-10">
                                <img class="w-8" src="https://img.icons8.com/?size=50&id=12580&format=png" alt="">
                            </div>
                        </div>

                    </div>

                </div>
        
        `
        cardSection.append(card);

    });

}



// catch latest post api in fetch 

const latestPostApi = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await response.json();
    GetLatestPostCard(data);

}

const GetLatestPostCard = (cards) => {
    const latestpostField = document.getElementById('latest-card-container');
    cards.forEach((e) => {
        const allCards = document.createElement('div');
        allCards.innerHTML = `
            <div class="card card-compact bg-base-100  w-96 h-[450px] shadow-xl">
                    <figure>
                        <img src="${e.cover_image}"
                            alt="Shoes" />
                    </figure>
                    <div class="card-body">
                        <div class="flex justify-between items-center gap-3">
                            <img class="w-5" src="https://img.icons8.com/?size=50&id=23&format=png" alt="">
                            <p class="text-sm text-gray-500">${e.author.posted_date}</p>
                        </div>
                        <h2 class="card-title">${e.title}</h2>
                        <p>${e.description} </p>
                        <div class="flex gap-5">
                            <img class="w-10 h-10 rounded-full object-cover"
                                src="${e.profile_image}"
                                alt="">
                            <div>
                                <p class="text-sm font-bold">${e.author.name}</p>
                                <p>${e.author.designation}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `;
        latestpostField.append(allCards);
    })

}




// search deya category ke khuje ber korbe
const daynamicSearch = (search)=>{
    fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`)
        .then(res=>res.json())
        .then(data => AllDiscussCard(data.posts))
    

}
// click the search button and get the value
const searchbutton = ()=>{
    const inputField = document.getElementById('input-field').value ;
    daynamicSearch(inputField);


}

const buttonClicked =(title ,view)=>{

    // button e clcick korle marks as read er counter ek ek kore barbeb
    const markCount = document.getElementById('mark-as-count').innerText;
    const number = parseInt(markCount);
    let sum = number + 1;
    document.getElementById('mark-as-count').innerText= sum;




    const buttonId = document.getElementById('marks-read-card');
    const buttons = document.createElement('div');
    buttons.innerHTML = `
    <div  class="bg-orange-500 my-4 w-11/12 mx-auto  rounded-xl p-3 flex items-center gap-3">
    <p class="font-bold w-10/12">${title}</p>
    <div>
    <div  class="flex items-center gap-1 ">
    <img class="w-5" src="https://img.icons8.com/?size=30&id=60022&format=png" alt="">
    <p>${view}</p>
    </div>
    </div>  
    </div>`
    ;
    buttonId.appendChild(buttons);
}





discussCardApi();
latestPostApi();