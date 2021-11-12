import {IconButton, Typography} from "@mui/material"

function SocialButton() {
    return (
        <>
            <Typography>Войти через соц. сети</Typography>
            <div>
                <IconButton aria-label="vk">
                    <img src="https://download.loveradio.ru/pub/1066115.jpg" width="20px" height="20px"/>
                </IconButton>
                <IconButton aria-label="gmail">
                    <img
                        src="https://image.similarpng.com/very-thumbnail/2020/12/Gmail-logo-design-on-transparent-background-PNG.png"
                        width="22px" height="18px"/>
                </IconButton>
                <IconButton aria-label="yandex mail">
                    <img
                        src="https://img.favpng.com/21/16/15/yandex-mail-email-computer-icons-rambler-png-favpng-SxvrnLe8XtNcKGMJdTg8441jb.jpg"
                        width="20px" height="21px"/>
                </IconButton>
                <IconButton aria-label="facebook">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                        width="20px" height="20px"/>
                </IconButton>
            </div>
        </>
    )
}

export default SocialButton