import MUIArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MUIAddIcon from '@mui/icons-material/Add'
import MUIDeleteIcon from '@mui/icons-material/Delete'
import MUIEditIcon from '@mui/icons-material/Edit'
import {useAppDispatch, useAppSelector} from "../core/hooks"
import format from 'date-fns/format'
import {ru} from 'date-fns/locale'
import {Button as MUIButton, IconButton as MUIIconButton, styled} from "@mui/material"
import Link_ReactRouterDom from '../components/Link_ReactRouterDom'
import {useDeleteCongratulationMutation, useGetCongratulationsQuery} from '../core/api/services/congratulations'
import {useUpdateAccessTokenMutation} from "../core/api/services/auth"
import {useEffect} from "react"
import {changeAuthStatus} from "../core/store/congratulationsSlice"


export default function Home() {
    const {rememberMe} = useAppSelector((state) => state.congratulations)
    const {data, isSuccess, isError, isLoading, refetch} = useGetCongratulationsQuery()
    const [deleteCongratulation] = useDeleteCongratulationMutation()
    const [refresh] = useUpdateAccessTokenMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isError) {
            if (sessionStorage.getItem("refresh_token") || localStorage.getItem("refresh_token")) {
                refresh()
                    .unwrap()
                    .then((payload) => {
                        if (rememberMe) {
                            localStorage.setItem("access_token", payload.access)
                            localStorage.setItem("exp_access", `${payload.access_live}UTC`)
                        } else {
                            sessionStorage.setItem("access_token", payload.access)
                            sessionStorage.setItem("exp_access", `${payload.access_live}UTC`)
                        }
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
                <Link_ReactRouterDom to="/login">
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
                </Link_ReactRouterDom>

                <Link_ReactRouterDom to="/new">
                    <MUIButton variant="outlined" component="span" endIcon={<MUIAddIcon/>}>
                        Новая запись
                    </MUIButton>
                </Link_ReactRouterDom>
            </Styled.Header>
            <h2>Birthday book</h2>
            <hr/>
            {isLoading && <div>Loading...</div>}
            {isSuccess && data?.map((item, index) =>
                <Styled.ItemContainer key={index + Number(new Date())}>
                    <Styled.CongratulationContainer disabled={new Date(item.alert_datetime) < new Date()}>
                        <Styled.NameAndDate>
                            <span>{item.bday_name}</span>
                            <span>{item.alert_datetime && format(new Date(item.alert_datetime), "d MMMM yyyy в hh:mm", {locale: ru})}</span>
                        </Styled.NameAndDate>
                        <Styled.Comment>Комментарий: <span>{item.comment}</span></Styled.Comment>
                    </Styled.CongratulationContainer>
                    <Link_ReactRouterDom to={`/edit/${item.id}`}>
                        <MUIIconButton aria-label="edit">
                            <Styled.EditIcon/>
                        </MUIIconButton>
                    </Link_ReactRouterDom>
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
    CongratulationContainer: styled("div")<any>(({theme , ...props}) => ({
        minHeight: "40px",
        width: "100%",
        marginRight: '5px',
        padding: "10px",
        border: "1px solid",
        overflow: "hidden",
        color: props.disabled ? theme.palette.grey[500] : theme.palette.common.black,
        borderColor: props.disabled ? theme.palette.grey[500] : theme.palette.primary.light,
        borderRadius: theme.shape.borderRadius,
    })),
    NameAndDate: styled("div")({
        display: "flex",
        marginBottom: "10px",
        justifyContent: "space-between",
        alignItems: "center",
    }),
    Comment: styled("div")({
        wordBreak: "break-all"
    }),
    EditIcon: styled(MUIEditIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),
    DeleteIcon: styled(MUIDeleteIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),
}