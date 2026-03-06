const categoriesContainer = document.getElementById('categoriesContainer');
const treesContainer = document.getElementById('treesContainer')

const loadCategories = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    data.categories.forEach(category => {
        const btn = document.createElement('button')
        btn.className = "btn btn-outline w-full"
        btn.textContent = category.category_name
        categoriesContainer.appendChild(btn)
    });
}

const loadTrees = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/plants')
    const data = await res.json();
    displayTrees(data.plants)
}

const displayTrees = (trees) => {
    trees.forEach((tree) => {
        const treeCard = document.createElement('div');
        treeCard.className = "card bg-base-100 shadow-sm"
        treeCard.innerHTML = `
        <figure>
            <img class="h-48 w-full object-cover" src= ${tree.image}
                alt=${tree.name} />
        </figure>
        <div class="card-body">
            <h2 class="card-title">${tree.name}</h2>
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

loadCategories()
loadTrees()