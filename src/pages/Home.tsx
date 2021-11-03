import MUIArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MUIAddIcon from '@mui/icons-material/Add'
import MUIDeleteIcon from '@mui/icons-material/Delete'
import MUIEditIcon from '@mui/icons-material/Edit'
import {useAppDispatch} from "../core/hooks"
import format from 'date-fns/format'
import {ru} from 'date-fns/locale'
import {Button as MUIButton, IconButton as MUIIconButton, styled} from "@mui/material"
import ReactRouterDomLink from '../components/ReactRouterDomLink'
import {useDeleteCongratulationMutation, useGetCongratulationsQuery} from '../core/api/services/congratulations'
import {useUpdateAccessTokenMutation} from "../core/api/services/auth"
import {useEffect} from "react"
import {changeAuthStatus} from "../core/store/congratulationsSlice"


export default function Home() {
    const {data, isSuccess, isError, isLoading, refetch} = useGetCongratulationsQuery()
    const [deleteCongratulation] = useDeleteCongratulationMutation()
    const [refresh] = useUpdateAccessTokenMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isError) {
            if (localStorage.getItem("refresh_token")) {
                refresh()
                    .unwrap()
                    .then((payload) => {
                        localStorage.setItem("access_token", payload.access)
                        localStorage.setItem("exp_access", `${payload.access_live}UTC`)
                        refetch()
                    })
                    .catch((error) => {
                        console.error('rejected3', error)
                        dispatch(changeAuthStatus("public"))
                    })
            } else {
                dispatch(changeAuthStatus("public"))
            }
        }
    }, [isError])

    return (
        <>
            <Styled.Header>
                <ReactRouterDomLink to="/login">
                    <MUIButton
                        variant="outlined"
                        startIcon={<MUIArrowBackIosIcon/>}
                        onClick={
                            () => {
                                localStorage.removeItem("access_token")
                                localStorage.removeItem("exp_access")
                                localStorage.removeItem("refresh_token")
                                sessionStorage.removeItem("access_token")
                                sessionStorage.removeItem("exp_access")
                                dispatch(changeAuthStatus("public"))
                            }
                        }>
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
            {isLoading && <div>Loading...</div>}
            {isSuccess && data?.map((item, index) =>
                <Styled.ItemContainer key={index + Number(new Date())}>
                    <Styled.NameAndDateContainer>
                        <span>{item.bday_name}</span>
                        <span>{item.alert_datetime && format(new Date(item.alert_datetime), "d MMMM yyyy в hh:mm", {locale: ru})}</span>
                    </Styled.NameAndDateContainer>
                    <MUIIconButton aria-label="edit" onClick={() => {}}>
                        <Styled.EditIcon/>
                    </MUIIconButton>
                    <MUIIconButton aria-label="delete" onClick={() => deleteCongratulation(item.id)}>
                        <Styled.DeleteIcon/>
                    </MUIIconButton>
                </Styled.ItemContainer>,
            )}
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