// All category : - https://openapi.programming-hero.com/api/videos/categories
// ALL data by categoryId
// URL Format: - https://openapi.programming-hero.com/api/videos/category/${id}

// Example: - https://openapi.programming-hero.com/api/videos/category/1000
const catContainer = document.getElementById("category-container");
const noContent = document.getElementById('error');
const cardContainer = document.getElementById('card-container');
const loading = document.getElementById('loading');
const sortBtn = document.getElementById("sortBtn");
const catBtn = document.getElementsByClassName("catBtn");
let categoryId = 0;
let sortStatus = false;


const loadCategory = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await res.json()
    const category = data.data;
    
    category.forEach(cat => {
        // console.log(cat);
        const div = document.createElement("div");
        div.innerHTML = `<button onclick="catDetail('${cat.category_id}');active(this)" class="btn catBtn">${cat.category}<button>`;
        catContainer.appendChild(div);
    });
}

const active = (data)=>{
    console.log(catBtn)

    for(const btn of catBtn){
        btn.className = "btn catBtn";
    }

    catBtn.classNist = "btn catBtn";
    const btn = data.parentNode.childNodes[0]
    btn.classList = "bg-red-500 text-white btn hover:bg-red-800 catBtn";
}



const catDetail = async (id=1000) =>{
    loading.classList.remove("hidden");
    categoryId = id;
    noContent.classList.add("hidden");
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    const data = await res.json()
    const detail = data.data;
    cardContainer.innerHTML = ``


    if(detail.length === 0){
        noContent.classList.remove("hidden");
        loading.classList.add("hidden");
        return sortBtn.classList.add("hidden");  
    }else{
        noContent.classList.add('hidden')
    }


 const sort = (a, b) => {
           return parseInt(b.others.views.replace("K", "") * 1000) - parseInt(a.others.views.replace("K", "") * 1000)
 }
    let sorted = detail
    if (sortStatus === true) {
        sortBtn.classList.add("hidden");
      sorted.sort(sort);
    } else {
        sortBtn.classList.remove("hidden");
      sorted = detail;
    }
   

    sorted.forEach((d) => {
      const postStatus = () => {
        let time = d.others.posted_date;
        if (time === "1672656000") {
          time = "16726";
        }
        // 1672656000
        if (time === "") {
          return "";
        } else {
          const h = Math.floor(time / 3600);
          const m = time % 60;
          return ` <div class="absolute bg-black text-white p-1 rounded-xl text-xs right-8 top-80"><p>${h}hrs ${m}min ago</p></div>`;
        }
      };
      // console.log(h, m);

      const div = document.createElement("div");
      div.classList = "card card-compact bg-base-100 relative";

      div.innerHTML = `
        <figure class="px-4 pt-4">
            <img
              src="${d.thumbnail}"
              alt=""
              class="rounded-2xl w-full"
            />
          </figure>
          <div class="p-4">
            <div class="flex gap-2">
              
                <div class="w-12">
                  <img
                    src="${d.authors[0].profile_picture}"
                    class="rounded-full"
                  />
                </div>
             
              <div>
                 <h2 class="card-title">${d.title}</h2>
            
            <div class="flex items-center gap-3">
              <div class="font-semibold"><p>${
                d.authors[0].profile_name
              }</p></div>
              ${
                d.authors[0].verified
                  ? `<div><img src="quality (1).png" alt="" /></div>`
                  : ""
              }
              
            </div>
            <p>${d.others.views} views</p>

              </div>
              </div>
             
          </div>
        ${postStatus()}
        
        `;

      cardContainer.appendChild(div);
    });
    
loading.classList.add('hidden');
sortStatus = false;

}



const sorting = () => {
  sortStatus = true;
  cardContainer.innerHTML = "";
  catDetail(categoryId);
};





loadCategory()
setTimeout(() => {
catDetail();
},1000)
;