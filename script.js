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

    if (acompanhamentos.length > 4) {
    alert("Você pode escolher no máximo 4 acompanhamentos.");
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

const checkboxes = document.querySelectorAll('.pedido input[type="checkbox"]');
const radiosTamanho = document.querySelectorAll('input[name="tamanho"]');
const contadorAcompanhamentos = document.querySelector("#contadorAcompanhamentos");
const totalPedido = document.querySelector("#totalPedido");

const precos = {
    "300ml": 14.90,
    "500ml": 19.90,
    "700ml": 24.90,
    "Barca Tropical": 39.90
};

function atualizarPedido(){
    const selecionados = document.querySelectorAll('.pedido input[type="checkbox"]:checked');
    const tamanhoSelecionado = document.querySelector('input[name="tamanho"]:checked');

    contadorAcompanhamentos.textContent = `Selecionados: ${selecionados.length}/4`;

    if(tamanhoSelecionado){
        const total = precos[tamanhoSelecionado.value];
        totalPedido.textContent = total.toLocaleString("pt-BR", {
            style:"currency",
            currency:"BRL"
        });
    }else{
        totalPedido.textContent = "R$ 0,00";
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
        const selecionados = document.querySelectorAll('.pedido input[type="checkbox"]:checked');

        if(selecionados.length > 4){
            checkbox.checked = false;
            alert("Você pode escolher no máximo 4 acompanhamentos.");
        }

        atualizarPedido();
    });
});

radiosTamanho.forEach(radio => {
    radio.addEventListener("change", atualizarPedido);
});