const configuracao = {
    whatsapp: "5511987654321",
    instagram: "@acaitropical",
    endereco: "Rua das Palmeiras, 250",
    nomeLoja: "Açaí Tropical"
};

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

},{
threshold:0.2
});

sections.forEach(section => {
section.classList.add("fade");
observer.observe(section);
});

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

const finalizarPedido = document.querySelector("#finalizarPedido");

finalizarPedido.addEventListener("click", () => {
    const tamanho = document.querySelector('input[name="tamanho"]:checked');
    const acompanhamentos = document.querySelectorAll('.pedido input[type="checkbox"]:checked');

    if (!tamanho) {
        alert("Escolha um tamanho antes de finalizar.");
        return;
    }

    let listaAcompanhamentos = [];

    acompanhamentos.forEach(item => {
        listaAcompanhamentos.push(item.value);
    });

    const mensagem = `Olá! Gostaria de pedir um açaí.

Tamanho: ${tamanho.value}

Acompanhamentos: ${listaAcompanhamentos.length > 0 ? listaAcompanhamentos.join(", ") : "Sem acompanhamentos"}`;

    const url = `https://wa.me/5511982282160?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
});