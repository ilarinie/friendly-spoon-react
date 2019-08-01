import { useState, ChangeEvent } from 'react';

export const useField = (type: string, placeholder: string )=> {
  const [value, setValue] = useState('')
  const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value)
  return { type, value, onChange, placeholder }
}