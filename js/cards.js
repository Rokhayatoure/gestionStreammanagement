const details = [
    {
        title: "Customer Content Management",
        list: [ "APIs et connecteurs standards", "Déploiement flexible", "Support multilingue" ],
        patners: [ "edilance.svg", "sefas.png", "openText.jpg", "compart.png", "naelan.png" ]
    },
    {
        title: "Enterprise Content Management",
        list: [ "Intégration système complète", "Architecture scalable", "Conformité réglementaire" ],
        patners: [ "Alfresq.jpg", "nuxeo.png", "IBM.jpg", "microsoft.jpg" ]
    },
    {
        title: "Office 365 & Solutions",
        list: [ "Migration transparente", "Sécurité cloud native", "Intégration Microsoft 365" ],
        patners: [ "microsoft-Teams.png", "onedrive.png", "office.jpg", "Azure.jpg" ]
    }
]


const cards = document.querySelectorAll('.cards')
const mainCard = document.querySelector('.main-card')


load_mainCard(0)
cards[0].classList.add('bg-[#2B79C2]', 'text-white')

cards.forEach((card, id) => {
    card.addEventListener('click', () => {
        // Pour réinitialiser les cards
        cards.forEach(crd => crd.classList.remove('bg-[#2B79C2]', 'text-white'))
        // Pour ajouter les propriétés 
        card.classList.add('bg-[#2B79C2]', 'text-white')
        // Chargement des données dans ma carte principale
        load_mainCard(id)
    })
})


function load_mainCard(id) {
    const detail = details[id]
    mainCard.querySelector('h2').textContent = detail.title

    const liste = document.getElementById('liste')
    liste.innerHTML = detail.list.map(li => `<li class="list-disc">${li}</li>`).join('')

    const logos = document.getElementById('logos-div')
    logos.innerHTML = detail.patners.map(logo => `
        <div id="logos" class="w-20 h-12 bg-white rounded p-2 flex items-center justify-center shadow-sm hover:-translate-x-4 hover:rotate-10" style="opacity: 1; transform: none;">
            <img src="/images/${logo}" alt="Partner logo" class="object-contain max-h-full">
        </div> `
    ).join('')
}

