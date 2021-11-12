import MUIArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MUIAddIcon from '@mui/icons-material/Add'
import MUIDeleteIcon from '@mui/icons-material/Delete'
import MUIEditIcon from '@mui/icons-material/Edit'
import {useAppDispatch, useAppSelector} from "../core/hooks"
import format from 'date-fns/format'
import {ru} from 'date-fns/locale'
import {Button as MUIButton, IconButton as MUIIconButton, styled} from "@mui/material"
import Link from '../components/Link'
import {useDeleteCongratulationMutation, useGetCongratulationsQuery} from '../core/api/services/congratulationsService'
import {useUpdateAccessTokenMutation} from "../core/api/services/authService"
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
            <_.Header>
                <Link to="/login">
                    <MUIButton
                        variant="outlined"
                        startIcon={<MUIArrowBackIosIcon/>}
                        onClick={() => {
                            clearStorages()
                            dispatch(changeAuthStatus("public"))
                        }}>
                        Выйти из приложения
                    </MUIButton>
                </Link>

                <Link to="/new">
                    <MUIButton variant="outlined" component="span" endIcon={<MUIAddIcon/>}>
                        Новая запись
                    </MUIButton>
                </Link>
            </_.Header>
            <h2>Birthday book</h2>
            <hr/>
            {isLoading && <div>Loading...</div>}
            {isSuccess && data?.map((item, index) =>
                <_.ItemContainer key={index + Number(new Date())}>
                    <_.CongratulationContainer disabled={new Date(item.alert_datetime) < new Date()}>
                        <_.NameAndDate>
                            <span>{item.bday_name}</span>
                            <span>{item.alert_datetime && format(new Date(item.alert_datetime), "d MMMM yyyy в hh:mm", {locale: ru})}</span>
                        </_.NameAndDate>
                        <_.Comment>Комментарий: <span>{item.comment}</span></_.Comment>
                    </_.CongratulationContainer>
                    <Link to={`/edit/${item.id}`}>
                        <MUIIconButton aria-label="edit">
                            <_.EditIcon/>
                        </MUIIconButton>
                    </Link>
                    <MUIIconButton aria-label="delete" onClick={() => deleteCongratulation(item.id)}>
                        <_.DeleteIcon/>
                    </MUIIconButton>
                </_.ItemContainer>,
            )}
        </>
    )
}

// Styled Components
const _ = {
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