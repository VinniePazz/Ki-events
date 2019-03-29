import React from 'react'

const style = {
	width: '100%',
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'flex-start',
	alignItems: 'center'
}

const NotFound = () => {
  return (
    <div style={style}>
      <h1>Ошибка 404!</h1>
      <h4>Вернитесь на главную страницу</h4>
    </div>
  )
}

export default NotFound
