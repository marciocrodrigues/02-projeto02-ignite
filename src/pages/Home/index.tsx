import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  HomeContainer,
  FormContainer,
  CountDownContainer,
  Separator,
  StartCountDownButton,
  TaskInput,
  MinusAmoutInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minuteAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no minimu de 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo de 60 minutos'),
})

// interface NewCycleFormData {
//   task: string
//   minuteAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home() {
  const { register, handleSubmit, watch, reset, formState } =
    useForm<NewCycleFormData>({
      resolver: zodResolver(newCycleFormValidationSchema),
      defaultValues: {
        task: '',
        minuteAmount: 0,
      },
    })

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(formState.errors)
    console.log(data)
    reset()
  }

  // console.log(formState.errors)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label htmlFor="minuteAmount">durante</label>
          <MinusAmoutInput
            type="number"
            id="minuteAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minuteAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
          {/*
          Teste para forma de mostrar a mensagem de erro da validação com o zod
          {formState.errors.minuteAmount ? (
            <span>{formState.errors.minuteAmount.message}</span>
          ) : (
            false
          )} */}
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountDownButton disabled={isSubmitDisabled} type="submit">
          <Play />
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}
