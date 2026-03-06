const categoriesContainer = document.getElementById('categoriesContainer');

const loadCategories = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    data.categories.forEach(category => {
        const btn = document.createElement('button')
        btn.className = "btn btn-outline w-full"
        btn.textContent = category.category_name
        categoriesContainer.appendChild(btn)
    });
}

loadCategories()