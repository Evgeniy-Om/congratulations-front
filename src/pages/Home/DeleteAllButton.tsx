import {
    Button as MUIButton,
    IconButton as MUIIconButton,
    Modal,
    styled,
    Tooltip,
    useMediaQuery,
} from "@mui/material"
import {useState} from "react"
import MUIDeleteSweepIcon from "@mui/icons-material/DeleteSweep"
import {
    useGetCongratulationsQuery,
} from "../../core/api/services/congratulationsService"
import {useDeleteCongratulationsList} from "../../core/hooks"
import MUICheckIcon from '@mui/icons-material/Check'
import MUICloseIcon from '@mui/icons-material/Close'


function DeleteAllButton() {
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
        if (isSuccess && data?.length) {
            data.map(item => idList.push(item.id))
        }
        console.log(idList)
        deleteCongratulationsList(idList)
    }

    return (
        <_.Wrapper>

            {matches && <_.DeleteAll
                variant="outlined"
                endIcon={<MUIDeleteSweepIcon/>}
                onClick={handleOpen}
            >
                Удалить все
            </_.DeleteAll>}
            {!matches &&
            <Tooltip title="Удалить все записи" placement="bottom">
                <MUIIconButton
                    aria-label="deleteAll"
                    onClick={handleOpen}
                    color="primary"
                >
                    <MUIDeleteSweepIcon/>
                </MUIIconButton>
            </Tooltip>}

            <Modal open={open} onClose={handleClose}>
                <_.ModalWrapper>
                    <h2>Удалить все записи?</h2>
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

export default DeleteAllButton

// Styled Components
const _ = {
    Wrapper: styled("div")({
        marginLeft: 10
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
    DeleteAll: styled(MUIButton)({
    }),
    ConfirmButton: styled(MUIButton)({
        marginRight: 20
    }),
}