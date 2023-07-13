import { FormContainer, MinusAmoutInput, TaskInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle}
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
        disabled={!!activeCycle}
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
  )
}
