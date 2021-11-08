import { createStyles } from '@material-ui/core/styles'
import {colors} from '@material-ui/core'

export default () => createStyles({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridColumnGap: '25px',
        gridRowGap: '25px',
    },
    image: {
        maxWidth: '100%',
        cursor: 'pointer'
    },
    main: {
        flexGrow: 1,
        height: 1,
        overflowX: 'auto',
        overflowY: 'scroll',
    },
})
