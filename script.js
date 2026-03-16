// MENU DATA
const menuData = {
  entradas: [
    { name: 'Alheira de Mirandela', price: '8', desc: 'Alheira grelhada com ovo a cavalo e batata a murro.', tag: null },
    { name: 'Caldo Verde', price: '5', desc: 'Sopa tradicional de couve galega com chourico e azeite.', tag: null },
    { name: 'Pataniscas de Bacalhau', price: '9', desc: 'Frituras de bacalhau com salada de feijao frade.', tag: null },
    { name: 'Queijo da Serra', price: '7', desc: 'Queijo curado da Serra da Estrela com compota de figo.', tag: 'Vegetariano' },
    { name: 'Presunto Iberico', price: '10', desc: 'Presunto de Barrancos com pao de centeio e manteiga.', tag: null },
    { name: 'Pao com Manteiga', price: '3', desc: 'Pao artesanal de massa mae com manteiga de alho e ervas.', tag: 'Vegetariano' },
  ],
  pratos: [
    { name: 'Bacalhau a Bras', price: '16', desc: 'Bacalhau desfiado com batata palha, ovos mexidos e azeitona.', tag: null },
    { name: 'Arroz de Lingueirao', price: '18', desc: 'Arroz meloso com lingueirao, coentros e azeite virgem.', tag: null },
    { name: 'Lombinhos de Porco', price: '15', desc: 'Lombinhos grelhados com amêijoas a Bulhao Pato e batata frita.', tag: null },
    { name: 'Polvo a Lagareiro', price: '19', desc: 'Polvo assado com batata a murro e azeite temperado.', tag: 'Destaque' },
    { name: 'Migas de Espargos', price: '13', desc: 'Migas de pao com espargos silvestres, ovo e queijo.', tag: 'Vegetariano' },
    { name: 'Frango no Churrasco', price: '14', desc: 'Meio frango grelhado com piri-piri, salada e batata frita.', tag: null },
  ],
  sobremesas: [
    { name: 'Pastel de Nata', price: '2', desc: 'Pastel de nata tradicional, servido morno com canela.', tag: null },
    { name: 'Arroz Doce', price: '5', desc: 'Arroz doce cremoso com limao e canela, receita da casa.', tag: 'Vegetariano' },
    { name: 'Toucinho do Ceu', price: '6', desc: 'Doce conventual de amendoa e gema de ovo.', tag: null },
    { name: 'Pudim Abade de Priscos', price: '6', desc: 'Pudim tradicional de Braga com caramelo e toucinho.', tag: null },
    { name: 'Mousse de Chocolate', price: '5', desc: 'Mousse artesanal de chocolate negro 70% com laranja confitada.', tag: 'Vegetariano' },
    { name: 'Salame de Chocolate', price: '5', desc: 'Salame de chocolate com bolachas e amendoa laminada.', tag: 'Vegetariano' },
  ],
  bebidas: [
    { name: 'Vinho Verde (garrafa)', price: '16', desc: 'Branco fresco e mineral da regiao do Minho.', tag: null },
    { name: 'Vinho Alentejano (garrafa)', price: '18', desc: 'Tinto encorpado do Alentejo, perfeito com carnes.', tag: null },
    { name: 'Vinho da casa (copo)', price: '3.5', desc: 'Branco ou tinto, selecao diaria da casa.', tag: null },
    { name: 'Super Bock / Sagres', price: '2.5', desc: 'Cerveja nacional de pressao ou garrafa.', tag: null },
    { name: 'Ginjinha', price: '3', desc: 'Licor de ginja, servido com ou sem ela.', tag: null },
    { name: 'Agua / Refrigerante', price: '2', desc: 'Agua com/sem gas, sumos naturais ou refrigerantes.', tag: null },
  ],
};

// RENDER MENU
function renderMenu(tab) {
  const grid = document.getElementById('menuGrid');
  const items = menuData[tab];
  grid.innerHTML = items.map(item => `
    <div class="menu-item">
      <div class="menu-item-header">
        <span class="menu-item-name">${item.name}</span>
        <span class="menu-item-price">&euro;${item.price}</span>
      </div>
      <p class="menu-item-desc">${item.desc}</p>
      ${item.tag ? `<span class="menu-item-tag">${item.tag}</span>` : ''}
    </div>
  `).join('');
}

// TABS
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderMenu(btn.dataset.tab);
  });
});
renderMenu('entradas');

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });
navbar.classList.toggle('scrolled', window.scrollY > 60);

// MOBILE NAV
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// HERO LOAD
document.querySelector('.hero-bg').classList.add('loaded');

// SCROLL REVEAL
const revealEls = document.querySelectorAll(
  '#about .about-text, #about .tile-pattern, .info-card, .menu-item'
);
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
}
