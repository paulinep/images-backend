import React from 'react'

export interface IAppParams {
    page?: number,
    perPage?: number,
    sort?: string | null,
    itemsCount?: number
}

export interface IAppImage {
    id: number,
    albumId: number,
    title: string,
    thumbnailUrl: string,
    url: string,
}

export interface IAppState {
    params?: IAppParams | null
    items?: IAppImage[] | null
    pending?: boolean,

}

export default React.createContext<IAppState>({
    params: null,
    items:  null,
    pending: false,

})
