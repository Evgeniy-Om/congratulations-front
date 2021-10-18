import MUIArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MUIAddIcon from '@mui/icons-material/Add'
import MUIDeleteIcon from '@mui/icons-material/Delete'
import MUIEditIcon from '@mui/icons-material/Edit'
import {useAppDispatch, useAppSelector} from "../core/hooks"
import format from 'date-fns/format'
import {ru} from 'date-fns/locale'
import {Button as MUIButton, IconButton as MUIIconButton, styled} from "@mui/material"
import {deleteBirthdayItem, changeIdOfEditItem} from '../core/store/birthdaySlice'
import ReactRouterDomLink from '../components/ReactRouterDomLink'
import {useGetCongratulationsQuery} from '../core/services/congratulations'
import {useEffect} from "react"
import {useRefreshAccessTokenMutation} from "../core/services/auth"


export default function Home() {
    const {data = [], isError, isLoading, refetch} = useGetCongratulationsQuery()
    const [refresh] = useRefreshAccessTokenMutation()
    const {list} = useAppSelector((state) => state.birthdays)
    const dispatch = useAppDispatch()

    // if (isError) {
    //     refresh({})
    //     // refetch()
    // }

    useEffect(() => {
        console.log(data)
        // console.log(isError)
    }, [data])

    useEffect(() => {
        refresh({})
            .unwrap()
            .then((payload) => {
                console.log(payload)
            })
            .catch((error) => console.error('rejected', error))
    }, [isError])

    return (
        <>
            <Styled.Header>
                <ReactRouterDomLink to="/login">
                    <MUIButton variant="outlined" startIcon={<MUIArrowBackIosIcon/>}>
                        Выйти из приложения
                    </MUIButton>
                </ReactRouterDomLink>

                <ReactRouterDomLink to="/new">
                    <MUIButton variant="outlined" component="span" endIcon={<MUIAddIcon/>}>
                        Новая запись
                    </MUIButton>
                </ReactRouterDomLink>
            </Styled.Header>
            <h2>Birthday book</h2>
            <hr/>
            {list.map((item, index) =>
                <Styled.ItemContainer key={index + Number(new Date())}>
                    <Styled.NameAndDateContainer>
                        <span>{item.name}</span>
                        <span>{item.date && format(item.date, "d MMMM yyyy", {locale: ru})}</span>
                    </Styled.NameAndDateContainer>
                    <MUIIconButton aria-label="edit" onClick={() => dispatch(changeIdOfEditItem(item._id))}>
                        <Styled.EditIcon/>
                    </MUIIconButton>
                    <MUIIconButton aria-label="delete" onClick={() => dispatch(deleteBirthdayItem(index))}>
                        <Styled.DeleteIcon/>
                    </MUIIconButton>
                </Styled.ItemContainer>,
            )}
            <br/>
            <br/>
        </>
    )
}

const Styled = {
    Header: styled("div")({
        display: 'flex',
        justifyContent: 'space-between',
    }),
    ItemContainer: styled("div")({
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
    }),
    NameAndDateContainer: styled("div")(({theme}) => ({
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "40px",
        width: "100%",
        marginRight: '5px',
        padding: "0px 10px",
        border: "1px solid",
        borderColor: theme.palette.primary.light,
        borderRadius: theme.shape.borderRadius,
    })),
    EditIcon: styled(MUIEditIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),
    DeleteIcon: styled(MUIDeleteIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),

}