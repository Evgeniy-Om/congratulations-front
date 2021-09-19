import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import {useAppDispatch, useAppSelector} from "../store/hooks"
import format from 'date-fns/format'
import {ru} from 'date-fns/locale'
import {Box, Button, IconButton} from "@mui/material"
import {Link} from "react-router-dom"
import {css} from '@emotion/css'
import {deleteBirthdayItem} from '../store/birthdaySlice'


function Home() {
    const {list} = useAppSelector((state) => state.birthdays)
    const dispatch = useAppDispatch()

    return (
        <>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
            }}>
                <Button variant="outlined" startIcon={<ArrowBackIosIcon/>}>
                    Выйти из приложения
                </Button>

                <Link to="/new" className={css({textDecoration: "none"})}>
                    <Button variant="outlined" component="span" endIcon={<AddIcon/>}>
                        Новая запись
                    </Button>
                </Link>
            </Box>
            <h2>Birthday book</h2>
            <hr/>
            {list.map((item, index) =>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",

                }}>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "40px",
                        width: "100%",
                        marginRight: '5px',
                        padding: "0px 10px",
                        border: "1px solid",
                        borderColor: theme => theme.palette.primary.light,
                        borderRadius: "4px",
                    }}>
                        <span>{item.name}</span>
                        <span>{item.date && format(item.date, "d MMMM yyyy", {locale: ru})}</span>
                    </Box>
                    <IconButton aria-label="edit">
                        <EditIcon sx={{color: theme => theme.palette.primary.light}}/>
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => dispatch(deleteBirthdayItem(index))}>
                        <DeleteIcon sx={{color: theme => theme.palette.primary.light}}/>
                    </IconButton>
                </Box>,
            )}
            <br/>
            <br/>
        </>
    )
}

export default Home