document.addEventListener('DOMContentLoaded', () => {
    const pageKey = 'recursosPage'; // Cambia este valor para cada página si es necesario
    let recursos = JSON.parse(localStorage.getItem(pageKey)) || [];

    // Función para guardar los recursos en el localStorage
    function saveRecursos() {
        localStorage.setItem(pageKey, JSON.stringify(recursos));
        renderRecursos();
    }

    const categoriasSelect = document.getElementById('categorias');
    const levelsSelect = document.getElementById('levels')
    const recursoForm = document.getElementById('formato');
    const cookingInput = document.getElementById('cooking'); 
    const numbersInput = document.getElementById('numbers');
    const ingredientesTextarea = document.getElementById('ingredientes')
    const instruccionesTextarea = document.getElementById('instrucciones')
    const listaRecursos = document.getElementById('recursoList');
    const filtros = {
        nombre: document.getElementById('nombres'),
        levels: document.getElementById('Filtrolevels'),
        categoria: document.getElementById('Filtrocategoria')
    };

    function renderRecursos() {
        
        listaRecursos.innerHTML = '';
        const filteredRecursos = recursos.filter(recurso => {
            return (!filtros.nombre.value || recurso.nombre.toLowerCase().includes(filtros.nombre.value.toLowerCase())) &&
                   (filtros.levels.value === 'Todos' || recurso.levels === filtros.levels.value) &&
                   (filtros.categoria.value === 'Todos' || recurso.categoria === filtros.categoria.value);
        });
    
        
    
        filteredRecursos.forEach((recurso, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${recurso.nombre}</strong>
                <br>Categoría: ${recurso.categoria}
                <br>Nivel de Dificultad: ${recurso.level}
                <br>Ingredientes: ${recurso.ingredientes}
                <br>Tiempo de Cocción: ${recurso.cooking}
                <br>Número de porciones: ${recurso.numbers}
                <br><button onclick="editRecurso(${index})">Editar</button>
                <button onclick="deleteRecurso(${index})">Eliminar</button>
            `;
            listaRecursos.appendChild(li);
        });
    }


    function handleFormSubmit(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const categoria = categoriasSelect.value;
        const level = levelsSelect.value;
        const cooking = cookingInput.value;
        const numbers = numbersInput.value;
        const ingredientes = ingredientesTextarea.value;
        const instrucciones = instruccionesTextarea.value;

        const nuevoRecurso = {
            nombre,
            ingredientes,
            instrucciones,
            categoria,
            cooking,
            numbers,
            level,
        };

        recursos.push(nuevoRecurso);
        saveRecursos();
    }

    function editRecurso(index) {
        const recurso = recursos[index];
        if (!recurso) return;

        document.getElementById('nombre').value = recurso.nombre || '';
        categoriasSelect.value = recurso.categoria || '';
        levelsSelect.value = recurso.level || '';
        cookingInput.value = recurso.cooking || '';
        numbersInput.value = recurso.numbers || '';
        ingredientesTextarea.value = recurso.ingredientes || '';
        instruccionesTextarea.value = recurso.instrucciones || '';
    }

    function deleteRecurso(index) {
        if (confirm('¿Estás seguro de que quieres eliminar este recurso?')) {
            recursos.splice(index, 1);
            saveRecursos();
        }
    }

    
    recursoForm.addEventListener('submit', handleFormSubmit);
    Object.values(filtros).forEach(filtro => filtro.addEventListener('change', renderRecursos));

    renderRecursos();
});