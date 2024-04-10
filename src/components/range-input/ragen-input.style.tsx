import styled from "@emotion/styled";

type ControlProps = {
  position: number;
}

const ControlSize = 17
const RailSize = 7

export const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  column-gap: 1.5rem;
  align-items: center;
`

export const Range = styled.div`
  position: relative;
  width: 350px;
  height: ${RailSize}px;
`

export const Control = styled.div<ControlProps>`
  height: ${ControlSize}px;
  width: ${ControlSize}px;
  border-radius: 50%;
  background-color: red;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(${(props) => props.position}% - 14px);

  &:hover {
    cursor: move;
    transform: translateY(-50%) scale(1.25);
    transition: ease 0.2s transform;
  }
`

export const Rail = styled.div`
  width: 100%;
  height: ${RailSize}px;
  background-color: black;
  border-radius: 3px;
`
