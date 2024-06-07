function triggerFileInput() {
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', function() {
      showPreview(this);
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }
  
function showPreview(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function(e) {
        document.getElementById('currentImage').setAttribute('src', e.target.result);
      }
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  document.getElementById('chooseImageButton').addEventListener('click', function() {
    triggerFileInput();
  });

function alterarNome() {
    const novoTexto = prompt('Digite o novo nome:');
    if (novoTexto && novoTexto.trim() !== '') {
        document.getElementById('NomeAtual').innerText = novoTexto;
    } else {
        alert('Por favor, digite um nome válido.');
    }
}
