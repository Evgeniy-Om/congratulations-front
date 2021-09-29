import { useForm } from "react-hook-form"

const DEFAULT_VALUES = {
    email: "demo@demo.com",
    password: "demo1234",
}

type Inputs = {
    email: string;
    password: string
}

function Login2() {
    const { register } = useForm<Inputs>({
        defaultValues: DEFAULT_VALUES
    })
    return (
        <div>


            <input {...register("email")} />
        </div>
    )
}

export default Login2