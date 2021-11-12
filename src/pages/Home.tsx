import MUIArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import MUIAddIcon from '@mui/icons-material/Add'
import MUIDeleteIcon from '@mui/icons-material/Delete'
import MUIEditIcon from '@mui/icons-material/Edit'
import {useAppDispatch, useAppSelector} from "../core/hooks"
import format from 'date-fns/format'
import {ru} from 'date-fns/locale'
import {Button as MUIButton, IconButton, IconButton as MUIIconButton, styled, Tooltip} from "@mui/material"
import Link from '../components/Link'
import {useDeleteCongratulationMutation, useGetCongratulationsQuery} from '../core/api/services/congratulationsService'
import {useUpdateAccessTokenMutation} from "../core/api/services/authService"
import {useEffect} from "react"
import {changeAuthStatus} from "../core/store/congratulationsSlice"
import MUICommentIcon from '@mui/icons-material/Comment'
import clearStorages from "../core/features/clearStorages"


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
            <_.Wrapper>
                {isSuccess && data?.map((item, index) =>
                    <_.ItemWrapper key={index + Number(new Date())}>
                        <_.ItemInner disabled={new Date(item.alert_datetime) < new Date()}>
                            <_.Name>
                                {item.bday_name}
                            </_.Name>
                            <_.DateAndIconsContainer>
                                <_.Date>{item.alert_datetime && format(new Date(item.alert_datetime), "d MMMM yyyy в hh:mm", {locale: ru})}</_.Date>
                                <_.IconsContainer>
                                    {item.comment &&
                                    <Tooltip title={item.comment} placement="bottom-end">
                                        <IconButton>
                                            <_.CommentIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    }
                                    <Link to={`/edit/${item.id}`}>
                                        <MUIIconButton aria-label="edit">
                                            <_.EditIcon/>
                                        </MUIIconButton>
                                    </Link>
                                    <MUIIconButton aria-label="delete" onClick={() => deleteCongratulation(item.id)}>
                                        <_.DeleteIcon/>
                                    </MUIIconButton>
                                </_.IconsContainer>
                            </_.DateAndIconsContainer>

                        </_.ItemInner>

                    </_.ItemWrapper>,
                )}
            </_.Wrapper>
        </>
    )
}

// Styled Components
const _ = {
    Header: styled("div")({
        display: 'flex',
        justifyContent: 'space-between',
    }),
    Wrapper: styled("div")({
        display: "flex",
        // justifyContent: 'space-between',
        flexWrap: "wrap",
        marginRight: "-20px"
    }),
    ItemWrapper: styled("div")({
        display: "flex",
        alignItems: "center",
        marginBottom: "10px",
        marginRight: "10px",
        width: "475px",
        '@media(max-width: 1040px)': {
            width: '480px'
        }
    }),
    ItemInner: styled("div")<any>(({theme, ...props}) => ({
        display: "flex",
        justifyContent: "space-between",
        minHeight: "40px",
        width: "100%",
        padding: "10px",
        border: "1px solid",
        overflow: "hidden",
        color: props.disabled ? theme.palette.grey[400] : theme.palette.common.black,
        borderColor: props.disabled ? theme.palette.grey[400] : theme.palette.primary.light,
        borderRadius: theme.shape.borderRadius,
    })),
    Name: styled("div")({
        marginRight: "10px",
    }),
    DateAndIconsContainer: styled("div")({
        width: "200px",
    }),
    Date: styled("div")({
        width: "200px",
        textAlign: "right",
    }),
    IconsContainer: styled("div")({
        display: "flex",
        justifyContent: "end",
        marginRight: "-10px",
    }),
    Comment: styled("div")({
        wordBreak: "break-all",
    }),
    EditIcon: styled(MUIEditIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),
    DeleteIcon: styled(MUIDeleteIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),
    CommentIcon: styled(MUICommentIcon)(({theme}) => ({
        color: theme.palette.primary.light,
    })),
}