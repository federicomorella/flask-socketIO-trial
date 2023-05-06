import  { useState,useRef } from 'react'
import { Modal,Button,ButtonGroup,Overlay, ListGroup,Accordion,Popover,InputGroup,FormControl,Spinner} from 'react-bootstrap'
import PropTypes from 'prop-types'

export function ContactList({contacts,onSelect,onAdd,onRemove,loading}){
    const [showSearch, setShowSearch] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [contact, setContact] = useState(0);

    const target = useRef(null);
    const usernameInput=useRef(null);
    const handleShowSearchButton=(e)=>{
        e.stopPropagation()
        setShowSearch(!showSearch)
    }

    const handleSearch=()=>{
        onAdd(usernameInput.current.value)
        setShowSearch(false)
    }


    const confirmationModal=(
        <Modal show={showConfirmation} onHide={()=>setShowConfirmation(false)} size='sm'>
            <Modal.Header closeButton>
                <Modal.Title>Attention</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove {contacts[contact]?.username}?</Modal.Body>
            <Modal.Footer>
            <Button variant="outline-secondary" onClick={()=>setShowConfirmation(false)}>
                No
            </Button>
            <Button variant="outline-primary" onClick={()=>{onRemove(contacts[contact].username);setShowConfirmation(false)}}>
                Yes
            </Button>
            </Modal.Footer>
        </Modal>
    )


    const contactList=contacts.map((c,i)=>{return(
        <ListGroup.Item 
            className='p-0'
            key={i}
            variant={contact==i?'primary':'light'}

            >
            <ButtonGroup
                className='col-12'
                style={{paddingLeft:contact==i?'5px':'0px'}}
                >
                <Button 
                    size='sm'
                    variant='light'
                    style={{width:'100%'}}
                    onClick={()=>{setContact(i);onSelect(i)}}
                    >{c.username}            
                </Button> 
                <Button 
                    size='sm'
                    variant='light'
                    style={{width:'fit-content'}}
                    onClick={()=>{setContact(i);setShowConfirmation(true)}}
                    >-           
                </Button> 
            </ButtonGroup>
            
        </ListGroup.Item>
    )})

    
    return (
        <>
            {confirmationModal}

            <Accordion 
                style={{height:'auto',width:'20%','minWidth':200}}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header >
                        <div className='row align-items-center'>
                            <div className='col-4'>
                                <Button    
                                    ref={target}  
                                    onClick={handleShowSearchButton}
                                    className='p-0 m-1'                                  
                                    style={{width:30,height:30}}
                                    variant='outline-primary'>
                                    <b>+</b>
                                </Button>
                            </div>
                            <div className='col-8'>
                                <b>Contacts:</b>                                
                            </div>
                            {loading?<Spinner animation="border" variant="primary" />:null}
 
                                                                                
                            <Overlay
                                show={showSearch} 
                                target={target.current} 
                                placement='right'                          
                                >
                                <Popover
                                    className='pl-3 pt-0 pb-0'
                                    onClick={(e)=>e.stopPropagation()}
                                    >
                                    <Popover.Body>
                                    <InputGroup 
                                        className="m-0 ">
                                        <FormControl
                                            ref={usernameInput}
                                            id='username'
                                            placeholder="user name"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') 
                                                    handleSearch();
                                                }}
                                        />                                       
                                            
                                        <Button 
                                            variant="outline-secondary"
                                            onClick={handleSearch}>
                                            <svg  width={10} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                                        </Button>                                        
                                    </InputGroup>
                                    </Popover.Body>
                                </Popover>
                            </Overlay>
                            
                        </div>
                        
                    </Accordion.Header>
                    <Accordion.Body
                        className="overflow-auto p-0"
                        style={{height:'50vh'}}
                        >
                            <ListGroup>
                                {contactList}
                            </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            

        </>

    )
}



ContactList.propTypes={
    contacts:PropTypes.array,
    onSelect:PropTypes.func,
    onAdd:PropTypes.func,
    onRemove:PropTypes.func,
    loading:PropTypes.bool
}