import styled from '@emotion/styled'

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;

  a {
    cursor: pointer;
    letter-spacing: 0.2px;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`
