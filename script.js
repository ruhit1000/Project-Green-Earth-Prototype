const categoriesContainer = document.getElementById('categoriesContainer');
const treesContainer = document.getElementById('treesContainer');
const loadingSpinner = document.getElementById('loading-spinner');
const allTreesbtn = document.getElementById('allTreesBtn');
const treeDetailsModal = document.getElementById('tree-details-modal');
const modalImage = document.getElementById('modalImage')
const modalCategory = document.getElementById('modalCategory')
const modalDescription = document.getElementById('modalDescription')
const modalPrice = document.getElementById('modalPrice')
const modalTitle = document.getElementById('modalTitle')

const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    data.categories.forEach(category => {
        const btn = document.createElement('button')
        btn.className = "btn btn-outline w-full"
        btn.textContent = category.category_name
        btn.onclick = () => selectCatagory(category.id, btn)
        categoriesContainer.appendChild(btn)
    });
}

const selectCatagory = async (id, btn) => {
    showLoading()
    const allCategoryBtns = document.querySelectorAll('#categoriesContainer button, #allTreesBtn')
    allCategoryBtns.forEach((btn) => {
        btn.classList.remove('btn-active', 'btn-success')
    })
    btn.classList.add('btn-active', 'btn-success')

    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    const data = await res.json()
    removeLoading()
    displayTrees(data.plants)
}

const showLoading = () => {
    loadingSpinner.classList.remove('hidden');
    treesContainer.innerHTML = ''
}

const removeLoading = () => {
    loadingSpinner.classList.add('hidden');
}

allTreesbtn.addEventListener('click', () => {
    const allCategoryBtns = document.querySelectorAll('#categoriesContainer button, #allTreesBtn')
    allCategoryBtns.forEach((btn) => {
        btn.classList.remove('btn-active', 'btn-success')
    })
    allTreesbtn.classList.add('btn-active', 'btn-success')
    loadTrees()
})

const loadTrees = async () => {
    showLoading()
    const res = await fetch('https://openapi.programming-hero.com/api/plants')
    const data = await res.json();
    removeLoading()
    displayTrees(data.plants)
}

const displayTrees = (trees) => {
    treesContainer.innerHTML = ''
    trees.forEach((tree) => {
        const treeCard = document.createElement('div');
        treeCard.className = "card bg-base-100 shadow-sm"
        treeCard.innerHTML = `
        <figure>
            <img class="h-48 w-full object-cover cursor-pointer" onclick="openTreeModal(${tree.id})" src= ${tree.image}
                alt=${tree.name} />
        </figure>
        <div class="card-body">
            <h2 class="card-title cursor-pointer hover:text-[#4ade80]" onclick="openTreeModal(${tree.id})">${tree.name}</h2>
            <p class="line-clamp-2">${tree.description}</p>
            <div class="badge badge-outline badge-success">${tree.category}</div>
            <div class="card-actions justify-between items-center">
                <h2 class="text-xl font-bold text-red-500">$${tree.price}</h2>
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `
        treesContainer.appendChild(treeCard)
    })
}

const openTreeModal = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    const plantDetails = data.plants;
    modalTitle.textContent = plantDetails.name;
    modalImage.src = plantDetails.image;
    modalCategory.textContent = plantDetails.category;
    modalPrice.textContent = plantDetails.price;
    modalDescription.textContent = plantDetails.description
    treeDetailsModal.showModal()
}

loadCategories()
loadTrees()