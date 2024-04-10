import { css } from '@emotion/react'
import styled from '@emotion/styled'

type FormControlProps = {
  showInput: boolean
}

export const FormControl = styled.div<FormControlProps>`
  display: flex;
  
  ${(props) => props.showInput
    ? css`
      input {
        display: block;
      }
    `
    : css`
      input {
        display: none;
      }
    `}
`

export const Input = styled.input`
  outline: none;
  border: 1 solid rgba(0, 0, 0, 0.1);
  min-width: 55px;
  margin-right: 0.5rem;
  text-align: center;
  -moz-appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
`
