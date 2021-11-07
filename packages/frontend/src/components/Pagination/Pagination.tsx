import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import styles from './Pagination.styles'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'

const COUNT_OF_PAGES_BEFORE = 3
const COUNT_OF_PAGES_BEFORE_CURSOR = 2
const COUNT_OF_PAGES_AFTER_CURSOR = 2
const COUNT_OF_PAGES_AFTER = 3

const COUNT_OF_PAGES = COUNT_OF_PAGES_BEFORE + 1 + COUNT_OF_PAGES_BEFORE_CURSOR + 1 + COUNT_OF_PAGES_AFTER_CURSOR + 1 + COUNT_OF_PAGES_AFTER
const MIN_COUNT_OF_PAGES_BEFORE_CURSOR = COUNT_OF_PAGES_BEFORE + 1 + COUNT_OF_PAGES_BEFORE_CURSOR + 1
const MIN_COUNT_OF_PAGES_AFTER_CURSOR = COUNT_OF_PAGES_AFTER + 1 + COUNT_OF_PAGES_AFTER_CURSOR

const useStyles = makeStyles(styles, {
    name: Pagination.name,
})

export interface IPagination {
    count: number
    rowsPerPage: number
    page: string
    className?: string
    onChangePage: (evt: React.MouseEvent<Element, MouseEvent>, page: number | string)=> void
}

export default function Pagination(props: IPagination) {

    const classes = useStyles(props)
    const total = props.count || 0
    const totalRange: number[] = []
    const pageSize = props.rowsPerPage
    const page = Number(props.page)
    const pagesTotal = Math.ceil(total / pageSize)
    const pages: number|string[]= []
    if (total) {
        totalRange[0] = page * pageSize - pageSize
        totalRange[1] = Math.min(page * pageSize, total)
    } else {
        delete totalRange[0]
        delete totalRange[1]
    }
    for (let p = 1; p <= pagesTotal; p++) {
        pages.push(p.toString())
    }
    if (pagesTotal > COUNT_OF_PAGES) {
        let slicedCount = 0
        let beforeCursorSpliceStart= 0
        let beforeCursorSpliceCount= 0
        const cursorStart = page - COUNT_OF_PAGES_BEFORE_CURSOR
        if (cursorStart > COUNT_OF_PAGES_BEFORE) {
            beforeCursorSpliceStart = COUNT_OF_PAGES_BEFORE
            beforeCursorSpliceCount = page - COUNT_OF_PAGES_BEFORE_CURSOR - COUNT_OF_PAGES_BEFORE - 1
        }
        if (pagesTotal - page < MIN_COUNT_OF_PAGES_AFTER_CURSOR) { // so high, correct left splice
            beforeCursorSpliceCount = beforeCursorSpliceCount - (MIN_COUNT_OF_PAGES_AFTER_CURSOR - (pagesTotal - page))
        }
        if (beforeCursorSpliceCount > 1) {
            const sliced = pages.splice(beforeCursorSpliceStart, beforeCursorSpliceCount,  '...' )
            slicedCount = sliced.length - 1
        }
        let afterCursorSpliceStart= 0
        let afterCursorSpliceCount= 0
        const cursorEnd = page + COUNT_OF_PAGES_AFTER_CURSOR
        if (cursorEnd < pagesTotal - COUNT_OF_PAGES_AFTER) {
            afterCursorSpliceStart = page + COUNT_OF_PAGES_AFTER_CURSOR
            afterCursorSpliceCount = pagesTotal - COUNT_OF_PAGES_AFTER - afterCursorSpliceStart
        }
        if (page < MIN_COUNT_OF_PAGES_BEFORE_CURSOR) { // so low, correct right splice
            afterCursorSpliceStart = afterCursorSpliceStart + (MIN_COUNT_OF_PAGES_BEFORE_CURSOR - page)
            afterCursorSpliceCount = afterCursorSpliceCount - (MIN_COUNT_OF_PAGES_BEFORE_CURSOR - page)
        }
        if (afterCursorSpliceCount > 1) {
            pages.splice(afterCursorSpliceStart - slicedCount, afterCursorSpliceCount,  '...' )
        }
    }
    const { className, onChangePage } = props


    const selectPageByIndex = (pages: Array<number|string>, i: number, evt: React.MouseEvent<Element, MouseEvent>) => {
        let page = pages[i]
        if (isNaN(Number(page)) ) {
            page = Math.round(
                Number(pages[i - 1]) + ((Number(pages[i + 1]) - Number(pages[i - 1])) / 2),
            )
        }
        onChangePage && onChangePage(evt, page)
    }

    return (
        <div className={clsx(classes.root, className)}>
            {pages.map((p, i) => (
                <Button
                    key={i}
                    className={clsx(classes.page, {
                        [classes.page_active]: Number(p)=== Number(page),
                    })}
                    disabled={Number(p) === page}
                    onClick={evt => selectPageByIndex(pages, i, evt)}
                >{p}</Button>
            ))}
        </div>
    )
}

