  const pane = document.querySelector('.pane');
  const title = pane.querySelector('.title');
  const corner = pane.querySelector('.corner')

  title.addEventListener('mousedown', (event) => {
    pane.classList.add('is-dragging')

    let l = pane.offsetLeft
    let t = pane.offsetTop

    let startX = event.pageX
    let startY = event.pageY

    const drag = (event) => {
      event.preventDefault()

      pane.style.left = l + (event.pageX - startX) + 'px'
      pane.style.top = t + (event.pageY - startY) + 'px'
    }

    const mouseup = () => {
      pane.classList.remove('is-dragging')

      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', mouseup)
    }

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', mouseup)
  })

  corner.addEventListener('mousedown', (event) => {
    let w = pane.clientWidth
    let h = pane.clientHeight

    let startX = event.pageX
    let startY = event.pageY

    const drag = (event) => {
      event.preventDefault()

      pane.style.width = w + (event.pageX - startX) + 'px'
      pane.style.height = h + (event.pageY - startY) + 'px'

      if ((h + (event.pageY - startY)) < 360)
      {document.querySelectorAll('.dinamic_btn').forEach(button => {
        button.style.display = 'none';
      }); 
      document.querySelector('td:nth-child(5)').style.display = 'contents';
      document.querySelector('tr:nth-child(3)').style.display = 'none';}

      else {document.querySelectorAll('.dinamic_btn').forEach(button => {
        button.style.display = '';
      }); 
      document.querySelector('td:nth-child(5)').style.display = 'none';
      document.querySelector('tr:nth-child(3)').style.display = '';}

      if ((h + (event.pageY - startY)) < 250)
      document.querySelector('.disp').style.fontSize = '2em';
      else document.querySelector('.disp').style.fontSize = '4em';
   
    }

    const mouseup = () => {
      document.removeEventListener('mousemove', drag)
      document.removeEventListener('mouseup', mouseup)
    }

    document.addEventListener('mousemove', drag)
    document.addEventListener('mouseup', mouseup)

  })

  document.querySelector('.closeBtn').addEventListener ('click', () => {
    pane.style.display = 'none';
  })


///////////////////СПРАВКА/////////////////////////////
const refBtn = document.querySelector('#reference');
const reference = document.querySelector('.popup_ref');
const closeRef = document.querySelector('#closeRef');
refBtn.addEventListener('click', (e) => {
  e.preventDefault();
  reference.classList.add('active');})

closeRef.addEventListener('click', (e) => {
  e.preventDefault();
  reference.classList.remove('active');})
  

