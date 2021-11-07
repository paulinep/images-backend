import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from './App.styles'
import { parse, stringify } from 'query-string'
import { useHistory } from 'react-router-dom'
//import clsx from 'clsx'

import AppContext, { IAppImage, IAppParams, IAppState } from './App.context'


import LinearProgress from '@material-ui/core/LinearProgress'
import Pagination from '../Pagination/Pagination'
import AppImage from '../AppImage/AppImage'
import { Switch, Route } from 'react-router-dom'

const useStyles = makeStyles(styles, {
    name: App.name
})

export default function App() {
    const classes = useStyles()
    const history = useHistory()

    const [ appState, setAppState ] = React.useState<IAppState>({
        params: null,
        items: null,
        pending: false,


    })
    const [params, setParams] = React.useState<IAppParams>({page: 1, perPage: 10, sort: null, itemsCount: 10})


    React.useEffect(() => {
        if(params && params !== appState.params){
            //history.push(`${history.location.pathname}?${stringify(params)}`)
            setAppState({ pending: true })

            fetch(`/api/images?${stringify(params)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }
            })
                .then((res) => {
                    return res.json()
                })
                .then((images) => {
                    setAppState({
                        items: images.items,
                        params: {page: images.page, perPage: images.perPage, sort: images.sort, itemsCount: images.itemsCount},
                        pending: false,
                    })

                })
        }

        ;
    }, [params])

    const handleClick = (id: number)=>{
        history.push(`/images/${id}`)
    }


    React.useEffect(()=>{
        if(appState.params){
            setParams(appState.params)
        }
    }, [appState.params])

    if (appState.pending) {
        return (
            <LinearProgress/>
        )
    }
    if (!appState.items) {
        return null
    }

    return (
        <AppContext.Provider value={appState}>
            <div className={classes.root}>
                {appState.items?.map(item =>{
                    return <div key={item.id} className={classes.image}>
                        <img  onClick={()=>handleClick(item.id)} src={item.thumbnailUrl}/>
                    </div>
                })}
            </div>
            <Pagination count={params.itemsCount || 10}
                        rowsPerPage={params.perPage || 10}
                        page={(params.page || 1).toString()}
                        onChangePage={(event, page)=>setParams({...params, page: Number(page)})}/>

            <Switch>
                <Route path="/images/:id" component={AppImage}/>
            </Switch>


        </AppContext.Provider>
    )
}
