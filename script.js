const localStorageKey = 'to-do-list-af'

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


function validadeIfExistsNewTask(){
  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let inputValue = document.getElementById('input-new-task').value
  let exists = values.find(x => x.name == inputValue)
  return !exists ? false : true

}

function newTask(){
  let input = document.getElementById('input-new-task')
  input.style.border = ''

  if(!input.value)
    {
      input.style.border = '1px solid red'
      alert('Digite algo para ser adionado a lista')
    }

  else if(validadeIfExistsNewTask()){
    alert('Já existe uma task com essa descrição!')

  }
  else
  {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    values.push({
      name: input.value
    })
    localStorage.setItem(localStorageKey,JSON.stringify(values))
    showValues()
  }
    input.value = ''
}

function showValues(){

  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let list = document.getElementById('table-list')
  list.innerHTML = ''
  for(let i = 0; i < values.length; i++){
      list.innerHTML += `<li>${values[i]['name']}<button id="btn-trash" onclick='removeItem("${values[i]['name']}")'>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
      </svg>
      </button></li>`
    }
}

function removeItem(data){

  let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
  let index =values.findIndex(x => x.name == data)
  values.splice(index,1)
  localStorage.setItem(localStorageKey,JSON.stringify(values))
  showValues()

}

showValues()