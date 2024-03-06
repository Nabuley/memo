let postits = JSON.parse(localStorage.getItem('postits')) || [];
var mode="shift";
function change_mode(){
    var button = document.getElementById('mode-button');
    if(mode==="shift"){
        mode="push";
        button.textContent = "Mode: Push";
    }else{
        mode="shift";
        button.textContent = "Mode: Shift";
    }
}

function renderPostits() {
    document.querySelectorAll('.board').forEach(board => board.innerHTML = '');
    postits.forEach((postit, index) => {
        const div = document.createElement('div');
        const textarea = document.createElement('textarea');
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            textarea.style.height = Math.max(190,textarea.scrollHeight) + 'px';
            this.parentNode.style.height = (this.scrollHeight + 20) + 'px';
        });
        const removeBtn = document.createElement('button');

        div.style.backgroundColor = postit.color;
        textarea.style.backgroundColor = postit.color;
        if (postit.color === 'yellow') {  // If the postit is yellow
            textarea.style.color = 'black';  // Set the text color to black
        }

        textarea.value = postit.text;
        textarea.addEventListener('input', function() {
            postits[index].text = textarea.value;
            localStorage.setItem('postits', JSON.stringify(postits));
        });

        removeBtn.textContent = '-';
        removeBtn.addEventListener('click', function() {
            postits.splice(index, 1);
            localStorage.setItem('postits', JSON.stringify(postits));
            renderPostits();
            Array.from(document.getElementsByTagName('textarea')).forEach(function(textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = Math.max(190,textarea.scrollHeight) + 'px';
                textarea.parentNode.style.height = (textarea.scrollHeight + 20) + 'px';
            });
        });

        div.appendChild(textarea);
        div.appendChild(removeBtn);
        document.getElementById(postit.color + '-board').appendChild(div);
    });
}

Array.from(document.getElementsByClassName('add')).forEach(function(button) {
    button.addEventListener('click', function() {
        if(mode==="shift"){
            postits.unshift({ text: '', color: button.style.backgroundColor });
        }else{
            postits.push({ text: '', color: button.style.backgroundColor });
        }
        localStorage.setItem('postits', JSON.stringify(postits));
        renderPostits();
        Array.from(document.getElementsByTagName('textarea')).forEach(function(textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.max(190,textarea.scrollHeight) + 'px';
            textarea.parentNode.style.height = (textarea.scrollHeight + 20) + 'px';
        });
    });
});

window.onload = function() {
    renderPostits();

    // After rendering the postits, adjust the size of all textareas
    Array.from(document.getElementsByTagName('textarea')).forEach(function(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.max(190,textarea.scrollHeight) + 'px';
        textarea.parentNode.style.height = (textarea.scrollHeight + 20) + 'px';
    });
}
