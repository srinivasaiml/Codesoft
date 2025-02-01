function createEmojis() {
    const emojis = ['💖', '❤️', '💌', '💘', '💝', '💞', '💕'];
    const container = document.getElementById('emojiContainer');
    
    for(let i = 0; i < 20; i++) {
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(emoji);
    }
}

function calculateLove() {
    const name1 = document.getElementById("name1").value.trim().toLowerCase();
    const name2 = document.getElementById("name2").value.trim().toLowerCase();
    const result = document.getElementById("result");
    const progressBar = document.getElementById("progressBar");

    if (!name1 || !name2) {
        alert("Please enter both names!");
        return;
    }

    // Reset  ki edi
    
    result.classList.remove('show');
    progressBar.style.width = '0';

    // percentage ki edi
    const combined = name1 + name2;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        hash += combined.charCodeAt(i);
    }
    const lovePercentage = 50 + (hash % 50);

    // progress bar di edi
    setTimeout(() => {
        progressBar.style.width = `${lovePercentage}%`;
        result.classList.add('show');
        result.innerHTML = `💕 ${name1} & ${name2}<br>${lovePercentage}% True Love! 💕`;
    }, 300);
}


createEmojis();

//  inputs oveer avtdi
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        
    });
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});