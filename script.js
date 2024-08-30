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
    const categoriaDesayunoSelect = document.getElementById('Desayuno');
    const categoriaAlmuerzoSelect = document.getElementById('Almuerzo');
    const categoriaCenaSelect = document.getElementById('Cena');
    const categoriaPostreSelect = document.getElementById('Postre');
    const levelFacilSelect = document.getElementById('Facil');
    const levelMedioSelect = document.getElementById('Medio');
    const levelDificilSelect = document.getElementById('Dificil');
    const recursoForm = document.getElementById('formato');
    const cookingInput = document.getElementById('cooking'); 
    const numbersInput = document.getElementById('numbers');
    const ingredientesTextarea = document.getElementById('ingredientes')
    const instruccionesTextarea = document.getElementById('instrucciones')
    const listaRecursos = document.getElementById('recursoList');
    const filtros = {
        nombre: document.getElementById('nombre'),
        levels: document.getElementById('levels'),
        categoria: document.getElementById('categoria')
    };

    function renderRecursos() {
        listaRecursos.innerHTML = '';
        const filteredRecursos = recursos.filter(recurso => {
            return (!filtros.nombre.value || recurso.nombre.toLowerCase().includes(filtros.nombre.value.toLowerCase())) &&
                   (!filtros.levels.value || recurso.levels === filtros.levels.value) &&
                   (!filtros.categoria.value || recurso.categoria === filtros.categoria.value);
        });

        filteredRecursos.forEach((recurso, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${recurso.nombre}</strong> (${recurso.nombre})
                <br>Categoria: ${recurso.categoria.join(', ')}
                <br>Nivel de Dificultad: ${recurso.level.join(', ')}
                <br>Ingredientes: ${recurso.ingredientes}
                <br>Tiempo de Coccion: ${recurso.cooking }
                <br>Numero de porciones: ${recurso.numbers}
                <br><button onclick="editRecurso(${index})">Editar</button>
                <button onclick="deleteRecurso(${index})">Eliminar</button>
            `;
            listaRecursos.appendChild(li);
        });
    }


    function handleFormSubmit(event) {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const categorias = categoriasSelect.value;

        const categoriaOptions = categorias === 'Desayuno' ? categoriaDesayunoSelect :
                              categorias === 'Almuerzo' ? categoriaAlmuerzoSelect : 
                              categorias === 'Cena' ? categoriaCenaSelect :
                              categorias === 'Postre' ? categoriaPostreSelect: null;

        const  categoria = categoriaOptions ? Array.from(categoriaOptions.selectedOptions).map(option => option.value) : [];

        const levels = levelsSelect.value;


        const levelOptions = levels === 'Facil' ? levelFacilSelect :
                             levels === 'Medio' ? levelMedioSelect :
                              levels === 'Dificil' ? levelDificilSelect: null;

        const level = levelOptions ? Array.from(levelOptions.selectedOptions).map(option => option.value) : [];
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

    window.editRecurso = function(index) {
        const recurso = recursos[index];
        if (!recurso) return;

        document.getElementById('nombre').value = recurso.nombre || '';
        categoriasSelect.value = recurso.categorias || '';
        updateGeneroOptions();
        const categoriasSelect = categoriasSelect.value === 'Desayuno' ? categoriaDesayunoSelect : 
                            categoriasSelect.value === 'Almuerzo' ? categoriaAlmuerzoSelect : 
                            categoriasSelect.value ==='Cena' ? categoriaCenaSelect :
                            categoriasPostreSelect;

        if (categoriasSelect) {
            Array.from(categoriasSelect.options).forEach(option => {
                option.selected = recurso.categoria.includes(option.value);
            });
        }
        levelsSelect.value = recurso.levels || '';
        const levelsSelect = levelsSelect.value === 'Facil' ? levelFacilSelect : 
                            levelsSelect.value === 'Medio' ? levelMedioSelect : 
                            levelDificilSelect;

        if (levelsSelect) {
            Array.from(levelsSelect.options).forEach(option => {
                option.selected = recurso.level.includes(option.value);
            });
        }

        cookingInput.value = recurso.cooking || '';
        numbersInput.value = recurso.numbers || '';
        ingredientesTextarea.value = recurso.ingredientes || '';
        instruccionesTextarea.value = recurso.instrucciones || '';
    };

    window.deleteRecurso = function(index) {
        if (confirm('¿Estás seguro de que quieres eliminar este recurso?')) {
            recursos.splice(index, 1);
            saveRecursos();
        }
    };

    
    recursoForm.addEventListener('submit', handleFormSubmit);
    Object.values(filtros).forEach(filtro => filtro.addEventListener('change', renderRecursos));

    renderRecursos();
});