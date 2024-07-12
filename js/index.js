const plusBtn = document.querySelector('#plus-btn')
const createNotePage = document.querySelector('#create-note-page')
const back = document.querySelector('#back')
const done = document.querySelector('#done')














plusBtn.addEventListener('click', ()=>{
    createNotePage.style.display = 'block'
})
back.addEventListener('click', ()=>{
    createNotePage.style.display = 'none'
})
done.addEventListener('click', ()=>{
    createNotePage.style.display = 'none'
    createNote(`${baseURL}/notes`)
})
