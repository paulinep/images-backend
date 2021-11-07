import React from 'react'
import { parse, stringify } from 'query-string'
import { useHistory, useParams } from 'react-router-dom'
//import clsx from 'clsx'


import { Dialog } from '@material-ui/core'
import { IAppImage } from '../App/App.context'


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




    return (
            <Dialog open={!!image}>
                <img src={image && image.url || ''}/>
            </Dialog>

    )
}
