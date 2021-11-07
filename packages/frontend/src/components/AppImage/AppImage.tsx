import React from 'react'
import { parse, stringify } from 'query-string'
import { useHistory, useParams } from 'react-router-dom'
//import clsx from 'clsx'


import { Dialog, DialogActions, DialogTitle, IconButton } from '@material-ui/core'
import { IAppImage } from '../App/App.context'
import { Close } from '@material-ui/icons'
import Button from '@material-ui/core/Button'


export default function AppImage() {
    const history = useHistory()

    const { id } = useParams()
    const [image, setImage] = React.useState<IAppImage | null>(null)

    React.useEffect(()=>{
        if(id){
            fetch(`/api/images/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then((res) => {
                    return res.json()
                })
                .then((image) => {
                    setImage(image)

                })
        }
    }, [id])

    const handleDelete = (id: number)=>{
        fetch(`/api/images/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((res) => {
                return res.json()
            })
            .then(() => {
                setImage(null)


            })
        history.push('/')
    }

    if (!image){
        return  null
    }


    return (
            <Dialog open={!!image}>
                <DialogTitle>
                    <IconButton onClick={()=>history.push('/')}><Close/></IconButton>
                </DialogTitle>
                <img src={image && image.url || ''}/>
                <DialogActions>
                    <Button onClick={()=> handleDelete(image.id)}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

    )
}
