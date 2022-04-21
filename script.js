let favimg = []
let htmlArray = []
const form = document.getElementById('form')
const input = document.getElementById('getDate')
const imgBox = document.getElementById('imgbox')
const fav = document.getElementById('fav')

form.addEventListener('submit',async (e)=>{
    e.preventDefault()
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=ZeSIsEacfli3iEpNbM6xePGG1iWmGGeDzFYdHhuT&date=${getDate.value}`)
    const json = await response.json()
    convert(json)
    const add = document.getElementById('add')
    add.addEventListener('click', function addFav(){
        favimg.push(json)
        localStorage.setItem('data', JSON.stringify(favimg))
        judge()    
    })
    })     
       
function convert(data){
        let html = `
        <div class="card-body info-display row g-0 mb-5">
            <img src="${data.url}" alt="" id="imgs" class="img-fluid ratio rounded-start col-md-5">
            <img src="${data.hdurl}" alt="" id="imgl" class="img-thumbnail">   

            <div id="des" class="card-display" >
                <h2 class="card-title">${data.title}</h2>
                <em>${data.date}</em>
                <p class="card-text">${data.explanation}</p>
                <button id="add" class="btn btn-primary">Add To Favourite</button>
            </div>  
        </div>
    `
     imgBox.innerHTML = html   
     const imgs = document.getElementById('imgs')
     const imgl = document.getElementById('imgl')
     imgs.addEventListener('click', () =>{
     imgl.style.display = 'block'
     })
 
     imgl.addEventListener('click',()=>{
         imgl.style.display = 'none'
     })
    }

function judge(){
    
    htmlArray = []
    const ls = JSON.parse(localStorage.getItem('data'))
    if(ls){
        favimg = ls
            for( let i = 0; i < favimg.length; i++ ){
                let favi = favimg[i]
                let htmls = `
                <div class="row g-0 m-2 fav-collection">
                    
                    <img src="${favi.url}" class="img-fluid rounded-start col-md-4 me-4" id="card-img">
                    
                    <div class="fav-info">
                        <div class="card-body">
                            <h4 class="card-title mb-4">${favi.title}</h4>
                            <em class="card-text mb-4">${favi.date}</em><br>
                            <button id="button${i+1}" class='btn btn-danger' data-index=${i}>Delete</button>
                        </div>
                    </div>
                    
                </div>
                `
                htmlArray.push(htmls)
                
                fav.innerHTML = htmlArray.join('')   
            } 
    }
}

fav.addEventListener('click',(e)=>{
    if(e.target.classList.contains('btn-danger')){
        const index = e.target.dataset.index
        favimg.splice(index, 1)
        htmlArray.splice(index,1)
        fav.innerHTML = htmlArray.join('')
        localStorage.setItem('data',JSON.stringify(favimg))
        judge()
    }    
})

judge()

// function addFav(datas){
//     for(let i=0; i<datas.length; i++){
//         let data = datas[i]
//         let newhtml = `
        // <div>
        //     <img src="${data.url}">
        //     <h4>${data.title}</hh4>
        //     <em>${data.date}</em>
        //     <button>delete</button>
        // </div>
//     `
//     hh.push(newhtml)
//     }
//     fav.innerHTML = hh.join('')
// }
    // addFav()

//     const add = document.getElementById('add')
//     add.addEventListener('click', () => {
//         h.push(json)
//         localStorage.setItem('favorites', JSON.stringify(h))
//         const ls = localStorage.getItem('favorites')
// if(ls){
//     const pls = JSON.parse(ls)
//     console.log(pls) 
//     for( let i=0; i<pls.length; i++ ){
//         let html = `
//             <div>
//                 <img src="${pls[i].url}">
//                 <h4>${pls[i].title}</hh4>
//                 <em>${pls[i].date}</em>
//                 <button>delete</button>
//             </div>
//         `
//         hh.push(html)
//         fav.innerHTML = hh.join('')
//     }
// }
//     })
    









