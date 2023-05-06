import styles from './Rooms.module.css'

import {Button,ListGroup,ListGroupItem} from 'react-bootstrap'
import PropTypes  from 'prop-types'
import React from 'react'

function Rooms({rooms,onRoomSelect}){

    const roomList=rooms.map(room=>{return(
        
        <ListGroup.Item key={room.id} className={`m-0 p-0 ${styles['room-item']}`}>
            <Button 
                onClick={()=>onRoomSelect(room.id)}
                variant='secondary'
                className={`${styles['room-select-btn']}`}
                 >{room.name}
            </Button>
        </ListGroup.Item>        
        )}
    )
    return (
        <div className={styles['rooms-container']}>
            <h3>Rooms:</h3>
            <ListGroup className={styles['rooms-list']}>
                {roomList}
            </ListGroup>        
        </div>

    )
}

export default Rooms


Rooms.propTypes={
    rooms:PropTypes.array,
    onRoomSelect:PropTypes.func,
}