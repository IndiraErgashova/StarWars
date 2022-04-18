const BASE_URL = 'https://swapi.dev/api/'
const $row = document.querySelector('.row')
const $container = document.querySelector('.container')
const $next = document.querySelector('.next')
const $prev = document.querySelector('.prev')
const $currentPage = document.querySelector('.currentPage')
const $allPages = document.querySelector('.allPages') 




function getUrl(url, query , callback){
    fetch(`${url}?${query}`)
    .then(r => r.json())
    .then(res => callback(res))
}


let pageCounter = 1
const allHeroes = 82
const limit = 10
const pages = Math.floor(allHeroes / limit)
let currentPage = 1
let selectPage = 1

window.addEventListener('load' , () => {
    getUrl(`${BASE_URL}people/` , 'page=1' , cb => {
        console.log(cb)
        cardTemplate(cb.results)
    })
})


function cardTemplate(base){
    const card = base.map(item => {
        return `
            <div class="card">
                <h3>${item.name}</h3>
                <div>
                    <img src="https://ctl.s6img.com/society6/img/yhaWFdSHoukFK_3oBH1pEEpZKYE/h_700,w_1500/artwork/~artwork/s6-original-art-uploads/society6/uploads/cms/page-starwars/images/90ebd42a9f1c4cc990878d5ae2e134c0?wait=0&attempt=0">
                </div>

                <button class="moreBtn" onclick="More('${item.url}')">More</button>
            </div>
            
        `
    }).join('')

    $row.innerHTML = card
}


function More(single){
    getUrl(single , '', cb => {
        $container.innerHTML = 
        ` 
            <div class="more"> 
                <div class="wrapper">
                    <div>
                        <h1>${cb.name}</h1>
                        <ul class="singleList">
                            <li>
                                Height:<span>${cb.height}</span>
                            </li>
                            <li>
                                Mass:<span>${cb.mass}</span>
                            </li>
                            <li>
                                Hair color:<span>${cb.hair_color}</span>
                            </li>
                            <li>
                                Skin color:<span>${cb.skin_color}</span>
                            </li>
                            <li>
                                Eye_color:<span>${cb.eye_color}</span>
                            </li>
                            <li>
                                Birth_year:<span>${cb.birth_year}</span>
                            </li>
                            <li>
                                Gender:<span>${cb.gender}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                
               
            </div>

            <div>
                <button class="back" onclick="goBack()">Go Back</button>
            </div>
        `
    })
}

function goBack(){
    window.location.reload()
}



window.addEventListener('load' , () => {
    $allPages.innerHTML = pages
    $currentPage.innerHTML = currentPage

    $prev.setAttribute('disabled' , true)
})


$next.addEventListener('click' , e => {
    e.preventDefault()


    currentPage++

    if(currentPage === pages){
        $next.setAttribute('disabled' , true)
    }else{
        $next.removeAttribute('disbled')
    }

    changePage()

    $prev.removeAttribute('disabled')

    getUrl(`${BASE_URL}people/` , `page=${currentPage}`, cb => {
        console.log(cb)
        cardTemplate(cb.results)
    })
})


$prev.addEventListener('click' , e => {
    e.preventDefault()


    currentPage--

    if(currentPage === pages){
        $prev.setAttribute('disabled' , true)
    }

    changePage()

    $next.removeAttribute('disabled')

    getUrl(`${BASE_URL}people/` , `page=${currentPage}` , cb => {
        console.log(cb)
        cardTemplate(cb.results)
    })
})



function changePage(){
    $currentPage.innerHTML = currentPage
}