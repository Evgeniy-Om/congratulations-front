import type {CongratulationItem} from '../core/types/globalTypes'
import type {SubmitHandler} from 'react-hook-form'
import {styled} from '@mui/material'
import {FormProvider, useForm} from 'react-hook-form'
import {useAddCongratulationMutation} from '../core/api/services/congratulationsService'
import {yupResolver} from '@hookform/resolvers/yup'
import {FormCongratulationValidationSchema} from '../core/yupValidastionSchemes'
import getDefaultDate from '../core/features/getDefaultDate'
import FormCongratulation from '../components/FormCongratulation/FormCongratulation'
import BackButton from '../components/BackButton'

export default function New() {
    const [addCongratulation, {isSuccess, isLoading, isError}] = useAddCongratulationMutation()
    const methods = useForm<CongratulationItem>({
        mode: 'onBlur',
        resolver: yupResolver(FormCongratulationValidationSchema),
        defaultValues: {alert_datetime: getDefaultDate()},
    })

    const onSubmit: SubmitHandler<CongratulationItem> = (data) => {
        const notify_by_email = data.notify_by_email ?? false

        const modifyData = {
            ...data,
            alert_datetime: new Date(data.alert_datetime).toJSON(),
            notify_by_email: notify_by_email,
        }
        console.log(data)
        console.log(modifyData)
        addCongratulation(modifyData)
            .unwrap()
            .then((payload) => {
                console.log(payload)
            })
            .catch((error) => {
                console.error('rejected', error)
            })
    }
    return (
        <div>
            <BackButton/>

            <_.Title>Новая запись</_.Title>

            <FormProvider {...methods} >
                <form noValidate onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormCongratulation page="New"/>
                </form>

            </FormProvider>


            <_.Info>
                {isSuccess && <div>Данные успешно сохранены!</div>}
                {isLoading && <div>Сохраняем ....</div>}
                {isError && <div>Какая-то ошибка</div>}
            </_.Info>

        </div>
    )
}

// _ Components
const _ = {
    Title: styled('h2')({
        margin: '40px 0',
    }),
    Info: styled('div')({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
    }),
}