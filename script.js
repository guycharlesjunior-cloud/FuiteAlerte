async function loadPosts() {
    const res = await fetch("/posts");
    const posts = await res.json();

    const container = document.getElementById("posts");
    container.innerHTML = "";

    posts.forEach(post => {
        const div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
            <img src="/uploads/${post.image}" />
            <p>${post.caption}</p>
        `;

        container.appendChild(div);
    });
}

loadPosts();

