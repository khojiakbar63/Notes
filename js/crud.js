const notes = $('#notes')
const noteTitle = $('#note-title')
const noteBody = $('#note-body')
const notify = $('#notify')
const createForm = $('#create-form')
const delBtn = $('#del-btn')
const edittingModalPage = $('#editting-modal-page')
const editTitle = $('#edit-title')
const editBody = $('#edit-body')
const editForm = $('#edit-form')

// noteTitle.addEventListener('keyup', ()=>{
//     console.log(noteTitle.value);
// })

// Base URL
let baseURL = 'http://localhost:3000'
// Get Data
async function getData(URL) {
    try{
        let req = await fetch(`${URL}/notes`)
        let res = await req.json()

        if(req.status === 404) {
            alert('404 error')
        }
        if(req.status === 200) {
            renderData(res.reverse())
        }
    }
    catch(err){
        console.error(err.message);
    }
}
getData(baseURL)

// Render Data
function renderData(data) {
    data.length && data.forEach(el => {
        const note = createElement('div', 'note', `
                    <div id="action-btns">
                        <button><i id="${el.id}" class='bx bx-edit-alt'></i></button>
                        <button><i id="${el.id}" class='bx bx-x'></i></button>
                    </div>
                    <h3 id="title">${el.title}</h3>
                    <div class="flex justify-between">
                        <p id="description">${el.body}</p>
                        <span id="time" class="mt-auto">11:00</span>
                    </div>
        `)

        notes.appendChild(note)
    })
    if(!data.length){
        notes.innerHTML = `<h1 class='text-white'>No data found :(</h1>`
    }
}

// Create Note
async function createNote(URL){
    const newNote = {
        id: String(Date.now()),
        title: noteTitle.value,
        body: noteBody.value
    }
    try{
        if(newNote.title.trim().length !== 0 && newNote.body.trim().length !== 0){
            let req = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newNote)
            })
            if(req.status === 404){
                notify.textContent = 'No Data'
            }
        }
    }
    catch(err){
        alert('Error', err)
    }
}

// Delete Note
async function deleteNote(URL, id) {
    console.log(URL, id);
    try{
        const req = await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })
        if(req.status === 200) {
            alert('Succesfully deleted.')
        }
        if(req.status === 404) {
            alert('Note not deleted.')
        }
    }
    catch(err){
        alert(err)
    }
}
// Putting old values to editting modal page
async function getByID(URL, id) {
    try{
        const req = await fetch(`${URL}/${id}`)
        const res = await req.json()
        if(req.status === 200) {
            editTitle.value = res.title,
            editBody.value = res.body
        }
        if(req.status === 404){
            alert('404 Data not found')
        }
    }
    catch(err) {
        alert('Error type: ', err)
    }
    
}
// UPDATE 
async function updateNote(URL, id){
    let updatedNote = {
        title: editTitle.value,
        body: editBody.value
    }
    try{
        const req = await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedNote)
        })
        const res = await req.json()
        if(req.status === 201) {
            edittingModalPage.style.display = 'none'
        }
    }
    catch(err){

    }
}
// EVENTS
// CREATE NOTE
createForm.addEventListener('submit', ()=>{
    createNote(`${baseURL}/notes`)
})

// DELETE or EDIT NOTE
notes.addEventListener('click', (e)=>{
    if(e.target.classList.contains('bx-x')){
        const id = e.target.getAttribute('id')
        deleteNote(`${baseURL}/notes`, id)
    }
    if(e.target.classList.contains('bx-edit-alt')){
        const id = e.target.getAttribute('id')
        localStorage.setItem('edit-id', id)
        edittingModalPage.classList.remove('hidden')
        getByID(`${baseURL}/notes`, id)
    }

})

// EDIT NOTE
$('#edit-back').addEventListener('click', ()=>{
    edittingModalPage.classList.add('hidden')
})
$('#edit-done').addEventListener('click', ()=>{
    edittingModalPage.classList.add('hidden')
})

editForm.addEventListener('submit', ()=>{
    let id = JSON.parse(localStorage.getItem('edit-id'))
    updateNote(`${baseURL}/notes`,id)
})





























