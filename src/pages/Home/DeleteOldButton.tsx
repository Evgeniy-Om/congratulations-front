import {Button as MUIButton, IconButton as MUIIconButton, Modal, styled, Tooltip, useMediaQuery} from "@mui/material"
import {useState} from "react"
import {
    useGetCongratulationsQuery,
} from "../../core/api/services/congratulationsService"
import {useDeleteCongratulationsList} from "../../core/hooks"
import MUICheckIcon from '@mui/icons-material/Check'
import MUICloseIcon from '@mui/icons-material/Close'
import MUIElderlyIcon from '@mui/icons-material/Elderly'


function DeleteOldButton() {
    const {data, isSuccess} = useGetCongratulationsQuery()
    const deleteCongratulationsList = useDeleteCongratulationsList()
    const matches = useMediaQuery('(min-width: 1040px)')

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    function onClick() {
        const idList: number[] = []
        const now = new Date()
        if (isSuccess && data?.length) {
            data.map(item => {
                if (new Date(item.alert_datetime) < now) idList.push(item.id)
            })
        }
        console.log(idList)
        deleteCongratulationsList(idList)
    }

    return (
        <_.Wrapper>
            {matches && <MUIButton
                variant="outlined"
                endIcon={<MUIElderlyIcon/>}
                onClick={handleOpen}
            >
                Удалить прошедшие
            </MUIButton>}
            {!matches && <Tooltip title="Удалить неактуальные записи" placement="bottom">
                <MUIIconButton
                    aria-label="deleteOld"
                    onClick={handleOpen}
                    color="primary"
                >
                    <MUIElderlyIcon/>
                </MUIIconButton>
            </Tooltip>}
            <Modal open={open} onClose={handleClose}>
                <_.ModalWrapper>
                    <h2>Удалить неактуальные записи?</h2>
                    <_.ConfirmButton
                        variant="outlined"
                        endIcon={<MUICheckIcon/>}
                        onClick={() => {
                            onClick()
                            handleClose()
                        }}
                    >
                        Да
                    </_.ConfirmButton>
                    <MUIButton
                        variant="outlined"
                        endIcon={<MUICloseIcon/>}
                        onClick={handleClose}
                    >
                        Отмена
                    </MUIButton>
                </_.ModalWrapper>
            </Modal>
        </_.Wrapper>
    )
}

export default DeleteOldButton

// Styled Components
const _ = {
    Wrapper: styled("div")({
    }),
    ModalWrapper: styled("div")(({theme}) => ({
        position: "absolute",
        top: "50%",
        left: "50%",
        width: 400,
        padding: "10px 20px 30px",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: theme.shape.borderRadius,
    })),
    ConfirmButton: styled(MUIButton)({
        marginRight: 20
    }),
}