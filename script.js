const links = [
    { text: 'Meu Site', url: 'https://seusite.com' },
    { text: 'GitHub', url: 'https://github.com/seuusuario' },
    { text: 'X (Twitter)', url: 'https://x.com/seuusuario' }
];

function addLinks() {
    const container = document.getElementById('links-container');
    
    links.forEach(link => {
        const button = document.createElement('a');
        button.href = link.url;
        button.className = 'link-button';
        button.textContent = link.text;
        button.target = '_blank'; // Abre em nova aba
        container.appendChild(button);
    });
}

window.onload = addLinks;